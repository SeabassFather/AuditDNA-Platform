import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchModule() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [results, setResults] = useState([]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    },
    headerContent: {
      maxWidth: '1800px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '36px',
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
    searchBox: {
      background: 'white',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      marginBottom: '40px'
    },
    searchInput: {
      width: '100%',
      padding: '20px 25px',
      fontSize: '18px',
      border: '3px solid #6366f1',
      borderRadius: '12px',
      marginBottom: '20px',
      outline: 'none'
    }
  };

  const searchCategories = [
    { id: 'all', name: 'All', icon: '🔍', color: '#6366f1' },
    { id: 'shipments', name: 'Shipments', icon: '📦', color: '#10b981' },
    { id: 'compliance', name: 'Compliance', icon: '✅', color: '#3b82f6' },
    { id: 'financial', name: 'Financial', icon: '💰', color: '#f59e0b' },
    { id: 'reports', name: 'Reports', icon: '📄', color: '#ec4899' },
    { id: 'users', name: 'Users', icon: '👥', color: '#06b6d4' },
    { id: 'products', name: 'Products', icon: '🥑', color: '#84cc16' }
  ];

  const mockResults = [
    { type: 'shipment', id: 'SH-8847', title: 'Avocado Shipment to USA', status: 'In Transit', date: '2025-11-07', icon: '📦', color: '#10b981' },
    { type: 'compliance', id: 'CP-2341', title: 'USDA Organic Certification', status: 'Approved', date: '2025-11-05', icon: '✅', color: '#3b82f6' },
    { type: 'financial', id: 'FN-9923', title: 'Payment Transaction $45,890', status: 'Completed', date: '2025-11-08', icon: '💰', color: '#f59e0b' },
    { type: 'report', id: 'RP-1156', title: 'Monthly Compliance Summary', status: 'Generated', date: '2025-11-01', icon: '📄', color: '#ec4899' },
    { type: 'user', id: 'US-4478', title: 'John Martinez - Admin', status: 'Active', date: '2025-10-15', icon: '👥', color: '#06b6d4' },
    { type: 'product', id: 'PR-7734', title: 'Frozen Avocado Chunks 25kg', status: 'In Stock', date: '2025-11-08', icon: '🥑', color: '#84cc16' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>🔍 Universal Search</h1>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '8px'}}>
              Search across all modules • AI-powered • Real-time results
            </p>
          </div>
          <button 
            style={styles.backBtn}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ← Back
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Search Box */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search shipments, reports, compliance, users, products..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Category Filters */}
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            {searchCategories.map(cat => (
              <button
                key={cat.id}
                style={{
                  padding: '12px 20px',
                  borderRadius: '25px',
                  border: searchType === cat.id ? `3px solid ${cat.color}` : '3px solid transparent',
                  background: searchType === cat.id ? `${cat.color}20` : '#f3f4f6',
                  color: searchType === cat.id ? cat.color : '#6b7280',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => setSearchType(cat.id)}
                onMouseEnter={(e) => {
                  if (searchType !== cat.id) {
                    e.currentTarget.style.background = `${cat.color}10`;
                    e.currentTarget.style.borderColor = cat.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (searchType !== cat.id) {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <span style={{fontSize: '18px'}}>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Total Records', value: '847,234', icon: '📊', color: '#6366f1' },
            { label: 'Search Index Size', value: '12.4GB', icon: '💾', color: '#10b981' },
            { label: 'Avg Search Time', value: '0.08s', icon: '⚡', color: '#f59e0b' },
            { label: 'Popular Searches', value: '2,847', icon: '🔥', color: '#ef4444' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#1e293b',
              padding: '25px',
              borderRadius: '12px',
              border: `2px solid ${stat.color}40`
            }}>
              <div style={{fontSize: '32px', marginBottom: '10px'}}>{stat.icon}</div>
              <div style={{fontSize: '28px', fontWeight: 'bold', color: stat.color, marginBottom: '8px'}}>
                {stat.value}
              </div>
              <div style={{fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase'}}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search Results */}
        <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '25px'}}>
          📋 Search Results ({mockResults.length})
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
          gap: '20px'
        }}>
          {mockResults.map((result, i) => (
            <div key={i} style={{
              background: '#1e293b',
              padding: '25px',
              borderRadius: '12px',
              border: `2px solid ${result.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = result.color;
              e.currentTarget.style.boxShadow = `0 8px 25px ${result.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = result.color + '40';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '15px'}}>
                <div style={{fontSize: '36px'}}>{result.icon}</div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#e2e8f0', margin: 0}}>
                      {result.title}
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      background: `${result.color}20`,
                      color: result.color
                    }}>
                      {result.status}
                    </span>
                  </div>
                  <div style={{fontSize: '13px', color: '#64748b', marginBottom: '12px'}}>
                    ID: {result.id} • {result.date}
                  </div>
                  <div style={{fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase'}}>
                    {result.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
