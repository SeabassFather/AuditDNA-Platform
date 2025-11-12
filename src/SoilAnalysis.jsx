import React, { useState, useContext } from 'react';
import { Upload, FileText, TrendingUp, DollarSign, Leaf, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';

const SoilAnalysis = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploaded(true);
      setAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setAnalyzing(false);
        setShowResults(true);
      }, 2500);
    }
  };

  const handleAddAnalysisToCart = () => {
    addToCart({
      id: `soil-analysis-${Date.now()}`,
      name: language === 'en' ? 'Soil Analysis + Fertilizer Plan' : 'Análisis de Suelo + Plan de Fertilización',
      price: 149,
      type: 'analysis'
    });
    alert(language === 'en' ? 'Added to cart!' : '¡Agregado al carrito!');
  };

  // Mock soil data
  const soilData = [
    { 
      parameter: language === 'en' ? 'pH Level' : 'Nivel de pH',
      value: 5.8,
      unit: '',
      optimal: '6.0-7.0',
      status: 'low',
      icon: '🔴'
    },
    { 
      parameter: language === 'en' ? 'Nitrogen (N)' : 'Nitrógeno (N)',
      value: 15,
      unit: 'ppm',
      optimal: '25-50',
      status: 'low',
      icon: '🟡'
    },
    { 
      parameter: language === 'en' ? 'Phosphorus (P)' : 'Fósforo (P)',
      value: 42,
      unit: 'ppm',
      optimal: '30-60',
      status: 'optimal',
      icon: '🟢'
    },
    { 
      parameter: language === 'en' ? 'Potassium (K)' : 'Potasio (K)',
      value: 180,
      unit: 'ppm',
      optimal: '150-300',
      status: 'optimal',
      icon: '🟢'
    },
    { 
      parameter: language === 'en' ? 'Calcium (Ca)' : 'Calcio (Ca)',
      value: 850,
      unit: 'ppm',
      optimal: '1000-2000',
      status: 'low',
      icon: '🟡'
    },
    { 
      parameter: language === 'en' ? 'Magnesium (Mg)' : 'Magnesio (Mg)',
      value: 120,
      unit: 'ppm',
      optimal: '100-200',
      status: 'optimal',
      icon: '🟢'
    },
    { 
      parameter: language === 'en' ? 'Organic Matter' : 'Materia Orgánica',
      value: 2.8,
      unit: '%',
      optimal: '3-5',
      status: 'low',
      icon: '🟡'
    },
    { 
      parameter: language === 'en' ? 'Zinc (Zn)' : 'Zinc (Zn)',
      value: 0.6,
      unit: 'ppm',
      optimal: '1.0-3.0',
      status: 'critical',
      icon: '🔴'
    }
  ];

  const fertilizerPlan = {
    en: [
      { 
        product: 'Agricultural Lime',
        quantity: '2.5 tons/acre',
        npk: 'pH adjustment',
        purpose: 'Raise pH from 5.8 to 6.5',
        costPerAcre: 250,
        application: 'Broadcast and incorporate 30 days before planting'
      },
      { 
        product: 'Urea (46-0-0)',
        quantity: '200 kg/acre',
        npk: '46% N',
        purpose: 'Boost nitrogen levels',
        costPerAcre: 180,
        application: 'Split application: 60% at planting, 40% at 45 days'
      },
      { 
        product: 'Muriate of Potash (0-0-60)',
        quantity: '150 kg/acre',
        npk: '60% K₂O',
        purpose: 'Maintain potassium levels',
        costPerAcre: 120,
        application: 'Apply at planting'
      },
      { 
        product: 'Zinc Sulfate',
        quantity: '25 kg/acre',
        npk: '36% Zn',
        purpose: 'Critical zinc deficiency correction',
        costPerAcre: 50,
        application: 'Foliar spray + soil application'
      },
      { 
        product: 'Compost',
        quantity: '15 tons/acre',
        npk: 'Organic matter',
        purpose: 'Improve soil structure and organic content',
        costPerAcre: 300,
        application: 'Incorporate 60 days before planting'
      },
      { 
        product: 'Calcium Nitrate',
        quantity: '100 kg/acre',
        npk: '15.5% N, 19% Ca',
        purpose: 'Boost calcium and nitrogen',
        costPerAcre: 150,
        application: 'Drip irrigation or side-dress'
      }
    ],
    es: [
      { 
        product: 'Cal Agrícola',
        quantity: '2.5 toneladas/acre',
        npk: 'Ajuste de pH',
        purpose: 'Elevar pH de 5.8 a 6.5',
        costPerAcre: 250,
        application: 'Aplicar 30 días antes de plantar'
      },
      { 
        product: 'Urea (46-0-0)',
        quantity: '200 kg/acre',
        npk: '46% N',
        purpose: 'Aumentar nitrógeno',
        costPerAcre: 180,
        application: 'Aplicación dividida: 60% en plantación, 40% a los 45 días'
      },
      { 
        product: 'Muriato de Potasio (0-0-60)',
        quantity: '150 kg/acre',
        npk: '60% K₂O',
        purpose: 'Mantener niveles de potasio',
        costPerAcre: 120,
        application: 'Aplicar en plantación'
      },
      { 
        product: 'Sulfato de Zinc',
        quantity: '25 kg/acre',
        npk: '36% Zn',
        purpose: 'Corrección crítica de zinc',
        costPerAcre: 50,
        application: 'Aplicación foliar + suelo'
      },
      { 
        product: 'Composta',
        quantity: '15 toneladas/acre',
        npk: 'Materia orgánica',
        purpose: 'Mejorar estructura y contenido orgánico',
        costPerAcre: 300,
        application: 'Incorporar 60 días antes'
      },
      { 
        product: 'Nitrato de Calcio',
        quantity: '100 kg/acre',
        npk: '15.5% N, 19% Ca',
        purpose: 'Aumentar calcio y nitrógeno',
        costPerAcre: 150,
        application: 'Fertirriego o aplicación lateral'
      }
    ]
  };

  const totalCost = fertilizerPlan.en.reduce((sum, item) => sum + item.costPerAcre, 0);

  const t = {
    en: {
      title: 'Soil Analysis',
      subtitle: 'AI-powered fertility analysis and fertilizer recommendations',
      upload: 'Upload Soil Test Results',
      analyzing: 'Analyzing soil data...',
      results: 'Analysis Results',
      parameter: 'Parameter',
      value: 'Value',
      optimal: 'Optimal Range',
      status: 'Status',
      fertPlan: 'Custom Fertilizer Plan',
      product: 'Product',
      quantity: 'Quantity',
      purpose: 'Purpose',
      application: 'Application Method',
      cost: 'Cost/Acre',
      totalCost: 'Total Cost',
      perAcre: '/acre',
      yield: 'Expected Yield Improvement',
      yieldDesc: 'Based on nutrient optimization',
      roi: 'Return on Investment',
      roiDesc: 'Expected ROI based on market prices',
      addToCart: 'Get Full Report ($149)',
      recommendations: 'Key Recommendations',
      dragDrop: 'Drag & drop PDF or Excel file here',
      or: 'or',
      browse: 'Browse Files',
      accepted: 'Accepted: PDF, XLSX, CSV'
    },
    es: {
      title: 'Análisis de Suelo',
      subtitle: 'Análisis de fertilidad y recomendaciones con IA',
      upload: 'Subir Resultados de Análisis',
      analyzing: 'Analizando datos del suelo...',
      results: 'Resultados del Análisis',
      parameter: 'Parámetro',
      value: 'Valor',
      optimal: 'Rango Óptimo',
      status: 'Estado',
      fertPlan: 'Plan de Fertilización Personalizado',
      product: 'Producto',
      quantity: 'Cantidad',
      purpose: 'Propósito',
      application: 'Método de Aplicación',
      cost: 'Costo/Acre',
      totalCost: 'Costo Total',
      perAcre: '/acre',
      yield: 'Mejora de Rendimiento Esperada',
      yieldDesc: 'Basado en optimización de nutrientes',
      roi: 'Retorno de Inversión',
      roiDesc: 'ROI esperado según precios de mercado',
      addToCart: 'Obtener Reporte Completo ($149)',
      recommendations: 'Recomendaciones Clave',
      dragDrop: 'Arrastra y suelta PDF o Excel aquí',
      or: 'o',
      browse: 'Explorar Archivos',
      accepted: 'Aceptado: PDF, XLSX, CSV'
    }
  };

  const text = t[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
        </div>

        {/* Upload Section */}
        {!uploaded && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <Upload size={60} color="#92400e" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#92400e' }}>
              {text.upload}
            </h2>
            
            <div style={{
              border: '3px dashed #d1d5db',
              borderRadius: '15px',
              padding: '60px',
              marginBottom: '30px',
              background: '#f9fafb'
            }}>
              <FileText size={50} color="#92400e" style={{ marginBottom: '15px' }} />
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '15px' }}>
                {text.dragDrop}
              </p>
              <p style={{ color: '#999', marginBottom: '20px' }}>{text.or}</p>
              <label style={{
                padding: '15px 40px',
                background: '#92400e',
                color: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                {text.browse}
                <input
                  type="file"
                  accept=".pdf,.xlsx,.csv"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#999' }}>
                {text.accepted}
              </p>
            </div>
          </div>
        )}

        {/* Analyzing */}
        {analyzing && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div className="spinner" style={{
              width: '60px',
              height: '60px',
              border: '6px solid #f3f4f6',
              borderTop: '6px solid #92400e',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }} />
            <h3 style={{ fontSize: '1.5rem', color: '#92400e' }}>{text.analyzing}</h3>
            <p style={{ color: '#666', marginTop: '10px' }}>
              {language === 'en' ? 'Extracting parameters and comparing to optimal ranges...' : 'Extrayendo parámetros y comparando con rangos óptimos...'}
            </p>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <>
            {/* Soil Parameters */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#92400e' }}>
                {text.results}
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fef3c7', borderBottom: '2px solid #92400e' }}>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#92400e' }}>{text.parameter}</th>
                      <th style={{ padding: '15px', textAlign: 'center', color: '#92400e' }}>{text.value}</th>
                      <th style={{ padding: '15px', textAlign: 'center', color: '#92400e' }}>{text.optimal}</th>
                      <th style={{ padding: '15px', textAlign: 'center', color: '#92400e' }}>{text.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soilData.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.parameter}</td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          {item.value} {item.unit}
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center', color: '#666' }}>
                          {item.optimal} {item.unit}
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <span style={{
                            padding: '8px 15px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            background: item.status === 'optimal' ? '#d1fae5' : item.status === 'low' ? '#fef3c7' : '#fee2e2',
                            color: item.status === 'optimal' ? '#065f46' : item.status === 'low' ? '#92400e' : '#991b1b'
                          }}>
                            {item.icon} {item.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fertilizer Plan */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#92400e' }}>
                {text.fertPlan}
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fef3c7', borderBottom: '2px solid #92400e' }}>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#92400e' }}>{text.product}</th>
                      <th style={{ padding: '15px', textAlign: 'center', color: '#92400e' }}>{text.quantity}</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#92400e' }}>{text.purpose}</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#92400e' }}>{text.application}</th>
                      <th style={{ padding: '15px', textAlign: 'right', color: '#92400e' }}>{text.cost}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fertilizerPlan[language].map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.product}</td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ padding: '15px', color: '#666' }}>{item.purpose}</td>
                        <td style={{ padding: '15px', color: '#666', fontSize: '0.9rem' }}>{item.application}</td>
                        <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: '#92400e' }}>
                          ${item.costPerAcre}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: '#fef3c7', fontWeight: 'bold' }}>
                      <td colSpan="4" style={{ padding: '15px', textAlign: 'right', color: '#92400e' }}>
                        {text.totalCost}:
                      </td>
                      <td style={{ padding: '15px', textAlign: 'right', fontSize: '1.3rem', color: '#92400e' }}>
                        ${totalCost}{text.perAcre}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ROI & Yield */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <TrendingUp size={32} color="#10b981" />
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#666' }}>{text.yield}</span>
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '10px' }}>
                  +45%
                </div>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>{text.yieldDesc}</p>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <DollarSign size={32} color="#92400e" />
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#666' }}>{text.roi}</span>
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#92400e', marginBottom: '10px' }}>
                  280%
                </div>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>{text.roiDesc}</p>
              </div>
            </div>

            {/* Add to Cart */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <button
                onClick={handleAddAnalysisToCart}
                style={{
                  padding: '20px 50px',
                  background: '#92400e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(146, 64, 14, 0.3)'
                }}
              >
                {text.addToCart}
              </button>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SoilAnalysis;
