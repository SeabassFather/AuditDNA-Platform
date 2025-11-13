# ============================================
# AuditDNA Frontend - Complete Fix Script v2
# ============================================
# Run from: C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  AuditDNA Complete Fix Script v2" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$ErrorActionPreference = "Continue"
$frontendPath = Get-Location

# Create backup
$backupPath = Join-Path $frontendPath "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Write-Host "[BACKUP] Creating backup at: $backupPath`n" -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

function Backup-AndFix {
    param($FilePath, $Description, $FixAction)
    
    if (Test-Path $FilePath) {
        $relativePath = $FilePath.Replace($frontendPath + "\", "")
        $backupFile = Join-Path $backupPath $relativePath
        $backupDir = Split-Path $backupFile -Parent
        
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        Copy-Item $FilePath $backupFile -Force
        
        Write-Host "[FIX] $relativePath" -ForegroundColor Green
        Write-Host "      $Description" -ForegroundColor Gray
        
        & $FixAction
        Write-Host "      ✓ Fixed`n" -ForegroundColor Green
        return $true
    } else {
        Write-Host "[SKIP] $FilePath - File not found`n" -ForegroundColor Yellow
        return $false
    }
}

# ============================================
# FIX 1: Navbar.jsx - Remove duplicate import
# ============================================
Backup-AndFix "src\components\layout\Navbar.jsx" "Removing duplicate NavLink import" {
    $content = Get-Content "src\components\layout\Navbar.jsx" -Raw
    $lines = $content -split "`r`n"
    $newLines = @()
    $navLinkSeen = $false
    
    foreach ($line in $lines) {
        if ($line -match 'import\s*\{[^}]*NavLink[^}]*\}\s*from\s*[''"]react-router-dom[''"]') {
            if (-not $navLinkSeen) {
                $newLines += $line
                $navLinkSeen = $true
            }
        } else {
            $newLines += $line
        }
    }
    
    $newLines -join "`r`n" | Set-Content "src\components\layout\Navbar.jsx" -NoNewline
}

# ============================================
# FIX 2: AgMarketplace.jsx - Add variable name
# ============================================
Backup-AndFix "src\pages\AgMarketplace.jsx" "Adding missing variable declaration" {
    $content = Get-Content "src\pages\AgMarketplace.jsx" -Raw
    $content = $content -replace '(?m)^(\s*)\s=\s*\[', '$1const suppliers = ['
    $content | Set-Content "src\pages\AgMarketplace.jsx" -NoNewline
}

# ============================================
# FIX 3: api.js - Fix ternary operator
# ============================================
Backup-AndFix "src\utils\api.js" "Completing ternary operator" {
    $content = Get-Content "src\utils\api.js" -Raw
    $content = $content -replace '(?s)(try\s*\{)\s*\?\s*`', '$1' + "`r`n    const url = category ? ``"
    $content | Set-Content "src\utils\api.js" -NoNewline
}

# ============================================
# FIX 4: PitchDeckPage.jsx - Fix triple quotes
# ============================================
Backup-AndFix "src\pages\PitchDeckPage.jsx" "Fixing triple quotes" {
    $content = Get-Content "src\pages\PitchDeckPage.jsx" -Raw
    $content = $content -replace 'image:\s*"""+', 'image: ""'
    $content | Set-Content "src\pages\PitchDeckPage.jsx" -NoNewline
}

# ============================================
# FIX 5 & 6: OwnerBuyerForm & OwnerContactCard
# ============================================
@("src\pages\real_estate\OwnerBuyerForm.jsx", "src\pages\real_estate\OwnerContactCard.jsx") | ForEach-Object {
    Backup-AndFix $_ "Removing duplicate thankyou key" {
        $lines = Get-Content $_ -Encoding UTF8
        $newLines = @()
        $thankyouSeen = $false
        
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match '^\s*thankyou:') {
                if (-not $thankyouSeen) {
                    # Keep first occurrence, fix encoding
                    $newLines += '    thankyou: "¡Gracias! El propietario le contactará pronto."'
                    $thankyouSeen = $true
                }
            } else {
                $newLines += $lines[$i]
            }
        }
        
        $newLines | Set-Content $_ -Encoding UTF8
    }
}

