// ================================================================
// GROWER PORTAL ENHANCED - FULL LOGISTICS & COST TRACKING
// ================================================================
// Date: 2025-11-11 10:08:13 UTC
// Author: SeabassFather
// Features: Harvest + Freight + GPS + Insurance + Real-time tracking
// ================================================================

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const GrowerPortalEnhanced = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('growers');
  const [selectedGrower, setSelectedGrower] = useState(null);

  // TABS CONFIGURATION
  const tabs = [
    { id: 'growers', icon: '🌱', label: { en: 'Growers', es: 'Productores' } },
    { id: 'pricing', icon: '💰', label: { en: 'USDA Pricing', es: 'Precios USDA' } },
    { id: 'freight', icon: '🚛', label: { en: 'Freight Calculator', es: 'Calculadora de Flete' } },
    { id: 'tracking', icon: '📍', label: { en: 'Live Tracking', es: 'Rastreo en Vivo' } },
    { id: 'routing', icon: '🗺️', label: { en: 'Route Mapping', es: 'Mapeo de Rutas' } },
    { id: 'insurance', icon: '🛡️', label: { en: 'Insurance', es: 'Seguro' } },
    { id: 'documents', icon: '📄', label: { en: 'Documents', es: 'Documentos' } },
    { id: 'ports', icon: '🚢', label: { en: 'Ports of Entry', es: 'Puertos de Entrada' } },
    { id: 'delivery', icon: '⏱️', label: { en: 'Delivery Time', es: 'Tiempo de Entrega' } },
    { id: 'certification', icon: '✅', label: { en: 'Certifications', es: 'Certificaciones' } }
  ];

  // GROWER DATABASE (Enhanced with logistics data)
  const growers = [
    {
      id: 'GRW-001',
      name: 'Green Valley Farms',
      region: 'Michoacán, Mexico',
      varieties: ['Hass Avocado', 'Fuerte Avocado'],
      harvestReady: '2025-11-20',
      estimatedTons: 850,
      estimatedLoads: 34,
      casesPerLoad: 1000,
      freightCostPerLoad: 3500,
      insuranceCostPerLoad: 450,
      portOfEntry: 'Nogales, AZ',
      estimatedTransitDays: 2.5,
      currentLocation: { lat: 19.7019, lng: -101.1841, status: 'At Farm' },
      certifications: ['PrimusGFS A+', 'GLOBALG.A.P.', 'USDA Organic'],
      complianceScore: 97,
      documents: 12,
      trackingActive: false
    },
    {
      id: 'GRW-002',
      name: 'Sunrise Orchards',
      region: 'Salinas Valley, CA',
      varieties: ['Romaine Lettuce', 'Iceberg Lettuce'],
      harvestReady: 'NOW - Active Harvest',
      estimatedTons: 1200,
      estimatedLoads: 60,
      casesPerLoad: 800,
      freightCostPerLoad: 1200,
      insuranceCostPerLoad: 180,
      portOfEntry: 'Domestic (CA)',
      estimatedTransitDays: 1.5,
      currentLocation: { lat: 36.6777, lng: -121.6555, status: 'Loading' },
      certifications: ['PrimusGFS AA', 'FDA FSMA', 'LGMA'],
      complianceScore: 99,
      documents: 18,
      trackingActive: true
    },
    {
      id: 'GRW-003',
      name: 'Pacific Berry Growers',
      region: 'Oxnard, CA',
      varieties: ['Strawberries', 'Blackberries'],
      harvestReady: 'NOW - Active Harvest',
      estimatedTons: 450,
      estimatedLoads: 90,
      casesPerLoad: 200,
      freightCostPerLoad: 800,
      insuranceCostPerLoad: 120,
      portOfEntry: 'Domestic (CA)',
      estimatedTransitDays: 1.0,
      currentLocation: { lat: 34.1975, lng: -119.1771, status: 'In Transit' },
      certifications: ['PrimusGFS A', 'GLOBALG.A.P.', 'Organic'],
      complianceScore: 95,
      documents: 15,
      trackingActive: true
    }
  ];

  // FREIGHT CALCULATOR
  const calculateFreight = (grower) => {
    const totalFreight = grower.freightCostPerLoad * grower.estimatedLoads;
    const totalInsurance = grower.insuranceCostPerLoad * grower.estimatedLoads;
    const totalCost = totalFreight + totalInsurance;
    const costPerTon = totalCost / grower.estimatedTons;
    
    return {
      totalFreight,
      totalInsurance,
      totalCost,
      costPerTon: costPerTon.toFixed(2)
    };
  };

  // RENDER TAB CONTENT
  const renderTabContent = () => {
    switch (activeTab) {
      case 'growers':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
            {growers.map(grower => {
              const costs = calculateFreight(grower);
              return (
                <div 
                  key={grower.id}
                  onClick={() => setSelectedGrower(grower)}
                  style={{ 
                    background: 'rgba(30, 41, 59, 0.8)', 
                    borderRadius: '20px', 
                    padding: '2rem',
                    border: selectedGrower?.id === grower.id ? '2px solid #10b981' : '2px solid rgba(100, 116, 139, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* HEADER */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.3rem' }}>{grower.name}</h2>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>📍 {grower.region}</p>
                    </div>
                    {grower.trackingActive && (
                      <span style={{ padding: '0.3rem 0.8rem', background: '#ef4444', borderRadius: '12px', fontSize: '0.75rem', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', animation: 'pulse 2s infinite' }}></span>
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* HARVEST STATUS */}
                  <div style={{ background: grower.harvestReady.includes('NOW') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                      {language === 'es' ? 'Estado de Cosecha' : 'Harvest Status'}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: grower.harvestReady.includes('NOW') ? '#10b981' : '#f59e0b' }}>
                      {grower.harvestReady}
                    </div>
                  </div>

                  {/* QUANTITIES */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(45, 55, 72, 0.6)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Tons</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>{grower.estimatedTons}</div>
                    </div>
                    <div style={{ background: 'rgba(45, 55, 72, 0.6)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Loads</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>{grower.estimatedLoads}</div>
                    </div>
                    <div style={{ background: 'rgba(45, 55, 72, 0.6)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Cases/Load</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>{grower.casesPerLoad}</div>
                    </div>
                  </div>

                  {/* LOGISTICS COSTS */}
                  <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.8rem' }}>
                      {language === 'es' ? 'Costos de Logística' : 'Logistics Costs'}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Freight</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#06b6d4' }}>
                          ${costs.totalFreight.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Insurance</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                          ${costs.totalInsurance.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Cost</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                        ${costs.totalCost.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        ${costs.costPerTon}/ton
                      </div>
                    </div>
                  </div>

                  {/* PORT & TRANSIT */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Port of Entry</div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold' }}>{grower.portOfEntry}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Transit Time</div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold' }}>{grower.estimatedTransitDays} days</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'freight':
        return (
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '2rem' }}>
              🚛 {language === 'es' ? 'Calculadora de Flete' : 'Freight Cost Calculator'}
            </h2>
            {growers.map(grower => {
              const costs = calculateFreight(grower);
              return (
                <div key={grower.id} style={{ background: 'rgba(45, 55, 72, 0.6)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>{grower.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cost per Load</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#06b6d4' }}>
                        ${grower.freightCostPerLoad.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Loads</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                        {grower.estimatedLoads}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Freight</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                        ${costs.totalFreight.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cost per Ton</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                        ${costs.costPerTon}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'tracking':
        return (
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '2rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }}></span>
              📍 {language === 'es' ? 'Rastreo en Vivo' : 'Live Tracking'}
            </h2>
            {growers.filter(g => g.trackingActive).map(grower => (
              <div key={grower.id} style={{ background: 'rgba(45, 55, 72, 0.6)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>{grower.name}</h3>
                  <span style={{ padding: '0.5rem 1rem', background: '#10b981', borderRadius: '20px', fontSize: '0.85rem', color: '#fff', fontWeight: 'bold' }}>
                    {grower.currentLocation.status}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Latitude</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#06b6d4', fontFamily: 'monospace' }}>
                      {grower.currentLocation.lat}°
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Longitude</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#06b6d4', fontFamily: 'monospace' }}>
                      {grower.currentLocation.lng}°
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Last Update</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', padding: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', color: '#94a3b8', marginBottom: '1rem' }}>
              {tabs.find(t => t.id === activeTab)?.label[language]}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              {language === 'es' ? 'Módulo en desarrollo...' : 'Module under development...'}
            </p>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', color: '#fff' }}>
      
      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderBottom: '2px solid #334155', padding: '2rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', color: '#10b981', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(16, 185, 129, 0.6)' }}>
            🌱 {language === 'es' ? 'Portal de Productores Mejorado' : 'Enhanced Grower Portal'}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
            {language === 'es' 
              ? 'Cosechas • Flete • GPS • Seguros • Rastreo en Tiempo Real' 
              : 'Harvests • Freight • GPS • Insurance • Real-Time Tracking'}
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '2px solid #334155', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0 2rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.8rem 1.5rem',
                background: activeTab === tab.id ? '#10b981' : 'transparent',
                border: activeTab === tab.id ? 'none' : '1px solid #334155',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.borderColor = '#10b981';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#334155';
                }
              }}
            >
              {tab.icon} {tab.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {renderTabContent()}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default GrowerPortalEnhanced;