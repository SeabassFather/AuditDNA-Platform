import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const TraceabilityAIHub = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchLot, setSearchLot] = useState('');

  const lots = [
    {
      id: 'LOT-2025-001',
      product: 'Avocados (Hass)',
      grower: 'Fresh Harvest Co.',
      origin: 'California, USA',
      packDate: '2025-01-05',
      shipDate: '2025-01-06',
      quantity: '2,400 lbs',
      pallets: 4,
      destination: 'Los Angeles Distribution Center',
      status: 'in-transit',
      qrCode: 'QR-AVG-2025-001',
      waterTest: { status: 'pass', score: 94, date: '2024-12-28' },
      soilTest: { status: 'pass', score: 88, date: '2024-12-20' },
      certifications: ['GlobalGAP', 'FSMA', 'Organic'],
      temperature: '38F',
      blockchain: 'CONFIRMED',
      traceEvents: [
        { timestamp: '2025-01-05 08:30', event: 'Harvest completed', location: 'Field B-12' },
        { timestamp: '2025-01-05 14:20', event: 'Quality inspection passed', location: 'Packing facility' },
        { timestamp: '2025-01-06 06:15', event: 'Loaded for transport', location: 'Distribution warehouse' },
        { timestamp: '2025-01-06 09:45', event: 'In transit', location: 'Highway I-5 North' }
      ]
    },
    {
      id: 'LOT-2025-002',
      product: 'Strawberries',
      grower: 'Valle Verde Organics',
      origin: 'Sinaloa, Mexico',
      packDate: '2025-01-07',
      shipDate: '2025-01-08',
      quantity: '1,800 lbs',
      pallets: 3,
      destination: 'Phoenix Fresh Market',
      status: 'delivered',
      qrCode: 'QR-STR-2025-002',
      waterTest: { status: 'pass', score: 91, date: '2025-01-02' },
      soilTest: { status: 'pass', score: 86, date: '2024-12-15' },
      certifications: ['Organic', 'Fair Trade'],
      temperature: '34F',
      blockchain: 'CONFIRMED',
      traceEvents: [
        { timestamp: '2025-01-07 06:00', event: 'Harvest completed', location: 'Field C-8' },
        { timestamp: '2025-01-07 11:30', event: 'Quality inspection passed', location: 'Processing center' },
        { timestamp: '2025-01-08 05:45', event: 'Loaded for transport', location: 'Export facility' },
        { timestamp: '2025-01-08 18:20', event: 'Delivered', location: 'Phoenix Fresh Market' }
      ]
    },
    {
      id: 'LOT-2025-003',
      product: 'Tomatoes (Roma)',
      grower: 'Coastal Farms LLC',
      origin: 'Florida, USA',
      packDate: '2025-01-08',
      shipDate: '2025-01-09',
      quantity: '3,200 lbs',
      pallets: 5,
      destination: 'Atlanta Distribution Hub',
      status: 'quality-hold',
      qrCode: 'QR-TOM-2025-003',
      waterTest: { status: 'warning', score: 68, date: '2025-01-03' },
      soilTest: { status: 'pass', score: 82, date: '2024-12-22' },
      certifications: ['FSMA'],
      temperature: '42F',
      blockchain: 'PENDING',
      traceEvents: [
        { timestamp: '2025-01-08 07:15', event: 'Harvest completed', location: 'Greenhouse 5' },
        { timestamp: '2025-01-08 13:40', event: 'Quality inspection - HOLD', location: 'Inspection station' },
        { timestamp: '2025-01-09 08:00', event: 'Awaiting re-test', location: 'Holding area' }
      ]
    }
  ];

  const metrics = [
    { id: 'total', label: { en: 'Active Lots', es: 'Lotes Activos' }, value: lots.length.toString(), icon: '📦', color: '#06b6d4' },
    { id: 'transit', label: { en: 'In Transit', es: 'En Tránsito' }, value: lots.filter(l => l.status === 'in-transit').length.toString(), icon: '🚚', color: '#f59e0b' },
    { id: 'delivered', label: { en: 'Delivered', es: 'Entregado' }, value: lots.filter(l => l.status === 'delivered').length.toString(), icon: '✅', color: '#10b981' },
    { id: 'alerts', label: { en: 'Quality Holds', es: 'Retenciones' }, value: lots.filter(l => l.status === 'quality-hold').length.toString(), icon: '⚠️', color: '#ef4444' }
  ];

  const statusColors = {
    'in-transit': '#f59e0b',
    'delivered': '#10b981',
    'quality-hold': '#ef4444',
    'pending': '#94a3b8'
  };

  const statusLabels = {
    'in-transit': { en: 'In Transit', es: 'En Tránsito' },
    'delivered': { en: 'Delivered', es: 'Entregado' },
    'quality-hold': { en: 'Quality Hold', es: 'Retención Calidad' },
    'pending': { en: 'Pending', es: 'Pendiente' }
  };

  const filteredLots = lots.filter(lot => 
    !searchLot || 
    lot.id.toLowerCase().includes(searchLot.toLowerCase()) ||
    lot.product.toLowerCase().includes(searchLot.toLowerCase()) ||
    lot.grower.toLowerCase().includes(searchLot.toLowerCase())
  );

  const generateQRCode = (qrText) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
          🔗 {language === 'es' ? 'Centro de Trazabilidad IA' : 'Traceability AI Hub'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Trazabilidad completa de la cadena de suministro con códigos QR, blockchain, y registros de auditoría inmutables.'
            : 'Complete supply chain traceability with QR codes, blockchain verification, and immutable audit trails.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {metrics.map(metric => (
            <div key={metric.id} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
              <div style={{ fontSize: '1.8rem', color: metric.color, fontWeight: 'bold', marginBottom: '0.3rem' }}>{metric.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>{metric.label[language]}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            🔍 {language === 'es' ? 'Buscar Lote o Producto' : 'Search Lot or Product'}
          </h2>
          
          <input
            type="text"
            placeholder={language === 'es' ? 'Buscar por ID de lote, producto o productor...' : 'Search by lot ID, product, or grower...'}
            value={searchLot}
            onChange={(e) => setSearchLot(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: 'rgba(30, 41, 59, 0.6)', 
              border: '2px solid #334155', 
              borderRadius: '12px', 
              color: '#fff', 
              fontSize: '1rem' 
            }}
          />
          
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '1rem' }}>
            {language === 'es' ? 'Mostrando' : 'Showing'} <strong style={{ color: '#06b6d4' }}>{filteredLots.length}</strong> {language === 'es' ? 'de' : 'of'} <strong>{lots.length}</strong> {language === 'es' ? 'lotes' : 'lots'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {filteredLots.map(lot => (
            <div key={lot.id} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(6, 182, 212, 0.2)', borderRadius: '15px', padding: '1.5rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '0.3rem', fontWeight: 'bold' }}>{lot.id}</h3>
                  <div style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.3rem' }}>{lot.product}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>🌾 {lot.grower}</div>
                </div>
                
                <div>
                  <span style={{ 
                    padding: '0.5rem 1rem', 
                    background: `${statusColors[lot.status]}20`, 
                    color: statusColors[lot.status], 
                    borderRadius: '8px', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase' 
                  }}>
                    {statusLabels[lot.status][language]}
                  </span>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', textAlign: 'center' }}>
                <img src={generateQRCode(lot.qrCode)} alt="QR Code" style={{ width: '150px', height: '150px', margin: '0 auto' }} />
                <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: '0.5rem', fontWeight: 'bold' }}>{lot.qrCode}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <div style={{ color: '#94a3b8', marginBottom: '0.2rem' }}>{language === 'es' ? 'Origen:' : 'Origin:'}</div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>📍 {lot.origin}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', marginBottom: '0.2rem' }}>{language === 'es' ? 'Destino:' : 'Destination:'}</div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>🎯 {lot.destination}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', marginBottom: '0.2rem' }}>{language === 'es' ? 'Cantidad:' : 'Quantity:'}</div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>📦 {lot.quantity}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', marginBottom: '0.2rem' }}>{language === 'es' ? 'Paletas:' : 'Pallets:'}</div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>🏗️ {lot.pallets}</div>
                </div>
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#06b6d4', marginBottom: '0.8rem' }}>
                  {language === 'es' ? '🔬 RESULTADOS DE PRUEBAS' : '🔬 TEST RESULTS'}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.8rem' }}>
                  <div>
                    <div style={{ color: '#94a3b8', marginBottom: '0.2rem' }}>{language === 'es' ? 'Agua:' : 'Water:'}</div>
                    <div style={{ color: lot.waterTest.status === 'pass' ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                      {lot.waterTest.status === 'pass' ? '✅' : '⚠️'} {lot.waterTest.score}/100
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', marginBottom: '0.2rem' }}>{language === 'es' ? 'Suelo:' : 'Soil:'}</div>
                    <div style={{ color: lot.soilTest.status === 'pass' ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                      {lot.soilTest.status === 'pass' ? '✅' : '⚠️'} {lot.soilTest.score}/100
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {language === 'es' ? 'CERTIFICACIONES:' : 'CERTIFICATIONS:'}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {lot.certifications.map((cert, idx) => (
                    <span key={idx} style={{ padding: '0.3rem 0.6rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '6px', fontSize: '0.75rem' }}>
                      ✅ {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: lot.blockchain === 'CONFIRMED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: lot.blockchain === 'CONFIRMED' ? '#10b981' : '#94a3b8', fontWeight: 'bold' }}>
                  {lot.blockchain === 'CONFIRMED' ? '🔒 BLOCKCHAIN CONFIRMED' : '⏳ BLOCKCHAIN PENDING'}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(100, 116, 139, 0.3)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#06b6d4', marginBottom: '0.8rem' }}>
                  {language === 'es' ? '📋 EVENTOS DE TRAZABILIDAD' : '📋 TRACE EVENTS'}
                </div>
                
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {lot.traceEvents.map((event, idx) => (
                    <div key={idx} style={{ marginBottom: '0.8rem', paddingLeft: '1rem', borderLeft: '2px solid #06b6d4' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{event.timestamp}</div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold' }}>{event.event}</div>
                      <div style={{ fontSize: '0.75rem', color: '#06b6d4' }}>📍 {event.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
          ← {language === 'es' ? 'Inicio' : 'Home'}
        </button>

      </div>
    </div>
  );
};

export default TraceabilityAIHub;