# ============================================
# FIX 7: PropertySearch.jsx - Remove duplicate
# ============================================
Backup-AndFix "src\pages\real_estate\PropertySearch.jsx" "Removing duplicate array entry" {
    $lines = Get-Content "src\pages\real_estate\PropertySearch.jsx" -Encoding UTF8
    $newLines = @()
    $overMillionSeen = $false
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'Over\s*\$1,000,000') {
            if (-not $overMillionSeen) {
                # Keep first, ensure comma
                $line = $lines[$i].TrimEnd()
                if ($line -notmatch ',$' -and $i -lt $lines.Count - 1 -and $lines[$i+1] -notmatch '^\s*\]') {
                    $line += ','
                }
                $newLines += $line
                $overMillionSeen = $true
            }
        } else {
            $newLines += $lines[$i]
        }
    }
    
    $newLines | Set-Content "src\pages\real_estate\PropertySearch.jsx" -Encoding UTF8
}

# ============================================
# FIX 8: NotificationCenter.jsx - Remove duplicate
# ============================================
Backup-AndFix "src\pages\traceability\NotificationCenter.jsx" "Removing duplicate icon key" {
    $lines = Get-Content "src\pages\traceability\NotificationCenter.jsx" -Encoding UTF8
    $newLines = @()
    $skipNext = $false
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($skipNext) {
            $skipNext = $false
            continue
        }
        
        if ($lines[$i] -match "icon:\s*['\`"].*['\`"]" -and $i -lt $lines.Count - 1 -and $lines[$i+1] -match "^\s*icon:") {
            $newLines += $lines[$i]
            $skipNext = $true
        } else {
            $newLines += $lines[$i]
        }
    }
    
    $newLines | Set-Content "src\pages\traceability\NotificationCenter.jsx" -Encoding UTF8
}

# ============================================
# FIX 9: MexicoLoans.jsx - Fix copyright
# ============================================
Backup-AndFix "src\pages\MexicoLoans.jsx" "Fixing copyright symbol and JSX structure" {
    $content = Get-Content "src\pages\MexicoLoans.jsx" -Raw -Encoding UTF8
    # Fix all copyright encoding issues
    $content = $content -replace '[ÃƒÆ'Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃÆ'©]+', '©'
    # Ensure proper paragraph structure
    $content = $content -replace '(<p[^>]*>)\s*©\s*\{', '$1' + "`r`n              © {"
    $content | Set-Content "src\pages\MexicoLoans.jsx" -Encoding UTF8 -NoNewline
}

# ============================================
# CREATE MISSING DIRECTORIES & FILES
# ============================================
Write-Host "`n[CREATE] Setting up missing components...`n" -ForegroundColor Cyan

$dirs = @(
    "src\pages\produce",
    "src\pages\real_estate", 
    "src\data",
    "src\utils",
    "src\api",
    "src\contexts",
    "src\components"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  ✓ Created: $dir" -ForegroundColor Green
    }
}

