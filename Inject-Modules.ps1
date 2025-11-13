# ============================================================
# 🚀  AuditDNA Auto-Router  —  JSX-Perfect Edition
# ============================================================

$base   = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$srcDir = Join-Path $base "src"
$appJs  = Join-Path $srcDir "App.jsx"
$pages  = Join-Path $srcDir "pages"

Write-Host "🔍  Scanning for .jsx files under $pages ..." -ForegroundColor Cyan

# 1️⃣ Find every JSX component except HomePage.jsx
$jsxFiles = Get-ChildItem -Path $pages -Filter "*.jsx" -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -notmatch "^HomePage\.jsx$" }

if (-not $jsxFiles) {
    Write-Host "⚠️  No JSX files found under /pages." -ForegroundColor Yellow
    exit
}

# 2️⃣ Build import + route definitions
$importLines = @()
$routeLines  = @()

foreach ($file in $jsxFiles) {
    $relPath   = $file.FullName.Replace("$srcDir\", "").Replace("\", "/")
    $component = [IO.Path]::GetFileNameWithoutExtension($file.Name)

    $importLines += "import $component from './$relPath';"

    # Create a route slug (/water, /soil, etc.)
    $slug = $component -replace 'Dashboard',''
    $slug = [regex]::Replace($slug,'([A-Z])','-$1').ToLower().Trim('-')
    if (-not $slug) { $slug = $component.ToLower() }

    $routeLines += "          <Route path='/$slug' element={<$component />} />"
}

# 3️⃣ Construct the real JSX App.jsx (no strings escaped)
$appContent = @"
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import HomePage from "./pages/HomePage";

$($importLines -join "`r`n")

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
$($routeLines -join "`r`n")
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
"@

# 4️⃣ Backup + Write File
$backupDir = Join-Path $srcDir ("backup_routes_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
Copy-Item $appJs (Join-Path $backupDir "App_backup.jsx") -Force
$appContent | Out-File -FilePath $appJs -Encoding UTF8 -Force
Write-Host "✅  App.jsx updated with $($jsxFiles.Count) pages." -ForegroundColor Green

# 5️⃣ Restart Frontend
Write-Host "🧹  Cleaning cache and restarting dev server..." -ForegroundColor Cyan
cd $base
Remove-Item -Recurse -Force .\.cache, .\.vite, .\build -ErrorAction SilentlyContinue
npm start
