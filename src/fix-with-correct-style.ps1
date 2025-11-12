# ================================================================
# FIX ALL 3 FILES WITH CORRECT ORIGINAL STYLE
# ================================================================
Write-Host "🔧 Applying ORIGINAL STYLE to all modules..." -ForegroundColor Cyan

# Delete corrupted files
Remove-Item -Path "pages/foodsafety/FoodSafetyDashboard.jsx" -ErrorAction SilentlyContinue
Remove-Item -Path "pages/produce/ProduceIntelligenceDashboard.jsx" -ErrorAction SilentlyContinue
Remove-Item -Path "pages/cmproducts/CMProductsIntelligenceDashboard.jsx" -ErrorAction SilentlyContinue

# 1. FoodSafetyDashboard.jsx - ORIGINAL STYLE
$foodSafety = @'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const FoodSafetyDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const metrics = [
    { id: 'score', label: { en: 'Safety Score', es: 'Puntuación Seguridad' }, value: '92/100', color: '#10b981', icon: '🎯' },
    { id: 'certs', label: { en: 'Active Certifications', es: 'Certificaciones Activas' }, value: '8', color: '#06b6d4', icon: '📜' },
    { id: 'audits', label: { en: 'Upcoming Audits', es: 'Auditorías Próximas' }, value: '3', color: '#f59e0b', icon: '📅' },
    { id: 'alerts', label: { en: 'Non-Compliance Alerts', es: 'Alertas Incumplimiento' }, value: '2', color: '#ef4444', icon: '⚠️' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🛡️ {language === 'es' ? 'Centro de Seguridad Alimentaria' : 'Food Safety Command Center'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Gestión integral de HACCP, certificaciones, CAPA, resultados de laboratorio y cumplimiento de auditorías.'
            : 'Comprehensive HACCP management, certifications, CAPA, lab results, and audit compliance tracking.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '1.8rem', color: metric.color, fontWeight: 'bold', marginBottom: '0.3rem' }}>{metric.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '3rem', borderRadius: '25px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '2rem', textAlign: 'center' }}>
            📋 {language === 'es' ? 'Acciones Rápidas' : 'Quick Actions'}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <button style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
              📜 {language === 'es' ? 'Subir Certificado' : 'Upload Certificate'}
            </button>
            <button style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
              🧪 {language === 'es' ? 'Gestor HACCP' : 'HACCP Manager'}
            </button>
            <button style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
              🔬 {language === 'es' ? 'Resultados Lab' : 'Lab Results'}
            </button>
            <button style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
              🔧 {language === 'es' ? 'CAPA Manager' : 'CAPA Manager'}
            </button>
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'es' ? 'Inicio' : 'Home'}
        </button>

      </div>
    </div>
  );
};

export default FoodSafetyDashboard;
'@
[System.IO.File]::WriteAllText("$PWD\pages\foodsafety\FoodSafetyDashboard.jsx", $foodSafety)

# 2. ProduceIntelligenceDashboard.jsx - ORIGINAL STYLE
$produce = @'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const ProduceIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const metrics = [
    { id: 'price', label: { en: 'Avg Market Price', es: 'Precio Promedio Mercado' }, value: '$2.85/lb', icon: '💰', color: '#10b981' },
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
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🥑 {language === 'es' ? 'Panel de Inteligencia de Productos' : 'Produce Intelligence Dashboard'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Análisis de mercado en tiempo real, precios semana 1-52, tendencias regionales, perfiles de productores y alertas.'
            : 'Real-time market analytics, week 1-52 pricing, regional trends, grower profiles, and market alerts.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '1.8rem', color: metric.color, fontWeight: 'bold', marginBottom: '0.3rem' }}>{metric.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {commodities.map(commodity => (
            <div key={commodity.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{commodity.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.3rem', fontWeight: 'bold' }}>{commodity.name[language]}</h3>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#10b981' }}>{commodity.price}</div>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: commodity.trend === 'up' ? '#10b981' : '#ef4444' }}>
                  {commodity.trend === 'up' ? '↗' : '↘'} {commodity.change}
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

export default ProduceIntelligenceDashboard;
'@
[System.IO.File]::WriteAllText("$PWD\pages\produce\ProduceIntelligenceDashboard.jsx", $produce)

# 3. CMProductsIntelligenceDashboard.jsx - ORIGINAL STYLE
$cmProducts = @'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const CMProductsIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const metrics = [
    { id: 'price', label: { en: 'Avg Market Price', es: 'Precio Promedio' }, value: '$2.85/lb', icon: '💰', color: '#10b981' },
    { id: 'volume', label: { en: 'Weekly Volume', es: 'Volumen Semanal' }, value: '2.4M lbs', icon: '📦', color: '#06b6d4' },
    { id: 'growers', label: { en: 'Active Growers', es: 'Productores Activos' }, value: '156', icon: '🌾', color: '#f59e0b' },
    { id: 'volatility', label: { en: 'Volatility Index', es: 'Índice Volatilidad' }, value: '12.3%', icon: '📊', color: '#ef4444' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', color: '#06b6d4', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
            🌾 CM Products International
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {language === 'es' ? 'Impulsado por IA' : 'Powered by AI'}
          </p>
          <p style={{ fontSize: '1.2rem', color: '#b0bec5', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
            {language === 'es' 
              ? 'Inteligencia de mercado avanzada con IA, tendencias de 5 años, registro de productores y análisis de exportación/importación.'
              : 'AI-powered advanced market intelligence, 5-year trends, grower registry, and export/import analytics.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '1.8rem', color: metric.color, fontWeight: 'bold', marginBottom: '0.3rem' }}>{metric.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(6, 182, 212, 0.15)', border: '2px solid #06b6d4', borderRadius: '20px', padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            {language === 'es' ? '🎯 Características de la Plataforma' : '🎯 Platform Features'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.3rem' }}>5+</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{language === 'es' ? 'Años Históricos' : 'Historical Years'}</div>
            </div>
            <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.3rem' }}>150+</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{language === 'es' ? 'Productores Registrados' : 'Registered Growers'}</div>
            </div>
            <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.3rem' }}>Real-Time</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{language === 'es' ? 'Precios en Vivo' : 'Live Pricing'}</div>
            </div>
            <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.3rem' }}>AI-Powered</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{language === 'es' ? 'Pronóstico IA' : 'AI Forecast'}</div>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'es' ? 'Inicio' : 'Home'}
        </button>

      </div>
    </div>
  );
};

export default CMProductsIntelligenceDashboard;
'@
[System.IO.File]::WriteAllText("$PWD\pages\cmproducts\CMProductsIntelligenceDashboard.jsx", $cmProducts)

Write-Host ""
Write-Host "✅ ALL 3 FILES FIXED WITH ORIGINAL STYLE!" -ForegroundColor Green
Write-Host "🔄 Starting npm..." -ForegroundColor Cyan

cd ..
npm start