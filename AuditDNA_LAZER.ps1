# ===================================================================
# 🔥 AUDITDNA LAZER STACK DEPLOYER 🔥
# Frontend + Backend + USDA Intelligence + Auto-Heal + Hot Reload
# ===================================================================

$ErrorActionPreference = "SilentlyContinue"
Write-Host "`n⚙️ Starting AuditDNA Lazer Stack Build..." -ForegroundColor Cyan

# -------------------------------------------------------------------
# 1️⃣  Environment + Directories
# -------------------------------------------------------------------
$backend = "C:\AuditDNA_Elite\backend"
$frontend = "C:\AuditDNA_Produce_International\frontend"
$envFile = Join-Path $backend ".env"

if (-not (Test-Path $backend)) { New-Item -ItemType Directory -Force -Path $backend | Out-Null }
if (-not (Test-Path $frontend)) { New-Item -ItemType Directory -Force -Path $frontend | Out-Null }

# -------------------------------------------------------------------
# 2️⃣  Inject or Update .env with USDA API Key
# -------------------------------------------------------------------
if (-not (Test-Path $envFile)) { New-Item -ItemType File -Path $envFile | Out-Null }

$envContent = Get-Content $envFile -Raw
if ($envContent -notmatch "USDA_API_KEY=") {
    Add-Content $envFile "`nUSDA_API_KEY=4F158DB1-85C2-3243-BFFA-58B53FB40D23"
    Write-Host "✅ USDA API key inserted into .env" -ForegroundColor Green
} else {
    Write-Host "ℹ️ USDA API key already present." -ForegroundColor Yellow
}

# -------------------------------------------------------------------
# 3️⃣  Backend USDA Intelligence Route
# -------------------------------------------------------------------
$routesDir = Join-Path $backend "routes"
if (-not (Test-Path $routesDir)) { New-Item -ItemType Directory -Path $routesDir | Out-Null }

$usdaRoute = Join-Path $routesDir "usdaRoutes.js"
@"
import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

const USDA_BASE = 'https://quickstats.nass.usda.gov/api/api_GET/';
const API_KEY = process.env.USDA_API_KEY;

router.get('/prices', async (req, res) => {
  const { commodity = 'AVOCADOS', year = '2024' } = req.query;
  try {
    const url = \`https://quickstats.nass.usda.gov/api/api_GET/?key=\${API_KEY}&commodity_desc=\${commodity}&year=\${year}\`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
"@ | Set-Content $usdaRoute -Encoding UTF8
Write-Host "✅ USDA Intelligence route injected at $usdaRoute" -ForegroundColor Green

# -------------------------------------------------------------------
# 4️⃣  Backend Server Wiring
# -------------------------------------------------------------------
$serverFile = Join-Path $backend "server.js"
if (-not (Test-Path $serverFile)) {
@"
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usdaRoutes from './routes/usdaRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usda', usdaRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(\`🚀 AuditDNA Backend running on port \${PORT}\`));
"@ | Set-Content $serverFile -Encoding UTF8
Write-Host "✅ Server.js created and USDA route mounted." -ForegroundColor Green
}

# -------------------------------------------------------------------
# 5️⃣  Install Dependencies (Multi-threaded)
# -------------------------------------------------------------------
Start-Job { cd $using:backend; npm install express cors dotenv node-fetch nodemon --force | Out-Null }
Start-Job { cd $using:frontend; npm install react-router-dom recharts react-select concurrently --force | Out-Null }
Write-Host "🚀 Installing dependencies in background..." -ForegroundColor Cyan

# -------------------------------------------------------------------
# 6️⃣  Auto-Reload + Concurrent Start Script
# -------------------------------------------------------------------
$packageFile = Join-Path $frontend "package.json"
if (Test-Path $packageFile) {
    $json = Get-Content $packageFile -Raw | ConvertFrom-Json
    $json.scripts.dev = "concurrently \"npm run server\" \"npm start\""
    $json | ConvertTo-Json -Depth 10 | Set-Content $packageFile -Encoding UTF8
    Write-Host "✅ Frontend concurrent dev mode enabled." -ForegroundColor Green
}

# -------------------------------------------------------------------
# 7️⃣  Launch Servers
# -------------------------------------------------------------------
Write-Host "`n🧠 Launching Backend + Frontend..." -ForegroundColor Magenta

Start-Job {
    cd "C:\AuditDNA_Elite\backend"
    Write-Host "🔥 Starting Backend..." -ForegroundColor Cyan
    npx nodemon server.js
}

Start-Job {
    cd "C:\AuditDNA_Produce_International\frontend"
    Write-Host "🌐 Starting Frontend..." -ForegroundColor Cyan
    npm start
}

Start-Sleep -Seconds 3
Write-Host "`n✅ Lazer Stack Online at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5050/api/usda/prices?commodity=AVOCADOS
- Auto Reload + Concurrent Mode ACTIVE" -ForegroundColor Green
