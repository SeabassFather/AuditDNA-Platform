import React, { useState, useEffect } from "react";
import { useLanguageData } from "../LanguageDataContext";
export default function RateTicker() {
  const { language, rateData } = useLanguageData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const rateEntries = Object.entries(rateData);

  useEffect(() => {
    if (rateEntries.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % rateEntries.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rateEntries.length]);

  const [key, rd] = rateEntries[currentIndex];
  const rateName = key.replace(/_/g," ").toUpperCase();
  // ...rest of ticker code...
  return (
    <div>{rateName}: {rd.rate} ({rd.change})</div>
  );
}
