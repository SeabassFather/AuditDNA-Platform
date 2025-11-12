import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#ffffff',
      margin: 0
    },
    backBtn: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px',
      display: 'flex',
      gap: '30px'
    },
    sidebar: {
      width: '250px',
      flexShrink: 0
    },
    sidebarItem: {
      padding: '15px 20px',
      margin: '8px 0',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s',
      background: 'white',
      border: '2px solid #e5e7eb',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    sidebarItemActive: {
      background: '#059669',
      color: 'white',
      borderColor: '#059669'
    },
    mainPanel: {
      flex: 1,
      background: 'white',
      borderRadius: '12px',
      padding: '40px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    }
  };

  const settingsTabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'api', name: 'API Keys', icon: '🔑' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'integrations', name: 'Integrations', icon: '🔌' },
    { id: 'team', name: 'Team', icon: '👥' },
    { id: 'advanced', name: 'Advanced', icon: '🚀' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>⚙️ System Settings</h1>
          <button 
            style={styles.backBtn}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ← Back
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          {settingsTabs.map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.sidebarItem,
                ...(activeTab === tab.id ? styles.sidebarItemActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{fontSize: '20px'}}>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div style={styles.mainPanel}>
          <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#065f46', marginBottom: '30px'}}>
            {settingsTabs.find(t => t.id === activeTab)?.icon} {settingsTabs.find(t => t.id === activeTab)?.name} Settings
          </h2>
          
          {activeTab === 'general' && (
            <div>
              <div style={{marginBottom: '30px'}}>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px'}}>
                  Company Name
                </label>
                <input 
                  type="text" 
                  defaultValue="AuditDNA"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div style={{marginBottom: '30px'}}>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px'}}>
                  Time Zone
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}>
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <p style={{color: '#6b7280', marginBottom: '20px'}}>
                Configure security settings, two-factor authentication, and access controls.
              </p>
              <button style={{
                background: '#059669',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Enable 2FA
              </button>
            </div>
          )}

          {activeTab !== 'general' && activeTab !== 'security' && (
            <p style={{color: '#6b7280', lineHeight: '1.8'}}>
              Settings panel for {settingsTabs.find(t => t.id === activeTab)?.name}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
