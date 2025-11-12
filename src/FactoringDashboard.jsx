// ================================================================
// AI-POWERED FACTORING & TRADE FINANCE DASHBOARD
// ================================================================
// Date: 2025-11-11 08:44:12 UTC
// Author: SeabassFather
// AI Features: Risk scoring, payment prediction, auto-approval
// ================================================================

import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';

const FactoringDashboard = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [factoringRecords, setFactoringRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // AI-powered factoring data with risk scoring
  const mockFactoringData = [
    {
      id: 1,
      client: 'Mexausa Food Group',
      invoiceNumber: 'INV-2025-001',
      poId: 'PO-2025-123',
      amount: 45000,
      rate: 2.5,
      terms: '30 days',
      status: 'approved',
      createdAt: '2025-01-08',
      aiRiskScore: 12,
      paymentProbability: 98,
      creditHistory: 'excellent',
      averagePaymentDays: 28,
      disputes: 0,
      aiRecommendation: 'AUTO-APPROVE - Excellent credit history, consistent payment behavior',
      industryRisk: 'low',
      marketConditions: 'stable',
      commodities: ['Avocados', 'Berries'],
      financialHealth: {
        dso: 32,
        currentRatio: 2.4,
        debtToEquity: 0.3
      }
    },
    {
      id: 2,
      client: 'Fresh Produce Ltd',
      invoiceNumber: 'INV-2025-002',
      poId: 'PO-2025-124',
      amount: 32000,
      rate: 3.0,
      terms: '45 days',
      status: 'pending',
      createdAt: '2025-01-09',
      aiRiskScore: 35,
      paymentProbability: 85,
      creditHistory: 'good',
      averagePaymentDays: 42,
      disputes: 1,
      aiRecommendation: 'MANUAL REVIEW - Moderate risk, recent dispute detected',
      industryRisk: 'medium',
      marketConditions: 'volatile',
      commodities: ['Tomatoes', 'Peppers'],
      financialHealth: {
        dso: 48,
        currentRatio: 1.6,
        debtToEquity: 0.7
      }
    },
    {
      id: 3,
      client: 'California Berry Farms',
      invoiceNumber: 'INV-2025-003',
      poId: 'PO-2025-125',
      amount: 28000,
      rate: 2.8,
      terms: '30 days',
      status: 'approved',
      createdAt: '2025-01-07',
      aiRiskScore: 8,
      paymentProbability: 99,
      creditHistory: 'excellent',
      averagePaymentDays: 25,
      disputes: 0,
      aiRecommendation: 'AUTO-APPROVE - Premium client, zero disputes, early payment history',
      industryRisk: 'low',
      marketConditions: 'growing',
      commodities: ['Strawberries', 'Blueberries'],
      financialHealth: {
        dso: 28,
        currentRatio: 3.1,
        debtToEquity: 0.2
      }
    },
    {
      id: 4,
      client: 'Global Grains Inc',
      invoiceNumber: 'INV-2025-004',
      poId: 'PO-2025-126',
      amount: 65000,
      rate: 4.5,
      terms: '60 days',
      status: 'rejected',
      createdAt: '2025-01-10',
      aiRiskScore: 78,
      paymentProbability: 62,
      creditHistory: 'fair',
      averagePaymentDays: 68,
      disputes: 3,
      aiRecommendation: 'REJECT - High risk score, multiple disputes, late payment pattern',
      industryRisk: 'high',
      marketConditions: 'declining',
      commodities: ['Wheat', 'Corn'],
      financialHealth: {
        dso: 72,
        currentRatio: 0.9,
        debtToEquity: 1.8
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFactoringRecords(mockFactoringData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFactoringRecords(mockFactoringData);
      return;
    }

    const filtered = mockFactoringData.filter(record =>
      record.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.poId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFactoringRecords(filtered);
  };

  const analyzeWithAI = (record) => {
    setSelectedRecord(record);
    
    // AI Analysis simulation
    const analysis = {
      decision: record.aiRiskScore < 30 ? 'APPROVE' : record.aiRiskScore < 60 ? 'REVIEW' : 'REJECT',
      confidence: record.paymentProbability,
      factors: [
        { name: 'Credit History', score: record.creditHistory === 'excellent' ? 95 : record.creditHistory === 'good' ? 75 : 55, impact: 'high' },
        { name: 'Payment Behavior', score: 100 - (record.averagePaymentDays - 25), impact: 'high' },
        { name: 'Dispute History', score: 100 - (record.disputes * 20), impact: 'medium' },
        { name: 'Industry Risk', score: record.industryRisk === 'low' ? 90 : record.industryRisk === 'medium' ? 60 : 30, impact: 'medium' },
        { name: 'Financial Health', score: record.financialHealth.currentRatio > 2 ? 95 : 70, impact: 'high' }
      ],
      recommendations: [
        record.aiRiskScore < 30 ? '✅ Recommend approval with standard terms' : '',
        record.paymentProbability > 90 ? '✅ Consider offering discounts for early payment' : '',
        record.disputes > 0 ? '⚠️ Review dispute history before approval' : '',
        record.aiRiskScore > 60 ? '❌ Recommend rejection or require collateral' : ''
      ].filter(Boolean)
    };

    setAiAnalysis(analysis);
  };

  const getRiskColor = (score) => {
    if (score < 30) return { bg: '#d1fae5', color: '#065f46', label: language === 'es' ? 'Bajo Riesgo' : 'Low Risk' };
    if (score < 60) return { bg: '#fef3c7', color: '#92400e', label: language === 'es' ? 'Riesgo Medio' : 'Medium Risk' };
    return { bg: '#fee2e2', color: '#991b1b', label: language === 'es' ? 'Alto Riesgo' : 'High Risk' };
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: { bg: '#d1fae5', color: '#065f46', label: language === 'es' ? 'Aprobado' : 'Approved' },
      pending: { bg: '#fef3c7', color: '#92400e', label: language === 'es' ? 'Pendiente' : 'Pending' },
      rejected: { bg: '#fee2e2', color: '#991b1b', label: language === 'es' ? 'Rechazado' : 'Rejected' }
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <div style={{ fontSize: '1.5rem', color: '#06b6d4' }}>
            {language === 'es' ? 'Cargando datos con IA...' : 'Loading AI-powered data...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          💰 {language === 'es' ? 'Motor de Financiamiento IA' : 'AI-Powered Factoring Engine'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Puntuación de riesgo con IA, predicción de pagos, aprobación automática y análisis financiero.'
            : 'AI risk scoring, payment prediction, auto-approval, and financial health analysis.'}
        </p>

        {/* SEARCH BAR */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            🔍 {language === 'es' ? 'Buscar por Cliente, Factura o PO ID' : 'Search by Client, Invoice # or PO ID'}
          </h2>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder={language === 'es' ? 'Buscar...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{ 
                flex: 1, 
                padding: '1rem', 
                background: 'rgba(30, 41, 59, 0.6)', 
                border: '2px solid #334155', 
                borderRadius: '12px', 
                color: '#fff', 
                fontSize: '1rem' 
              }}
            />
            <button onClick={handleSearch} style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              {language === 'es' ? 'Buscar' : 'Search'}
            </button>
          </div>
        </div>

        {/* FACTORING RECORDS TABLE */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)', overflowX: 'auto' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            📊 {language === 'es' ? 'Registros de Factoraje con IA' : 'AI-Powered Factoring Records'}
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'es' ? 'Cliente' : 'Client'}</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>{language === 'es' ? 'Factura #' : 'Invoice #'}</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#06b6d4' }}>PO ID</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#06b6d4' }}>{language === 'es' ? 'Monto' : 'Amount'}</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#06b6d4' }}>{language === 'es' ? 'Tasa %' : 'Rate %'}</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#06b6d4' }}>{language === 'es' ? 'Riesgo IA' : 'AI Risk'}</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#06b6d4' }}>{language === 'es' ? 'Estado' : 'Status'}</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#06b6d4' }}>{language === 'es' ? 'Análisis IA' : 'AI Analysis'}</th>
              </tr>
            </thead>
            <tbody>
              {factoringRecords.map((record) => {
                const riskInfo = getRiskColor(record.aiRiskScore);
                const statusInfo = getStatusColor(record.status);
                
                return (
                  <tr key={record.id} style={{ borderBottom: '1px solid #334155', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '1rem', color: '#fff', fontWeight: 'bold' }}>{record.client}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{record.invoiceNumber}</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{record.poId}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#10b981', fontWeight: 'bold' }}>${record.amount.toLocaleString()}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#fff' }}>{record.rate}%</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ padding: '0.5rem 1rem', background: riskInfo.bg, color: riskInfo.color, borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {record.aiRiskScore} - {riskInfo.label}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ padding: '0.5rem 1rem', background: statusInfo.bg, color: statusInfo.color, borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button onClick={() => analyzeWithAI(record)} style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                        🤖 {language === 'es' ? 'Analizar' : 'Analyze'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* AI ANALYSIS MODAL */}
        {selectedRecord && aiAnalysis && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '2rem', borderRadius: '20px', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '2px solid #06b6d4' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', color: '#06b6d4', margin: 0 }}>
                  🤖 {language === 'es' ? 'Análisis de IA' : 'AI Analysis'}
                </h2>
                <button onClick={() => { setSelectedRecord(null); setAiAnalysis(null); }} style={{ padding: '0.5rem 1rem', background: '#ef4444', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                  ✕ {language === 'es' ? 'Cerrar' : 'Close'}
                </button>
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', borderLeft: '4px solid #06b6d4' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>{selectedRecord.client}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                  <div><span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Factura:' : 'Invoice:'}</span> <strong style={{ color: '#fff' }}>{selectedRecord.invoiceNumber}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Monto:' : 'Amount:'}</span> <strong style={{ color: '#10b981' }}>${selectedRecord.amount.toLocaleString()}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Términos:' : 'Terms:'}</span> <strong style={{ color: '#fff' }}>{selectedRecord.terms}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Historial:' : 'History:'}</span> <strong style={{ color: '#fff', textTransform: 'capitalize' }}>{selectedRecord.creditHistory}</strong></div>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#06b6d4', marginBottom: '1rem' }}>
                  {language === 'es' ? '📊 Decisión de IA' : '📊 AI Decision'}
                </h3>
                <div style={{ padding: '1.5rem', background: aiAnalysis.decision === 'APPROVE' ? 'rgba(16, 185, 129, 0.2)' : aiAnalysis.decision === 'REVIEW' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', borderRadius: '12px', borderLeft: `4px solid ${aiAnalysis.decision === 'APPROVE' ? '#10b981' : aiAnalysis.decision === 'REVIEW' ? '#f59e0b' : '#ef4444'}` }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: aiAnalysis.decision === 'APPROVE' ? '#10b981' : aiAnalysis.decision === 'REVIEW' ? '#f59e0b' : '#ef4444', marginBottom: '0.5rem' }}>
                    {aiAnalysis.decision}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#94a3b8' }}>
                    {language === 'es' ? 'Confianza:' : 'Confidence:'} <strong style={{ color: '#fff' }}>{aiAnalysis.confidence}%</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#06b6d4', marginBottom: '1rem' }}>
                  {language === 'es' ? '🎯 Factores Analizados' : '🎯 Analysis Factors'}
                </h3>
                {aiAnalysis.factors.map((factor, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{factor.name}</span>
                      <span style={{ color: factor.score >= 80 ? '#10b981' : factor.score >= 60 ? '#f59e0b' : '#ef4444', fontWeight: 'bold' }}>
                        {factor.score}/100
                      </span>
                    </div>
                    <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${factor.score}%`, height: '100%', background: factor.score >= 80 ? '#10b981' : factor.score >= 60 ? '#f59e0b' : '#ef4444', transition: 'width 0.5s' }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem', textTransform: 'uppercase' }}>
                      {language === 'es' ? 'Impacto:' : 'Impact:'} {factor.impact}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#06b6d4', marginBottom: '1rem' }}>
                  {language === 'es' ? '💡 Recomendaciones de IA' : '💡 AI Recommendations'}
                </h3>
                {aiAnalysis.recommendations.map((rec, idx) => (
                  <div key={idx} style={{ padding: '1rem', marginBottom: '0.8rem', background: rec.startsWith('✅') ? 'rgba(16, 185, 129, 0.1)' : rec.startsWith('⚠️') ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderLeft: `4px solid ${rec.startsWith('✅') ? '#10b981' : rec.startsWith('⚠️') ? '#f59e0b' : '#ef4444'}`, borderRadius: '8px' }}>
                    <div style={{ fontSize: '1rem', color: '#fff' }}>{rec}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FactoringDashboard;