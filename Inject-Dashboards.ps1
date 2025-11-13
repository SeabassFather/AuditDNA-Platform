# ============================================================
# 🚀 AuditDNA Dashboard Auto-Sync Utility  —  JSX Safe Edition
# ============================================================

$base   = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$srcDir = Join-Path $base "src"
$appJs  = Join-Path $srcDir "App.jsx"

Write-Host "🔍  Scanning for dashboards under $srcDir ..." -ForegroundColor Cyan

# --- 1️⃣  Find all *Dashboard.jsx under src/pages ---
$dashboards = Get-ChildItem -Path (Join-Path $srcDir "pages") -Filter "*Dashboard.jsx" -Recurse -ErrorAction SilentlyContinue
if (-not $dashboards) {
    Write-Host "⚠️  No Dashboard.jsx files found." -ForegroundColor Yellow
    exit
}

# --- 2️⃣  Build imports and routes ---
$importLines = @()
$routeLines  = @()

foreach ($file in $dashboards) {
    $relPath   = $file.FullName.Replace("$srcDir\", "").Replace("\", "/")
    $component = [IO.Path]::GetFileNameWithoutExtension($file.Name)

    $importLines += "import $component from './$relPath';"

    # make a URL slug like /water-analysis
    $slug = $component -replace 'Dashboard',''
    $slug = [regex]::Replace($slug,'([A-Z])','-$1').ToLower().Trim('-')

    $routeLines += "          <Route path='/$slug' element={<$component />} />"
}

# --- 3️⃣  Construct App.jsx using here-string (no JSX parsing issues) ---
$appContent = @'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import HomePage from "./pages/HomePage";
'@ + "`r`n" + ($importLines -join "`r`n") + @'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
'@ + "`r`n" + ($routeLines -join "`r`n") + @'
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
                🚫 Route not found — AuditDNA Frontend
              </div>
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
'@

# --- 4️⃣  Backup & write ---
$backupDir = Join-Path $srcDir ("backup_routes_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
Copy-Item $appJs (Join-Path $backupDir "App_backup.jsx") -Force
$appContent | Set-Content -Path $appJs -Encoding UTF8
Write-Host "✅  App.jsx updated with $($dashboards.Count) dashboards." -ForegroundColor Green

# --- 5️⃣  Restart dev server ---
Write-Host "🧹  Clearing cache and restarting dev server..." -ForegroundColor Cyan
cd $base
Remove-Item -Recurse -Force .\.cache, .\.vite, .\build -ErrorAction SilentlyContinue
npm start
