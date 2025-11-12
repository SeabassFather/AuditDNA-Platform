import React, { createContext, useContext, useState } from "react";

// Sample translations object - expand as needed
const translations = {
  en: {
    homepageTitle: "AuditDNA Platform",
    homepageSub: "Test Audit & Compliance Powered by AI",
    analysesAvailable: "Analyses Available",
    featuredModules: "Featured Modules",
    allServices: "All Services"
  },
  es: {
    homepageTitle: "Plataforma AuditDNA",
    homepageSub: "AuditorÃ­a y Cumplimiento de Pruebas con IA",
    analysesAvailable: "AnÃ¡lisis Disponibles",
    featuredModules: "MÃ³dulos Destacados",
    allServices: "Todos los Servicios"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  function toggleLanguage() {
    setLanguage((prev) => {
      const newLang = prev === "en" ? "es" : "en";
      localStorage.setItem("language", newLang);
      return newLang;
    });
  }

  // Returns translation object
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
