import { createContext, useContext, useState } from "react";

export const LanguageContext = createContext("en");

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "es" : "en");
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};