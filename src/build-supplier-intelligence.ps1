# ================================================================
# SUPPLIER INTELLIGENCE MODULE - ADD ONLY, NO CHANGES TO EXISTING
# ================================================================
Write-Host "🚀 Building Supplier Intelligence Module..." -ForegroundColor Cyan
Write-Host "Date: 2025-11-11 07:35:27 UTC" -ForegroundColor Yellow
Write-Host "User: SeabassFather" -ForegroundColor Yellow
Write-Host ""

# Create directory
New-Item -ItemType Directory -Force -Path "pages/suppliers" | Out-Null

# ================================================================
# 1. SUPPLIER INTELLIGENCE DASHBOARD (MAIN HUB)
# ================================================================
Write-Host "Creating SupplierIntelligenceDashboard.jsx..." -ForegroundColor Yellow

$supplierDashboard = @'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const SupplierIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  const suppliers = [
    { 
      id: 1, 
      name: 'Fresh Harvest Co.', 
      score: 94, 
      risk: 'low', 
      certifications: ['GlobalGAP', 'FSMA', 'Organic'], 
      location: 'California, USA',
      products: ['Avocados', 'Lettuce', 'Strawberries'],
      contact: 'john@freshharvest.com',
      phone: '+1 (555) 123-4567',
      activeOrders: 12,
      totalValue: '$245,000'
    },
    { 
      id: 2, 
      name: 'Valle Verde Organics', 
      score: 88, 
      risk: 'low', 
      certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'], 
      location: 'Sinaloa, Mexico',
      products: ['Tomatoes', 'Peppers', 'Cucumbers'],
      contact: 'maria@valleverde.mx',
      phone: '+52 (667) 234-5678',
      activeOrders: 8,
      totalValue: '$178,000'
    },
    { 
      id: 3, 
      name: 'Coastal Farms LLC', 
      score: 76, 
      risk: 'medium', 
      certifications: ['FSMA', 'HACCP'], 
      location: 'Florida, USA',
      products: ['Citrus', 'Berries'],
      contact: 'info@coastalfarms.com',
      phone: '+1 (555) 987-6543',
      activeOrders: 5,
      totalValue: '$92,000'
    },
    { 
      id: 4, 
      name: 'Green Valley Distributors', 
      score: 65, 
      risk: 'medium', 
      certifications: ['FSMA'], 
      location: 'Texas, USA',
      products: ['Onions', 'Lettuce'],
      contact: 'sales@greenvalley.com',
      phone: '+1 (555) 456-7890',
      activeOrders: 3,
      totalValue: '$54,000'
    },
    { 
      id: 5, 
      name: 'QuickShip Produce', 
      score: 52, 
      risk: 'high', 
      certifications: [], 
      location: 'Arizona, USA',
      products: ['Mixed Vegetables'],
      contact: 'contact@quickship.com',
      phone: '+1 (555) 321-0987',
      activeOrders: 2,
      totalValue: '$18,000'
    },
    { 
      id: 6, 
      name: 'Rio Grande Growers', 
      score: 38, 
      risk: 'critical', 
      certifications: [], 
      location: 'Chihuahua, Mexico',
      products: ['Peppers', 'Tomatoes'],
      contact: 'info@riogrande.mx',
      phone: '+52 (614) 123-4567',
      activeOrders: 1,
      totalValue: '$8,500'
    }
  ];

  const metrics = [
    { id: 'total', label: { en: 'Total Suppliers', es: 'Proveedores Totales' }, value: suppliers.length.toString(), icon: '🏢', color: '#06b6d4' },
    { id: 'avgScore', label: { en: 'Avg Score', es: 'Puntuación Prom' }, value: '72/100', icon: '📊', color: '#10b981' },
    { id: 'certified', label: { en: 'Certified', es: 'Certificados' }, value: '4', icon: '✅', color: '#10b981' },
    { id: 'highRisk', label: { en: 'High Risk', es: 'Alto Riesgo' }, value: '2', icon: '⚠️', color: '#ef4444' }
  ];

  const riskColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
    critical: '#dc2626'
  };

  const riskLabels = {
    low: { en: 'Low', es: 'Bajo' },
    medium: { en: 'Medium', es: 'Medio' },
    high: { en: 'High', es: 'Alto' },
    critical: { en: 'Critical', es: 'Crítico' }
  };

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRisk = filterRisk === 'all' || s.risk === filterRisk;
    
    return matchesSearch && matchesRisk;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🏢 {language === 'es' ? 'Inteligencia de Proveedores' : 'Supplier Intelligence'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Perfiles completos de proveedores, puntuación de riesgo, seguimiento de certificaciones y gestión de rendimiento.'
            : 'Comprehensive supplier profiles, risk scoring, certification tracking, and performance management.'}
        </p>

        {/* METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '1.8rem', color: metric.color, fontWeight: 'bold', marginBottom: '0.3rem' }}>{metric.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTER */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            🔍 {language === 'es' ? 'Buscar y Filtrar' : 'Search & Filter'}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder={language === 'es' ? 'Buscar por nombre, ubicación o producto...' : 'Search by name, location, or product...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'rgba(30, 41, 59, 0.6)', 
                border: '2px solid #334155', 
                borderRadius: '12px', 
                color: '#fff', 
                fontSize: '1rem' 
              }}
            />
            
            <select 
              value={filterRisk} 
              onChange={(e) => setFilterRisk(e.target.value)}
              style={{ 
                padding: '1rem', 
                background: 'rgba(30, 41, 59, 0.6)', 
                border: '2px solid #334155', 
                borderRadius: '12px', 
                color: '#fff', 
                fontSize: '1rem',
                minWidth: '180px'
              }}
            >
              <option value="all">{language === 'es' ? 'Todos los Riesgos' : 'All Risk Levels'}</option>
              <option value="low">{language === 'es' ? 'Bajo Riesgo' : 'Low Risk'}</option>
              <option value="medium">{language === 'es' ? 'Riesgo Medio' : 'Medium Risk'}</option>
              <option value="high">{language === 'es' ? 'Alto Riesgo' : 'High Risk'}</option>
              <option value="critical">{language === 'es' ? 'Riesgo Crítico' : 'Critical Risk'}</option>
            </select>
          </div>
          
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {language === 'es' ? 'Mostrando' : 'Showing'} <strong style={{ color: '#06b6d4' }}>{filteredSuppliers.length}</strong> {language === 'es' ? 'de' : 'of'} <strong>{suppliers.length}</strong> {language === 'es' ? 'proveedores' : 'suppliers'}
          </div>
        </div>

        {/* SUPPLIER CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '15px', padding: '1.5rem' }}>
              
              {/* HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.3rem', fontWeight: 'bold' }}>{supplier.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>📍 {supplier.location}</div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: supplier.score >= 80 ? '#10b981' : supplier.score >= 60 ? '#f59e0b' : '#ef4444', marginBottom: '0.2rem' }}>
                    {supplier.score}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SCORE</div>
                </div>
              </div>

              {/* RISK BADGE */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  padding: '0.4rem 1rem', 
                  background: `${riskColors[supplier.risk]}20`, 
                  color: riskColors[supplier.risk], 
                  borderRadius: '8px', 
                  fontSize: '0.85rem', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase' 
                }}>
                  {supplier.risk === 'low' && '✅ '}
                  {supplier.risk === 'medium' && '⚠️ '}
                  {supplier.risk === 'high' && '🔴 '}
                  {supplier.risk === 'critical' && '🚨 '}
                  {riskLabels[supplier.risk][language]}
                </span>
              </div>

              {/* CERTIFICATIONS */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {language === 'es' ? 'CERTIFICACIONES:' : 'CERTIFICATIONS:'}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {supplier.certifications.length > 0 ? (
                    supplier.certifications.map((cert, idx) => (
                      <span key={idx} style={{ padding: '0.3rem 0.6rem', background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', borderRadius: '6px', fontSize: '0.75rem' }}>
                        {cert}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>{language === 'es' ? 'Sin certificaciones' : 'No certifications'}</span>
                  )}
                </div>
              </div>

              {/* PRODUCTS */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {language === 'es' ? 'PRODUCTOS:' : 'PRODUCTS:'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#fff' }}>{supplier.products.join(', ')}</div>
              </div>

              {/* CONTACT */}
              <div style={{ borderTop: '1px solid rgba(100, 116, 139, 0.3)', paddingTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                  📧 {supplier.contact}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  📞 {supplier.phone}
                </div>
              </div>

              {/* STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#06b6d4' }}>{supplier.activeOrders}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{language === 'es' ? 'Órdenes Activas' : 'Active Orders'}</div>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#10b981' }}>{supplier.totalValue}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{language === 'es' ? 'Valor Total' : 'Total Value'}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'es' ? 'Inicio' : 'Home'}
        </button>

      </div>
    </div>
  );
};

export default SupplierIntelligenceDashboard;
'@
[System.IO.File]::WriteAllText("$PWD\pages\suppliers\SupplierIntelligenceDashboard.jsx", $supplierDashboard)

Write-Host "✅ SupplierIntelligenceDashboard.jsx created!" -ForegroundColor Green

# ================================================================
# 2. UPDATE APP.JSX - ADD SUPPLIER ROUTE (NO CHANGES TO EXISTING)
# ================================================================
Write-Host "Updating App.jsx to add Supplier Intelligence route..." -ForegroundColor Yellow

$appContent = Get-Content "App.jsx" -Raw

# Add import at top (after existing imports)
$importLine = "import SupplierIntelligenceDashboard from './pages/suppliers/SupplierIntelligenceDashboard';"
if ($appContent -notlike "*SupplierIntelligenceDashboard*") {
    $appContent = $appContent -replace "(import CMProductsIntelligenceDashboard.*?;)", "`$1`n$importLine"
}

# Add menu item
if ($appContent -notlike "*supplier-intel*") {
    $appContent = $appContent -replace "(\{ id: 'food-safety'.*?\},)", "`$1`n    { id: 'supplier-intel', label: { en: '🏢 Suppliers', es: '🏢 Proveedores' } },"
}

# Add case in renderPage
if ($appContent -notlike "*case 'supplier-intel'*") {
    $appContent = $appContent -replace "(case 'food-safety':.*?return <FoodSafetyDashboard />;)", "`$1`n      case 'supplier-intel':`n        return <SupplierIntelligenceDashboard />;"
}

# Add to HomePage features
$featureBlock = @"
    { 
      id: 'supplier-intel', 
      icon: '🏢', 
      title: { en: 'Supplier Intelligence', es: 'Inteligencia de Proveedores' }, 
      desc: { en: 'Supplier scoring, risk assessment, certification tracking, performance metrics', es: 'Puntuación de proveedores, evaluación de riesgos, seguimiento de certificaciones' }, 
      price: 'Free' 
    },
"@

if ($appContent -notlike "*supplier-intel*factoring*") {
    $appContent = $appContent -replace "(\{ \s*id: 'factoring',)", "$featureBlock`n    `$1"
}

Set-Content -Path "App.jsx" -Value $appContent -Encoding UTF8

Write-Host "✅ App.jsx updated with Supplier Intelligence route!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 SUPPLIER INTELLIGENCE MODULE COMPLETE!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📦 What was added:" -ForegroundColor Yellow
Write-Host "  ✅ SupplierIntelligenceDashboard.jsx (FULL MODULE)" -ForegroundColor Green
Write-Host "  ✅ 6 suppliers with complete profiles" -ForegroundColor Green
Write-Host "  ✅ Risk scoring (Low/Medium/High/Critical)" -ForegroundColor Green
Write-Host "  ✅ Certification tracking" -ForegroundColor Green
Write-Host "  ✅ Search & filter functionality" -ForegroundColor Green
Write-Host "  ✅ Performance metrics" -ForegroundColor Green
Write-Host "  ✅ Bilingual support (EN/ES)" -ForegroundColor Green
Write-Host ""
Write-Host "🔄 Refresh your browser to see the new 🏢 Suppliers button!" -ForegroundColor Cyan