import React, { useState, useContext } from 'react';
import { Upload, TrendingUp, TrendingDown, MapPin, DollarSign, Target } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const EnhancedTraceability = () => {
  const { language } = useLanguage();
  const [stage, setStage] = useState('before');
  const [lotNumber, setLotNumber] = useState('LOT-2025-001');
  const [gps, setGps] = useState({ lat: 32.8328, long: -117.0064 });

  const beforeData = [
    { param: 'pH', value: 5.8, unit: '', status: 'low' },
    { param: 'Nitrogen', value: 15, unit: 'ppm', status: 'low' },
    { param: 'Potassium', value: 180, unit: 'ppm', status: 'low' },
    { param: 'Zinc', value: 0.6, unit: 'ppm', status: 'critical' }
  ];

  const afterData = [
    { param: 'pH', value: 6.4, unit: '', status: 'optimal', change: '+10%' },
    { param: 'Nitrogen', value: 38, unit: 'ppm', status: 'optimal', change: '+153%' },
    { param: 'Potassium', value: 285, unit: 'ppm', status: 'optimal', change: '+58%' },
    { param: 'Zinc', value: 2.8, unit: 'ppm', status: 'optimal', change: '+367%' }
  ];

  const t = {
    en: {
      title: 'Enhanced Traceability',
      subtitle: 'Before/After Comparison & Optimization',
      lotNum: 'Lot Number',
      location: 'GPS Location',
      before: 'Before Application',
      after: 'After Germination',
      comparison: 'Comparison',
      savings: 'Next Cycle Savings',
      yieldImpact: 'Yield Impact',
      generateReport: 'Generate Full Report ($149)'
    },
    es: {
      title: 'Trazabilidad Mejorada',
      subtitle: 'Comparación Antes/Después',
      lotNum: 'Número de Lote',
      location: 'Ubicación GPS',
      before: 'Antes de Aplicación',
      after: 'Después de Germinación',
      comparison: 'Comparación',
      savings: 'Ahorro Próximo Ciclo',
      yieldImpact: 'Impacto en Rendimiento',
      generateReport: 'Generar Reporte ($149)'
    }
  };

  const text = t[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
        </div>

        {/* Lot Info */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <div style={{ color: '#666', marginBottom: '8px' }}>{text.lotNum}:</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>{lotNumber}</div>
          </div>
          <div>
            <div style={{ color: '#666', marginBottom: '8px' }}>{text.location}:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#7c3aed' }}>
              📍 {gps.lat}°N, {gps.long}°W
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          {/* Before */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px'
          }}>
            <h3 style={{ fontSize: '1.5rem', color: '#ef4444', marginBottom: '20px' }}>
              🔴 {text.before}
            </h3>
            {beforeData.map((item, i) => (
              <div key={i} style={{
                padding: '15px',
                background: '#fef2f2',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.param}</div>
                <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>
                  {item.value} {item.unit}
                </div>
                <div style={{ color: '#991b1b', fontSize: '0.9rem', marginTop: '5px' }}>
                  {item.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          {/* After */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px'
          }}>
            <h3 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '20px' }}>
              🟢 {text.after}
            </h3>
            {afterData.map((item, i) => (
              <div key={i} style={{
                padding: '15px',
                background: '#d1fae5',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.param}</div>
                <div style={{ fontSize: '1.5rem', color: '#10b981' }}>
                  {item.value} {item.unit}
                  <span style={{ fontSize: '1rem', marginLeft: '10px', color: '#059669' }}>
                    {item.change}
                  </span>
                </div>
                <div style={{ color: '#065f46', fontSize: '0.9rem', marginTop: '5px' }}>
                  {item.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <DollarSign size={40} color="#7c3aed" style={{ marginBottom: '15px' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
              $3,978
            </div>
            <div style={{ color: '#666', marginTop: '10px' }}>{text.savings}</div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <TrendingUp size={40} color="#10b981" style={{ marginBottom: '15px' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
              +45%
            </div>
            <div style={{ color: '#666', marginTop: '10px' }}>{text.yieldImpact}</div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <button style={{
            padding: '20px 50px',
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {text.generateReport}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTraceability;
