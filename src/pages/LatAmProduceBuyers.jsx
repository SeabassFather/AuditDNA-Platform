import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LatAmProduceBuyers() {
  const navigate = useNavigate();
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)', padding: '40px'}}>
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        <button onClick={() => navigate('/')} style={{background: '#059669', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px'}}>← Back to Home</button>
        <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#065f46', marginBottom: '20px'}}>LatAmProduceBuyers</h1>
        <div style={{background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
          <p style={{fontSize: '16px', color: '#6b7280', lineHeight: '1.8'}}>Module under development.</p>
        </div>
      </div>
    </div>
  );
}
