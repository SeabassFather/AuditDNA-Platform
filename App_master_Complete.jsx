// 🧬 AuditDNA - COMPLETE MASTER PLATFORM
// CEO: Saul Garcia | MexaUSA Food Group, Inc. | NMLS #337526
// Core Business: Agriculture Intelligence, Traceability, Cross-Border Finance

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// ==========================================
// 🎯 MAIN DASHBOARDS
// ==========================================
import Dashboard from "./pages/Dashboard";
import Megadashboard from "./pages/Megadashboard";
import AdminDashboard from "./pages/AdminDashboard";

// ==========================================
// 🥑 PRODUCE INTELLIGENCE MODULE (CORE BUSINESS)
// ==========================================
import ProduceDashboard from "./pages/produce/ProduceDashboard";
import PriceAnalytics from "./pages/produce/PriceAnalytics";
import PackagingSizeSelector from "./pages/produce/PackagingSizeSelector";
import SupplierManagement from "./pages/produce/SupplierManagement";
import GrowerSearchEngine from "./pages/produce/GrowerSearchEngine";
import RegionalAccordion from "./pages/produce/RegionalAccordion";
import GrowerProfileModal from "./pages/produce/GrowerProfileModal";
import FactoringDashboard from "./pages/produce/FactoringDashboard";
import ProduceForecastEngine from "./pages/produce/ProduceForecastEngine";

// ==========================================
// 🌾 USDA INTELLIGENCE MODULE
// ==========================================
import USDAIntelligenceDashboard from "./pages/usda/USDAIntelligenceDashboard";
import USDAGrowerSearchEngine from "./pages/usda/USDAGrowerSearchEngine";
import AgMarketplace from "./pages/usda/AgMarketplace";
import USDA from "./pages/usda/USDA";
import USDACommodityOverlay from "./pages/usda/USDACommodityOverlay";

// ==========================================
// 💧 WATERTECH MODULE
// ==========================================
import WaterTechDashboard from "./pages/watertech/WaterTechDashboard";
import WaterTechMarketplace from "./pages/watertech/WaterTechMarketplace";
import WaterAnalysisForm from "./pages/watertech/WaterAnalysisForm";
import WaterComplianceReports from "./pages/watertech/WaterComplianceReports";
import WaterBilling from "./pages/watertech/WaterBilling";

// ==========================================
// 🌱 SOIL & FERTILIZER TRACEABILITY
// ==========================================
import TraceabilityTabs from "./pages/traceability/TraceabilityTabs";
import SoilAnalysis from "./pages/traceability/SoilAnalysis";
import FertilizerAnalysis from "./pages/traceability/FertilizerAnalysis";
import MicrobialAnalysis from "./pages/traceability/MicrobialAnalysis";
import FieldMapping from "./pages/traceability/FieldMapping";
import QRTraceOutput from "./pages/traceability/QRTraceOutput";
import ComplianceLetter from "./pages/traceability/ComplianceLetter";

// ==========================================
// ⚙️ COMPLIANCE & CERTIFICATION
// ==========================================
import ComplianceDashboard from "./pages/compliance/ComplianceDashboard";
import DocumentUploader from "./pages/compliance/DocumentUploader";
import ComplianceBilling from "./pages/compliance/ComplianceBilling";

// ==========================================
// 💸 FINANCE & FACTORING MODULE
// ==========================================
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import ClientRiskScore from "./pages/finance/ClientRiskScore";
import POFinancingForm from "./pages/finance/POFinancingForm";
import InvoiceTracker from "./pages/finance/InvoiceTracker";
import LiquidityMonitor from "./pages/finance/LiquidityMonitor";

// ==========================================
// 🚛 LOGISTICS & EXPORT MODULE
// ==========================================
import LogisticsDashboard from "./pages/logistics/LogisticsDashboard";
import CustomsCompliance from "./pages/logistics/CustomsCompliance";
import FreightInsurance from "./pages/logistics/FreightInsurance";
import PortComparison from "./pages/logistics/PortComparison";

// ==========================================
// 🧫 FUEL / OIL / ENGINE ANALYSIS
// ==========================================
import FuelOilAnalysis from "./pages/fuel/FuelOilAnalysis";
import EmissionTrace from "./pages/fuel/EmissionTrace";

// ==========================================
// 🧭 LATIN AMERICA & REAL ESTATE
// ==========================================
import LatinAmericaDashboard from "./pages/latam/LatinAmericaDashboard";
import MexicoRealEstate from "./pages/latam/MexicoRealEstate";
import MortgageModule from "./pages/latam/MortgageModule";
import CrossBorderFinancing from "./pages/latam/CrossBorderFinancing";
import RegionalAnalytics from "./pages/latam/RegionalAnalytics";

// ==========================================
// 🌐 AI, RISK & INTELLIGENCE ENGINE
// ==========================================
import AuditDNAEnvAI from "./pages/ai/AuditDNAEnvAI";
import RiskScoringEngine from "./pages/ai/RiskScoringEngine";
import GeoHeatmaps from "./pages/ai/GeoHeatmaps";
import AIChatAssist from "./pages/ai/AIChatAssist";

// ==========================================
// 📜 MARKETING & OUTREACH
// ==========================================
import EmailMarketingAutomation from "./pages/marketing/EmailMarketingAutomation";
import GrowerOutreach from "./pages/marketing/GrowerOutreach";
import ClientLeads from "./pages/marketing/ClientLeads";
import CampaignAnalytics from "./pages/marketing/CampaignAnalytics";

