// ================================================================
// INVENTORY TAB - AG MARKETPLACE
// ================================================================
// Date: 2025-11-12 09:06:39 UTC
// User: SeabassFather
// Status: PRODUCTION READY
// ================================================================

import React, { useState } from 'react';
import { Warehouse, Package, AlertTriangle, TrendingUp, Download, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InventoryTab() {
  const [view, setView] = useState('overview');

  const inventory = [
    {
      id: 1,
      product: 'Avocado (Hass)',
      inStock: 2500,
      reserved: 500,
      available: 2000,
      unit: 'boxes',
      location: 'Warehouse A',
      value: '$53,750',
      status: 'healthy',
      reorderPoint: 500,
      expiryDate: 'Nov 15, 2025'
    },
    {
      id: 2,
      product: 'Bell Pepper (Red)',
      inStock: 800,
      reserved: 300,
      available: 500,
      unit: 'boxes',
      location: 'Warehouse B',
      value: '$13,200',
      status: 'healthy',
      reorderPoint: 200,
      expiryDate: 'Oct 28, 2025'
    },
    {
      id: 3,
      product: 'Tomato (Roma)',
      inStock: 150,
      reserved: 0,
      available: 150,
      unit: 'boxes',
      location: 'Warehouse A',
      value: '$1,770',
      status: 'low',
      reorderPoint: 300,
      expiryDate: 'Oct 25, 2025'
    },
    {
      id: 4,
      product: 'Cucumber',
      inStock: 1200,
      reserved: 200,
      available: 1000,
      unit: 'boxes',
      location: 'Warehouse C',
      value: '$10,200',
      status: 'healthy',
      reorderPoint: 400,
      expiryDate: 'Nov 5, 2025'
    },
    {
      id: 5,
      product: 'Berries (Mixed)',
      inStock: 50,
      reserved: 150,
      available: -100,
      unit: 'flats',
      location: 'Warehouse B',
      value: '$2,125',
      status: 'critical',
      reorderPoint: 100,
      expiryDate: 'Oct 20, 2025'
    },
    {
      id: 6,
      product: 'Lettuce (Romaine)',
      inStock: 1800,
      reserved: 400,
      available: 1400,
      unit: 'boxes',
      location: 'Warehouse A',
      value: '$24,300',
      status: 'healthy',
      reorderPoint: 600,
      expiryDate: 'Oct 30, 2025'
    }
  ];

  const chartData = inventory.map(item => ({
    product: item.product.split(' ')[0],
    inStock: item.inStock,
    reserved: item.reserved,
    available: item.available
  }));

  const getStatusConfig = (status) => {
    const configs = {
      healthy: { label: 'Healthy', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)', icon: '✓' },
      low: { label: 'Low Stock', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)', icon: '⚠' },
      critical: { label: 'Critical', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.2)', icon: '!' }
    };
    return configs[status] || configs.healthy;
  };

  const totalValue = inventory.reduce((sum, item) => {
    return sum + parseFloat(item.value.replace('$', '').replace(',', ''));
  }, 0);

  const lowStockItems = inventory.filter(item => item.status === 'low' || item.status === 'critical').length;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
          Inventory Management
        </h2>
        <p style={{ fontSize: '1rem', color: '#94a3b8' }}>Track and manage your produce inventory in real-time</p>
      </div>

      {/* View Toggle */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setView('overview')}
            style={{
              padding: '0.75rem 1.5rem',
              background: view === 'overview' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(51, 65, 85, 0.6)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setView('details')}
            style={{
              padding: '0.75rem 1.5rem',
              background: view === 'details' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(51, 65, 85, 0.6)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Detailed View
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <Warehouse style={{ color: '#22c55e' }} size={24} />
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Items</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{inventory.length}</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <Package style={{ color: '#3b82f6' }} size={24} />
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Units</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
            {inventory.reduce((sum, item) => sum + item.inStock, 0).toLocaleString()}
          </div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <TrendingUp style={{ color: '#8b5cf6' }} size={24} />
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Inventory Value</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>${totalValue.toLocaleString()}</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <AlertTriangle style={{ color: '#f59e0b' }} size={24} />
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Low Stock Alerts</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{lowStockItems}</div>
        </div>
      </div>

      {view === 'overview' && (
        <>
          {/* Inventory Chart */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '2px solid rgba(100, 116, 139, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
              Inventory Levels by Product
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
                <XAxis dataKey="product" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '2px solid #22c55e', borderRadius: '10px', color: '#fff' }}
                />
                <Bar dataKey="inStock" fill="#22c55e" name="In Stock" />
                <Bar dataKey="reserved" fill="#f59e0b" name="Reserved" />
                <Bar dataKey="available" fill="#3b82f6" name="Available" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <button style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <Upload style={{ color: '#22c55e', marginBottom: '1rem' }} size={32} />
              <h3 style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Receive Stock</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Log incoming inventory</p>
            </button>

            <button style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <Download style={{ color: '#3b82f6', marginBottom: '1rem' }} size={32} />
              <h3 style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Export Data</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Download inventory report</p>
            </button>

            <button style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <AlertTriangle style={{ color: '#f59e0b', marginBottom: '1rem' }} size={32} />
              <h3 style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Set Alerts</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Configure reorder points</p>
            </button>
          </div>
        </>
      )}

      {view === 'details' && (
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(100, 116, 139, 0.3)' }}>
                  <th style={{ textAlign: 'left', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>Product</th>
                  <th style={{ textAlign: 'right', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>In Stock</th>
                  <th style={{ textAlign: 'right', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>Reserved</th>
                  <th style={{ textAlign: 'right', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>Available</th>
                  <th style={{ textAlign: 'left', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>Location</th>
                  <th style={{ textAlign: 'right', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>Value</th>
                  <th style={{ textAlign: 'left', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>Expiry</th>
                  <th style={{ textAlign: 'center', padding: '1.5rem', fontWeight: 'bold', color: '#94a3b8' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => {
                  const statusConfig = getStatusConfig(item.status);
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.2)' }}>
                      <td style={{ padding: '1.5rem' }}>
                        <div style={{ fontWeight: 'bold', color: '#fff' }}>{item.product}</div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Reorder at: {item.reorderPoint} {item.unit}</div>
                      </td>
                      <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: 'bold', color: '#fff' }}>
                        {item.inStock.toLocaleString()} {item.unit}
                      </td>
                      <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: 'bold', color: '#f59e0b' }}>
                        {item.reserved.toLocaleString()} {item.unit}
                      </td>
                      <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: 'bold', color: '#3b82f6' }}>
                        {item.available.toLocaleString()} {item.unit}
                      </td>
                      <td style={{ padding: '1.5rem', color: '#94a3b8' }}>{item.location}</td>
                      <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: 'bold', color: '#22c55e' }}>{item.value}</td>
                      <td style={{ padding: '1.5rem', color: '#94a3b8' }}>{item.expiryDate}</td>
                      <td style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
                          background: statusConfig.bg,
                          color: statusConfig.color
                        }}>
                          <span>{statusConfig.icon}</span>
                          {statusConfig.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}