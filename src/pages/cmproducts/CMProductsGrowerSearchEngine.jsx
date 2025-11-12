import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const CMProductsGrowerSearchEngine = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const growers = [
    { id: 1, name: 'Valle Verde Produce', license: 'GR-2024-001', region: 'California', commodities: ['Avocados', 'Lettuce'], certifications: ['PrimusGFS', 'GLOBALG.A.P.'], status: 'active' },
    { id: 2, name: 'Sunset Farms Inc.', license: 'GR-2024-002', region: 'Florida', commodities: ['Tomatoes', 'Strawberries'], certifications: ['FSMA', 'Organic'], status: 'active' },
    { id: 3, name: 'Rio Grande Growers', license: 'GR-2024-003', region: 'Texas', commodities: ['Lettuce', 'Onions'], certifications: ['PrimusGFS'], status: 'active' },
    { id: 4, name: 'Pacific Coast Organics', license: 'GR-2024-004', region: 'California', commodities: ['Strawberries', 'Avocados'], certifications: ['GLOBALG.A.P.', 'Organic'], status: 'active' },
    { id: 5, name: 'Greenfield Harvest', license: 'GR-2024-005', region: 'Mexico', commodities: ['Tomatoes', 'Peppers'], certifications: ['HACCP', 'FSMA'], status: 'active' }
  ];

  const filteredGrowers = growers.filter(g => 
    !searchQuery || 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.license.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '2rem' }}>
           {language === 'en' ? 'Grower Registry & Search Engine' : 'Registro de Productores y Motor de Búsqueda'}
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder={language === 'en' ? 'Search by name, license, or region...' : 'Buscar por nombre, licencia o región...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '1.2rem', 
            background: 'rgba(30, 41, 59, 0.8)', 
            border: '2px solid #06b6d4', 
            borderRadius: '12px', 
            color: '#fff', 
            fontSize: '1.1rem', 
            marginBottom: '2rem' 
          }}
        />

        {/* Grower Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {filteredGrowers.map(grower => (
            <div key={grower.id} style={{ background: 'rgba(30, 41, 59, 0.8)', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 'bold' }}>{grower.name}</h3>
                <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {grower.status}
                </span>
              </div>
              
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#06b6d4' }}>{language === 'en' ? 'License:' : 'Licencia:'}</strong> {grower.license}
              </div>
              
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#06b6d4' }}>{language === 'en' ? 'Region:' : 'Región:'}</strong> {grower.region}
              </div>
              
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
                <strong style={{ color: '#06b6d4' }}>{language === 'en' ? 'Commodities:' : 'Productos:'}</strong> {grower.commodities.join(', ')}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {grower.certifications.map((cert, idx) => (
                  <span key={idx} style={{ padding: '0.3rem 0.6rem', background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', borderRadius: '6px', fontSize: '0.75rem' }}>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/cmproducts')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
           {language === 'en' ? 'Back to Dashboard' : 'Volver al Panel'}
        </button>
      </div>
    </div>
  );
};

export default CMProductsGrowerSearchEngine;
