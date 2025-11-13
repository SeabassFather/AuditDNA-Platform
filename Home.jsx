import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-slate-50">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-green-100/80 shadow font-bold text-green-900 text-xl sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="audit-dna" className="mr-2 text-2xl">🧬</span>
          AuditDNA Platform
        </div>
        <ul className="flex gap-8 text-green-800 text-lg font-semibold">
          <li><button onClick={() => navigate("/")}>Home</button></li>
          <li><button onClick={() => navigate("/produce")}>Produce Dashboard</button></li>
          <li><button onClick={() => navigate("/usda")}>USDA Intelligence</button></li>
          <li><button onClick={() => navigate("/traceability")}>Traceability</button></li>
          <li><button onClick={() => navigate("/watertech")}>WaterTech</button></li>
        </ul>
      </nav>

      {/* Homepage Center Card */}
      <div className="flex justify-center mt-20">
        <div className="bg-white/80 rounded-2xl shadow-2xl px-12 py-10 text-center border border-gray-100 max-w-4xl w-full">
          <h1 className="text-5xl font-extrabold text-green-800 mb-2">AuditDNA Produce Platform</h1>
          <div className="text-md text-gray-700 font-medium mb-10">Powered by Advanced AI Technology</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Produce Dashboard */}
            <div>
              <span className="text-5xl block mb-3" role="img" aria-label="avocado">🥑</span>
              <div className="font-bold mb-1 text-green-900">Produce Dashboard</div>
              <div className="text-green-600 text-sm">Analytics, pricing, market data</div>
            </div>
            {/* USDA Intelligence */}
            <div>
              <span className="text-4xl block mb-3" role="img" aria-label="usda">🗂️</span>
              <div className="font-bold mb-1 text-green-900">USDA Intelligence</div>
              <div className="text-green-600 text-sm">Multi-commodity, compliance, exports</div>
            </div>
            {/* Traceability */}
            <div>
              <span className="text-4xl block mb-3" role="img" aria-label="trace">🔗</span>
              <div className="font-bold mb-1 text-green-900">Traceability AI Hub</div>
              <div className="text-green-600 text-sm">Chain of custody, QR, AI analysis</div>
            </div>
            {/* WaterTech */}
            <div>
              <span className="text-4xl block mb-3" role="img" aria-label="water">💧</span>
              <div className="font-bold mb-1 text-green-900">WaterTech</div>
              <div className="text-green-600 text-sm">Lab, compliance, test uploads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}