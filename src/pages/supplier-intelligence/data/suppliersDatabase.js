// ================================================================
// SUPPLIER DATABASE - 500+ GROWERS & SUPPLIERS
// ================================================================
// Date: 2025-11-12 19:21:34 UTC
// User: SeabassFather
// Purpose: Comprehensive grower/supplier database with certifications
// ================================================================

export const suppliersDatabase = [
  // ============================================================
  // AVOCADO SUPPLIERS (MEXICO)
  // ============================================================
  {
    id: 'SUP-001',
    name: 'Green Valley Farms',
    type: 'Grower',
    products: ['Hass Avocado', 'Bacon Avocado'],
    location: {
      state: 'Michoacán',
      city: 'Uruapan',
      country: 'Mexico'
    },
    contact: {
      name: 'Juan Carlos Mendez',
      phone: '+52-443-123-4567',
      email: 'jc.mendez@greenvalleyfarms.mx',
      position: 'Operations Manager'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2026-01-15', certNumber: 'GG-MEX-001234' },
      { type: 'PRIMUS', status: 'Valid', expiryDate: '2025-03-10', certNumber: 'PR-MEX-567890' },
      { type: 'USDA Organic', status: 'Valid', expiryDate: '2025-12-20', certNumber: 'USDA-ORG-001' }
    ],
    inventory: [
      {
        product: 'Hass Avocado',
        available: 40,
        unit: 'pallets',
        pricePerLb: 2.08,
        availableDate: '2025-11-15',
        quality: 'Premium',
        size: '48-60 count'
      }
    ],
    rating: 4.8,
    verified: true,
    yearsInBusiness: 15,
    lastUpdated: '2025-11-12'
  },
  {
    id: 'SUP-002',
    name: 'Azteca Produce',
    type: 'Grower',
    products: ['Hass Avocado'],
    location: {
      state: 'Jalisco',
      city: 'Guadalajara',
      country: 'Mexico'
    },
    contact: {
      name: 'Maria Elena Rodriguez',
      phone: '+52-333-987-6543',
      email: 'm.rodriguez@aztecaproduce.mx',
      position: 'Sales Director'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2025-12-20', certNumber: 'GG-MEX-002345' },
      { type: 'PRIMUS', status: 'Expiring Soon', expiryDate: '2025-11-27', certNumber: 'PR-MEX-678901' },
      { type: 'Rainforest Alliance', status: 'Valid', expiryDate: '2026-06-30', certNumber: 'RA-MEX-123' }
    ],
    inventory: [
      {
        product: 'Hass Avocado',
        available: 25,
        unit: 'pallets',
        pricePerLb: 2.15,
        availableDate: 'NOW',
        quality: 'Standard',
        size: '60-70 count'
      }
    ],
    rating: 4.5,
    verified: true,
    yearsInBusiness: 12,
    lastUpdated: '2025-11-12'
  },
  {
    id: 'SUP-003',
    name: 'Sierra Madre Organics',
    type: 'Grower',
    products: ['Hass Avocado', 'Fuerte Avocado'],
    location: {
      state: 'Nayarit',
      city: 'Tepic',
      country: 'Mexico'
    },
    contact: {
      name: 'Roberto Sanchez',
      phone: '+52-311-456-7890',
      email: 'r.sanchez@sierramadreorganics.mx',
      position: 'CEO'
    },
    certifications: [
      { type: 'USDA Organic', status: 'Valid', expiryDate: '2026-08-15', certNumber: 'USDA-ORG-002' },
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2025-11-30', certNumber: 'GG-MEX-003456' },
      { type: 'Fair Trade', status: 'Valid', expiryDate: '2026-03-20', certNumber: 'FT-MEX-456' }
    ],
    inventory: [
      {
        product: 'Hass Avocado',
        available: 60,
        unit: 'pallets',
        pricePerLb: 2.35,
        availableDate: '2025-11-20',
        quality: 'Organic Premium',
        size: '48-60 count'
      }
    ],
    rating: 4.9,
    verified: true,
    yearsInBusiness: 20,
    lastUpdated: '2025-11-11'
  },

  // ============================================================
  // TOMATO SUPPLIERS (MEXICO)
  // ============================================================
  {
    id: 'SUP-004',
    name: 'Sinaloa Fresh Tomatoes',
    type: 'Grower',
    products: ['Roma Tomato', 'Cherry Tomato', 'Beefsteak Tomato'],
    location: {
      state: 'Sinaloa',
      city: 'Culiacán',
      country: 'Mexico'
    },
    contact: {
      name: 'Carlos Valdez',
      phone: '+52-667-234-5678',
      email: 'c.valdez@sinaloafresh.mx',
      position: 'Operations Manager'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2026-02-28', certNumber: 'GG-MEX-004567' },
      { type: 'PRIMUS', status: 'Valid', expiryDate: '2025-10-15', certNumber: 'PR-MEX-789012' },
      { type: 'Mexico Supreme Quality', status: 'Valid', expiryDate: '2026-05-10', certNumber: 'MSQ-123' }
    ],
    inventory: [
      {
        product: 'Roma Tomato',
        available: 80,
        unit: 'pallets',
        pricePerLb: 1.12,
        availableDate: 'NOW',
        quality: 'Premium',
        size: '25lb box'
      },
      {
        product: 'Cherry Tomato',
        available: 35,
        unit: 'pallets',
        pricePerLb: 1.85,
        availableDate: 'NOW',
        quality: 'Premium',
        size: '12-pint flat'
      }
    ],
    rating: 4.7,
    verified: true,
    yearsInBusiness: 18,
    lastUpdated: '2025-11-12'
  },

  // ============================================================
  // BELL PEPPER SUPPLIERS (MEXICO)
  // ============================================================
  {
    id: 'SUP-005',
    name: 'Sonora Bell Peppers LLC',
    type: 'Grower',
    products: ['Red Bell Pepper', 'Yellow Bell Pepper', 'Green Bell Pepper'],
    location: {
      state: 'Sonora',
      city: 'Hermosillo',
      country: 'Mexico'
    },
    contact: {
      name: 'Ana Patricia Gomez',
      phone: '+52-662-345-6789',
      email: 'ap.gomez@sonorabellpeppers.mx',
      position: 'Sales Manager'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2025-12-15', certNumber: 'GG-MEX-005678' },
      { type: 'PRIMUS', status: 'Valid', expiryDate: '2026-04-20', certNumber: 'PR-MEX-890123' },
      { type: 'HACCP', status: 'Valid', expiryDate: '2026-01-30', certNumber: 'HACCP-MEX-789' }
    ],
    inventory: [
      {
        product: 'Red Bell Pepper',
        available: 45,
        unit: 'pallets',
        pricePerLb: 1.58,
        availableDate: 'NOW',
        quality: 'Premium',
        size: '11lb box'
      },
      {
        product: 'Yellow Bell Pepper',
        available: 30,
        unit: 'pallets',
        pricePerLb: 1.65,
        availableDate: '2025-11-18',
        quality: 'Standard',
        size: '11lb box'
      }
    ],
    rating: 4.6,
    verified: true,
    yearsInBusiness: 14,
    lastUpdated: '2025-11-11'
  },

  // ============================================================
  // BERRY SUPPLIERS (MEXICO)
  // ============================================================
  {
    id: 'SUP-006',
    name: 'Baja Berry Farms',
    type: 'Grower',
    products: ['Strawberry', 'Blueberry', 'Raspberry', 'Blackberry'],
    location: {
      state: 'Baja California',
      city: 'Ensenada',
      country: 'Mexico'
    },
    contact: {
      name: 'Luis Alberto Castillo',
      phone: '+52-646-456-7890',
      email: 'la.castillo@bajaberryfarms.mx',
      position: 'Production Director'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2026-03-15', certNumber: 'GG-MEX-006789' },
      { type: 'PRIMUS', status: 'Valid', expiryDate: '2025-11-25', certNumber: 'PR-MEX-901234' },
      { type: 'USDA Organic', status: 'Valid', expiryDate: '2026-07-10', certNumber: 'USDA-ORG-003' },
      { type: 'SQF Level 2', status: 'Valid', expiryDate: '2026-02-28', certNumber: 'SQF-MEX-456' }
    ],
    inventory: [
      {
        product: 'Strawberry',
        available: 50,
        unit: 'pallets',
        pricePerLb: 2.45,
        availableDate: 'NOW',
        quality: 'Organic Premium',
        size: '8-pack 1lb clamshell'
      },
      {
        product: 'Blueberry',
        available: 25,
        unit: 'pallets',
        pricePerLb: 4.25,
        availableDate: '2025-11-16',
        quality: 'Organic Premium',
        size: '12-pack 6oz clamshell'
      }
    ],
    rating: 4.9,
    verified: true,
    yearsInBusiness: 22,
    lastUpdated: '2025-11-12'
  },

  // ============================================================
  // CUCUMBER SUPPLIERS (MEXICO)
  // ============================================================
  {
    id: 'SUP-007',
    name: 'Zacatecas Cucumber Co.',
    type: 'Grower',
    products: ['Cucumber', 'Persian Cucumber', 'English Cucumber'],
    location: {
      state: 'Zacatecas',
      city: 'Zacatecas',
      country: 'Mexico'
    },
    contact: {
      name: 'Fernando Morales',
      phone: '+52-492-567-8901',
      email: 'f.morales@zacatecascucumber.mx',
      position: 'Operations Manager'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2025-10-30', certNumber: 'GG-MEX-007890' },
      { type: 'PRIMUS', status: 'Expiring Soon', expiryDate: '2025-11-20', certNumber: 'PR-MEX-012345' },
      { type: 'Mexico Good Agricultural Practices', status: 'Valid', expiryDate: '2026-04-15', certNumber: 'MGAP-567' }
    ],
    inventory: [
      {
        product: 'Cucumber',
        available: 55,
        unit: 'pallets',
        pricePerLb: 0.85,
        availableDate: 'NOW',
        quality: 'Standard',
        size: '24-count box'
      }
    ],
    rating: 4.4,
    verified: true,
    yearsInBusiness: 10,
    lastUpdated: '2025-11-10'
  },

  // ============================================================
  // LETTUCE SUPPLIERS (MEXICO)
  // ============================================================
  {
    id: 'SUP-008',
    name: 'Guanajuato Greens',
    type: 'Grower',
    products: ['Romaine Lettuce', 'Iceberg Lettuce', 'Mixed Greens'],
    location: {
      state: 'Guanajuato',
      city: 'Celaya',
      country: 'Mexico'
    },
    contact: {
      name: 'Patricia Hernandez',
      phone: '+52-461-678-9012',
      email: 'p.hernandez@guanajuatogreens.mx',
      position: 'Sales Director'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2026-05-20', certNumber: 'GG-MEX-008901' },
      { type: 'PRIMUS', status: 'Valid', expiryDate: '2025-12-10', certNumber: 'PR-MEX-123456' },
      { type: 'Leafy Greens Marketing Agreement', status: 'Valid', expiryDate: '2026-06-30', certNumber: 'LGMA-MEX-789' }
    ],
    inventory: [
      {
        product: 'Romaine Lettuce',
        available: 75,
        unit: 'pallets',
        pricePerLb: 1.35,
        availableDate: 'NOW',
        quality: 'Premium',
        size: '24-count carton'
      }
    ],
    rating: 4.7,
    verified: true,
    yearsInBusiness: 16,
    lastUpdated: '2025-11-12'
  },

  // ============================================================
  // ADDITIONAL SUPPLIERS (Expanding to 500+)
  // Note: This is a starter template. We'll add more via CSV upload
  // ============================================================
  {
    id: 'SUP-009',
    name: 'Durango Chili Peppers',
    type: 'Grower',
    products: ['Jalapeño', 'Serrano', 'Poblano', 'Habanero'],
    location: {
      state: 'Durango',
      city: 'Victoria de Durango',
      country: 'Mexico'
    },
    contact: {
      name: 'Miguel Angel Torres',
      phone: '+52-618-789-0123',
      email: 'm.torres@durangochili.mx',
      position: 'CEO'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2026-01-25', certNumber: 'GG-MEX-009012' },
      { type: 'PRIMUS', status: 'Valid', expiryDate: '2025-09-15', certNumber: 'PR-MEX-234567' }
    ],
    inventory: [
      {
        product: 'Jalapeño',
        available: 40,
        unit: 'pallets',
        pricePerLb: 0.95,
        availableDate: 'NOW',
        quality: 'Premium',
        size: '25lb box'
      }
    ],
    rating: 4.5,
    verified: true,
    yearsInBusiness: 13,
    lastUpdated: '2025-11-11'
  },
  {
    id: 'SUP-010',
    name: 'Veracruz Tropical Fruits',
    type: 'Grower',
    products: ['Mango', 'Papaya', 'Pineapple', 'Passion Fruit'],
    location: {
      state: 'Veracruz',
      city: 'Veracruz',
      country: 'Mexico'
    },
    contact: {
      name: 'Sofia Martinez',
      phone: '+52-229-890-1234',
      email: 's.martinez@veracruztropical.mx',
      position: 'Export Manager'
    },
    certifications: [
      { type: 'GlobalGAP', status: 'Valid', expiryDate: '2025-11-28', certNumber: 'GG-MEX-010123' },
      { type: 'USDA Organic', status: 'Valid', expiryDate: '2026-09-10', certNumber: 'USDA-ORG-004' },
      { type: 'Fair Trade', status: 'Valid', expiryDate: '2026-04-20', certNumber: 'FT-MEX-890' }
    ],
    inventory: [
      {
        product: 'Mango',
        available: 90,
        unit: 'pallets',
        pricePerLb: 1.45,
        availableDate: '2025-11-25',
        quality: 'Organic Premium',
        size: '10lb box'
      }
    ],
    rating: 4.8,
    verified: true,
    yearsInBusiness: 19,
    lastUpdated: '2025-11-12'
  }
];

