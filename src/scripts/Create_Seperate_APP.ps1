# =====================================================================# CREATE TWO SEPARATE APPS
# =====================================================================# This creates:
# 1. ProduceTrace App - for Agriculture, Traceability, USDA
# 2. AuditDNA App - for Services, Factoring, Mortgage, Compliance
# =====================================================================
param(
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "CREATE SEPARATE APPS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "âš ï¸  DRY RUN MODE - No files will be created" -ForegroundColor Yellow
    Write-Host ""
}

$baseDir = "C:\AuditDNA"
$sourceDir = "$baseDir\AUDIT_DNA_Frontend_Final\frontend"

# Define app directories
$produceAppDir = "$baseDir\ProduceTrace_App"
$auditDnaAppDir = "$baseDir\AuditDNA_Services_App"

Write-Host "[1/5] Creating app directories..." -ForegroundColor Yellow

if (-not $DryRun) {
    # Create Produce/Trace app
    if (-not (Test-Path $produceAppDir)) {
        New-Item -ItemType Directory -Path $produceAppDir -Force | Out-Null
        Write-Host "  âœ“ Created: $produceAppDir" -ForegroundColor Green
    } else {
        Write-Host "  â„¹ Already exists: $produceAppDir" -ForegroundColor Gray
    }

    # Create AuditDNA app
    if (-not (Test-Path $auditDnaAppDir)) {
        New-Item -ItemType Directory -Path $auditDnaAppDir -Force | Out-Null
        Write-Host "  âœ“ Created: $auditDnaAppDir" -ForegroundColor Green
    } else {
        Write-Host "  â„¹ Already exists: $auditDnaAppDir" -ForegroundColor Gray
    }
} else {
    Write-Host "  [DRY RUN] Would create: $produceAppDir" -ForegroundColor Gray
    Write-Host "  [DRY RUN] Would create: $auditDnaAppDir" -ForegroundColor Gray
}

Write-Host "`n[2/5] Creating React app structures..." -ForegroundColor Yellow

$apps = @{
    "ProduceTrace" = @{
        Path = $produceAppDir
        Name = "producetrace-app"
        DisplayName = "ProduceTrace"
        Description = "Agriculture Traceability & Intelligence Platform"
        Modules = @('Traceability', 'USDA', 'WaterTech', 'Soil', 'Grower', 'Produce', 'Agriculture', 'Marketplace')
    }
    "AuditDNA" = @{
        Path = $auditDnaAppDir
        Name = "auditdna-services"
        DisplayName = "AuditDNA Services"
        Description = "Financial Services & Compliance Platform"
        Modules = @('Services', 'Factoring', 'Mortgage', 'Compliance', 'Upload', 'Audit')
    }
}

