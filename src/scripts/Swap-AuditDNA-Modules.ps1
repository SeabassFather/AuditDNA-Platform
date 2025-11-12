# ==============================================================
#  AuditDNA Ag-Trace 5.0 — Real Module Restore Script
#  Restores real heavy modules into /src/pages folders
# ==============================================================

$base = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src\pages"

# --- Define source locations for the real modules ---
$realModules = @{
  "traceability\TraceabilityModule.jsx"        = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\TraceabilityModule.jsx"
  "produce\ProduceIntelligenceModule.jsx"      = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\ProduceIntelligenceModule.jsx"
  "finance\FinancialServices.jsx"              = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\FinancialServices.jsx"
  "testing\TestingServicesHub.jsx"             = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\TestingServicesHub.jsx"
}

Write-Host "`n🧹 Removing placeholder modules..." -ForegroundColor Yellow
foreach ($relPath in $realModules.Keys) {
  $target = Join-Path $base $relPath
  if (Test-Path $target) {
    Remove-Item $target -Force
    Write-Host "🗑️ Deleted placeholder: $target"
  } else {
    Write-Host "⚪ Placeholder not found: $target"
  }
}

Write-Host "`n📦 Moving real module files into position..." -ForegroundColor Cyan
foreach ($relPath in $realModules.Keys) {
  $source = $realModules[$relPath]
  $target = Join-Path $base $relPath
  $folder = Split-Path $target -Parent

  if (-not (Test-Path $folder)) {
    New-Item -ItemType Directory -Path $folder | Out-Null
    Write-Host "📁 Created folder: $folder"
  }

  if (Test-Path $source) {
    Copy-Item $source $target -Force
    Write-Host "✅ Installed real module: $relPath"
  } else {
    Write-Host "⚠️ Source missing: $source"
  }
}

Write-Host "`n🔧 Repairing App.jsx imports..." -ForegroundColor Green
$appFile = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src\App.jsx"
if (Test-Path $appFile) {
  $content = Get-Content $appFile -Raw

  $content = $content -replace '(?m)^.*TraceabilityModule.*$', 'import TraceabilityModule from "./pages/traceability/TraceabilityModule";'
  $content = $content -replace '(?m)^.*ProduceIntelligenceModule.*$', 'import ProduceIntelligenceModule from "./pages/produce/ProduceIntelligenceModule";'
  $content = $content -replace '(?m)^.*FinancialServices.*$', 'import FinancialServices from "./pages/finance/FinancialServices";'
  $content = $content -replace '(?m)^.*TestingServicesHub.*$', 'import TestingServicesHub from "./pages/testing/TestingServicesHub";'

  Set-Content $appFile $content -Encoding UTF8
  Write-Host "✅ App.jsx routes confirmed"
} else {
  Write-Host "⚠️ App.jsx not found — verify path"
}

Write-Host "`n✨ Swap complete! Launching frontend..."
Start-Process powershell -ArgumentList 'cd "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"; npm start'