// ============================================================
// PRODUCT CATEGORIES (500+ commodities)
// ============================================================
export const productCategories = [
  {
    category: 'Avocados',
    items: ['Hass Avocado', 'Bacon Avocado', 'Fuerte Avocado', 'Reed Avocado', 'Pinkerton Avocado']
  },
  {
    category: 'Tomatoes',
    items: ['Roma Tomato', 'Cherry Tomato', 'Beefsteak Tomato', 'Grape Tomato', 'Heirloom Tomato', 'Campari Tomato']
  },
  {
    category: 'Peppers',
    items: ['Red Bell Pepper', 'Yellow Bell Pepper', 'Green Bell Pepper', 'Orange Bell Pepper', 'Jalapeño', 'Serrano', 'Poblano', 'Habanero', 'Anaheim', 'Cubanelle']
  },
  {
    category: 'Berries',
    items: ['Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Boysenberry', 'Gooseberry']
  },
  {
    category: 'Cucumbers',
    items: ['Cucumber', 'Persian Cucumber', 'English Cucumber', 'Pickling Cucumber', 'Lemon Cucumber']
  },
  {
    category: 'Lettuce & Greens',
    items: ['Romaine Lettuce', 'Iceberg Lettuce', 'Mixed Greens', 'Butter Lettuce', 'Red Leaf Lettuce', 'Green Leaf Lettuce', 'Arugula', 'Spinach', 'Kale']
  },
  {
    category: 'Tropical Fruits',
    items: ['Mango', 'Papaya', 'Pineapple', 'Passion Fruit', 'Dragon Fruit', 'Guava', 'Lychee']
  },
  {
    category: 'Citrus',
    items: ['Orange', 'Lemon', 'Lime', 'Grapefruit', 'Mandarin', 'Tangerine', 'Blood Orange']
  },
  {
    category: 'Melons',
    items: ['Watermelon', 'Cantaloupe', 'Honeydew', 'Crenshaw', 'Casaba']
  },
  {
    category: 'Squash',
    items: ['Zucchini', 'Yellow Squash', 'Butternut Squash', 'Acorn Squash', 'Spaghetti Squash', 'Delicata Squash']
  }
  // ... (We can expand this to 500+ via CSV upload or API)
];

// ============================================================
// CERTIFICATION TYPES
// ============================================================
export const certificationTypes = [
  'GlobalGAP',
  'PRIMUS',
  'USDA Organic',
  'Fair Trade',
  'Rainforest Alliance',
  'HACCP',
  'SQF Level 2',
  'Mexico Supreme Quality',
  'Mexico Good Agricultural Practices',
  'Leafy Greens Marketing Agreement',
  'Food Safety Modernization Act (FSMA)',
  'BRC Global Standards',
  'IFS Food Standard'
];

// ============================================================
// MEXICAN STATES (Production Regions)
// ============================================================
export const mexicanStates = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
  'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos',
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas'
];