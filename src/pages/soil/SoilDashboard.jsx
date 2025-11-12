import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const SoilDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [selectedSample, setSelectedSample] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample soil analysis data
  const soilSamples = [
    {
      id: 'SOIL-2025-001',
      location: 'Field A-12, California',
      grower: 'Fresh Harvest Co.',
      sampleDate: '2025-01-08',
      status: 'optimal',
      overallScore: 92,
      parameters: {
        pH: { value: 6.8, unit: 'pH', status: 'optimal', range: '6.5-7.5', icon: '🧪' },
        nitrogen: { value: 45, unit: 'ppm', status: 'optimal', range: '40-60', icon: '🌿' },
        phosphorus: { value: 38, unit: 'ppm', status: 'optimal', range: '30-50', icon: '💎' },
        potassium: { value: 280, unit: 'ppm', status: 'optimal', range: '200-400', icon: '⚡' },
        organicMatter: { value: 4.2, unit: '%', status: 'optimal', range: '3-6', icon: '🍂' },
        moisture: { value: 22, unit: '%', status: 'optimal', range: '15-30', icon: '💧' },
        temperature: { value: 18, unit: '°C', status: 'optimal', range: '15-25', icon: '🌡️' },
        salinity: { value: 0.8, unit: 'dS/m', status: 'optimal', range: '<2', icon: '🧂' }
      },
      micronutrients: {
        iron: { value: 12, unit: 'ppm', status: 'optimal' },
        zinc: { value: 3.2, unit: 'ppm', status: 'optimal' },
        manganese: { value: 8.5, unit: 'ppm', status: 'optimal' },
        copper: { value: 2.1, unit: 'ppm', status: 'optimal' }
      },
      heavyMetals: {
        lead: { value: 0.02, unit: 'ppm', status: 'safe', limit: 10 },
        cadmium: { value: 0.01, unit: 'ppm', status: 'safe', limit: 0.5 },
        arsenic: { value: 0.03, unit: 'ppm', status: 'safe', limit: 5 },
        mercury: { value: 0.001, unit: 'ppm', status: 'safe', limit: 0.3 }
      },
      microbialActivity: {
        bacteria: { value: 2.4, unit: 'billion CFU/g', status: 'high' },
        fungi: { value: 0.8, unit: 'million CFU/g', status: 'optimal' },
        ratio: { value: 3.0, label: 'Bacteria:Fungi', status: 'optimal' }
      },
      recommendations: [
        'Maintain current pH levels - excellent for most crops',
        'Nitrogen levels are optimal for vegetable production',
        'Consider adding compost to maintain organic matter',
        'Monitor moisture levels during dry season'
      ]
    },
    {
      id: 'SOIL-2025-002',
      location: 'Greenhouse 5, Florida',
      grower: 'Coastal Farms LLC',
      sampleDate: '2025-01-09',
      status: 'warning',
      overallScore: 68,
      parameters: {
        pH: { value: 5.2, unit: 'pH', status: 'warning', range: '6.5-7.5', icon: '🧪' },
        nitrogen: { value: 28, unit: 'ppm', status: 'low', range: '40-60', icon: '🌿' },
        phosphorus: { value: 52, unit: 'ppm', status: 'high', range: '30-50', icon: '💎' },
        potassium: { value: 180, unit: 'ppm', status: 'low', range: '200-400', icon: '⚡' },
        organicMatter: { value: 2.1, unit: '%', status: 'low', range: '3-6', icon: '🍂' },
        moisture: { value: 35, unit: '%', status: 'high', range: '15-30', icon: '💧' },
        temperature: { value: 28, unit: '°C', status: 'high', range: '15-25', icon: '🌡️' },
        salinity: { value: 2.8, unit: 'dS/m', status: 'high', range: '<2', icon: '🧂' }
      },
      micronutrients: {
        iron: { value: 6, unit: 'ppm', status: 'low' },
        zinc: { value: 1.8, unit: 'ppm', status: 'low' },
        manganese: { value: 12.5, unit: 'ppm', status: 'high' },
        copper: { value: 1.2, unit: 'ppm', status: 'low' }
      },
      heavyMetals: {
        lead: { value: 0.05, unit: 'ppm', status: 'safe', limit: 10 },
        cadmium: { value: 0.02, unit: 'ppm', status: 'safe', limit: 0.5 },
        arsenic: { value: 0.08, unit: 'ppm', status: 'safe', limit: 5 },
        mercury: { value: 0.002, unit: 'ppm', status: 'safe', limit: 0.3 }
      },
      microbialActivity: {
        bacteria: { value: 1.2, unit: 'billion CFU/g', status: 'low' },
        fungi: { value: 0.3, unit: 'million CFU/g', status: 'low' },
        ratio: { value: 4.0, label: 'Bacteria:Fungi', status: 'high' }
      },
      recommendations: [
        '⚠️ CRITICAL: Apply lime to raise pH to 6.5-7.0',
        '⚠️ Add nitrogen fertilizer (urea or ammonium nitrate)',
        '⚠️ Reduce phosphorus inputs - levels are too high',
        'Improve drainage to reduce excess moisture',
        'Add potassium sulfate to boost potassium levels',
        'Incorporate organic matter (compost or manure)'
      ]
    },
    {
      id: 'SOIL-2025-003',
      location: 'Field C-8, Sinaloa, Mexico',
      grower: 'Valle Verde Organics',
      sampleDate: '2025-01-07',
      status: 'optimal',
      overallScore: 88,
      parameters: {
        pH: { value: 7.1, unit: 'pH', status: 'optimal', range: '6.5-7.5', icon: '🧪' },
        nitrogen: { value: 52, unit: 'ppm', status: 'optimal', range: '40-60', icon: '🌿' },
        phosphorus: { value: 42, unit: 'ppm', status: 'optimal', range: '30-50', icon: '💎' },
        potassium: { value: 320, unit: 'ppm', status: 'optimal', range: '200-400', icon: '⚡' },
        organicMatter: { value: 5.8, unit: '%', status: 'optimal', range: '3-6', icon: '🍂' },
        moisture: { value: 18, unit: '%', status: 'optimal', range: '15-30', icon: '💧' },
        temperature: { value: 22, unit: '°C', status: 'optimal', range: '15-25', icon: '🌡️' },
        salinity: { value: 1.2, unit: 'dS/m', status: 'optimal', range: '<2', icon: '🧂' }
      },
      micronutrients: {
        iron: { value: 14, unit: 'ppm', status: 'optimal' },
        zinc: { value: 3.8, unit: 'ppm', status: 'optimal' },
        manganese: { value: 9.2, unit: 'ppm', status: 'optimal' },
        copper: { value: 2.5, unit: 'ppm', status: 'optimal' }
      },
      heavyMetals: {
        lead: { value: 0.01, unit: 'ppm', status: 'safe', limit: 10 },
        cadmium: { value: 0.005, unit: 'ppm', status: 'safe', limit: 0.5 },
        arsenic: { value: 0.02, unit: 'ppm', status: 'safe', limit: 5 },
        mercury: { value: 0.0005, unit: 'ppm', status: 'safe', limit: 0.3 }
      },
      microbialActivity: {
        bacteria: { value: 3.2, unit: 'billion CFU/g', status: 'high' },
        fungi: { value: 1.1, unit: 'million CFU/g', status: 'high' },
        ratio: { value: 2.9, label: 'Bacteria:Fungi', status: 'optimal' }
      },
      recommendations: [
        'Excellent soil health - continue current practices',
        'Maintain organic matter with cover crops',
        'Monitor nitrogen levels during peak growth',
        'Perfect conditions for organic certification'
      ]
    }
  ];

  const metrics = [
    { 
      id: 'samples', 
      label: { en: 'Active Samples', es: 'Muestras Activas' }, 
      value: soilSamples.length.toString(), 
      icon: '🌱', 
      color: '#06b6d4' 
    },
    { 
      id: 'optimal', 
      label: { en: 'Optimal', es: 'Óptimo' }, 
      value: soilSamples.filter(s => s.status === 'optimal').length.toString(), 
      icon: '✅', 
      color: '#10b981' 
    },
    { 
      id: 'warnings', 
      label: { en: 'Warnings', es: 'Advertencias' }, 
      value: soilSamples.filter(s => s.status === 'warning').length.toString(), 
      icon: '⚠️', 
      color: '#f59e0b' 
    },
    { 
      id: 'avgScore', 
      label: { en: 'Avg Score', es: 'Puntaje Prom' }, 
      value: Math.round(soilSamples.reduce((sum, s) => sum + s.overallScore, 0) / soilSamples.length).toString(), 
      icon: '📊', 
      color: '#8b5cf6' 
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'optimal': { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981', label: language === 'es' ? 'Óptimo' : 'Optimal' },
      'warning': { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', label: language === 'es' ? 'Advertencia' : 'Warning' },
      'critical': { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', label: language === 'es' ? 'Crítico' : 'Critical' },
      'low': { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', label: language === 'es' ? 'Bajo' : 'Low' },
      'high': { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', label: language === 'es' ? 'Alto' : 'High' },
      'safe': { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981', label: language === 'es' ? 'Seguro' : 'Safe' }
    };
    return colors[status] || colors.optimal;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🌱 {language === 'es' ? 'Análisis de Suelo IA' : 'AI-Powered Soil Analysis'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'NPK, pH, materia orgánica, micronutrientes, metales pesados y actividad microbiana con IA.'
            : 'NPK, pH, organic matter, micronutrients, heavy metals, and microbial activity with AI.'}
        </p>

        {/* METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '1.8rem', color: metric.color, fontWeight: 'bold', marginBottom: '0.3rem' }}>{metric.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        {/* SAMPLE CARDS */}
        {!selectedSample && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {soilSamples.map(sample => {
              const statusInfo = getStatusColor(sample.status);
              return (
                <div key={sample.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(6, 182, 212, 0.2)', borderRadius: '15px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s' }}
                  onClick={() => setSelectedSample(sample)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#06b6d4';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '0.3rem' }}>{sample.id}</h3>
                      <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>📍 {sample.location}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>🌾 {sample.grower}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: sample.overallScore >= 80 ? '#10b981' : sample.overallScore >= 60 ? '#f59e0b' : '#ef4444' }}>
                        {sample.overallScore}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{language === 'es' ? 'Puntaje' : 'Score'}</div>
                    </div>
                  </div>

                  <div style={{ padding: '0.8rem', background: statusInfo.bg, borderRadius: '8px', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: statusInfo.color, textAlign: 'center' }}>
                      {statusInfo.label.toUpperCase()}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#94a3b8' }}>pH:</span> <strong style={{ color: getStatusColor(sample.parameters.pH.status).color }}>{sample.parameters.pH.value}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8' }}>N:</span> <strong style={{ color: getStatusColor(sample.parameters.nitrogen.status).color }}>{sample.parameters.nitrogen.value} ppm</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8' }}>P:</span> <strong style={{ color: getStatusColor(sample.parameters.phosphorus.status).color }}>{sample.parameters.phosphorus.value} ppm</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8' }}>K:</span> <strong style={{ color: getStatusColor(sample.parameters.potassium.status).color }}>{sample.parameters.potassium.value} ppm</strong>
                    </div>
                  </div>

                  <button style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {language === 'es' ? 'Ver Análisis Completo →' : 'View Full Analysis →'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* DETAILED VIEW */}
        {selectedSample && (
          <div>
            <button onClick={() => setSelectedSample(null)} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer', marginBottom: '2rem' }}>
              ← {language === 'es' ? 'Volver' : 'Back'}
            </button>

            <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '0.5rem' }}>{selectedSample.id}</h2>
                  <div style={{ fontSize: '1rem', color: '#94a3b8' }}>📍 {selectedSample.location}</div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>📅 {selectedSample.sampleDate}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', color: selectedSample.overallScore >= 80 ? '#10b981' : selectedSample.overallScore >= 60 ? '#f59e0b' : '#ef4444' }}>
                    {selectedSample.overallScore}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{language === 'es' ? 'Puntaje General' : 'Overall Score'}</div>
                </div>
              </div>

              {/* TABS */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid rgba(100, 116, 139, 0.3)', flexWrap: 'wrap' }}>
                {[
                  { id: 'overview', label: { en: 'Overview', es: 'Resumen' } },
                  { id: 'nutrients', label: { en: 'Micronutrients', es: 'Micronutrientes' } },
                  { id: 'microbial', label: { en: 'Microbial', es: 'Microbiana' } },
                  { id: 'heavyMetals', label: { en: 'Heavy Metals', es: 'Metales Pesados' } },
                  { id: 'recommendations', label: { en: 'AI Recommendations', es: 'Recomendaciones IA' } }
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '0.8rem 1.5rem', background: activeTab === tab.id ? '#06b6d4' : 'transparent', border: 'none', borderRadius: '8px 8px 0 0', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
                    {tab.label[language]}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {Object.entries(selectedSample.parameters).map(([key, param]) => {
                    const statusInfo = getStatusColor(param.status);
                    return (
                      <div key={key} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: '12px', border: `2px solid ${statusInfo.color}` }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{param.icon}</div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{key}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: statusInfo.color, marginBottom: '0.3rem' }}>
                          {param.value} {param.unit}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{language === 'es' ? 'Rango:' : 'Range:'} {param.range}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'nutrients' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1rem' }}>{language === 'es' ? 'Micronutrientes' : 'Micronutrients'}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {Object.entries(selectedSample.micronutrients).map(([key, nutrient]) => {
                      const statusInfo = getStatusColor(nutrient.status);
                      return (
                        <div key={key} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: '12px', border: `2px solid ${statusInfo.color}` }}>
                          <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'capitalize', marginBottom: '0.5rem' }}>{key}</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: statusInfo.color }}>
                            {nutrient.value} {nutrient.unit}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: statusInfo.color, marginTop: '0.3rem' }}>{statusInfo.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'microbial' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1rem' }}>{language === 'es' ? 'Actividad Microbiana' : 'Microbial Activity'}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                    {Object.entries(selectedSample.microbialActivity).map(([key, data]) => {
                      const statusInfo = getStatusColor(data.status);
                      return (
                        <div key={key} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', border: `2px solid ${statusInfo.color}` }}>
                          <div style={{ fontSize: '1rem', color: '#94a3b8', textTransform: 'capitalize', marginBottom: '0.5rem' }}>{key}</div>
                          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: statusInfo.color }}>
                            {data.value} {data.unit || ''}
                          </div>
                          {data.label && <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.3rem' }}>{data.label}</div>}
                          <div style={{ fontSize: '0.75rem', color: statusInfo.color, fontWeight: 'bold', marginTop: '0.5rem' }}>{statusInfo.label.toUpperCase()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'heavyMetals' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1rem' }}>{language === 'es' ? 'Análisis de Metales Pesados' : 'Heavy Metals Analysis'}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {Object.entries(selectedSample.heavyMetals).map(([key, metal]) => {
                      const statusInfo = getStatusColor(metal.status);
                      return (
                        <div key={key} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: '12px', border: `2px solid ${statusInfo.color}` }}>
                          <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'capitalize', marginBottom: '0.5rem' }}>{key}</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: statusInfo.color }}>
                            {metal.value} {metal.unit}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>{language === 'es' ? 'Límite:' : 'Limit:'} {metal.limit} {metal.unit}</div>
                          <div style={{ fontSize: '0.75rem', color: statusInfo.color, fontWeight: 'bold', marginTop: '0.3rem' }}>✅ {statusInfo.label.toUpperCase()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1rem' }}>{language === 'es' ? 'Recomendaciones IA' : 'AI Recommendations'}</h3>
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                    {selectedSample.recommendations.map((rec, idx) => (
                      <div key={idx} style={{ padding: '1rem', marginBottom: '0.8rem', background: rec.startsWith('⚠️') ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', borderLeft: `4px solid ${rec.startsWith('⚠️') ? '#f59e0b' : '#10b981'}`, borderRadius: '6px' }}>
                        <div style={{ fontSize: '1rem', color: '#fff' }}>{rec}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedSample && (
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
            ← {language === 'es' ? 'Inicio' : 'Home'}
          </button>
        )}

      </div>
    </div>
  );
};

export default SoilDashboard;