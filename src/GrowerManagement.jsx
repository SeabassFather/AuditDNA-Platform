// AUDITDNA GROWER MANAGEMENT MODULE
// Enterprise Grower Directory & Compliance System
// MexaUSA Food Group, Inc. | CEO: Saul Garcia | NMLS #337526

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Search, Filter, Upload, Download, Edit, Trash2,
  Eye, Phone, Mail, MapPin, Package, FileCheck, TrendingUp,
  AlertCircle, CheckCircle, X, ChevronRight, RefreshCw
} from 'lucide-react';

export default function GrowerManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrower, setSelectedGrower] = useState(null);
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterCommodity, setFilterCommodity] = useState('all');
  const [filterCert, setFilterCert] = useState('all');

  // Mock data - would come from backend API
  const growers = [
    {
      growerId: 'MX-AVO-001',
      growerName: 'AgroFrutas del Sur',
      country: 'Mexico',
      region: 'Michoacán',
      city: 'Uruapan',
      mainCommodity: 'Avocado',
      varieties: ['Hass', 'Fuerte'],
      packTypes: ['32ct', '36ct', '48ct'],
      certs: ['PrimusGFS', 'GlobalGAP'],
      contact: {
        person: 'Carlos Méndez',
        phone: '+52 443-882-4421',
        email: 'info@agrofrutas.mx'
      },
      yearsActive: 12,
      farmSizeAcres: 580,
      waterSource: 'Deep Well',
      soilType: 'Volcanic',
      labReportURL: 'https://labs/aqua/2025_01.pdf',
      primusGFS: true,
      globalGAP: true,
      usdaRegistered: true,
      traceabilityId: 'TR-MX-0001',
      factoringEligible: true,
      paymentTerms: 'Net 30',
      avgPO: 180000,
      avgInvoice: 220000,
      status: 'Active',
      riskScore: 87
    },
    {
      growerId: 'MX-STR-002',
      growerName: 'Berryland Produce',
      country: 'Mexico',
      region: 'Jalisco',
      city: 'Zapotlán',
      mainCommodity: 'Strawberry',
      varieties: ['San Andreas', 'Albion'],
      packTypes: ['8x1lb'],
      certs: ['GlobalGAP'],
      contact: {
        person: 'Ana L. Ríos',
        phone: '+52 33-2145-6620',
        email: 'ventas@berryland.mx'
      },
      yearsActive: 8,
      farmSizeAcres: 260,
      waterSource: 'Rain + Drip',
      soilType: 'Loam',
      labReportURL: 'https://labs/soil/2025_02.pdf',
      primusGFS: false,
      globalGAP: true,
      usdaRegistered: true,
      traceabilityId: 'TR-MX-0002',
      factoringEligible: false,
      paymentTerms: 'Net 45',
      avgPO: 60000,
      avgInvoice: 70000,
      status: 'Active',
      riskScore: 79
    },
    {
      growerId: 'US-AVO-004',
      growerName: 'WestCal Produce',
      country: 'USA',
      region: 'California',
      city: 'Escondido',
      mainCommodity: 'Avocado',
      varieties: ['Hass'],
      packTypes: ['36ct', '48ct'],
      certs: ['USDA GAP', 'GlobalGAP'],
      contact: {
        person: 'Peter Lang',
        phone: '+1 760-882-7744',
        email: 'trade@westcal.com'
      },
      yearsActive: 18,
      farmSizeAcres: 420,
      waterSource: 'Municipal',
      soilType: 'Clay Loam',
      labReportURL: 'https://labs/water/2024_11.pdf',
      primusGFS: false,
      globalGAP: true,
      usdaRegistered: true,
      traceabilityId: 'TR-US-0004',
      factoringEligible: true,
      paymentTerms: 'Net 15',
      avgPO: 250000,
      avgInvoice: 310000,
      status: 'Active',
      riskScore: 91
    }
  ];

  const stats = {
    totalGrowers: growers.length,
    activeGrowers: growers.filter(g => g.status === 'Active').length,
    avgRiskScore: Math.round(growers.reduce((sum, g) => sum + g.riskScore, 0) / growers.length),
    factoringEligible: growers.filter(g => g.factoringEligible).length
  };

  const filteredGrowers = growers.filter(grower => {
    const matchesSearch = grower.growerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grower.growerId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = filterRegion === 'all' || grower.region === filterRegion;
    const matchesCommodity = filterCommodity === 'all' || grower.mainCommodity === filterCommodity;
    const matchesCert = filterCert === 'all' || grower.certs.includes(filterCert);
    
    return matchesSearch && matchesRegion && matchesCommodity && matchesCert;
  });

  // PROFESSIONAL STYLES
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },

    header: {
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '2.5rem 0',
      borderBottom: '4px solid #059669'
    },

    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem'
    },

    companyName: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '0.5rem',
      letterSpacing: '-0.5px',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },

    systemName: {
      fontSize: '1.1rem',
      color: '#94a3b8',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },

    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '3rem 2rem'
    },

    statsBar: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },

    statCard: {
      background: '#f8fafc',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },

    statIcon: {
      width: '48px',
      height: '48px',
      background: '#059669',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      flexShrink: 0
    },

    statValue: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#0f172a',
      lineHeight: 1
    },

    statLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginTop: '0.25rem'
    },

    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      gap: '1rem',
      flexWrap: 'wrap'
    },

    searchContainer: {
      flex: '1',
      minWidth: '300px',
      position: 'relative'
    },

    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b'
    },

    searchInput: {
      width: '100%',
      paddingLeft: '3rem',
      paddingRight: '1rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      background: '#f8fafc',
      border: '2px solid #cbd5e1',
      borderRadius: '4px',
      fontSize: '1rem',
      outline: 'none',
      fontWeight: '500'
    },

    filters: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },

    filterSelect: {
      padding: '1rem',
      background: '#f8fafc',
      border: '2px solid #cbd5e1',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      outline: 'none'
    },

    actionButtons: {
      display: 'flex',
      gap: '1rem'
    },

    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      borderRadius: '4px',
      fontWeight: '700',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },

    primaryButton: {
      background: '#059669',
      color: 'white'
    },

    secondaryButton: {
      background: '#64748b',
      color: 'white'
    },

    growerTable: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden'
    },

    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },

    tableHeader: {
      background: '#f8fafc',
      borderBottom: '2px solid #e2e8f0'
    },

    th: {
      padding: '1rem',
      textAlign: 'left',
      fontSize: '0.75rem',
      fontWeight: '700',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    tr: {
      borderBottom: '1px solid #f1f5f9',
      transition: 'background 0.2s'
    },

    td: {
      padding: '1rem',
      fontSize: '0.875rem',
      color: '#0f172a'
    },

    growerName: {
      fontWeight: '700',
      color: '#0f172a'
    },

    riskScore: (score) => ({
      fontWeight: '700',
      fontSize: '1.1rem',
      color: score >= 85 ? '#059669' : score >= 70 ? '#f59e0b' : '#dc2626'
    }),

    badge: (type) => {
      const colors = {
        cert: { bg: '#d1fae5', text: '#065f46' },
        factoring: { bg: '#dbeafe', text: '#1e40af' },
        status: { bg: '#d1fae5', text: '#065f46' }
      };
      const color = colors[type] || colors.status;
      return {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        background: color.bg,
        color: color.text,
        marginRight: '0.25rem',
        marginBottom: '0.25rem'
      };
    },

    actionIcons: {
      display: 'flex',
      gap: '0.5rem'
    },

    iconButton: {
      padding: '0.5rem',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: '#64748b',
      transition: 'color 0.2s'
    },

    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    },

    modalContent: {
      background: '#ffffff',
      borderRadius: '8px',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative'
    },

    modalHeader: {
      padding: '2rem',
      borderBottom: '2px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#0f172a'
    },

    closeButton: {
      padding: '0.5rem',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: '#64748b'
    },

    modalBody: {
      padding: '2rem'
    },

    section: {
      marginBottom: '2rem'
    },

    sectionTitle: {
      fontSize: '1rem',
      fontWeight: '700',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      borderBottom: '2px solid #f1f5f9'
    },

    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },

    infoItem: {
      marginBottom: '1rem'
    },

    infoLabel: {
      fontSize: '0.75rem',
      fontWeight: '700',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '0.25rem'
    },

    infoValue: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#0f172a'
    },

    contactButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Professional Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.companyName}>
            <Users size={40} />
            AuditDNA Grower Management
          </h1>
          <p style={styles.systemName}>
            Enterprise Grower Directory & Compliance System
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        
        {/* Statistics Bar */}
        <div style={styles.statsBar}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <Users size={24} />
            </div>
            <div>
              <div style={styles.statValue}>{stats.totalGrowers}</div>
              <div style={styles.statLabel}>Total Growers</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <CheckCircle size={24} />
            </div>
            <div>
              <div style={styles.statValue}>{stats.activeGrowers}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div style={styles.statValue}>{stats.avgRiskScore}</div>
              <div style={styles.statLabel}>Avg Risk Score</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <Package size={24} />
            </div>
            <div>
              <div style={styles.statValue}>{stats.factoringEligible}</div>
              <div style={styles.statLabel}>Factoring Eligible</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <div style={styles.searchContainer}>
            <Search style={styles.searchIcon} size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or ID..."
              style={styles.searchInput}
              onFocus={(e) => e.target.style.borderColor = '#059669'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
          
          <div style={styles.filters}>
            <select 
              value={filterRegion} 
              onChange={(e) => setFilterRegion(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Regions</option>
              <option value="Michoacán">Michoacán</option>
              <option value="Jalisco">Jalisco</option>
              <option value="California">California</option>
            </select>
            
            <select 
              value={filterCommodity} 
              onChange={(e) => setFilterCommodity(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Commodities</option>
              <option value="Avocado">Avocado</option>
              <option value="Strawberry">Strawberry</option>
            </select>
            
            <select 
              value={filterCert} 
              onChange={(e) => setFilterCert(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Certifications</option>
              <option value="PrimusGFS">PrimusGFS</option>
              <option value="GlobalGAP">GlobalGAP</option>
              <option value="USDA GAP">USDA GAP</option>
            </select>
          </div>
          
          <div style={styles.actionButtons}>
            <button style={{ ...styles.button, ...styles.primaryButton }}>
              <Upload size={20} />
              Import
            </button>
            <button style={{ ...styles.button, ...styles.secondaryButton }}>
              <Download size={20} />
              Export
            </button>
          </div>
        </div>

        {/* Grower Table */}
        <div style={styles.growerTable}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>Grower ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Commodity</th>
                <th style={styles.th}>Certifications</th>
                <th style={styles.th}>Risk Score</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrowers.map((grower, index) => (
                <tr 
                  key={index} 
                  style={styles.tr}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={styles.td}>{grower.growerId}</td>
                  <td style={{ ...styles.td, ...styles.growerName }}>{grower.growerName}</td>
                  <td style={styles.td}>{grower.city}, {grower.region}</td>
                  <td style={styles.td}>{grower.mainCommodity}</td>
                  <td style={styles.td}>
                    {grower.certs.map((cert, idx) => (
                      <span key={idx} style={styles.badge('cert')}>{cert}</span>
                    ))}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.riskScore(grower.riskScore)}>{grower.riskScore}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge('status')}>{grower.status}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionIcons}>
                      <button 
                        style={styles.iconButton}
                        onClick={() => setSelectedGrower(grower)}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#059669'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        style={styles.iconButton}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0891b2'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        style={styles.iconButton}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Grower Profile Modal */}
      {selectedGrower && (
        <div style={styles.modal} onClick={() => setSelectedGrower(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedGrower.growerName}</h2>
              <button style={styles.closeButton} onClick={() => setSelectedGrower(null)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              
              {/* Basic Information */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Basic Information</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Grower ID</div>
                    <div style={styles.infoValue}>{selectedGrower.growerId}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Country</div>
                    <div style={styles.infoValue}>{selectedGrower.country}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Region</div>
                    <div style={styles.infoValue}>{selectedGrower.region}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>City</div>
                    <div style={styles.infoValue}>{selectedGrower.city}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Years Active</div>
                    <div style={styles.infoValue}>{selectedGrower.yearsActive} years</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Farm Size</div>
                    <div style={styles.infoValue}>{selectedGrower.farmSizeAcres} acres</div>
                  </div>
                </div>
              </div>

              {/* Production Details */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Production Details</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Main Commodity</div>
                    <div style={styles.infoValue}>{selectedGrower.mainCommodity}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Varieties</div>
                    <div style={styles.infoValue}>{selectedGrower.varieties.join(', ')}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Pack Types</div>
                    <div style={styles.infoValue}>{selectedGrower.packTypes.join(', ')}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Water Source</div>
                    <div style={styles.infoValue}>{selectedGrower.waterSource}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Soil Type</div>
                    <div style={styles.infoValue}>{selectedGrower.soilType}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Traceability ID</div>
                    <div style={styles.infoValue}>{selectedGrower.traceabilityId}</div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Certifications & Compliance</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Certifications</div>
                    <div>
                      {selectedGrower.certs.map((cert, idx) => (
                        <span key={idx} style={styles.badge('cert')}>{cert}</span>
                      ))}
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>PrimusGFS</div>
                    <div style={styles.infoValue}>{selectedGrower.primusGFS ? '✓ Certified' : '✗ Not Certified'}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>GlobalGAP</div>
                    <div style={styles.infoValue}>{selectedGrower.globalGAP ? '✓ Certified' : '✗ Not Certified'}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>USDA Registered</div>
                    <div style={styles.infoValue}>{selectedGrower.usdaRegistered ? '✓ Yes' : '✗ No'}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Risk Score</div>
                    <div style={styles.riskScore(selectedGrower.riskScore)}>{selectedGrower.riskScore}/100</div>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Financial Information</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Payment Terms</div>
                    <div style={styles.infoValue}>{selectedGrower.paymentTerms}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Avg PO Value</div>
                    <div style={styles.infoValue}>${selectedGrower.avgPO.toLocaleString()}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Avg Invoice</div>
                    <div style={styles.infoValue}>${selectedGrower.avgInvoice.toLocaleString()}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Factoring Eligible</div>
                    <div>
                      {selectedGrower.factoringEligible ? (
                        <span style={styles.badge('factoring')}>Eligible</span>
                      ) : (
                        <span style={{ ...styles.badge('factoring'), background: '#fee2e2', color: '#991b1b' }}>Not Eligible</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Contact Person</div>
                    <div style={styles.infoValue}>{selectedGrower.contact.person}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Phone</div>
                    <div style={styles.infoValue}>{selectedGrower.contact.phone}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Email</div>
                    <div style={styles.infoValue}>{selectedGrower.contact.email}</div>
                  </div>
                </div>
                
                <div style={styles.contactButtons}>
                  <button style={{ ...styles.button, ...styles.primaryButton }}>
                    <Phone size={20} />
                    Call
                  </button>
                  <button style={{ ...styles.button, ...styles.secondaryButton }}>
                    <Mail size={20} />
                    Email
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}