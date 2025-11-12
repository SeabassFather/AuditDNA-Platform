import React, { useState } from "react";
import { useLanguageData } from "./LanguageDataContext";
import TraceabilityPanel from "./components/TraceabilityPanel";
// ... import analytics/chart code ...

export default function MarketModule() {
  const { language, marketData = {}, traceabilityData = {} } = useLanguageData(); // <--- defaults here!
  const products = Object.keys(marketData || {});
  const [selected, setSelected] = useState(products[0] || "Avocado");

  // Product data for charts
  const market = marketData[selected] || [];
  // Lot/chain data for traceability
  const traceLots = traceabilityData[selected] || [];

  return (
    <div>
      {/* ...your chart UI... */}
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        {products.map(prod => <option key={prod}>{prod}</option>)}
      </select>
      {/* ...chart goes here... */}
      
      {/* --- Cross-Referenced Traceability Intelligence Panel --- */}
      <TraceabilityPanel lots={traceLots} language={language} />
    </div>
  );
}
