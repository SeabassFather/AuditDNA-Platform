// ================================================================
// CM PRODUCTS INTERNATIONAL - PROFESSIONAL B2B PLATFORM
// ================================================================
// Date: 2025-11-12 20:25:30 UTC
// User: SeabassFather
// Structure: Main Module + Sub-Tabs (AG Marketplace + Suppliers)
// Status: PRODUCTION READY - WITH SUPPLIERS MODULE
// ================================================================

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Package, DollarSign, FileText, Truck, Calendar, Phone, TrendingUp, ClipboardCheck } from 'lucide-react';
import ProduceModule from './ProduceModule';
import ProteinMeatModule from './ProteinMeatModule';
import AgMarketplace from './ag-marketplace/AgMarketplace';
import SuppliersModule from '../produce/SuppliersModule';

const CMProductsIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('produce');

  // MAIN TABS
  const tabs = [
    { id: 'produce', label: { en: '🥑 Produce', es: '🥑 Productos' }, icon: Package },
    { id: 'protein', label: { en: '🥩 Protein/Meat', es: '🥩 Proteína/Carne' }, icon: Package },
    { id: 'analytics', label: { en: '📊 Market Analytics', es: '📊 Análisis Mercado' }, icon: TrendingUp },
    { id: 'po-form', label: { en: '📝 PO Form', es: '📝 Orden Compra' }, icon: FileText },
    { id: 'finance', label: { en: '💰 Finance', es: '💰 Finanzas' }, icon: DollarSign },
    { id: 'logistics', label: { en: '🚚 Logistics', es: '🚚 Logística' }, icon: Truck },
    { id: 'documents', label: { en: '📄 Documents', es: '📄 Documentos' }, icon: ClipboardCheck },
    { id: 'contacts', label: { en: '📞 Contacts', es: '📞 Contactos' }, icon: Phone },
    { id: 'calendar', label: { en: '📅 Calendar', es: '📅 Calendario' }, icon: Calendar },
    { id: 'search', label: { en: '🔍 Search', es: '🔍 Buscar' }, icon: Search }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'produce': 
        return <ProduceModule />;
      
      case 'protein': 
        return <ProteinMeatModule />;
      
      case 'analytics': 
        return <AnalyticsModule />;
      
      case 'po-form': 
        return <POFormModule />;
      
      case 'finance': 
        return <FinanceModule />;
      
      case 'logistics': 
        return <LogisticsModule />;
      
      case 'documents': 
        return <DocumentsModule />;
      
      case 'contacts': 
        return <ContactsModule />;
      
      case 'calendar': 
        return <CalendarModule />;
      
      case 'search': 
        return <SearchModule />;
      
      default: 
        return <ProduceModule />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
      color: '#fff' 
    }}>
      
      {/* MAIN HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderBottom: '3px solid #22c55e',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ 
          maxWidth: '1800px', 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#22c55e',
            marginBottom: '0.5rem',
            textShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
            letterSpacing: '-0.02em'
          }}>
            🌾 CM PRODUCTS INTERNATIONAL
          </h1>
          <div style={{ 
            fontSize: '1.2rem', 
            color: '#94a3b8', 
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            {language === 'en' 
              ? 'Professional B2B Wholesale Platform • Mexico → USA Import Specialists' 
              : 'Plataforma B2B Profesional • Especialistas Importación México → USA'}
          </div>
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#64748b' 
          }}>
            {language === 'en' 
              ? 'Produce • Protein/Meat • AG Marketplace • PO Financing • Invoice Factoring • Complete Logistics' 
              : 'Productos • Proteína/Carne • Mercado AG • Financiamiento PO • Factoraje • Logística Completa'}
          </div>
        </div>
      </div>

      {/* MAIN TABS NAVIGATION */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(34, 197, 94, 0.3)',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1800px', 
          margin: '0 auto', 
          display: 'flex', 
          gap: '0.5rem', 
          overflowX: 'auto', 
          flexWrap: 'wrap',
          scrollbarWidth: 'thin',
          scrollbarColor: '#22c55e rgba(30, 41, 59, 0.6)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : 'rgba(51, 65, 85, 0.6)',
                border: activeTab === tab.id 
                  ? '2px solid #22c55e' 
                  : '2px solid rgba(100, 116, 139, 0.3)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: activeTab === tab.id ? 'bold' : '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: activeTab === tab.id 
                  ? '0 4px 15px rgba(34, 197, 94, 0.4)' 
                  : 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                  e.currentTarget.style.borderColor = '#22c55e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ 
        padding: '2rem',
        minHeight: '600px'
      }}>
        {renderTabContent()}
      </div>
    </div>
  );
};

