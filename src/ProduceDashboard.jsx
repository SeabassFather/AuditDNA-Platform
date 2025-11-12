import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProduceDashboard from "./ProduceDashboard";
import ProduceIntelligenceModule from "./ProduceIntelligenceModule";
import FoodSafetyDashboard from "./FoodSafetyDashboard";
import GrowerManagement from "./GrowerManagement";
import USDAIntelligenceDashboard from "./pages/usda/USDAIntelligenceDashboard";
import TraceabilityDashboard from "./pages/traceability/TraceabilityDashboard";
import WaterTechDashboard from "./pages/watertech/WaterTechDashboard";
import SupplierIntelligence from "./pages/supplier/SupplierIntelligence";
import CommoditySearch from "./pages/produce/CommoditySearch";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProduceDashboard />} />
        <Route path="/produce" element={<ProduceDashboard />} />
        <Route path="/produce/intelligence" element={<ProduceIntelligenceModule />} />
        <Route path="/produce/growers" element={<GrowerManagement />} />
        <Route path="/produce/search" element={<CommoditySearch />} />
        <Route path="/foodsafety" element={<FoodSafetyDashboard />} />
        <Route path="/usda" element={<USDAIntelligenceDashboard />} />
        <Route path="/traceability" element={<TraceabilityDashboard />} />
        <Route path="/watertech" element={<WaterTechDashboard />} />
        <Route path="/supplier" element={<SupplierIntelligence />} />
      </Routes>
    </Router>
  );
}