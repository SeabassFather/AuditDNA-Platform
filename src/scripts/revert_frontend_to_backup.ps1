<#
revert_frontend_to_backup.ps1
Purpose: Revert the current frontend folder back to the backup created earlier.
VERY IMPORTANT: This will delete the current frontend folder. Only run if you verified the backup exists.
Usage (dry-run): powershell -ExecutionPolicy Bypass -File .\revert_frontend_to_backup.ps1
To actually perform revert: add -Confirm:$true
Example:
  powershell -ExecutionPolicy Bypass -File .\revert_frontend_to_backup.ps1 -RepoRoot "C:\AuditDNA\AUDIT_DNA_Frontend_Final" -BackupFolder "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend_backup_20251101-132250" -Confirm:$true
#>

param(
  [string] $RepoRoot = "C:\AuditDNA\AUDIT_DNA_Frontend_Final",
  [string] $BackupFolder = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend_backup_20251101-132250",
  [switch] $Confirm
)

function Fail($msg) { Write-Host "ERROR: $msg" -ForegroundColor Red; exit 1 }

$FrontendPath = Join-Path $RepoRoot "frontend"

# Verify backup exists and destination exists
if (-not (Test-Path $BackupFolder)) { Fail "Backup folder not found: $BackupFolder" }
if (-not (Test-Path $RepoRoot)) { Fail "Repo root not found: $RepoRoot" }

Write-Host "About to DO THE FOLLOWING (no changes until you confirm):" -ForegroundColor Yellow
Write-Host "1) Remove current frontend: $FrontendPath"
Write-Host "2) Rename backup -> frontend: $BackupFolder -> $FrontendPath"
Write-Host "`nIf you want to proceed, re-run this script with -Confirm:$true"

if ($Confirm) {
  # Double-check again
  if (-not (Test-Path $BackupFolder)) { Fail "Backup disappeared: $BackupFolder" }
  if (Test-Path $FrontendPath) {
    Write-Host "Removing current frontend: $FrontendPath" -ForegroundColor Yellow
    Remove-Item -Recurse -Force $FrontendPath
  }
  Write-Host "Renaming backup -> frontend"
  Rename-Item -Path $BackupFolder -NewName "frontend"
  Write-Host "Revert complete. Verify with: Test-Path `"$FrontendPath`"" -ForegroundColor Green
} else {
  Write-Host "`nDry-run only. No changes made." -ForegroundColor Yellow
}