// 404 Page
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
    <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-xl text-gray-700 mb-6">Module Not Found</p>
    <a href="/" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
      Return to Dashboard
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            {/* ============================================ */}
            {/* 🎯 MAIN DASHBOARDS */}
            {/* ============================================ */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/megadashboard" element={<Megadashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* ============================================ */}
            {/* 🥑 PRODUCE INTELLIGENCE (CORE BUSINESS) */}
            {/* ============================================ */}
            <Route path="/produce" element={<ProduceDashboard />} />
            <Route path="/produce/analytics" element={<PriceAnalytics />} />
            <Route path="/produce/packaging" element={<PackagingSizeSelector />} />
            <Route path="/produce/suppliers" element={<SupplierManagement />} />
            <Route path="/produce/grower-search" element={<GrowerSearchEngine />} />
            <Route path="/produce/regional" element={<RegionalAccordion />} />
            <Route path="/produce/grower-profile" element={<GrowerProfileModal />} />
            <Route path="/produce/factoring" element={<FactoringDashboard />} />
            <Route path="/produce/forecast" element={<ProduceForecastEngine />} />

            {/* ============================================ */}
            {/* 🌾 USDA INTELLIGENCE */}
            {/* ============================================ */}
            <Route path="/usda" element={<USDA />} />
            <Route path="/usda/intelligence" element={<USDAIntelligenceDashboard />} />
            <Route path="/usda/grower-search" element={<USDAGrowerSearchEngine />} />
            <Route path="/usda/marketplace" element={<AgMarketplace />} />
            <Route path="/usda/commodity-overlay" element={<USDACommodityOverlay />} />

            {/* ============================================ */}
            {/* 💧 WATERTECH MODULE */}
            {/* ============================================ */}
            <Route path="/watertech" element={<WaterTechDashboard />} />
            <Route path="/watertech/marketplace" element={<WaterTechMarketplace />} />
            <Route path="/watertech/analysis" element={<WaterAnalysisForm />} />
            <Route path="/watertech/compliance" element={<WaterComplianceReports />} />
            <Route path="/watertech/billing" element={<WaterBilling />} />

            {/* ============================================ */}
            {/* 🌱 SOIL & FERTILIZER TRACEABILITY */}
            {/* ============================================ */}
            <Route path="/traceability" element={<TraceabilityTabs />} />
            <Route path="/traceability/soil" element={<SoilAnalysis />} />
            <Route path="/traceability/fertilizer" element={<FertilizerAnalysis />} />
            <Route path="/traceability/microbial" element={<MicrobialAnalysis />} />
            <Route path="/traceability/field-mapping" element={<FieldMapping />} />
            <Route path="/traceability/qr-trace" element={<QRTraceOutput />} />
            <Route path="/traceability/compliance-letter" element={<ComplianceLetter />} />

            {/* ============================================ */}
            {/* ⚙️ COMPLIANCE & CERTIFICATION */}
            {/* ============================================ */}
            <Route path="/compliance" element={<ComplianceDashboard />} />
            <Route path="/compliance/upload" element={<DocumentUploader />} />
            <Route path="/compliance/billing" element={<ComplianceBilling />} />

            {/* ============================================ */}
            {/* 💸 FINANCE & FACTORING */}
            {/* ============================================ */}
            <Route path="/finance" element={<FinanceDashboard />} />
            <Route path="/finance/risk-score" element={<ClientRiskScore />} />
            <Route path="/finance/po-financing" element={<POFinancingForm />} />
            <Route path="/finance/invoice-tracker" element={<InvoiceTracker />} />
            <Route path="/finance/liquidity" element={<LiquidityMonitor />} />

            {/* ============================================ */}
            {/* 🚛 LOGISTICS & EXPORT */}
            {/* ============================================ */}
            <Route path="/logistics" element={<LogisticsDashboard />} />
            <Route path="/logistics/customs" element={<CustomsCompliance />} />
            <Route path="/logistics/insurance" element={<FreightInsurance />} />
            <Route path="/logistics/ports" element={<PortComparison />} />

            {/* ============================================ */}
            {/* 🧫 FUEL / OIL / ENGINE ANALYSIS */}
            {/* ============================================ */}
            <Route path="/fuel" element={<FuelOilAnalysis />} />
            <Route path="/fuel/emissions" element={<EmissionTrace />} />

            {/* ============================================ */}
            {/* 🧭 LATIN AMERICA & REAL ESTATE */}
            {/* ============================================ */}
            <Route path="/latam" element={<LatinAmericaDashboard />} />
            <Route path="/latam/real-estate" element={<MexicoRealEstate />} />
            <Route path="/latam/mortgage" element={<MortgageModule />} />
            <Route path="/latam/cross-border" element={<CrossBorderFinancing />} />
            <Route path="/latam/analytics" element={<RegionalAnalytics />} />

            {/* ============================================ */}
            {/* 🌐 AI, RISK & INTELLIGENCE */}
            {/* ============================================ */}
            <Route path="/ai" element={<AuditDNAEnvAI />} />
            <Route path="/ai/risk-scoring" element={<RiskScoringEngine />} />
            <Route path="/ai/heatmaps" element={<GeoHeatmaps />} />
            <Route path="/ai/chat" element={<AIChatAssist />} />

            {/* ============================================ */}
            {/* 📜 MARKETING & OUTREACH */}
            {/* ============================================ */}
            <Route path="/marketing" element={<EmailMarketingAutomation />} />
            <Route path="/marketing/grower-outreach" element={<GrowerOutreach />} />
            <Route path="/marketing/leads" element={<ClientLeads />} />
            <Route path="/marketing/campaigns" element={<CampaignAnalytics />} />

            {/* ============================================ */}
            {/* 🚫 FALLBACK / 404 */}
            {/* ============================================ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

// 🧬 End of AuditDNA Master Platform
// "The Sleeping Giant Awakens" - All Modules Connected