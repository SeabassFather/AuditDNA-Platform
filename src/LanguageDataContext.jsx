import React, { createContext, useContext, useState } from "react";
const LanguageDataContext = createContext();

export const useLanguageData = () => useContext(LanguageDataContext);

export const LanguageDataProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  // ...existing marketData/rateData here...

  // Traceability lots for key crops and upcoming shipments
  const traceabilityLots = [
    {
      id: 'TOM-2025-A',
      product: 'Organic Tomatoes',
      grower: 'Valley Fresh MX',
      region: 'Sinaloa',
      variety: 'Roma',
      pack: 'Box',
      size: '25lb',
      status: 'VERIFIED',
      auditScore: 94,
      certifications: ['PrimusGFS', 'GLOBALG.A.P.', 'USDA'],
      stages: { farm: true, harvest: true, processing: true, packaging: true, distribution: true },
      compliance: { primusGFS: 96, globalGAP: 92, usda: 95 },
      tests: { water: 3, soil: 2, microbial: 4, fertilizer: 1 },
      chainOfTitle: ['Valley Fresh MX', 'Exporter', 'Port of Veracruz', 'US Broker', 'Retailer'],
      qrCodeUrl: 'https://auditdna.com/qr/lot/TOM-2025-A',
      uploadDate: "2025-10-15"
    },
    {
      id: 'STR-2025-B',
      product: 'Strawberries',
      grower: 'Santa Maria Farms',
      region: 'Baja',
      variety: 'Albion',
      pack: 'Case',
      size: '2lb',
      status: 'PENDING',
      auditScore: 78,
      certifications: ['PrimusGFS'],
      stages: { farm: true, harvest: true, processing: true, packaging: false, distribution: false },
      compliance: { primusGFS: 85, globalGAP: 72, usda: 80 },
      tests: { water: 2, soil: 1, microbial: 2, fertilizer: 1 },
      chainOfTitle: ['Santa Maria Farms', 'Processor', 'Port of Callao'],
      qrCodeUrl: 'https://auditdna.com/qr/lot/STR-2025-B',
      uploadDate: "2025-10-19"
    },
    {
      id: 'AVO-2025-C',
      product: 'Hass Avocados',
      grower: 'Green Valley MX',
      region: 'MichoacÃ¡n',
      variety: 'Hass',
      pack: 'Maya-bag',
      size: '48ct',
      status: 'FLAGGED',
      auditScore: 68,
      certifications: ['PrimusGFS', 'USDA'],
      stages: { farm: true, harvest: true, processing: false, packaging: false, distribution: false },
      compliance: { primusGFS: 72, globalGAP: 65, usda: 68 },
      tests: { water: 1, soil: 1, microbial: 1, fertilizer: 0 },
      chainOfTitle: ['Green Valley MX'],
      qrCodeUrl: 'https://auditdna.com/qr/lot/AVO-2025-C',
      uploadDate: "2025-10-21"
    }
    // Add more lots for additional products, regions, seasons
  ];

  return (
    <LanguageDataContext.Provider
      value={{
        language, setLanguage,
        // ...other context vars...
        traceabilityLots,
      }}
    >
      {children}
    </LanguageDataContext.Provider>
  );
};
