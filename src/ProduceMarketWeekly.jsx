import React, { useState, useContext } from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const ProduceMarketWeekly = () => {
  const { language } = useLanguage();
  const [selectedProduce, setSelectedProduce] = useState('tomatoes');
  const [selectedQuarter, setSelectedQuarter] = useState('q1');

  // Generate 52 weeks of mock pricing data
  const generateWeeklyData = () => {
    const basePrice = 18;
    return Array.from({ length: 52 }, (_, i) => ({
      week: i + 1,
      price: (basePrice + Math.sin(i / 4) * 4 + Math.random() * 2).toFixed(2),
      volume: Math.floor(15000 + Math.random() * 10000)
    }));
  };

  const weeklyData = generateWeeklyData();

  const quarters = {
    q1: { start: 1, end: 13, label: language === 'en' ? 'Q1 (Weeks 1-13)' : 'T1 (Semanas 1-13)' },
    q2: { start: 14, end: 26, label: language === 'en' ? 'Q2 (Weeks 14-26)' : 'T2 (Semanas 14-26)' },
    q3: { start: 27, end: 39, label: language === 'en' ? 'Q3 (Weeks 27-39)' : 'T3 (Semanas 27-39)' },
    q4: { start: 40, end: 52, label: language === 'en' ? 'Q4 (Weeks 40-52)' : 'T4 (Semanas 40-52)' }
  };

  const filteredData = weeklyData.filter(w => 
    w.week >= quarters[selectedQuarter].start && w.week <= quarters[selectedQuarter].end
  );

  const avgPrice = (filteredData.reduce((sum, w) => sum + parseFloat(w.price), 0) / filteredData.length).toFixed(2);
  const maxWeek = filteredData.reduce((max, w) => parseFloat(w.price) > parseFloat(max.price) ? w : max);
  const minWeek = filteredData.reduce((min, w) => parseFloat(w.price) < parseFloat(min.price) ? w : min);

  const t = {
    en: {
      title: 'Weekly Market Pricing',
      subtitle: '52-week price calendar and trends',
      selectProduce: 'Select Produce',
      selectQuarter: 'Select Quarter',
      avgPrice: 'Average Price',
      peakWeek: 'Peak Week',
      lowWeek: 'Low Week',
      week: 'Week',
      price: 'Price',
      volume: 'Volume',
      boxes: 'boxes',
      allYear: 'Full Year View',
      fiveYear: '5-Year Historical'
    },
    es: {
      title: 'Precios Semanales',
      subtitle: 'Calendario de 52 semanas y tendencias',
      selectProduce: 'Seleccionar Producto',
      selectQuarter: 'Seleccionar Trimestre',
      avgPrice: 'Precio Promedio',
      peakWeek: 'Semana Pico',
      lowWeek: 'Semana Baja',
      week: 'Semana',
      price: 'Precio',
      volume: 'Volumen',
      boxes: 'cajas',
      allYear: 'Vista Anual',
      fiveYear: 'Histórico 5 Años'
    }
  };

  const text = t[language];

  const produceOptions = [
    { value: 'tomatoes', label: language === 'en' ? 'Tomatoes' : 'Tomates' },
    { value: 'strawberries', label: language === 'en' ? 'Strawberries' : 'Fresas' },
    { value: 'avocados', label: language === 'en' ? 'Avocados' : 'Aguacates' },
    { value: 'peppers', label: language === 'en' ? 'Peppers' : 'Pimientos' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
        </div>

        {/* Selectors */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#666' }}>
              {text.selectProduce}:
            </label>
            <select
              value={selectedProduce}
              onChange={(e) => setSelectedProduce(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {produceOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#666' }}>
              {text.selectQuarter}:
            </label>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {Object.keys(quarters).map(q => (
                <option key={q} value={q}>{quarters[q].label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <DollarSign size={28} color="#f59e0b" />
              <span style={{ fontSize: '1.1rem', color: '#666' }}>{text.avgPrice}</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
              ${avgPrice}
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <TrendingUp size={28} color="#10b981" />
              <span style={{ fontSize: '1.1rem', color: '#666' }}>{text.peakWeek}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {text.week} {maxWeek.week}
            </div>
            <div style={{ fontSize: '1.2rem', color: '#10b981', marginTop: '5px' }}>
              ${maxWeek.price}
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <TrendingDown size={28} color="#ef4444" />
              <span style={{ fontSize: '1.1rem', color: '#666' }}>{text.lowWeek}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
              {text.week} {minWeek.week}
            </div>
            <div style={{ fontSize: '1.2rem', color: '#ef4444', marginTop: '5px' }}>
              ${minWeek.price}
            </div>
          </div>
        </div>

        {/* Weekly Table */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          overflowX: 'auto'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#f59e0b' }}>
            {quarters[selectedQuarter].label}
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fef3c7', borderBottom: '2px solid #f59e0b' }}>
                <th style={{ padding: '15px', textAlign: 'left', color: '#92400e' }}>
                  {text.week}
                </th>
                <th style={{ padding: '15px', textAlign: 'right', color: '#92400e' }}>
                  {text.price}
                </th>
                <th style={{ padding: '15px', textAlign: 'right', color: '#92400e' }}>
                  {text.volume}
                </th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#92400e' }}>
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((week, idx) => {
                const prevPrice = idx > 0 ? parseFloat(filteredData[idx - 1].price) : parseFloat(week.price);
                const currentPrice = parseFloat(week.price);
                const trend = currentPrice > prevPrice ? 'up' : currentPrice < prevPrice ? 'down' : 'stable';

                return (
                  <tr key={week.week} style={{
                    borderBottom: '1px solid #e5e7eb',
                    background: week.week === maxWeek.week ? '#d1fae5' : week.week === minWeek.week ? '#fee2e2' : 'transparent'
                  }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>
                      <Calendar size={16} style={{ display: 'inline', marginRight: '8px' }} />
                      {text.week} {week.week}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                      ${week.price}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right', color: '#666' }}>
                      {week.volume.toLocaleString()} {text.boxes}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      {trend === 'up' && <TrendingUp size={20} color="#10b981" />}
                      {trend === 'down' && <TrendingDown size={20} color="#ef4444" />}
                      {trend === 'stable' && <span style={{ color: '#6b7280' }}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Historical Note */}
        <div style={{
          marginTop: '30px',
          background: 'white',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>
            💡 {language === 'en' 
              ? 'Use peak/low weeks to optimize planting and harvest timing for maximum profit' 
              : 'Usa semanas pico/bajas para optimizar siembra y cosecha para máximo beneficio'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProduceMarketWeekly;
