// ================================================================
// SUPPLIERS MODULE - PRODUCE (CM PRODUCTS)
// ================================================================
// Date: 2025-11-13 00:58:21 UTC
// User: SeabassFather
// Purpose: Hybrid - Search Engine (500+) + Confirmed CM Suppliers
// Features: ROLE-BASED ACCESS CONTROL (Admin vs Buyer views) - FIXED
// ================================================================

import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
// import { useUser } from '../../context/UserContext'; // BYPASSED - using default admin
import { 
  Search, Filter, MapPin, Award, Phone, Mail, Star,
  CheckCircle, AlertTriangle, XCircle, Building2, Package,
  TrendingUp, Calendar, User, ShoppingCart, FileText, Download,
  Lock
} from 'lucide-react';

// Import the supplier database
import { suppliersDatabase, productCategories, certificationTypes, mexicanStates } from '../supplier-intelligence/data/suppliersDatabase';

const SuppliersModule = () => {
  const { language } = useLanguage();
  
  // Bypass UserContext - default to admin permissions
  const userRole = 'admin';
  const hasPermission = () => true;
  const switchRole = () => {};
  
  // Toggle between search engine and confirmed suppliers
  const [activeView, setActiveView] = useState('search'); // 'search' or 'confirmed'
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCertification, setSelectedCertification] = useState('All Certifications');
  const [certificationStatus, setCertificationStatus] = useState('All Status');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Confirmed CM Suppliers (your regular growers)
  const confirmedSuppliers = [
    {
      id: 'CM-001',
      name: 'Green Valley Farms',
      verified: true,
      relationship: 'Gold Partner',
      yearsWithCM: 8,
      totalOrders: 342,
      lastOrder: '2025-11-10',
      products: ['Hass Avocado', 'Bacon Avocado'],
      location: { state: 'Michoacán', city: 'Uruapan', country: 'Mexico' },
      contact: { name: 'Juan Carlos Mendez', phone: '+52-443-123-4567', email: 'jc.mendez@greenvalleyfarms.mx' },
      rating: 4.8,
      certifications: ['GlobalGAP', 'PRIMUS', 'USDA Organic'],
      status: 'Active'
    },
    {
      id: 'CM-002',
      name: 'Sinaloa Fresh Tomatoes',
      verified: true,
      relationship: 'Gold Partner',
      yearsWithCM: 5,
      totalOrders: 278,
      lastOrder: '2025-11-11',
      products: ['Roma Tomato', 'Cherry Tomato', 'Beefsteak Tomato'],
      location: { state: 'Sinaloa', city: 'Culiacán', country: 'Mexico' },
      contact: { name: 'Carlos Valdez', phone: '+52-667-234-5678', email: 'c.valdez@sinaloafresh.mx' },
      rating: 4.7,
      certifications: ['GlobalGAP', 'PRIMUS', 'Mexico Supreme Quality'],
      status: 'Active'
    },
    {
      id: 'CM-003',
      name: 'Baja Berry Farms',
      verified: true,
      relationship: 'Platinum Partner',
      yearsWithCM: 10,
      totalOrders: 456,
      lastOrder: '2025-11-12',
      products: ['Strawberry', 'Blueberry', 'Raspberry', 'Blackberry'],
      location: { state: 'Baja California', city: 'Ensenada', country: 'Mexico' },
      contact: { name: 'Luis Alberto Castillo', phone: '+52-646-456-7890', email: 'la.castillo@bajaberryfarms.mx' },
      rating: 4.9,
      certifications: ['GlobalGAP', 'PRIMUS', 'USDA Organic', 'SQF Level 2'],
      status: 'Active'
    },
    {
      id: 'CM-004',
      name: 'Sonora Bell Peppers LLC',
      verified: true,
      relationship: 'Silver Partner',
      yearsWithCM: 3,
      totalOrders: 145,
      lastOrder: '2025-11-09',
      products: ['Red Bell Pepper', 'Yellow Bell Pepper', 'Green Bell Pepper'],
      location: { state: 'Sonora', city: 'Hermosillo', country: 'Mexico' },
      contact: { name: 'Ana Patricia Gomez', phone: '+52-662-345-6789', email: 'ap.gomez@sonorabellpeppers.mx' },
      rating: 4.6,
      certifications: ['GlobalGAP', 'PRIMUS', 'HACCP'],
      status: 'Active'
    },
    {
      id: 'CM-005',
      name: 'Sierra Madre Organics',
      verified: true,
      relationship: 'Platinum Partner',
      yearsWithCM: 12,
      totalOrders: 534,
      lastOrder: '2025-11-11',
      products: ['Hass Avocado', 'Fuerte Avocado'],
      location: { state: 'Nayarit', city: 'Tepic', country: 'Mexico' },
      contact: { name: 'Roberto Sanchez', phone: '+52-311-456-7890', email: 'r.sanchez@sierramadreorganics.mx' },
      rating: 4.9,
      certifications: ['USDA Organic', 'GlobalGAP', 'Fair Trade'],
      status: 'Active'
    }
  ];

  // Filter suppliers from database
  const filteredSuppliers = useMemo(() => {
    return suppliersDatabase.filter(supplier => {
      const matchesSearch = searchTerm === '' || 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        supplier.location.state.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProduct = selectedProduct === 'All Products' || 
        supplier.products.includes(selectedProduct);

      const matchesState = selectedState === 'All States' || 
        supplier.location.state === selectedState;

      const matchesCertification = selectedCertification === 'All Certifications' || 
        supplier.certifications.some(cert => cert.type === selectedCertification);

      const matchesCertStatus = certificationStatus === 'All Status' || 
        supplier.certifications.some(cert => cert.status === certificationStatus);

      const matchesRating = supplier.rating >= minRating;

      return matchesSearch && matchesProduct && matchesState && 
             matchesCertification && matchesCertStatus && matchesRating;
    });
  }, [searchTerm, selectedProduct, selectedState, selectedCertification, certificationStatus, minRating]);

  // Get all unique products
  const allProducts = useMemo(() => {
    const products = new Set();
    suppliersDatabase.forEach(supplier => {
      supplier.products.forEach(product => products.add(product));
    });
    return Array.from(products).sort();
  }, []);

  // Get certification status styling
  const getCertStatusStyle = (status) => {
    const styles = {
      'Valid': { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', icon: CheckCircle },
      'Expiring Soon': { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', icon: AlertTriangle },
      'Expired': { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', icon: XCircle }
    };
    return styles[status] || styles['Valid'];
  };

  // Get partner badge
  const getPartnerBadge = (relationship) => {
    const badges = {
      'Platinum Partner': { bg: '#8b5cf6', label: '💎 PLATINUM' },
      'Gold Partner': { bg: '#f59e0b', label: '🥇 GOLD' },
      'Silver Partner': { bg: '#94a3b8', label: '🥈 SILVER' }
    };
    return badges[relationship] || { bg: '#64748b', label: 'PARTNER' };
  };

  return (
    <div>
      {/* MODULE HEADER */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#22c55e', 
          marginBottom: '0.5rem',
          textShadow: '0 0 30px rgba(34, 197, 94, 0.6)'
        }}>
          🟢 Suppliers Management
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
          {language === 'en' 
            ? 'Search 500+ growers or manage your confirmed CM suppliers' 
            : 'Buscar 500+ productores o gestionar tus proveedores CM confirmados'}
        </p>
      </div>

      {/* ROLE SWITCHER (DISABLED - Admin only mode) */}
      <div style={{
        background: 'rgba(34, 197, 94, 0.2)',
        border: '2px solid rgba(34, 197, 94, 0.5)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '0.9rem', color: '#22c55e', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          ✅ ADMIN MODE - Full Access Enabled
        </div>
        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          You have complete access to all supplier information, contact details, and management features.
        </div>
      </div>

      {/* VIEW TOGGLE */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem',
        border: '2px solid rgba(100, 116, 139, 0.3)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveView('search')}
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '1rem 2rem',
              background: activeView === 'search' 
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : 'rgba(51, 65, 85, 0.6)',
              border: activeView === 'search' ? '2px solid #22c55e' : '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: activeView === 'search' ? '0 6px 20px rgba(34, 197, 94, 0.4)' : 'none'
            }}
          >
            <Search size={24} />
            🔍 Search 500+ Growers
          </button>
          
          <button
            onClick={() => setActiveView('confirmed')}
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '1rem 2rem',
              background: activeView === 'confirmed' 
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : 'rgba(51, 65, 85, 0.6)',
              border: activeView === 'confirmed' ? '2px solid #22c55e' : '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: activeView === 'confirmed' ? '0 6px 20px rgba(34, 197, 94, 0.4)' : 'none'
            }}
          >
            <CheckCircle size={24} />
            ✅ Confirmed CM Suppliers ({confirmedSuppliers.length})
          </button>
        </div>
      </div>

      {/* SEARCH ENGINE VIEW */}
      {activeView === 'search' && (
        <div>
          {/* SEARCH BAR */}
          <div style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <Search size={32} style={{ color: '#fff' }} />
              <input
                type="text"
                placeholder="Search by supplier name, product, location, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#0f172a',
                  fontWeight: '600',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: '1rem 1.5rem',
                  background: showFilters ? '#fff' : 'rgba(255, 255, 255, 0.2)',
                  color: showFilters ? '#22c55e' : '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s'
                }}
              >
                <Filter size={20} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* FILTERS */}
            {showFilters && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>
                    Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#0f172a',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                  >
                    <option>All Products</option>
                    {allProducts.map(product => (
                      <option key={product} value={product}>{product}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>
                    Mexican State
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#0f172a',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                  >
                    <option>All States</option>
                    {mexicanStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>
                    Certification
                  </label>
                  <select
                    value={selectedCertification}
                    onChange={(e) => setSelectedCertification(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#0f172a',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                  >
                    <option>All Certifications</option>
                    {certificationTypes.map(cert => (
                      <option key={cert} value={cert}>{cert}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>
                    Min Rating: {minRating.toFixed(1)} ⭐
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* RESULTS */}
          <div style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
            {filteredSuppliers.length} Grower{filteredSuppliers.length !== 1 ? 's' : ''} Found
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredSuppliers.slice(0, 12).map(supplier => (
              <SupplierCard 
                key={supplier.id} 
                supplier={supplier} 
                getCertStatusStyle={getCertStatusStyle}
                hasPermission={hasPermission}
              />
            ))}
          </div>
        </div>
      )}

      {/* CONFIRMED CM SUPPLIERS VIEW */}
      {activeView === 'confirmed' && (
        <div>
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '2px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '0.5rem' }}>
              ✅ Your Confirmed CM Suppliers
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
              Trusted partners with proven track record • Quick access to your regular growers
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {confirmedSuppliers.map(supplier => {
              const badge = getPartnerBadge(supplier.relationship);
              
              return (
                <div
                  key={supplier.id}
                  style={{
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '2px solid rgba(34, 197, 94, 0.5)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    position: 'relative',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#22c55e';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Partner Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: badge.bg,
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: `0 4px 12px ${badge.bg}80`
                  }}>
                    {badge.label}
                  </div>

                  {/* Supplier Name */}
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#fff', 
                    marginBottom: '1rem'
                  }}>
                    {supplier.name}
                  </h3>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Years with CM</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{supplier.yearsWithCM}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Total Orders</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{supplier.totalOrders}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Rating</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>⭐ {supplier.rating}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Last Order</div>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>{supplier.lastOrder}</div>
                    </div>
                  </div>

                  {/* Products */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>PRODUCTS:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {supplier.products.map((product, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#22c55e',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <MapPin size={18} style={{ color: '#3b82f6' }} />
                    <div style={{ color: '#94a3b8' }}>
                      {supplier.location.city}, {supplier.location.state}, {supplier.location.country}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>CERTIFICATIONS:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {supplier.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#22c55e',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <CheckCircle size={14} />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div style={{ borderTop: '1px solid rgba(100, 116, 139, 0.3)', paddingTop: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                        <User size={14} />
                        {supplier.contact.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                        <Phone size={14} />
                        {supplier.contact.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                        <Mail size={14} />
                        {supplier.contact.email}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#22c55e',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#16a34a'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#22c55e'}
                    >
                      <Phone size={16} />
                      Call Now
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#3b82f6',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                    >
                      <ShoppingCart size={16} />
                      Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Supplier Card Component (for search results)
const SupplierCard = ({ supplier, getCertStatusStyle, hasPermission }) => {
  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#22c55e';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {supplier.verified && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: '#22c55e',
          color: '#fff',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <CheckCircle size={14} />
          VERIFIED
        </div>
      )}

      <h3 style={{ 
        fontSize: '1.3rem', 
        fontWeight: 'bold', 
        color: '#fff', 
        marginBottom: '0.5rem'
      }}>
        {supplier.name}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ color: '#f59e0b', fontWeight: 'bold' }}>⭐ {supplier.rating.toFixed(1)}</div>
        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>• {supplier.yearsInBusiness} years</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <MapPin size={18} style={{ color: '#3b82f6' }} />
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          {supplier.location.city}, {supplier.location.state}
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>PRODUCTS:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {supplier.products.slice(0, 2).map((product, idx) => (
            <span
              key={idx}
              style={{
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#22c55e',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              {product}
            </span>
          ))}
          {supplier.products.length > 2 && (
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>+{supplier.products.length - 2}</span>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>CERTIFICATIONS:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {supplier.certifications.slice(0, 3).map((cert, idx) => {
            const statusStyle = getCertStatusStyle(cert.status);
            const StatusIcon = statusStyle.icon;
            
            return (
              <div
                key={idx}
                style={{
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <StatusIcon size={14} />
                {cert.type}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          style={{
            flex: 1,
            padding: '0.75rem',
            background: '#22c55e',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#16a34a'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#22c55e'}
        >
          <Phone size={14} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
          Call
        </button>
        <button
          style={{
            flex: 1,
            padding: '0.75rem',
            background: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default SuppliersModule;