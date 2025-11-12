# ================================================================
# FIX SYNTAX ERRORS - Clean file creation
# ================================================================
Write-Host "🔧 Fixing syntax errors in all 3 dashboard files..." -ForegroundColor Cyan

# Delete corrupted files
Remove-Item -Path "pages/foodsafety/FoodSafetyDashboard.jsx" -ErrorAction SilentlyContinue
Remove-Item -Path "pages/produce/ProduceIntelligenceDashboard.jsx" -ErrorAction SilentlyContinue
Remove-Item -Path "pages/cmproducts/CMProductsIntelligenceDashboard.jsx" -ErrorAction SilentlyContinue

# FoodSafetyDashboard.jsx
$foodSafety = @'
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FoodSafetyDashboard = () => {
  const { language } = useLanguage();
  
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${metric.color}`, borderRadius: '15px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodSafetyDashboard;
'@
[System.IO.File]::WriteAllText("$PWD\pages\foodsafety\FoodSafetyDashboard.jsx", $foodSafety)

# ProduceIntelligenceDashboard.jsx
$produce = @'
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProduceIntelligenceDashboard = () => {
  const { language } = useLanguage();

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

        <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '2rem' }}>
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
      </div>
    </div>
  );
};

export default ProduceIntelligenceDashboard;
'@
[System.IO.File]::WriteAllText("$PWD\pages\produce\ProduceIntelligenceDashboard.jsx", $produce)

# CMProductsIntelligenceDashboard.jsx
$cmProducts = @'
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CMProductsIntelligenceDashboard = () => {
  const { language } = useLanguage();

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
    <div style={{ minHeight:](#)
