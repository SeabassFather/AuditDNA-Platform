// ==========================================
// MEXaUSA GROWER DATABASE
// Mexico & Central America Grower Profiles
// ==========================================

export const GROWERS_DATABASE = [
  // ========== MICHOACÁN AVOCADO GROWERS ==========
  {
    growerId: "GRW-MX-MICH-001",
    growerName: "Aguacates Finos de Michoacán S.A. de C.V.",
    businessName: "Aguacates Finos",
    type: "Grower-Packer",
    
    contact: {
      primaryContact: "Juan García Morales",
      title: "Director de Ventas Internacionales",
      phone: "+52-443-315-8700",
      email: "jgarcia@aguacatesfinos.com.mx",
      whatsapp: "+52-443-315-8700",
      website: "www.aguacatesfinos.com.mx"
    },
    
    location: {
      country: "Mexico",
      state: "Michoacán",
      city: "Uruapan",
      region: "Tierra Caliente",
      municipality: "Uruapan",
      coordinates: { lat: 19.4167, lng: -102.0667 },
      farmAddress: "Carretera Uruapan-Pátzcuaro Km 5.5, Col. La Joya"
    },
    
    operations: {
      acreage: 1500,
      productionCapacity: 800, // pallets per week
      packingHouse: true,
      coldStorage: true,
      coldStorageCapacity: "50,000 cubic feet",
      coolingSystems: ["Hydrocooling", "Forced Air", "Room Cooling"],
      qualityControl: "In-house QC lab with SENASICA certification",
      employees: 250
    },
    
    commoditiesGrown: [
      {
        commodityId: "avo-hass-48s",
        commodityName: "Avocado Hass 48s",
        sizesAvailable: ["32s", "36s", "40s", "48s", "60s", "70s"],
        weeklyVolume: 500, // cartons
        currentInventory: 2000,
        harvestSchedule: "Year-round (Peak: Nov-Apr)",
        qualityGrade: "Premium",
        organicCertified: false,
        pricePerCarton: 32.50
      },
      {
        commodityId: "avo-hass-60s",
        commodityName: "Avocado Hass 60s",
        sizesAvailable: ["60s", "70s", "84s"],
        weeklyVolume: 300,
        currentInventory: 1500,
        harvestSchedule: "Year-round",
        qualityGrade: "Premium",
        organicCertified: false,
        pricePerCarton: 28.00
      }
    ],
    
    certifications: [
      { name: "SENASICA", number: "SEN-16-12345-MICH", expires: "2025-12-31", status: "Active" },
      { name: "GLOBALG.A.P.", number: "GGN-4063061234567", expires: "2025-09-15", status: "Active" },
      { name: "Primus GFS", number: "PRI-MICH-12345", expires: "2025-11-30", status: "Active" },
      { name: "FDA FSVP", number: "FDA-12345", expires: "2026-06-30", status: "Active" }
    ],
    
    logistics: {
      preferredPOEs: ["Otay Mesa, CA", "Nogales, AZ", "Pharr, TX"],
      shippingMethods: ["Refrigerated Truck", "Cross-dock"],
      transportPartners: ["TQL", "C.H. Robinson", "Landstar"],
      paymentTerms: "Net 30, Wire Transfer",
      minimumOrder: 20, // pallets
      leadTime: "3-5 days to POE"
    },
    
    metrics: {
      yearsInBusiness: 28,
      qualityRating: 4.8,
      onTimeDelivery: 97,
      certificationCompliance: 100,
      customerSatisfaction: 4.7,
      totalDealsCompleted: 2450,
      verifiedSupplier: true,
      lastInspection: "2024-10-15"
    },
    
    financial: {
      creditRating: "A+",
      insuranceCoverage: "$10M USD Liability",
      bondedWarehouse: true,
      bankReferences: ["Banorte", "HSBC Mexico"]
    },
    
    status: {
      active: true,
      verified: true,
      lastUpdated: "2024-11-09",
      profileCompleteness: 98,
      responseTime: "< 2 hours"
    }
  },

  {
    growerId: "GRW-MX-MICH-002",
    growerName: "Productores Aguacateros Unidos S.P.R. de R.L.",
    businessName: "PAU Aguacates",
    type: "Grower Cooperative",
    
    contact: {
      primaryContact: "María Elena Rodríguez",
      title: "Gerente de Exportaciones",
      phone: "+52-452-523-1100",
      email: "mrodriguez@pauaguacates.com.mx",
      whatsapp: "+52-452-523-1100",
      website: "www.pauaguacates.com.mx"
    },
    
    location: {
      country: "Mexico",
      state: "Michoacán",
      city: "Peribán",
      region: "Meseta Purépecha",
      municipality: "Peribán de Ramos",
      coordinates: { lat: 19.5167, lng: -102.4167 },
      farmAddress: "Camino Real a Tancítaro Km 3.2"
    },
    
    operations: {
      acreage: 2200,
      productionCapacity: 1000,
      packingHouse: true,
      coldStorage: true,
      coldStorageCapacity: "75,000 cubic feet",
      coolingSystems: ["Hydrocooling", "Forced Air"],
      qualityControl: "Certified QC lab",
      employees: 350
    },
    
    commoditiesGrown: [
      {
        commodityId: "avo-hass-36s",
        commodityName: "Avocado Hass 36s (XL)",
        sizesAvailable: ["32s", "36s", "40s"],
        weeklyVolume: 400,
        currentInventory: 1800,
        harvestSchedule: "Peak: Nov-Apr",
        qualityGrade: "Extra Premium",
        organicCertified: true,
        pricePerCarton: 38.00
      },
      {
        commodityId: "avo-hass-48s",
        commodityName: "Avocado Hass 48s",
        sizesAvailable: ["48s", "60s"],
        weeklyVolume: 600,
        currentInventory: 2500,
        harvestSchedule: "Year-round",
        qualityGrade: "Premium",
        organicCertified: false,
        pricePerCarton: 32.50
      }
    ],
    
    certifications: [
      { name: "SENASICA", number: "SEN-16-67890-MICH", expires: "2025-11-30", status: "Active" },
      { name: "GLOBALG.A.P.", number: "GGN-4063061234568", expires: "2025-08-31", status: "Active" },
      { name: "Primus GFS", number: "PRI-MICH-67890", expires: "2025-10-15", status: "Active" },
      { name: "USDA Organic", number: "USDA-ORG-MICH-001", expires: "2026-03-15", status: "Active" }
    ],
    
    logistics: {
      preferredPOEs: ["Nogales, AZ", "Otay Mesa, CA"],
      shippingMethods: ["Refrigerated Truck"],
      transportPartners: ["Echo Global", "Coyote Logistics"],
      paymentTerms: "Net 30, Letter of Credit accepted",
      minimumOrder: 40,
      leadTime: "4-6 days to POE"
    },
    
    metrics: {
      yearsInBusiness: 35,
      qualityRating: 4.9,
      onTimeDelivery: 98,
      certificationCompliance: 100,
      customerSatisfaction: 4.8,
      totalDealsCompleted: 3200,
      verifiedSupplier: true,
      lastInspection: "2024-09-20"
    },
    
    financial: {
      creditRating: "AA",
      insuranceCoverage: "$15M USD Liability",
      bondedWarehouse: true,
      bankReferences: ["Santander Mexico", "BBVA Bancomer"]
    },
    
    status: {
      active: true,
      verified: true,
      lastUpdated: "2024-11-08",
      profileCompleteness: 100,
      responseTime: "< 1 hour"
    }
  },

  // ========== JALISCO AVOCADO GROWERS ==========
  {
    growerId: "GRW-MX-JAL-001",
    growerName: "Agroexportadora Jalisco S.A. de C.V.",
    businessName: "AgroJalisco",
    type: "Grower-Packer",
    
    contact: {
      primaryContact: "Roberto Hernández",
      title: "Director Comercial",
      phone: "+52-33-3615-9800",
      email: "rhernandez@agrojalisco.com.mx",
      whatsapp: "+52-33-3615-9800",
      website: "www.agrojalisco.com.mx"
    },
    
    location: {
      country: "Mexico",
      state: "Jalisco",
      city: "Zapopan",
      region: "Costa Sur",
      municipality: "Zapopan",
      coordinates: { lat: 20.7214, lng: -103.3918 },
      farmAddress: "Boulevard Puerta de Hierro 5150"
    },
    
    operations: {
      acreage: 1800,
      productionCapacity: 700,
      packingHouse: true,
      coldStorage: true,
      coldStorageCapacity: "60,000 cubic feet",
      coolingSystems: ["Hydrocooling", "Room Cooling"],
      qualityControl: "ISO 9001 certified facility",
      employees: 280
    },
    
    commoditiesGrown: [
      {
        commodityId: "avo-hass-60s",
        commodityName: "Avocado Hass 60s",
        sizesAvailable: ["48s", "60s", "70s", "84s"],
        weeklyVolume: 700,
        currentInventory: 3000,
        harvestSchedule: "Year-round",
        qualityGrade: "Choice",
        organicCertified: false,
        pricePerCarton: 28.00
      }
    ],
    
    certifications: [
      { name: "SENASICA", number: "SEN-14-11111-JAL", expires: "2025-10-31", status: "Active" },
      { name: "GLOBALG.A.P.", number: "GGN-4063061234569", expires: "2025-07-31", status: "Active" },
      { name: "FDA FSVP", number: "FDA-JAL-001", expires: "2026-05-31", status: "Active" }
    ],
    
    logistics: {
      preferredPOEs: ["Nogales, AZ", "Laredo, TX"],
      shippingMethods: ["Refrigerated Truck", "Intermodal"],
      transportPartners: ["Schneider", "Werner"],
      paymentTerms: "Net 30",
      minimumOrder: 30,
      leadTime: "5-7 days to POE"
    },
    
    metrics: {
      yearsInBusiness: 22,
      qualityRating: 4.6,
      onTimeDelivery: 94,
      certificationCompliance: 98,
      customerSatisfaction: 4.5,
      totalDealsCompleted: 1800,
      verifiedSupplier: true,
      lastInspection: "2024-08-10"
    },
    
    financial: {
      creditRating: "A",
      insuranceCoverage: "$8M USD Liability",
      bondedWarehouse: false,
      bankReferences: ["Banamex", "Banco del Bajío"]
    },
    
    status: {
      active: true,
      verified: true,
      lastUpdated: "2024-11-07",
      profileCompleteness: 92,
      responseTime: "< 3 hours"
    }
  },

  // ========== BAJA CALIFORNIA BERRY GROWERS ==========
  {
    growerId: "GRW-MX-BC-001",
    growerName: "Berries del Pacífico S.A. de C.V.",
    businessName: "BerriPac",
    type: "Grower-Packer",
    
    contact: {
      primaryContact: "Ana Sánchez",
      title: "Gerente de Exportación",
      phone: "+52-646-175-2200",
      email: "asanchez@berripac.com.mx",
      whatsapp: "+52-646-175-2200",
      website: "www.berripac.com.mx"
    },
    
    location: {
      country: "Mexico",
      state: "Baja California",
      city: "San Quintín",
      region: "Valle de San Quintín",
      municipality: "Ensenada",
      coordinates: { lat: 30.5725, lng: -115.9544 },
      farmAddress: "Carretera Transpeninsular Km 180"
    },
    
    operations: {
      acreage: 500,
      productionCapacity: 400,
      packingHouse: true,
      coldStorage: true,
      coldStorageCapacity: "40,000 cubic feet",
      coolingSystems: ["Forced Air", "Pre-cooling"],
      qualityControl: "USDA-approved inspection",
      employees: 180
    },
    
    commoditiesGrown: [
      {
        commodityId: "strawberry-8x1lb",
        commodityName: "Strawberries 8x1 lb",
        sizesAvailable: ["Small", "Medium", "Large", "Extra Large"],
        weeklyVolume: 400,
        currentInventory: 800,
        harvestSchedule: "Peak: Dec-May",
        qualityGrade: "Fancy",
        organicCertified: true,
        pricePerCarton: 14.50
      },
      {
        commodityId: "leafy-greens-mix",
        commodityName: "Spring Mix Leafy Greens",
        sizesAvailable: ["1 lb", "3 lb bulk", "5 lb foodservice"],
        weeklyVolume: 300,
        currentInventory: 600,
        harvestSchedule: "Year-round",
        qualityGrade: "Premium",
        organicCertified: true,
        pricePerCarton: 8.50
      }
    ],
    
    certifications: [
      { name: "SENASICA", number: "SEN-02-22222-BC", expires: "2025-12-15", status: "Active" },
      { name: "Primus GFS", number: "PRI-BC-22222", expires: "2025-09-30", status: "Active" },
      { name: "GLOBALG.A.P.", number: "GGN-4063061234570", expires: "2025-10-31", status: "Active" },
      { name: "USDA Organic", number: "USDA-ORG-BC-001", expires: "2026-02-28", status: "Active" }
    ],
    
    logistics: {
      preferredPOEs: ["Otay Mesa, CA", "Calexico, CA"],
      shippingMethods: ["Refrigerated Truck"],
      transportPartners: ["Performance Team", "Lineage Logistics"],
      paymentTerms: "Net 21",
      minimumOrder: 10,
      leadTime: "24-48 hours to POE"
    },
    
    metrics: {
      yearsInBusiness: 18,
      qualityRating: 4.9,
      onTimeDelivery: 99,
      certificationCompliance: 100,
      customerSatisfaction: 4.9,
      totalDealsCompleted: 2200,
      verifiedSupplier: true,
      lastInspection: "2024-10-25"
    },
    
    financial: {
      creditRating: "AA",
      insuranceCoverage: "$12M USD Liability",
      bondedWarehouse: true,
      bankReferences: ["Banamex", "HSBC Mexico"]
    },
    
    status: {
      active: true,
      verified: true,
      lastUpdated: "2024-11-09",
      profileCompleteness: 100,
      responseTime: "< 30 minutes"
    }
  },

  // ========== GUANAJUATO VEGETABLE GROWERS ==========
  {
    growerId: "GRW-MX-GTO-001",
    growerName: "Hortalizas del Bajío S.A. de C.V.",
    businessName: "HortBajío",
    type: "Grower-Packer",
    
    contact: {
      primaryContact: "Carlos Ramírez",
      title: "Director de Ventas",
      phone: "+52-462-622-8900",
      email: "cramirez@hortbajio.com.mx",
      whatsapp: "+52-462-622-8900",
      website: "www.hortbajio.com.mx"
    },
    
    location: {
      country: "Mexico",
      state: "Guanajuato",
      city: "Irapuato",
      region: "Bajío",
      municipality: "Irapuato",
      coordinates: { lat: 20.6767, lng: -101.3542 },
      farmAddress: "Libramiento Sur Km 8.5"
    },
    
    operations: {
      acreage: 1200,
      productionCapacity: 600,
      packingHouse: true,
      coldStorage: true,
      coldStorageCapacity: "50,000 cubic feet",
      coolingSystems: ["Vacuum Cooling", "Hydrocooling"],
      qualityControl: "SQF Level 2 certified",
      employees: 220
    },
    
    commoditiesGrown: [
      {
        commodityId: "romaine-24ct",
        commodityName: "Romaine Lettuce 24ct",
        sizesAvailable: ["18ct", "24ct", "30ct"],
        weeklyVolume: 500,
        currentInventory: 1200,
        harvestSchedule: "Year-round (Peak: Nov-Apr)",
        qualityGrade: "US No. 1",
        organicCertified: false,
        pricePerCarton: 12.00
      },
      {
        commodityId: "broccoli-14ct",
        commodityName: "Broccoli Crowns 14ct",
        sizesAvailable: ["14ct", "18ct", "20ct"],
        weeklyVolume: 450,
        currentInventory: 1000,
        harvestSchedule: "Year-round (Peak: Oct-Apr)",
        qualityGrade: "US No. 1",
        organicCertified: false,
        pricePerCarton: 16.50
      },
      {
        commodityId: "lettuce-iceberg-24ct",
        commodityName: "Iceberg Lettuce 24ct",
        sizesAvailable: ["18ct", "24ct", "30ct"],
        weeklyVolume: 600,
        currentInventory: 1500,
        harvestSchedule: "Year-round",
        qualityGrade: "US No. 1",
        organicCertified: false,
        pricePerCarton: 10.50
      }
    ],
    
    certifications: [
      { name: "SENASICA", number: "SEN-11-33333-GTO", expires: "2025-11-30", status: "Active" },
      { name: "Primus GFS", number: "PRI-GTO-33333", expires: "2025-08-31", status: "Active" },
      { name: "GLOBALG.A.P.", number: "GGN-4063061234571", expires: "2025-09-30", status: "Active" },
      { name: "SQF Level 2", number: "SQF-GTO-001", expires: "2025-12-31", status: "Active" }
    ],
    
    logistics: {
      preferredPOEs: ["Nogales, AZ", "Pharr, TX", "Laredo, TX"],
      shippingMethods: ["Refrigerated Truck", "Cross-dock"],
      transportPartners: ["Knight Transportation", "Swift"],
      paymentTerms: "Net 30",
      minimumOrder: 25,
      leadTime: "4-6 days to POE"
    },
    
    metrics: {
      yearsInBusiness: 30,
      qualityRating: 4.7,
      onTimeDelivery: 96,
      certificationCompliance: 100,
      customerSatisfaction: 4.6,
      totalDealsCompleted: 2800,
      verifiedSupplier: true,
      lastInspection: "2024-09-15"
    },
    
    financial: {
      creditRating: "A+",
      insuranceCoverage: "$10M USD Liability",
      bondedWarehouse: true,
      bankReferences: ["Santander", "Banorte"]
    },
    
    status: {
      active: true,
      verified: true,
      lastUpdated: "2024-11-08",
      profileCompleteness: 96,
      responseTime: "< 2 hours"
    }
  }
];

