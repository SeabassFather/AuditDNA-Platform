// ================================================================
// PROTEIN/MEAT MODULE - ADVANCED SEARCH ENGINE
// ================================================================
// Date: 2025-11-12 07:36:05 UTC
// User: SeabassFather
// Status: PRODUCTION READY
// ================================================================

import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProteinMeatModule = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fobLocation, setFobLocation] = useState('FOB LA');
  const [quoteBasket, setQuoteBasket] = useState([]);

  // MEAT DATABASE - ALL 35 CUTS
  const MEAT_DATABASE = [
    { id: 1, nameMX: 'ARRACHERA INSIDE', nameUS: 'INSIDE SKIRT', category: 'Premium Cuts', hsCode: '0202.30.80', fobMX: 8.50, fobLA: 9.20, fobPort: 9.50, caseWeight: 50, casesPerPallet: 24 },
    { id: 2, nameMX: 'ARRACHERA OUTSIDE', nameUS: 'OUTSIDE SKIRT', category: 'Premium Cuts', hsCode: '0202.30.80', fobMX: 9.20, fobLA: 10.00, fobPort: 10.30, caseWeight: 50, casesPerPallet: 24 },
    { id: 3, nameMX: 'ARRACHERA VACIO', nameUS: 'FLAP 185 A', category: 'Premium Cuts', hsCode: '0202.30.50', fobMX: 7.80, fobLA: 8.50, fobPort: 8.80, caseWeight: 50, casesPerPallet: 24 },
    { id: 4, nameMX: 'CENTRO DE PALETA', nameUS: 'SHOULDER CLOD', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 6.50, fobLA: 7.20, fobPort: 7.50, caseWeight: 60, casesPerPallet: 20 },
    { id: 5, nameMX: 'CHAMBARETE', nameUS: 'HIND/FORE SHANKS', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 5.20, fobLA: 5.80, fobPort: 6.10, caseWeight: 40, casesPerPallet: 30 },
    { id: 6, nameMX: 'COLA DE RES', nameUS: 'OXTAIL', category: 'Specialty Items', hsCode: '0202.30.90', fobMX: 12.50, fobLA: 13.50, fobPort: 13.90, caseWeight: 30, casesPerPallet: 40 },
    { id: 7, nameMX: 'CONCHITA', nameUS: 'FLANK STEAK', category: 'Premium Cuts', hsCode: '0202.30.50', fobMX: 9.80, fobLA: 10.60, fobPort: 10.90, caseWeight: 50, casesPerPallet: 24 },
    { id: 8, nameMX: 'COSTILLA CARGADA', nameUS: 'CHUCK SHORT RIB', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 8.20, fobLA: 8.90, fobPort: 9.20, caseWeight: 50, casesPerPallet: 24 },
    { id: 9, nameMX: 'COSTILLA DE RES', nameUS: 'NAVELS', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 7.50, fobLA: 8.20, fobPort: 8.50, caseWeight: 50, casesPerPallet: 24 },
    { id: 10, nameMX: 'COSTILLA RIB', nameUS: 'BACK RIB', category: 'Premium Cuts', hsCode: '0202.30.50', fobMX: 9.50, fobLA: 10.30, fobPort: 10.60, caseWeight: 40, casesPerPallet: 30 },
    { id: 11, nameMX: 'CUNA', nameUS: 'CHUCK TENDER', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 7.20, fobLA: 7.90, fobPort: 8.20, caseWeight: 50, casesPerPallet: 24 },
    { id: 12, nameMX: 'DIEZMILLO SIN HUESO', nameUS: 'CHUCK ROLL', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 8.80, fobLA: 9.50, fobPort: 9.80, caseWeight: 60, casesPerPallet: 20 },
    { id: 13, nameMX: 'EMPUJE', nameUS: 'TRI TIP', category: 'Premium Cuts', hsCode: '0202.30.50', fobMX: 10.20, fobLA: 11.00, fobPort: 11.30, caseWeight: 40, casesPerPallet: 30 },
    { id: 14, nameMX: 'FALDA DE RES', nameUS: 'LIFTER MEAT', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 6.80, fobLA: 7.40, fobPort: 7.70, caseWeight: 50, casesPerPallet: 24 },
    { id: 15, nameMX: 'FILETE DE RES', nameUS: 'TENDERLOIN', category: 'Premium Cuts', hsCode: '0202.20.00', fobMX: 18.50, fobLA: 20.00, fobPort: 20.50, caseWeight: 30, casesPerPallet: 40 },
    { id: 16, nameMX: 'GALLITO', nameUS: 'HANGING TENDER', category: 'Specialty Items', hsCode: '0202.30.50', fobMX: 11.20, fobLA: 12.10, fobPort: 12.50, caseWeight: 30, casesPerPallet: 40 },
    { id: 17, nameMX: 'GIBA', nameUS: 'HUMP', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 5.80, fobLA: 6.30, fobPort: 6.60, caseWeight: 50, casesPerPallet: 24 },
    { id: 18, nameMX: 'NEW YORK', nameUS: 'STRIP LOIN 0X1', category: 'Premium Cuts', hsCode: '0202.20.00', fobMX: 15.20, fobLA: 16.40, fobPort: 16.90, caseWeight: 40, casesPerPallet: 30 },
    { id: 19, nameMX: 'PECHO', nameUS: 'BRISKET', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 7.80, fobLA: 8.50, fobPort: 8.80, caseWeight: 60, casesPerPallet: 20 },
    { id: 20, nameMX: 'PESCUEZO SIN HUESO', nameUS: 'NECK MEAT', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 4.80, fobLA: 5.20, fobPort: 5.50, caseWeight: 50, casesPerPallet: 24 },
    { id: 21, nameMX: 'PLATANILLO/LAGARTO', nameUS: 'BANANA SHANK', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 6.20, fobLA: 6.70, fobPort: 7.00, caseWeight: 40, casesPerPallet: 30 },
    { id: 22, nameMX: 'PULPA BOLA', nameUS: 'PEELED KNUCKLE', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 8.50, fobLA: 9.20, fobPort: 9.50, caseWeight: 60, casesPerPallet: 20 },
    { id: 23, nameMX: 'PULPA LARGA', nameUS: 'GOOSENECK', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 7.90, fobLA: 8.60, fobPort: 8.90, caseWeight: 60, casesPerPallet: 20 },
    { id: 24, nameMX: 'PULPA NEGRA', nameUS: 'INSIDE ROUND', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 8.20, fobLA: 8.90, fobPort: 9.20, caseWeight: 60, casesPerPallet: 20 },
    { id: 25, nameMX: 'RECORTE 80/20', nameUS: 'TRIMMING 80/20', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 5.50, fobLA: 6.00, fobPort: 6.30, caseWeight: 50, casesPerPallet: 24 },
    { id: 26, nameMX: 'RETRO CON HUESO', nameUS: 'NECK BONE', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 4.20, fobLA: 4.60, fobPort: 4.90, caseWeight: 50, casesPerPallet: 24 },
    { id: 27, nameMX: 'RIB EYE', nameUS: 'RIB EYE', category: 'Premium Cuts', hsCode: '0202.20.00', fobMX: 16.80, fobLA: 18.10, fobPort: 18.60, caseWeight: 40, casesPerPallet: 30 },
    { id: 28, nameMX: 'SHORT RIB', nameUS: 'SHORT RIB 123', category: 'Premium Cuts', hsCode: '0202.30.50', fobMX: 9.20, fobLA: 9.90, fobPort: 10.20, caseWeight: 50, casesPerPallet: 24 },
    { id: 29, nameMX: 'SUADERO', nameUS: 'ROSE MEAT', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 6.50, fobLA: 7.00, fobPort: 7.30, caseWeight: 50, casesPerPallet: 24 },
    { id: 30, nameMX: 'T-BONE', nameUS: 'SHORT LOIN 0X1', category: 'Premium Cuts', hsCode: '0202.20.00', fobMX: 14.50, fobLA: 15.70, fobPort: 16.10, caseWeight: 40, casesPerPallet: 30 },
    { id: 31, nameMX: 'TOP SIRLOIN', nameUS: 'SIRLOIN', category: 'Premium Cuts', hsCode: '0202.30.50', fobMX: 10.50, fobLA: 11.30, fobPort: 11.60, caseWeight: 50, casesPerPallet: 24 },
    { id: 32, nameMX: 'RIB 109', nameUS: 'RIB 109', category: 'Premium Cuts', hsCode: '0202.20.00', fobMX: 13.20, fobLA: 14.30, fobPort: 14.70, caseWeight: 60, casesPerPallet: 20 },
    { id: 33, nameMX: 'AGUAYON', nameUS: 'TOP SIRLOIN CAP (PICANHA)', category: 'Specialty Items', hsCode: '0202.30.50', fobMX: 11.80, fobLA: 12.80, fobPort: 13.20, caseWeight: 40, casesPerPallet: 30 },
    { id: 34, nameMX: 'CHAMORRO', nameUS: 'OSSO BUCO (BEEF SHANK)', category: 'Specialty Items', hsCode: '0202.30.50', fobMX: 5.50, fobLA: 6.10, fobPort: 6.40, caseWeight: 45, casesPerPallet: 26 },
    { id: 35, nameMX: 'ESPALDILLA', nameUS: 'SHOULDER PETITE TENDER', category: 'Value Cuts', hsCode: '0202.30.50', fobMX: 9.50, fobLA: 10.30, fobPort: 10.60, caseWeight: 35, casesPerPallet: 34 }
  ];

  const categories = ['All', 'Premium Cuts', 'Value Cuts', 'Specialty Items'];

  const filteredMeat = useMemo(() => {
    return MEAT_DATABASE.filter(meat => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = meat.nameMX.toLowerCase().includes(searchLower) || meat.nameUS.toLowerCase().includes(searchLower);
      const matchesCategory = selectedCategory === 'All' || meat.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCurrentPrice = (meat) => {
    switch(fobLocation) {
      case 'FOB Mexico': return meat.fobMX;
      case 'FOB LA': return meat.fobLA;
      case 'FOB Port': return meat.fobPort;
      default: return meat.fobLA;
    }
  };

  const addToQuote = (meat, quantity) => {
    setQuoteBasket([...quoteBasket, { ...meat, quantity, fobSelected: fobLocation, price: getCurrentPrice(meat) }]);
  };

  return (
    <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
      
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '1.5rem' }}>
          🔍 {language === 'en' ? 'Advanced Protein Search Engine - 35 Premium Cuts' : 'Buscador Avanzado Proteína - 35 Cortes Premium'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600' }}>
              {language === 'en' ? 'Search Cut' : 'Buscar Corte'}
            </label>
            <input
              type="text"
              placeholder={language === 'en' ? 'e.g., RIB EYE, ARRACHERA...' : 'ej., RIB EYE, ARRACHERA...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '2px solid #334155',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600' }}>
              {language === 'en' ? 'Category' : 'Categoría'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '2px solid #334155',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600' }}>
              {language === 'en' ? 'FOB Location' : 'Ubicación FOB'}
            </label>
            <select
              value={fobLocation}
              onChange={(e) => setFobLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '2px solid #22c55e',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                outline: 'none'
              }}
            >
              <option value="FOB Mexico">🇲🇽 FOB Mexico</option>
              <option value="FOB LA">🇺🇸 FOB Los Angeles</option>
              <option value="FOB Port">🚢 FOB Port of Entry</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
          {language === 'en' ? 'Showing' : 'Mostrando'} <strong style={{ color: '#22c55e', fontSize: '1.2rem' }}>{filteredMeat.length}</strong> {language === 'en' ? 'of' : 'de'} {MEAT_DATABASE.length} {language === 'en' ? 'cuts' : 'cortes'}
        </div>
      </div>

      {quoteBasket.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>
            📋 {language === 'en' ? 'Quote Basket' : 'Carrito Cotización'} ({quoteBasket.length})
          </h3>
          <button style={{ padding: '1rem 2rem', background: '#fff', color: '#22c55e', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            {language === 'en' ? 'Generate RFQ' : 'Generar Cotización'}
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredMeat.map(meat => (
          <MeatCard key={meat.id} meat={meat} fobLocation={fobLocation} getCurrentPrice={getCurrentPrice} addToQuote={addToQuote} language={language} />
        ))}
      </div>
    </div>
  );
};

const MeatCard = ({ meat, fobLocation, getCurrentPrice, addToQuote, language }) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('Cases');
  
  const currentPrice = getCurrentPrice(meat);
  const totalWeight = unit === 'Cases' ? quantity * meat.caseWeight : quantity * meat.casesPerPallet * meat.caseWeight;
  const totalPrice = currentPrice * totalWeight;

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>{meat.nameMX}</div>
        <div style={{ fontSize: '1rem', color: '#22c55e', fontWeight: '600' }}>{meat.nameUS}</div>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>HS: {meat.hsCode} • {meat.category}</div>
      </div>

      <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{fobLocation}</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>${currentPrice.toFixed(2)}/lb</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{meat.caseWeight} lbs/case • {meat.casesPerPallet} cases/pallet</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            {language === 'en' ? 'Quantity' : 'Cantidad'}
          </label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '100%', padding: '0.5rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff', textAlign: 'center' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            {language === 'en' ? 'Unit' : 'Unidad'}
          </label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '8px', color: '#fff' }}>
            <option>Cases</option>
            <option>Pallets</option>
          </select>
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '8px' }}>
        <div><strong>{language === 'en' ? 'Total Weight' : 'Peso Total'}:</strong> {totalWeight.toLocaleString()} lbs</div>
        <div style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 'bold' }}>
          <strong>{language === 'en' ? 'Total' : 'Total'}:</strong> ${totalPrice.toFixed(2)}
        </div>
      </div>

      <button onClick={() => addToQuote(meat, quantity)} style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
        {language === 'en' ? 'Add to Quote Basket' : 'Agregar a Cotización'}
      </button>
    </div>
  );
};

export default ProteinMeatModule;