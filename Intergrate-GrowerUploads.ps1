# ===============================
# AuditDNA: Integrate Grower Uploads & Analytics
# ===============================

Write-Host "`n=== AuditDNA Grower Uploads Integration ===" -ForegroundColor Cyan

# === Set Paths ===
$RepoBase = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src"
$GrowerModule = Join-Path $RepoBase "growers"
$GrowerComponent = Join-Path $GrowerModule "GrowerUploads.jsx"

# Create the growers directory if missing
if (-not (Test-Path $GrowerModule)) {
    New-Item -ItemType Directory -Path $GrowerModule -Force | Out-Null
    Write-Host "Created growers module folder at: $GrowerModule" -ForegroundColor Yellow
}

# --- Sample GrowerUploads Component File ---
$growerComp = @"
import React, { useState } from 'react';

/**
 * GrowerUploads.jsx
 * - Upload crop plans, certification docs, seasonal forecasts
 * - Show analytics by grower, variety, size, export, compliance
 * - Bilingual ready (EN/ES)
 */
const demoGrowers = [
  {
    name: "Green Valley MX",
    variety: "Hass",
    size: "48ct",
    region: "Michoacán",
    season: "2025-12 to 2026-03",
    casesPlanned: 5000,
    certifications: ["PrimusGFS", "GLOBALG.A.P."],
    complianceScore: 97,
    lastUpload: "2025-11-07",
    files: ["cert-primus.pdf", "crop-plan.xlsx", "trace-chain.pdf"],
    waterTest: { result: "PASS", ec: 2.8, pH: 7.6 },
    foodSafety: "All Clear"
  },
  // ...more growers
];

export default function GrowerUploads() {
  const [growers] = useState(demoGrowers);

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Grower Uploads & Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {growers.map((g,i) => (
          <div key={i} className="bg-green-50 p-6 rounded-xl shadow border border-green-200">
            <b>{g.name} - {g.variety} ({g.size}) </b>
            <div>Region: <b>{g.region}</b></div>
            <div>Season: <b>{g.season}</b></div>
            <div>Cases Planned: <b>{g.casesPlanned}</b></div>
            <div>Certs: <b>{g.certifications.join(", ")}</b></div>
            <div>Compliance Score: <b>{g.complianceScore}</b></div>
            <div>Last Upload: <b>{g.lastUpload}</b></div>
            <div>Files: {g.files.map((file,j)=><span key={j} className="mx-1 text-blue-700 underline">{file}</span>)}</div>
            <div>WaterTest: <b>{g.waterTest.result}</b> EC:{g.waterTest.ec}, pH:{g.waterTest.pH}</div>
            <div>Food Safety: <b className="text-green-700">{g.foodSafety}</b></div>
          </div>
        ))}
      </div>
      {/* You can expand: upload form, analytics chart, QR code, export as needed */}
    </div>
  );
}
"@
Set-Content -Path $GrowerComponent -Value $growerComp -Encoding UTF8

Write-Host "✅ GrowerUploads.jsx populated and ready!" -ForegroundColor Green

# === Update routes or dashboard file ===
# Optionally append import and route to your main dashboard or App.js
$AppFile = Join-Path $RepoBase "App.js"
if (Test-Path $AppFile) {
    $appContent = Get-Content $AppFile -Raw
    $growerImport = "import GrowerUploads from './growers/GrowerUploads';"
    if ($appContent -notmatch "GrowerUploads") {
        $appContent = $growerImport + "`r`n" + $appContent
        Write-Host "✅ GrowerUploads import added to App.js" -ForegroundColor Green
        Set-Content -Path $AppFile -Value $appContent -Encoding UTF8
    }
    # Add a route (React Router v6 style, customize to match your structure)
    $growerRoute = "<Route path=\"/growers\" element={<GrowerUploads />} />"
    if ($appContent -notmatch "/growers") {
        $appContent = $appContent -replace "(?<=<Routes>)", "`r`n$growerRoute`r`n"
        Set-Content -Path $AppFile -Value $appContent -Encoding UTF8
        Write-Host "✅ GrowerUploads route injected into App.js" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ GrowerUploads route already exists." -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ App.js not found at $AppFile (add module manually)" -ForegroundColor Red
}

Write-Host "`n=== Integration Complete! ===" -ForegroundColor Cyan
Write-Host "Restart frontend (npm start) to view GrowerUploads." -ForegroundColor Yellow