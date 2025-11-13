# ================================
# AuditDNA Tailwind + React Repair
# ================================

Write-Host "🧹 Cleaning old caches..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .\node_modules, .\.cache, .\dist, .\build -ErrorAction SilentlyContinue
Remove-Item -Force .\package-lock.json -ErrorAction SilentlyContinue

Write-Host "📦 Reinstalling Tailwind + React deps..." -ForegroundColor Cyan
npm install
npm install -D tailwindcss postcss autoprefixer

Write-Host "⚙️ Verifying Tailwind config location..." -ForegroundColor Cyan
if (-Not (Test-Path ".\tailwind.config.js")) {
  Write-Host "❌ Missing tailwind.config.js — regenerating..." -ForegroundColor Red
  npx tailwindcss init -p
} else {
  Write-Host "✅ tailwind.config.js found in project root." -ForegroundColor Green
}

Write-Host "🚀 Launching Tailwind watcher and React dev server..." -ForegroundColor Green

Start-Process powershell -ArgumentList "-NoExit", "-Command", "node .\node_modules\tailwindcss\lib\cli.js -i ./src/index.css -o ./src/output.css --watch"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
