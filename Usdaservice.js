// ==========================================
// USDA API SERVICE
// Real-time commodity pricing from USDA QuickStats & AMS
// ==========================================

const USDA_API_KEY = process.env.REACT_APP_USDA_API_KEY || '4F158DB1-85C2-3243-BFFA-58B53FB40D23';
const USDA_QUICKSTATS_BASE = 'https://quickstats.nass.usda.gov/api/api_GET/';
const USDA_AMS_BASE = 'https://marsapi.ams.usda.gov/services/v1.2';

// ==========================================
// COMMODITY MAPPING (USDA names to MEXaUSA products)
// ==========================================
const COMMODITY_MAP = {
  'avocado': {
    usdaName: 'AVOCADOS',
    varieties: ['HASS', 'FUERTE', 'BACON'],
    states: ['CALIFORNIA', 'FLORIDA'],
    mexStates: ['MICHOACAN', 'JALISCO', 'NAYARIT']
  },
  'strawberry': {
    usdaName: 'STRAWBERRIES',
    varieties: ['ALL'],
    states: ['CALIFORNIA', 'FLORIDA'],
    mexStates: ['BAJA CALIFORNIA', 'MICHOACAN']
  },
  'lettuce': {
    usdaName: 'LETTUCE',
    varieties: ['ICEBERG', 'ROMAINE', 'LEAF'],
    states: ['CALIFORNIA', 'ARIZONA'],
    mexStates: ['GUANAJUATO', 'BAJA CALIFORNIA']
  },
  'broccoli': {
    usdaName: 'BROCCOLI',
    varieties: ['ALL'],
    states: ['CALIFORNIA', 'ARIZONA'],
    mexStates: ['GUANAJUATO', 'BAJA CALIFORNIA']
  }
};

// ==========================================
// FETCH USDA QUICKSTATS DATA
// ==========================================
export const fetchUSDAQuickStats = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      key: USDA_API_KEY,
      format: 'JSON',
      ...params
    });

    const response = await fetch(`${USDA_QUICKSTATS_BASE}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`USDA API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('USDA QuickStats API Error:', error);
    throw error;
  }
};

