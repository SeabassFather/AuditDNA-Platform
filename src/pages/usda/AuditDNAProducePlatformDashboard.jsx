import React, { useState } from 'react';

const TABS = [
  'Live Pricing',
  'Multi-Commodity Compare',
  'Market Trends',
  'Buyers Directory',
  'Weekly Reports',
  'Certifications',
  'Export & Spreadsheet'
];

export default function AuditDNAProducePlatformDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="max-w-4xl mx-auto mt-16 shadow-2xl rounded-xl bg-white/80 backdrop-blur-md border border-gray-300 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-teal-700 to-blue-700 rounded-t-xl px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-yellow-300 inline-block mb-1">
              ðŸ§¬ AuditDNA Produce Platform
            </span>
            <div className="text-md font-bold text-white mb-1">
              Powered By AI Technology
            </div>
            <div className="text-sm text-blue-200 font-medium">
              Advanced Analytics â€¢ Real-Time Pricing â€¢ Traceability â€¢ B2B Intelligence
            </div>
          </div>
          <div className="text-xs text-blue-100 font-mono text-right">
            Updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-2 rounded-full font-semibold transition shadow
                border-2
                ${activeTab === tab
                  ? 'bg-gradient-to-r from-yellow-400 via-green-200 to-blue-300 border-yellow-500 text-gray-900 scale-105'
                  : 'bg-white/20 text-white border-white/10 hover:bg-white/40'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Panel content */}
      <div className="p-12 min-h-[200px] text-gray-700 text-lg">{activeTab} module view goes here.</div>
    </div>
  );
}
