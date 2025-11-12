// ==========================================
// AUDITDNA FRONTEND - MAIN APP ROUTER
// MexaUSA Food Group, Inc. | CEO: Saul Garcia
// ==========================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Navbar
import Navbar from "./components/Navbar";

// Main Dashboard
import ProduceDashboard from "./ProduceDashboard";

// Produce Intelligence Modules
import CommoditySearch from "./pages/produce/CommoditySearch";

// USDA Intelligence
import USDAIntelligenceDashboard from "./pages/usda/USDAIntelligenceDashboard";

// Traceability & Water Tech
import TraceabilityDashboard from "./pages/traceability/TraceabilityDashboard";
import WaterTechDashboard from "./pages/watertech/WaterTechDashboard";

// Supplier Intelligence
import SupplierIntelligence from "./pages/supplier/SupplierIntelligence";

// Styles
import "./index.css";

export default function App() {
  return (
    <Router>
      {/* Global Navbar */}
      <Navbar />
      
      {/* Main Content Routes */}
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<ProduceDashboard />} />
        
        {/* Produce Intelligence Routes */}
        <Route path="/produce" element={<ProduceDashboard />} />
        <Route path="/produce/search" element={<CommoditySearch />} />
        
        {/* USDA Intelligence */}
        <Route path="/usda" element={<USDAIntelligenceDashboard />} />
        
        {/* Traceability & Water Tech */}
        <Route path="/traceability" element={<TraceabilityDashboard />} />
        <Route path="/watertech" element={<WaterTechDashboard />} />
        
        {/* Supplier Intelligence */}
        <Route path="/supplier" element={<SupplierIntelligence />} />
      </Routes>
    </Router>
  );
}