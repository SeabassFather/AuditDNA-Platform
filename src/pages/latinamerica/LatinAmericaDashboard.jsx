import React from 'react';
export default function LatinAmericaDashboard() {
  return (
    <div className='p-10 bg-gradient-to-br from-yellow-50 via-white to-green-50 min-h-screen'>
      <h1 className='text-4xl font-bold text-green-700 mb-4'>ðŸŒŽ Latin America Dashboard</h1>
      <p className='text-slate-600 mb-8'>Cross-border produce compliance and logistics tracking between Mexico and the USA.</p>
      <ul className='list-disc pl-6 space-y-2 text-slate-700'>
        <li>Grower Registry Integration</li>
        <li>Port-of-Entry Analytics</li>
        <li>Supply Chain GPS Traceability</li>
        <li>Regional Pricing Map</li>
      </ul>
    </div>
  );
}

