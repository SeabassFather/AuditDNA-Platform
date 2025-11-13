cd C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend

# Create the latin folder if it doesn't exist
New-Item -ItemType Directory -Force -Path ".\src\pages\latin"

# Create LatinAmericaDashboard.jsx
@'
import React from 'react';
import { useLanguage } from '../../LanguageContext';

function LatinAmericaDashboard() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Latin America Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Latin America Dashboard</h2>
          <p className="text-gray-600">Dashboard content will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default LatinAmericaDashboard;
'@ | Out-File -FilePath ".\src\pages\latin\LatinAmericaDashboard.jsx" -Encoding UTF8

Write-Host "✅ LatinAmericaDashboard.jsx created!" -ForegroundColor Green
Write-Host "Now run: npm start" -ForegroundColor Cyan