# 🚀 AUDITDNA MEGA DEPLOYMENT - ALL 15 FILES
Write-Host "🚀 STARTING MEGA DEPLOYMENT..." -ForegroundColor Cyan
$target = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src"

# Copy all files from outputs
$files = @(
  "App.jsx",
  "CartContext.jsx",
  "LanguageContext.jsx",
  "ProduceAnalyticsPanel.jsx",
  "ProducePOForm.jsx",
  "FactoringDashboard.jsx",
  "CartSummary.jsx",
  "WaterResultsAnalysis.jsx",
  "WaterTechModuleAdvanced.jsx",
  "USDACommodityChart.jsx",
  "translations.js",
  "audioSystem.js",
  "waterTestCatalog.js",
  "growerDatabase.js",
  "WaterTech.css"
)

Write-Host "✅ Ready to copy $($files.Count) files to:"
Write-Host "   $target"
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

foreach ($file in $files) {
  Write-Host "📝 Copying $file..." -ForegroundColor Yellow
  Copy-Item ".\$file" "$target\$file" -Force
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ ALL FILES DEPLOYED!" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 RUN THESE COMMANDS:" -ForegroundColor Cyan
Write-Host "   cd C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend" -ForegroundColor White
Write-Host "   npm install axios recharts jspdf uuid lucide-react" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White