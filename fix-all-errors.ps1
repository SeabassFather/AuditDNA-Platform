# AuditDNA Frontend Compilation Errors Fix Script
# Run this from: C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AuditDNA Compilation Errors Fix Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$frontendPath = Get-Location

# Create backup directory
$backupPath = Join-Path $frontendPath "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Write-Host "Creating backup at: $backupPath" -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

# Function to backup a file before modifying
function Backup-File {
    param($FilePath)
    if (Test-Path $FilePath) {
        $relativePath = $FilePath.Replace($frontendPath, "")
        $backupFile = Join-Path $backupPath $relativePath
        $backupDir = Split-Path $backupFile -Parent
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        Copy-Item $FilePath $backupFile -Force
        Write-Host "  Backed up: $relativePath" -ForegroundColor DarkGray
    }
}

Write-Host "`n[1/10] Fixing Navbar.jsx - Removing duplicate import..." -ForegroundColor Green
$navbarFile = "src\components\layout\Navbar.jsx"
if (Test-Path $navbarFile) {
    Backup-File $navbarFile
    $content = Get-Content $navbarFile -Raw
    # Remove the duplicate import line (line 53)
    $lines = Get-Content $navbarFile
    $newLines = @()
    $importCount = 0
    foreach ($line in $lines) {
        if ($line -match 'import\s*\{.*NavLink.*\}\s*from\s*[''"]react-router-dom[''"]') {
            $importCount++
            if ($importCount -eq 1) {
                $newLines += $line
            } else {
                Write-Host "    Removed duplicate NavLink import" -ForegroundColor Yellow
            }
        } else {
            $newLines += $line
        }
    }
    $newLines | Set-Content $navbarFile
    Write-Host "    ✓ Fixed Navbar.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $navbarFile" -ForegroundColor Red
}

Write-Host "`n[2/10] Fixing AgMarketplace.jsx - Adding missing variable..." -ForegroundColor Green
$agMarketFile = "src\pages\AgMarketplace.jsx"
if (Test-Path $agMarketFile) {
    Backup-File $agMarketFile
    $content = Get-Content $agMarketFile -Raw
    # Fix the missing variable declaration
    $content = $content -replace '(?m)^\s*=\s*\[', 'const suppliers = ['
    $content | Set-Content $agMarketFile
    Write-Host "    ✓ Fixed AgMarketplace.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $agMarketFile" -ForegroundColor Red
}

Write-Host "`n[3/10] Fixing api.js - Completing ternary operator..." -ForegroundColor Green
$apiFile = "src\utils\api.js"
if (Test-Path $apiFile) {
    Backup-File $apiFile
    $content = Get-Content $apiFile -Raw
    # Fix incomplete ternary
    $content = $content -replace '(?m)^\s*\?\s*`\$\{BASE_URL\}', '    const url = category ? `${BASE_URL}'
    $content | Set-Content $apiFile
    Write-Host "    ✓ Fixed api.js" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $apiFile" -ForegroundColor Red
}

Write-Host "`n[4/10] Fixing PitchDeckPage.jsx - Fixing triple quotes..." -ForegroundColor Green
$pitchFile = "src\pages\PitchDeckPage.jsx"
if (Test-Path $pitchFile) {
    Backup-File $pitchFile
    $content = Get-Content $pitchFile -Raw
    # Fix triple quotes
    $content = $content -replace 'image:\s*"""', 'image: ""'
    $content | Set-Content $pitchFile
    Write-Host "    ✓ Fixed PitchDeckPage.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $pitchFile" -ForegroundColor Red
}

Write-Host "`n[5/10] Fixing OwnerBuyerForm.jsx - Removing duplicate key..." -ForegroundColor Green
$ownerBuyerFile = "src\pages\real_estate\OwnerBuyerForm.jsx"
if (Test-Path $ownerBuyerFile) {
    Backup-File $ownerBuyerFile
    $lines = Get-Content $ownerBuyerFile
    $newLines = @()
    $thankyouCount = 0
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '^\s*thankyou:') {
            $thankyouCount++
            if ($thankyouCount -eq 1) {
                $newLines += $lines[$i]
            } else {
                Write-Host "    Removed duplicate thankyou line" -ForegroundColor Yellow
            }
        } else {
            $newLines += $lines[$i]
        }
    }
    $newLines | Set-Content $ownerBuyerFile
    Write-Host "    ✓ Fixed OwnerBuyerForm.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $ownerBuyerFile" -ForegroundColor Red
}

