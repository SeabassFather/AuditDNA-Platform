# ================================================================
# AuditDNA - CREATE ALL MISSING MODULES
# ================================================================
Write-Host "🔧 Creating ALL missing module files..." -ForegroundColor Cyan

# Create directories
New-Item -ItemType Directory -Force -Path "pages" | Out-Null
New-Item -ItemType Directory -Force -Path "pages/foodsafety" | Out-Null
New-Item -ItemType Directory -Force -Path "pages/produce" | Out-Null
New-Item -ItemType Directory -Force -Path "pages/cmproducts" | Out-Null

# ================================================================
# FOOD SAFETY MODULE - 3 FILES
# ================================================================

Write-Host "Creating FoodSafetyDashboard.jsx..." -ForegroundColor Yellow
$foodSafety = @'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const FoodSafetyDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const metrics = [
    { id: 'score', label: { en: 'Safety Score', es: 'Puntuación' }, value: '92/100', color: '#10b981', icon: '🎯' },
    { id: 'certs', label: { en: 'Certifications', es: 'Certificaciones' }, value: '8', color: '#06b6d4', icon: '📜' },
    { id: 'audits', label: { en: 'Audits', es: 'Auditorías' }, value: '3', color: '#f59e0b', icon: '📅' },
    { id: 'alerts', label: { en: 'Alerts', es: 'Alertas' }, value: '2', color: '#ef4444', icon: '⚠️' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: '#06b6d4', marginBottom: '2rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🛡️ {language === 'en' ? 'Food Safety Command Center' : 'Centro de Seguridad Alimentaria'}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${metric.color}`, borderRadius: '15px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            {language === 'en' ? '📋 Quick Actions' : '📋 Acciones Rápidas'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <button style={{ padding: '1rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              📜 {language === 'en' ? 'Upload Certificate' : 'Subir Certificado'}
            </button>
            <button style={{ padding: '1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              🧪 {language === 'en' ? 'HACCP Manager' : 'Gestor HACCP'}
            </button>
            <button style={{ padding: '1rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              🔬 {language === 'en' ? 'Lab Results' : 'Resultados Lab'}
            </button>
          </div>
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
Set-Content -Path "pages/foodsafety/FoodSafetyDashboard.jsx" -Value $foodSafety -Encoding UTF8

Write-Host "Creating CertificationUpload.jsx..." -ForegroundColor Yellow
$certUpload = @'
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const CertificationUpload = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem' }}>
          📜 {language === 'en' ? 'Certification Upload' : 'Subir Certificación'}
        </h1>

        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem' }}>
          <input type="file" onChange={(e) => setUploadedFile(e.target.files[0])} accept=".pdf,.jpg,.png" style={{ display: 'none' }} id="certUpload" />
          
          <button onClick={() => document.getElementById('certUpload').click()} style={{ width: '100%', padding: '2rem', background: uploadedFile ? 'rgba(16, 185, 129, 0.3)' : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: uploadedFile ? '3px solid #10b981' : 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}>
            {uploadedFile ? `✅ ${uploadedFile.name}` : `📤 ${language === 'en' ? 'Select Certificate File' : 'Seleccionar Archivo'}`}
          </button>
        </div>

        <button onClick={() => navigate('/food-safety')} style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'en' ? 'Back' : 'Volver'}
        </button>
      </div>
    </div>
  );
};

export default CertificationUpload;
'@
Set-Content -Path "pages/foodsafety/CertificationUpload.jsx" -Value $certUpload -Encoding UTF8

Write-Host "Creating HACCPManager.jsx..." -ForegroundColor Yellow
$haccp = @'
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const HACCPManager = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const ccps = [
    { step: { en: 'Receiving', es: 'Recepción' }, hazard: { en: 'Pathogens', es: 'Patógenos' }, limit: '< 41°F', status: 'pass' },
    { step: { en: 'Washing', es: 'Lavado' }, hazard: { en: 'Chemical', es: 'Químico' }, limit: '50-200 ppm', status: 'pass' },
    { step: { en: 'Cooling', es: 'Enfriamiento' }, hazard: { en: 'Temperature', es: 'Temperatura' }, limit: '< 40°F', status: 'warning' }
  ];

  const colors = { pass: '#10b981', warning: '#f59e0b', fail: '#ef4444' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem' }}>
          🧪 {language === 'en' ? 'HACCP Plan Manager' : 'Gestor de Plan HACCP'}
        </h1>

        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(6, 182, 212, 0.2)', borderBottom: '2px solid #06b6d4' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'en' ? 'Step' : 'Paso'}</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'en' ? 'Hazard' : 'Peligro'}</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'en' ? 'Limit' : 'Límite'}</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#06b6d4' }}>{language === 'en' ? 'Status' : 'Estado'}</th>
              </tr>
            </thead>
            <tbody>
              {ccps.map((ccp, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.3)' }}>
                  <td style={{ padding: '1rem', color: '#fff' }}>{ccp.step[language]}</td>
                  <td style={{ padding: '1rem', color: '#94a3b8' }}>{ccp.hazard[language]}</td>
                  <td style={{ padding: '1rem', color: '#fff', fontWeight: 'bold' }}>{ccp.limit}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{ padding: '0.5rem 1rem', background: `${colors[ccp.status]}20`, color: colors[ccp.status], borderRadius: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {ccp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={() => navigate('/food-safety')} style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'en' ? 'Back' : 'Volver'}
        </button>
      </div>
    </div>
  );
};

export default HACCPManager;
'@
Set-Content -Path "pages/foodsafety/HACCPManager.jsx" -Value $haccp -Encoding UTF8

# ================================================================
# PRODUCE INTELLIGENCE MODULE
# ================================================================

Write-Host "Creating ProduceIntelligenceDashboard.jsx..." -ForegroundColor Yellow
$produce = @'
import React from 'react';
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
    { id: 'price', label: { en: 'Avg Price', es: 'Precio Prom' }, value: '$2.85/lb', icon: '💰', color: '#10b981' },
    { id: 'volume', label: { en: 'Volume', es: 'Volumen' }, value: '2.4M lbs', icon: '📦', color: '#06b6d4' },
    { id: 'growers', label: { en: 'Growers', es: 'Productores' }, value: '156', icon: '🌾', color: '#f59e0b' },
    { id: 'alerts', label: { en: 'Alerts', es: 'Alertas' }, value: '3', icon: '⚠️', color: '#ef4444' }
  ];

  const commodities = [
    { id: 'avocado', name: { en: 'Avocados', es: 'Aguacates' }, price: '$2.85/lb', change: '+12%', icon: '🥑', trend: 'up' },
    { id: 'strawberry', name: { en: 'Strawberries', es: 'Fresas' }, price: '$4.20/lb', change: '-5%', icon: '🍓', trend: 'down' },
    { id: 'lettuce', name: { en: 'Lettuce', es: 'Lechuga' }, price: '$1.95/lb', change: '+8%', icon: '🥬', trend: 'up' },
    { id: 'tomato', name: { en: 'Tomatoes', es: 'Tomates' }, price: '$2.40/lb', change: '+3%', icon: '🍅', trend: 'up' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: '#06b6d4', marginBottom: '2rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🥑 {language === 'en' ? 'Produce Intelligence Dashboard' : 'Panel de Inteligencia'}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${metric.color}`, borderRadius: '15px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            📊 {language === 'en' ? 'Weekly Price Trends' : 'Tendencias Semanales'}
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {commodities.map(commodity => (
            <div key={commodity.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
Set-Content -Path "pages/produce/ProduceIntelligenceDashboard.jsx" -Value $produce -Encoding UTF8

# ================================================================
# CM PRODUCTS INTERNATIONAL MODULE
# ================================================================

Write-Host "Creating CMProductsIntelligenceDashboard.jsx..." -ForegroundColor Yellow
$cmProducts = @'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CMProductsIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const priceData5Year = [
    { year: '2020', avocados: 38, strawberries: 24, lettuce: 15, tomatoes: 19 },
    { year: '2021', avocados: 42, strawberries: 26, lettuce: 17, tomatoes: 21 },
    { year: '2022', avocados: 48, strawberries: 30, lettuce: 19, tomatoes: 24 },
    { year: '2023', avocados: 52, strawberries: 32, lettuce: 21, tomatoes: 26 },
    { year: '2024', avocados: 50, strawberries: 29, lettuce: 20, tomatoes: 25 }
  ];

  const metrics = [
    { id: 'price', label: { en: 'Avg Price', es: 'Precio Prom' }, value: '$2.85/lb', icon: '💰', color: '#10b981' },
    { id: 'volume', label: { en: 'Volume', es: 'Volumen' }, value: '2.4M lbs', icon: '📦', color: '#06b6d4' },
    { id: 'growers', label: { en: 'Growers', es: 'Productores' }, value: '156', icon: '🌾', color: '#f59e0b' },
    { id: 'volatility', label: { en: 'Volatility', es: 'Volatilidad' }, value: '12.3%', icon: '📊', color: '#ef4444' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', color: '#06b6d4', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
            🌾 CM Products International
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {language === 'en' ? 'Powered by AI' : 'Impulsado por IA'}
          </p>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
            {language === 'en' 
              ? 'Advanced Market Intelligence & Commodity Analytics Platform'
              : 'Plataforma Avanzada de Inteligencia de Mercado'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${metric.color}`, borderRadius: '15px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            📊 {language === 'en' ? '5-Year Price Trends' : 'Tendencias 5 Años'}
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={priceData5Year}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #06b6d4' }} />
              <Legend />
              <Line type="monotone" dataKey="avocados" stroke="#10b981" strokeWidth={3} name="🥑 Avocados" />
              <Line type="monotone" dataKey="strawberries" stroke="#ef4444" strokeWidth={3} name="🍓 Strawberries" />
              <Line type="monotone" dataKey="lettuce" stroke="#06b6d4" strokeWidth={3} name="🥬 Lettuce" />
              <Line type="monotone" dataKey="tomatoes" stroke="#f59e0b" strokeWidth={3} name="🍅 Tomatoes" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'en' ? 'Home' : 'Inicio'}
        </button>
      </div>
    </div>
  );
};

export default CMProductsIntelligenceDashboard;
'@
Set-Content -Path "pages/cmproducts/CMProductsIntelligenceDashboard.jsx" -Value $cmProducts -Encoding UTF8

Write-Host ""
Write-Host "✅ ALL MISSING FILES CREATED!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Files Created:" -ForegroundColor Cyan
Write-Host "  - FoodSafetyDashboard.jsx" -ForegroundColor Yellow
Write-Host "  - CertificationUpload.jsx" -ForegroundColor Yellow
Write-Host "  - HACCPManager.jsx" -ForegroundColor Yellow
Write-Host "  - ProduceIntelligenceDashboard.jsx" -ForegroundColor Yellow
Write-Host "  - CMProductsIntelligenceDashboard.jsx" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔄 Starting npm..." -ForegroundColor Cyan

cd ..
npm start