// ==========================================
// FETCH USDA AMS MARKET NEWS
// ==========================================
export const fetchUSDAMarketNews = async (commodity) => {
  try {
    const response = await fetch(
      `${USDA_AMS_BASE}/reports?q=commodity:${commodity.toLowerCase()}`
    );
    
    if (!response.ok) {
      throw new Error(`USDA AMS API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('USDA AMS API Error:', error);
    throw error;
  }
};

// ==========================================
// GET COMMODITY PRICES (QuickStats)
// ==========================================
export const getCommodityPrices = async (commodityType, year = new Date().getFullYear()) => {
  const mapping = COMMODITY_MAP[commodityType.toLowerCase()];
  
  if (!mapping) {
    throw new Error(`Unknown commodity: ${commodityType}`);
  }

  try {
    const data = await fetchUSDAQuickStats({
      commodity_desc: mapping.usdaName,
      year: year,
      statisticcat_desc: 'PRICE RECEIVED',
      state_name: 'CALIFORNIA' // Primary state, can be parameterized
    });

    return data;
  } catch (error) {
    console.error(`Error fetching ${commodityType} prices:`, error);
    return null;
  }
};

// ==========================================
// GET WEEKLY TERMINAL MARKET PRICES
// ==========================================
export const getTerminalMarketPrices = async (commodity) => {
  try {
    // USDA AMS Terminal Market Reports
    const reports = await fetchUSDAMarketNews(commodity);
    
    // Parse the latest price data from reports
    if (reports && reports.results && reports.results.length > 0) {
      const latestReport = reports.results[0];
      return parseTerminalPriceReport(latestReport);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching terminal prices:', error);
    return null;
  }
};

// ==========================================
// PARSE TERMINAL PRICE REPORT
// ==========================================
const parseTerminalPriceReport = (report) => {
  // This function parses USDA terminal market reports
  // Real implementation would parse the report text/PDF
  // For now, returning structured placeholder
  
  return {
    reportDate: report.published_date || new Date().toISOString(),
    market: report.market || 'Los Angeles',
    commodity: report.commodity || 'Unknown',
    prices: {
      low: report.low_price || 0,
      high: report.high_price || 0,
      average: report.avg_price || 0,
      mostlyPrice: report.mostly_price || 0
    },
    volume: report.volume || 0,
    reportUrl: report.report_url || ''
  };
};

// ==========================================
// GET AVOCADO SPECIFIC DATA (Most Important!)
// ==========================================
export const getAvocadoData = async () => {
  try {
    // Get USDA price data
    const priceData = await getCommodityPrices('avocado');
    
    // Get terminal market prices
    const terminalPrices = await getTerminalMarketPrices('avocados');
    
    // Get import data (Hass Avocado Board reports)
    const importData = await getAvocadoImportData();
    
    return {
      usdaPrices: priceData,
      terminalMarket: terminalPrices,
      imports: importData,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching avocado data:', error);
    return null;
  }
};

// ==========================================
// GET AVOCADO IMPORT DATA
// ==========================================
const getAvocadoImportData = async () => {
  try {
    // Fetch from USDA Foreign Agricultural Service
    // Or Hass Avocado Board API if available
    const response = await fetchUSDAQuickStats({
      commodity_desc: 'AVOCADOS',
      statisticcat_desc: 'IMPORTS',
      year: new Date().getFullYear()
    });
    
    return response;
  } catch (error) {
    console.error('Error fetching import data:', error);
    return null;
  }
};

// ==========================================
// GET PRICE BY REGION & SIZE
// ==========================================
export const getPriceByRegionAndSize = async (commodity, region, size) => {
  try {
    // This would query USDA AMS shipping point prices
    // Combined with size specifications
    
    const basePrice = await getCommodityPrices(commodity);
    
    // Apply regional and size adjustments
    const adjustedPrice = applyRegionalSizeAdjustments(basePrice, region, size);
    
    return adjustedPrice;
  } catch (error) {
    console.error('Error getting regional price:', error);
    return null;
  }
};

// ==========================================
// APPLY REGIONAL & SIZE PRICE ADJUSTMENTS
// ==========================================
const applyRegionalSizeAdjustments = (basePrice, region, size) => {
  // Regional multipliers (Mexico vs US sourcing)
  const regionalMultipliers = {
    'Michoacán': 0.85,
    'Jalisco': 0.87,
    'Sinaloa': 0.88,
    'Baja California': 0.90,
    'California': 1.0,
    'Florida': 0.95
  };
  
  // Size multipliers for avocados
  const sizeMultipliers = {
    '32s': 1.25, // Largest, most expensive
    '36s': 1.20,
    '40s': 1.10,
    '48s': 1.00, // Standard
    '60s': 0.90,
    '70s': 0.85,
    '84s': 0.80  // Smallest, least expensive
  };
  
  const regionalFactor = regionalMultipliers[region] || 1.0;
  const sizeFactor = sizeMultipliers[size] || 1.0;
  
  return {
    basePrice: basePrice,
    adjustedPrice: basePrice * regionalFactor * sizeFactor,
    regionalFactor,
    sizeFactor,
    region,
    size
  };
};

// ==========================================
// SEARCH COMMODITIES WITH LIVE PRICES
// ==========================================
export const searchCommoditiesWithPrices = async (searchTerm, filters = {}) => {
  try {
    const { category, region, size, maxPrice } = filters;
    
    // Get base commodity data
    let results = [];
    
    // Search through available commodities
    const commodityTypes = ['avocado', 'strawberry', 'lettuce', 'broccoli'];
    
    for (const commodityType of commodityTypes) {
      if (searchTerm && !commodityType.includes(searchTerm.toLowerCase())) {
        continue;
      }
      
      // Fetch live USDA prices
      const priceData = await getCommodityPrices(commodityType);
      
      if (priceData && priceData.data && priceData.data.length > 0) {
        // Get the most recent price
        const latestPrice = priceData.data[0];
        
        results.push({
          commodity: commodityType,
          usdaPrice: parseFloat(latestPrice.Value) || 0,
          unit: latestPrice.unit_desc || 'CWT',
          state: latestPrice.state_name,
          year: latestPrice.year,
          week: latestPrice.week_ending,
          source: 'USDA NASS QuickStats'
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error searching commodities:', error);
    return [];
  }
};

// ==========================================
// GET PRICE VOLATILITY INDEX
// ==========================================
export const getPriceVolatility = async (commodity, timeframe = 'weekly') => {
  try {
    // Fetch historical prices
    const currentYear = new Date().getFullYear();
    const historicalData = [];
    
    // Get last 3 years of data
    for (let year = currentYear - 2; year <= currentYear; year++) {
      const yearData = await getCommodityPrices(commodity, year);
      if (yearData && yearData.data) {
        historicalData.push(...yearData.data);
      }
    }
    
    // Calculate volatility (standard deviation of price changes)
    if (historicalData.length < 2) {
      return { volatility: 0, rating: 'Unknown' };
    }
    
    const prices = historicalData.map(d => parseFloat(d.Value)).filter(p => !isNaN(p));
    const mean = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    const variance = prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const volatility = (stdDev / mean) * 100; // Coefficient of variation
    
    // Rate volatility
    let rating = 'Low';
    if (volatility > 20) rating = 'High';
    else if (volatility > 10) rating = 'Medium';
    
    return {
      volatility: volatility.toFixed(2),
      rating,
      mean: mean.toFixed(2),
      stdDev: stdDev.toFixed(2),
      dataPoints: prices.length
    };
  } catch (error) {
    console.error('Error calculating volatility:', error);
    return { volatility: 0, rating: 'Error' };
  }
};

// ==========================================
// EXPORT ALL FUNCTIONS
// ==========================================
export default {
  fetchUSDAQuickStats,
  fetchUSDAMarketNews,
  getCommodityPrices,
  getTerminalMarketPrices,
  getAvocadoData,
  getPriceByRegionAndSize,
  searchCommoditiesWithPrices,
  getPriceVolatility
};