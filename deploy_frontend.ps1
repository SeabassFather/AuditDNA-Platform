<#
deploy_frontend.ps1
Purpose: Commit the replaced frontend folder into the auditdna repo and push via HTTPS,
         handling common errors and optionally running a local build.
Usage: Run in an elevated or normal PowerShell prompt. The script will not overwrite your SSH config.
#>

param(
  [string] $RepoRoot = "C:\AuditDNA\AUDIT_DNA_Frontend_Final",
  [string] $FrontendRel = "frontend",
  [string] $RemoteHttps = "https://github.com/SeabassFather/auditdna-frontend.git",
  [switch] $RunBuildAfterPush
)

function Fail($msg) {
  Write-Host "ERROR: $msg" -ForegroundColor Red
  exit 1
}

# 1) Ensure git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Fail "git is not in PATH. Install Git for Windows and retry."
}

# 2) Validate paths
if (-not (Test-Path $RepoRoot)) { Fail "Repo root not found: $RepoRoot" }
$FrontendPath = Join-Path $RepoRoot $FrontendRel
if (-not (Test-Path $FrontendPath)) { Fail "Frontend folder not found: $FrontendPath" }

# 3) Show current git status (brief)
Set-Location $RepoRoot
Write-Host "`n==== GIT STATUS (brief) ====" -ForegroundColor Cyan
git status --porcelain
Write-Host "==== END GIT STATUS ====`n" -ForegroundColor Cyan

# 4) Stage only the frontend folder and commit if there are changes
Write-Host "Staging frontend folder: $FrontendRel"
git add -- $FrontendRel

# Detect whether there is anything to commit
$diffIndex = git diff --cached --name-only
if ([string]::IsNullOrWhiteSpace($diffIndex)) {
  Write-Host "No staged changes to commit for '$FrontendRel'. Nothing to do." -ForegroundColor Yellow
} else {
  $ts = (Get-Date).ToString("yyyyMMdd-HHmmss")
  $commitMsg = "chore: replace frontend with SUPREME frontend ($ts)"
  Write-Host "Committing staged changes with message: $commitMsg"
  $commitResult = git commit -m $commitMsg 2>&1
  if ($LASTEXITCODE -ne 0) {
    Write-Host $commitResult
    Fail "git commit failed."
  } else {
    Write-Host $commitResult
  }
}

# 5) Ensure remote is HTTPS and set credential helper
Write-Host "`nConfiguring HTTPS remote: $RemoteHttps"
# remove existing origin silently (if present)
git remote remove origin 2>$null

git remote add origin $RemoteHttps
if ($LASTEXITCODE -ne 0) {
  Fail "Failed to add remote origin: $RemoteHttps"
}

# Use Windows credential manager to avoid repeated prompts
Write-Host "Configuring credential helper to manager-core (will cache credentials)"
git config --global credential.helper manager-core

# 6) Ensure branch name is main (safe)
Write-Host "Ensuring local branch is 'main'"
git branch -M main 2>$null

# 7) Push to remote
Write-Host "`nPushing to remote origin main (HTTPS). You may be prompted for GitHub credentials or a PAT if using 2FA."
$pushOutput = git push -u origin main 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host $pushOutput
  Fail "git push failed. If you use 2FA, use a Personal Access Token (PAT) as the password when prompted, or configure SSH and push via SSH."
} else {
  Write-Host $pushOutput
  Write-Host "Push succeeded." -ForegroundColor Green
}

# 8) Optional: run npm build inside the frontend folder (if requested)
if ($RunBuildAfterPush) {
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm not found in PATH; skipping build." -ForegroundColor Yellow
  } else {
    Write-Host "`nRunning npm ci && npm run build in $FrontendPath (this can take a while)..."
    Push-Location $FrontendPath
    # prefer npm ci for clean install if package-lock exists
    if (Test-Path (Join-Path $FrontendPath "package-lock.json")) {
      npm ci
    } else {
      npm install
    }
    if ($LASTEXITCODE -ne 0) {
      Pop-Location
      Fail "npm install/ci failed."
    }
    npm run build
    if ($LASTEXITCODE -ne 0) {
      Pop-Location
      Fail "npm run build failed."
    }
    Pop-Location
    Write-Host "Build completed successfully." -ForegroundColor Green
  }
}

Write-Host "`nAll done. If you need to revert to the backup copy of the previous frontend, run these two commands:"
Write-Host "  Remove-Item -Recurse -Force `"$FrontendPath`""
Write-Host "  Rename-Item -Path `"$RepoRoot\frontend_backup_*`" -NewName $FrontendRel"
Write-Host "NOTE: Replace the wildcard path with the actual backup folder name if multiple exist."