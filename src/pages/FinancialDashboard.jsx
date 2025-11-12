// C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src\pages\finance\FinancialDashboard.jsx
import React from "react";

export default function FinancialDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-16 px-8">
      <div className="max-w-5xl mx-auto glass-card rounded-3xl shadow-xl border border-emerald-100 p-10 text-center backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-emerald-700 mb-4 tracking-tight">
          Financial Services Dashboard
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Manage factoring, PO financing, client credit scoring, and real-time payment analytics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-emerald-700 font-semibold mb-2">ðŸ“ˆ Factoring Analytics</h3>
            <p className="text-gray-700">
              Track daily factoring rates, client exposure, and receivable turnover.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-emerald-700 font-semibold mb-2">ðŸ§¾ PO Financing</h3>
            <p className="text-gray-700">
              Review purchase-order advances, payment terms, and fee breakdowns.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-emerald-700 font-semibold mb-2">ðŸ’³ Credit Scoring</h3>
            <p className="text-gray-700">
              Evaluate buyer credit history and supplier risk in real time.
            </p>
          </div>

          <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white/80">
            <h3 className="text-emerald-700 font-semibold mb-2">ðŸ“Š Ledger & Reports</h3>
            <p className="text-gray-700">
              Export ledgers, generate balance summaries, and monitor liquidity trends.
            </p>
          </div>
        </div>

        <footer className="mt-12 text-gray-500 text-sm">
          AuditDNA Finance 5.0 Â© {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

