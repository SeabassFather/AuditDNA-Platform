<#
commit_and_push_frontend.ps1
Purpose: Stage only the frontend folder, commit changes (if any), and push to the auditdna-frontend repo via HTTPS.
Usage: powershell -ExecutionPolicy Bypass -File .\commit_and_push_frontend.ps1
Parameters: Edit defaults at top if your paths/remotes differ.
#>

# --- CONFIGURE BELOW IF NEEDED ---
$RepoRoot    = "C:\AuditDNA\AUDIT_DNA_Frontend_Final"
$FrontendRel = "frontend"
$RemoteHttps = "https://github.com/SeabassFather/auditdna-frontend.git"
# ----------------------------------

function Fail($msg) { Write-Host "ERROR: $msg" -ForegroundColor Red; exit 1 }

# Ensure git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail "git not found in PATH. Install Git for Windows and retry." }

# Validate repo root and frontend path
if (-not (Test-Path $RepoRoot)) { Fail "Repo root not found: $RepoRoot" }
$FrontendPath = Join-Path $RepoRoot $FrontendRel
if (-not (Test-Path $FrontendPath)) { Fail "Frontend folder not found: $FrontendPath" }

# Move to repo root
Set-Location $RepoRoot

# Show brief status
Write-Host "`n==== GIT STATUS (brief) ====" -ForegroundColor Cyan
git status --porcelain
Write-Host "==== END GIT STATUS ====`n" -ForegroundColor Cyan

# Stage frontend only
Write-Host "Staging frontend folder: $FrontendRel"
git add -- $FrontendRel

# Check for staged changes
$staged = git diff --cached --name-only
if ([string]::IsNullOrWhiteSpace($staged)) {
  Write-Host "No staged changes found for '$FrontendRel'. Nothing to commit." -ForegroundColor Yellow
  exit 0
}

# Commit
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

# Configure HTTPS remote (replace any existing origin)
Write-Host "`nConfiguring remote origin -> $RemoteHttps"
git remote remove origin 2>$null
git remote add origin $RemoteHttps
if ($LASTEXITCODE -ne 0) { Fail "Failed to add remote origin: $RemoteHttps" }

# Use Windows credential manager to cache credentials
Write-Host "Configuring credential helper to manager-core (will cache credentials)"
git config --global credential.helper manager-core

# Ensure branch name is main
Write-Host "Ensuring local branch is 'main'"
git branch -M main 2>$null

# Push
Write-Host "`nPushing to origin main (HTTPS). You may be prompted for credentials or a PAT."
$pushOutput = git push -u origin main 2>&1
Write-Host $pushOutput
if ($LASTEXITCODE -ne 0) { Fail "git push failed. If you use 2FA, use a Personal Access Token (PAT) when prompted." }

Write-Host "`nPush succeeded." -ForegroundColor Green