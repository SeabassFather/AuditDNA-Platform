// ================================================================
// UNIFIED SOURCING INTELLIGENCE DASHBOARD
// ================================================================
// Date: 2025-11-13 00:02:33 UTC
// User: SeabassFather
// Purpose: Layered sourcing (Direct Growers → Suppliers) with dual PO system
// Business Rule: NEVER expose grower sources to customers!
// ================================================================

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, TrendingDown, TrendingUp, AlertCircle, CheckCircle, FileText, DollarSign, Package, Users, Shield, Download, Mail } from 'lucide-react';

const UnifiedSourcingDashboard = () => {
  const { language } = useLanguage();
  
  const [searchParams, setSearchParams] = useState({
    product: '',
    quantity: '',
    quality: 'organic',
    region: ''
  });

  const [searchResults, setSearchResults] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [showPOPreview, setShowPOPreview] = useState(false);

  // Mock grower database (will connect to real API later)
  const growerDatabase = [
    { 
      id: 'G001', 
      name: 'Green Valley Farms', 
      location: 'Michoacán, Mexico', 
      product: 'Avocados', 
      price: 18.00, 
      available: 500, 
      quality: 'organic', 
      riskScore: 95, 
      certifications: ['USDA Organic', 'GlobalGAP', 'PRIMUS'],
      contact: 'José López',
      phone: '+52-443-555-0101'
    },
    { 
      id: 'G002', 
      name: 'Sunrise Orchards', 
      location: 'Jalisco, Mexico', 
      product: 'Avocados', 
      price: 19.50, 
      available: 300, 
      quality: 'organic', 
      riskScore: 88, 
      certifications: ['USDA Organic', 'Fair Trade'],
      contact: 'Maria Gonzalez',
      phone: '+52-333-555-0202'
    },
    { 
      id: 'G003', 
      name: 'Pacific Berry Growers', 
      location: 'Sinaloa, Mexico', 
      product: 'Strawberries', 
      price: 24.00, 
      available: 200, 
      quality: 'organic', 
      riskScore: 92, 
      certifications: ['USDA Organic', 'GlobalGAP'],
      contact: 'Carlos Ramirez',
      phone: '+52-667-555-0303'
    },
    { 
      id: 'G004', 
      name: 'Sierra Fresh Produce', 
      location: 'Michoacán, Mexico', 
      product: 'Avocados', 
      price: 17.50, 
      available: 150, 
      quality: 'conventional', 
      riskScore: 78, 
      certifications: ['GlobalGAP'],
      contact: 'Ricardo Torres',
      phone: '+52-443-555-0404'
    },
    { 
      id: 'G005', 
      name: 'El Sol Agriculture', 
      location: 'Michoacán, Mexico', 
      product: 'Avocados', 
      price: 18.25, 
      available: 400, 
      quality: 'organic', 
      riskScore: 91, 
      certifications: ['USDA Organic', 'CCOF', 'GlobalGAP'],
      contact: 'Diego Martinez',
      phone: '+52-443-555-0505'
    }
  ];

  // Mock supplier database
  const supplierDatabase = [
    { 
      id: 'S001', 
      name: 'Fresh Import Co', 
      location: 'McAllen, TX', 
      product: 'Avocados', 
      price: 22.00, 
      available: 1000, 
      quality: 'organic', 
      reliability: 'High', 
      leadTime: '2 days',
      contact: 'John Smith',
      phone: '+1-956-555-1001'
    },
    { 
      id: 'S002', 
      name: 'AgroDistributors Inc', 
      location: 'San Diego, CA', 
      product: 'Avocados', 
      price: 23.50, 
      available: 500, 
      quality: 'organic', 
      reliability: 'Medium', 
      leadTime: '3 days',
      contact: 'Sarah Johnson',
      phone: '+1-619-555-2002'
    },
    { 
      id: 'S003', 
      name: 'Wholesale Produce Partners', 
      location: 'Nogales, AZ', 
      product: 'Avocados', 
      price: 21.50, 
      available: 750, 
      quality: 'mixed', 
      reliability: 'High', 
      leadTime: '1 day',
      contact: 'Mike Davis',
      phone: '+1-520-555-3003'
    }
  ];

  const handleSearch = () => {
    if (!searchParams.product || !searchParams.quantity) {
      alert(language === 'en' ? 'Please enter product and quantity' : 'Por favor ingrese producto y cantidad');
      return;
    }

    const quantityNeeded = parseInt(searchParams.quantity);
    
    // LAYER 1: Search Direct Growers
    const matchingGrowers = growerDatabase.filter(g => 
      g.product.toLowerCase().includes(searchParams.product.toLowerCase()) &&
      g.quality === searchParams.quality &&
      (!searchParams.region || g.location.toLowerCase().includes(searchParams.region.toLowerCase()))
    ).sort((a, b) => a.price - b.price); // Sort by price (cheapest first)

    // Calculate what we can get from growers
    let growerAllocation = [];
    let remainingQuantity = quantityNeeded;
    let growerTotalCost = 0;

    for (const grower of matchingGrowers) {
      if (remainingQuantity <= 0) break;
      
      const allocatedQty = Math.min(remainingQuantity, grower.available);
      growerAllocation.push({
        ...grower,
        allocatedQty,
        totalCost: allocatedQty * grower.price
      });
      
      growerTotalCost += allocatedQty * grower.price;
      remainingQuantity -= allocatedQty;
    }

    // LAYER 2: Search Suppliers (only if shortage)
    let supplierAllocation = [];
    let supplierTotalCost = 0;

    if (remainingQuantity > 0) {
      const matchingSuppliers = supplierDatabase.filter(s =>
        s.product.toLowerCase().includes(searchParams.product.toLowerCase()) &&
        (s.quality === searchParams.quality || s.quality === 'mixed')
      ).sort((a, b) => a.price - b.price);

      for (const supplier of matchingSuppliers) {
        if (remainingQuantity <= 0) break;
        
        const allocatedQty = Math.min(remainingQuantity, supplier.available);
        supplierAllocation.push({
          ...supplier,
          allocatedQty,
          totalCost: allocatedQty * supplier.price
        });
        
        supplierTotalCost += allocatedQty * supplier.price;
        remainingQuantity -= allocatedQty;
      }
    }

    // Calculate totals
    const growerQty = growerAllocation.reduce((sum, g) => sum + g.allocatedQty, 0);
    const supplierQty = supplierAllocation.reduce((sum, s) => sum + s.allocatedQty, 0);
    const totalQty = growerQty + supplierQty;
    const totalCost = growerTotalCost + supplierTotalCost;
    const avgCostPerBox = totalQty > 0 ? totalCost / totalQty : 0;

    setSearchResults({
      growers: matchingGrowers,
      suppliers: supplierDatabase,
      quantityNeeded,
      quantityFound: totalQty,
      shortage: Math.max(0, quantityNeeded - totalQty)
    });

    setAllocation({
      growerAllocation,
      supplierAllocation,
      growerQty,
      supplierQty,
      totalQty,
      growerTotalCost,
      supplierTotalCost,
      totalCost,
      avgCostPerBox,
      shortage: remainingQuantity
    });
  };

  const generateDualPOs = () => {
    if (!allocation) return;

    const poNumber1 = `CM-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
    const poNumber2 = `CM-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
    const soNumber = `SO-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;

    const poData = {
      po1: {
        number: poNumber1,
        type: 'DIRECT GROWERS',
        items: allocation.growerAllocation,
        totalQty: allocation.growerQty,
        totalCost: allocation.growerTotalCost,
        visibility: 'INTERNAL ONLY - DO NOT SHARE WITH CUSTOMER'
      },
      po2: allocation.supplierAllocation.length > 0 ? {
        number: poNumber2,
        type: 'SUPPLIERS/BROKERS',
        items: allocation.supplierAllocation,
        totalQty: allocation.supplierQty,
        totalCost: allocation.supplierTotalCost,
        visibility: 'INTERNAL ONLY - DO NOT SHARE WITH CUSTOMER'
      } : null,
      salesOrder: {
        number: soNumber,
        product: searchParams.product,
        quantity: allocation.totalQty,
        customerPrice: 25.00, // Example customer price
        totalRevenue: allocation.totalQty * 25.00,
        profit: (allocation.totalQty * 25.00) - allocation.totalCost,
        margin: ((allocation.totalQty * 25.00 - allocation.totalCost) / (allocation.totalQty * 25.00) * 100).toFixed(1),
        supplierShown: 'CM Products International',
        growerInfoHidden: true
      }
    };

    setShowPOPreview(poData);
  };

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(34, 197, 94, 0.6)' }}>
            🎯 Unified Sourcing Intelligence
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '1rem' }}>
            {language === 'en' 
              ? 'Layered sourcing: Direct Growers (best margins) → Suppliers (backup) • Dual PO system protects your sources' 
              : 'Abastecimiento por capas: Productores directos (mejores márgenes) → Proveedores (respaldo) • Sistema PO dual protege sus fuentes'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#64748b' }}>
            <span>✅ Layer 1: Direct Growers (lowest cost)</span>
            <span>✅ Layer 2: Suppliers (fill gaps)</span>
            <span>✅ Dual PO generation</span>
            <span>✅ Profit margin analysis</span>
            <span>✅ Source protection</span>
          </div>
        </div>

        {/* SEARCH FORM */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', backdropFilter: 'blur(12px)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={24} />
            {language === 'en' ? 'Smart Sourcing Search' : 'Búsqueda Inteligente de Abastecimiento'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Product */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                {language === 'en' ? 'Product *' : 'Producto *'}
              </label>
              <input
                type="text"
                placeholder={language === 'en' ? 'e.g., Avocados' : 'ej., Aguacates'}
                value={searchParams.product}
                onChange={(e) => setSearchParams(prev => ({ ...prev, product: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)'}
              />
            </div>

            {/* Quantity */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                {language === 'en' ? 'Quantity (boxes) *' : 'Cantidad (cajas) *'}
              </label>
              <input
                type="number"
                placeholder={language === 'en' ? 'e.g., 500' : 'ej., 500'}
                value={searchParams.quantity}
                onChange={(e) => setSearchParams(prev => ({ ...prev, quantity: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)'}
              />
            </div>

            {/* Quality */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                {language === 'en' ? 'Quality' : 'Calidad'}
              </label>
              <select
                value={searchParams.quality}
                onChange={(e) => setSearchParams(prev => ({ ...prev, quality: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none' }}
              >
                <option value="organic">{language === 'en' ? 'Organic' : 'Orgánico'}</option>
                <option value="conventional">{language === 'en' ? 'Conventional' : 'Convencional'}</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                {language === 'en' ? 'Region (Optional)' : 'Región (Opcional)'}
              </label>
              <input
                type="text"
                placeholder={language === 'en' ? 'e.g., Michoacán' : 'ej., Michoacán'}
                value={searchParams.region}
                onChange={(e) => setSearchParams(prev => ({ ...prev, region: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)'}
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)', transition: 'all 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Search size={20} style={{ marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
            {language === 'en' ? 'Search All Sources' : 'Buscar Todas las Fuentes'}
          </button>
        </div>

        {/* RESULTS */}
        {allocation && (
          <>
            {/* ALLOCATION SUMMARY */}
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '3px solid #22c55e', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', backdropFilter: 'blur(12px)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={24} />
                {language === 'en' ? 'Smart Allocation Summary' : 'Resumen de Asignación Inteligente'}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'en' ? 'From Direct Growers' : 'De Productores Directos'}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>{allocation.growerQty} boxes</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>${allocation.growerTotalCost.toFixed(2)} total</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Avg: ${allocation.growerQty > 0 ? (allocation.growerTotalCost / allocation.growerQty).toFixed(2) : '0.00'}/box
                  </div>
                </div>

                {allocation.supplierQty > 0 && (
                  <div style={{ background: 'rgba(251, 146, 60, 0.1)', border: '2px solid #fb923c', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                      {language === 'en' ? 'From Suppliers' : 'De Proveedores'}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fb923c' }}>{allocation.supplierQty} boxes</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>${allocation.supplierTotalCost.toFixed(2)} total</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Avg: ${allocation.supplierQty > 0 ? (allocation.supplierTotalCost / allocation.supplierQty).toFixed(2) : '0.00'}/box
                    </div>
                  </div>
                )}

                <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '12px', padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {language === 'en' ? 'Total Cost' : 'Costo Total'}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>${allocation.totalCost.toFixed(2)}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{allocation.totalQty} boxes total</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Avg: ${allocation.avgCostPerBox.toFixed(2)}/box
                  </div>
                </div>

                {allocation.shortage > 0 && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                      ⚠️ {language === 'en' ? 'Shortage' : 'Escasez'}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{allocation.shortage} boxes</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {language === 'en' ? 'Unable to fulfill' : 'No se puede cumplir'}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={generateDualPOs}
                  disabled={allocation.shortage > 0}
                  style={{ 
                    padding: '1rem 2rem', 
                    background: allocation.shortage > 0 ? 'rgba(100, 116, 139, 0.3)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                    border: 'none', 
                    borderRadius: '12px', 
                    color: '#fff', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    cursor: allocation.shortage > 0 ? 'not-allowed' : 'pointer',
                    boxShadow: allocation.shortage > 0 ? 'none' : '0 6px 20px rgba(59, 130, 246, 0.4)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (allocation.shortage === 0) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FileText size={20} style={{ marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
                  {language === 'en' ? 'Generate Dual POs' : 'Generar POs Duales'}
                </button>

                {allocation.shortage === 0 && (
                  <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={20} style={{ color: '#22c55e' }} />
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>
                      {language === 'en' ? 'Full allocation available!' : '¡Asignación completa disponible!'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* LAYER 1: DIRECT GROWERS */}
            {allocation.growerAllocation.length > 0 && (
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', backdropFilter: 'blur(12px)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={24} />
                  🥇 {language === 'en' ? 'PRIMARY LAYER: Direct Growers (Best Margins)' : 'CAPA PRIMARIA: Productores Directos (Mejores Márgenes)'}
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {allocation.growerAllocation.map(grower => (
                    <div key={grower.id} style={{ background: 'rgba(34, 197, 94, 0.05)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem' }}>{grower.name}</div>
                          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{grower.location}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                            Contact: {grower.contact} • {grower.phone}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>${grower.price.toFixed(2)}/box</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            Risk Score: <span style={{ color: grower.riskScore >= 90 ? '#22c55e' : grower.riskScore >= 75 ? '#fb923c' : '#ef4444', fontWeight: 'bold' }}>{grower.riskScore}/100</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Allocated</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{grower.allocatedQty} boxes</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Cost</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#22c55e' }}>${grower.totalCost.toFixed(2)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Available</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{grower.available} boxes</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 'bold', color: '#94a3b8' }}>Certifications:</span>
                        {grower.certifications.map((cert, idx) => (
                          <span key={idx} style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', color: '#22c55e' }}>
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LAYER 2: SUPPLIERS */}
            {allocation.supplierAllocation.length > 0 && (
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(251, 146, 60, 0.3)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', backdropFilter: 'blur(12px)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fb923c', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={24} />
                  🥈 {language === 'en' ? 'SECONDARY LAYER: Suppliers/Brokers (Backup)' : 'CAPA SECUNDARIA: Proveedores/Brokers (Respaldo)'}
                </h3>
                <div style={{ background: 'rgba(251, 146, 60, 0.1)', border: '2px solid rgba(251, 146, 60, 0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={20} style={{ color: '#fb923c' }} />
                  <div style={{ fontSize: '0.9rem', color: '#fb923c', fontWeight: 'bold' }}>
                    {language === 'en' 
                      ? '⚠️ SHORTAGE FILLED: Using suppliers to complete order' 
                      : '⚠️ ESCASEZ COMPLETADA: Usando proveedores para completar el pedido'}
                  </div>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {allocation.supplierAllocation.map(supplier => (
                    <div key={supplier.id} style={{ background: 'rgba(251, 146, 60, 0.05)', border: '2px solid rgba(251, 146, 60, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem' }}>{supplier.name}</div>
                          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{supplier.location}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                            Contact: {supplier.contact} • {supplier.phone}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fb923c' }}>${supplier.price.toFixed(2)}/box</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            Reliability: <span style={{ color: supplier.reliability === 'High' ? '#22c55e' : '#fb923c', fontWeight: 'bold' }}>{supplier.reliability}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Allocated</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{supplier.allocatedQty} boxes</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Cost</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fb923c' }}>${supplier.totalCost.toFixed(2)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Lead Time</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{supplier.leadTime}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* DUAL PO PREVIEW MODAL */}
        {showPOPreview && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem', overflow: 'auto' }}>
            <div style={{ background: '#1e293b', border: '3px solid #22c55e', borderRadius: '16px', padding: '2rem', maxWidth: '1200px', maxHeight: '90vh', overflow: 'auto', width: '100%' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={28} />
                📋 {language === 'en' ? 'Dual PO System Preview' : 'Vista Previa Sistema PO Dual'}
              </h2>

              {/* PO #1 - GROWERS */}
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>PO #{showPOPreview.po1.number}</div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{showPOPreview.po1.type}</div>
                  </div>
                  <div style={{ background: '#ef4444', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={16} />
                    🔒 {showPOPreview.po1.visibility}
                  </div>
                </div>
                {showPOPreview.po1.items.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '1rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</span>
                      <span style={{ color: '#22c55e', fontWeight: 'bold' }}>${item.totalCost.toFixed(2)}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {item.allocatedQty} boxes @ ${item.price.toFixed(2)}/box • {item.location}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Contact: {item.contact} • {item.phone}
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '2px solid rgba(34, 197, 94, 0.3)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: '#22c55e' }}>
                  <span>TOTAL:</span>
                  <span>${showPOPreview.po1.totalCost.toFixed(2)} ({showPOPreview.po1.totalQty} boxes)</span>
                </div>
              </div>

              {/* PO #2 - SUPPLIERS (if exists) */}
              {showPOPreview.po2 && (
                <div style={{ background: 'rgba(251, 146, 60, 0.1)', border: '2px solid #fb923c', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fb923c' }}>PO #{showPOPreview.po2.number}</div>
                      <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{showPOPreview.po2.type}</div>
                    </div>
                    <div style={{ background: '#ef4444', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Shield size={16} />
                      🔒 {showPOPreview.po2.visibility}
                    </div>
                  </div>
                  {showPOPreview.po2.items.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '1rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</span>
                        <span style={{ color: '#fb923c', fontWeight: 'bold' }}>${item.totalCost.toFixed(2)}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        {item.allocatedQty} boxes @ ${item.price.toFixed(2)}/box • {item.location}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                        Contact: {item.contact} • {item.phone} • Lead Time: {item.leadTime}
                      </div>
                    </div>
                  ))}
                  <div style={{ borderTop: '2px solid rgba(251, 146, 60, 0.3)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: '#fb923c' }}>
                    <span>TOTAL:</span>
                    <span>${showPOPreview.po2.totalCost.toFixed(2)} ({showPOPreview.po2.totalQty} boxes)</span>
                  </div>
                </div>
              )}

              {/* SALES ORDER - CUSTOMER VIEW */}
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '3px solid #3b82f6', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                    SALES ORDER #{showPOPreview.salesOrder.number}
                  </div>
                  <div style={{ background: '#22c55e', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} />
                    ✅ {language === 'en' ? 'CUSTOMER SEES THIS (Grower info HIDDEN)' : 'CLIENTE VE ESTO (Info productor OCULTA)'}
                  </div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{showPOPreview.salesOrder.product}</div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Supplier: {showPOPreview.salesOrder.supplierShown}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Quantity</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{showPOPreview.salesOrder.quantity} boxes</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Price</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>${showPOPreview.salesOrder.customerPrice.toFixed(2)}/box</div>
                    </div>
                  </div>
                  <div style={{ borderTop: '2px solid rgba(59, 130, 246, 0.3)', paddingTop: '1rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                      <span>TOTAL:</span>
                      <span>${showPOPreview.salesOrder.totalRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROFIT ANALYSIS */}
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={24} />
                  💰 {language === 'en' ? 'Your Profit Analysis' : 'Tu Análisis de Ganancias'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Revenue</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>${showPOPreview.salesOrder.totalRevenue.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cost</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fb923c' }}>
                      ${(showPOPreview.po1.totalCost + (showPOPreview.po2?.totalCost || 0)).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Profit</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>${showPOPreview.salesOrder.profit.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Margin</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{showPOPreview.salesOrder.margin}%</div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowPOPreview(false)}
                  style={{ padding: '0.75rem 1.5rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid rgba(100, 116, 139, 0.5)', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#64748b'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.5)'}
                >
                  {language === 'en' ? 'Close Preview' : 'Cerrar Vista Previa'}
                </button>
                <button
                  onClick={() => alert(language === 'en' ? 'PDF download will be implemented in Phase 2' : 'Descarga PDF se implementará en Fase 2')}
                  style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Download size={18} style={{ marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
                  {language === 'en' ? 'Download PDF' : 'Descargar PDF'}
                </button>
                <button
                  onClick={() => alert(language === 'en' ? 'Email will be implemented in Phase 2' : 'Email se implementará en Fase 2')}
                  style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 6px 20px rgba(6, 182, 212, 0.4)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Mail size={18} style={{ marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
                  {language === 'en' ? 'Email Report' : 'Enviar Reporte'}
                </button>
                <button
                  onClick={() => alert(language === 'en' ? 'PO generation will create actual purchase orders in Phase 2' : 'Generación de POs creará órdenes reales en Fase 2')}
                  style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <CheckCircle size={18} style={{ marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
                  {language === 'en' ? '✅ Confirm & Generate POs' : '✅ Confirmar y Generar POs'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UnifiedSourcingDashboard;