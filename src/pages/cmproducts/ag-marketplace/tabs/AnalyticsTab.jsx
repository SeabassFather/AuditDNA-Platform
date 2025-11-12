// ================================================================
// ANALYTICS TAB - AG MARKETPLACE
// ================================================================
// Date: 2025-11-12 08:46:16 UTC
// User: SeabassFather
// Status: PRODUCTION READY
// ================================================================

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';

export default function AnalyticsTab() {
  const [timeframe, setTimeframe] = useState('30days');

  const salesData = [
    { month: 'Apr', revenue: 45200, orders: 28, avgOrder: 1614 },
    { month: 'May', revenue: 52800, orders: 34, avgOrder: 1553 },
    { month: 'Jun', revenue: 61500, orders: 42, avgOrder: 1464 },
    { month: 'Jul', revenue: 58900, orders: 38, avgOrder: 1550 },
    { month: 'Aug', revenue: 67200, orders: 45, avgOrder: 1493 },
    { month: 'Sep', revenue: 72500, orders: 48, avgOrder: 1510 },
    { month: 'Oct', revenue: 78300, orders: 52, avgOrder: 1506 }
  ];

  const productPerformance = [
    { name: 'Avocado', value: 35, revenue: 27405, color: '#22c55e' },
    { name: 'Tomato', value: 25, revenue: 19575, color: '#f59e0b' },
    { name: 'Pepper', value: 20, revenue: 15660, color: '#ef4444' },
    { name: 'Cucumber', value: 12, revenue: 9396, color: '#3b82f6' },
    { name: 'Berries', value: 8, revenue: 6264, color: '#8b5cf6' }
  ];

  const topBuyers = [
    { name: 'Mission Produce', orders: 18, revenue: '$38,700', growth: '+24%' },
    { name: 'COMEXA Trading', orders: 15, revenue: '$32,250', growth: '+18%' },
    { name: 'Fruit Dome Inc', orders: 12, revenue: '$25,800', growth: '+15%' },
    { name: 'Fresh Direct', orders: 10, revenue: '$21,500', growth: '+12%' },
    { name: 'Sysco Corp', orders: 8, revenue: '$17,200', growth: '+8%' }
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$436,400',
      change: '+18.2%',
      icon: DollarSign,
      color: '#22c55e'
    },
    {
      title: 'Total Orders',
      value: '287',
      change: '+22.5%',
      icon: ShoppingCart,
      color: '#3b82f6'
    },
    {
      title: 'Avg Order Value',
      value: '$1,521',
      change: '+5.1%',
      icon: TrendingUp,
      color: '#8b5cf6'
    },
    {
      title: 'Active Buyers',
      value: '63',
      change: '+12.0%',
      icon: BarChart3,
      color: '#f59e0b'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
          Sales Analytics
        </h2>
        <p style={{ fontSize: '1rem', color: '#94a3b8' }}>Track your performance and identify growth opportunities</p>
      </div>

      {/* Timeframe Selector */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['30days', '90days', '6months', '1year'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                padding: '0.75rem 1.5rem',
                background: timeframe === tf 
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : 'rgba(51, 65, 85, 0.6)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {tf === '30days' ? '30 Days' : tf === '90days' ? '90 Days' : tf === '6months' ? '6 Months' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{
                  background: `${metric.color}20`,
                  padding: '0.75rem',
                  borderRadius: '10px'
                }}>
                  <Icon style={{ color: metric.color }} size={24} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#22c55e' }}>{metric.change}</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{metric.value}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{metric.title}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
          Revenue Trend (Last 7 Months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ background: '#1e293b', border: '2px solid #22c55e', borderRadius: '10px', color: '#fff' }}
              formatter={(value) => `$${value.toLocaleString()}`} 
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} name="Revenue ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders & Product Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Orders Chart */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
            Order Volume
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ background: '#1e293b', border: '2px solid #3b82f6', borderRadius: '10px', color: '#fff' }}
              />
              <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance Pie */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
            Product Performance (% of Revenue)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                dataKey="value"
              >
                {productPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#1e293b', border: '2px solid #22c55e', borderRadius: '10px', color: '#fff' }}
                formatter={(value) => `${value}%`} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Product Revenue Table */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
          Product Revenue Breakdown
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(100, 116, 139, 0.3)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Product</th>
                <th style={{ textAlign: 'right', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>% of Total</th>
                <th style={{ textAlign: 'right', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Revenue</th>
                <th style={{ textAlign: 'right', padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {productPerformance.map((product, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.2)' }}>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: product.color }} />
                    <span style={{ fontWeight: 'bold', color: '#fff' }}>{product.name}</span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: '#fff' }}>{product.value}%</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: '#22c55e' }}>${product.revenue.toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ width: '100%', background: 'rgba(100, 116, 139, 0.3)', borderRadius: '10px', height: '8px' }}>
                      <div 
                        style={{ 
                          width: `${product.value}%`, 
                          height: '8px', 
                          borderRadius: '10px', 
                          backgroundColor: product.color 
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Buyers */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
          Top 5 Buyers (Last 30 Days)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {topBuyers.map((buyer, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem',
              background: 'rgba(51, 65, 85, 0.6)',
              borderRadius: '12px',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{buyer.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{buyer.orders} orders</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#fff' }}>{buyer.revenue}</div>
                <div style={{ fontSize: '0.85rem', color: '#22c55e', fontWeight: 'bold' }}>{buyer.growth}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}