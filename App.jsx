// ================================================================
// AUDITDNA FRONTEND - UNIFIED DARK THEME
// ================================================================
// Date: 2025-11-12 23:02:17 UTC
// Author: SeabassFather (BEAST MODE!)
// Theme: Professional Dark (Bloomberg-style)
// Status: PRODUCTION BUILD - 16/16 MODULES + GROWER INTELLIGENCE
// ================================================================

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import GlobalHeader from './components/GlobalHeader';

// ================================================================
// MODULE IMPORTS (CORRECT PATHS - ORGANIZED!)
// ================================================================
import WaterTechModuleAdvanced from './WaterTechModuleAdvanced';
import ProduceAnalyticsPanel from './ProduceAnalyticsPanel';
import ProducePOForm from './ProducePOForm';
import FactoringDashboard from './FactoringDashboard';
import CartSummary from './CartSummary';

// PAGES (CORRECT FOLDER STRUCTURE)
import FoodSafetyDashboard from './pages/foodsafety/FoodSafetyDashboard';
import ProduceIntelligenceDashboard from './pages/produce/ProduceIntelligenceDashboard';
import CMProductsIntelligenceDashboard from './pages/cmproducts/CMProductsIntelligenceDashboard';
import SupplierIntelligenceSearchEngine from './pages/suppliers/SupplierIntelligenceSearchEngine';
import SupplierIntelligence from './pages/supplier-intelligence/SupplierIntelligence';
import GrowerIntelligenceDashboard from './pages/supplier-intelligence/GrowerIntelligenceDashboard';
import TraceabilityAIHub from './pages/traceability/TraceabilityAIHub';
import SoilDashboard from './pages/soil/SoilDashboard';
import LatinAmericaTradeDashboard from './pages/latinamerica/LatinAmericaTradeDashboard';
import GrowerPortalEnhanced from './pages/growers/GrowerPortalEnhanced';

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');

  const menuItems = [
    { id: 'home', label: { en: 'Home', es: 'Inicio' } },
    { id: 'cm-products', label: { en: 'CM Products', es: 'CM Products' } },
    { id: 'produce-intel', label: { en: 'Produce', es: 'Productos' } },
    { id: 'produce-analytics', label: { en: 'Analytics', es: 'Análisis' } },
    { id: 'produce-po', label: { en: 'PO Form', es: 'Orden' } },
    { id: 'food-safety', label: { en: 'Safety', es: 'Seguridad' } },
    { id: 'supplier-intel', label: { en: 'Suppliers', es: 'Proveedores' } },
    { id: 'supplier-search', label: { en: '🔍 Search Engine', es: '🔍 Buscador' } },
    { id: 'grower-intelligence', label: { en: '🕵️ Grower Intel', es: '🕵️ Intel Productores' } },
    { id: 'traceability', label: { en: 'Trace', es: 'Trazabilidad' } },
    { id: 'water-tech', label: { en: 'Water', es: 'Agua' } },
    { id: 'soil', label: { en: 'Soil', es: 'Suelo' } },
    { id: 'growers', label: { en: 'Growers', es: 'Productores' } },
    { id: 'latin-america', label: { en: 'Latin America', es: 'América Latina' } },
    { id: 'factoring', label: { en: 'Finance', es: 'Finanzas' } },
    { id: 'cart', label: { en: 'Cart', es: 'Carrito' } }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': 
        return <HomePage setCurrentPage={setCurrentPage} />;
      
      case 'cm-products': 
        return <CMProductsIntelligenceDashboard />;
      
      case 'produce-intel': 
        return <ProduceIntelligenceDashboard />;
      
      case 'produce-analytics': 
        return <ProduceAnalyticsPanel />;
      
      case 'produce-po': 
        return <ProducePOForm />;
      
      case 'food-safety': 
        return <FoodSafetyDashboard />;
      
      case 'supplier-intel': 
        return <SupplierIntelligenceSearchEngine />;
      
      case 'supplier-search': 
        return <SupplierIntelligence />;
      
      case 'grower-intelligence': 
        return <GrowerIntelligenceDashboard />;
      
      case 'traceability': 
        return <TraceabilityAIHub />;
      
      case 'water-tech': 
        return <WaterTechModuleAdvanced />;
      
      case 'soil': 
        return <SoilDashboard />;
      
      case 'growers': 
        return <GrowerPortalEnhanced />;
      
      case 'latin-america': 
        return <LatinAmericaTradeDashboard />;
      
      case 'factoring': 
        return <FactoringDashboard />;
      
      case 'cart': 
        return <CartPage />;
      
      default: 
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #020617 0%, #0a0a0a 50%, #1a1a2e 100%)'
    }}>
      <GlobalHeader />
      
      <nav style={{ 
        background: 'rgba(15, 23, 42, 0.95)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(34, 197, 94, 0.3)', 
        padding: '1rem 2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1800px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem' 
        }}>
          <div style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#22c55e',
            textShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
            letterSpacing: '1px'
          }}>
            🧬 AuditDNA
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '0.8rem', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#22c55e rgba(15, 23, 42, 0.6)'
          }}>
            {menuItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setCurrentPage(item.id)} 
                style={{ 
                  padding: '0.7rem 1.3rem', 
                  background: currentPage === item.id 
                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                    : 'rgba(30, 41, 59, 0.6)', 
                  border: currentPage === item.id 
                    ? '2px solid #22c55e' 
                    : '2px solid rgba(100, 116, 139, 0.3)', 
                  borderRadius: '10px', 
                  color: '#fff', 
                  cursor: 'pointer', 
                  fontSize: '0.9rem', 
                  fontWeight: currentPage === item.id ? 'bold' : '600',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(8px)',
                  boxShadow: currentPage === item.id 
                    ? '0 6px 20px rgba(34, 197, 94, 0.4)' 
                    : 'none',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                    e.currentTarget.style.borderColor = '#22c55e';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {item.label[language]}
              </button>
            ))}

            <button 
              onClick={toggleLanguage} 
              style={{ 
                padding: '0.7rem 1.3rem', 
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                border: '2px solid #3b82f6', 
                borderRadius: '10px', 
                color: '#fff', 
                cursor: 'pointer', 
                fontWeight: 'bold', 
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
              }}
            >
              {language === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        {renderPage()}
      </div>
    </div>
  );
}

