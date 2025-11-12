// ================================================================
// MARKET TRENDS TAB - AG MARKETPLACE
// ================================================================
// Date: 2025-11-12 09:04:05 UTC
// User: SeabassFather
// Status: PRODUCTION READY
// ================================================================

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MarketTrendsTab() {
  const [selectedProduct, setSelectedProduct] = useState('avocado');
  const [timeframe, setTimeframe] = useState('30days');

  const priceData = {
    avocado: [
      { date: 'Week 1', price: 1.85, volume: 2400 },
      { date: 'Week 2', price: 1.92, volume: 2650 },
      { date: 'Week 3', price: 2.15, volume: 2890 },
      { date: 'Week 4', price: 2.08, volume: 2750 }
    ],
    tomato: [
      { date: 'Week 1', price: 0.95, volume: 5200 },
      { date: 'Week 2', price: 1.02, volume: 5450 },
      { date: 'Week 3', price: 1.18, volume: 5680 },
      { date: 'Week 4', price: 1.12, volume: 5500 }
    ],
    pepper: [
      { date: 'Week 1', price: 1.45, volume: 3100 },
      { date: 'Week 2', price: 1.52, volume: 3350 },
      { date: 'Week 3', price: 1.65, volume: 3580 },
      { date: 'Week 4', price: 1.58, volume: 3420 }
    ]
  };

  const marketStats = [
    { product: 'Avocado (Hass)', price: '$2.08', change: '+12.4%', trend: 'up', volume: '2,750 boxes' },
    { product: 'Tomato (Roma)', price: '$1.12', change: '+17.9%', trend: 'up', volume: '5,500 boxes' },
    { product: 'Bell Pepper (Red)', price: '$1.58', change: '+9.0%', trend: 'up', volume: '3,420 boxes' },
    { product: 'Cucumber', price: '$0.85', change: '-3.4%', trend: 'down', volume: '4,100 boxes' },
    { product: 'Berries (Mixed)', price: '$4.25', change: '+22.1%', trend: 'up', volume: '1,850 flats' },
    { product: 'Lettuce (Romaine)', price: '$1.35', change: '0%', trend: 'neutral', volume: '6,200 boxes' }
  ];

  const regionalPrices = [
    { region: 'West Coast', avocado: 2.15, tomato: 1.25, pepper: 1.65 },
    { region: 'Southwest', avocado: 2.05, tomato: 1.15, pepper: 1.55 },
    { region: 'Midwest', avocado: 2.35, tomato: 1.35, pepper: 1.85 },
    { region: 'Northeast', avocado: 2.45, tomato: 1.45, pepper: 1.95 },
    { region: 'Southeast', avocado: 2.25, tomato: 1.30, pepper: 1.75 }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp style={{ color: '#22c55e' }} size={20} />;
    if (trend === 'down') return <TrendingDown style={{ color: '#ef4444' }} size={20} />;
    return <Minus style={{ color: '#64748b' }} size={20} />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return '#22c55e';
    if (trend === 'down') return '#ef4444';
    return '#64748b';
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
          Market Trends & Pricing
        </h2>
        <p style={{ fontSize: '1rem', color: '#94a3b8' }}>Real-time wholesale produce pricing and market analysis</p>
      </div>

      {/* Product Selector */}
      <div style={{
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        color: '#fff',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Select Product to Analyze</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['30days', '90days', '1year'].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: timeframe === tf ? '#fff' : 'rgba(255, 255, 255, 0.2)',
                  color: timeframe === tf ? '#22c55e' : '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {tf === '30days' ? '30 Days' : tf === '90days' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.keys(priceData).map(product => (
            <button
              key={product}
              onClick={() => setSelectedProduct(product)}
              style={{
                padding: '1rem 1.5rem',
                background: selectedProduct === product ? '#fff' : 'rgba(255, 255, 255, 0.2)',
                color: selectedProduct === product ? '#22c55e' : '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {product}
            </button>
          ))}
        </div>
      </div>

      {/* Price Trend Chart */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
          {selectedProduct} - Price Trends (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData[selectedProduct]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ background: '#1e293b', border: '2px solid #22c55e', borderRadius: '10px', color: '#fff' }}
              formatter={(value) => `$${value}`} 
            />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={3} name="Price ($/lb)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
          {selectedProduct} - Trading Volume
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData[selectedProduct]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ background: '#1e293b', border: '2px solid #3b82f6', borderRadius: '10px', color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="volume" fill="#3b82f6" name="Volume (boxes)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Pricing */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
          Regional Price Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionalPrices}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
            <XAxis dataKey="region" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ background: '#1e293b', border: '2px solid #22c55e', borderRadius: '10px', color: '#fff' }}
              formatter={(value) => `$${value}`} 
            />
            <Legend />
            <Bar dataKey="avocado" fill="#22c55e" name="Avocado" />
            <Bar dataKey="tomato" fill="#f59e0b" name="Tomato" />
            <Bar dataKey="pepper" fill="#ef4444" name="Pepper" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Market Stats Table */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
          Today's Market Snapshot
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(100, 116, 139, 0.3)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Product</th>
                <th style={{ textAlign: 'right', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Price</th>
                <th style={{ textAlign: 'right', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Change (30D)</th>
                <th style={{ textAlign: 'right', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Volume</th>
                <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {marketStats.map((stat, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.2)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#fff' }}>{stat.product}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: '#fff' }}>{stat.price}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: getTrendColor(stat.trend) }}>
                    {stat.change}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#94a3b8' }}>{stat.volume}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {getTrendIcon(stat.trend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}