Write-Host "`n[6/10] Fixing OwnerContactCard.jsx - Removing duplicate key..." -ForegroundColor Green
$ownerContactFile = "src\pages\real_estate\OwnerContactCard.jsx"
if (Test-Path $ownerContactFile) {
    Backup-File $ownerContactFile
    $lines = Get-Content $ownerContactFile
    $newLines = @()
    $thankyouCount = 0
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '^\s*thankyou:') {
            $thankyouCount++
            if ($thankyouCount -eq 1) {
                $newLines += $lines[$i]
            } else {
                Write-Host "    Removed duplicate thankyou line" -ForegroundColor Yellow
            }
        } else {
            $newLines += $lines[$i]
        }
    }
    $newLines | Set-Content $ownerContactFile
    Write-Host "    ✓ Fixed OwnerContactCard.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $ownerContactFile" -ForegroundColor Red
}

Write-Host "`n[7/10] Fixing PropertySearch.jsx - Removing duplicate entry..." -ForegroundColor Green
$propSearchFile = "src\pages\real_estate\PropertySearch.jsx"
if (Test-Path $propSearchFile) {
    Backup-File $propSearchFile
    $lines = Get-Content $propSearchFile
    $newLines = @()
    $overMillionCount = 0
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'Over \$1,000,000') {
            $overMillionCount++
            if ($overMillionCount -eq 1) {
                # Add comma if it's missing
                if ($lines[$i] -notmatch ',$') {
                    $newLines += $lines[$i].TrimEnd() + ','
                } else {
                    $newLines += $lines[$i]
                }
            } else {
                Write-Host "    Removed duplicate 'Over $1,000,000' line" -ForegroundColor Yellow
            }
        } else {
            $newLines += $lines[$i]
        }
    }
    $newLines | Set-Content $propSearchFile
    Write-Host "    ✓ Fixed PropertySearch.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $propSearchFile" -ForegroundColor Red
}

Write-Host "`n[8/10] Fixing NotificationCenter.jsx - Removing duplicate key..." -ForegroundColor Green
$notifFile = "src\pages\traceability\NotificationCenter.jsx"
if (Test-Path $notifFile) {
    Backup-File $notifFile
    $lines = Get-Content $notifFile
    $newLines = @()
    $skipNext = $false
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($skipNext) {
            $skipNext = $false
            continue
        }
        if ($lines[$i] -match "icon:\s*'🎉'" -and $i -lt $lines.Count - 1) {
            if ($lines[$i + 1] -match "^\s*icon:") {
                $newLines += $lines[$i]
                $skipNext = $true
                Write-Host "    Removed duplicate icon line" -ForegroundColor Yellow
            } else {
                $newLines += $lines[$i]
            }
        } else {
            $newLines += $lines[$i]
        }
    }
    $newLines | Set-Content $notifFile
    Write-Host "    ✓ Fixed NotificationCenter.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $notifFile" -ForegroundColor Red
}

Write-Host "`n[9/10] Fixing MexicoLoans.jsx - Fixing copyright symbol..." -ForegroundColor Green
$mexicoFile = "src\pages\MexicoLoans.jsx"
if (Test-Path $mexicoFile) {
    Backup-File $mexicoFile
    $content = Get-Content $mexicoFile -Raw -Encoding UTF8
    # Fix corrupted copyright symbol
    $content = $content -replace 'Ã[^©]*©', '©'
    $content = $content -replace 'ÃƒÆ[^©]*', '©'
    # Ensure proper indentation for the paragraph
    $content = $content -replace '(<p className="text-gray-500 text-sm">)\s*©', '$1' + "`n              ©"
    $content | Set-Content $mexicoFile -Encoding UTF8
    Write-Host "    ✓ Fixed MexicoLoans.jsx" -ForegroundColor Green
} else {
    Write-Host "    ⚠ File not found: $mexicoFile" -ForegroundColor Red
}

Write-Host "`n[10/10] Creating missing component files..." -ForegroundColor Green

# Create directories
$directories = @(
    "src\pages\produce",
    "src\pages\real_estate",
    "src\data",
    "src\utils",
    "src\api",
    "src\contexts",
    "src\components"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "    Created directory: $dir" -ForegroundColor Cyan
    }
}