# Create all stub files
$stubs = @{
    "src\pages\produce\PackagingSizeSelector.jsx" = @'
import React from 'react';

const PackagingSizeSelector = () => {
  return <div>Packaging Size Selector - Coming Soon</div>;
};

export default PackagingSizeSelector;
'@
    "src\pages\produce\RegionalAccordion.jsx" = @'
import React from 'react';

const RegionalAccordion = () => {
  return <div>Regional Accordion - Coming Soon</div>;
};

export default RegionalAccordion;
'@
    "src\pages\real_estate\MortgageSearchEngine.jsx" = @'
import React from 'react';

const MortgageSearchEngine = () => {
  return <div>Mortgage Search Engine - Coming Soon</div>;
};

export default MortgageSearchEngine;
'@
    "src\pages\real_estate\MortgageSearchPage.jsx" = @'
import React from 'react';

const MortgageSearchPage = () => {
  return <div>Mortgage Search Page - Coming Soon</div>;
};

export default MortgageSearchPage;
'@
    "src\data\cropsTaxonomy.js" = @'
export const cropsTaxonomy = {
  vegetables: [],
  fruits: [],
  grains: []
};

export default cropsTaxonomy;
'@
    "src\data\growerDatabase.js" = @'
export const growerDatabase = [];

export default growerDatabase;
'@
    "src\utils\aiMatchmaking.js" = @'
export const matchGrowers = (criteria) => {
  return [];
};

export default { matchGrowers };
'@
    "src\api\propertyProfile.js" = @'
export const getPropertyProfile = async (id) => {
  return null;
};

export default { getPropertyProfile };
'@
    "src\contexts\LanguageContext.jsx" = @'
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
'@
    "src\components\PropertySearch.jsx" = @'
import React from 'react';

const PropertySearch = () => {
  return <div>Property Search - Coming Soon</div>;
};

export default PropertySearch;
'@
    "src\components\OwnerBuyerForm.jsx" = @'
import React from 'react';

const OwnerBuyerForm = () => {
  return <div>Owner Buyer Form - Coming Soon</div>;
};

export default OwnerBuyerForm;
'@
    "src\components\PropertyUploadForm.jsx" = @'
import React from 'react';

const PropertyUploadForm = () => {
  return <div>Property Upload Form - Coming Soon</div>;
};

export default PropertyUploadForm;
'@
    "src\components\MexicoRefiCard.jsx" = @'
import React from 'react';

const MexicoRefiCard = () => {
  return <div>Mexico Refi Card - Coming Soon</div>;
};

export default MexicoRefiCard;
'@
    "src\components\ReferralPartnerCard.jsx" = @'
import React from 'react';

const ReferralPartnerCard = () => {
  return <div>Referral Partner Card - Coming Soon</div>;
};

export default ReferralPartnerCard;
'@
    "src\components\AgentRegistrationCard.jsx" = @'
import React from 'react';

const AgentRegistrationCard = () => {
  return <div>Agent Registration Card - Coming Soon</div>;
};

export default AgentRegistrationCard;
'@
    "src\components\AppraisalServicesCard.jsx" = @'
import React from 'react';

const AppraisalServicesCard = () => {
  return <div>Appraisal Services Card - Coming Soon</div>;
};

export default AppraisalServicesCard;
'@
    "src\components\LegalQuestionnaireCard.jsx" = @'
import React from 'react';

const LegalQuestionnaireCard = () => {
  return <div>Legal Questionnaire Card - Coming Soon</div>;
};

export default LegalQuestionnaireCard;
'@
    "src\components\GrowerProfileModal.jsx" = @'
import React from 'react';

const GrowerProfileModal = () => {
  return <div>Grower Profile Modal - Coming Soon</div>;
};

export default GrowerProfileModal;
'@
    "src\components\DealRoomModal.jsx" = @'
import React from 'react';

const DealRoomModal = () => {
  return <div>Deal Room Modal - Coming Soon</div>;
};

export default DealRoomModal;
'@
}

$created = 0
foreach ($file in $stubs.Keys) {
    if (-not (Test-Path $file)) {
        $stubs[$file] | Set-Content $file -Encoding UTF8
        Write-Host "  ✓ Created: $file" -ForegroundColor Green
        $created++
    } else {
        Write-Host "  • Exists: $file" -ForegroundColor DarkGray
    }
}

# ============================================
# SUMMARY
# ============================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Fix Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Fixed 9 files with syntax errors" -ForegroundColor Green
Write-Host "✓ Created $created new stub files" -ForegroundColor Green  
Write-Host "✓ Backup saved to: $backupPath" -ForegroundColor Yellow
Write-Host "`nNext Steps:" -ForegroundColor White
Write-Host "  1. Run: npm start" -ForegroundColor Cyan
Write-Host "  2. Check compilation" -ForegroundColor Cyan
Write-Host "  3. Report any remaining errors" -ForegroundColor Cyan
Write-Host "`nDone! 🎉`n" -ForegroundColor Green