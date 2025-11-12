import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function CartPage() {
  const { cartItems, removeFromCart, getTotal } = useCart();
  const { t } = useLanguage();

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f5f5f5' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        {t('Shopping Cart', 'Carrito de Compras')}
      </h1>
      {cartItems.length === 0 ? (
        <p>{t('Your cart is empty', 'Tu carrito está vacío')}</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{ background: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
              <h3>{item.name}</h3>
              <button onClick={() => removeFromCart(item.id)}>
                {t('Remove', 'Eliminar')}
              </button>
            </div>
          ))}
          <h2>{t('Total', 'Total')}: ${getTotal()}</h2>
        </>
      )}
    </div>
  );
}

