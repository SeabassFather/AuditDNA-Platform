import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function CommoditySearch() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Search className="w-10 h-10 text-green-600" />
          Commodity Search
        </h1>
        
        <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for commodities..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          />
          
          <div className="mt-8 text-center text-gray-500">
            <p>Enter a commodity name to search</p>
          </div>
        </div>
      </div>
    </div>
  );
}