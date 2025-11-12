import React from 'react';
export default function WaterTechDashboard() {
  return (
    <div className='p-10 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 min-h-screen'>
      <h1 className='text-4xl font-bold text-cyan-700 mb-4'>ðŸ’§ WaterTech Dashboard</h1>
      <p className='text-slate-600 mb-8'>Track and analyze water quality metrics, purification cycles, and compliance standards.</p>
      <ul className='list-disc pl-6 space-y-2 text-slate-700'>
        <li>Purity Index (TDS, pH, Hardness)</li>
        <li>Microbial Load Monitoring</li>
        <li>Regulatory Test Submissions</li>
        <li>Equipment Calibration Logs</li>
      </ul>
    </div>
  );
}

