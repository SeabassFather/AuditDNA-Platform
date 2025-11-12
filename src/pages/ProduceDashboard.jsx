// C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src\pages\produce\ProduceDashboard.jsx
import React from "react";

export default function ProduceDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 py-16 px-8">
      <div className="max-w-5xl mx-auto glass-card rounded-3xl shadow-xl border border-green-100 p-10 text-center backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-green-700 mb-4 tracking-tight">
          Produce Intelligence Dashboard
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Real-time analytics, historical USDA trends, and packaging overlays for global produce trade.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸ“Š Market Analytics</h3>
            <p className="text-gray-700">
              Monitor wholesale and retail price comparisons across regions and varieties.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸ“¦ Packaging Trends</h3>
            <p className="text-gray-700">
              Analyze 5-year USDA pricing overlays segmented by packaging size and format.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸš› Logistics & Trade</h3>
            <p className="text-gray-700">
              Evaluate freight, container load factors, and CIF vs FOB breakdowns.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸŒŽ Global Sourcing</h3>
            <p className="text-gray-700">
              Integrate regional data from Mexico, Latin America, and the U.S. for trade forecasting.
            </p>
          </div>
        </div>

        <footer className="mt-12 text-gray-500 text-sm">
          AuditDNA Produce Intelligence 5.0 Â© {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