// ================================================================
// MARKET ANALYTICS MODULE (CONTAINS AG MARKETPLACE)
// ================================================================
const AnalyticsModule = () => {
  const { language } = useLanguage();
  const [analyticsTab, setAnalyticsTab] = useState('marketplace');

  const analyticsTabs = [
    { id: 'marketplace', label: { en: '🌾 AG Marketplace', es: '🌾 Mercado AG' } },
    { id: 'price-analytics', label: { en: '📈 Price Analytics', es: '📈 Análisis Precios' } },
    { id: 'forecasting', label: { en: '🔮 Trend Forecasting', es: '🔮 Pronóstico Tendencias' } },
    { id: 'reports', label: { en: '📊 Market Reports', es: '📊 Reportes Mercado' } }
  ];

  const renderAnalyticsContent = () => {
    switch(analyticsTab) {
      case 'marketplace':
        return <AgMarketplace />;
      
      case 'price-analytics':
        return (
          <div style={{ 
            color: '#fff', 
            padding: '4rem', 
            textAlign: 'center',
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            border: '2px solid rgba(34, 197, 94, 0.3)'
          }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#22c55e',
              marginBottom: '1rem',
              textShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
            }}>
              📈 {language === 'en' ? 'Price Analytics - Coming Soon' : 'Análisis de Precios - Próximamente'}
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
              {language === 'en' 
                ? 'Advanced price analysis, comparison tools, and historical trend analysis' 
                : 'Análisis avanzado de precios, herramientas de comparación y análisis de tendencias históricas'}
            </p>
          </div>
        );
      
      case 'forecasting':
        return (
          <div style={{ 
            color: '#fff', 
            padding: '4rem', 
            textAlign: 'center',
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            border: '2px solid rgba(34, 197, 94, 0.3)'
          }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#22c55e',
              marginBottom: '1rem',
              textShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
            }}>
              🔮 {language === 'en' ? 'Trend Forecasting - Coming Soon' : 'Pronóstico de Tendencias - Próximamente'}
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
              {language === 'en' 
                ? 'AI-powered market trend predictions and demand forecasting' 
                : 'Predicciones de tendencias de mercado y pronóstico de demanda con IA'}
            </p>
          </div>
        );
      
      case 'reports':
        return (
          <div style={{ 
            color: '#fff', 
            padding: '4rem', 
            textAlign: 'center',
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            border: '2px solid rgba(34, 197, 94, 0.3)'
          }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#22c55e',
              marginBottom: '1rem',
              textShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
            }}>
              📊 {language === 'en' ? 'Market Reports - Coming Soon' : 'Reportes de Mercado - Próximamente'}
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
              {language === 'en' 
                ? 'Comprehensive market intelligence reports and industry insights' 
                : 'Reportes completos de inteligencia de mercado e insights de la industria'}
            </p>
          </div>
        );
      
      default:
        return <AgMarketplace />;
    }
  };

  return (
    <div>
      {/* Analytics Sub-Navigation */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem',
        border: '2px solid rgba(34, 197, 94, 0.3)'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap' 
        }}>
          {analyticsTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setAnalyticsTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: analyticsTab === tab.id 
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : 'rgba(51, 65, 85, 0.6)',
                border: analyticsTab === tab.id 
                  ? '2px solid #22c55e' 
                  : '2px solid rgba(100, 116, 139, 0.3)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: analyticsTab === tab.id ? 'bold' : '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: analyticsTab === tab.id 
                  ? '0 4px 15px rgba(34, 197, 94, 0.4)' 
                  : 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (analyticsTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                  e.currentTarget.style.borderColor = '#22c55e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (analyticsTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Content */}
      {renderAnalyticsContent()}
    </div>
  );
};

