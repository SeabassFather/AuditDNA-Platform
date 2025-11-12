import React, { useState } from 'react';

const SupplierIntelligence = () => {
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

  // Sample database of suppliers
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
            authorizedFor: ["Purchase Orders (PO)", "Price Inquiries", "Sample Requests"]
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
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a company name to search');
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
      
      if (results.length === 0) {
        alert(`No suppliers found matching "${searchQuery}". Try: ABC, XYZ, or Premium`);
      }
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
    if (score < 30) return { color: '#166534', bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' };
    if (score < 50) return { color: '#92400e', bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' };
    return { color: '#991b1b', bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' };
  };

  const handleSendEmail = (contact, docType) => {
    setSelectedContact({ contact, docType });
  };

  const handleGenerateQR = (item) => {
    setQrModal(item);
  };

  if (!selectedSupplier && searchResults.length === 0) {
    return (
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        minHeight: '100vh',
        padding: '24px' 
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
            padding: '48px', 
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <h1 style={{ 
              fontSize: '40px', 
              fontWeight: '600', 
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px' 
            }}>
              Supplier Intelligence Portal
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px', fontWeight: '400' }}>
              Verified global suppliers with comprehensive intelligence profiles
            </p>

            {/* SEARCH BAR */}
            <div style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Search by company name, location, or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    flex: 1,
                    padding: '16px 24px',
                    fontSize: '16px',
                    border: '2px solid #cbd5e1',
                    borderRadius: '10px',
                    outline: 'none',
                    background: '#ffffff',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  style={{
                    padding: '16px 32px',
                    background: isSearching 
                      ? 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)' 
                      : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSearching ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {isSearching ? '⏳ Searching...' : '🔍 Search'}
                </button>
              </div>
            </div>

            {/* QUICK SEARCH */}
            <div style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '48px' }}>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px', fontWeight: '500' }}>
                Quick search:
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['ABC Agro', 'XYZ Foods', 'Premium Agro', 'Rice', 'Organic', 'India'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setTimeout(() => handleSearch(), 100);
                    }}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      color: '#1e40af',
                      border: '1px solid #bfdbfe',
                      borderRadius: '20px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURES */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px', 
              textAlign: 'left' 
            }}>
              <div style={{ 
                padding: '28px', 
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
                borderRadius: '12px',
                border: '1px solid #bfdbfe',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>👥</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1e40af' }}>
                  Smart Contacts
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                  Direct access to verified decision-makers in sales, finance, and compliance
                </p>
              </div>
              <div style={{ 
                padding: '28px', 
                background: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)', 
                borderRadius: '12px',
                border: '1px solid #fde047',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>🚢</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>
                  Logistics Intelligence
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                  Complete shipping cost breakdowns to USA and Latin American markets
                </p>
              </div>
              <div style={{ 
                padding: '28px', 
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
                borderRadius: '12px',
                border: '1px solid #86efac',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>📊</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#166534' }}>
                  Risk Assessment
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                  Comprehensive compliance scores with FDA, USDA, and ISO certifications
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
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        minHeight: '100vh',
        padding: '24px' 
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={() => setSearchResults([])}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#475569'
              }}
            >
              ← Back to Search
            </button>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
            Found {searchResults.length} supplier{searchResults.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {searchResults.map((supplier) => {
              const riskColors = getRiskColor(supplier.riskScore);
              return (
                <div
                  key={supplier.id}
                  onClick={() => handleSelectSupplier(supplier)}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    padding: '28px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    border: '2px solid #e2e8f0',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#60a5fa';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
                        {supplier.name}
                      </h3>
                      <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#64748b', marginBottom: '16px', fontWeight: '500' }}>
                        <span>📍 {supplier.location}</span>
                        <span>🏢 Est. {supplier.established}</span>
                        <span>💰 {supplier.annualRevenue}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {supplier.certifications.map((cert, idx) => (
                          <span key={idx} style={{ 
                            padding: '6px 14px', 
                            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
                            color: '#166534', 
                            borderRadius: '16px', 
                            fontSize: '12px',
                            fontWeight: '600',
                            border: '1px solid #86efac'
                          }}>
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '14px 28px', 
                      borderRadius: '10px', 
                      fontWeight: '600', 
                      background: riskColors.bg,
                      color: riskColors.color,
                      border: '1px solid rgba(0,0,0,0.1)',
                      fontSize: '15px'
                    }}>
                      Risk: {supplier.riskScore}
                    </div>
                  </div>
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '16px', 
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <strong style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>Products:</strong>
                    <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '8px' }}>{supplier.products.join(', ')}</span>
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'right' }}>
                    <span style={{ 
                      display: 'inline-block',
                      padding: '10px 24px', 
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                      color: '#ffffff', 
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      fontWeight: '600'
                    }}>
                      View Intelligence Profile →
                    </span>
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
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
      minHeight: '100vh',
      padding: '24px' 
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setSelectedSupplier(null)}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#475569'
            }}
          >
            ← Back to Results
          </button>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
          borderRadius: '16px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
            color: '#ffffff', 
            padding: '40px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h1 style={{ fontSize: '36px', fontWeight: '600', marginBottom: '16px' }}>{supplier.name}</h1>
                <div style={{ display: 'flex', gap: '28px', fontSize: '15px', opacity: 0.95, fontWeight: '500' }}>
                  <span>📍 {supplier.location}</span>
                  <span>🏢 Est. {supplier.established}</span>
                  <span>🌍 {supplier.exportVolume}</span>
                </div>
              </div>
              <div style={{ 
                padding: '14px 28px', 
                borderRadius: '10px', 
                fontWeight: '600', 
                background: riskColors.bg,
                color: riskColors.color,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                Risk Score: {supplier.riskScore}
              </div>
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {supplier.certifications.map((cert, idx) => (
                <span key={idx} style={{ 
                  padding: '8px 18px', 
                  background: 'rgba(255,255,255,0.25)', 
                  borderRadius: '20px', 
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            padding: '32px', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '600', color: '#3b82f6', marginBottom: '4px' }}>
                {supplier.annualRevenue}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Annual Revenue</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '600', color: '#10b981', marginBottom: '4px' }}>
                {supplier.products.length}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Product Categories</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '600', color: '#f59e0b', marginBottom: '4px' }}>
                {Object.values(supplier.contacts).flat().length}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Key Contacts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '600', color: '#8b5cf6', marginBottom: '4px' }}>
                {supplier.certifications.length}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Certifications</div>
            </div>
          </div>

          {/* Contacts Section */}
          <div style={{ padding: '32px' }}>
            <button
              onClick={() => toggleSection('contacts')}
              style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'none',
                border: 'none',
                fontSize: '22px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '24px',
                color: '#1e293b',
                padding: '12px 0'
              }}
            >
              <span>👥 Contact Directory</span>
              <span style={{ fontSize: '18px', color: '#64748b' }}>
                {expandedSections.contacts ? '▲' : '▼'}
              </span>
            </button>

            {expandedSections.contacts && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Commercial */}
                <div>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#1e293b', 
                    marginBottom: '16px',
                    letterSpacing: '0.5px'
                  }}>
                    💼 COMMERCIAL & PURCHASING
                  </h3>
                  {supplier.contacts.commercial.map((contact, idx) => (
                    <div key={idx} style={{ 
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
                      padding: '24px', 
                      borderRadius: '12px', 
                      marginBottom: '16px',
                      borderLeft: '4px solid #10b981',
                      border: '1px solid #86efac'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '17px', color: '#1e293b', marginBottom: '4px' }}>
                            {contact.name} 
                            {contact.preferredContact && (
                              <span style={{ 
                                fontSize: '11px', 
                                background: '#10b981', 
                                color: '#ffffff', 
                                padding: '3px 10px', 
                                borderRadius: '12px',
                                marginLeft: '10px',
                                fontWeight: '600'
                              }}>
                                ⭐ PREFERRED
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>{contact.title}</div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '13px' }}>
                          <div style={{ color: '#10b981', fontWeight: '600', marginBottom: '2px' }}>
                            {contact.responseRate}
                          </div>
                          <div style={{ color: '#64748b', fontWeight: '500' }}>
                            {contact.avgResponseTime}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', marginBottom: '12px', color: '#475569', fontWeight: '500' }}>
                        📧 {contact.email} | 📱 {contact.phone}
                      </div>
                      <div style={{ 
                        background: '#ffffff', 
                        padding: '14px', 
                        borderRadius: '8px', 
                        marginBottom: '12px', 
                        fontSize: '13px',
                        border: '1px solid #86efac'
                      }}>
                        <strong style={{ color: '#166534', fontWeight: '600' }}>✓ Authorized for:</strong>
                        <span style={{ color: '#475569', marginLeft: '8px' }}>
                          {contact.authorizedFor.join(', ')}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => handleSendEmail(contact, 'PO')} 
                          style={{ 
                            padding: '8px 16px', 
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                            color: '#ffffff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            fontSize: '13px', 
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          📧 Send PO
                        </button>
                        <button 
                          onClick={() => handleGenerateQR(contact)} 
                          style={{ 
                            padding: '8px 16px', 
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
                            color: '#ffffff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            fontSize: '13px', 
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          📱 QR Code
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial */}
                <div>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#1e293b', 
                    marginBottom: '16px',
                    letterSpacing: '0.5px'
                  }}>
                    💰 FINANCE & PAYMENTS
                  </h3>
                  {supplier.contacts.financial.map((contact, idx) => (
                    <div key={idx} style={{ 
                      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', 
                      padding: '24px', 
                      borderRadius: '12px', 
                      borderLeft: '4px solid #f59e0b',
                      border: '1px solid #fde047'
                    }}>
                      <div style={{ fontWeight: '600', fontSize: '17px', marginBottom: '4px', color: '#1e293b' }}>
                        {contact.name} 
                        {contact.confidential && (
                          <span style={{ 
                            fontSize: '11px', 
                            background: '#ef4444', 
                            color: '#ffffff', 
                            padding: '3px 10px', 
                            borderRadius: '12px',
                            marginLeft: '10px',
                            fontWeight: '600'
                          }}>
                            🔒 CONFIDENTIAL
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px', fontWeight: '500' }}>
                        {contact.title}
                      </div>
                      <div style={{ fontSize: '14px', marginBottom: '16px', color: '#475569', fontWeight: '500' }}>
                        📧 {contact.email} | 📱 {contact.phone}
                      </div>
                      <button 
                        onClick={() => handleSendEmail(contact, 'Factoring')} 
                        style={{ 
                          padding: '8px 16px', 
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                          color: '#ffffff', 
                          border: 'none', 
                          borderRadius: '6px', 
                          fontSize: '13px', 
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        💳 Propose Factoring
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {selectedContact && (
          <div style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15, 23, 42, 0.6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
              padding: '32px', 
              borderRadius: '16px', 
              maxWidth: '500px', 
              width: '90%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '24px', fontWeight: '600' }}>
                Send Email
              </h2>
              <p style={{ marginBottom: '24px', color: '#64748b', fontSize: '15px' }}>
                <strong>To:</strong> {selectedContact.contact.email}
              </p>
              <button 
                onClick={() => setSelectedContact(null)} 
                style={{ 
                  padding: '10px 24px', 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {qrModal && (
          <div style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15, 23, 42, 0.6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
              padding: '32px', 
              borderRadius: '16px', 
              textAlign: 'center', 
              maxWidth: '400px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '24px', fontWeight: '600' }}>
                📱 Contact QR Code
              </h2>
              <div style={{ 
                width: '200px', 
                height: '200px', 
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', 
                margin: '0 auto 24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#64748b',
                borderRadius: '12px',
                border: '2px solid #cbd5e1',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                QR Code Preview
              </div>
              <button 
                onClick={() => setQrModal(null)} 
                style={{ 
                  padding: '10px 24px', 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierIntelligence;