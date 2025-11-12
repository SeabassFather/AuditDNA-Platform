import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const SupplierIntelligenceSearchEngine = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const [expandedSections, setExpandedSections] = useState({
    contacts: true,
    logistics: false,
    documents: false,
    relatedSuppliers: false
  });
  
  const [selectedContact, setSelectedContact] = useState(null);
  const [qrModal, setQrModal] = useState(null);

  // PREMIUM SUPPLIER DATABASE
  const supplierDatabase = [
    {
      id: 1,
      name: "ABC Agro Exports Ltd",
      location: "Punjab, India",
      riskScore: 42,
      established: 1998,
      certifications: ["FDA", "USDA Organic", "ISO 9001"],
      products: ["Basmati Rice", "Wheat", "Pulses"],
      annualRevenue: "$12M",
      exportVolume: "5,000 MT/year",
      contacts: {
        commercial: [
          {
            name: "Rajesh Kumar",
            title: "Head of Sales",
            email: "rajesh.kumar@abcagro.in",
            phone: "+91-98765-43210",
            whatsapp: true,
            responseRate: "94%",
            avgResponseTime: "4 hours",
            preferredContact: true,
            authorizedFor: ["Purchase Orders", "Price Inquiries", "Sample Requests"]
          }
        ],
        financial: [
          {
            name: "Sunita Verma",
            title: "Finance Director",
            email: "finance@abcagro.in",
            phone: "+91-98765-43213",
            confidential: true,
            responseRate: "78%",
            avgResponseTime: "24 hours",
            authorizedFor: ["Payment Terms", "Factoring Proposals"]
          }
        ]
      }
    },
    {
      id: 2,
      name: "XYZ Foods International",
      location: "Gujarat, India",
      riskScore: 38,
      established: 2005,
      certifications: ["FDA", "ISO 22000"],
      products: ["Organic Grains", "Spices", "Tea"],
      annualRevenue: "$8M",
      exportVolume: "3,500 MT/year",
      contacts: {
        commercial: [
          {
            name: "Sarah Johnson",
            title: "Sales Director",
            email: "sjohnson@xyzfoods.com",
            phone: "+91-98765-11111",
            whatsapp: true,
            responseRate: "92%",
            avgResponseTime: "3 hours",
            preferredContact: true,
            authorizedFor: ["Purchase Orders", "Quotes"]
          }
        ],
        financial: [
          {
            name: "Amit Shah",
            title: "CFO",
            email: "amit@xyzfoods.com",
            phone: "+91-98765-11112",
            responseRate: "85%",
            avgResponseTime: "12 hours",
            authorizedFor: ["Payment Terms", "Credit"]
          }
        ]
      }
    },
    {
      id: 3,
      name: "Premium Agro Ltd",
      location: "Maharashtra, India",
      riskScore: 35,
      established: 2010,
      certifications: ["FDA", "USDA", "Organic"],
      products: ["Rice", "Pulses", "Wheat", "Millets"],
      annualRevenue: "$15M",
      exportVolume: "6,200 MT/year",
      contacts: {
        commercial: [
          {
            name: "Michael Chen",
            title: "Export Manager",
            email: "mchen@premiumagro.in",
            phone: "+91-98765-22222",
            whatsapp: true,
            responseRate: "88%",
            avgResponseTime: "5 hours",
            preferredContact: true,
            authorizedFor: ["All commercial inquiries"]
          }
        ],
        financial: [
          {
            name: "Priya Desai",
            title: "Finance Head",
            email: "priya@premiumagro.in",
            phone: "+91-98765-22223",
            responseRate: "90%",
            avgResponseTime: "8 hours",
            authorizedFor: ["Financial matters"]
          }
        ]
      }
    },
    {
      id: 4,
      name: "Valle Verde Organics",
      location: "Sinaloa, Mexico",
      riskScore: 28,
      established: 2008,
      certifications: ["Organic", "Fair Trade", "GlobalGAP"],
      products: ["Tomatoes", "Peppers", "Cucumbers", "Organic Vegetables"],
      annualRevenue: "$18M",
      exportVolume: "7,800 MT/year",
      contacts: {
        commercial: [
          {
            name: "Maria Garcia",
            title: "Export Director",
            email: "mgarcia@valleverde.mx",
            phone: "+52-667-234-5678",
            whatsapp: true,
            responseRate: "96%",
            avgResponseTime: "2 hours",
            preferredContact: true,
            authorizedFor: ["All commercial matters"]
          }
        ],
        financial: [
          {
            name: "Carlos Mendez",
            title: "CFO",
            email: "cmendez@valleverde.mx",
            phone: "+52-667-234-5679",
            responseRate: "88%",
            avgResponseTime: "6 hours",
            authorizedFor: ["Payment Terms", "Financing"]
          }
        ]
      }
    },
    {
      id: 5,
      name: "Fresh Harvest Co.",
      location: "California, USA",
      riskScore: 22,
      established: 1998,
      certifications: ["GlobalGAP", "FSMA", "Organic", "PrimusGFS"],
      products: ["Avocados", "Lettuce", "Strawberries", "Leafy Greens"],
      annualRevenue: "$24M",
      exportVolume: "12,000 MT/year",
      contacts: {
        commercial: [
          {
            name: "John Smith",
            title: "VP Sales",
            email: "jsmith@freshharvest.com",
            phone: "+1-555-123-4567",
            whatsapp: true,
            responseRate: "98%",
            avgResponseTime: "1 hour",
            preferredContact: true,
            authorizedFor: ["Purchase Orders", "Contracts", "Samples"]
          }
        ],
        financial: [
          {
            name: "Jennifer Lee",
            title: "Finance Director",
            email: "jlee@freshharvest.com",
            phone: "+1-555-123-4568",
            responseRate: "94%",
            avgResponseTime: "4 hours",
            authorizedFor: ["Payment Terms", "Factoring", "Credit Lines"]
          }
        ]
      }
    },
    {
      id: 6,
      name: "Coastal Farms LLC",
      location: "Florida, USA",
      riskScore: 45,
      established: 2012,
      certifications: ["FSMA", "HACCP"],
      products: ["Citrus", "Berries", "Tropical Fruits"],
      annualRevenue: "$9M",
      exportVolume: "4,200 MT/year",
      contacts: {
        commercial: [
          {
            name: "Robert Johnson",
            title: "Sales Manager",
            email: "rjohnson@coastalfarms.com",
            phone: "+1-555-987-6543",
            whatsapp: false,
            responseRate: "82%",
            avgResponseTime: "8 hours",
            preferredContact: true,
            authorizedFor: ["Purchase Orders", "Quotes"]
          }
        ],
        financial: [
          {
            name: "Lisa Martinez",
            title: "Accounting Manager",
            email: "lmartinez@coastalfarms.com",
            phone: "+1-555-987-6544",
            responseRate: "75%",
            avgResponseTime: "24 hours",
            authorizedFor: ["Payment Terms"]
          }
        ]
      }
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      const results = supplierDatabase.filter(supplier => 
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setSearchResults([]);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getRiskColor = (score) => {
    if (score < 30) return { color: '#059669', bg: '#d1fae5', label: language === 'es' ? 'Bajo' : 'Low' };
    if (score < 50) return { color: '#d97706', bg: '#fef3c7', label: language === 'es' ? 'Medio' : 'Medium' };
    return { color: '#dc2626', bg: '#fee2e2', label: language === 'es' ? 'Alto' : 'High' };
  };

  const handleSendEmail = (contact, docType) => {
    setSelectedContact({ contact, docType });
  };

  const generateQRCode = (text) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  };

  // SEARCH LANDING PAGE
  if (!selectedSupplier && searchResults.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer', marginBottom: '2rem' }}>
            â† {language === 'es' ? 'Inicio' : 'Home'}
          </button>

          <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '25px', padding: '3rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#06b6d4', marginBottom: '1rem', textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
              ðŸŽ¯ {language === 'es' ? 'BÃºsqueda de Inteligencia de Proveedores' : 'Supplier Intelligence Search'}
            </h1>
            <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
              {language === 'es' 
                ? 'Busque proveedores verificados y vea perfiles de inteligencia completos'
                : 'Search for verified suppliers and view complete intelligence profiles'}
            </p>

            {/* SEARCH BAR */}
            <div style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder={language === 'es' ? 'Nombre de empresa, ubicaciÃ³n o producto...' : 'Company name, location, or product...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    flex: 1,
                    padding: '1rem 1.5rem',
                    fontSize: '1rem',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '2px solid #334155',
                    borderRadius: '12px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  style={{
                    padding: '1rem 2rem',
                    background: isSearching ? 'rgba(100, 116, 139, 0.5)' : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: isSearching ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSearching ? 'ðŸ” ' + (language === 'es' ? 'Buscando...' : 'Searching...') : 'ðŸ” ' + (language === 'es' ? 'Buscar' : 'Search')}
                </button>
              </div>
            </div>

            {/* QUICK SUGGESTIONS */}
            <div style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
                {language === 'es' ? 'Prueba buscar:' : 'Try searching:'}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['ABC Agro', 'Fresh Harvest', 'Valle Verde', 'Rice', 'Organic', 'India', 'Mexico', 'USA'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setTimeout(() => handleSearch(), 100);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(6, 182, 212, 0.2)',
                      color: '#06b6d4',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURES */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>ðŸ‘¥</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#06b6d4' }}>
                  {language === 'es' ? 'Contactos Inteligentes' : 'Smart Contacts'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  {language === 'es' 
                    ? 'InformaciÃ³n de contacto directo para la persona adecuada: ventas, finanzas o cumplimiento'
                    : 'Direct contact info for the right person - sales, finance, or compliance'}
                </p>
              </div>
              
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>ðŸ“Š</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#06b6d4' }}>
                  {language === 'es' ? 'PuntuaciÃ³n de Riesgo' : 'Risk Scoring'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  {language === 'es' 
                    ? 'Proveedores verificados con certificados de cumplimiento y calificaciones'
                    : 'Verified suppliers with compliance certificates and ratings'}
                </p>
              </div>
              
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>ðŸ”—</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#06b6d4' }}>
                  {language === 'es' ? 'IntegraciÃ³n Completa' : 'Full Integration'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  {language === 'es' 
                    ? 'Enlazado con trazabilidad, anÃ¡lisis de agua/suelo y gestiÃ³n de calidad'
                    : 'Linked to traceability, water/soil analysis, and quality management'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SEARCH RESULTS VIEW
  if (searchResults.length > 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <button
            onClick={() => setSearchResults([])}
            style={{
              padding: '1rem 2rem',
              background: 'rgba(100, 116, 139, 0.3)',
              border: '2px solid #64748b',
              borderRadius: '12px',
              color: '#fff',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}
          >
            â† {language === 'es' ? 'Nueva BÃºsqueda' : 'New Search'}
          </button>

          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#06b6d4' }}>
            {language === 'es' ? 'Encontrados' : 'Found'} {searchResults.length} {language === 'es' ? 'proveedor(es)' : 'supplier(s)'} {language === 'es' ? 'coincidiendo con' : 'matching'} "{searchQuery}"
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {searchResults.map((supplier) => {
              const riskColors = getRiskColor(supplier.riskScore);
              return (
                <div
                  key={supplier.id}
                  onClick={() => handleSelectSupplier(supplier)}
                  style={{
                    background: 'rgba(45, 55, 72, 0.8)',
                    padding: '2rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(6, 182, 212, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#06b6d4';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                        {supplier.name}
                      </h3>
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <span>ðŸ“ {supplier.location}</span>
                        <span>ðŸ¢ {language === 'es' ? 'Est.' : 'Est.'} {supplier.established}</span>
                        <span>ðŸ’° {supplier.annualRevenue}</span>
                        <span>ðŸ“¦ {supplier.exportVolume}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {supplier.certifications.map((cert, idx) => (
                          <span key={idx} style={{ padding: '0.3rem 0.8rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '12px', fontSize: '0.8rem' }}>
                            âœ… {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', background: riskColors.bg, color: riskColors.color, textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem' }}>{supplier.riskScore}</div>
                      <div style={{ fontSize: '0.8rem' }}>{riskColors.label} {language === 'es' ? 'Riesgo' : 'Risk'}</div>
                    </div>
                  </div>
                  
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#06b6d4' }}>{language === 'es' ? 'PRODUCTOS:' : 'PRODUCTS:'}</strong>
                    <div style={{ fontSize: '0.9rem', color: '#fff', marginTop: '0.3rem' }}>{supplier.products.join(', ')}</div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <button style={{ padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold' }}>
                      {language === 'es' ? 'Ver Perfil Completo â†’' : 'View Full Profile â†’'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // FULL SUPPLIER DETAIL VIEW
  const supplier = selectedSupplier;
  const riskColors = getRiskColor(supplier.riskScore);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <button
          onClick={() => setSelectedSupplier(null)}
          style={{
            padding: '1rem 2rem',
            background: 'rgba(100, 116, 139, 0.3)',
            border: '2px solid #64748b',
            borderRadius: '12px',
            color: '#fff',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          â† {language === 'es' ? 'Volver a Resultados' : 'Back to Results'}
        </button>

        <div style={{ background: 'rgba(45, 55, 72, 0.9)', borderRadius: '25px', overflow: 'hidden' }}>
          
          {/* HEADER */}
          <div style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', padding: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{supplier.name}</h1>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', opacity: 0.9 }}>
                  <span>ðŸ“ {supplier.location}</span>
                  <span>ðŸ¢ {language === 'es' ? 'Establecido' : 'Established'} {supplier.established}</span>
                  <span>ðŸŒ {supplier.exportVolume}</span>
                </div>
              </div>
              <div style={{ padding: '1rem 2rem', borderRadius: '15px', fontWeight: 'bold', background: riskColors.bg, color: riskColors.color, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>{supplier.riskScore}</div>
                <div style={{ fontSize: '0.9rem' }}>{riskColors.label} {language === 'es' ? 'Riesgo' : 'Risk'}</div>
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {supplier.certifications.map((cert, idx) => (
                <span key={idx} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '0.85rem' }}>
                  âœ… {cert}
                </span>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '2rem', background: 'rgba(30, 41, 59, 0.6)' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(45, 55, 72, 0.8)', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#06b6d4' }}>{supplier.annualRevenue}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{language === 'es' ? 'Ingresos Anuales' : 'Annual Revenue'}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(45, 55, 72, 0.8)', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{supplier.products.length}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{language === 'es' ? 'Productos' : 'Products'}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(45, 55, 72, 0.8)', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {Object.values(supplier.contacts).flat().length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{language === 'es' ? 'Contactos Clave' : 'Key Contacts'}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(45, 55, 72, 0.8)', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{supplier.exportVolume}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{language === 'es' ? 'Volumen ExportaciÃ³n' : 'Export Volume'}</div>
            </div>
          </div>

          {/* CONTACTS SECTION */}
          <div style={{ padding: '2rem' }}>
            <button
              onClick={() => toggleSection('contacts')}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '2px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#06b6d4',
                marginBottom: '1.5rem'
              }}
            >
              <span>ðŸ‘¥ {language === 'es' ? 'Directorio de Contactos Inteligentes' : 'Smart Contact Directory'}</span>
              <span>{expandedSections.contacts ? 'â–²' : 'â–¼'}</span>
            </button>

            {expandedSections.contacts && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* COMMERCIAL CONTACTS */}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#06b6d4', marginBottom: '1rem' }}>
                    ðŸ’¼ {language === 'es' ? 'COMPRAS Y PEDIDOS' : 'PURCHASING & ORDERS'}
                  </h3>
                  {supplier.contacts.commercial.map((contact, idx) => (
                    <div key={idx} style={{ 
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(30, 41, 59, 0.6) 100%)', 
                      padding: '1.5rem', 
                      borderRadius: '15px', 
                      marginBottom: '1rem',
                      border: '2px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff', marginBottom: '0.3rem' }}>
                            {contact.name} 
                            {contact.preferredContact && (
                              <span style={{ fontSize: '0.75rem', background: '#10b981', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '10px', marginLeft: '0.5rem' }}>
                                â­ {language === 'es' ? 'PREFERIDO' : 'PREFERRED'}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{contact.title}</div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                          <div style={{ color: '#10b981', fontWeight: 'bold' }}>{contact.responseRate}</div>
                          <div style={{ color: '#94a3b8' }}>{contact.avgResponseTime}</div>
                        </div>
                      </div>
                      
                      <div style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#fff' }}>
                        ðŸ“§ <a href={`mailto:${contact.email}`} style={{ color: '#06b6d4', textDecoration: 'none' }}>{contact.email}</a>
                        <br />
                        ðŸ“± {contact.phone} {contact.whatsapp && <span style={{ color: '#10b981' }}>âœ… WhatsApp</span>}
                      </div>
                      
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                        <strong style={{ color: '#06b6d4' }}>âœ… {language === 'es' ? 'Autorizado para:' : 'Authorized for:'}</strong>
                        <div style={{ color: '#fff', marginTop: '0.3rem' }}>{contact.authorizedFor.join(', ')}</div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button onClick={() => handleSendEmail(contact, 'PO')} style={{ padding: '0.8rem 1.5rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>
                          ðŸ“§ {language === 'es' ? 'Enviar OC' : 'Send PO'}
                        </button>
                        <button onClick={() => setQrModal(contact)} style={{ padding: '0.8rem 1.5rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>
                          ðŸ“± {language === 'es' ? 'CÃ³digo QR' : 'QR Code'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FINANCIAL CONTACTS */}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '1rem' }}>
                    ðŸ’° {language === 'es' ? 'FINANZAS Y PAGOS' : 'FINANCE & PAYMENTS'}
                  </h3>
                  {supplier.contacts.financial.map((contact, idx) => (
                    <div key={idx} style={{ 
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(30, 41, 59, 0.6) 100%)', 
                      padding: '1.5rem', 
                      borderRadius: '15px',
                      border: '2px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff', marginBottom: '0.3rem' }}>
                        {contact.name} 
                        {contact.confidential && (
                          <span style={{ fontSize: '0.75rem', background: '#ef4444', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '10px', marginLeft: '0.5rem' }}>
                            ðŸ”’ {language === 'es' ? 'CONFIDENCIAL' : 'CONFIDENTIAL'}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>{contact.title}</div>
                      
                      <div style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#fff' }}>
                        ðŸ“§ <a href={`mailto:${contact.email}`} style={{ color: '#f59e0b', textDecoration: 'none' }}>{contact.email}</a>
                        <br />
                        ðŸ“± {contact.phone}
                      </div>
                      
                      <button onClick={() => handleSendEmail(contact, 'Factoring')} style={{ padding: '0.8rem 1.5rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        ðŸ’³ {language === 'es' ? 'Proponer Factoraje' : 'Propose Factoring'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EMAIL MODAL */}
      {selectedContact && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.95)', padding: '2rem', borderRadius: '20px', maxWidth: '500px', width: '90%', border: '2px solid #06b6d4' }}>
            <h2 style={{ marginBottom: '1rem', color: '#06b6d4' }}>
              {language === 'es' ? 'Enviar Email' : 'Send Email'}
            </h2>
            <p style={{ marginBottom: '1rem', color: '#fff' }}>
              {language === 'es' ? 'Para:' : 'To:'} <strong style={{ color: '#06b6d4' }}>{selectedContact.contact.email}</strong>
            </p>
            <p style={{ marginBottom: '1.5rem', color: '#94a3b8' }}>
              {language === 'es' ? 'Tipo:' : 'Type:'} <strong>{selectedContact.docType}</strong>
            </p>
            <button onClick={() => setSelectedContact(null)} style={{ padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* QR MODAL */}
      {qrModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.95)', padding: '2rem', borderRadius: '20px', textAlign: 'center', maxWidth: '400px', border: '2px solid #8b5cf6' }}>
            <h2 style={{ marginBottom: '1rem', color: '#8b5cf6' }}>
              ðŸ“± {language === 'es' ? 'CÃ³digo QR de Contacto' : 'Contact QR Code'}
            </h2>
            <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
              <img src={generateQRCode(`${qrModal.name}|${qrModal.email}|${qrModal.phone}`)} alt="QR Code" style={{ width: '200px', height: '200px' }} />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>{qrModal.name}</p>
            <button onClick={() => setQrModal(null)} style={{ padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierIntelligenceSearchEngine;