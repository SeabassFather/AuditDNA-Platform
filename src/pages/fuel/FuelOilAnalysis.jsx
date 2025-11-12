import React from 'react';
export default function FuelOilAnalysis() {
  return (
    <div className='p-10 bg-gradient-to-br from-gray-50 via-white to-yellow-50 min-h-screen'>
      <h1 className='text-4xl font-bold text-yellow-700 mb-4'>â›½ Fuel & Oil Analysis</h1>
      <p className='text-slate-600 mb-8'>Performance monitoring for generators, tractors, and heavy machinery.</p>
      <ul className='list-disc pl-6 space-y-2 text-slate-700'>
        <li>Viscosity Degradation Trends</li>
        <li>Fuel Contaminant Detection</li>
        <li>BTU Efficiency Ratings</li>
        <li>Emission Compliance Logs</li>
      </ul>
    </div>
  );
}