foreach ($appKey in $apps.Keys) {
    $app = $apps[$appKey]
    
    Write-Host "`n  Creating $($app.DisplayName) app structure..." -ForegroundColor Cyan
    
    if (-not $DryRun) {
        # Create package.json
        $packageJson = @{
            name = $app.Name
            version = "1.0.0"
            description = $app.Description
            private = $true
            dependencies = @{
                "react" = "^18.2.0"
                "react-dom" = "^18.2.0"
                "react-router-dom" = "^6.20.0"
                "react-scripts" = "5.0.1"
            }
            scripts = @{
                "start" = "react-scripts start"
                "build" = "react-scripts build"
                "test" = "react-scripts test"
                "eject" = "react-scripts eject"
            }
            eslintConfig = @{
                "extends" = @("react-app")
            }
            browserslist = @{
                "production" = @(">0.2%", "not dead", "not op_mini all")
                "development" = @("last 1 chrome version", "last 1 firefox version", "last 1 safari version")
            }
        }
        
        $packageJson | ConvertTo-Json -Depth 10 | Out-File "$($app.Path)\package.json" -Encoding UTF8
        Write-Host "    âœ“ Created package.json" -ForegroundColor Green
        
        # Create basic folder structure
        $folders = @('src', 'src\components', 'src\pages', 'src\modules', 'src\services', 'src\utils', 'public')
        foreach ($folder in $folders) {
            $folderPath = Join-Path $app.Path $folder
            if (-not (Test-Path $folderPath)) {
                New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
            }
        }
        Write-Host "    âœ“ Created folder structure" -ForegroundColor Green
        
        # Create .gitignore
        $gitignore = @"
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
"@
        $gitignore | Out-File "$($app.Path)\.gitignore" -Encoding UTF8
        
        # Create README
        $readme = @"
# $($app.DisplayName)

$($app.Description)

## Modules Included

$($app.Modules | ForEach-Object { "- $_" } | Out-String)

## Getting Started

\`\`\`bash
npm install
npm start
\`\`\`

Opens on http://localhost:3000

## Build for Production

\`\`\`bash
npm run build
\`\`\`
"@
        $readme | Out-File "$($app.Path)\README.md" -Encoding UTF8
        
        Write-Host "    âœ“ Created config files" -ForegroundColor Green
        
    } else {
        Write-Host "    [DRY RUN] Would create package.json and structure" -ForegroundColor Gray
    }
}

Write-Host "`n[3/5] Identifying modules to copy..." -ForegroundColor Yellow

# Module patterns for each app
$producePatterns = @('*Trace*', '*Produce*', '*USDA*', '*Agriculture*', '*Grower*', '*Organic*', '*Marketplace*', '*Water*', '*Soil*', '*ag*')
$auditDnaPatterns = @('*Service*', '*Factoring*', '*Mortgage*', '*Compliance*', '*Upload*', '*Audit*')

Write-Host "  ðŸŒ¾ Produce/Trace patterns: $($producePatterns -join ', ')" -ForegroundColor Green
Write-Host "  ðŸ“Š AuditDNA patterns: $($auditDnaPatterns -join ', ')" -ForegroundColor Cyan

Write-Host "`n[4/5] Creating starter files..." -ForegroundColor Yellow

# We'll create basic starter files for each app
if (-not $DryRun) {
    # ProduceTrace App.js
    $produceAppJs = @"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your modules here
// import TraceabilityModule from './modules/TraceabilityModule';
// import USDAModule from './modules/USDAModule';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>ðŸŒ¾ ProduceTrace</h1>
          <p>Agriculture Traceability & Intelligence Platform</p>
        </header>
        
        <nav className="App-nav">
          <Link to="/">Home</Link>
          <Link to="/trace">Traceability</Link>
          <Link to="/usda">USDA</Link>
          <Link to="/water">Water Tech</Link>
          <Link to="/soil">Soil Analysis</Link>
        </nav>
        
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add your module routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to ProduceTrace</h2>
      <p>Select a module from the navigation to get started.</p>
    </div>
  );
}

export default App;
"@
    $produceAppJs | Out-File "$produceAppDir\src\App.js" -Encoding UTF8
    
    # AuditDNA App.js
    $auditDnaAppJs = @"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your modules here
// import ServicesModule from './modules/ServicesModule';
// import FactoringModule from './modules/FactoringModule';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>ðŸ“Š AuditDNA Services</h1>
          <p>Financial Services & Compliance Platform</p>
        </header>
        
        <nav className="App-nav">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/factoring">Factoring</Link>
          <Link to="/mortgage">Mortgage</Link>
          <Link to="/compliance">Compliance</Link>
        </nav>
        
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add your module routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to AuditDNA Services</h2>
      <p>Select a module from the navigation to get started.</p>
    </div>
  );
}

