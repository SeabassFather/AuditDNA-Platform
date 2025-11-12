import React, { useState } from 'react';

export default function Produce() {
  const [activeTab, setActiveTab] = useState('pricing');
  const [selectedProduct, setSelectedProduct] = useState('AVOCADOS');
  const [selectedSize, setSelectedSize] = useState('48s (Medium)');
  const [yourCost, setYourCost] = useState(28);

  const avocadoSizes = [
    { size: '32s (XLarge)', yourCost: yourCost * 1.14, westCoast: yourCost * 1.14 * 1.05, midwest: yourCost * 1.14 * 1.12, eastCoast: yourCost * 1.14 * 1.18 },
    { size: '40s (Large)', yourCost: yourCost * 1.05, westCoast: yourCost * 1.05 * 1.05, midwest: yourCost * 1.05 * 1.12, eastCoast: yourCost * 1.05 * 1.18 },
    { size: '48s (Medium)', yourCost: yourCost * 0.93, westCoast: yourCost * 0.93 * 1.05, midwest: yourCost * 0.93 * 1.12, eastCoast: yourCost * 0.93 * 1.18 },
    { size: '60s (Small)', yourCost: yourCost * 0.78, westCoast: yourCost * 0.78 * 1.05, midwest: yourCost * 0.78 * 1.12, eastCoast: yourCost * 0.78 * 1.18 },
    { size: '70s (XSmall)', yourCost: yourCost * 0.65, westCoast: yourCost * 0.65 * 1.05, midwest: yourCost * 0.65 * 1.12, eastCoast: yourCost * 0.65 * 1.18 },
    { size: '84s (Mini)', yourCost: yourCost * 0.52, westCoast: yourCost * 0.52 * 1.05, midwest: yourCost * 0.52 * 1.12, eastCoast: yourCost * 0.52 * 1.18 },
    { size: '110s', yourCost: yourCost * 0.42, westCoast: yourCost * 0.42 * 1.05, midwest: yourCost * 0.42 * 1.12, eastCoast: yourCost * 0.42 * 1.18 },
    { size: '125s', yourCost: yourCost * 0.38, westCoast: yourCost * 0.38 * 1.05, midwest: yourCost * 0.38 * 1.12, eastCoast: yourCost * 0.38 * 1.18 },
    { size: '135s', yourCost: yourCost * 0.34, westCoast: yourCost * 0.34 * 1.05, midwest: yourCost * 0.34 * 1.12, eastCoast: yourCost * 0.34 * 1.18 },
    { size: '150s', yourCost: yourCost * 0.30, westCoast: yourCost * 0.30 * 1.05, midwest: yourCost * 0.30 * 1.12, eastCoast: yourCost * 0.30 * 1.18 }
  ];

  const buyers = [
    { name: 'Mission Produce', volume: '450M lbs/year', products: 'Avocados, Mangoes', tier: 'Mega' },
    { name: 'Del Monte Fresh', volume: '380M lbs/year', products: 'All Fresh Produce', tier: 'Mega' },
    { name: 'Calavo Growers', volume: '320M lbs/year', products: 'Avocados, Tomatoes', tier: 'Large' },
    { name: 'Dole Food Company', volume: '500M+ lbs/year', products: 'All Categories', tier: 'Mega' },
    { name: 'Fresh Del Monte', volume: '400M lbs/year', products: 'Tropical Fruits', tier: 'Mega' },
    { name: 'West Pak Avocado', volume: '280M lbs/year', products: 'Avocados', tier: 'Large' },
    { name: 'Index Fresh', volume: '250M lbs/year', products: 'Avocados, Citrus', tier: 'Large' },
    { name: 'Henry Avocado', volume: '180M lbs/year', products: 'Avocados', tier: 'Medium' }
  ];

  const growers = [
    { name: 'APEAM', location: 'Michoacán, Mexico', volume: '2.5M tons/year', certifications: 'GlobalGAP, USDA Organic' },
    { name: 'Camposol', location: 'La Libertad, Peru', volume: '85,000 tons/year', certifications: 'GlobalGAP, Fair Trade' },
    { name: 'Agricola Don Ricardo', location: 'Jalisco, Mexico', volume: '45,000 tons/year', certifications: 'USDA Organic' },
    { name: 'Grupo Viz', location: 'Michoacán, Mexico', volume: '120,000 tons/year', certifications: 'GlobalGAP, Rainforest Alliance' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1fa637 0%, #17872e 100%)', color: '#fff', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(31, 166, 55, 0.3)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          🌽 AuditDNA Produce Intelligence
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>
          Real-time commodity pricing • Regional analysis • Market forecasting • Supply chain data
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: '#fff', padding: '0.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {['pricing', 'buyers', 'growers'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '1rem',
              background: activeTab === tab ? '#1fa637' : 'transparent',
              color: activeTab === tab ? '#fff' : '#333',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* PRICING TAB */}
      {activeTab === 'pricing' && (
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Cost (per carton 25lb)</label>
            <input
              type='number'
              value={yourCost}
              onChange={(e) => setYourCost(parseFloat(e.target.value) || 28)}
              style={{ padding: '0.75rem', fontSize: '1rem', border: '2px solid #e0e0e0', borderRadius: '6px', width: '200px' }}
            />
          </div>

          <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Size</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>Your Cost</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>West Coast</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>Midwest</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>East Coast</th>
                </tr>
              </thead>
              <tbody>
                {avocadoSizes.map((row, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{row.size}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#1fa637', fontWeight: 'bold' }}>\</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>\</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>\</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>\</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BUYERS TAB */}
      {activeTab === 'buyers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {buyers.map((buyer, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1fa637', marginBottom: '0.5rem' }}>{buyer.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Volume: {buyer.volume}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Products: {buyer.products}</div>
              <span style={{ display: 'inline-block', background: '#1fa637', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>{buyer.tier}</span>
            </div>
          ))}
        </div>
      )}

      {/* GROWERS TAB */}
      {activeTab === 'growers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {growers.map((grower, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1fa637', marginBottom: '0.5rem' }}>{grower.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Location: {grower.location}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Volume: {grower.volume}</div>
              <div style={{ fontSize: '0.85rem', color: '#1fa637', fontWeight: '500' }}>{grower.certifications}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

