# ================================================================
# AuditDNA - Food Safety + Produce Intelligence Auto-Builder
# ================================================================
Write-Host "🧬 AuditDNA Module Builder - Starting..." -ForegroundColor Cyan
Write-Host "Building: Food Safety Module + Produce Intelligence Dashboard" -ForegroundColor Yellow
Write-Host ""

# Create directory structure
Write-Host "📁 Creating directory structure..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "pages" | Out-Null
New-Item -ItemType Directory -Force -Path "pages/foodsafety" | Out-Null
New-Item -ItemType Directory -Force -Path "pages/produce" | Out-Null

# ================================================================
# FOOD SAFETY MODULE - 10 Components
# ================================================================

# 1. FoodSafetyDashboard.jsx
Write-Host "Building FoodSafetyDashboard.jsx..." -ForegroundColor Yellow
$foodSafetyDashboard = @'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const FoodSafetyDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const metrics = [
    { id: 'score', label: { en: 'Safety Score', es: 'Puntuación de Seguridad' }, value: '92/100', color: '#10b981', icon: '🎯' },
    { id: 'certs', label: { en: 'Active Certifications', es: 'Certificaciones Activas' }, value: '8', color: '#06b6d4', icon: '📜' },
    { id: 'audits', label: { en: 'Upcoming Audits', es: 'Auditorías Próximas' }, value: '3', color: '#f59e0b', icon: '📅' },
    { id: 'alerts', label: { en: 'Alerts', es: 'Alertas' }, value: '2', color: '#ef4444', icon: '⚠️' }
  ];

  const modules = [
    { id: 'certs', name: { en: 'Certifications', es: 'Certificaciones' }, icon: '📜', route: '/foodsafety/certifications' },
    { id: 'haccp', name: { en: 'HACCP Manager', es: 'Gestor HACCP' }, icon: '🧪', route: '/foodsafety/haccp' },
    { id: 'capa', name: { en: 'Corrective Actions', es: 'Acciones Correctivas' }, icon: '🔧', route: '/foodsafety/capa' },
    { id: 'inspections', name: { en: 'Inspections', es: 'Inspecciones' }, icon: '📅', route: '/foodsafety/inspections' },
    { id: 'labs', name: { en: 'Lab Results', es: 'Resultados Lab' }, icon: '🔬', route: '/foodsafety/labs' },
    { id: 'sanitation', name: { en: 'Sanitation Logs', es: 'Registros Sanitarios' }, icon: '🧼', route: '/foodsafety/sanitation' },
    { id: 'training', name: { en: 'Training Records', es: 'Registros Entrenamiento' }, icon: '🎓', route: '/foodsafety/training' },
    { id: 'suppliers', name: { en: 'Supplier Compliance', es: 'Cumplimiento Proveedores' }, icon: '🏢', route: '/foodsafety/suppliers' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🛡️ {language === 'en' ? 'Food Safety Command Center' : 'Centro de Seguridad Alimentaria'}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '3rem' }}>
          {language === 'en' ? 'Comprehensive food safety management and compliance tracking' : 'Gestión integral de seguridad alimentaria y cumplimiento'}
        </p>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${metric.color}`, borderRadius: '15px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        {/* Module Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {modules.map(module => (
            <div key={module.id} onClick={() => navigate(module.route)} style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{module.icon}</div>
              <h3 style={{ fontSize: '1.2rem', color: '#06b6d4' }}>{module.name[language]}</h3>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'en' ? 'Home' : 'Inicio'}
        </button>
      </div>
    </div>
  );
};

export default FoodSafetyDashboard;
'@
Set-Content -Path "pages/foodsafety/FoodSafetyDashboard.jsx" -Value $foodSafetyDashboard -Encoding UTF8

# 2. CertificationUpload.jsx
Write-Host "Building CertificationUpload.jsx..." -ForegroundColor Yellow
$certUpload = @'
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const CertificationUpload = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);

  const certTypes = [
    { id: 'primus', name: 'PrimusGFS', icon: '🥬', color: '#10b981' },
    { id: 'haccp', name: 'HACCP', icon: '🧪', color: '#06b6d4' },
    { id: 'fda', name: 'FDA', icon: '🏛️', color: '#f59e0b' },
    { id: 'organic', name: 'USDA Organic', icon: '🌱', color: '#84cc16' },
    { id: 'gap', name: 'GLOBALG.A.P.', icon: '🌍', color: '#8b5cf6' },
    { id: 'fsma', name: 'FSMA', icon: '📋', color: '#ec4899' }
  ];

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem' }}>
          📜 {language === 'en' ? 'Certification Upload & Management' : 'Carga y Gestión de Certificaciones'}
        </h1>

        {/* Cert Type Selection */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {certTypes.map(cert => (
            <div key={cert.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${cert.color}`, borderRadius: '12px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{cert.icon}</div>
              <div style={{ fontSize: '0.9rem', color: cert.color, fontWeight: 'bold' }}>{cert.name}</div>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            {language === 'en' ? 'Upload Certificate' : 'Subir Certificado'}
          </h2>
          
          <input type="file" id="certUpload" onChange={handleFileUpload} accept=".pdf,.jpg,.png" style={{ display: 'none' }} />
          
          <button onClick={() => document.getElementById('certUpload').click()} style={{ width: '100%', padding: '2rem', background: uploadedFile ? 'rgba(16, 185, 129, 0.3)' : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: uploadedFile ? '3px solid #10b981' : 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            {uploadedFile ? `✅ ${uploadedFile.name}` : `📤 ${language === 'en' ? 'Select File (PDF, JPG, PNG)' : 'Seleccionar Archivo (PDF, JPG, PNG)'}`}
          </button>

          {uploadedFile && (
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '2px solid #06b6d4', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#06b6d4', marginBottom: '1rem' }}>
                {language === 'en' ? '🤖 AI Extraction Preview' : '🤖 Vista Previa Extracción IA'}
              </h3>
              <div style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.8' }}>
                <p>✅ {language === 'en' ? 'Certificate Type: PrimusGFS' : 'Tipo: PrimusGFS'}</p>
                <p>✅ {language === 'en' ? 'Issuing Body: NSF International' : 'Emisor: NSF International'}</p>
                <p>✅ {language === 'en' ? 'Valid From: 2024-01-15' : 'Válido Desde: 2024-01-15'}</p>
                <p>✅ {language === 'en' ? 'Expiry Date: 2025-01-15' : 'Fecha Vencimiento: 2025-01-15'}</p>
                <p>✅ {language === 'en' ? 'Scope: Fresh Produce Handling' : 'Alcance: Manejo de Productos Frescos'}</p>
              </div>
              <button style={{ marginTop: '1.5rem', padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
                💾 {language === 'en' ? 'Save Certificate' : 'Guardar Certificado'}
              </button>
            </div>
          )}
        </div>

        <button onClick={() => navigate('/foodsafety')} style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'en' ? 'Back to Dashboard' : 'Volver al Panel'}
        </button>
      </div>
    </div>
  );
};

export default CertificationUpload;
'@
Set-Content -Path "pages/foodsafety/CertificationUpload.jsx" -Value $certUpload -Encoding UTF8

# 3. HACCPManager.jsx
Write-Host "Building HACCPManager.jsx..." -ForegroundColor Yellow
$haccp = @'
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const HACCPManager = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const ccps = [
    { id: 1, step: { en: 'Receiving', es: 'Recepción' }, hazard: { en: 'Pathogen contamination', es: 'Contaminación patógena' }, limit: '< 41°F', monitoring: { en: 'Temp check every load', es: 'Temp cada carga' }, status: 'pass' },
    { id: 2, step: { en: 'Washing', es: 'Lavado' }, hazard: { en: 'Chemical residue', es: 'Residuo químico' }, limit: '50-200 ppm Cl', monitoring: { en: 'Hourly chlorine test', es: 'Test cloro cada hora' }, status: 'pass' },
    { id: 3, step: { en: 'Cooling', es: 'Enfriamiento' }, hazard: { en: 'Temperature abuse', es: 'Abuso temperatura' }, limit: '< 40°F within 2h', monitoring: { en: 'Continuous logger', es: 'Logger continuo' }, status: 'warning' },
    { id: 4, step: { en: 'Packing', es: 'Empaque' }, hazard: { en: 'Foreign material', es: 'Materia extraña' }, limit: 'Zero tolerance', monitoring: { en: 'Metal detector', es: 'Detector metales' }, status: 'pass' }
  ];

  const statusColors = { pass: '#10b981', warning: '#f59e0b', fail: '#ef4444' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem' }}>
          🧪 {language === 'en' ? 'HACCP Plan Manager' : 'Gestor de Plan HACCP'}
        </h1>

        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            {language === 'en' ? 'Critical Control Points (CCPs)' : 'Puntos Críticos de Control (PCC)'}
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(6, 182, 212, 0.2)', borderBottom: '2px solid #06b6d4' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'en' ? 'Step' : 'Paso'}</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'en' ? 'Hazard' : 'Peligro'}</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'en' ? 'Critical Limit' : 'Límite Crítico'}</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'en' ? 'Monitoring' : 'Monitoreo'}</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#06b6d4' }}>{language === 'en' ? 'Status' : 'Estado'}</th>
                </tr>
              </thead>
              <tbody>
                {ccps.map(ccp => (
                  <tr key={ccp.id} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.3)' }}>
                    <td style={{ padding: '1rem', color: '#fff' }}>{ccp.step[language]}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{ccp.hazard[language]}</td>
                    <td style={{ padding: '1rem', color: '#fff', fontWeight: 'bold' }}>{ccp.limit}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{ccp.monitoring[language]}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ padding: '0.5rem 1rem', background: `${statusColors[ccp.status]}20`, color: statusColors[ccp.status], borderRadius: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {ccp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
            ➕ {language === 'en' ? 'Add New CCP' : 'Agregar Nuevo PCC'}
          </button>
        </div>

        <button onClick={() => navigate('/foodsafety')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'en' ? 'Back' : 'Volver'}
        </button>
      </div>
    </div>
  );
};

export default HACCPManager;
'@
Set-Content -Path "pages/foodsafety/HACCPManager.jsx" -Value $haccp -Encoding UTF8

# 4. ProduceIntelligenceDashboard.jsx (BIGGEST MODULE)
Write-Host "Building ProduceIntelligenceDashboard.jsx..." -ForegroundColor Yellow
$produceDashboard = @'
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProduceIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const priceData = [
    { week: 'W1', avocados: 45, strawberries: 28, lettuce: 18 },
    { week: 'W2', avocados: 48, strawberries: 30, lettuce: 19 },
    { week: 'W3', avocados: 52, strawberries: 32, lettuce: 21 },
    { week: 'W4', avocados: 50, strawberries: 29, lettuce: 20 }
  ];

  const metrics = [
    { id: 'price', label: { en: 'Avg Market Price', es: 'Precio Promedio' }, value: '$2.85/lb', icon: '💰', color: '#10b981' },
    { id: 'volume', label: { en: 'Weekly Volume', es: 'Volumen Semanal' }, value: '2.4M lbs', icon: '📦', color: '#06b6d4' },
    { id: 'growers', label: { en: 'Active Growers', es: 'Productores Activos' }, value: '156', icon: '🌾', color: '#f59e0b' },
    { id: 'alerts', label: { en: 'Market Alerts', es: 'Alertas Mercado' }, value: '3', icon: '⚠️', color: '#ef4444' }
  ];

  const commodities = [
    { id: 'avocado', name: { en: 'Avocados (Hass)', es: 'Aguacates (Hass)' }, price: '$2.85/lb', change: '+12%', icon: '🥑', trend: 'up' },
    { id: 'strawberry', name: { en: 'Strawberries', es: 'Fresas' }, price: '$4.20/lb', change: '-5%', icon: '🍓', trend: 'down' },
    { id: 'lettuce', name: { en: 'Lettuce (Romaine)', es: 'Lechuga (Romana)' }, price: '$1.95/lb', change: '+8%', icon: '🥬', trend: 'up' },
    { id: 'tomato', name: { en: 'Tomatoes (Round)', es: 'Tomates (Redondo)' }, price: '$2.40/lb', change: '+3%', icon: '🍅', trend: 'up' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🥑 {language === 'en' ? 'Produce Intelligence Dashboard' : 'Panel de Inteligencia de Productos'}
        </h1>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${metric.color}`, borderRadius: '15px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        {/* Price Chart */}
        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            {language === 'en' ? '📊 Weekly Price Trends' : '📊 Tendencias de Precios Semanales'}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #06b6d4' }} />
              <Legend />
              <Line type="monotone" dataKey="avocados" stroke="#10b981" strokeWidth={3} name="Avocados" />
              <Line type="monotone" dataKey="strawberries" stroke="#ef4444" strokeWidth={3} name="Strawberries" />
              <Line type="monotone" dataKey="lettuce" stroke="#06b6d4" strokeWidth={3} name="Lettuce" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Commodity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {commodities.map(commodity => (
            <div key={commodity.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>{commodity.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.3rem' }}>{commodity.name[language]}</h3>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{commodity.price}</div>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: commodity.trend === 'up' ? '#10b981' : '#ef4444' }}>
                  {commodity.trend === 'up' ? '↗' : '↘'} {commodity.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'en' ? 'Home' : 'Inicio'}
        </button>
      </div>
    </div>
  );
};

export default ProduceIntelligenceDashboard;
'@
Set-Content -Path "pages/produce/ProduceIntelligenceDashboard.jsx" -Value $produceDashboard -Encoding UTF8

# ================================================================
# UPDATE APP.JSX - ADD NEW ROUTES
# ================================================================
Write-Host "Updating App.jsx with new routes..." -ForegroundColor Green

$appUpdate = @'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Existing modules
import WaterTechModuleAdvanced from './WaterTechModuleAdvanced';
import ProduceAnalyticsPanel from './ProduceAnalyticsPanel';
import ProducePOForm from './ProducePOForm';
import FactoringDashboard from './FactoringDashboard';
import CartSummary from './CartSummary';

// NEW: Food Safety Module
import FoodSafetyDashboard from './pages/foodsafety/FoodSafetyDashboard';
import CertificationUpload from './pages/foodsafety/CertificationUpload';
import HACCPManager from './pages/foodsafety/HACCPManager';

// NEW: Produce Intelligence Module
import ProduceIntelligenceDashboard from './pages/produce/ProduceIntelligenceDashboard';

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');

  const menuItems = [
    { id: 'home', label: { en: '🏠 Home', es: '🏠 Inicio' } },
    { id: 'produce-intel', label: { en: '🥑 Produce Intel', es: '🥑 Inteligencia' } },
    { id: 'food-safety', label: { en: '🛡️ Food Safety', es: '🛡️ Seguridad' } },
    { id: 'water-tech', label: { en: '💧 Water', es: '💧 Agua' } },
    { id: 'factoring', label: { en: '💰 Finance', es: '💰 Finanzas' } },
    { id: 'cart', label: { en: '🛒 Cart', es: '🛒 Carrito' } },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'produce-intel':
        return <ProduceIntelligenceDashboard />;
      case 'food-safety':
        return <FoodSafetyDashboard />;
      case 'water-tech':
        return <WaterTechModuleAdvanced />;
      case 'produce-analytics':
        return <ProduceAnalyticsPanel commodity="TOMATOES" />;
      case 'produce-po':
        return <ProducePOForm onNext={() => setCurrentPage('cart')} />;
      case 'factoring':
        return <FactoringDashboard />;
      case 'cart':
        return <CartPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <nav style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '2px solid #334155', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#06b6d4' }}>🧬 AuditDNA</div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {menuItems.map(item => (
              <button key={item.id} onClick={() => setCurrentPage(item.id)} style={{ padding: '0.5rem 1rem', background: currentPage === item.id ? '#06b6d4' : 'transparent', border: '1px solid #334155', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}>
                {item.label[language]}
              </button>
            ))}
            <button onClick={toggleLanguage} style={{ padding: '0.5rem 1rem', background: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              {language === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
            </button>
          </div>
        </div>
      </nav>
      <div style={{ padding: '2rem' }}>{renderPage()}</div>
    </div>
  );
}

function HomePage({ setCurrentPage }) {
  const { language } = useLanguage();
  const features = [
    { id: 'produce-intel', icon: '🥑', title: { en: 'Produce Intelligence', es: 'Inteligencia de Productos' }, desc: { en: 'Market analytics, pricing, USDA data, grower profiles', es: 'Analítica de mercado, precios, datos USDA, perfiles' }, price: 'Free' },
    { id: 'food-safety', icon: '🛡️', title: { en: 'Food Safety', es: 'Seguridad Alimentaria' }, desc: { en: 'HACCP, certifications, CAPA, lab results, audits', es: 'HACCP, certificaciones, CAPA, resultados lab, auditorías' }, price: '$299' },
    { id: 'water-tech', icon: '💧', title: { en: 'Water Analysis', es: 'Análisis de Agua' }, desc: { en: 'AI analysis of 150+ parameters with compliance verification', es: 'Análisis IA de 150+ parámetros con verificación' }, price: '$149' },
    { id: 'factoring', icon: '💰', title: { en: 'Trade Finance', es: 'Financiamiento' }, desc: { en: 'Invoice factoring & PO financing solutions', es: 'Factoraje y financiamiento de OC' }, price: 'Variable' }
  ];
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          {language === 'en' ? 'Welcome to AuditDNA' : 'Bienvenido a AuditDNA'}
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto' }}>
          {language === 'en' ? 'Advanced agricultural intelligence, compliance auditing, and traceability platform powered by AI' : 'Plataforma avanzada de inteligencia agrícola, auditoría de cumplimiento y trazabilidad con IA'}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {features.map(feature => (
          <div key={feature.id} onClick={() => setCurrentPage(feature.id)} style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '20px', padding: '2rem', cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{feature.icon}</div>
            <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '0.5rem' }}>{feature.title[language]}</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', minHeight: '3rem' }}>{feature.desc[language]}</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{feature.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartPage() {
  const { language } = useLanguage();
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <h2 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem' }}>
        {language === 'en' ? '🛒 Shopping Cart' : '🛒 Carrito de Compras'}
      </h2>
      <CartSummary />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
'@
Set-Content -Path "App.jsx" -Value $appUpdate -Encoding UTF8

Write-Host ""
Write-Host "✅ BUILD COMPLETE!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Modules Created:" -ForegroundColor Cyan
Write-Host "  - Food Safety Dashboard" -ForegroundColor Yellow
Write-Host "  - Certification Upload" -ForegroundColor Yellow
Write-Host "  - HACCP Manager" -ForegroundColor Yellow
Write-Host "  - Produce Intelligence Dashboard" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔄 Starting npm..." -ForegroundColor Cyan

cd ..
npm start