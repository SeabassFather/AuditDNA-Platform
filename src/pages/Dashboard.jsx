import React from 'react';

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1fa637', marginBottom: '1rem' }}>
        Dashboard
      </h1>
      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Welcome to the Dashboard module.
        </p>
        <p style={{ color: '#666' }}>
          Module content will be built here. All routing is working correctly.
        </p>
      </div>
    </div>
  );
}