// ==========================================
// GROWER SEARCH FUNCTIONS
// ==========================================

export const searchGrowers = (filters = {}) => {
  const {
    searchTerm = '',
    state = 'all',
    commodity = 'all',
    certification = 'all',
    minQualityRating = 0,
    preferredPOE = 'all'
  } = filters;

  return GROWERS_DATABASE.filter(grower => {
    // Search term match
    const matchesSearch = !searchTerm || 
      grower.growerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grower.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grower.location.city.toLowerCase().includes(searchTerm.toLowerCase());

    // State filter
    const matchesState = state === 'all' || grower.location.state === state;

    // Commodity filter
    const matchesCommodity = commodity === 'all' || 
      grower.commoditiesGrown.some(c => 
        c.commodityId.includes(commodity.toLowerCase()) ||
        c.commodityName.toLowerCase().includes(commodity.toLowerCase())
      );

    // Certification filter
    const matchesCertification = certification === 'all' ||
      grower.certifications.some(cert => 
        cert.name.toLowerCase().includes(certification.toLowerCase()) &&
        cert.status === 'Active'
      );

    // Quality rating filter
    const matchesQuality = grower.metrics.qualityRating >= minQualityRating;

    // POE filter
    const matchesPOE = preferredPOE === 'all' ||
      grower.logistics.preferredPOEs.includes(preferredPOE);

    return matchesSearch && matchesState && matchesCommodity && 
           matchesCertification && matchesQuality && matchesPOE;
  });
};

export const getGrowerById = (growerId) => {
  return GROWERS_DATABASE.find(g => g.growerId === growerId);
};

export const getGrowersByCommodity = (commodityId) => {
  return GROWERS_DATABASE.filter(grower =>
    grower.commoditiesGrown.some(c => c.commodityId === commodityId)
  );
};

export const getGrowersByRegion = (state) => {
  return GROWERS_DATABASE.filter(g => g.location.state === state);
};

export default GROWERS_DATABASE;