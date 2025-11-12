import React, { useState, useMemo } from 'react';
import LanguageSwitch from '../components/utility/LanguageSwitch';
import GrowerSearchEngine from '../components/catalog/grower_search_engine';
import LatAmBuyersNetwork from '../components/catalog/latam_buyers_network';
import CertificationsTab from '../components/catalog/certifications_tab';
import ComplianceDashboard from '../components/catalog/compliance_dashboard';
import ExcelExportComponent from '../components/catalog/excel_export_component';
import TradePortalTickers from '../components/catalog/trade_portal_tickers';
import PricingCalculator from '../components/catalog/pricing_calculator';
import { exportUtils } from '../utils/exportUtils';

const tabs = [
  { id: 'growers', label: { en: 'Growers', es: 'Productores' }, component: GrowerSearchEngine },
  { id: 'buyers', label: { en: 'Buyers', es: 'Compradores' }, component: LatAmBuyersNetwork },
  { id: 'certifications', label: { en: 'Certifications', es: 'Certificaciones' }, component: CertificationsTab },
  { id: 'compliance', label: { en: 'Compliance', es: 'Cumplimiento' }, component: ComplianceDashboard },
  { id: 'finance', label: { en: 'Financials', es: 'Finanzas' }, component: ExcelExportComponent },
  { id: 'trade', label: { en: 'Trade/Prices', es: 'Mercado' }, component: TradePortalTickers },
  { id: 'pricing', label: { en: 'Pricing Calculator', es: 'Calculadora de Precios' }, component: PricingCalculator },
];

export default function CatalogDashboard() {
  const [activeTab, setActiveTab] = useState('growers');
  const [language, setLanguage] = useState('en');

  const CurrentComponent = useMemo(() => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab?.component || GrowerSearchEngine;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">AuditDNA Data Catalog</h1>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
        <div className="flex gap-2 mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-bold ${activeTab === tab.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-700'}`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mb-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={()=>window.print()}>
            {language === 'en' ? 'Print' : 'Imprimir'}
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={()=>exportUtils.handleExportPDF(activeTab, language)}>
            {language === 'en' ? 'Download PDF' : 'Descargar PDF'}
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={()=>exportUtils.handleExportEmail(activeTab, language)}>
            {language === 'en' ? 'Email Data' : 'Enviar por correo'}
          </button>
        </div>
        <div>
          <CurrentComponent language={language} />
        </div>
      </div>
    </div>
  );
}
