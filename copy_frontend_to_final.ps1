# copy_frontend_to_final.ps1
# Safe copy: backup destination then copy source -> destination (non-destructive except overwrite)
# Edit $src and $dest if needed, then run this script in PowerShell.
$src = "C:\AuditDNA\AuditDNA_Supreme_Frontend\frontend"
$dest = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

Write-Host "SOURCE: $src"
Write-Host "DESTINATION: $dest"
Write-Host "BACKUP_TIMESTAMP: $timestamp"
$confirm = Read-Host "Type YES to BACK UP existing destination and COPY source -> destination (will overwrite same-named files)"
if ($confirm -ne "YES") { Write-Host "Cancelled by user. No changes made."; exit 0 }

# ensure parent's existence
$destParent = Split-Path $dest -Parent
if (-not (Test-Path $destParent)) { New-Item -ItemType Directory -Path $destParent -Force | Out-Null }

# backup existing destination if present
if (Test-Path $dest) {
  $destBackup = Join-Path $destParent ("AUDIT_DNA_Frontend_Final_backup_$timestamp")
  Write-Host "Backing up existing destination to: $destBackup"
  New-Item -ItemType Directory -Path $destBackup -Force | Out-Null
  robocopy $dest $destBackup /E /COPY:DAT /R:2 /W:1
  if ($LASTEXITCODE -ge 8) {
    Write-Host "WARN: robocopy reported an error during backup (exit code $LASTEXITCODE). Check $destBackup"
  } else {
    Write-Host "Backup completed: $destBackup"
  }
} else {
  Write-Host "Destination does not exist; it will be created by robocopy."
}

# copy source -> destination (exclude .git/node_modules/transfer_backups/BACKUP_BEFORE*)
Write-Host "Copying source -> destination (excluding .git, node_modules, transfer_backups, BACKUP_BEFORE*):"
robocopy $src $dest /E /COPY:DAT /R:2 /W:1 /XD "$src\.git" "$src\node_modules" "$src\transfer_backups" "$src\BACKUP_BEFORE*"
$rc = $LASTEXITCODE
Write-Host "robocopy exit code: $rc"

if ($rc -ge 8) {
  Write-Host "ERROR: robocopy reported errors. Inspect above output for details."
} else {
  Write-Host "COPY_OK: source copied to destination (files overwritten where names matched)."
}

# short listing to confirm
Write-Host "`nDestination top-level entries (first 40):"
Get-ChildItem -Path $dest -Force | Select-Object -First 40 | ForEach-Object { Write-Host $_.FullName }

Write-Host "`nFirst 20 files under destination (recursively):"
Get-ChildItem -Path $dest -Recurse -File -ErrorAction SilentlyContinue | Select-Object -First 20 | ForEach-Object { Write-Host $_.FullName }

Write-Host "`nDone. Paste the 'robocopy exit code: N' line here and confirm 'destination OK' (or paste the first 10 filenames)."