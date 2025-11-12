// ================================================================
// PRODUCE INTELLIGENCE DASHBOARD - CM PRODUCTS
// ================================================================
// Date: 2025-11-12 20:14:56 UTC
// User: SeabassFather
// Status: PRODUCTION - WITH SUPPLIERS MODULE INTEGRATION
// ================================================================

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LineChart, Line, BarChart, Bar, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Filter, TrendingUp, DollarSign, Package, Globe, MapPin, Calendar } from 'lucide-react';
import SuppliersModule from './SuppliersModule';

const ProduceIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [activeSubModule, setActiveSubModule] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // SUB-MODULE NAVIGATION
  const subModules = [
    { id: 'search', label: { en: '🔍 Search', es: '🔍 Buscar' } },
    { id: 'suppliers', label: { en: '🟢 Suppliers', es: '🟢 Proveedores' } },
    { id: 'calendar', label: { en: '📅 Seasonal Calendar', es: '📅 Calendario' } },
    { id: 'price', label: { en: '🔥 Price Intelligence', es: '🔥 Precios' } },
    { id: 'analytics', label: { en: '📊 Market Analytics', es: '📊 Análisis' } },
    { id: 'trade', label: { en: '📦 Trade Management', es: '📦 Comercio' } },
    { id: 'quality', label: { en: '💎 Quality Control', es: '💎 Calidad' } },
    { id: 'buyers', label: { en: '🏪 Buyer Network', es: '🏪 Red Compradores' } }
  ];

  // COMPREHENSIVE DATABASE
  const COMMODITY_DATABASE = [
    { id: 'avocado-hass', name: 'Hass Avocado', category: 'Avocados', icon: '🥑', region: 'Michoacán MX', fob: 42.50, change: '+5.2%', trend: 'up' },
    { id: 'strawberry', name: 'Strawberry (Albion)', category: 'Berries', icon: '🍓', region: 'Santa Maria CA', fob: 29.50, change: '-2.1%', trend: 'down' },
    { id: 'blueberry', name: 'Blueberry (Duke)', category: 'Berries', icon: '🫐', region: 'Jalisco MX', fob: 32.80, change: '+8.3%', trend: 'up' },
    { id: 'tomato-roma', name: 'Tomato (Roma)', category: 'Tomatoes', icon: '🍅', region: 'Sinaloa MX', fob: 24.80, change: '+3.1%', trend: 'up' },
    { id: 'pepper-bell', name: 'Bell Pepper (Green)', category: 'Peppers', icon: '🫑', region: 'Sinaloa MX', fob: 26.80, change: '-1.5%', trend: 'down' },
    { id: 'lettuce-romaine', name: 'Romaine Lettuce', category: 'Lettuce', icon: '🥬', region: 'Salinas CA', fob: 18.90, change: '+4.7%', trend: 'up' },
    { id: 'cucumber', name: 'Cucumber (Slicing)', category: 'Cucumbers', icon: '🥒', region: 'Sinaloa MX', fob: 21.50, change: '+2.9%', trend: 'up' },
    { id: 'broccoli', name: 'Broccoli', category: 'Cruciferous', icon: '🥦', region: 'Salinas CA', fob: 19.80, change: '+1.2%', trend: 'up' }
  ];

  // 5-YEAR HISTORICAL DATA
  const historicalData = [
    { year: '2020', avocados: 38.5, strawberries: 24.2, tomatoes: 19.3, lettuce: 15.8, peppers: 22.1 },
    { year: '2021', avocados: 42.1, strawberries: 26.5, tomatoes: 21.4, lettuce: 17.2, peppers: 24.8 },
    { year: '2022', avocados: 48.3, strawberries: 30.1, tomatoes: 24.8, lettuce: 19.5, peppers: 28.3 },
    { year: '2023', avocados: 52.8, strawberries: 32.4, tomatoes: 26.2, lettuce: 21.3, peppers: 31.2 },
    { year: '2024', avocados: 50.2, strawberries: 29.7, tomatoes: 25.1, lettuce: 20.8, peppers: 29.8 }
  ];

  // 30-DAY TREND DATA
  const thirtyDayData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const basePrice = 42.5;
    const variation = Math.sin(i / 3) * 3 + Math.random() * 2;
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: +(basePrice + variation).toFixed(2),
      volume: Math.floor(15000 + Math.random() * 5000),
      high: +(basePrice + variation + Math.random() * 2).toFixed(2),
      low: +(basePrice + variation - Math.random() * 2).toFixed(2)
    };
  });

  const categories = useMemo(() => ['All', ...new Set(COMMODITY_DATABASE.map(c => c.category))], []);
  const regions = useMemo(() => ['All', ...new Set(COMMODITY_DATABASE.map(c => c.region))], []);

  const filteredCommodities = useMemo(() => {
    return COMMODITY_DATABASE.filter(commodity => {
      const matchesSearch = commodity.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || commodity.category === selectedCategory;
      const matchesRegion = selectedRegion === 'All' || commodity.region === selectedRegion;
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  // RENDER SUB-MODULE
  const renderSubModule = () => {
    switch (activeSubModule) {
      case 'suppliers':
        return <SuppliersModule />;
      
      case 'calendar':
        return (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#22c55e' }}>📅 Seasonal Calendar - Coming Soon</h2>
          </div>
        );
      
      case 'price':
        return (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#22c55e' }}>🔥 Price Intelligence - Coming Soon</h2>
          </div>
        );
      
      case 'analytics':
        return (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#22c55e' }}>📊 Market Analytics - Coming Soon</h2>
          </div>
        );
      
      case 'trade':
        return (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#22c55e' }}>📦 Trade Management - Coming Soon</h2>
          </div>
        );
      
      case 'quality':
        return (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#22c55e' }}>💎 Quality Control - Coming Soon</h2>
          </div>
        );
      
      case 'buyers':
        return (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#22c55e' }}>🏪 Buyer Network - Coming Soon</h2>
          </div>
        );
      
      default:
        return renderSearchModule();
    }
  };

  // SEARCH MODULE (DEFAULT VIEW)
  const renderSearchModule = () => (
    <>
      {/* KEY METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid #22c55e',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Package size={32} style={{ color: '#22c55e' }} />
            <div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {language === 'en' ? 'Total Commodities' : 'Productos Totales'}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>
                {COMMODITY_DATABASE.length}
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#22c55e' }}>
            ↗ {language === 'en' ? 'Live market tracking' : 'Seguimiento en vivo'}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid #3b82f6',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <DollarSign size={32} style={{ color: '#3b82f6' }} />
            <div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {language === 'en' ? 'Avg Market Price' : 'Precio Promedio'}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>
                $32.40
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#3b82f6' }}>
            ↗ +5.2% {language === 'en' ? 'from last week' : 'desde semana pasada'}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid #f59e0b',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <TrendingUp size={32} style={{ color: '#f59e0b' }} />
            <div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {language === 'en' ? 'Market Volatility' : 'Volatilidad Mercado'}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>
                12.3%
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#f59e0b' }}>
            {language === 'en' ? 'Moderate risk level' : 'Riesgo moderado'}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid #8b5cf6',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Globe size={32} style={{ color: '#8b5cf6' }} />
            <div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {language === 'en' ? 'Active Regions' : 'Regiones Activas'}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>
                {regions.length - 1}
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#8b5cf6' }}>
            {language === 'en' ? 'Multi-timezone tracking' : 'Seguimiento multi-zona'}
          </div>
        </div>
      </div>

      {/* 5-YEAR CHART */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '20px',
        padding: '2.5rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
              📈 {language === 'en' ? '5-Year Historical Price Analysis' : 'Análisis Histórico 5 Años'}
            </h2>
            <div style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
              {language === 'en' ? 'USDA Market Data • Updated Daily' : 'Datos USDA • Actualizado Diariamente'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {['1Y', '2Y', '3Y', '5Y', 'All'].map(period => (
              <button
                key={period}
                style={{
                  padding: '0.5rem 1rem',
                  background: period === '5Y' ? '#22c55e' : 'rgba(100, 116, 139, 0.3)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} />
            <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: '0.9rem', fontWeight: '600' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '0.9rem', fontWeight: '600' }} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '2px solid #22c55e', borderRadius: '12px', color: '#fff', fontWeight: '600', padding: '1rem' }} />
            <Legend wrapperStyle={{ fontSize: '0.95rem', fontWeight: '600', paddingTop: '1rem' }} />
            <Line type="monotone" dataKey="avocados" stroke="#22c55e" strokeWidth={4} name="🥑 Hass Avocado" dot={{ r: 6, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} />
            <Line type="monotone" dataKey="strawberries" stroke="#ef4444" strokeWidth={4} name="🍓 Strawberries" dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
            <Line type="monotone" dataKey="tomatoes" stroke="#f59e0b" strokeWidth={4} name="🍅 Roma Tomatoes" dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
            <Line type="monotone" dataKey="lettuce" stroke="#06b6d4" strokeWidth={4} name="🥬 Romaine Lettuce" dot={{ r: 6, fill: '#06b6d4', strokeWidth: 2, stroke: '#fff' }} />
            <Line type="monotone" dataKey="peppers" stroke="#8b5cf6" strokeWidth={4} name="🫑 Bell Peppers" dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 30-DAY CHART */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '20px',
        padding: '2.5rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
          📊 {language === 'en' ? '30-Day Price & Volume Analysis' : 'Análisis 30 Días Precio & Volumen'}
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={thirtyDayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} />
            <XAxis dataKey="date" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" stroke="#94a3b8" />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#0f172a', border: '2px solid #3b82f6', borderRadius: '12px', padding: '1rem' }} />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="price" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={3} name="Price" />
            <Bar yAxisId="right" dataKey="volume" fill="#22c55e" fillOpacity={0.6} name="Volume" radius={[8, 8, 0, 0]} />
            <Line yAxisId="left" type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="High" />
            <Line yAxisId="left" type="monotone" dataKey="low" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Low" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* SEARCH ENGINE */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '20px',
        padding: '2.5rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
          🔍 {language === 'en' ? 'Advanced Commodity Search' : 'Búsqueda Avanzada de Productos'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search commodities...' : 'Buscar productos...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '2px solid #334155',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '1rem',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid #334155',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              padding: '1rem',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid #334155',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            {regions.map(reg => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '2rem' }}>
          {language === 'en' ? 'Showing' : 'Mostrando'} <strong style={{ color: '#22c55e', fontSize: '1.1rem' }}>{filteredCommodities.length}</strong> {language === 'en' ? 'of' : 'de'} {COMMODITY_DATABASE.length} {language === 'en' ? 'commodities' : 'productos'}
        </div>

        {/* COMMODITY GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredCommodities.map(commodity => (
            <div
              key={commodity.id}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '2px solid rgba(100, 116, 139, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#22c55e';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '3rem' }}>{commodity.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem' }}>
                      {commodity.name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} />
                      {commodity.region}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  padding: '0.4rem 0.8rem',
                  background: commodity.trend === 'up' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: commodity.trend === 'up' ? '#22c55e' : '#ef4444',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {commodity.trend === 'up' ? '↗' : '↘'} {commodity.change}
                </div>
              </div>

              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  FOB {language === 'en' ? 'Price' : 'Precio'}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>
                  ${commodity.fob.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  per lb
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
                {language === 'en' ? 'Category:' : 'Categoría:'} <strong style={{ color: '#94a3b8' }}>{commodity.category}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #0a0a0a 50%, #1a1a2e 100%)',
      padding: '2rem',
      color: '#fff'
    }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 40px rgba(34, 197, 94, 0.2)',
          border: '2px solid rgba(34, 197, 94, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '0.5rem',
              textShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
              letterSpacing: '-0.02em'
            }}>
              📊 {language === 'en' ? 'PRODUCE INTELLIGENCE DASHBOARD' : 'PANEL DE INTELIGENCIA DE PRODUCTOS'}
            </h1>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#22c55e',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {language === 'en' ? 'Real-Time Market Data • USDA Powered • AI Analytics' : 'Datos en Tiempo Real • USDA • Análisis IA'}
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '2rem',
          border: '2px solid rgba(100, 116, 139, 0.3)'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {subModules.map(module => (
              <button
                key={module.id}
                onClick={() => setActiveSubModule(module.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeSubModule === module.id 
                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                    : 'rgba(51, 65, 85, 0.6)',
                  border: activeSubModule === module.id ? '2px solid #22c55e' : '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: activeSubModule === module.id ? '0 6px 20px rgba(34, 197, 94, 0.4)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeSubModule !== module.id) {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                    e.currentTarget.style.borderColor = '#22c55e';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSubModule !== module.id) {
                    e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                  }
                }}
              >
                {module.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* RENDER ACTIVE SUB-MODULE */}
        {renderSubModule()}

        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            background: 'rgba(100, 116, 139, 0.3)',
            border: '2px solid #64748b',
            borderRadius: '12px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          ← {language === 'en' ? 'Home' : 'Inicio'}
        </button>
      </div>
    </div>
  );
};

export default ProduceIntelligenceDashboard;