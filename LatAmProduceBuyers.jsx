import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Globe, Filter } from 'lucide-react';

const LATAM_BUYERS = [
  { id: 1, name: 'Dole Food Company', tier: 'Mega', headquarters: 'Charlotte, NC, USA', regions: ['Mexico', 'Guatemala', 'Ecuador', 'Colombia', 'Costa Rica'], products: ['Avocados', 'Bananas', 'Pineapples', 'Berries'], volume: 'Very Large (1.5B+ lbs/year)', contact: 'procurement@dole.com', phone: '+1 (704) 379-8200', certifications: ['GlobalGAP', 'USDA Organic', 'ISO 9001', 'Fair Trade'], website: 'www.dole.com', established: 1851, employees: '74000+' },
  { id: 2, name: 'Fresh Del Monte Produce', tier: 'Mega', headquarters: 'Coral Gables, FL, USA', regions: ['Mexico', 'Guatemala', 'Costa Rica', 'Chile', 'Peru'], products: ['Avocados', 'Pineapples', 'Melons', 'Tomatoes', 'Mangoes'], volume: 'Very Large (1.2B+ lbs/year)', contact: 'latam@freshdelmonte.com', phone: '+1 (305) 520-8400', certifications: ['USDA Organic', 'Rainforest Alliance', 'SMETA', 'GlobalGAP'], website: 'www.freshdelmonte.com', established: 1886, employees: '45000+' },
  { id: 3, name: 'Mission Produce', tier: 'Large', headquarters: 'Oxnard, CA, USA', regions: ['Mexico', 'Peru', 'Chile', 'Colombia', 'Guatemala'], products: ['Avocados', 'Mangoes', 'Papayas'], volume: 'Large (800M+ lbs/year)', contact: 'procurement@missionproduce.com', phone: '+1 (805) 981-3650', certifications: ['USDA Organic', 'Fair Trade', 'GlobalGAP', 'Primus GFS'], website: 'www.missionproduce.com', established: 1983, employees: '2000+' },
  { id: 4, name: 'Calavo Growers', tier: 'Large', headquarters: 'Santa Paula, CA, USA', regions: ['Mexico', 'Peru', 'Colombia', 'Chile'], products: ['Avocados', 'Papayas', 'Tomatoes', 'Pineapples'], volume: 'Large (650M+ lbs/year)', contact: 'sales@calavo.com', phone: '+1 (805) 525-1245', certifications: ['USDA Organic', 'Primus GFS', 'Fair Trade', 'SQF'], website: 'www.calavo.com', established: 1924, employees: '1800+' },
  { id: 5, name: 'West Pak Avocado', tier: 'Large', headquarters: 'Murrieta, CA, USA', regions: ['Mexico', 'Peru', 'Chile', 'Colombia'], products: ['Avocados'], volume: 'Large (500M+ lbs/year)', contact: 'sales@westpakavocado.com', phone: '+1 (951) 677-9861', certifications: ['USDA Organic', 'Primus GFS', 'GlobalGAP'], website: 'www.westpakavocado.com', established: 1983, employees: '800+' }
];

export default function LatAmProduceBuyers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');

  const filteredBuyers = LATAM_BUYERS.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = filterTier === 'all' || buyer.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const tiers = ['all', 'Mega', 'Large', 'Medium', 'Small-Medium', 'Small', 'Boutique'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Latin America Produce Buyers</h1>
          <p className="text-gray-600">Top 50+ verified wholesale buyers importing from LatAm</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by company or product..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {tiers.map(tier => (
                  <option key={tier} value={tier}>
                    {tier === 'all' ? 'All Tiers' : tier}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Found {filteredBuyers.length} buyers
          </h3>
        </div>

        {/* Buyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map(buyer => (
            <div key={buyer.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              
              {/* Buyer Header */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold">{buyer.name}</h3>
                  <span className="bg-white text-green-600 px-2 py-1 rounded text-xs font-bold">
                    {buyer.tier}
                  </span>
                </div>
                <p className="text-sm opacity-90">{buyer.volume}</p>
              </div>

              {/* Buyer Details */}
              <div className="p-4">
                
                {/* Location */}
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="text-green-600 flex-shrink-0 mt-1" size={16} />
                  <div className="text-sm text-gray-700">{buyer.headquarters}</div>
                </div>

                {/* Products */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">PRODUCTS</div>
                  <div className="flex flex-wrap gap-1">
                    {buyer.products.slice(0, 3).map((product, idx) => (
                      <span key={idx} className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-semibold">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Regions */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">REGIONS</div>
                  <div className="text-sm text-gray-700">
                    {buyer.regions.slice(0, 3).join(', ')}
                    {buyer.regions.length > 3 && ` +${buyer.regions.length - 3}`}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2 mb-3 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone size={14} className="text-green-600" />
                    <a href={`tel:${buyer.phone}`} className="hover:text-green-600">
                      {buyer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail size={14} className="text-green-600" />
                    <a href={`mailto:${buyer.contact}`} className="hover:text-green-600 truncate">
                      {buyer.contact}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Globe size={14} className="text-green-600" />
                    <a href={`https://${buyer.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 truncate">
                      {buyer.website}
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <div className="text-gray-500">ESTABLISHED</div>
                    <div className="font-semibold text-gray-800">{buyer.established}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">EMPLOYEES</div>
                    <div className="font-semibold text-gray-800">{buyer.employees}</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">CERTIFICATIONS</div>
                  <div className="flex flex-wrap gap-1">
                    {buyer.certifications.slice(0, 2).map((cert, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                        {cert}
                      </span>
                    ))}
                    {buyer.certifications.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                        +{buyer.certifications.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                  Contact Buyer
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}