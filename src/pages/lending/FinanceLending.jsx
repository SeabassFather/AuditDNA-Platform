import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinanceLending() {
  const navigate = useNavigate();

  const loans = [
    {name: 'Import Financing', icon: '📥', min: '50K', max: '5M', rate: '5.2% - 6.8%', color: '#3b82f6'},
    {name: 'Export Financing', icon: '📤', min: '75K', max: '10M', rate: '4.8% - 6.2%', color: '#10b981'},
    {name: 'Agriculture Loans', icon: '🌾', min: '100K', max: '15M', rate: '4.5% - 5.9%', color: '#84cc16'},
    {name: 'Letters of Credit', icon: '📜', min: '25K', max: '2M', rate: '5.8% - 7.2%', color: '#f59e0b'},
    {name: 'Working Capital', icon: '💵', min: '30K', max: '3M', rate: '5.0% - 6.5%', color: '#8b5cf6'},
    {name: 'Trade Finance', icon: '🌍', min: '40K', max: '8M', rate: '5.5% - 7.0%', color: '#ec4899'}
  ];

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%)'}}>
      <div style={{background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)', padding: '30px 40px'}}>
        <div style={{maxWidth: '1800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '40px', fontWeight: 'bold', color: 'white', margin: 0}}>🏦 Finance Lending Portal</h1>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '8px'}}>Import/Export Financing - Agriculture Loans - Trade Finance</p>
          </div>
          <button onClick={() => navigate('/')} style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'}}>Back Home</button>
        </div>
      </div>

      <div style={{maxWidth: '1800px', margin: '0 auto', padding: '40px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px'}}>
          <div style={{background: 'white', padding: '30px', borderRadius: '12px', border: '2px solid rgba(16, 185, 129, 0.2)'}}>
            <div style={{fontSize: '36px', marginBottom: '12px'}}>💰</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px'}}>12.4M USD</div>
            <div style={{fontSize: '13px', color: '#6b7280', textTransform: 'uppercase'}}>Total Loans Issued</div>
          </div>

          <div style={{background: 'white', padding: '30px', borderRadius: '12px', border: '2px solid rgba(59, 130, 246, 0.2)'}}>
            <div style={{fontSize: '36px', marginBottom: '12px'}}>📊</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px'}}>156</div>
            <div style={{fontSize: '13px', color: '#6b7280', textTransform: 'uppercase'}}>Active Loans</div>
          </div>

          <div style={{background: 'white', padding: '30px', borderRadius: '12px', border: '2px solid rgba(245, 158, 11, 0.2)'}}>
            <div style={{fontSize: '36px', marginBottom: '12px'}}>📈</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px'}}>5.4%</div>
            <div style={{fontSize: '13px', color: '#6b7280', textTransform: 'uppercase'}}>Avg Interest Rate</div>
          </div>

          <div style={{background: 'white', padding: '30px', borderRadius: '12px', border: '2px solid rgba(239, 68, 68, 0.2)'}}>
            <div style={{fontSize: '36px', marginBottom: '12px'}}>⚠️</div>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px'}}>0.8%</div>
            <div style={{fontSize: '13px', color: '#6b7280', textTransform: 'uppercase'}}>Default Rate</div>
          </div>
        </div>

        <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#5b21b6', marginBottom: '25px'}}>Available Loan Products</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px'}}>
          {loans.map((loan, i) => (
            <div key={i} style={{background: 'white', padding: '35px', borderRadius: '15px', border: '3px solid rgba(0,0,0,0.1)', cursor: 'pointer'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = loan.color;
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{fontSize: '48px', marginBottom: '15px'}}>{loan.icon}</div>
              <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#5b21b6', marginBottom: '12px'}}>{loan.name}</h3>
              <div style={{marginBottom: '20px'}}>
                <div style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>LOAN RANGE</div>
                <div style={{fontSize: '16px', fontWeight: 'bold', color: '#065f46'}}>${loan.min} - ${loan.max}</div>
              </div>
              <div style={{marginBottom: '20px'}}>
                <div style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>INTEREST RATE</div>
                <div style={{fontSize: '16px', fontWeight: 'bold', color: loan.color}}>{loan.rate}</div>
              </div>
              <button style={{width: '100%', padding: '14px', background: loan.color, color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'}}>Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
