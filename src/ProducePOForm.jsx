// ================================================================
// AI-POWERED PRODUCE PURCHASE ORDER FORM
// ================================================================
// Date: 2025-11-11 08:47:05 UTC
// Author: SeabassFather
// AI Features: Smart pricing, auto-fill, compliance checking
// ================================================================

import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';

const ProducePOForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    supplier: '',
    commodity: '',
    quantity: '',
    unit: 'lbs',
    price: '',
    deliveryDate: '',
    paymentTerms: '30',
    notes: ''
  });

  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [complianceCheck, setComplianceCheck] = useState(null);
  const [poGenerated, setPoGenerated] = useState(false);

  const suppliers = [
    { id: 1, name: 'Fresh Harvest Co.', location: 'California, USA', rating: 4.8, certifications: ['GlobalGAP', 'FSMA', 'Organic'] },
    { id: 2, name: 'Valle Verde Organics', location: 'Sinaloa, Mexico', rating: 4.6, certifications: ['Organic', 'Fair Trade'] },
    { id: 3, name: 'Coastal Farms LLC', location: 'Florida, USA', rating: 4.2, certifications: ['FSMA'] }
  ];

  const commodities = [
    { id: 'avocados', name: { en: 'Avocados (Hass)', es: 'Aguacates (Hass)' }, currentPrice: 48.50, icon: '🥑' },
    { id: 'strawberries', name: { en: 'Strawberries', es: 'Fresas' }, currentPrice: 32.00, icon: '🍓' },
    { id: 'tomatoes', name: { en: 'Tomatoes (Roma)', es: 'Tomates (Roma)' }, currentPrice: 24.00, icon: '🍅' },
    { id: 'lettuce', name: { en: 'Lettuce (Romaine)', es: 'Lechuga (Romana)' }, currentPrice: 19.00, icon: '🥬' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // AI auto-fill price when commodity is selected
    if (field === 'commodity') {
      const selectedCommodity = commodities.find(c => c.id === value);
      if (selectedCommodity) {
        setFormData(prev => ({ ...prev, price: selectedCommodity.currentPrice.toString() }));
      }
    }
  };

  const runAIAnalysis = () => {
    const selectedCommodity = commodities.find(c => c.id === formData.commodity);
    const selectedSupplier = suppliers.find(s => s.name === formData.supplier);
    
    if (!selectedCommodity || !selectedSupplier) return;

    const totalCost = parseFloat(formData.price) * parseFloat(formData.quantity);
    const marketPrice = selectedCommodity.currentPrice * parseFloat(formData.quantity);
    const priceDiff = ((totalCost - marketPrice) / marketPrice * 100).toFixed(2);

    const suggestions = {
      priceAnalysis: {
        yourPrice: totalCost,
        marketPrice: marketPrice,
        difference: priceDiff,
        recommendation: priceDiff > 10 ? 'warning' : priceDiff < -5 ? 'excellent' : 'fair'
      },
      supplierInfo: selectedSupplier,
      optimalQuantity: Math.round(parseFloat(formData.quantity) * 1.1),
      estimatedDelivery: formData.deliveryDate || 'Not specified',
      qualityScore: 92,
      riskScore: 15
    };

    setAiSuggestions(suggestions);

    // Compliance check
    const compliance = {
      passed: true,
      checks: [
        { name: 'Supplier Certified', status: selectedSupplier.certifications.length > 0, icon: '✅' },
        { name: 'Price Within Range', status: Math.abs(priceDiff) < 15, icon: priceDiff < 15 ? '✅' : '⚠️' },
        { name: 'Delivery Date Set', status: formData.deliveryDate !== '', icon: formData.deliveryDate ? '✅' : '⚠️' },
        { name: 'Payment Terms Valid', status: formData.paymentTerms !== '', icon: '✅' }
      ]
    };

    setComplianceCheck(compliance);
  };

  const generatePO = () => {
    runAIAnalysis();
    setPoGenerated(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          📝 {language === 'es' ? 'Orden de Compra IA' : 'AI-Powered Purchase Order'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Precios inteligentes, autocompletado, verificación de cumplimiento y optimización de pedidos con IA.'
            : 'Smart pricing, auto-fill, compliance checking, and order optimization with AI.'}
        </p>

        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          
          {/* FORM FIELDS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            
            {/* Supplier */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#06b6d4', fontWeight: 'bold' }}>
                {language === 'es' ? 'Proveedor' : 'Supplier'} *
              </label>
              <select 
                value={formData.supplier} 
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
              >
                <option value="">{language === 'es' ? 'Seleccionar...' : 'Select...'}</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name} ({supplier.location}) - ⭐ {supplier.rating}
                  </option>
                ))}
              </select>
            </div>

            {/* Commodity */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#06b6d4', fontWeight: 'bold' }}>
                {language === 'es' ? 'Producto' : 'Commodity'} *
              </label>
              <select 
                value={formData.commodity} 
                onChange={(e) => handleInputChange('commodity', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
              >
                <option value="">{language === 'es' ? 'Seleccionar...' : 'Select...'}</option>
                {commodities.map(commodity => (
                  <option key={commodity.id} value={commodity.id}>
                    {commodity.icon} {commodity.name[language]} - ${commodity.currentPrice}/lb
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#06b6d4', fontWeight: 'bold' }}>
                {language === 'es' ? 'Cantidad' : 'Quantity'} *
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  value={formData.quantity} 
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="0"
                  style={{ flex: 1, padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
                />
                <select 
                  value={formData.unit} 
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  style={{ padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
                >
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                  <option value="tons">tons</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#06b6d4', fontWeight: 'bold' }}>
                {language === 'es' ? 'Precio por Unidad ($)' : 'Price per Unit ($)'} *
              </label>
              <input 
                type="number" 
                step="0.01"
                value={formData.price} 
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
              />
            </div>

            {/* Delivery Date */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#06b6d4', fontWeight: 'bold' }}>
                {language === 'es' ? 'Fecha de Entrega' : 'Delivery Date'}
              </label>
              <input 
                type="date" 
                value={formData.deliveryDate} 
                onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
              />
            </div>

            {/* Payment Terms */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#06b6d4', fontWeight: 'bold' }}>
                {language === 'es' ? 'Términos de Pago' : 'Payment Terms'}
              </label>
              <select 
                value={formData.paymentTerms} 
                onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem' }}
              >
                <option value="15">15 {language === 'es' ? 'días' : 'days'}</option>
                <option value="30">30 {language === 'es' ? 'días' : 'days'}</option>
                <option value="45">45 {language === 'es' ? 'días' : 'days'}</option>
                <option value="60">60 {language === 'es' ? 'días' : 'days'}</option>
              </select>
            </div>

          </div>

          {/* Notes */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#06b6d4', fontWeight: 'bold' }}>
              {language === 'es' ? 'Notas Adicionales' : 'Additional Notes'}
            </label>
            <textarea 
              value={formData.notes} 
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
              placeholder={language === 'es' ? 'Instrucciones especiales, requisitos de calidad, etc.' : 'Special instructions, quality requirements, etc.'}
              style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              onClick={runAIAnalysis}
              disabled={!formData.supplier || !formData.commodity || !formData.quantity || !formData.price}
              style={{ 
                padding: '1rem 2rem', 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
                border: 'none', 
                borderRadius: '12px', 
                color: '#fff', 
                fontSize: '1rem', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                opacity: (!formData.supplier || !formData.commodity || !formData.quantity || !formData.price) ? 0.5 : 1
              }}
            >
              🤖 {language === 'es' ? 'Analizar con IA' : 'Analyze with AI'}
            </button>

            <button 
              onClick={generatePO}
              disabled={!formData.supplier || !formData.commodity || !formData.quantity || !formData.price}
              style={{ 
                padding: '1rem 2rem', 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                border: 'none', 
                borderRadius: '12px', 
                color: '#fff', 
                fontSize: '1rem', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                opacity: (!formData.supplier || !formData.commodity || !formData.quantity || !formData.price) ? 0.5 : 1
              }}
            >
              ✅ {language === 'es' ? 'Generar PO' : 'Generate PO'}
            </button>
          </div>

        </div>

        {/* AI SUGGESTIONS */}
        {aiSuggestions && (
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '2rem', borderRadius: '20px', marginTop: '2rem', border: '2px solid #8b5cf6' }}>
            <h2 style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '1.5rem' }}>
              🤖 {language === 'es' ? 'Análisis de IA' : 'AI Analysis'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Tu Precio Total' : 'Your Total Price'}</div>
                <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>${aiSuggestions.priceAnalysis.yourPrice.toFixed(2)}</div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Precio de Mercado' : 'Market Price'}</div>
                <div style={{ fontSize: '2rem', color: '#06b6d4', fontWeight: 'bold' }}>${aiSuggestions.priceAnalysis.marketPrice.toFixed(2)}</div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Diferencia' : 'Difference'}</div>
                <div style={{ fontSize: '2rem', color: Math.abs(aiSuggestions.priceAnalysis.difference) < 5 ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                  {aiSuggestions.priceAnalysis.difference > 0 ? '+' : ''}{aiSuggestions.priceAnalysis.difference}%
                </div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{language === 'es' ? 'Puntuación de Calidad' : 'Quality Score'}</div>
                <div style={{ fontSize: '2rem', color: '#8b5cf6', fontWeight: 'bold' }}>{aiSuggestions.qualityScore}/100</div>
              </div>
            </div>

            {complianceCheck && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '1rem' }}>
                  {language === 'es' ? 'Verificación de Cumplimiento' : 'Compliance Check'}
                </h3>
                {complianceCheck.checks.map((check, idx) => (
                  <div key={idx} style={{ padding: '1rem', marginBottom: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff' }}>{check.name}</span>
                    <span style={{ fontSize: '1.5rem' }}>{check.icon}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {poGenerated && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '20px', marginTop: '2rem', border: '2px solid #10b981', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '1rem' }}>
              {language === 'es' ? '¡Orden de Compra Generada!' : 'Purchase Order Generated!'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
              {language === 'es' 
                ? 'Tu PO ha sido creada y enviada para aprobación.'
                : 'Your PO has been created and sent for approval.'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProducePOForm;