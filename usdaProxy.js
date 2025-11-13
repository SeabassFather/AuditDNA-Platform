// USDA API PROXY SERVER - BYPASSES CORS
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint for USDA AMS API
app.get('/api/usda-proxy', async (req, res) => {
  try {
    const { commodity } = req.query;
    const usdaUrl = `https://marsapi.ams.usda.gov/services/v1.2/reports/fr_rf`;
    
    const response = await axios.get(usdaUrl, {
      headers: {
        'User-Agent': 'AuditDNA/1.0',
        'Accept': 'application/json'
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('USDA API Error:', error.message);
    res.status(500).json({ 
      error: 'USDA API unavailable', 
      usingMockData: true,
      mockData: getMockData(req.query.commodity)
    });
  }
});

function getMockData(commodity) {
  const mockPrices = {
    'AVOCADOS': { price: 48.50, volume: '2.1M lbs/week', origin: 'CALIFORNIA/MEXICO' },
    'STRAWBERRIES': { price: 32.00, volume: '2.5M lbs/week', origin: 'CALIFORNIA/FLORIDA' },
    'LETTUCE': { price: 18.50, volume: '3.2M lbs/week', origin: 'CALIFORNIA/ARIZONA' }
  };
  return mockPrices[commodity] || { price: 0, volume: 'N/A', origin: 'UNKNOWN' };
}

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`✅ USDA Proxy Server running on http://localhost:${PORT}`);
});