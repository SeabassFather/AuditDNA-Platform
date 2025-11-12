import React from 'react';
export default function FinancialDashboard() {
  return (
    <div className='p-10 bg-gradient-to-br from-lime-50 via-white to-emerald-50 min-h-screen'>
      <h1 className='text-4xl font-bold text-emerald-700 mb-4'>ðŸ’° Financial Dashboard</h1>
      <p className='text-slate-600 mb-8'>
        Manage factoring, PO financing, and real-time payment tracking.
      </p>
      <ul className='list-disc pl-6 space-y-2 text-slate-700'>
        <li>PO Financing Requests</li>
        <li>Factoring Rate Analytics</li>
        <li>Client Credit Scoring</li>
        <li>Ledger Export & Reports</li>
      </ul>
    </div>
  );
}

