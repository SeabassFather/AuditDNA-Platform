import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FoodSafetyDashboard = () => {
  const { language } = useLanguage();
  
  const metrics = [
    { id: 'score', label: { en: 'Safety Score', es: 'Puntuación' }, value: '92/100', color: '#10b981', icon: '🎯' },
    { id: 'certs', label: { en: 'Certifications', es: 'Certificaciones' }, value: '8', color: '#06b6d4', icon: '📜' },
    { id: 'audits', label: { en: 'Audits', es: 'Auditorías' }, value: '3', color: '#f59e0b', icon: '📅' },
    { id: 'alerts', label: { en: 'Alerts', es: 'Alertas' }, value: '2', color: '#ef4444', icon: '⚠️' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: '#06b6d4', marginBottom: '2rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🛡️ {language === 'en' ? 'Food Safety Command Center' : 'Centro de Seguridad Alimentaria'}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${metric.color}`, borderRadius: '15px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodSafetyDashboard;