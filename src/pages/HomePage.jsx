import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../glassmorphism.css';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const agModules = [
    {
      name: "USDA Intelligence",
      icon: "ðŸ“Š",
      path: "/usda",
      description: "Live commodity pricing, market analytics",
      color: "#10b981"
    },
    {
      name: "Traceability",
      icon: "ðŸ”",
      path: "/traceability",
      description: "QR codes, GPS tracking, chain of custody",
      color: "#06b6d4"
    },
    {
      name: "Latin America Trade",
      icon: "ðŸŒŽ",
      path: "/latin-america",
      description: "Cross-border buyers, growers network",
      color: "#f59e0b"
    },
    {
      name: "AG Sciences",
      icon: "ðŸ§ª",
      path: "/ag",
      description: "Agricultural testing and analysis",
      color: "#8b5cf6"
    },
    {
      name: "Compliance Hub",
      icon: "âœ…",
      path: "/compliance",
      description: "Certifications and audit scoring",
      color: "#ec4899"
    },
    {
      name: "Growers Network",
      icon: "ðŸ‘¨â€ðŸŒ¾",
      path: "/growers",
      description: "Marketplace matching and analytics",
      color: "#14b8a6"
    },
    {
      name: "Soil Analysis",
      icon: "ðŸŒ±",
      path: "/soil",
      description: "NPK levels and pH testing",
      color: "#84cc16"
    },
    {
      name: "Water Analysis",
      icon: "ðŸ’§",
      path: "/water",
      description: "Purity and irrigation quality",
      color: "#0ea5e9"
    },
    {
      name: "Environmental AI",
      icon: "ðŸ¤–",
      path: "/ai",
      description: "AI-powered intelligence",
      color: "#a855f7"
    },
    {
      name: "Commodity Trading",
      icon: "ðŸ“ˆ",
      path: "/commodity",
      description: "Market trends and analytics",
      color: "#f97316"
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f1729 0%, #1a2332 50%, #0a1120 100%)' }}>
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '80px 20px',
        overflow: 'hidden'
      }}>
        
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${scrollY * 0.5}px 400px, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s'
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', textAlign: 'center' }}>
          
          {/* Badge */}
          <div style={{ marginBottom: '40px' }}>
            <div className="glass-panel" style={{ 
              display: 'inline-block', 
              padding: '12px 24px',
              cursor: 'pointer'
            }}>
              <span className="neon-text" style={{ fontSize: '14px', fontWeight: '700' }}>
                ðŸŒ¾ AuditDNA Platform
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '30px',
            lineHeight: '1.1',
            textShadow: '0 0 40px rgba(6, 182, 212, 0.6)'
          }}>
            Agricultural Supply Chain
            <br/>
            <span style={{ 
              background: 'linear-gradient(135deg, #06b6d4, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Intelligence Platform
            </span>
          </h1>

          <p style={{ 
            fontSize: '24px', 
            color: '#94a3b8', 
            maxWidth: '800px', 
            margin: '0 auto 50px',
            lineHeight: '1.6'
          }}>
            Complete agricultural intelligence and traceability solutions
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '80px', flexWrap: 'wrap' }}>
            <Link to="/ag" style={{ textDecoration: 'none' }}>
              <button className="glass-button" style={{ 
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                padding: '18px 40px',
                fontSize: '18px',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)'
              }}>
                ðŸš€ Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* AG Modules Grid */}
      <section style={{ padding: '100px 20px', background: 'rgba(15, 23, 42, 0.5)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="neon-text" style={{ 
              fontSize: '48px', 
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Platform Modules
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '30px'
          }}>
            {agModules.map((module, idx) => (
              <Link key={idx} to={module.path} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ 
                  padding: '40px',
                  cursor: 'pointer',
                  height: '100%',
                  minHeight: '250px'
                }}>
                  <div style={{ fontSize: '60px', marginBottom: '20px', textAlign: 'center' }}>
                    {module.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '24px', 
                    color: module.color, 
                    marginBottom: '16px',
                    fontWeight: '700',
                    textAlign: 'center',
                    textShadow: `0 0 20px ${module.color}60`
                  }}>
                    {module.name}
                  </h3>
                  <p style={{ 
                    fontSize: '15px', 
                    color: '#94a3b8', 
                    lineHeight: '1.6',
                    textAlign: 'center'
                  }}>
                    {module.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: '#0a0f1a',
        padding: '60px 20px 30px',
        borderTop: '1px solid rgba(6, 182, 212, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            borderTop: '1px solid rgba(100, 116, 139, 0.2)',
            paddingTop: '30px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Â© 2025 AuditDNA AG â€¢ MexaUSA Food Group â€¢ All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
