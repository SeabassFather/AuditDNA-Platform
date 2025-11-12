// ================================================================
// AI-POWERED CART SUMMARY & CHECKOUT
// ================================================================
// Date: 2025-11-11 08:55:10 UTC
// Author: SeabassFather
// AI Features: Smart discounts, bundle recommendations, price optimization
// ================================================================

import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { useLanguage } from './context/LanguageContext';

const CartSummary = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { language } = useLanguage();
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // AI-powered pricing optimization
  const calculateAIOptimization = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // AI discount logic
    let aiDiscount = 0;
    let discountReason = '';

    if (subtotal > 10000) {
      aiDiscount = subtotal * 0.15; // 15% bulk discount
      discountReason = language === 'es' ? 'Descuento por Volumen (15%)' : 'Volume Discount (15%)';
    } else if (subtotal > 5000) {
      aiDiscount = subtotal * 0.10; // 10% mid-tier discount
      discountReason = language === 'es' ? 'Descuento por Cantidad (10%)' : 'Quantity Discount (10%)';
    } else if (itemCount >= 3) {
      aiDiscount = subtotal * 0.05; // 5% multi-item discount
      discountReason = language === 'es' ? 'Descuento Multi-Producto (5%)' : 'Multi-Product Discount (5%)';
    }

    // AI bundle recommendations
    const bundles = [
      { 
        id: 1,
        name: language === 'es' ? 'Agua + Suelo' : 'Water + Soil Analysis', 
        discount: 50, 
        savings: 50,
        description: language === 'es' ? 'Análisis completo de recursos' : 'Complete resource analysis'
      },
      { 
        id: 2,
        name: language === 'es' ? 'Seguridad + Trazabilidad' : 'Food Safety + Traceability', 
        discount: 75, 
        savings: 75,
        description: language === 'es' ? 'Cumplimiento total' : 'Full compliance'
      },
      { 
        id: 3,
        name: language === 'es' ? 'Paquete Completo' : 'Full Platform Bundle', 
        discount: 200, 
        savings: 200,
        description: language === 'es' ? 'Todos los módulos' : 'All modules included'
      }
    ];

    setAiRecommendations({
      subtotal,
      aiDiscount,
      discountReason,
      total: subtotal - aiDiscount,
      savings: aiDiscount,
      bundles
    });
  };

  React.useEffect(() => {
    if (cart.length > 0) {
      calculateAIOptimization();
    }
  }, [cart]);

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
    }, 3000);
  };

  if (cart.length === 0 && !checkoutComplete) {
    return (
      <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '3rem', borderRadius: '20px', border: '2px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1rem' }}>
          {language === 'es' ? 'Tu Carrito Está Vacío' : 'Your Cart is Empty'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          {language === 'es' 
            ? 'Agrega módulos a tu carrito para comenzar.'
            : 'Add modules to your cart to get started.'}
        </p>
      </div>
    );
  }

  if (checkoutComplete) {
    return (
      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '3rem', borderRadius: '20px', border: '2px solid #10b981', textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '1rem' }}>
          {language === 'es' ? '¡Compra Exitosa!' : 'Purchase Successful!'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
          {language === 'es' 
            ? 'Tus módulos han sido activados. Revisa tu email para los detalles.'
            : 'Your modules have been activated. Check your email for details.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* CART ITEMS */}
      <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '2rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
        <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
          🛒 {language === 'es' ? 'Tu Carrito' : 'Your Cart'} ({cart.length} {language === 'es' ? 'artículos' : 'items'})
        </h2>

        {cart.map((item, idx) => (
          <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>{item.icon} {item.name}</h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{item.description}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  style={{ padding: '0.5rem 0.8rem', background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '6px', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  −
                </button>
                <span style={{ fontSize: '1.2rem', color: '#fff', minWidth: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ padding: '0.5rem 0.8rem', background: 'rgba(16, 185, 129, 0.2)', border: 'none', borderRadius: '6px', color: '#10b981', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold', minWidth: '100px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '8px', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ✕ {language === 'es' ? 'Eliminar' : 'Remove'}
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={clearCart}
          style={{ padding: '0.8rem 1.5rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}
        >
          🗑️ {language === 'es' ? 'Vaciar Carrito' : 'Clear Cart'}
        </button>
      </div>

      {/* AI RECOMMENDATIONS */}
      {aiRecommendations && aiRecommendations.bundles && (
        <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '2rem', borderRadius: '20px', marginBottom: '2rem', border: '2px solid #8b5cf6' }}>
          <h2 style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '1.5rem' }}>
            🤖 {language === 'es' ? 'Recomendaciones de IA' : 'AI Recommendations'}
          </h2>

          <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#06b6d4', marginBottom: '1rem' }}>
              💡 {language === 'es' ? 'Paquetes Sugeridos (Ahorra Más)' : 'Suggested Bundles (Save More)'}
            </h3>
            {aiRecommendations.bundles.map((bundle, idx) => (
              <div key={idx} style={{ padding: '1rem', marginBottom: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 'bold', marginBottom: '0.3rem' }}>{bundle.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{bundle.description}</div>
                  <div style={{ fontSize: '0.9rem', color: '#10b981', marginTop: '0.3rem', fontWeight: 'bold' }}>
                    {language === 'es' ? 'Ahorra' : 'Save'} ${bundle.savings}
                  </div>
                </div>
                <button style={{ padding: '0.6rem 1.2rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                  {language === 'es' ? '+ Agregar' : '+ Add Bundle'}
                </button>
              </div>
            ))}
          </div>

          {aiRecommendations.aiDiscount > 0 && (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontSize: '1.2rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                ✅ {language === 'es' ? '¡Descuento de IA Aplicado!' : 'AI Discount Applied!'}
              </div>
              <div style={{ fontSize: '1rem', color: '#fff' }}>
                {aiRecommendations.discountReason}: <strong>${aiRecommendations.aiDiscount.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CHECKOUT SUMMARY */}
      {aiRecommendations && (
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            💳 {language === 'es' ? 'Resumen de Pago' : 'Checkout Summary'}
          </h2>

          <div style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>{language === 'es' ? 'Subtotal:' : 'Subtotal:'}</span>
            <span style={{ color: '#fff', fontWeight: 'bold' }}>${aiRecommendations.subtotal.toFixed(2)}</span>
          </div>

          {aiRecommendations.aiDiscount > 0 && (
            <div style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#10b981' }}>{language === 'es' ? 'Descuento de IA:' : 'AI Discount:'}</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>-${aiRecommendations.aiDiscount.toFixed(2)}</span>
            </div>
          )}

          <div style={{ borderTop: '2px solid #334155', paddingTop: '1rem', marginTop: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>{language === 'es' ? 'Total:' : 'Total:'}</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>${aiRecommendations.total.toFixed(2)}</span>
            </div>

            {aiRecommendations.savings > 0 && (
              <div style={{ fontSize: '1rem', color: '#10b981', textAlign: 'right' }}>
                {language === 'es' ? 'Ahorras' : 'You save'} ${aiRecommendations.savings.toFixed(2)} {language === 'es' ? 'con IA' : 'with AI'}!
              </div>
            )}
          </div>

          <button 
            onClick={handleCheckout}
            style={{ 
              width: '100%',
              padding: '1.2rem 2rem', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              border: 'none', 
              borderRadius: '12px', 
              color: '#fff', 
              fontSize: '1.3rem', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
            }}
          >
            🚀 {language === 'es' ? 'Proceder al Pago' : 'Proceed to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSummary;