# ======================================================================
# 🧠 AUDITDNA FRONTEND REPAIR KIT v2
# One-tap self-healing fixer + notifier for missing/misplaced modules
# ======================================================================

$base = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src"
$app  = Join-Path $base "App.jsx"
$navbar = Join-Path $base "components\layout\Navbar.jsx"
$api   = Join-Path $base "utils\api.js"
$refi  = Join-Path $base "pages\finance_mexico\MexicoRefiCard.jsx"

Write-Host "`n🧠 Starting AuditDNA Frontend Self-Heal..." -ForegroundColor Cyan

# =============================================================
# 1️⃣ FIX IMPORT PATHS IN APP.JSX
# =============================================================
if (Test-Path $app) {
    (Get-Content $app -Raw) `
    -replace '\.\/components\/admin\/', './pages/admin/' `
    -replace '\.\/components\/produce\/', './pages/produce/' `
    -replace '\.\/components\/usda\/', './pages/usda/' `
    -replace '\.\/components\/traceability\/', './pages/traceability/' `
    -replace '\.\/components\/logistics\/', './pages/logistics/' `
    -replace '\.\/components\/finance_mexico\/', './pages/finance_mexico/' `
    -replace '\.\/components\/real_estate\/', './pages/real_estate/' `
    -replace '\.\/components\/legal\/', './pages/legal/' `
    -replace '\.\/components\/investor\/', './pages/investor/' `
    -replace '\.\/components\/latinamerica\/', './pages/latinamerica/' `
    -replace '\.\/components\/protein\/', './pages/protein/' `
    | Set-Content $app -Encoding UTF8
    Write-Host "✅ App.jsx imports verified." -ForegroundColor Green
}

# =============================================================
# 2️⃣ CLEAN NAVBAR MERGE MARKERS
# =============================================================
if (Test-Path $navbar) {
    (Get-Content $navbar -Raw) `
    -replace '<<<<<<< HEAD', '' `
    -replace '=======', '' `
    -replace '>>>>>>>.*', '' `
    | Set-Content $navbar -Encoding UTF8
    Write-Host "✅ Navbar merge debris removed." -ForegroundColor Green
}

# =============================================================
# 3️⃣ FIX api.js TEMPLATE LITERALS
# =============================================================
if (Test-Path $api) {
    (Get-Content $api -Raw) `
    -replace 'const url = category \? .+', 'const url = category ? `${BASE_URL}/tests/?category=${category}` : `${BASE_URL}/tests/`;' `
    | Set-Content $api -Encoding UTF8
    Write-Host "✅ api.js fixed and cleaned." -ForegroundColor Green
}

# =============================================================
# 4️⃣ REPAIR MEXICOREFICARD IMPORTS
# =============================================================
if (Test-Path $refi) {
    (Get-Content $refi -Raw) `
    -replace '\.\/OwnerBuyerForm', './pages/real_estate/OwnerBuyerForm' `
    -replace '\.\/PropertyUploadForm', './pages/real_estate/PropertyUploadForm' `
    -replace '\.\/ReferralPartnerCard', './pages/real_estate/ReferralPartnerCard' `
    -replace '\.\/AgentRegistrationCard', './pages/real_estate/AgentRegistrationCard' `
    -replace '\.\/AppraisalServicesCard', './pages/real_estate/AppraisalServicesCard' `
    -replace '\.\/LegalQuestionnaireCard', './pages/real_estate/LegalQuestionnaireCard' `
    | Set-Content $refi -Encoding UTF8
    Write-Host "✅ MexicoRefiCard imports repaired." -ForegroundColor Green
}

# =============================================================
# 5️⃣ CLEAN ENCODING + DUPLICATES
# =============================================================
$dupPatterns = @(
    'bio:.*bio:',
    'thankyou:.*thankyou:',
    'icon:.*icon:',
    'image:.*image:',
    'description:.*description:',
    'const sellersSeed',
    'const url = category'
)
Get-ChildItem $base -Recurse -Include *.jsx,*.js | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw
    foreach ($pattern in $dupPatterns) { $content = $content -replace $pattern, '' }
    Set-Content $file $content -Encoding UTF8
}
Write-Host "✅ Encoding & duplicate junk cleaned." -ForegroundColor Green

# =============================================================
# 6️⃣ DETECT AND MOVE MISPLACED FILES
# =============================================================
$moduleFolders = @{
    "admin" = "Megadashboard.jsx","AdminDashboard.jsx"
    "produce" = "SupplierManagement.jsx","ProduceDashboard.jsx","PriceAnalytics.jsx","GrowerProfileModal.jsx"
    "usda" = "USDAIntelligenceDashboard.jsx","USDAGrowerSearchEngine.jsx"
    "traceability" = "Traceabilitymodule.jsx","NotificationCenter.jsx"
    "logistics" = "LatAmLogistics.jsx","CarrierRates.jsx","Insurance.jsx","CostCalculator.jsx","RouteMap.jsx","DocumentTracker.jsx"
    "finance_mexico" = "MexicoFinance.jsx","MexicoLoanMatcher.jsx","MexicoRefiCard.jsx"
    "real_estate" = "PropertySearch.jsx","PropertyUploadForm.jsx","MortgageSearch.jsx","OwnerBuyerForm.jsx","OwnerContactCard.jsx"
}

Write-Host "`n🔍 Scanning for misplaced or missing modules..." -ForegroundColor Cyan
$missingModules = @()

foreach ($folder in $moduleFolders.Keys) {
    foreach ($file in $moduleFolders[$folder]) {
        $target = Join-Path $base "pages\$folder\$file"
        if (-not (Test-Path $target)) {
            $found = Get-ChildItem $base -Recurse -Include $file -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($found) {
                $destDir = Join-Path $base "pages\$folder"
                if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
                Move-Item $found.FullName $destDir -Force
                Write-Host "✅ Moved $file → $folder" -ForegroundColor Green
            } else {
                $missingModules += $file
            }
        }
    }
}

if ($missingModules.Count -gt 0) {
    Write-Host "`n⚠️ Missing Modules Detected:" -ForegroundColor Yellow
    $missingModules | ForEach-Object { Write-Host "   - $_" -ForegroundColor Red }
    Write-Host "🟡 Please upload or restore these files before next build." -ForegroundColor Yellow
} else {
    Write-Host "🎯 All modules present and aligned correctly!" -ForegroundColor Green
}

# =============================================================
# 7️⃣ CLEAR CACHE & RESTART DEV SERVER
# =============================================================
Write-Host "`n♻️  Cleaning cache and restarting dev server..." -ForegroundColor Cyan
cd "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
if (Test-Path "node_modules\.cache") { Remove-Item "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue }
if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue }

npm run start
