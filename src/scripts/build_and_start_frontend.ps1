<#
build_and_start_frontend.ps1
Purpose: Install dependencies and start the frontend dev server (or run build).
Usage:
  - Start dev server (new window, with logs): powershell -ExecutionPolicy Bypass -File .\build_and_start_frontend.ps1 -Mode dev
  - Produce production build: powershell -ExecutionPolicy Bypass -File .\build_and_start_frontend.ps1 -Mode build
Defaults assume frontend path: C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend
#>

param(
  [ValidateSet("dev","build")]
  [string] $Mode = "dev",
  [string] $FrontendPath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
)

function Fail($msg) { Write-Host "ERROR: $msg" -ForegroundColor Red; exit 1 }

if (-not (Test-Path $FrontendPath)) { Fail "Frontend path not found: $FrontendPath" }
Set-Location $FrontendPath

# Ensure npm exists
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Fail "npm not found in PATH. Install Node.js (which includes npm) and retry." }

$ts = Get-Date -Format yyyyMMddHHmmss
$installLog = ".\npm_install_$ts.log"
$startLog   = ".\npm_start_$ts.log"

Write-Host "Running npm install (logs -> $installLog)..."
# Use npm ci if lockfile exists for repeatable install
if (Test-Path ".\package-lock.json") {
  npm ci 2>&1 | Tee-Object -FilePath $installLog
} else {
  npm install 2>&1 | Tee-Object -FilePath $installLog
}
if ($LASTEXITCODE -ne 0) { Fail "npm install/ci failed. See $installLog" }

if ($Mode -eq "dev") {
  Write-Host "Starting dev server (logs -> $startLog) in a NEW PowerShell window..."
  $cmd = "npm start 2>&1 | Tee-Object -FilePath `"$startLog`""
  Start-Process -FilePath powershell -ArgumentList '-NoExit','-Command',$cmd -WorkingDirectory (Get-Location)
  Write-Host "Dev server started in new window. Tail logs with: Get-Content $startLog -Tail 200 -Wait"
} else {
  Write-Host "Producing production build (logs -> $startLog)..."
  npm run build 2>&1 | Tee-Object -FilePath $startLog
  if ($LASTEXITCODE -ne 0) { Fail "npm run build failed. See $startLog" }
  Write-Host "Build completed. Output directory: $(Join-Path $FrontendPath 'build')" -ForegroundColor Green
}