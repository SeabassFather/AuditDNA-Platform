<#
fix_nested_frontend_copy.ps1
Safe fixer for accidental frontend\frontend nested copy.
Run from inside the repo. This script:
 - finds repo root
 - detects if frontend\frontend exists
 - shows a summary (file count + sizes)
 - moves the nested folder into transfer_backups/backup_<timestamp> (non-destructive)
 - creates a new branch fix-nested-<timestamp>, commits the removal, and pushes it
 - prints the PR URL to review/merge
#>

# Start transcript to keep output if window closes
$transcript = Join-Path (Get-Location) "fix_nested_transcript_$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
try { Start-Transcript -Path $transcript -Force } catch {}

try {
  $repoRoot = (git rev-parse --show-toplevel).Trim()
} catch {
  Write-Host "ERROR: not inside a git repository. Run this from inside the repo and try again." -ForegroundColor Red
  Stop-Transcript 2>$null
  exit 1
}

Write-Host "REPO_ROOT: $repoRoot"

$nested = Join-Path $repoRoot "frontend\frontend"
$backupRoot = Join-Path $repoRoot "transfer_backups"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$nestedBackup = Join-Path $backupRoot "nested_backup_$timestamp"

if (-not (Test-Path $nested)) {
  Write-Host "No nested folder found at: $nested" -ForegroundColor Yellow
  Write-Host "Nothing to fix. If you still see duplicated files, show me the output of: Get-ChildItem -Recurse -Force -Path (Join-Path $repoRoot 'frontend') | Select-Object FullName"
  Stop-Transcript 2>$null
  exit 0
}

# Show summary of nested folder
Write-Host ""
Write-Host "FOUND nested folder:" $nested -ForegroundColor Cyan
$files = Get-ChildItem -Path $nested -Recurse -File -ErrorAction SilentlyContinue
$totalFiles = $files.Count
$totalBytes = ($files | Measure-Object -Property Length -Sum).Sum
Write-Host "  Files in nested folder: $totalFiles"
Write-Host ("  Total size: {0:N2} MB" -f ($totalBytes/1MB))

Write-Host ""
Write-Host "Top 20 largest files in nested folder:"
$files | Sort-Object Length -Descending | Select-Object FullName, @{Name='MB';Expression={[math]::Round($_.Length/1MB,2)}} -First 20 | Format-Table -AutoSize

Write-Host ""
Write-Host "Current git branch:" (git rev-parse --abbrev-ref HEAD)
Write-Host "Recent commits (top 5):"
git log --oneline -n 5

Write-Host ""
$confirm = Read-Host "Type YES to move the nested folder to a safe backup ($nestedBackup), create a branch to record the fix, commit and push the change. Anything else will cancel."
if ($confirm -ne "YES") {
  Write-Host "Cancelled by user. No changes made."
  Stop-Transcript 2>$null
  exit 0
}

# Create backup folder and move nested there
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
Write-Host "Moving nested folder to backup: $nestedBackup"
try {
  Move-Item -LiteralPath $nested -Destination $nestedBackup -Force
  Write-Host "MOVE_OK"
} catch {
  Write-Host "ERROR moving folder: $($_.Exception.Message)" -ForegroundColor Red
  Stop-Transcript 2>$null
  exit 1
}

# Create branch and commit the removal
$fixBranch = "fix-nested-frontend-$timestamp"
Write-Host "Creating branch: $fixBranch"
git checkout -b $fixBranch

# Stage deletions and commit
git add -A
$commitMsg = "fix: remove accidental nested frontend copy (moved to transfer_backups/nested_backup_$timestamp)"
$commitOut = & git commit -m $commitMsg 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "COMMIT_OK"
  Write-Host $commitOut
} else {
  Write-Host "NO_COMMIT_MADE_OR_COMMIT_FAILED"
  Write-Host $commitOut
}

# Push the branch
Write-Host "Pushing branch to origin..."
$pushOut = & git push -u origin $fixBranch 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "PUSH_OK"
  Write-Host $pushOut
} else {
  Write-Host "PUSH_FAILED"
  Write-Host $pushOut
  Write-Host "If push failed because of credentials, open a terminal with proper auth and run: git push -u origin $fixBranch"
}

$owner = "SeabassFather"
$repo = "audit-frontend"
$prUrl = "https://github.com/$owner/$repo/pull/new/$fixBranch"
Write-Host ""
Write-Host "Fix complete. Review branch and create PR here:"
Write-Host $prUrl

Stop-Transcript 2>$null