// ================================================================
// OTHER PLACEHOLDER MODULES
// ================================================================
const POFormModule = () => {
  const { language } = useLanguage();
  return (
    <div style={{ 
      color: '#fff', 
      padding: '4rem', 
      textAlign: 'center',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '16px',
      border: '2px solid rgba(34, 197, 94, 0.3)'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: '#22c55e',
        marginBottom: '1rem'
      }}>
        📝 {language === 'en' ? 'PO Form - Coming Soon' : 'Formulario PO - Próximamente'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
        {language === 'en' 
          ? 'Smart purchase order generation and management' 
          : 'Generación y gestión inteligente de órdenes de compra'}
      </p>
    </div>
  );
};

const FinanceModule = () => {
  const { language } = useLanguage();
  return (
    <div style={{ 
      color: '#fff', 
      padding: '4rem', 
      textAlign: 'center',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '16px',
      border: '2px solid rgba(34, 197, 94, 0.3)'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: '#22c55e',
        marginBottom: '1rem'
      }}>
        💰 {language === 'en' ? 'Finance - Coming Soon' : 'Finanzas - Próximamente'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
        {language === 'en' 
          ? 'PO Financing & Invoice Factoring Solutions' 
          : 'Financiamiento PO & Soluciones de Factoraje'}
      </p>
    </div>
  );
};

const LogisticsModule = () => {
  const { language } = useLanguage();
  return (
    <div style={{ 
      color: '#fff', 
      padding: '4rem', 
      textAlign: 'center',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '16px',
      border: '2px solid rgba(34, 197, 94, 0.3)'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: '#22c55e',
        marginBottom: '1rem'
      }}>
        🚚 {language === 'en' ? 'Logistics - Coming Soon' : 'Logística - Próximamente'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
        {language === 'en' 
          ? 'Complete logistics and shipment tracking' 
          : 'Logística completa y seguimiento de envíos'}
      </p>
    </div>
  );
};

const DocumentsModule = () => {
  const { language } = useLanguage();
  return (
    <div style={{ 
      color: '#fff', 
      padding: '4rem', 
      textAlign: 'center',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '16px',
      border: '2px solid rgba(34, 197, 94, 0.3)'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: '#22c55e',
        marginBottom: '1rem'
      }}>
        📄 {language === 'en' ? 'Documents - Coming Soon' : 'Documentos - Próximamente'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
        {language === 'en' 
          ? 'Document management and compliance tracking' 
          : 'Gestión de documentos y seguimiento de cumplimiento'}
      </p>
    </div>
  );
};

const ContactsModule = () => {
  const { language } = useLanguage();
  return (
    <div style={{ 
      color: '#fff', 
      padding: '4rem', 
      textAlign: 'center',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '16px',
      border: '2px solid rgba(34, 197, 94, 0.3)'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: '#22c55e',
        marginBottom: '1rem'
      }}>
        📞 {language === 'en' ? 'Contacts - Coming Soon' : 'Contactos - Próximamente'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
        {language === 'en' 
          ? 'Smart contact management and CRM' 
          : 'Gestión inteligente de contactos y CRM'}
      </p>
    </div>
  );
};

const CalendarModule = () => {
  const { language } = useLanguage();
  return (
    <div style={{ 
      color: '#fff', 
      padding: '4rem', 
      textAlign: 'center',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '16px',
      border: '2px solid rgba(34, 197, 94, 0.3)'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: '#22c55e',
        marginBottom: '1rem'
      }}>
        📅 {language === 'en' ? 'Calendar - Coming Soon' : 'Calendario - Próximamente'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
        {language === 'en' 
          ? 'Seasonal calendar and harvest scheduling' 
          : 'Calendario estacional y programación de cosechas'}
      </p>
    </div>
  );
};

const SearchModule = () => {
  const { language } = useLanguage();
  return (
    <div style={{ 
      color: '#fff', 
      padding: '4rem', 
      textAlign: 'center',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '16px',
      border: '2px solid rgba(34, 197, 94, 0.3)'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: '#22c55e',
        marginBottom: '1rem'
      }}>
        🔍 {language === 'en' ? 'Universal Search - Coming Soon' : 'Búsqueda Universal - Próximamente'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
        {language === 'en' 
          ? 'Advanced search across all products and services' 
          : 'Búsqueda avanzada en todos los productos y servicios'}
      </p>
    </div>
  );
};

export default CMProductsIntelligenceDashboard;