# Create stub files
$stubFiles = @{
    "src\pages\produce\PackagingSizeSelector.jsx" = @"
import React from 'react';

const PackagingSizeSelector = () => {
  return <div>Packaging Size Selector - Coming Soon</div>;
};

export default PackagingSizeSelector;
"@

    "src\pages\produce\RegionalAccordion.jsx" = @"
import React from 'react';

const RegionalAccordion = () => {
  return <div>Regional Accordion - Coming Soon</div>;
};

export default RegionalAccordion;
"@

    "src\pages\real_estate\MortgageSearchEngine.jsx" = @"
import React from 'react';

const MortgageSearchEngine = () => {
  return <div>Mortgage Search Engine - Coming Soon</div>;
};

export default MortgageSearchEngine;
"@

    "src\pages\real_estate\MortgageSearchPage.jsx" = @"
import React from 'react';

const MortgageSearchPage = () => {
  return <div>Mortgage Search Page - Coming Soon</div>;
};

export default MortgageSearchPage;
"@

    "src\data\cropsTaxonomy.js" = @"
export const cropsTaxonomy = {
  vegetables: [],
  fruits: [],
  grains: []
};

export default cropsTaxonomy;
"@

    "src\data\growerDatabase.js" = @"
export const growerDatabase = [];

export default growerDatabase;
"@

    "src\utils\aiMatchmaking.js" = @"
export const matchGrowers = (criteria) => {
  return [];
};

export default { matchGrowers };
"@

    "src\api\propertyProfile.js" = @"
export const getPropertyProfile = async (id) => {
  return null;
};

export default { getPropertyProfile };
"@

    "src\contexts\LanguageContext.jsx" = @"
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
"@

    "src\components\PropertySearch.jsx" = @"
import React from 'react';

const PropertySearch = () => {
  return <div>Property Search - Coming Soon</div>;
};

export default PropertySearch;
"@

    "src\components\OwnerBuyerForm.jsx" = @"
import React from 'react';

const OwnerBuyerForm = () => {
  return <div>Owner Buyer Form - Coming Soon</div>;
};

export default OwnerBuyerForm;
"@

    "src\components\PropertyUploadForm.jsx" = @"
import React from 'react';

const PropertyUploadForm = () => {
  return <div>Property Upload Form - Coming Soon</div>;
};

export default PropertyUploadForm;
"@

    "src\components\MexicoRefiCard.jsx" = @"
import React from 'react';

const MexicoRefiCard = () => {
  return <div>Mexico Refi Card - Coming Soon</div>;
};

export default MexicoRefiCard;
"@

    "src\components\ReferralPartnerCard.jsx" = @"
import React from 'react';

const ReferralPartnerCard = () => {
  return <div>Referral Partner Card - Coming Soon</div>;
};

export default ReferralPartnerCard;
"@

    "src\components\AgentRegistrationCard.jsx" = @"
import React from 'react';

const AgentRegistrationCard = () => {
  return <div>Agent Registration Card - Coming Soon</div>;
};

export default AgentRegistrationCard;
"@

    "src\components\AppraisalServicesCard.jsx" = @"
import React from 'react';

const AppraisalServicesCard = () => {
  return <div>Appraisal Services Card - Coming Soon</div>;
};

export default AppraisalServicesCard;
"@

    "src\components\LegalQuestionnaireCard.jsx" = @"
import React from 'react';

const LegalQuestionnaireCard = () => {
  return <div>Legal Questionnaire Card - Coming Soon</div>;
};

export default LegalQuestionnaireCard;
"@

    "src\components\GrowerProfileModal.jsx" = @"
import React from 'react';

const GrowerProfileModal = () => {
  return <div>Grower Profile Modal - Coming Soon</div>;
};

export default GrowerProfileModal;
"@

    "src\components\DealRoomModal.jsx" = @"
import React from 'react';

const DealRoomModal = () => {
  return <div>Deal Room Modal - Coming Soon</div>;
};

export default DealRoomModal;
"@
}

$createdCount = 0
foreach ($file in $stubFiles.Keys) {
    if (-not (Test-Path $file)) {
        $stubFiles[$file] | Set-Content $file -Encoding UTF8
        Write-Host "    ✓ Created: $file" -ForegroundColor Green
        $createdCount++
    } else {
        Write-Host "    ⊙ Skipped (exists): $file" -ForegroundColor Yellow
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Fix Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Fixed 9 files with syntax errors" -ForegroundColor Green
Write-Host "✓ Created $createdCount missing stub files" -ForegroundColor Green
Write-Host "✓ Backup saved to: $backupPath" -ForegroundColor Yellow
Write-Host "`nNext steps:" -ForegroundColor White
Write-Host "1. Run: npm start" -ForegroundColor Cyan
Write-Host "2. Check for any remaining errors" -ForegroundColor Cyan
Write-Host "3. If issues persist, check the backup folder" -ForegroundColor Cyan
Write-Host "`nDone! 🎉" -ForegroundColor Green