import React, { useState } from 'react';

export default function TradeFinance() {
  const [form, setForm] = useState({ type: '', amount: '' });

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Trade Finance</h1>
      <p>Trade finance module coming soon...</p>
    </div>
  );
}

