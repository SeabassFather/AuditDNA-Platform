import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HelpCenter() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)'
    },
    header: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    headerContent: {
      maxWidth: '1600px',
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
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '40px'
    }
  };

  const helpTopics = [
    {
      category: 'Getting Started',
      icon: '🚀',
      color: '#10b981',
      topics: [
        { title: 'Platform Overview', views: '12.4K' },
        { title: 'Quick Start Guide', views: '8.9K' },
        { title: 'Setting Up Your Account', views: '7.2K' },
        { title: 'Navigation & Interface', views: '5.8K' }
      ]
    },
    {
      category: 'Compliance & Certifications',
      icon: '✅',
      color: '#3b82f6',
      topics: [
        { title: 'USDA Certification Process', views: '15.2K' },
        { title: 'Organic Standards', views: '11.3K' },
        { title: 'Export Documentation', views: '9.7K' },
        { title: 'Audit Preparation', views: '8.4K' }
      ]
    },
    {
      category: 'Traceability & Tracking',
      icon: '🔍',
      color: '#8b5cf6',
      topics: [
        { title: 'QR Code Scanning', views: '13.8K' },
        { title: 'Blockchain Verification', views: '10.2K' },
        { title: 'GPS Tracking Setup', views: '7.9K' },
        { title: 'Chain of Custody', views: '6.5K' }
      ]
    },
    {
      category: 'Financial Services',
      icon: '💰',
      color: '#f59e0b',
      topics: [
        { title: 'Payment Processing', views: '14.6K' },
        { title: 'Trade Finance', views: '9.8K' },
        { title: 'Export Financing', views: '8.3K' },
        { title: 'Currency Exchange', views: '6.1K' }
      ]
    },
    {
      category: 'Reports & Analytics',
      icon: '📊',
      color: '#ec4899',
      topics: [
        { title: 'Generating Reports', views: '16.9K' },
        { title: 'Custom Dashboards', views: '12.1K' },
        { title: 'Data Export Options', views: '9.5K' },
        { title: 'Scheduled Reports', views: '7.7K' }
      ]
    },
    {
      category: 'Technical Support',
      icon: '🛠️',
      color: '#06b6d4',
      topics: [
        { title: 'API Documentation', views: '18.3K' },
        { title: 'Troubleshooting', views: '13.7K' },
        { title: 'Integration Guide', views: '10.4K' },
        { title: 'System Requirements', views: '8.9K' }
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>📚 Help & Documentation Center</h1>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '8px'}}>
              24/7 Support • Video Tutorials • API Docs
            </p>
          </div>
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
        {/* Quick Help Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { icon: '💬', title: 'Live Chat', desc: 'Chat with support team', color: '#10b981' },
            { icon: '📧', title: 'Email Support', desc: 'support@auditdna.com', color: '#3b82f6' },
            { icon: '📞', title: 'Phone Support', desc: '+1 (800) 555-0199', color: '#f59e0b' },
            { icon: '🎥', title: 'Video Tutorials', desc: '120+ training videos', color: '#ec4899' }
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              border: `2px solid ${card.color}20`,
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = card.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = card.color + '20';
            }}
            >
              <div style={{fontSize: '48px', marginBottom: '15px'}}>{card.icon}</div>
              <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px'}}>
                {card.title}
              </h3>
              <p style={{fontSize: '13px', color: '#6b7280'}}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Help Topics */}
        <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#065f46', marginBottom: '25px'}}>
          📖 Documentation Categories
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '25px'
        }}>
          {helpTopics.map((category, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              border: `2px solid ${category.color}20`
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                <div style={{fontSize: '42px'}}>{category.icon}</div>
                <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#065f46'}}>
                  {category.category}
                </h3>
              </div>
              
              {category.topics.map((topic, j) => (
                <div key={j} style={{
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  background: '#f9fafb',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${category.color}10`;
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <span style={{fontSize: '15px', fontWeight: '600', color: '#065f46'}}>
                    {topic.title}
                  </span>
                  <span style={{fontSize: '12px', color: '#6b7280'}}>
                    👁️ {topic.views}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#065f46', marginTop: '50px', marginBottom: '25px'}}>
          ❓ Frequently Asked Questions
        </h2>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          {[
            { q: 'How do I generate a compliance report?', a: 'Navigate to Reports > Compliance Summary, select date range, and click Generate.' },
            { q: 'Can I integrate with my existing ERP system?', a: 'Yes! We support API integration with SAP, Oracle, QuickBooks, and custom systems.' },
            { q: 'What file formats are supported for exports?', a: 'PDF, Excel, CSV, JSON, XML, and custom formats via API.' },
            { q: 'How secure is my data?', a: 'Bank-level encryption (AES-256), blockchain verification, and SOC 2 Type II certified.' }
          ].map((faq, i) => (
            <div key={i} style={{
              padding: '20px 0',
              borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none'
            }}>
              <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#065f46', marginBottom: '10px'}}>
                Q: {faq.q}
              </h4>
              <p style={{fontSize: '14px', color: '#6b7280', lineHeight: '1.6'}}>
                A: {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
