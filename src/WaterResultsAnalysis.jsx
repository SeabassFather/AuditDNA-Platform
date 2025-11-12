import React, { useState } from 'react';

export default function WaterResultsAnalysis() {
  const [language, setLanguage] = useState('en');

  const analysisResults = [
    { parameter: 'pH', value: 8.7, unit: 'pH units', status: 'warning', limit: '6.5-8.5', recommendation: 'pH slightly elevated. Monitor for scaling.' },
    { parameter: 'TDS', value: 620, unit: 'mg/L', status: 'fail', limit: '<500', recommendation: 'TDS exceeds EPA limits. Risk of soil salinization.' },
    { parameter: 'Nitrate-N', value: 8.2, unit: 'mg/L', status: 'pass', limit: '<10', recommendation: 'Within safe limits.' },
    { parameter: 'Lead', value: 18, unit: 'µg/L', status: 'fail', limit: '<15', recommendation: 'CRITICAL: Lead exceeds EPA action level. DO NOT USE.' },
    { parameter: 'Total Coliform', value: 0, unit: 'CFU/100mL', status: 'pass', limit: '0', recommendation: 'Microbiologically safe.' },
    { parameter: 'E. coli', value: 0, unit: 'CFU/100mL', status: 'pass', limit: '0', recommendation: 'No fecal contamination.' },
  ];

  const statusCounts = {
    pass: analysisResults.filter(r => r.status === 'pass').length,
    warning: analysisResults.filter(r => r.status === 'warning').length,
    fail: analysisResults.filter(r => r.status === 'fail').length
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#2d3748' }}> Water Test Results Analysis</h1>
            <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} style={{ padding: '0.75rem 1.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '15px', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>{statusCounts.pass}</div>
            <div style={{ color: '#718096' }}>Passed</div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#f59e0b' }}>{statusCounts.warning}</div>
            <div style={{ color: '#718096' }}>Warnings</div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ef4444' }}>{statusCounts.fail}</div>
            <div style={{ color: '#718096' }}>Failed</div>
          </div>
        </div>

        {statusCounts.fail > 0 && (
          <div style={{ background: '#fee2e2', border: '3px solid #ef4444', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#991b1b', fontSize: '1.5rem', marginBottom: '0.5rem' }}> CRITICAL ISSUES DETECTED</h3>
            <p style={{ color: '#7f1d1d' }}>Your water sample has failed critical parameters. Immediate action required.</p>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', marginBottom: '2rem' }}>
          <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h2 style={{ fontSize: '2rem', color: 'white' }}> AI Analysis Results</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f7fafc' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Parameter</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Value</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {analysisResults.map((result, idx) => {
                const bgColor = result.status === 'pass' ? '#f0fdf4' : result.status === 'warning' ? '#fefce8' : '#fef2f2';
                const statusColor = result.status === 'pass' ? '#10b981' : result.status === 'warning' ? '#f59e0b' : '#ef4444';
                return (
                  <tr key={idx} style={{ background: bgColor }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{result.parameter}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 'bold' }}>{result.value} {result.unit}</div>
                      <div style={{ fontSize: '0.8rem', color: '#718096' }}>Limit: {result.limit}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontWeight: 'bold', color: statusColor }}>{result.status.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '1rem', color: '#4a5568' }}>{result.recommendation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <button style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
             Download Report
          </button>
          <button style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
             Book Expert
          </button>
        </div>
      </div>
    </div>
  );
}

