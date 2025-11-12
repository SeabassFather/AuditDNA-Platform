import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState('overview');

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      borderBottom: '3px solid #3b82f6'
    },
    headerContent: {
      maxWidth: '1800px',
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
      background: 'rgba(59, 130, 246, 0.2)',
      color: 'white',
      border: '2px solid #3b82f6',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    sidebar: {
      position: 'fixed',
      left: 0,
      top: '110px',
      width: '280px',
      height: 'calc(100vh - 110px)',
      background: '#1e293b',
      padding: '30px 20px',
      overflowY: 'auto',
      borderRight: '2px solid #3b82f6'
    },
    sidebarItem: {
      padding: '15px 20px',
      margin: '8px 0',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s',
      background: 'transparent',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      color: '#94a3b8',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    sidebarItemActive: {
      background: '#3b82f6',
      color: 'white'
    },
    mainContent: {
      marginLeft: '300px',
      padding: '40px',
      maxWidth: '1600px'
    }
  };

  const adminPanels = [
    { id: 'overview', name: 'System Overview', icon: '📊' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'roles', name: 'Roles & Permissions', icon: '🔐' },
    { id: 'modules', name: 'Module Control', icon: '⚙️' },
    { id: 'api', name: 'API Management', icon: '🔌' },
    { id: 'database', name: 'Database Admin', icon: '🗄️' },
    { id: 'logs', name: 'System Logs', icon: '📋' },
    { id: 'monitoring', name: 'Performance', icon: '📈' },
    { id: 'security', name: 'Security Center', icon: '🛡️' },
    { id: 'backups', name: 'Backups', icon: '💾' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'settings', name: 'System Settings', icon: '⚙️' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>⚙️ Admin Control Center</h1>
            <p style={{color: '#94a3b8', fontSize: '16px', marginTop: '8px'}}>
              System Administration & Management
            </p>
          </div>
          <button 
            style={styles.backBtn}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.4)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={{fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px'}}>
          Admin Panels
        </h3>
        {adminPanels.map(panel => (
          <button
            key={panel.id}
            style={{
              ...styles.sidebarItem,
              ...(activePanel === panel.id ? styles.sidebarItemActive : {})
            }}
            onClick={() => setActivePanel(panel.id)}
            onMouseEnter={(e) => {
              if (activePanel !== panel.id) {
                e.currentTarget.style.background = '#334155';
                e.currentTarget.style.color = '#e2e8f0';
              }
            }}
            onMouseLeave={(e) => {
              if (activePanel !== panel.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
          >
            <span style={{fontSize: '20px'}}>{panel.icon}</span>
            <span>{panel.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {activePanel === 'overview' && (
          <>
            {/* System Health Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {[
                { icon: '🖥️', label: 'System Uptime', value: '99.97%', status: 'excellent', color: '#10b981' },
                { icon: '👥', label: 'Active Users', value: '12,847', status: 'high', color: '#3b82f6' },
                { icon: '💾', label: 'Database Size', value: '847 GB', status: 'normal', color: '#f59e0b' },
                { icon: '🔄', label: 'API Calls (24h)', value: '2.4M', status: 'high', color: '#8b5cf6' },
                { icon: '⚡', label: 'Avg Response', value: '42ms', status: 'fast', color: '#10b981' },
                { icon: '🚨', label: 'Critical Alerts', value: '0', status: 'clear', color: '#10b981' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: '#1e293b',
                  padding: '25px',
                  borderRadius: '12px',
                  border: `2px solid ${stat.color}40`,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}>
                  <div style={{fontSize: '36px', marginBottom: '12px'}}>{stat.icon}</div>
                  <div style={{fontSize: '32px', fontWeight: 'bold', color: stat.color, marginBottom: '8px'}}>
                    {stat.value}
                  </div>
                  <div style={{fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase'}}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '20px'}}>
              Quick Actions
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {[
                { name: 'Create New User', icon: '➕', color: '#10b981' },
                { name: 'Generate Report', icon: '📊', color: '#3b82f6' },
                { name: 'System Backup', icon: '💾', color: '#f59e0b' },
                { name: 'View Audit Log', icon: '📋', color: '#8b5cf6' },
                { name: 'Security Scan', icon: '🔍', color: '#ec4899' },
                { name: 'Update Modules', icon: '🔄', color: '#06b6d4' }
              ].map((action, i) => (
                <button key={i} style={{
                  background: '#1e293b',
                  padding: '20px',
                  borderRadius: '12px',
                  border: `2px solid ${action.color}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.boxShadow = `0 8px 25px ${action.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = action.color + '40';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <span style={{fontSize: '32px'}}>{action.icon}</span>
                  <span>{action.name}</span>
                </button>
              ))}
            </div>

            {/* Recent Activity */}
            <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '20px'}}>
              Recent System Activity
            </h2>
            <div style={{
              background: '#1e293b',
              borderRadius: '12px',
              padding: '25px',
              border: '2px solid #3b82f640'
            }}>
              {[
                { time: '2 min ago', user: 'admin@auditdna.com', action: 'Created new user account', type: 'success' },
                { time: '15 min ago', user: 'system', action: 'Automated backup completed', type: 'info' },
                { time: '1 hour ago', user: 'security@auditdna.com', action: 'Security scan passed', type: 'success' },
                { time: '2 hours ago', user: 'api@auditdna.com', action: 'API rate limit adjusted', type: 'warning' },
                { time: '3 hours ago', user: 'system', action: 'Database optimization completed', type: 'info' }
              ].map((activity, i) => (
                <div key={i} style={{
                  padding: '15px 0',
                  borderBottom: i < 4 ? '1px solid #334155' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{color: '#e2e8f0', fontSize: '14px', marginBottom: '4px'}}>
                      {activity.action}
                    </div>
                    <div style={{color: '#64748b', fontSize: '12px'}}>
                      {activity.user} • {activity.time}
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    background: activity.type === 'success' ? '#10b98120' : activity.type === 'warning' ? '#f59e0b20' : '#3b82f620',
                    color: activity.type === 'success' ? '#10b981' : activity.type === 'warning' ? '#f59e0b' : '#3b82f6'
                  }}>
                    {activity.type.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* User Management Panel */}
        {activePanel === 'users' && (
          <div style={{
            background: '#1e293b',
            borderRadius: '12px',
            padding: '40px',
            border: '2px solid #3b82f640'
          }}>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '25px'}}>
              👥 User Management
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { label: 'Total Users', value: '12,847', color: '#3b82f6' },
                { label: 'Active Today', value: '8,456', color: '#10b981' },
                { label: 'Pending Approval', value: '23', color: '#f59e0b' },
                { label: 'Suspended', value: '12', color: '#ef4444' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '20px',
                  borderRadius: '8px',
                  background: '#0f172a',
                  border: `1px solid ${stat.color}40`
                }}>
                  <div style={{fontSize: '28px', fontWeight: 'bold', color: stat.color, marginBottom: '8px'}}>
                    {stat.value}
                  </div>
                  <div style={{fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase'}}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <p style={{color: '#94a3b8', lineHeight: '1.8'}}>
              Complete user management system with role assignment, permissions, and access control.
            </p>
          </div>
        )}

        {/* Other Panels */}
        {!['overview', 'users'].includes(activePanel) && (
          <div style={{
            background: '#1e293b',
            borderRadius: '12px',
            padding: '40px',
            border: '2px solid #3b82f640'
          }}>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '20px'}}>
              {adminPanels.find(p => p.id === activePanel)?.icon} {adminPanels.find(p => p.id === activePanel)?.name}
            </h2>
            <p style={{color: '#94a3b8', lineHeight: '1.8'}}>
              Admin panel content and controls will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
