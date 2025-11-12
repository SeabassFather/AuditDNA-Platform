# AUDITDNA MODULE VERIFICATION & INSTALLATION SCRIPT
# Run this script to verify and install all professional modules
# PowerShell 5.1+ required

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUDITDNA MODULE VERIFICATION SCRIPT  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Define paths
$frontendPath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$srcPath = "$frontendPath\src"
$downloadsPath = "$env:USERPROFILE\Downloads"

# Check if frontend directory exists
if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ ERROR: Frontend directory not found at $frontendPath" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Frontend directory found" -ForegroundColor Green
Write-Host ""

# List of modules to verify/install
$modules = @(
    @{Name="ProduceDashboard.jsx"; Description="Main Produce Dashboard"},
    @{Name="ProduceIntelligenceModule.jsx"; Description="500+ Product Intelligence Module"},
    @{Name="FoodSafetyDashboard.jsx"; Description="Food Safety & Compliance Module"},
    @{Name="GrowerManagement.jsx"; Description="Grower Directory & Management"},
    @{Name="App.jsx"; Description="Main App Router"}
)

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  STEP 1: CHECKING EXISTING FILES      " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

foreach ($module in $modules) {
    $filePath = "$srcPath\$($module.Name)"
    if (Test-Path $filePath) {
        Write-Host "✓ EXISTS: $($module.Name)" -ForegroundColor Green
        Write-Host "  Path: $filePath" -ForegroundColor Gray
    } else {
        Write-Host "✗ MISSING: $($module.Name)" -ForegroundColor Red
        Write-Host "  Expected: $filePath" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  STEP 2: CHECKING DOWNLOAD FILES      " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$allDownloadsExist = $true
foreach ($module in $modules) {
    $downloadPath = "$downloadsPath\$($module.Name)"
    if (Test-Path $downloadPath) {
        $fileSize = (Get-Item $downloadPath).Length
        Write-Host "✓ FOUND: $($module.Name) ($([math]::Round($fileSize/1KB, 2)) KB)" -ForegroundColor Green
    } else {
        Write-Host "✗ NOT FOUND: $($module.Name)" -ForegroundColor Red
        Write-Host "  Please download from Claude first!" -ForegroundColor Yellow
        $allDownloadsExist = $false
    }
    Write-Host ""
}

if (-not $allDownloadsExist) {
    Write-Host "❌ ERROR: Not all files are in Downloads folder" -ForegroundColor Red
    Write-Host "Please download all modules from Claude before running this script" -ForegroundColor Yellow
    exit 1
}

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  STEP 3: BACKUP EXISTING FILES        " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$backupFolder = "$srcPath\backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null
Write-Host "Created backup folder: $backupFolder" -ForegroundColor Cyan
Write-Host ""

$backedUp = 0
foreach ($module in $modules) {
    $filePath = "$srcPath\$($module.Name)"
    if (Test-Path $filePath) {
        Copy-Item $filePath "$backupFolder\$($module.Name)" -Force
        Write-Host "✓ Backed up: $($module.Name)" -ForegroundColor Green
        $backedUp++
    }
}

Write-Host ""
Write-Host "Backed up $backedUp file(s)" -ForegroundColor Cyan
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  STEP 4: INSTALLING NEW MODULES       " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$installed = 0
foreach ($module in $modules) {
    $downloadPath = "$downloadsPath\$($module.Name)"
    $destPath = "$srcPath\$($module.Name)"
    
    try {
        Copy-Item $downloadPath $destPath -Force
        Write-Host "✓ INSTALLED: $($module.Name)" -ForegroundColor Green
        Write-Host "  → $($module.Description)" -ForegroundColor Gray
        $installed++
    } catch {
        Write-Host "✗ FAILED: $($module.Name)" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  STEP 5: VERIFYING INSTALLATION       " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$verified = 0
foreach ($module in $modules) {
    $filePath = "$srcPath\$($module.Name)"
    if (Test-Path $filePath) {
        $fileSize = (Get-Item $filePath).Length
        if ($fileSize -gt 0) {
            Write-Host "✓ VERIFIED: $($module.Name) ($([math]::Round($fileSize/1KB, 2)) KB)" -ForegroundColor Green
            $verified++
        } else {
            Write-Host "⚠ WARNING: $($module.Name) exists but is empty" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ MISSING: $($module.Name)" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  STEP 6: CHECKING APP.JSX ROUTES      " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$appJsxPath = "$srcPath\App.jsx"
if (Test-Path $appJsxPath) {
    $appContent = Get-Content $appJsxPath -Raw
    
    $expectedRoutes = @(
        "/produce",
        "/produce/intelligence",
        "/produce/growers",
        "/foodsafety"
    )
    
    foreach ($route in $expectedRoutes) {
        if ($appContent -match [regex]::Escape($route)) {
            Write-Host "✓ Route configured: $route" -ForegroundColor Green
        } else {
            Write-Host "✗ Route missing: $route" -ForegroundColor Red
        }
    }
} else {
    Write-Host "✗ App.jsx not found!" -ForegroundColor Red
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALLATION SUMMARY                 " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total Modules: $($modules.Count)" -ForegroundColor White
Write-Host "Backed Up: $backedUp" -ForegroundColor Cyan
Write-Host "Installed: $installed" -ForegroundColor Green
Write-Host "Verified: $verified" -ForegroundColor Green
Write-Host ""

if ($verified -eq $modules.Count) {
    Write-Host "🎉 SUCCESS! All modules installed and verified!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "  NEXT STEPS                           " -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Navigate to frontend directory:" -ForegroundColor White
    Write-Host "   cd $frontendPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. Start the development server:" -ForegroundColor White
    Write-Host "   npm start" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3. Access your modules:" -ForegroundColor White
    Write-Host "   • Main Dashboard:      http://localhost:3000" -ForegroundColor Cyan
    Write-Host "   • Produce Intel:       http://localhost:3000/produce/intelligence" -ForegroundColor Cyan
    Write-Host "   • Grower Management:   http://localhost:3000/produce/growers" -ForegroundColor Cyan
    Write-Host "   • Food Safety:         http://localhost:3000/foodsafety" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Backup location: $backupFolder" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "⚠ WARNING: Not all modules were verified successfully" -ForegroundColor Yellow
    Write-Host "Installed: $installed/$($modules.Count)" -ForegroundColor Yellow
    Write-Host "Verified: $verified/$($modules.Count)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please check the errors above and try again." -ForegroundColor Yellow
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Script completed at $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Pause to see results
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")