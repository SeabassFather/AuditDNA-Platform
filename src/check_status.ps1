# AUDITDNA MODULE STATUS CHECK SCRIPT
# Run this to check current status of all modules

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUDITDNA MODULE STATUS CHECK         " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$frontendPath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$srcPath = "$frontendPath\src"

if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ Frontend directory not found!" -ForegroundColor Red
    exit 1
}

# Check package.json
Write-Host "PROJECT INFO:" -ForegroundColor Yellow
if (Test-Path "$frontendPath\package.json") {
    $packageJson = Get-Content "$frontendPath\package.json" | ConvertFrom-Json
    Write-Host "  Name: $($packageJson.name)" -ForegroundColor White
    Write-Host "  Version: $($packageJson.version)" -ForegroundColor White
} else {
    Write-Host "  ⚠ package.json not found" -ForegroundColor Yellow
}
Write-Host ""

# Check critical files
Write-Host "CRITICAL FILES:" -ForegroundColor Yellow
$criticalFiles = @(
    "package.json",
    "src\index.js",
    "src\index.css",
    "src\App.jsx"
)

foreach ($file in $criticalFiles) {
    $fullPath = "$frontendPath\$file"
    if (Test-Path $fullPath) {
        $size = (Get-Item $fullPath).Length
        Write-Host "  ✓ $file ($([math]::Round($size/1KB, 2)) KB)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file MISSING" -ForegroundColor Red
    }
}
Write-Host ""

# Check modules
Write-Host "INSTALLED MODULES:" -ForegroundColor Yellow
$modules = @(
    @{Name="ProduceDashboard.jsx"; Route="/produce"},
    @{Name="ProduceIntelligenceModule.jsx"; Route="/produce/intelligence"},
    @{Name="FoodSafetyDashboard.jsx"; Route="/foodsafety"},
    @{Name="GrowerManagement.jsx"; Route="/produce/growers"}
)

$installedCount = 0
foreach ($module in $modules) {
    $filePath = "$srcPath\$($module.Name)"
    if (Test-Path $filePath) {
        $size = (Get-Item $filePath).Length
        Write-Host "  ✓ $($module.Name)" -ForegroundColor Green
        Write-Host "    Size: $([math]::Round($size/1KB, 2)) KB" -ForegroundColor Gray
        Write-Host "    Route: $($module.Route)" -ForegroundColor Gray
        $installedCount++
    } else {
        Write-Host "  ✗ $($module.Name) NOT INSTALLED" -ForegroundColor Red
        Write-Host "    Expected: $filePath" -ForegroundColor Gray
    }
    Write-Host ""
}

# Check App.jsx routes
Write-Host "APP.JSX ROUTES:" -ForegroundColor Yellow
$appJsxPath = "$srcPath\App.jsx"
if (Test-Path $appJsxPath) {
    $appContent = Get-Content $appJsxPath -Raw
    
    $routes = @(
        @{Path="/"; Component="ProduceDashboard"},
        @{Path="/produce/intelligence"; Component="ProduceIntelligenceModule"},
        @{Path="/produce/growers"; Component="GrowerManagement"},
        @{Path="/foodsafety"; Component="FoodSafetyDashboard"}
    )
    
    foreach ($route in $routes) {
        $routeExists = $appContent -match [regex]::Escape($route.Path)
        $componentExists = $appContent -match $route.Component
        
        if ($routeExists -and $componentExists) {
            Write-Host "  ✓ $($route.Path) → $($route.Component)" -ForegroundColor Green
        } elseif ($routeExists) {
            Write-Host "  ⚠ $($route.Path) (route exists, component may be wrong)" -ForegroundColor Yellow
        } else {
            Write-Host "  ✗ $($route.Path) NOT CONFIGURED" -ForegroundColor Red
        }
    }
} else {
    Write-Host "  ✗ App.jsx not found!" -ForegroundColor Red
}
Write-Host ""

# Check node_modules
Write-Host "DEPENDENCIES:" -ForegroundColor Yellow
$nodeModulesPath = "$frontendPath\node_modules"
if (Test-Path $nodeModulesPath) {
    $moduleCount = (Get-ChildItem $nodeModulesPath -Directory).Count
    Write-Host "  ✓ node_modules installed ($moduleCount packages)" -ForegroundColor Green
    
    # Check key dependencies
    $keyDeps = @("react", "react-router-dom", "lucide-react", "recharts")
    foreach ($dep in $keyDeps) {
        if (Test-Path "$nodeModulesPath\$dep") {
            Write-Host "    ✓ $dep" -ForegroundColor Gray
        } else {
            Write-Host "    ✗ $dep MISSING" -ForegroundColor Red
        }
    }
} else {
    Write-Host "  ✗ node_modules not found - run 'npm install'" -ForegroundColor Red
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUMMARY                               " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Modules Installed: $installedCount / $($modules.Count)" -ForegroundColor $(if($installedCount -eq $modules.Count){"Green"}else{"Yellow"})
Write-Host ""

if ($installedCount -eq $modules.Count) {
    Write-Host "✅ All modules are installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ready to start:" -ForegroundColor White
    Write-Host "  cd $frontendPath" -ForegroundColor Cyan
    Write-Host "  npm start" -ForegroundColor Cyan
} else {
    Write-Host "⚠ Some modules are missing" -ForegroundColor Yellow
    Write-Host "Run install_modules.ps1 to install all modules" -ForegroundColor White
}
Write-Host ""

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")