import React from 'react';
export default function TraceabilityTabs() {
  return (
    <div className='p-10 bg-gradient-to-br from-slate-50 via-white to-green-50 min-h-screen'>
      <h1 className='text-4xl font-bold text-green-700 mb-4'>ðŸ“ Traceability System</h1>
      <p className='text-slate-600 mb-8'>Chain of custody with QR code, GPS tracking, and batch record validation.</p>
      <ul className='list-disc pl-6 space-y-2 text-slate-700'>
        <li>QR Code Scanning & Linking</li>
        <li>GPS Route Mapping</li>
        <li>Batch-Level Validation</li>
        <li>Export Compliance Labels</li>
      </ul>
    </div>
  );
}

