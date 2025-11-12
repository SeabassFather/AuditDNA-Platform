// AUDITDNA FOOD SAFETY MODULE
// Enterprise Food Safety & Compliance Management System
// MexaUSA Food Group, Inc. | CEO: Saul Garcia | NMLS #337526

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Upload, FileCheck, AlertTriangle, CheckCircle,
  Calendar, Users, FileText, TrendingUp, Clock, Search,
  Download, Eye, Edit, Trash2, Plus, RefreshCw
} from 'lucide-react';

export default function FoodSafetyDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - would come from backend
  const safetyMetrics = [
    { label: 'Safety Score', value: '94/100', change: '+3', icon: Shield, status: 'good' },
    { label: 'Active Certifications', value: '12', change: '2 expiring', icon: FileCheck, status: 'warning' },
    { label: 'Pending Audits', value: '3', change: 'Next: 5 days', icon: Calendar, status: 'neutral' },
    { label: 'Open CAPAs', value: '2', change: '-1 from last week', icon: AlertTriangle, status: 'good' }
  ];

  const certifications = [
    { name: 'PrimusGFS', issuer: 'PrimusGFS', expiry: '2025-08-15', status: 'active', score: 96 },
    { name: 'GLOBAL G.A.P.', issuer: 'GLOBALG.A.P.', expiry: '2025-06-20', status: 'active', score: 94 },
    { name: 'HACCP Certification', issuer: 'NSF International', expiry: '2025-12-10', status: 'active', score: 98 },
    { name: 'SQF Level 2', issuer: 'SQFI', expiry: '2025-04-18', status: 'expiring', score: 92 },
    { name: 'Organic Certification', issuer: 'USDA', expiry: '2026-01-30', status: 'active', score: 95 }
  ];

  const recentActivity = [
    { type: 'upload', message: 'Lab results uploaded: Pesticide screening - All pass', time: '2 hours ago', status: 'success' },
    { type: 'audit', message: 'Third-party audit scheduled: June 15, 2025', time: '5 hours ago', status: 'info' },
    { type: 'capa', message: 'CAPA #2847 resolved: Sanitation protocol updated', time: '1 day ago', status: 'success' },
    { type: 'alert', message: 'SQF Level 2 expiring in 60 days - renewal required', time: '2 days ago', status: 'warning' }
  ];

  const modules = [
    { title: 'Certification Upload', desc: 'Upload and manage food safety certificates', route: '/foodsafety/certifications', icon: Upload, count: '12 active' },
    { title: 'HACCP Manager', desc: 'Create and maintain HACCP plans', route: '/foodsafety/haccp', icon: FileText, count: '5 plans' },
    { title: 'Corrective Actions', desc: 'Track and manage CAPA processes', route: '/foodsafety/capa', icon: AlertTriangle, count: '2 open' },
    { title: 'Lab Results', desc: 'View and analyze laboratory test results', route: '/foodsafety/lab-results', icon: FileCheck, count: '45 results' },
    { title: 'Inspection Schedule', desc: 'Manage audit and inspection calendar', route: '/foodsafety/inspections', icon: Calendar, count: '3 upcoming' },
    { title: 'Sanitation Logs', desc: 'Digital sanitation and cleaning records', route: '/foodsafety/sanitation', icon: CheckCircle, count: 'Daily logs' },
    { title: 'Training Records', desc: 'Employee food safety training tracker', route: '/foodsafety/training', icon: Users, count: '28 employees' },
    { title: 'Supplier Compliance', desc: 'Monitor supplier safety performance', route: '/foodsafety/suppliers', icon: TrendingUp, count: '15 suppliers' }
  ];

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
      borderBottom: '4px solid #dc2626'
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

    actionsBar: {
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
      background: '#dc2626',
      color: 'white'
    },

    secondaryButton: {
      background: '#64748b',
      color: 'white'
    },

    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },

    metricCard: {
      background: '#f8fafc',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },

    metricIcon: (color) => ({
      width: '48px',
      height: '48px',
      background: color,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      flexShrink: 0
    }),

    metricContent: {
      flex: 1
    },

    metricValue: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#0f172a',
      lineHeight: 1
    },

    metricLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginTop: '0.25rem'
    },

    metricChange: (status) => ({
      fontSize: '0.875rem',
      fontWeight: '700',
      color: status === 'good' ? '#059669' : status === 'warning' ? '#f59e0b' : '#64748b',
      marginTop: '0.5rem'
    }),

    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem',
      marginBottom: '3rem'
    },

    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },

    certificationsCard: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '2rem'
    },

    certTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },

    certRow: {
      borderBottom: '1px solid #f1f5f9',
      transition: 'background 0.2s'
    },

    certCell: {
      padding: '1rem',
      fontSize: '0.875rem'
    },

    certHeader: {
      fontWeight: '700',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontSize: '0.75rem'
    },

    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      background: status === 'active' ? '#d1fae5' : status === 'expiring' ? '#fef3c7' : '#fee2e2',
      color: status === 'active' ? '#065f46' : status === 'expiring' ? '#92400e' : '#991b1b'
    }),

    activityCard: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '2rem'
    },

    activityItem: {
      display: 'flex',
      gap: '1rem',
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9',
      transition: 'background 0.2s'
    },

    activityIcon: (status) => ({
      width: '40px',
      height: '40px',
      background: status === 'success' ? '#d1fae5' : status === 'warning' ? '#fef3c7' : '#dbeafe',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: status === 'success' ? '#065f46' : status === 'warning' ? '#92400e' : '#1e40af',
      flexShrink: 0
    }),

    activityMessage: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: '0.25rem'
    },

    activityTime: {
      fontSize: '0.75rem',
      color: '#64748b',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },

    modulesSection: {
      marginTop: '2rem'
    },

    modulesTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '2rem',
      borderBottom: '3px solid #dc2626',
      paddingBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },

    modulesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem'
    },

    moduleCard: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },

    moduleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },

    moduleIcon: {
      width: '48px',
      height: '48px',
      background: '#f8fafc',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#dc2626'
    },

    moduleTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '0.5rem'
    },

    moduleDesc: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '1rem',
      lineHeight: '1.5'
    },

    moduleFooter: {
      paddingTop: '1rem',
      borderTop: '1px solid #f1f5f9'
    },

    moduleCount: {
      fontSize: '0.75rem',
      fontWeight: '700',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return '#059669';
      case 'warning': return '#f59e0b';
      case 'neutral': return '#64748b';
      default: return '#64748b';
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Professional Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.companyName}>
            <Shield size={40} />
            AuditDNA Food Safety Module
          </h1>
          <p style={styles.systemName}>
            Enterprise Food Safety & Compliance Management System
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        
        {/* Search and Actions Bar */}
        <div style={styles.actionsBar}>
          <div style={styles.searchContainer}>
            <Search style={styles.searchIcon} size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certifications, audits, CAPAs..."
              style={styles.searchInput}
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
          <div style={styles.actionButtons}>
            <button style={{ ...styles.button, ...styles.primaryButton }}>
              <Upload size={20} />
              Upload Document
            </button>
            <button style={{ ...styles.button, ...styles.secondaryButton }}>
              <RefreshCw size={20} />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={styles.metricsGrid}>
          {safetyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} style={styles.metricCard}>
                <div style={styles.metricIcon(getStatusColor(metric.status))}>
                  <Icon size={24} />
                </div>
                <div style={styles.metricContent}>
                  <div style={styles.metricValue}>{metric.value}</div>
                  <div style={styles.metricLabel}>{metric.label}</div>
                  <div style={styles.metricChange(metric.status)}>{metric.change}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div style={styles.contentGrid}>
          
          {/* Certifications Table */}
          <div style={styles.certificationsCard}>
            <h2 style={styles.sectionTitle}>Active Certifications</h2>
            <table style={styles.certTable}>
              <thead>
                <tr style={styles.certRow}>
                  <th style={{ ...styles.certCell, ...styles.certHeader }}>Certification</th>
                  <th style={{ ...styles.certCell, ...styles.certHeader }}>Issuer</th>
                  <th style={{ ...styles.certCell, ...styles.certHeader }}>Expiry Date</th>
                  <th style={{ ...styles.certCell, ...styles.certHeader }}>Score</th>
                  <th style={{ ...styles.certCell, ...styles.certHeader }}>Status</th>
                  <th style={{ ...styles.certCell, ...styles.certHeader }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((cert, index) => (
                  <tr 
                    key={index} 
                    style={styles.certRow}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ ...styles.certCell, fontWeight: '600' }}>{cert.name}</td>
                    <td style={styles.certCell}>{cert.issuer}</td>
                    <td style={styles.certCell}>{cert.expiry}</td>
                    <td style={{ ...styles.certCell, fontWeight: '700', color: '#059669' }}>{cert.score}</td>
                    <td style={styles.certCell}>
                      <span style={styles.statusBadge(cert.status)}>
                        {cert.status}
                      </span>
                    </td>
                    <td style={styles.certCell}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ padding: '0.25rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                          <Eye size={16} />
                        </button>
                        <button style={{ padding: '0.25rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Activity */}
          <div style={styles.activityCard}>
            <h2 style={styles.sectionTitle}>Recent Activity</h2>
            <div>
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  style={styles.activityItem}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={styles.activityIcon(activity.status)}>
                    {activity.type === 'upload' && <Upload size={20} />}
                    {activity.type === 'audit' && <Calendar size={20} />}
                    {activity.type === 'capa' && <CheckCircle size={20} />}
                    {activity.type === 'alert' && <AlertTriangle size={20} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={styles.activityMessage}>{activity.message}</p>
                    <p style={styles.activityTime}>
                      <Clock size={12} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module Navigation */}
        <div style={styles.modulesSection}>
          <h2 style={styles.modulesTitle}>Food Safety Modules</h2>
          <div style={styles.modulesGrid}>
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(module.route)}
                  style={styles.moduleCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#dc2626';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.moduleHeader}>
                    <div style={styles.moduleIcon}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 style={styles.moduleTitle}>{module.title}</h3>
                  <p style={styles.moduleDesc}>{module.desc}</p>
                  <div style={styles.moduleFooter}>
                    <span style={styles.moduleCount}>{module.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}