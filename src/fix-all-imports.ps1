# AuditDNA - Automated Import Fix Script
Write-Host "🚀 AuditDNA Import Fixer - Starting..." -ForegroundColor Cyan

# Fix App.jsx
Write-Host "Fixing App.jsx..." -ForegroundColor Yellow
$appContent = @'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Import all modules
import WaterTechModuleAdvanced from './WaterTechModuleAdvanced';
import ProduceAnalyticsPanel from './ProduceAnalyticsPanel';
import ProducePOForm from './ProducePOForm';
import FactoringDashboard from './FactoringDashboard';
import CartSummary from './CartSummary';

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');

  const menuItems = [
    { id: 'home', label: { en: '🏠 Home', es: '🏠 Inicio' } },
    { id: 'water-tech', label: { en: '💧 Water Analysis', es: '💧 Análisis de Agua' } },
    { id: 'produce-analytics', label: { en: '📊 Market Analytics', es: '📊 Analítica de Mercado' } },
    { id: 'produce-po', label: { en: '📄 Create PO', es: '📄 Crear OC' } },
    { id: 'factoring', label: { en: '💰 Factoring', es: '💰 Factoraje' } },
    { id: 'cart', label: { en: '🛒 Cart', es: '🛒 Carrito' } },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
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
    { id: 'water-tech', icon: '💧', title: { en: 'Water Analysis', es: 'Análisis de Agua' }, desc: { en: 'AI analysis of 150+ parameters with compliance verification', es: 'Análisis IA de 150+ parámetros con verificación de cumplimiento' }, price: '$149' },
    { id: 'produce-analytics', icon: '📊', title: { en: 'Market Intelligence', es: 'Inteligencia de Mercado' }, desc: { en: 'Week 1-52 pricing, regional trends, USDA data', es: 'Precios semana 1-52, tendencias regionales, datos USDA' }, price: 'Free' },
    { id: 'produce-po', icon: '📄', title: { en: 'Purchase Orders', es: 'Órdenes de Compra' }, desc: { en: 'Generate professional POs with PDF export', es: 'Genera OCs profesionales con exportación PDF' }, price: 'Free' },
    { id: 'factoring', icon: '💰', title: { en: 'Trade Finance', es: 'Financiamiento Comercial' }, desc: { en: 'Invoice factoring & trade finance solutions', es: 'Factoraje de facturas y soluciones de financiamiento' }, price: 'Variable' }
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
Set-Content -Path "App.jsx" -Value $appContent -Encoding UTF8

# Fix WaterTechModuleAdvanced.jsx
Write-Host "Fixing WaterTechModuleAdvanced.jsx..." -ForegroundColor Yellow
(Get-Content "WaterTechModuleAdvanced.jsx") -replace "from './LanguageContext'", "from './context/LanguageContext'" -replace "from './CartContext'", "from './context/CartContext'" | Set-Content "WaterTechModuleAdvanced.jsx" -Encoding UTF8

# Fix CartSummary.jsx
Write-Host "Fixing CartSummary.jsx..." -ForegroundColor Yellow
(Get-Content "CartSummary.jsx") -replace "from './CartContext'", "from './context/CartContext'" | Set-Content "CartSummary.jsx" -Encoding UTF8

# Fix index.js
Write-Host "Fixing index.js..." -ForegroundColor Yellow
$indexContent = @'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
'@
Set-Content -Path "index.js" -Value $indexContent -Encoding UTF8

Write-Host "✅ ALL FILES FIXED!" -ForegroundColor Green
Write-Host "Starting npm..." -ForegroundColor Cyan

cd ..
npm start