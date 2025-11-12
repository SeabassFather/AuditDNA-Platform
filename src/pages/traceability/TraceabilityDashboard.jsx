// C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src\pages\traceability\TraceabilityDashboard.jsx
import React from "react";

export default function TraceabilityDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-green-50 py-16 px-8">
      <div className="max-w-5xl mx-auto glass-card rounded-3xl shadow-xl border border-sky-100 p-10 text-center backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-green-700 mb-4 tracking-tight">
          Traceability Intelligence Dashboard
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Monitor soil and water data, lot history, and environmental compliance using AI insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸ§ª Soil Analysis</h3>
            <p className="text-gray-700">
              Review pH, micronutrients, and microbial balance across certified plots.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸ’§ Water Tech Reports</h3>
            <p className="text-gray-700">
              Track water quality, filtration, and conductivity tests from partner labs.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸ“¦ Lot Traceability</h3>
            <p className="text-gray-700">
              Trace every shipmentâ€™s custody chainâ€”from field to export dock.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-green-700 font-semibold mb-2">ðŸŒ± Environmental Compliance</h3>
            <p className="text-gray-700">
              Generate sustainability and certification reports automatically.
            </p>
          </div>
        </div>

        <footer className="mt-12 text-gray-500 text-sm">
          AuditDNA Traceability 5.0 Â© {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

