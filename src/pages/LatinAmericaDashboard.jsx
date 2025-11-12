import React, { useState } from "react";
import { useLanguage } from "../LanguageContext"; // Assumes LanguageContext is in src/

// Temporary stubs (replace with real components or imports as you build out functionality)
const GrowersDirectory = () => <div className="p-6 bg-slate-700 rounded-xl text-white shadow">Growers Directory Coming Soon</div>;
const TradeFinance = () => <div className="p-6 bg-slate-700 rounded-xl text-white shadow">Trade Finance Module</div>;
const TraceabilityModule = () => <div className="p-6 bg-slate-700 rounded-xl text-white shadow">Traceability Module</div>;
const CertificationUpload = () => <div className="p-6 bg-slate-700 rounded-xl text-white shadow">Certification Upload</div>;
const PortAnalytics = () => <div className="p-6 bg-slate-700 rounded-xl text-white shadow">Port Analytics</div>;
const TradeRoutesMap = () => <div className="p-6 bg-slate-700 rounded-xl text-white shadow">Trade Routes Map</div>;
const FinancePrograms = () => <div className="p-6 bg-slate-700 rounded-xl text-white shadow">Finance Programs</div>;
const Alerts = () => <div className="p-6 bg-teal-800 rounded-xl text-white shadow">Cross-Border Alerts</div>;

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage?.() ?? {};
  return (
    <button
      onClick={toggleLanguage}
      className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition"
      aria-label="Toggle Language"
      type="button"
    >
      ðŸŒ {language?.toUpperCase?.()}
    </button>
  );
};

export default function LatinAmericaDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("growers");

  const tabs = [
    { id: "growers", label: t("dashboard.exporters") },
    { id: "finance", label: t("finance.title") },
    { id: "traceability", label: t("dashboard.traceability") },
    { id: "certs", label: t("dashboard.certifications") },
    { id: "analytics", label: t("dashboard.analytics") },
    { id: "routes", label: t("dashboard.routes") },
    { id: "alerts", label: t("dashboard.alerts") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-slate-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-teal-400">{t("dashboard.title")}</h1>
        <LanguageToggle />
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded font-bold transition ${
              activeTab === tab.id
                ? "bg-teal-500 text-white shadow"
                : "bg-slate-800 text-teal-200 hover:bg-slate-700"
            }`}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "growers" && <GrowersDirectory />}
        {activeTab === "finance" && <TradeFinance />}
        {activeTab === "traceability" && <TraceabilityModule />}
        {activeTab === "certs" && <CertificationUpload />}
        {activeTab === "analytics" && <PortAnalytics />}
        {activeTab === "routes" && <TradeRoutesMap />}
        {activeTab === "alerts" && <Alerts />}
      </div>
    </div>
  );
}