export default App;
"@
    $auditDnaAppJs | Out-File "$auditDnaAppDir\src\App.js" -Encoding UTF8
    
    # Create index.js for both apps
    $indexJs = @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"@
    $indexJs | Out-File "$produceAppDir\src\index.js" -Encoding UTF8
    $indexJs | Out-File "$auditDnaAppDir\src\index.js" -Encoding UTF8
    
    # Create basic CSS
    $appCss = @"
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.App {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.App-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.App-header h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.App-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

.App-nav a {
  padding: 10px 20px;
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.App-nav a:hover {
  background: #667eea;
  color: white;
}

.App-main {
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
}
"@
    $appCss | Out-File "$produceAppDir\src\App.css" -Encoding UTF8
    $appCss | Out-File "$auditDnaAppDir\src\App.css" -Encoding UTF8
    
    $indexCss = @"
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
"@
    $indexCss | Out-File "$produceAppDir\src\index.css" -Encoding UTF8
    $indexCss | Out-File "$auditDnaAppDir\src\index.css" -Encoding UTF8
    
    # Create public/index.html
    $produceIndexHtml = @"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="ProduceTrace - Agriculture Traceability Platform" />
    <title>ProduceTrace</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
"@
    $produceIndexHtml | Out-File "$produceAppDir\public\index.html" -Encoding UTF8
    
    $auditDnaIndexHtml = @"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="AuditDNA Services - Financial Services Platform" />
    <title>AuditDNA Services</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
"@
    $auditDnaIndexHtml | Out-File "$auditDnaAppDir\public\index.html" -Encoding UTF8
    
    Write-Host "  âœ“ Created starter files for both apps" -ForegroundColor Green
}

Write-Host "`n[5/5] Creating copy instructions..." -ForegroundColor Yellow

$copyInstructions = @"
=================================NEXT STEPS: COPY YOUR MODULES
=================================
PRODUCETRACE APP ($produceAppDir)
----------------------------------------
Copy these modules from your source frontend:

FROM: $sourceDir\src\

PRODUCE/TRACEABILITY MODULES:
- TraceabilityModule.jsx â†’ $produceAppDir\src\modules\
- ProduceIntelligenceModule.jsx
- USDA.jsx â†’ $produceAppDir\src\pages\
- USDAGrowerSearchEngine.jsx
- USDAMarketplace.jsx
- WaterTech.jsx
- environmental_traceability.jsx â†’ $produceAppDir\src\modules\WaterTech\
- All files in \modules\WaterTech\
- All Grower*, Produce*, Agriculture* files

AUDITDNA APP ($auditDnaAppDir)
----------------------------------------
Copy these modules from your source frontend:

FROM: $sourceDir\src\

SERVICES MODULES:
- Services.jsx â†’ $auditDnaAppDir\src\pages\
- ServicesExplorer.jsx
- ServiceStart.jsx
- Factoring files â†’ $auditDnaAppDir\src\modules\Factoring\
- Mortgage files â†’ $auditDnaAppDir\src\modules\Mortgage\
- Compliance files â†’ $auditDnaAppDir\src\modules\Compliance\
- Upload files â†’ $auditDnaAppDir\src\modules\Upload\

=================================START THE APPS
=================================
ProduceTrace App:
cd $produceAppDir
npm install
npm start

AuditDNA Services App:
cd $auditDnaAppDir
npm install
npm start

They will run on different ports (3000 and 3001)

"@

$copyInstructions | Out-File "$baseDir\APP_SPLIT_INSTRUCTIONS.txt" -Encoding UTF8

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "âœ… APP STRUCTURE CREATED!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "ðŸ“ ProduceTrace App: $produceAppDir" -ForegroundColor Green
Write-Host "ðŸ“ AuditDNA App: $auditDnaAppDir" -ForegroundColor Cyan
Write-Host "`nðŸ“‹ Instructions saved to: $baseDir\APP_SPLIT_INSTRUCTIONS.txt`n" -ForegroundColor Yellow

if ($DryRun) {
    Write-Host "âš ï¸  This was a DRY RUN. Run without -DryRun to create the apps." -ForegroundColor Yellow
}