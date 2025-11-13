@echo off
REM AUDITDNA CLEANUP SCRIPT - DELETE ALL GARBAGE FILES
REM Run this to clean up Downloads folder

echo ========================================
echo   AUDITDNA CLEANUP SCRIPT
echo   DELETING GARBAGE FILES
echo ========================================
echo.

set "DOWNLOADS=%USERPROFILE%\Downloads"
cd /d "%DOWNLOADS%"

echo Current location: %CD%
echo.
echo Deleting old PowerShell scripts...

REM Delete all old AuditDNA PowerShell scripts
del /Q "Add_Min_Nav_Home.ps1" 2>nul
del /Q "Add_Mortgage_Finder.ps1" 2>nul
del /Q "Apply_AuditDNA_LeadAlerts.ps1" 2>nul
del /Q "Apply_AuditDNA_LegalsApi_Upgrade.ps1" 2>nul
del /Q "Apply_AuditDNA_Legals_AgGuard.ps1" 2>nul
del /Q "Apply_AuditDNA_Patch.ps1" 2>nul
del /Q "Apply_AuditDNA_TickerSearch.ps1" 2>nul
del /Q "AuditDNA_Frontend_Binding_Check_Version3.ps1" 2>nul
del /Q "AuditDNA_Milestone_Backup.ps1" 2>nul
del /Q "drop-general-audit-ui.ps1" 2>nul
del /Q "FIX_ALL_MODULES.ps1" 2>nul
del /Q "Fix_Home_As_Original*.ps1" 2>nul
del /Q "Force_DevNav_In_App*.ps1" 2>nul
del /Q "Force_Show_App_QuickNav.ps1" 2>nul
del /Q "Install_CRA_Module_Ag_Water_Factoring.ps1" 2>nul
del /Q "Make_Services_Default.ps1" 2>nul
del /Q "Restore_AuditDNA_Frontend.ps1" 2>nul
del /Q "Restore_AuditDNA_NoBOM.ps1" 2>nul
del /Q "run-auditdna-all*.ps1" 2>nul
del /Q "run-auditdna-frontend.ps1" 2>nul
del /Q "Smash_Tickers_ShowNav.ps1" 2>nul
del /Q "Undo_AuditDNA_Patches.ps1" 2>nul
del /Q "Unhijack_Tickers.ps1" 2>nul
del /Q "Wire_Dashboard_Route*.ps1" 2>nul

echo [OK] Deleted old PowerShell scripts
echo.
echo Deleting old/duplicate JSX files...

REM Delete old JSX files
del /Q "Dashboard.jsx" 2>nul
del /Q "ProduceDashboard_V1_FOUNDATION.jsx" 2>nul
del /Q "TraceabilityModule_MERGED.jsx" 2>nul
del /Q "USDAIntelligenceDashboard*.jsx" 2>nul

echo [OK] Deleted old JSX files
echo.
echo ========================================
echo   CLEANUP COMPLETE
echo ========================================
echo.
echo All garbage files have been deleted.
echo.
echo Next: Download ONLY these files from Claude:
echo   1. App.jsx
echo   2. ProduceDashboard.jsx
echo   3. ProduceIntelligenceModule.jsx
echo   4. FoodSafetyDashboard.jsx
echo   5. GrowerManagement.jsx
echo   6. install_modules.bat
echo.
pause