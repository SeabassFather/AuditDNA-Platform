# ======================================================================
# 🧠 AUDITDNA FRONTEND REPAIR KIT
# One-tap fixer for import paths, encoding junk, and navbar merge debris
# ======================================================================

$base = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src"
$app  = Join-Path $base "App.jsx"
$navbar = Join-Path $base "components\layout\Navbar.jsx"
$api   = Join-Path $base "utils\api.js"
$refi  = Join-Path $base "pages\finance_mexico\MexicoRefiCard.jsx"

Write-Host "🔧 Starting AuditDNA Frontend auto-repair..." -ForegroundColor Cyan

# ---1️⃣  FIX IMPORT PATHS IN APP.JSX ---
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
    Write-Host "✅ App.jsx import paths fixed." -ForegroundColor Green
} else {
    Write-Host "⚠️ App.jsx not found." -ForegroundColor Yellow
}

# --- 2️⃣  CLEAN NAVBAR MERGE CONFLICT MARKERS ---
if (Test-Path $navbar) {
    (Get-Content $navbar -Raw) `
    -replace '<<<<<<< HEAD', '' `
    -replace '=======', '' `
    -replace '>>>>>>>.*', '' `
    | Set-Content $navbar -Encoding UTF8
    Write-Host "✅ Navbar.jsx cleaned of merge markers." -ForegroundColor Green
}

# --- 3️⃣  FIX ENCODING / TEMPLATE LITERAL ISSUES IN API.JS ---
if (Test-Path $api) {
    (Get-Content $api -Raw) `
    -replace 'const url = category \? .+', 'const url = category ? `${BASE_URL}/tests/?category=${category}` : `${BASE_URL}/tests/`;' `
    | Set-Content $api -Encoding UTF8
    Write-Host "✅ api.js template literals fixed." -ForegroundColor Green
}

# --- 4️⃣  FIX IMPORTS IN MEXICOREFICARD.JSX ---
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

# --- 5️⃣  CLEAN COMMON DUPLICATE FIELDS IN ALL JSX FILES ---
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
    foreach ($pattern in $dupPatterns) {
        $content = $content -replace $pattern, ''
    }
    Set-Content $file $content -Encoding UTF8
}
Write-Host "✅ Duplicate field and encoding noise cleaned." -ForegroundColor Green

# --- 6️⃣  CLEAR CACHE & RESTART DEV SERVER ---
Write-Host "♻️  Cleaning cache and restarting dev server..." -ForegroundColor Cyan
cd "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue }
if (Test-Path "node_modules\.cache") { Remove-Item "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue }

npm run start
