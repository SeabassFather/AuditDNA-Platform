import React, { createContext, useContext, useState } from "react";
const AvocadoIntelligenceContext = createContext();

export const useAvocadoIntel = () => useContext(AvocadoIntelligenceContext);

// Demo/sample Avocado Data
const SIZES = ["48ct", "60ct", "70ct", "Maya-bag", "Box"];
const VARIETIES = ["Hass", "Maya", "Lamb Hass", "Fuerte"];
const PACKS = ["Bag", "Maya-bag", "Box", "Case"];
const REGIONS = ["MichoacÃ¡n", "Jalisco", "Mexico", "Peru", "Chile"];

export const AvocadoIntelligenceProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [selectedSize, setSelectedSize] = useState("48ct");

  // Example: pricing/volume analytics by region/size/variety
  const marketStats = {
    "48ct": {
      MichoacÃ¡n: { cases: 1200, pallets: 24, containers: 2, avgPrice: 32.1, offers: 5 },
      Jalisco: { cases: 850, pallets: 15, containers: 1, avgPrice: 29.8, offers: 2 },
    },
    "Maya-bag": { MichoacÃ¡n: { cases: 400, pallets: 8, containers: 1, avgPrice: 27.6, offers: 1 } },
    // ...additional sizes/regions/varieties...
  };

  // Grower data uploads
  const growerUploads = [
    {
      grower: "Green Valley MX",
      variety: "Hass",
      size: "48ct",
      region: "MichoacÃ¡n",
      casesExpected: 5000,
      seasonStart: "2025-12-05",
      seasonEnd: "2026-03-20",
      certifications: ["PrimusGFS", "GLOBALG.A.P."],
      complianceScore: 98,
      files: ["certificate.pdf", "traceability_chain.pdf"],
      waterTest: { result: "PASS", ec: 2.8, pH: 7.6 },
      microbialTest: { result: "PASS", ecoli: 0 },
      foodSafety: "All Clear",
      qrCodeUrl: "https://auditdna.com/qr/avocado/123",
      notes: "Crop loaded and certified for export.",
    },
    // ...expand for all uploads...
  ];

  // Offers board
  const offerBoard = [
    {
      buyer: "Avocado Imports US",
      size: "48ct",
      volume: 2200,
      price: 33.25,
      packing: "Box",
      deliveryPort: "Laredo, TX",
      financeEligible: true,
      factoringEligible: true,
      status: "Active",
    },
    // ...more offers...
  ];

  // Chain of title, traceability, audit status
  const traceabilityLots = [
    {
      id: "AVO-MX-2026-01",
      variety: "Hass",
      grower: "Green Valley MX",
      region: "MichoacÃ¡n",
      status: "VERIFIED",
      auditScore: 99,
      compliance: { primusGFS: 98, globalGAP: 97, usda: 97 },
      chainOfTitle: ["Grower", "Exporter", "West Port", "US Broker", "Buyer"],
      certifications: ["PrimusGFS", "GLOBALG.A.P.", "USDA Organic"],
      tests: { water: 4, soil: 2, microbial: 4, fertilizer: 2 },
      qrCodeUrl: "https://auditdna.com/qr/lot/AVO-MX-2026-01"
    },
    // ...more lots...
  ];

  return (
    <AvocadoIntelligenceContext.Provider value={{
      language, setLanguage, selectedSize, setSelectedSize,
      SIZES, VARIETIES, PACKS, REGIONS,
      marketStats, growerUploads, offerBoard, traceabilityLots,
    }}>
      {children}
    </AvocadoIntelligenceContext.Provider>
  );
};
