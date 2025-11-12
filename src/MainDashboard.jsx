import React, { useState } from "react";
import MarketModule from "./MarketModule";
// import other modules: GrowersModule, TraceabilityDashboard, etc.

const tabs = [
  { id: "market", label: "Market" },
  { id: "growers", label: "Growers" },
  { id: "trace", label: "Traceability" },
  // ...other tabs
];

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("market");
  return (
    <div>
      <nav className="flex gap-4 bg-slate-900 p-4">
        {tabs.map(tab =>
          <button key={tab.id}
            className={`${activeTab === tab.id ? "bg-cyan-600 text-white" : "bg-slate-700 text-cyan-200"} px-6 py-3 rounded font-bold`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        )}
      </nav>
      <div className="p-6">
        {activeTab === "market" && <MarketModule />}
        {/* Add other modules per tab */}
        {/* {activeTab === "growers" && <GrowersModule />} */}
        {/* {activeTab === "trace" && <TraceabilityDashboard />} */}
      </div>
    </div>
  );
}
