# frontend_html_check.ps1
# Safe, single-file PowerShell script to:
# - record a transcript
# - detect staged HTML files containing Vite module tags or /src/main.jsx
# - unstage those staged HTML files (so the pre-commit hook won't block)
# - unstage backup folders if accidentally staged
# - stage only frontend deletions, commit and push the current branch
#
# Run this from inside the git repo root (PowerShell / Windows Terminal).
# Do NOT double-click the script file — open a terminal and run: .\frontend_html_check.ps1

# start transcript so the output is preserved if the terminal closes
$transcriptPath = Join-Path -Path (Get-Location) -ChildPath "frontend_html_check_transcript_$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
Try { Start-Transcript -Path $transcriptPath -Force } Catch {}

Write-Host "TRANSCRIPT:" $transcriptPath
# find repo root
try {
  $repoRoot = (git rev-parse --show-toplevel).Trim()
} catch {
  Write-Host "ERROR: not inside a git repository. Aborting." -ForegroundColor Red
  Stop-Transcript 2>$null
  exit 1
}
Set-Location $repoRoot
Write-Host "REPO_ROOT: $repoRoot"

# Identify current branch
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "CURRENT_BRANCH: $branch"

# 1) Show what's currently staged
Write-Host "`n--- STAGED (cached) FILES ---"
$staged = git diff --name-only --cached
if (-not $staged) {
  Write-Host "(no staged files)"
} else {
  $staged | ForEach-Object { Write-Host $_ }
}

# 2) Find staged HTML files and show offending lines (type="module" or /src/main.jsx)
Write-Host "`n--- CHECKING STAGED HTML FILES FOR VITE-STYLE TAGS ---"
$stagedHtml = $staged | Where-Object { $_ -match '\.html$' }
if (-not $stagedHtml -or $stagedHtml.Count -eq 0) {
  Write-Host "No staged .html files."
} else {
  $foundAny = $false
  foreach ($f in $stagedHtml) {
    if (Test-Path $f) {
      $matches = Select-String -Path $f -Pattern 'type="module"','/src/main.jsx' -SimpleMatch -ErrorAction SilentlyContinue
      if ($matches) {
        $foundAny = $true
        Write-Host "`n--- Offending lines in staged file: $f ---"
        $matches | ForEach-Object { Write-Host ("{0}:{1}: {2}" -f $_.Path,$_.LineNumber,$_.Line) }
      } else {
        Write-Host "`n--- Staged HTML OK (no offending lines): $f"
      }
    } else {
      Write-Host "`n--- Staged HTML file missing on disk: $f"
    }
  }
  if (-not $foundAny) { Write-Host "`nNo matches for type=\"module\" or /src/main.jsx found in staged HTML files." }
}

# 3) Unstage problematic files:
# - unstage all staged HTML files that contain the offending patterns
# - also unstage common frontend/public/index.html, frontend/index.html, public/index.html if staged
# - unstage transfer_backups and common BACKUP_* directories if accidentally staged
Write-Host "`n--- UNSTAGING problematic HTML and backup folders (safe: files remain on disk) ---"

# unstage any transfer_backups and backup directories
git reset HEAD -- transfer_backups 2>$null || Write-Host "transfer_backups not staged or not present in index"
git reset HEAD -- BACKUP_BEFORE_FINAL_FIX* 2>$null || Write-Host "No BACKUP_BEFORE_FINAL_FIX* entries staged"

# build list of HTML files to consider unstaging (staged and matching patterns)
$unstageList = @()
foreach ($f in $stagedHtml) {
  if (Test-Path $f) {
    $matches = Select-String -Path $f -Pattern 'type="module"','/src/main.jsx' -SimpleMatch -ErrorAction SilentlyContinue
    if ($matches) { $unstageList += $f }
  }
}
# always include common index.html paths that have blocked commits before
$commonCandidates = @("frontend/index.html","frontend/public/index.html","public/index.html","index.html")
foreach ($c in $commonCandidates) {
  if ($staged -contains $c) { $unstageList += $c }
}

$unstageList = $unstageList | Select-Object -Unique
if ($unstageList.Count -gt 0) {
  Write-Host "Unstaging the following files:"
  $unstageList | ForEach-Object { Write-Host "  $_" }
  foreach ($u in $unstageList) {
    # attempt modern restore staged, fallback to reset
    git restore --staged $u 2>$null || git reset HEAD -- $u 2>$null
  }
} else {
  Write-Host "No staged HTML files with offending patterns to unstage (or none staged)."
}

# 4) Ensure transfer_backups is ignored going forward
if (-not (Test-Path .gitignore)) { New-Item -ItemType File -Path .gitignore -Force | Out-Null }
$ignoreAdded = $false
if (-not (Select-String -Path .gitignore -Pattern '^transfer_backups/?$' -Quiet -ErrorAction SilentlyContinue)) {
  Add-Content -Path .gitignore -Value "transfer_backups/"
  $ignoreAdded = $true
  git add .gitignore
}
if (-not (Select-String -Path .gitignore -Pattern '^BACKUP_BEFORE_FINAL_FIX' -Quiet -ErrorAction SilentlyContinue)) {
  Add-Content -Path .gitignore -Value "BACKUP_BEFORE_FINAL_FIX*/"
  $ignoreAdded = $true
  git add .gitignore
}
if ($ignoreAdded) { Write-Host ".gitignore updated with backup rules and staged." } else { Write-Host ".gitignore already contains backup rules." }

# 5) Stage only intended frontend changes (deletions where nested copy was removed)
Write-Host "`n--- Staging frontend changes only (safe) ---"
git add -A frontend 2>$null

# 6) Show staged files now
Write-Host "`n=== STAGED FILES (after cleanup) ==="
$stagedAfter = git status --porcelain
if (-not $stagedAfter) { Write-Host "(no staged files)" } else { Write-Host $stagedAfter }

# 7) Commit and push
if ($stagedAfter -and $stagedAfter.Trim() -ne "") {
  Write-Host "`nCommitting staged changes..."
  $commitOutput = git commit -m "fix: remove accidental nested frontend copy (moved to transfer_backups)" 2>&1
  Write-Host $commitOutput
  if ($LASTEXITCODE -ne 0) {
    Write-Host "`nCommit failed or blocked by hook. If you see a hook error, inspect the listed files or run the commit with --no-verify if you accept the risk."
    Stop-Transcript 2>$null
    exit 1
  } else {
    Write-Host "`nCommit succeeded. Pushing branch..."
    $pushOutput = git push -u origin $branch 2>&1
    Write-Host $pushOutput
    if ($LASTEXITCODE -ne 0) {
      Write-Host "`nPush reported an error (credential helper or network). If you see a credential error, open a terminal where you're authenticated and run:"
      Write-Host "  git push -u origin $branch"
    } else {
      Write-Host "`nPUSH_OK"
      Write-Host "Open the PR URL to review: https://github.com/SeabassFather/audit-frontend/pull/new/$branch"
    }
  }
} else {
  Write-Host "`nNo staged files to commit after cleanup. Nothing to push."
}

Stop-Transcript 2>$null