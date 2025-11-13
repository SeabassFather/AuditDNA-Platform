import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// === MODULE IMPORTS (Alphabetical) ===
import Factoring from "./pages/finance/Factoring";
import FinancialServices from "./pages/finance/FinancialServices";
import FrozenAvocadoGuacamole from "./pages/produce/FrozenAvocadoGuacamole";
import ProduceIntelligence from "./pages/produce/ProduceIntelligence";
import TraceabilityViewer from "./pages/traceability/TraceabilityViewer";
import USDA from "./pages/usda/USDA";
import USDAGrowerSearchEngine from "./pages/usda/USDAGrowerSearchEngine";
import USDAMarketplace from "./pages/usda/USDAMarketplace";
import USDAOrganicSearchPage from "./pages/usda/USDAOrganicSearchPage";
import USDASearchEngine from "./pages/usda/USDASearchEngine";
import WaterTech from "./pages/watertech/WaterTech";
import WaterTechPage from "./pages/watertech/WaterTechPage";
import WaterTechUploads from "./pages/watertech/WaterTechUploads";

export default function Dashboard() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="flex flex-wrap gap-4 p-4 bg-gray-100 shadow rounded-b-xl font-semibold text-green-900 text-lg tracking-wide">
        <Link to="/factoring" className="hover:text-green-600 transition">Factoring</Link>
        <Link to="/financial-services" className="hover:text-green-600 transition">Financial Services</Link>
        <Link to="/frozen-avocado" className="hover:text-green-600 transition">🥑 Frozen Avocado</Link>
        <Link to="/produce-intelligence" className="hover:text-green-600 transition">Produce Intelligence</Link>
        <Link to="/traceability" className="hover:text-green-600 transition">Traceability</Link>
        <Link to="/usda" className="hover:text-green-600 transition">USDA</Link>
        <Link to="/usda/grower-search" className="hover:text-green-600 transition">USDA Grower</Link>
        <Link to="/usda/marketplace" className="hover:text-green-600 transition">USDA Marketplace</Link>
        <Link to="/usda/organic" className="hover:text-green-600 transition">USDA Organic</Link>
        <Link to="/usda/search" className="hover:text-green-600 transition">USDA Search</Link>
        <Link to="/watertech" className="hover:text-green-600 transition">WaterTech</Link>
        <Link to="/watertech/page" className="hover:text-green-600 transition">WaterTech Page</Link>
        <Link to="/watertech/uploads" className="hover:text-green-600 transition">WaterTech Uploads</Link>
      </nav>

      {/* Main Panel */}
      <div className="p-8 bg-white rounded-2xl mt-6 shadow-xl min-h-[60vh]">
        <Routes>
          {/* === ROUTES (Alphabetical) === */}
          <Route path="/factoring" element={<Factoring />} />
          <Route path="/financial-services" element={<FinancialServices />} />
          <Route path="/frozen-avocado" element={<FrozenAvocadoGuacamole />} />
          <Route path="/produce-intelligence" element={<ProduceIntelligence />} />
          <Route path="/traceability" element={<TraceabilityViewer />} />
          <Route path="/usda" element={<USDA />} />
          <Route path="/usda/grower-search" element={<USDAGrowerSearchEngine />} />
          <Route path="/usda/marketplace" element={<USDAMarketplace />} />
          <Route path="/usda/organic" element={<USDAOrganicSearchPage />} />
          <Route path="/usda/search" element={<USDASearchEngine />} />
          <Route path="/watertech" element={<WaterTech />} />
          <Route path="/watertech/page" element={<WaterTechPage />} />
          <Route path="/watertech/uploads" element={<WaterTechUploads />} />
        </Routes>
      </div>
    </Router>
  );
}