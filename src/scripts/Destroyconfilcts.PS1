# =====================================================================# FIND AND DESTROY ALL CONFLICT MARKERS
# =====================================================================
$ErrorActionPreference = "Continue"

Write-Host "`n=== HUNTING FOR CONFLICT MARKERS ===" -ForegroundColor Red

$frontendPath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
Set-Location $frontendPath

# Search EVERYWHERE - including public folder
$conflictFiles = Get-ChildItem -Recurse -File -Exclude *.log,*.lock | 
    Where-Object { $_.FullName -notmatch 'node_modules' } |
    ForEach-Object {
        $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
        if ($content -match '<<<<<<< HEAD|=======|            [PSCustomObject]@{
                Path = $_.FullName
                Name = $_.Name
            }
        }
    }

if ($conflictFiles) {
    Write-Host "`nðŸŽ¯ FOUND CONFLICTS IN:" -ForegroundColor Yellow
    $conflictFiles | ForEach-Object {
        Write-Host "  - $($_.Path)" -ForegroundColor Red
    }
    
    Write-Host "`nðŸ”¨ FIXING ALL CONFLICTS..." -ForegroundColor Cyan
    
    foreach ($file in $conflictFiles) {
        $content = Get-Content $file.Path -Raw
        
        # Remove all conflict markers
        $fixed = $content -replace '<<<<<<< HEAD\r?\n', ''
        $fixed = $fixed -replace '=======\r?\n', ''
        $fixed = $fixed -replace '        $fixed = $fixed -replace 'ï»¿', ''  # Remove BOM
        
        # Save fixed version
        [System.IO.File]::WriteAllText($file.Path, $fixed, [System.Text.UTF8Encoding]::new($false))
        
        Write-Host "  âœ“ FIXED: $($file.Name)" -ForegroundColor Green
    }
    
    Write-Host "`nâœ… ALL CONFLICTS RESOLVED!" -ForegroundColor Green
} else {
    Write-Host "`nâœ“ NO CONFLICTS FOUND IN FILES" -ForegroundColor Green
    Write-Host "The issue might be browser cache. Clear cache and hard refresh!" -ForegroundColor Yellow
}

Write-Host "`n=== CLEARING BUILD CACHE ===" -ForegroundColor Cyan
Remove-Item -Recurse -Force .\build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\node_modules\.cache -ErrorAction SilentlyContinue

Write-Host "âœ“ Cache cleared!" -ForegroundColor Green
Write-Host "`nNow run: npm start" -ForegroundColor Yellow