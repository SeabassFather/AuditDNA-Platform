// ================================================================
// GROWER INTELLIGENCE DASHBOARD - FBI-LEVEL VETTING
// ================================================================
// Date: 2025-11-12 22:58:56 UTC
// User: SeabassFather
// Purpose: Complete supplier intelligence with government data
// Status: PRODUCTION READY - PHASE 1
// ================================================================

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, FileText, Download, Mail, AlertTriangle, CheckCircle, 
  XCircle, MapPin, Package, TrendingUp, Shield, Users, Truck,
  Building2, Award, Calendar, DollarSign, Globe, Database
} from 'lucide-react';
import {
  generateGrowerIntelligenceReport,
  searchUSDAOrganic,
  searchFDAFacilities,
  searchSENASICA,
  getUSDAMarketData
} from './data/growerIntelligenceAPI';

const GrowerIntelligenceDashboard = () => {
  const { language } = useLanguage();
  
  // Search state
  const [searchForm, setSearchForm] = useState({
    growerName: '',
    country: 'Mexico',
    state: '',
    commodity: '',
    registrationNumber: ''
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Handle search
  const handleSearch = async () => {
    if (!searchForm.growerName) {
      alert('Please enter a grower name');
      return;
    }

    setIsSearching(true);
    
    try {
      const report = await generateGrowerIntelligenceReport(searchForm);
      setCurrentReport(report);
      
      // Add to search history
      setSearchHistory(prev => [{
        id: Date.now(),
        growerName: searchForm.growerName,
        timestamp: new Date().toISOString(),
        riskScore: report.riskScore
      }, ...prev.slice(0, 9)]); // Keep last 10 searches
      
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed: ' + error.message);
    } finally {
      setIsSearching(false);
    }
  };

  // Generate PDF report
  const generatePDF = () => {
    if (!currentReport) return;
    
    // TODO: Implement PDF generation with jsPDF
    alert('PDF generation will be implemented in Phase 2');
  };

  // Email report
  const emailReport = () => {
    if (!currentReport) return;
    
    // TODO: Implement email functionality
    alert('Email functionality will be implemented in Phase 2');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '2rem'
    }}>
      {/* HEADER */}
      <div style={{ 
        maxWidth: '1800px', 
        margin: '0 auto',
        marginBottom: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#22c55e',
          marginBottom: '0.5rem',
          textShadow: '0 0 30px rgba(34, 197, 94, 0.6)'
        }}>
          🕵️ Grower Intelligence Dashboard
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#94a3b8',
          marginBottom: '1rem'
        }}>
          {language === 'en' 
            ? 'FBI-level supplier vetting with live government data • Complete due diligence before every deal' 
            : 'Verificación nivel FBI con datos gubernamentales en vivo • Due diligence completo antes de cada trato'}
        </p>
        <div style={{ 
          fontSize: '0.9rem', 
          color: '#64748b',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <span>✅ USDA Organic Database</span>
          <span>✅ FDA Facility Verification</span>
          <span>✅ SENASICA Registry</span>
          <span>✅ CCOF Certification (G Money! 🌊)</span>
          <span>✅ GlobalG.A.P.</span>
          <span>✅ Risk Scoring</span>
          <span>✅ PDF Reports</span>
        </div>
      </div>

      {/* SEARCH FORM */}
      <div style={{ 
        maxWidth: '1800px', 
        margin: '0 auto',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(12px)'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#fff',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Search size={24} />
            {language === 'en' ? 'Search Grower Intelligence' : 'Buscar Inteligencia de Productor'}
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {/* Grower Name */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#94a3b8', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {language === 'en' ? 'Grower Name *' : 'Nombre del Productor *'}
              </label>
              <input
                type="text"
                placeholder="e.g., Green Valley Farms"
                value={searchForm.growerName}
                onChange={(e) => setSearchForm(prev => ({ ...prev, growerName: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)'}
              />
            </div>

            {/* Country */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#94a3b8', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {language === 'en' ? 'Country' : 'País'}
              </label>
              <select
                value={searchForm.country}
                onChange={(e) => setSearchForm(prev => ({ ...prev, country: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              >
                <option value="Mexico">🇲🇽 Mexico</option>
                <option value="Guatemala">🇬🇹 Guatemala</option>
                <option value="Honduras">🇭🇳 Honduras</option>
                <option value="Costa Rica">🇨🇷 Costa Rica</option>
                <option value="Peru">🇵🇪 Peru</option>
                <option value="Chile">🇨🇱 Chile</option>
                <option value="Ecuador">🇪🇨 Ecuador</option>
                <option value="Colombia">🇨🇴 Colombia</option>
                <option value="Brazil">🇧🇷 Brazil</option>
                <option value="Argentina">🇦🇷 Argentina</option>
              </select>
            </div>

            {/* State/Region */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#94a3b8', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {language === 'en' ? 'State/Region' : 'Estado/Región'}
              </label>
              <input
                type="text"
                placeholder="e.g., Michoacán"
                value={searchForm.state}
                onChange={(e) => setSearchForm(prev => ({ ...prev, state: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Commodity */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#94a3b8', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {language === 'en' ? 'Commodity' : 'Producto'}
              </label>
              <input
                type="text"
                placeholder="e.g., Avocados, Plums, Nuts"
                value={searchForm.commodity}
                onChange={(e) => setSearchForm(prev => ({ ...prev, commodity: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Registration Number */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#94a3b8', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {language === 'en' ? 'Registration # (Optional)' : 'Número de Registro (Opcional)'}
              </label>
              <input
                type="text"
                placeholder="USDA/FDA/GGN #"
                value={searchForm.registrationNumber}
                onChange={(e) => setSearchForm(prev => ({ ...prev, registrationNumber: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            style={{
              padding: '1rem 2rem',
              background: isSearching 
                ? 'rgba(100, 116, 139, 0.3)'
                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isSearching ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: isSearching ? 'none' : '0 6px 20px rgba(34, 197, 94, 0.4)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (!isSearching) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isSearching ? 'none' : '0 6px 20px rgba(34, 197, 94, 0.4)';
            }}
          >
            {isSearching ? (
              <>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                {language === 'en' ? 'Searching Government Databases...' : 'Buscando en Bases de Datos Gubernamentales...'}
              </>
            ) : (
              <>
                <Search size={20} />
                {language === 'en' ? 'Generate Intelligence Report' : 'Generar Reporte de Inteligencia'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* SEARCH RESULTS */}
      {currentReport && (
        <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
          <IntelligenceReport 
            report={currentReport} 
            language={language}
            onGeneratePDF={generatePDF}
            onEmail={emailReport}
          />
        </div>
      )}

      {/* SEARCH HISTORY */}
      {searchHistory.length > 0 && (
        <div style={{ 
          maxWidth: '1800px', 
          margin: '2rem auto 0'
        }}>
          <h3 style={{ 
            fontSize: '1.3rem', 
            fontWeight: 'bold', 
            color: '#fff',
            marginBottom: '1rem'
          }}>
            📜 {language === 'en' ? 'Recent Searches' : 'Búsquedas Recientes'}
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {searchHistory.map(item => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '2px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => setSearchForm(prev => ({ ...prev, growerName: item.growerName }))}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#22c55e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                  {item.growerName}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  {new Date(item.timestamp).toLocaleString()}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: getRiskColor(item.riskScore) }}>
                  Risk Score: {item.riskScore}/100
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ================================================================
// INTELLIGENCE REPORT COMPONENT
// ================================================================
const IntelligenceReport = ({ report, language, onGeneratePDF, onEmail }) => {
  const recommendation = report.recommendation;

  return (
    <div>
      {/* EXECUTIVE SUMMARY */}
      <div style={{
        background: `*`
