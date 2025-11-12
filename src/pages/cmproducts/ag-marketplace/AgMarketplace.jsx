// ================================================================
// AG MARKETPLACE - COMPLETE PRODUCE TRADING PLATFORM
// ================================================================
// Date: 2025-11-12 08:48:15 UTC
// User: SeabassFather
// Status: PRODUCTION READY
// ================================================================

import React, { useState } from 'react';
import { TrendingUp, ShoppingCart, Package, BarChart3, Warehouse, Users, Truck, Shield, FileText, Settings } from 'lucide-react';

// Import all tab components
import MarketTrendsTab from './tabs/MarketTrendsTab';
import LiveOrdersTab from './tabs/LiveOrdersTab';
import MyListingsTab from './tabs/MyListingsTab';
import InventoryTab from './tabs/InventoryTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import LogisticsTab from './tabs/LogisticsTab';
import CertificationsTab from './tabs/CertificationsTab';
import ContractsTab from './tabs/ContractsTab';
import SettingsTab from './tabs/SettingsTab';
import BuyersDirectoryTab from './tabs/BuyersDirectoryTab';

export default function AgMarketplace() {
  const [activeTab, setActiveTab] = useState('trends');

  const tabs = [
    { id: 'trends', label: 'Market Trends', icon: TrendingUp, component: MarketTrendsTab },
    { id: 'orders', label: 'Live Orders', icon: ShoppingCart, component: LiveOrdersTab },
    { id: 'listings', label: 'My Listings', icon: Package, component: MyListingsTab },
    { id: 'inventory', label: 'Inventory', icon: Warehouse, component: InventoryTab },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: AnalyticsTab },
    { id: 'logistics', label: 'Logistics', icon: Truck, component: LogisticsTab },
    { id: 'certifications', label: 'Certifications', icon: Shield, component: CertificationsTab },
    { id: 'contracts', label: 'Contracts', icon: FileText, component: ContractsTab },
    { id: 'buyers', label: 'Buyers Directory', icon: Users, component: BuyersDirectoryTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsTab }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || MarketTrendsTab;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '0.5rem' }}>
          🌾 AG Marketplace
        </h2>
        <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
          Complete Produce Trading Platform - Real-Time Market Intelligence
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        padding: '1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          gap: '0.5rem', 
          flexWrap: 'wrap',
          scrollbarWidth: 'thin',
          scrollbarColor: '#22c55e rgba(30, 41, 59, 0.6)'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                    : 'rgba(51, 65, 85, 0.6)',
                  border: activeTab === tab.id ? '2px solid #22c55e' : '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: activeTab === tab.id ? 'bold' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap',
                  boxShadow: activeTab === tab.id ? '0 4px 15px rgba(34, 197, 94, 0.4)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                    e.currentTarget.style.borderColor = '#22c55e';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(51, 65, 85, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                  }
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '16px',
        padding: '2rem',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        minHeight: '600px'
      }}>
        <ActiveComponent />
      </div>

    </div>
  );
}