import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f5f5f5' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        {t('Services', 'Servicios')}
      </h1>
      <p>{t('Service catalog coming soon...', 'Catálogo de servicios próximamente...')}</p>
    </div>
  );
}

