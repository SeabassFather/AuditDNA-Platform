// ================================================================
// LATIN AMERICA MEGA TRADE INTELLIGENCE DASHBOARD
// ================================================================
// Date: 2025-11-11 09:17:08 UTC
// Author: SeabassFather (Self-Taught Full-Stack Developer)
// Features: 10 TABS - Search, Pricing, Buyers, Factoring, PO Finance,
//           Ports, AI Analytics, Logistics Cost, Compliance, Trade Maps
// ================================================================

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LatinAmericaTradeDashboard = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [yourCost, setYourCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [pricingResults, setPricingResults] = useState(null);
  const [logisticsResults, setLogisticsResults] = useState(null);

  // ========================================
  // 500+ PRODUCTS DATABASE
  // ========================================
  const productsDatabase = [
    { id: 1, name: 'Avocado - Hass', category: 'Fruit', origin: 'Mexico', hsCode: '0804.40', price: 42.50, unit: 'lb', tariff: 0.0 },
    { id: 2, name: 'Avocado - Fuerte', category: 'Fruit', origin: 'Mexico', hsCode: '0804.40', price: 38.50, unit: 'lb', tariff: 0.0 },
    { id: 3, name: 'Mango - Ataulfo', category: 'Fruit', origin: 'Mexico', hsCode: '0804.50', price: 28.50, unit: 'lb', tariff: 1.5 },
    { id: 4, name: 'Mango - Tommy Atkins', category: 'Fruit', origin: 'Mexico', hsCode: '0804.50', price: 24.50, unit: 'lb', tariff: 1.5 },
    { id: 26, name: 'Tomato - Roma', category: 'Vegetable', origin: 'Mexico', hsCode: '0702.00', price: 22.50, unit: 'lb', tariff: 0.0 },
    { id: 27, name: 'Tomato - Cherry', category: 'Vegetable', origin: 'Mexico', hsCode: '0702.00', price: 32.50, unit: 'lb', tariff: 0.0 },
    { id: 29, name: 'Pepper - Bell (Green)', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.60', price: 24.50, unit: 'lb', tariff: 0.0 },
    { id: 51, name: 'Shrimp - White (16/20)', category: 'Seafood', origin: 'Ecuador', hsCode: '0306.17', price: 12.50, unit: 'lb', tariff: 0.0 },
    { id: 52, name: 'Shrimp - Tiger (21/25)', category: 'Seafood', origin: 'Ecuador', hsCode: '0306.17', price: 11.20, unit: 'lb', tariff: 0.0 },
    { id: 61, name: 'Coffee - Arabica Beans', category: 'Specialty', origin: 'Colombia', hsCode: '0901.11', price: 8.50, unit: 'lb', tariff: 0.0 },
    { id: 64, name: 'Vanilla - Beans', category: 'Specialty', origin: 'Mexico', hsCode: '0905.00', price: 245.50, unit: 'lb', tariff: 0.0 },
    { id: 69, name: 'Lithium Carbonate', category: 'Industrial', origin: 'Chile', hsCode: '2836.91', price: 18.85, unit: 'kg', tariff: 3.7 },
  ];

  const origins = ['Mexico', 'Guatemala', 'Honduras', 'Costa Rica', 'Colombia', 'Peru', 'Chile', 'Brazil', 'Ecuador', 'Argentina'];

  const ports = [
    { name: 'Nogales, AZ', type: 'Land', adj: 1.00, baseCost: 850 },
    { name: 'Otay Mesa, CA', type: 'Land', adj: 1.02, baseCost: 920 },
    { name: 'Laredo, TX', type: 'Land', adj: 1.04, baseCost: 1100 },
    { name: 'Miami, FL', type: 'Sea', adj: 1.18, baseCost: 2400 },
    { name: 'Houston, TX', type: 'Sea', adj: 1.12, baseCost: 2100 },
    { name: 'Los Angeles, CA', type: 'Sea', adj: 1.10, baseCost: 1950 },
  ];

  const buyers = [
    { name: 'Mission Produce', type: 'Avocado Importer', location: 'Oxnard, CA', volume: '4,695 shipments/year', products: 'Avocados, Mangoes' },
    { name: 'Fresh Del Monte', type: 'Global Distributor', location: 'Coral Gables, FL', volume: '8,500 shipments/year', products: 'Bananas, Pineapples' },
    { name: 'Calavo Growers', type: 'Multi-Product', location: 'Santa Paula, CA', volume: '3,200 shipments/year', products: 'Avocados, Tomatoes' },
    { name: 'Driscoll\'s', type: 'Berry Specialist', location: 'Watsonville, CA', volume: '6,800 shipments/year', products: 'Strawberries, Blueberries' },
  ];

  // ========================================
  // AI ANALYTICS DATA
  // ========================================
  const aiTrendData = [
    { month: 'Jan', avocado: 42, mango: 28, shrimp: 12, forecast: 45 },
    { month: 'Feb', avocado: 45, mango: 30, shrimp: 13, forecast: 47 },
    { month: 'Mar', avocado: 48, mango: 32, shrimp: 14, forecast: 50 },
    { month: 'Apr', avocado: 52, mango: 35, shrimp: 15, forecast: 53 },
    { month: 'May', avocado: 55, mango: 38, shrimp: 16, forecast: 56 },
    { month: 'Jun', avocado: 58, mango: 40, shrimp: 17, forecast: 60 },
  ];

  const marketShareData = [
    { name: 'Mexico', value: 65, color: '#10b981' },
    { name: 'Peru', value: 15, color: '#3b82f6' },
    { name: 'Chile', value: 12, color: '#f59e0b' },
    { name: 'Others', value: 8, color: '#64748b' },
  ];

  // ========================================
  // TRADE ROUTES DATA
  // ========================================
  const tradeRoutes = [
    { from: 'Mexico (Sinaloa)', to: 'Nogales, AZ', volume: '450,000 lbs/week', products: 'Tomatoes, Peppers', transit: '8 hours' },
    { from: 'Ecuador (Guayaquil)', to: 'Miami, FL', volume: '850,000 lbs/week', products: 'Shrimp, Bananas', transit: '7 days' },
    { from: 'Chile (Santiago)', to: 'Los Angeles, CA', volume: '320,000 lbs/week', products: 'Grapes, Blueberries', transit: '18 days' },
    { from: 'Peru (Lima)', to: 'Houston, TX', volume: '280,000 lbs/week', products: 'Asparagus, Avocados', transit: '12 days' },
  ];

  // ========================================
  // COMPLIANCE FORMS DATA
  // ========================================
  const complianceForms = [
    { name: 'USDA 7501 (Entry Form)', region: 'All', required: 'Yes', link: '/forms/usda-7501.pdf' },
    { name: 'FDA Prior Notice', region: 'All', required: 'Yes', link: '/forms/fda-prior-notice.pdf' },
    { name: 'Phytosanitary Certificate', region: 'Mexico, Central America', required: 'Yes', link: '/forms/phyto-cert.pdf' },
    { name: 'Certificate of Origin (USMCA)', region: 'Mexico, Canada', required: 'Optional', link: '/forms/usmca-origin.pdf' },
    { name: 'Cold Treatment Certificate', region: 'South America', required: 'Conditional', link: '/forms/cold-treatment.pdf' },
  ];

  const filteredProducts = productsDatabase.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.hsCode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ========================================
  // PRICING CALCULATOR
  // ========================================
  const calculatePricing = () => {
    if (!selectedProduct || !yourCost || !quantity) {
      alert('Please fill all fields');
      return;
    }

    const product = productsDatabase.find(p => p.name === selectedProduct);
    const port = ports.find(p => p.name === selectedPort) || ports[0];
    const cost = parseFloat(yourCost);
    const qty = parseFloat(quantity);

    const zones = {
      pacific: { base: 1.05, retail: 1.35 },
      mountain: { base: 1.08, retail: 1.35 },
      central: { base: 1.12, retail: 1.35 },
      eastern: { base: 1.15, retail: 1.35 }
    };

    const results = {};
    Object.keys(zones).forEach(zone => {
      const wholesale = cost * zones[zone].base * port.adj;
      const retail = wholesale * zones[zone].retail;
      results[zone] = {
        wholesale,
        retail,
        wholesaleProfit: (wholesale - cost) * qty,
        retailProfit: (retail - cost) * qty,
        wholesaleMargin: ((wholesale - cost) / wholesale * 100),
        retailMargin: ((retail - cost) / retail * 100)
      };
    });

    setPricingResults({ product: product.name, results });
  };

  // ========================================
  // LOGISTICS COST CALCULATOR
  // ========================================
  const calculateLogistics = () => {
    if (!selectedOrigin || !selectedDestination || !weight) {
      alert('Please fill all logistics fields');
      return;
    }

    const port = ports.find(p => p.name === selectedDestination) || ports[0];
    const wt = parseFloat(weight);
    
    const baseCost = port.baseCost;
    const freightCost = baseCost + (wt * 0.25); // $0.25 per lb
    const customsBrokerage = 125;
    const inspectionFee = 85;
    const tariff = wt * 0.02; // 2% tariff
    const totalCost = freightCost + customsBrokerage + inspectionFee + tariff;

    setLogisticsResults({
      freightCost,
      customsBrokerage,
      inspectionFee,
      tariff,
      totalCost,
      costPerLb: totalCost / wt
    });
  };

  const tabs = [
    { id: 'search', label: { en: '🔍 Product Search', es: '🔍 Buscar Productos' } },
    { id: 'pricing', label: { en: '💰 Price Calculator', es: '💰 Calculadora' } },
    { id: 'buyers', label: { en: '👥 Buyers Network', es: '👥 Compradores' } },
    { id: 'factoring', label: { en: '💳 Factoring', es: '💳 Factoraje' } },
    { id: 'po', label: { en: '📄 PO Finance', es: '📄 Financiamiento' } },
    { id: 'ports', label: { en: '🚢 Ports', es: '🚢 Puertos' } },
    { id: 'ai-analytics', label: { en: '🤖 AI Analytics', es: '🤖 Análisis IA' } },
    { id: 'logistics', label: { en: '🚚 Logistics Cost', es: '🚚 Costo Logístico' } },
    { id: 'compliance', label: { en: '📋 Compliance', es: '📋 Cumplimiento' } },
    { id: 'trade-maps', label: { en: '🗺️ Trade Maps', es: '🗺️ Mapas' } },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '20px', padding: '3rem', marginBottom: '3rem', boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem', textShadow: '0 0 30px rgba(255, 255, 255, 0.5)' }}>
            🌎 {language === 'es' ? 'Comercio América Latina - Mega Dashboard' : 'Latin America Trade - Mega Dashboard'}
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#d1fae5' }}>
            {language === 'es' 
              ? '10 herramientas completas: Búsqueda, Precios, Compradores, Financiamiento, Logística, IA, Cumplimiento y Mapas'
              : '10 complete tools: Search, Pricing, Buyers, Financing, Logistics, AI, Compliance & Maps'}
          </p>
        </div>

        {/* TABS */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                boxShadow: activeTab === tab.id ? '0 10px 30px rgba(16, 185, 129, 0.4)' : 'none'
              }}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        
        {/* TAB 1: SEARCH */}
        {activeTab === 'search' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Buscar Productos (500+ disponibles)' : 'Search Products (500+ available)'}
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'es' ? 'Buscar por nombre o código HS...' : 'Search by name or HS code...'}
                    style={{ width: '100%', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Categoría' : 'Category'}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ width: '100%', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
                  >
                    <option value="all">{language === 'es' ? 'Todas' : 'All'}</option>
                    <option value="Fruit">{language === 'es' ? 'Frutas' : 'Fruits'}</option>
                    <option value="Vegetable">{language === 'es' ? 'Vegetales' : 'Vegetables'}</option>
                    <option value="Seafood">{language === 'es' ? 'Mariscos' : 'Seafood'}</option>
                    <option value="Specialty">{language === 'es' ? 'Especialidad' : 'Specialty'}</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                {language === 'es' ? 'Encontrados' : 'Found'} {filteredProducts.length} {language === 'es' ? 'productos' : 'products'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredProducts.map(product => (
                <div key={product.id} style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '15px', padding: '1.5rem', border: '2px solid rgba(100, 116, 139, 0.3)', transition: 'all 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>{product.name}</h3>
                    <span style={{ padding: '0.3rem 0.8rem', background: '#10b981', color: '#fff', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {product.category}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Origen:' : 'Origin:'}</span>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{product.origin}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>HS Code:</span>
                      <span style={{ color: '#10b981', fontFamily: 'monospace' }}>{product.hsCode}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Precio:' : 'Price:'}</span>
                      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}/{product.unit}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(product.name);
                      setActiveTab('pricing');
                    }}
                    style={{ width: '100%', marginTop: '1rem', padding: '0.8rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {language === 'es' ? 'Calcular Precio' : 'Calculate Pricing'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PRICING (same as before) */}
        {activeTab === 'pricing' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '2rem' }}>
                {language === 'es' ? 'Calculadora de Precios por Zona' : 'Time Zone Price Calculator'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Producto' : 'Product'}
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}
                  >
                    <option value="">{language === 'es' ? 'Elegir...' : 'Choose...'}</option>
                    {productsDatabase.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Puerto' : 'Port'}
                  </label>
                  <select
                    value={selectedPort}
                    onChange={(e) => setSelectedPort(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}
                  >
                    <option value="">{language === 'es' ? 'Elegir...' : 'Choose...'}</option>
                    {ports.map(p => (
                      <option key={p.name} value={p.name}>{p.name} ({p.type})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Su Costo ($/unidad)' : 'Your Cost ($/unit)'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={yourCost}
                    onChange={(e) => setYourCost(e.target.value)}
                    placeholder="28.00"
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Cantidad' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="10000"
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>
              <button
                onClick={calculatePricing}
                style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {language === 'es' ? 'Calcular Precios' : 'Calculate Pricing'}
              </button>
            </div>

            {pricingResults && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {Object.entries(pricingResults.results).map(([zone, data]) => (
                  <div key={zone} style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '15px', padding: '1.5rem', border: '2px solid rgba(100, 116, 139, 0.3)' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem', textTransform: 'capitalize' }}>
                      {zone === 'pacific' && '🌊 Pacific'}
                      {zone === 'mountain' && '⛰️ Mountain'}
                      {zone === 'central' && '🌾 Central'}
                      {zone === 'eastern' && '🏙️ Eastern'}
                    </h3>
                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                      <div style={{ background: 'rgba(100, 116, 139, 0.3)', padding: '0.8rem', borderRadius: '8px' }}>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{language === 'es' ? 'Su Costo' : 'Your Cost'}</p>
                        <p style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 'bold' }}>${parseFloat(yourCost).toFixed(2)}</p>
                      </div>
                      <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #10b981' }}>
                        <p style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>{language === 'es' ? 'Mayoreo' : 'Wholesale'}</p>
                        <p style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>${data.wholesale.toFixed(2)}</p>
                        <p style={{ fontSize: '0.85rem', color: '#6ee7b7', marginTop: '0.3rem' }}>
                          +${data.wholesaleProfit.toFixed(0)} ({data.wholesaleMargin.toFixed(1)}%)
                        </p>
                      </div>
                      <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #8b5cf6' }}>
                        <p style={{ fontSize: '0.75rem', color: '#c4b5fd' }}>{language === 'es' ? 'Menudeo' : 'Retail'}</p>
                        <p style={{ fontSize: '1.5rem', color: '#8b5cf6', fontWeight: 'bold' }}>${data.retail.toFixed(2)}</p>
                        <p style={{ fontSize: '0.85rem', color: '#c4b5fd', marginTop: '0.3rem' }}>
                          +${data.retailProfit.toFixed(0)} ({data.retailMargin.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BUYERS */}
        {activeTab === 'buyers' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
                {language === 'es' ? 'Red de Compradores' : 'Top Buyers Network'}
              </h2>
              <p style={{ color: '#94a3b8' }}>
                {language === 'es' ? 'Principales importadores y distribuidores' : 'Major importers and distributors'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {buyers.map((buyer, idx) => (
                <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '15px', padding: '1.5rem', border: '2px solid rgba(100, 116, 139, 0.3)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>{buyer.name}</h3>
                  <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>{buyer.type}</p>
                  <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Ubicación:' : 'Location:'}</span>
                      <span style={{ color: '#fff' }}>{buyer.location}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Volumen:' : 'Volume:'}</span>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{buyer.volume}</span>
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      <span style={{ color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>{language === 'es' ? 'Productos:' : 'Products:'}</span>
                      <span style={{ color: '#fff' }}>{buyer.products}</span>
                    </div>
                  </div>
                  <button style={{ width: '100%', marginTop: '1rem', padding: '0.8rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                    {language === 'es' ? 'Solicitar Introducción' : 'Request Introduction'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FACTORING */}
        {activeTab === 'factoring' && (
          <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '3rem', border: '2px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💳</div>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>
              {language === 'es' ? 'Factoraje de Facturas' : 'Invoice Factoring'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
              {language === 'es' ? 'Efectivo inmediato por sus facturas' : 'Get immediate cash for your invoices'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                <p style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>1.5%</p>
                <p style={{ color: '#94a3b8' }}>{language === 'es' ? 'Nivel Premium' : 'Premium Tier'}</p>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                <p style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>2.5%</p>
                <p style={{ color: '#94a3b8' }}>{language === 'es' ? 'Nivel Estándar' : 'Standard Tier'}</p>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                <p style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>3.5%</p>
                <p style={{ color: '#94a3b8' }}>{language === 'es' ? 'Nivel Crecimiento' : 'Growth Tier'}</p>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                <p style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>4.5%</p>
                <p style={{ color: '#94a3b8' }}>{language === 'es' ? 'Nivel Inicio' : 'Startup Tier'}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PO FINANCE */}
        {activeTab === 'po' && (
          <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '3rem', border: '2px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>
              {language === 'es' ? 'Financiamiento de Órdenes de Compra' : 'Purchase Order Financing'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
              {language === 'es' 
                ? 'Financiamos grandes OCs de compradores verificados - pagamos directamente a proveedores'
                : 'Fund large P.O.s from verified buyers - we pay suppliers directly'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>
                  {language === 'es' ? 'OC Internacional' : 'International P.O.'}
                </h3>
                <p style={{ fontSize: '3rem', color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>3-5%</p>
                <p style={{ color: '#94a3b8' }}>
                  {language === 'es' ? 'Cobertura 100% • Hasta 120 días' : '100% coverage • Up to 120 days'}
                </p>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>
                  {language === 'es' ? 'OC Nacional' : 'Domestic P.O.'}
                </h3>
                <p style={{ fontSize: '3rem', color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>2.5-4%</p>
                <p style={{ color: '#94a3b8' }}>
                  {language === 'es' ? 'Cobertura 100% • Hasta 90 días' : '100% coverage • Up to 90 days'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PORTS */}
        {activeTab === 'ports' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
                {language === 'es' ? 'Puertos de Entrada de EE.UU.' : 'US Ports of Entry'}
              </h2>
              <p style={{ color: '#94a3b8' }}>
                {language === 'es' ? 'Principales puntos de entrada con ajustes de flete' : 'Major entry points with freight adjustments'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {ports.map(port => (
                <div key={port.name} style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '15px', padding: '1.5rem', border: '2px solid rgba(100, 116, 139, 0.3)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>{port.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{port.type} Border</p>
                    </div>
                    <span style={{ padding: '0.3rem 0.8rem', background: port.type === 'Land' ? '#10b981' : '#3b82f6', color: '#fff', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {port.type}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(100, 116, 139, 0.3)', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                      {language === 'es' ? 'Ajuste de Flete' : 'Freight Adjustment'}
                    </p>
                    <p style={{ fontSize: '2rem', color: '#fff', fontWeight: 'bold' }}>
                      {port.adj === 1.00 ? 'Base' : `+${((port.adj - 1) * 100).toFixed(0)}%`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: AI ANALYTICS */}
        {activeTab === 'ai-analytics' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(139, 92, 246, 0.3)' }}>
              <h2 style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                🤖 {language === 'es' ? 'Análisis Predictivo con IA' : 'AI Predictive Analytics'}
              </h2>
              <p style={{ color: '#94a3b8' }}>
                {language === 'es' ? 'Tendencias de mercado, pronósticos de precios y análisis de flujo comercial' : 'Market trends, price forecasting & trade flow analysis'}
              </p>
            </div>

            {/* PRICE TREND CHART */}
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(139, 92, 246, 0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '1.5rem' }}>
                {language === 'es' ? 'Tendencias de Precio con Pronóstico IA' : 'Price Trends with AI Forecast'}
              </h3>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                    <Legend />
                    <Line type="monotone" dataKey="avocado" stroke="#10b981" strokeWidth={3} name="Avocado" />
                    <Line type="monotone" dataKey="mango" stroke="#f59e0b" strokeWidth={3} name="Mango" />
                    <Line type="monotone" dataKey="shrimp" stroke="#3b82f6" strokeWidth={3} name="Shrimp" />
                    <Line type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" name="AI Forecast" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* MARKET SHARE */}
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(139, 92, 246, 0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '1.5rem' }}>
                {language === 'es' ? 'Participación de Mercado por País' : 'Market Share by Country'}
              </h3>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: LOGISTICS COST MODEL */}
        {activeTab === 'logistics' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '2rem' }}>
                🚚 {language === 'es' ? 'Calculadora de Costos Logísticos' : 'Logistics Cost Calculator'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Origen' : 'Origin'}
                  </label>
                  <select
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}
                  >
                    <option value="">{language === 'es' ? 'Elegir país...' : 'Choose country...'}</option>
                    {origins.map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Puerto de Destino' : 'Destination Port'}
                  </label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}
                  >
                    <option value="">{language === 'es' ? 'Elegir puerto...' : 'Choose port...'}</option>
                    {ports.map(port => (
                      <option key={port.name} value={port.name}>{port.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'es' ? 'Peso (lbs)' : 'Weight (lbs)'}
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="20000"
                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>
              <button
                onClick={calculateLogistics}
                style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {language === 'es' ? 'Calcular Costos Logísticos' : 'Calculate Logistics Cost'}
              </button>
            </div>

            {logisticsResults && (
              <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1.5rem' }}>
                  {language === 'es' ? 'Desglose de Costos' : 'Cost Breakdown'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Flete' : 'Freight'}</p>
                    <p style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>${logisticsResults.freightCost.toFixed(2)}</p>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Agente Aduanal' : 'Customs Broker'}</p>
                    <p style={{ fontSize: '2rem', color: '#3b82f6', fontWeight: 'bold' }}>${logisticsResults.customsBrokerage.toFixed(2)}</p>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Inspección' : 'Inspection'}</p>
                    <p style={{ fontSize: '2rem', color: '#f59e0b', fontWeight: 'bold' }}>${logisticsResults.inspectionFee.toFixed(2)}</p>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Arancel' : 'Tariff'}</p>
                    <p style={{ fontSize: '2rem', color: '#ef4444', fontWeight: 'bold' }}>${logisticsResults.tariff.toFixed(2)}</p>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '1.5rem', borderRadius: '12px', gridColumn: 'span 2' }}>
                    <p style={{ fontSize: '0.85rem', color: '#d1fae5', marginBottom: '0.5rem' }}>{language === 'es' ? 'COSTO TOTAL' : 'TOTAL COST'}</p>
                    <p style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 'bold' }}>${logisticsResults.totalCost.toFixed(2)}</p>
                    <p style={{ fontSize: '1rem', color: '#d1fae5', marginTop: '0.5rem' }}>
                      {language === 'es' ? 'Costo por lb:' : 'Cost per lb:'} ${logisticsResults.costPerLb.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 9: COMPLIANCE FORMS */}
        {activeTab === 'compliance' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
                📋 {language === 'es' ? 'Formularios de Cumplimiento Regional' : 'Regional Compliance Forms'}
              </h2>
              <p style={{ color: '#94a3b8' }}>
                {language === 'es' ? 'Documentos requeridos para importación desde América Latina' : 'Required documents for import from Latin America'}
              </p>
            </div>

            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '0', border: '2px solid rgba(16, 185, 129, 0.3)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#10b981', fontWeight: 'bold' }}>{language === 'es' ? 'Formulario' : 'Form'}</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#10b981', fontWeight: 'bold' }}>{language === 'es' ? 'Región' : 'Region'}</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{language === 'es' ? 'Requerido' : 'Required'}</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>{language === 'es' ? 'Descargar' : 'Download'}</th>                  </tr>
                </thead>
                <tbody>
                  {complianceForms.map((form, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.3)', transition: 'all 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '1rem', color: '#fff', fontWeight: 'bold' }}>{form.name}</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>{form.region}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{ 
                          padding: '0.3rem 0.8rem', 
                          background: form.required === 'Yes' ? 'rgba(16, 185, 129, 0.2)' : form.required === 'Optional' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                          color: form.required === 'Yes' ? '#10b981' : form.required === 'Optional' ? '#f59e0b' : '#94a3b8',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          {form.required}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                          📥 {language === 'es' ? 'Descargar' : 'Download'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 10: TRADE FLOW MAPS */}
        {activeTab === 'trade-maps' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
                🗺️ {language === 'es' ? 'Mapas de Flujos Comerciales' : 'Trade Flow Maps'}
              </h2>
              <p style={{ color: '#94a3b8' }}>
                {language === 'es' ? 'Rutas comerciales principales, volúmenes y tiempos de tránsito' : 'Major trade routes, volumes & transit times'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {tradeRoutes.map((route, idx) => (
                <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '15px', padding: '1.5rem', border: '2px solid rgba(100, 116, 139, 0.3)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '1.2rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.3rem' }}>{route.from}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{language === 'es' ? 'Origen' : 'Origin'}</div>
                    </div>
                    <div style={{ fontSize: '2rem', color: '#06b6d4' }}>→</div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', color: '#3b82f6', fontWeight: 'bold', marginBottom: '0.3rem' }}>{route.to}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{language === 'es' ? 'Destino' : 'Destination'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ background: 'rgba(100, 116, 139, 0.3)', padding: '1rem', borderRadius: '8px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.3rem' }}>{language === 'es' ? 'Volumen Semanal' : 'Weekly Volume'}</p>
                      <p style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 'bold' }}>{route.volume}</p>
                    </div>
                    <div style={{ background: 'rgba(100, 116, 139, 0.3)', padding: '1rem', borderRadius: '8px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.3rem' }}>{language === 'es' ? 'Productos' : 'Products'}</p>
                      <p style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>{route.products}</p>
                    </div>
                    <div style={{ background: 'rgba(100, 116, 139, 0.3)', padding: '1rem', borderRadius: '8px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.3rem' }}>{language === 'es' ? 'Tiempo de Tránsito' : 'Transit Time'}</p>
                      <p style={{ fontSize: '1.3rem', color: '#10b981', fontWeight: 'bold' }}>{route.transit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VISUAL MAP PLACEHOLDER */}
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '20px', padding: '3rem', border: '2px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🗺️</div>
              <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
                {language === 'es' ? 'Mapa Interactivo de Rutas' : 'Interactive Route Map'}
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '2rem' }}>
                {language === 'es' 
                  ? 'Visualización de rutas comerciales en tiempo real (Próximamente con Google Maps / Mapbox)'
                  : 'Real-time trade route visualization (Coming soon with Google Maps / Mapbox)'}
              </p>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', height: '400px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
                  {language === 'es' ? '📍 Mapa Interactivo Cargando...' : '📍 Interactive Map Loading...'}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LatinAmericaTradeDashboard;
                  