function HomePage({ setCurrentPage }) {
  const { language } = useLanguage();
  
  const features = [
    { 
      id: 'cm-products', 
      icon: '🌾', 
      title: { en: 'CM Products International', es: 'CM Products International' }, 
      desc: { en: 'AI market intelligence, 5-year trends, grower registry, Google Calendar, Zadarma VoIP', es: 'Inteligencia IA, tendencias 5 años, registro productores, Google Calendar, Zadarma VoIP' }, 
      price: 'Free',
      featured: true 
    },
    { 
      id: 'supplier-search', 
      icon: '🔍', 
      title: { en: 'Supplier Intelligence Engine', es: 'Motor Inteligencia Proveedores' }, 
      desc: { en: 'Search 500+ growers, verify certifications, real-time inventory, contact management', es: 'Buscar 500+ productores, verificar certificaciones, inventario tiempo real' }, 
      price: 'Free',
      featured: true,
      new: true
    },
    { 
      id: 'grower-intelligence', 
      icon: '🕵️', 
      title: { en: 'Grower Intelligence', es: 'Inteligencia de Productores' }, 
      desc: { en: 'FBI-level vetting: USDA, FDA, SENASICA verification • Risk scoring • PDF reports • Complete due diligence', es: 'Verificación nivel FBI: USDA, FDA, SENASICA • Puntuación riesgo • Reportes PDF' }, 
      price: 'Free',
      featured: true,
      new: true
    },
    { 
      id: 'produce-intel', 
      icon: '🥑', 
      title: { en: 'Produce Intelligence', es: 'Inteligencia de Productos' }, 
      desc: { en: 'Professional charts, 30-day trends, 5-year analysis, multi-commodity comparison', es: 'Gráficos profesionales, tendencias 30 días, análisis 5 años, comparación multi-producto' }, 
      price: 'Free' 
    },
    { 
      id: 'produce-analytics', 
      icon: '📊', 
      title: { en: 'Produce Analytics', es: 'Análisis de Productos' }, 
      desc: { en: 'AI price prediction, demand forecasting, trend analysis', es: 'Predicción precios IA, pronóstico demanda' }, 
      price: 'Free' 
    },
    { 
      id: 'produce-po', 
      icon: '📝', 
      title: { en: 'Purchase Order', es: 'Orden de Compra' }, 
      desc: { en: 'Smart pricing, auto-fill, compliance checking', es: 'Precios inteligentes, autocompletado' }, 
      price: 'Free' 
    },
    { 
      id: 'traceability', 
      icon: '🔗', 
      title: { en: 'Traceability AI', es: 'Trazabilidad IA' }, 
      desc: { en: 'QR codes, blockchain verification, supply chain tracking', es: 'Códigos QR, blockchain, seguimiento' }, 
      price: 'Free' 
    },
    { 
      id: 'supplier-intel', 
      icon: '🏢', 
      title: { en: 'Supplier Management', es: 'Gestión Proveedores' }, 
      desc: { en: 'Supplier scoring, risk assessment, smart contacts', es: 'Puntuación proveedores, evaluación riesgos' }, 
      price: 'Free' 
    },
    { 
      id: 'food-safety', 
      icon: '🛡️', 
      title: { en: 'Food Safety', es: 'Seguridad Alimentaria' }, 
      desc: { en: 'HACCP, certifications, CAPA, lab results', es: 'HACCP, certificaciones, CAPA, resultados lab' }, 
      price: '$299' 
    },
    { 
      id: 'water-tech', 
      icon: '💧', 
      title: { en: 'Water Analysis', es: 'Análisis de Agua' }, 
      desc: { en: 'AI analysis 150+ parameters, EPA/WHO compliance', es: 'Análisis IA 150+ parámetros, EPA/WHO' }, 
      price: '$149' 
    },
    { 
      id: 'soil', 
      icon: '🌱', 
      title: { en: 'Soil Analysis', es: 'Análisis de Suelo' }, 
      desc: { en: 'NPK, pH, organic matter, micronutrients, heavy metals', es: 'NPK, pH, materia orgánica, micronutrientes' }, 
      price: '$149' 
    },
    { 
      id: 'growers', 
      icon: '🚜', 
      title: { en: 'Grower Portal', es: 'Portal Productores' }, 
      desc: { en: 'Harvest scheduling, freight calculator, GPS tracking, insurance', es: 'Programación cosechas, calculadora flete, rastreo GPS' }, 
      price: 'Free' 
    },
    { 
      id: 'latin-america', 
      icon: '🌎', 
      title: { en: 'Latin America Trade', es: 'Comercio América Latina' }, 
      desc: { en: '10 tools: Search, Pricing, Buyers, Finance, Logistics, AI, Maps', es: '10 herramientas: Búsqueda, Precios, Compradores, Finanzas' }, 
      price: 'Free' 
    },
    { 
      id: 'factoring', 
      icon: '💰', 
      title: { en: 'Trade Finance', es: 'Financiamiento Comercial' }, 
      desc: { en: 'AI-powered factoring, risk scoring, auto-approval', es: 'Factoraje IA, puntuación riesgo, aprobación automática' }, 
      price: 'Variable' 
    }
  ];

  return (
    <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          color: '#22c55e', 
          marginBottom: '1rem', 
          fontWeight: 'bold',
          textShadow: '0 0 40px rgba(34, 197, 94, 0.6)',
          letterSpacing: '-0.02em'
        }}>
          {language === 'en' ? 'Welcome to AuditDNA' : 'Bienvenido a AuditDNA'}
        </h1>
        <p style={{ 
          fontSize: '1.4rem', 
          color: '#94a3b8', 
          maxWidth: '1000px', 
          margin: '0 auto',
          lineHeight: '1.7',
          fontWeight: '500'
        }}>
          {language === 'en' 
            ? 'Advanced agricultural intelligence, compliance auditing, and traceability platform powered by AI' 
            : 'Plataforma avanzada de inteligencia agrícola, auditoría de cumplimiento y trazabilidad con IA'}
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '2rem' 
      }}>
        {features.map(feature => (
          <div 
            key={feature.id} 
            onClick={() => setCurrentPage(feature.id)} 
            style={{ 
              background: feature.featured 
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
              border: feature.featured 
                ? '3px solid #22c55e'
                : '2px solid rgba(34, 197, 94, 0.3)', 
              borderRadius: '20px', 
              padding: '2.5rem', 
              cursor: 'pointer', 
              transition: 'all 0.3s', 
              textAlign: 'center',
              boxShadow: feature.featured 
                ? '0 20px 50px rgba(34, 197, 94, 0.4)'
                : '0 10px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = '#22c55e';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(34, 197, 94, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = feature.featured ? '#22c55e' : 'rgba(34, 197, 94, 0.3)';
              e.currentTarget.style.boxShadow = feature.featured 
                ? '0 20px 50px rgba(34, 197, 94, 0.4)'
                : '0 10px 30px rgba(0, 0, 0, 0.3)';
            }}
          >
            {feature.new && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#ef4444',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
              }}>
                NEW! 🔥
              </div>
            )}
            
            <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>{feature.icon}</div>
            <h3 style={{ 
              fontSize: '1.6rem', 
              color: feature.featured ? '#0f172a' : '#fff', 
              marginBottom: '1rem', 
              fontWeight: 'bold', 
              letterSpacing: '-0.01em' 
            }}>
              {feature.title[language]}
            </h3>
            <p style={{ 
              color: feature.featured ? 'rgba(15, 23, 42, 0.8)' : '#94a3b8', 
              marginBottom: '1.5rem', 
              minHeight: '5rem', 
              fontSize: '1rem', 
              lineHeight: '1.6', 
              fontWeight: '500' 
            }}>
              {feature.desc[language]}
            </p>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: feature.featured ? '#0f172a' : '#22c55e',
              textShadow: feature.featured 
                ? 'none'
                : '0 2px 8px rgba(34, 197, 94, 0.4)'
            }}>
              {feature.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartPage() {
  const { language } = useLanguage();
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', color: '#fff' }}>
      <h2 style={{ 
        fontSize: '3rem', 
        color: '#22c55e', 
        marginBottom: '2rem', 
        fontWeight: 'bold',
        textShadow: '0 0 30px rgba(34, 197, 94, 0.6)'
      }}>
        {language === 'en' ? '🛒 Shopping Cart' : '🛒 Carrito de Compras'}
      </h2>
      <CartSummary />
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <UserProvider>
        <LanguageProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </LanguageProvider>
      </UserProvider>
    </Router>
  );
}

export default App;