import React, { useState, useContext } from 'react';
import { Search, MapPin, Phone, Mail, Globe, FileText, Download, Filter } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import growerDatabase from './growerDatabase';

const GrowersDirectory = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedCert, setSelectedCert] = useState('all');

  const countries = ['all', ...new Set(growerDatabase.map(g => g.country))];
  const crops = ['all', ...new Set(growerDatabase.flatMap(g => g.crops))];
  const certifications = ['all', ...new Set(growerDatabase.flatMap(g => g.certifications))];

  const filteredGrowers = growerDatabase.filter(grower => {
    const matchesSearch = 
      grower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grower.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grower.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = selectedCountry === 'all' || grower.country === selectedCountry;
    const matchesCrop = selectedCrop === 'all' || grower.crops.includes(selectedCrop);
    const matchesCert = selectedCert === 'all' || grower.certifications.includes(selectedCert);

    return matchesSearch && matchesCountry && matchesCrop && matchesCert;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Country', 'Region', 'Crops', 'Certifications', 'Email', 'Phone', 'Website'];
    const rows = filteredGrowers.map(g => [
      g.name,
      g.country,
      g.region,
      g.crops.join('; '),
      g.certifications.join('; '),
      g.contact.email,
      g.contact.phone,
      g.contact.website
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'growers_directory.csv';
    a.click();
  };

  const t = {
    en: {
      title: 'Certified Growers Directory',
      subtitle: 'Global network of certified organic producers',
      search: 'Search growers...',
      filters: 'Filters',
      country: 'Country',
      crop: 'Crop',
      certification: 'Certification',
      all: 'All',
      results: 'Results',
      growers: 'growers found',
      export: 'Export CSV',
      contact: 'Contact',
      location: 'Location',
      crops: 'Crops',
      certs: 'Certifications'
    },
    es: {
      title: 'Directorio de Productores Certificados',
      subtitle: 'Red global de productores orgánicos certificados',
      search: 'Buscar productores...',
      filters: 'Filtros',
      country: 'País',
      crop: 'Cultivo',
      certification: 'Certificación',
      all: 'Todos',
      results: 'Resultados',
      growers: 'productores encontrados',
      export: 'Exportar CSV',
      contact: 'Contacto',
      location: 'Ubicación',
      crops: 'Cultivos',
      certs: 'Certificaciones'
    }
  };

  const text = t[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
          <div style={{ marginTop: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {filteredGrowers.length} {text.growers}
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '25px' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666'
              }} 
            />
            <input
              type="text"
              placeholder={text.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 15px 15px 50px',
                fontSize: '1.1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                outline: 'none'
              }}
            />
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Filter size={20} color="#10b981" />
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{text.filters}:</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>
                {text.country}
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {countries.map(c => (
                  <option key={c} value={c}>
                    {c === 'all' ? text.all : c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>
                {text.crop}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {crops.map(c => (
                  <option key={c} value={c}>
                    {c === 'all' ? text.all : c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>
                {text.certification}
              </label>
              <select
                value={selectedCert}
                onChange={(e) => setSelectedCert(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {certifications.map(c => (
                  <option key={c} value={c}>
                    {c === 'all' ? text.all : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            style={{
              marginTop: '20px',
              padding: '12px 25px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Download size={20} />
            {text.export}
          </button>
        </div>

        {/* Growers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '25px'
        }}>
          {filteredGrowers.map((grower, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
            >
              {/* Grower Name */}
              <h3 style={{
                fontSize: '1.4rem',
                color: '#10b981',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>
                {grower.name}
              </h3>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <MapPin size={18} color="#666" />
                <span style={{ color: '#666', fontSize: '0.95rem' }}>
                  {grower.region}, {grower.country}
                </span>
              </div>

              {/* GPS Coordinates */}
              {grower.gps && (
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: '#999', 
                  marginBottom: '15px',
                  fontFamily: 'monospace'
                }}>
                  📍 {grower.gps.lat.toFixed(4)}°N, {grower.gps.long.toFixed(4)}°W
                </div>
              )}

              {/* Crops */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>
                  {text.crops}:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {grower.crops.map((crop, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#d1fae5',
                        color: '#065f46',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>
                  {text.certs}:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {grower.certifications.map((cert, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '15px',
                marginTop: '15px'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666', marginBottom: '10px' }}>
                  {text.contact}:
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a
                    href={`mailto:${grower.contact.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#10b981',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Mail size={16} />
                    {grower.contact.email}
                  </a>

                  <a
                    href={`tel:${grower.contact.phone}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#10b981',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Phone size={16} />
                    {grower.contact.phone}
                  </a>

                  {grower.contact.website && (
                    <a
                      href={grower.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#10b981',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      <Globe size={16} />
                      {language === 'en' ? 'Website' : 'Sitio web'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGrowers.length === 0 && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <FileText size={60} color="#d1d5db" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '10px' }}>
              {language === 'en' ? 'No growers found' : 'No se encontraron productores'}
            </h3>
            <p style={{ color: '#999' }}>
              {language === 'en' 
                ? 'Try adjusting your search or filters'
                : 'Intenta ajustar tu búsqueda o filtros'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowersDirectory;
