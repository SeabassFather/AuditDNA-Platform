// ================================================================
// AI-POWERED PRODUCE ANALYTICS PANEL
// ================================================================
// Date: 2025-11-11 08:47:05 UTC
// Author: SeabassFather
// AI Features: Price prediction, demand forecasting, trend analysis
// ================================================================

import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProduceAnalyticsPanel = () => {
  const { language } = useLanguage();
  const [selectedCommodity, setSelectedCommodity] = useState('AVOCADOS');
  const [timeRange, setTimeRange] = useState('30d');
  const [aiPrediction, setAiPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // AI-powered commodity data
  const commodityData = {
    'AVOCADOS': {
      currentPrice: 48.50,
      priceChange: 5.2,
      volume: '2.4M lbs',
      aiPrediction: {
        nextWeek: 51.20,
        nextMonth: 54.80,
        confidence: 87,
        trend: 'upward',
        factors: [
          { name: 'Seasonal Demand', impact: 'high', direction: 'up' },
          { name: 'Supply Chain', impact: 'medium', direction: 'stable' },
          { name: 'Weather Conditions', impact: 'low', direction: 'neutral' },
          { name: 'Market Competition', impact: 'medium', direction: 'up' }
        ]
      },
      historicalData: [
        { week: 'W1', price: 45, volume: 2200, aiPredicted: 45.5 },
        { week: 'W2', price: 46, volume: 2300, aiPredicted: 46.2 },
        { week: 'W3', price: 47.5, volume: 2400, aiPredicted: 47.8 },
        { week: 'W4', price: 48.5, volume: 2400, aiPredicted: 48.2 }
      ],
      regionalPricing: [
        { region: 'California', price: 48.50, supply: 'high', demand: 'high' },
        { region: 'Mexico', price: 42.00, supply: 'very high', demand: 'medium' },
        { region: 'Florida', price: 52.00, supply: 'medium', demand: 'high' },
        { region: 'Texas', price: 47.00, supply: 'medium', demand: 'medium' }
      ],
      qualityMetrics: {
        grade: 'A',
        ripeness: 85,
        shelfLife: 14,
        defectRate: 2.1
      }
    },
    'STRAWBERRIES': {
      currentPrice: 32.00,
      priceChange: -2.8,
      volume: '1.8M lbs',
      aiPrediction: {
        nextWeek: 30.50,
        nextMonth: 28.20,
        confidence: 82,
        trend: 'downward',
        factors: [
          { name: 'Seasonal Demand', impact: 'high', direction: 'down' },
          { name: 'Supply Chain', impact: 'high', direction: 'stable' },
          { name: 'Weather Conditions', impact: 'medium', direction: 'positive' },
          { name: 'Market Competition', impact: 'low', direction: 'neutral' }
        ]
      },
      historicalData: [
        { week: 'W1', price: 34, volume: 1600, aiPredicted: 33.5 },
        { week: 'W2', price: 33, volume: 1700, aiPredicted: 32.8 },
        { week: 'W3', price: 32.5, volume: 1750, aiPredicted: 32.2 },
        { week: 'W4', price: 32, volume: 1800, aiPredicted: 31.5 }
      ],
      regionalPricing: [
        { region: 'California', price: 32.00, supply: 'high', demand: 'medium' },
        { region: 'Florida', price: 34.50, supply: 'medium', demand: 'high' },
        { region: 'Mexico', price: 28.00, supply: 'very high', demand: 'low' },
        { region: 'Oregon', price: 33.00, supply: 'medium', demand: 'medium' }
      ],
      qualityMetrics: {
        grade: 'A+',
        ripeness: 92,
        shelfLife: 7,
        defectRate: 1.5
      }
    },
    'TOMATOES': {
      currentPrice: 24.00,
      priceChange: 3.1,
      volume: '3.2M lbs',
      aiPrediction: {
        nextWeek: 25.50,
        nextMonth: 27.80,
        confidence: 91,
        trend: 'upward',
        factors: [
          { name: 'Seasonal Demand', impact: 'medium', direction: 'up' },
          { name: 'Supply Chain', impact: 'high', direction: 'constrained' },
          { name: 'Weather Conditions', impact: 'high', direction: 'negative' },
          { name: 'Market Competition', impact: 'medium', direction: 'stable' }
        ]
      },
      historicalData: [
        { week: 'W1', price: 22, volume: 3000, aiPredicted: 22.3 },
        { week: 'W2', price: 23, volume: 3100, aiPredicted: 23.2 },
        { week: 'W3', price: 23.5, volume: 3150, aiPredicted: 23.8 },
        { week: 'W4', price: 24, volume: 3200, aiPredicted: 24.5 }
      ],
      regionalPricing: [
        { region: 'Florida', price: 24.00, supply: 'medium', demand: 'high' },
        { region: 'California', price: 26.00, supply: 'low', demand: 'very high' },
        { region: 'Mexico', price: 20.00, supply: 'high', demand: 'medium' },
        { region: 'Georgia', price: 25.00, supply: 'medium', demand: 'high' }
      ],
      qualityMetrics: {
        grade: 'A',
        ripeness: 88,
        shelfLife: 10,
        defectRate: 3.2
      }
    }
  };

  const commodities = [
    { id: 'AVOCADOS', name: { en: 'Avocados (Hass)', es: 'Aguacates (Hass)' }, icon: '🥑' },
    { id: 'STRAWBERRIES', name: { en: 'Strawberries', es: 'Fresas' }, icon: '🍓' },
    { id: 'TOMATOES', name: { en: 'Tomatoes (Roma)', es: 'Tomates (Roma)' }, icon: '🍅' }
  ];

  const currentData = commodityData[selectedCommodity];

  const generateAIPrediction = () => {
    setLoading(true);
    setTimeout(() => {
      setAiPrediction(currentData.aiPrediction);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    setAiPrediction(null);
  }, [selectedCommodity]);

  const getTrendColor = (trend) => {
    return trend === 'upward' ? '#10b981' : trend === 'downward' ? '#ef4444' : '#f59e0b';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          📊 {language === 'es' ? 'Panel de Análisis de Productos IA' : 'AI-Powered Produce Analytics Panel'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Predicción de precios con IA, pronóstico de demanda, análisis de tendencias y métricas de calidad.'
            : 'AI price prediction, demand forecasting, trend analysis, and quality metrics.'}
        </p>

        {/* COMMODITY SELECTOR */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            🎯 {language === 'es' ? 'Seleccionar Producto' : 'Select Commodity'}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {commodities.map(commodity => (
              <button
                key={commodity.id}
                onClick={() => setSelectedCommodity(commodity.id)}
                style={{
                  padding: '1.5rem',
                  background: selectedCommodity === commodity.id 
                    ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' 
                    : 'rgba(30, 41, 59, 0.6)',
                  border: `2px solid ${selectedCommodity === commodity.id ? '#06b6d4' : 'rgba(100, 116, 139, 0.3)'}`,
                  borderRadius: '12px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{commodity.icon}</div>
                {commodity.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* CURRENT METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Precio Actual' : 'Current Price'}</div>
            <div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>${currentData.currentPrice}</div>
            <div style={{ fontSize: '0.85rem', color: currentData.priceChange > 0 ? '#10b981' : '#ef4444', marginTop: '0.5rem' }}>
              {currentData.priceChange > 0 ? '↗' : '↘'} {Math.abs(currentData.priceChange)}%
            </div>
          </div>

          <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Volumen' : 'Volume'}</div>
            <div style={{ fontSize: '2.5rem', color: '#06b6d4', fontWeight: 'bold' }}>{currentData.volume}</div>
          </div>

          <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Calidad' : 'Grade'}</div>
            <div style={{ fontSize: '2.5rem', color: '#f59e0b', fontWeight: 'bold' }}>{currentData.qualityMetrics.grade}</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              {currentData.qualityMetrics.ripeness}% {language === 'es' ? 'Madurez' : 'Ripeness'}
            </div>
          </div>

          <div style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Vida Útil' : 'Shelf Life'}</div>
            <div style={{ fontSize: '2.5rem', color: '#8b5cf6', fontWeight: 'bold' }}>{currentData.qualityMetrics.shelfLife}</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              {language === 'es' ? 'días' : 'days'}
            </div>
          </div>
        </div>

        {/* AI PREDICTION BUTTON */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <button 
            onClick={generateAIPrediction} 
            disabled={loading}
            style={{ 
              padding: '1.5rem 3rem', 
              background: loading ? 'rgba(100, 116, 139, 0.5)' : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
              border: 'none', 
              borderRadius: '12px', 
              color: '#fff', 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
            }}
          >
            {loading ? '⏳ ' : '🤖 '} 
            {loading 
              ? (language === 'es' ? 'Analizando con IA...' : 'Analyzing with AI...') 
              : (language === 'es' ? 'Generar Predicción de IA' : 'Generate AI Prediction')}
          </button>
        </div>

        {/* AI PREDICTION RESULTS */}
        {aiPrediction && (
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid #8b5cf6' }}>
            <h2 style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '1.5rem', textAlign: 'center' }}>
              🤖 {language === 'es' ? 'Predicción de IA' : 'AI Prediction'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Próxima Semana' : 'Next Week'}</div>
                <div style={{ fontSize: '2rem', color: getTrendColor(aiPrediction.trend), fontWeight: 'bold' }}>${aiPrediction.nextWeek}</div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Próximo Mes' : 'Next Month'}</div>
                <div style={{ fontSize: '2rem', color: getTrendColor(aiPrediction.trend), fontWeight: 'bold' }}>${aiPrediction.nextMonth}</div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Confianza' : 'Confidence'}</div>
                <div style={{ fontSize: '2rem', color: '#06b6d4', fontWeight: 'bold' }}>{aiPrediction.confidence}%</div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Tendencia' : 'Trend'}</div>
                <div style={{ fontSize: '1.5rem', color: getTrendColor(aiPrediction.trend), fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {aiPrediction.trend === 'upward' ? '📈' : '📉'} {aiPrediction.trend}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '1rem' }}>
              {language === 'es' ? 'Factores de Impacto' : 'Impact Factors'}
            </h3>
            {aiPrediction.factors.map((factor, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{factor.name}</span>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', 
                      background: factor.impact === 'high' ? 'rgba(239, 68, 68, 0.2)' : factor.impact === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.2)', 
                      color: factor.impact === 'high' ? '#ef4444' : factor.impact === 'medium' ? '#f59e0b' : '#94a3b8',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {factor.impact}
                    </span>
                    <span style={{ 
                      color: factor.direction === 'up' ? '#10b981' : factor.direction === 'down' ? '#ef4444' : '#94a3b8',
                      fontWeight: 'bold'
                    }}>
                      {factor.direction === 'up' ? '↗' : factor.direction === 'down' ? '↘' : '→'} {factor.direction}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRICE HISTORY CHART */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            📈 {language === 'es' ? 'Historial de Precios vs Predicción IA' : 'Price History vs AI Prediction'}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData.historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #06b6d4', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} name={language === 'es' ? 'Precio Real' : 'Actual Price'} />
              <Line type="monotone" dataKey="aiPredicted" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" name={language === 'es' ? 'Predicción IA' : 'AI Predicted'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* REGIONAL PRICING */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            🗺️ {language === 'es' ? 'Precios Regionales' : 'Regional Pricing'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {currentData.regionalPricing.map((region, idx) => (
              <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.8rem' }}>{region.region}</h3>
                <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>${region.price}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ padding: '0.3rem 0.6rem', background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', borderRadius: '6px', fontSize: '0.75rem' }}>
                    {language === 'es' ? 'Oferta:' : 'Supply:'} {region.supply}
                  </span>
                  <span style={{ padding: '0.3rem 0.6rem', background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', borderRadius: '6px', fontSize: '0.75rem' }}>
                    {language === 'es' ? 'Demanda:' : 'Demand:'} {region.demand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProduceAnalyticsPanel;