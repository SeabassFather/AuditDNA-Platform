import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function CheckoutPage() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f5f5f5' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        {t('Checkout', 'Finalizar Compra')}
      </h1>
      <p>{t('Checkout process coming soon...', 'Proceso de pago próximamente...')}</p>
    </div>
  );
}

