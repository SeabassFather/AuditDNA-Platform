import React, { useState, useContext } from 'react';
import { Link2, CheckCircle, AlertTriangle, XCircle, Download, Share2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const TraceabilityIntelligence = () => {
  const { language } = useLanguage();

  const lots = [
    {
      id: 'TOM-2025-A',
      product: 'Organic Tomatoes',
      status: 'VERIFIED',
      auditScore: 94,
      stages: { farm: true, harvest: true, processing: true, packaging: true, distribution: true },
      compliance: { primusGFS: 96, globalGAP: 92, usda: 95 },
      tests: { water: 3, soil: 2, microbial: 4, fertilizer: 1 }
    },
    {
      id: 'STR-2025-B',
      product: 'Strawberries',
      status: 'PENDING',
      auditScore: 78,
      stages: { farm: true, harvest: true, processing: true, packaging: false, distribution: false },
      compliance: { primusGFS: 85, globalGAP: 72, usda: 80 },
      tests: { water: 2, soil: 1, microbial: 2, fertilizer: 1 }
    },
    {
      id: 'AVO-2025-C',
      product: 'Hass Avocados',
      status: 'FLAGGED',
      auditScore: 68,
      stages: { farm: true, harvest: true, processing: false, packaging: false, distribution: false },
      compliance: { primusGFS: 72, globalGAP: 65, usda: 68 },
      tests: { water: 1, soil: 1, microbial: 1, fertilizer: 0 }
    }
  ];

  const getStatusColor = (status) => {
    if (status === 'VERIFIED') return { bg: '#d1fae5', text: '#065f46' };
    if (status === 'PENDING') return { bg: '#fef3c7', text: '#92400e' };
    return { bg: '#fee2e2', text: '#991b1b' };
  };

  const getComplianceStatus = (score) => {
    if (score >= 90) return { icon: <CheckCircle size={20} />, color: '#10b981', text: 'PASS' };
    if (score >= 70) return { icon: <AlertTriangle size={20} />, color: '#f59e0b', text: 'WARNING' };
    return { icon: <XCircle size={20} />, color: '#ef4444', text: 'FAIL' };
  };

  const t = {
    en: {
      title: 'Traceability Intelligence',
      subtitle: 'Supply Chain DNA & Compliance Validation',
      lot: 'Lot',
      product: 'Product',
      status: 'Status',
      auditScore: 'Audit Score',
      supplyChain: 'Supply Chain',
      compliance: 'Compliance',
      tests: 'Linked Tests',
      actions: 'Actions',
      viewChain: 'View Chain',
      download: 'Download',
      share: 'Share',
      stages: {
        farm: 'Farm',
        harvest: 'Harvest',
        processing: 'Processing',
        packaging: 'Packaging',
        distribution: 'Distribution'
      }
    },
    es: {
      title: 'Inteligencia de Trazabilidad',
      subtitle: 'ADN de Cadena de Suministro y Validación',
      lot: 'Lote',
      product: 'Producto',
      status: 'Estado',
      auditScore: 'Puntuación de Auditoría',
      supplyChain: 'Cadena de Suministro',
      compliance: 'Cumplimiento',
      tests: 'Pruebas Vinculadas',
      actions: 'Acciones',
      viewChain: 'Ver Cadena',
      download: 'Descargar',
      share: 'Compartir',
      stages: {
        farm: 'Granja',
        harvest: 'Cosecha',
        processing: 'Procesamiento',
        packaging: 'Empaque',
        distribution: 'Distribución'
      }
    }
  };

  const text = t[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {lots.map(lot => {
            const statusColor = getStatusColor(lot.status);
            const primusStatus = getComplianceStatus(lot.compliance.primusGFS);
            const gapStatus = getComplianceStatus(lot.compliance.globalGAP);
            const usdaStatus = getComplianceStatus(lot.compliance.usda);

            return (
              <div
                key={lot.id}
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '30px',
                  gap: '20px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', color: '#0891b2', marginBottom: '8px' }}>
                      {lot.id}
                    </h3>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>{lot.product}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>
                        {text.status}
                      </div>
                      <span style={{
                        background: statusColor.bg,
                        color: statusColor.text,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '0.95rem'
                      }}>
                        {lot.status}
                      </span>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>
                        {text.auditScore}
                      </div>
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: lot.auditScore >= 90 ? '#10b981' : lot.auditScore >= 70 ? '#f59e0b' : '#ef4444'
                      }}>
                        {lot.auditScore}/100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supply Chain Stages */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#333' }}>
                    {text.supplyChain}:
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    {Object.keys(lot.stages).map((stage, idx) => (
                      <React.Fragment key={stage}>
                        <div style={{
                          background: lot.stages[stage] ? '#d1fae5' : '#f3f4f6',
                          padding: '12px 20px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          border: `2px solid ${lot.stages[stage] ? '#10b981' : '#d1d5db'}`
                        }}>
                          {lot.stages[stage] ? (
                            <CheckCircle size={18} color="#10b981" />
                          ) : (
                            <XCircle size={18} color="#9ca3af" />
                          )}
                          <span style={{
                            fontWeight: 'bold',
                            color: lot.stages[stage] ? '#065f46' : '#6b7280'
                          }}>
                            {text.stages[stage]}
                          </span>
                        </div>
                        {idx < Object.keys(lot.stages).length - 1 && (
                          <div style={{
                            width: '30px',
                            height: '2px',
                            background: lot.stages[Object.keys(lot.stages)[idx + 1]] ? '#10b981' : '#d1d5db'
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Compliance Scores */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#333' }}>
                    {text.compliance}:
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px'
                  }}>
                    <div style={{
                      padding: '15px',
                      background: '#f9fafb',
                      borderRadius: '10px',
                      border: `2px solid ${primusStatus.color}`
                    }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>PrimusGFS</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: primusStatus.color }}>
                          {lot.compliance.primusGFS}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: primusStatus.color, fontWeight: 'bold' }}>
                          {primusStatus.icon}
                          {primusStatus.text}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      padding: '15px',
                      background: '#f9fafb',
                      borderRadius: '10px',
                      border: `2px solid ${gapStatus.color}`
                    }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>GLOBALG.A.P.</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: gapStatus.color }}>
                          {lot.compliance.globalGAP}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: gapStatus.color, fontWeight: 'bold' }}>
                          {gapStatus.icon}
                          {gapStatus.text}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      padding: '15px',
                      background: '#f9fafb',
                      borderRadius: '10px',
                      border: `2px solid ${usdaStatus.color}`
                    }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>USDA</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: usdaStatus.color }}>
                          {lot.compliance.usda}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: usdaStatus.color, fontWeight: 'bold' }}>
                          {usdaStatus.icon}
                          {usdaStatus.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linked Tests */}
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#333' }}>
                    {text.tests}:
                  </h4>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#dbeafe', padding: '10px 20px', borderRadius: '8px' }}>
                      💧 Water: <strong>{lot.tests.water}</strong>
                    </div>
                    <div style={{ background: '#fef3c7', padding: '10px 20px', borderRadius: '8px' }}>
                      🌱 Soil: <strong>{lot.tests.soil}</strong>
                    </div>
                    <div style={{ background: '#fce7f3', padding: '10px 20px', borderRadius: '8px' }}>
                      🦠 Microbial: <strong>{lot.tests.microbial}</strong>
                    </div>
                    <div style={{ background: '#d1fae5', padding: '10px 20px', borderRadius: '8px' }}>
                      🧪 Fertilizer: <strong>{lot.tests.fertilizer}</strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  paddingTop: '20px',
                  borderTop: '2px solid #e5e7eb'
                }}>
                  <button style={{
                    padding: '12px 25px',
                    background: '#0891b2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Link2 size={18} />
                    {text.viewChain}
                  </button>

                  <button style={{
                    padding: '12px 25px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Download size={18} />
                    {text.download}
                  </button>

                  <button style={{
                    padding: '12px 25px',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Share2 size={18} />
                    {text.share}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TraceabilityIntelligence;
