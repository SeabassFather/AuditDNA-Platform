import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgMarketplace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trends');

  const tabs = [
    { id: 'trends', label: 'Market Trends', icon: '📈' },
    { id: 'orders', label: 'Live Orders', icon: '🛒' },
    { id: 'listings', label: 'My Listings', icon: '📦' },
    { id: 'inventory', label: 'Inventory', icon: '🏢' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'buyers', label: 'Buyers Directory', icon: '👥' },
    { id: 'logistics', label: 'Logistics', icon: '🚚' },
    { id: 'certifications', label: 'Certifications', icon: '🛡️' },
    { id: 'contracts', label: 'Contracts', icon: '📄' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const priceData = [
    { date: 'Jan', avocado: 1.85, tomato: 1.20, berries: 3.50 },
    { date: 'Feb', avocado: 1.90, tomato: 1.15, berries: 3.45 },
    { date: 'Mar', avocado: 2.10, tomato: 1.30, berries: 3.80 },
    { date: 'Apr', avocado: 2.25, tomato: 1.25, berries: 3.70 },
    { date: 'May', avocado: 2.15, tomato: 1.40, berries: 4.00 },
    { date: 'Jun', avocado: 2.30, tomato: 1.35, berries: 3.90 }
  ];

  const topProducts = [
    { name: 'Hass Avocados', price: '$2.30/lb', trend: 'up', change: '+8%', volume: '45K lbs', color: '#10b981' },
    { name: 'Roma Tomatoes', price: '$1.35/lb', trend: 'up', change: '+3%', volume: '38K lbs', color: '#ef4444' },
    { name: 'Blueberries', price: '$3.90/lb', trend: 'down', change: '-2%', volume: '28K lbs', color: '#8b5cf6' },
    { name: 'Bell Peppers', price: '$1.85/lb', trend: 'stable', change: '0%', volume: '22K lbs', color: '#f59e0b' }
  ];

  const orders = [
    { id: 'ORD-1001', buyer: 'Walmart Distribution', product: 'Avocados', qty: '10,000 lbs', price: '$23,000', status: 'active', time: '2 hrs ago' },
    { id: 'ORD-1002', buyer: 'Costco Wholesale', product: 'Tomatoes', qty: '8,500 lbs', price: '$11,475', status: 'pending', time: '4 hrs ago' },
    { id: 'ORD-1003', buyer: 'Target Stores', product: 'Berries', qty: '5,000 lbs', price: '$19,500', status: 'active', time: '6 hrs ago' },
    { id: 'ORD-1004', buyer: 'Kroger Co', product: 'Peppers', qty: '6,200 lbs', price: '$11,470', status: 'completed', time: '1 day ago' },
    { id: 'ORD-1005', buyer: 'Whole Foods', product: 'Avocados', qty: '7,500 lbs', price: '$17,250', status: 'active', time: '8 hrs ago' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    headerContent: {
      maxWidth: '1800px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#ffffff',
      margin: 0
    },
    backBtn: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    content: {
      maxWidth: '1800px',
      margin: '0 auto',
      padding: '40px'
    },
    tabBar: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      marginBottom: '30px',
      display: 'flex',
      overflowX: 'auto',
      padding: '5px'
    },
    tab: {
      flex: 1,
      minWidth: '140px',
      padding: '15px 20px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#6b7280',
      borderRadius: '8px',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      whiteSpace: 'nowrap'
    },
    activeTab: {
      background: '#059669',
      color: 'white',
      boxShadow: '0 4px 10px rgba(5, 150, 105, 0.3)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>🌾 Agricultural Marketplace</h1>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '8px'}}>
              Real-time produce trading platform for North American markets
            </p>
          </div>
          <button onClick={() => navigate('/')} style={styles.backBtn}>← Back</button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Tab Navigation */}
        <div style={styles.tabBar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.color = '#059669';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <span style={{fontSize: '20px'}}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Market Trends Tab */}
        {activeTab === 'trends' && (
          <div style={{background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '30px'}}>📈 Market Trends & Pricing</h2>

            {/* Top Products Grid */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px'}}>
              {topProducts.map((product, idx) => (
                <div key={idx} style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                  border: `3px solid ${product.color}40`,
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = product.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = product.color + '40';
                }}
                >
                  <h3 style={{fontWeight: 'bold', color: '#065f46', marginBottom: '10px', fontSize: '16px'}}>{product.name}</h3>
                  <p style={{fontSize: '28px', fontWeight: 'bold', color: product.color, marginBottom: '10px'}}>{product.price}</p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: product.trend === 'up' ? '#10b981' : product.trend === 'down' ? '#ef4444' : '#6b7280'
                    }}>
                      {product.change}
                    </span>
                    <span style={{fontSize: '13px', color: '#6b7280'}}>{product.volume}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Trends Chart - CSS Version */}
            <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#065f46', marginBottom: '20px'}}>💹 Price Trends (6 Months)</h3>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: '30px', height: '300px', marginBottom: '20px'}}>
              {priceData.map((item, i) => (
                <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'flex-end', width: '100%', height: '100%'}}>
                    <div style={{
                      flex: 1,
                      height: `${(item.avocado / 2.30) * 100}%`,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '6px 6px 0 0',
                      position: 'relative'
                    }}>
                      <span style={{position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 'bold', color: '#10b981'}}>
                        ${item.avocado}
                      </span>
                    </div>
                    <div style={{
                      flex: 1,
                      height: `${(item.tomato / 1.40) * 100}%`,
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '6px 6px 0 0',
                      position: 'relative'
                    }}>
                      <span style={{position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 'bold', color: '#ef4444'}}>
                        ${item.tomato}
                      </span>
                    </div>
                    <div style={{
                      flex: 1,
                      height: `${(item.berries / 4.00) * 100}%`,
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      borderRadius: '6px 6px 0 0',
                      position: 'relative'
                    }}>
                      <span style={{position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 'bold', color: '#8b5cf6'}}>
                        ${item.berries}
                      </span>
                    </div>
                  </div>
                  <span style={{fontSize: '13px', fontWeight: 'bold', color: '#6b7280', marginTop: '10px'}}>{item.date}</span>
                </div>
              ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{width: '16px', height: '16px', background: '#10b981', borderRadius: '3px'}}></div>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#6b7280'}}>Avocados</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px'}}></div>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#6b7280'}}>Tomatoes</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{width: '16px', height: '16px', background: '#8b5cf6', borderRadius: '3px'}}></div>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#6b7280'}}>Berries</span>
              </div>
            </div>
          </div>
        )}

        {/* Live Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '30px'}}>🛒 Live Orders</h2>
            
            <div style={{overflowX: 'auto'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead style={{background: '#d1fae5'}}>
                  <tr>
                    {['Order ID', 'Buyer', 'Product', 'Quantity', 'Value', 'Status', 'Time', 'Actions'].map((header, i) => (
                      <th key={i} style={{padding: '15px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold', color: '#065f46', textTransform: 'uppercase'}}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={order.id} style={{borderBottom: '1px solid #e5e7eb', transition: 'all 0.3s'}}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{padding: '15px', fontSize: '14px', fontWeight: 'bold', color: '#065f46'}}>{order.id}</td>
                      <td style={{padding: '15px', fontSize: '14px', color: '#374151'}}>{order.buyer}</td>
                      <td style={{padding: '15px', fontSize: '14px', color: '#374151'}}>{order.product}</td>
                      <td style={{padding: '15px', fontSize: '14px', color: '#374151'}}>{order.qty}</td>
                      <td style={{padding: '15px', fontSize: '14px', fontWeight: 'bold', color: '#059669'}}>{order.price}</td>
                      <td style={{padding: '15px'}}>
                        <span style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          background: order.status === 'active' ? '#dcfce7' : order.status === 'pending' ? '#fef3c7' : '#f3f4f6',
                          color: order.status === 'active' ? '#059669' : order.status === 'pending' ? '#d97706' : '#6b7280'
                        }}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{padding: '15px', fontSize: '13px', color: '#6b7280'}}>{order.time}</td>
                      <td style={{padding: '15px'}}>
                        <button style={{background: '#059669', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer'}}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {!['trends', 'orders'].includes(activeTab) && (
          <div style={{background: 'white', borderRadius: '12px', padding: '60px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '20px'}}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <p style={{fontSize: '16px', color: '#6b7280', marginBottom: '30px'}}>This section is under development.</p>
            <div style={{background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', borderRadius: '12px', padding: '40px', maxWidth: '600px', margin: '0 auto'}}>
              <p style={{fontSize: '18px', color: '#065f46', fontWeight: '600'}}>
                🚧 We're building amazing features for this section. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

