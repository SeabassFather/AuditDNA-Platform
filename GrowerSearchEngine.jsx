import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, MapPin, Award, DollarSign, TrendingUp, Phone, Mail, 
  Globe, Package, Truck, Calendar, Star, CheckCircle, AlertCircle,
  Filter, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';
import { searchGrowers, getGrowerById, GROWERS_DATABASE } from '../data/growersDatabase';
import { searchCommoditiesWithPrices, getAvocadoData } from '../services/usdaService';

// ==========================================
// MEXaUSA GROWER SEARCH ENGINE
// USDA-Powered Real-Time Pricing + Grower Matching
// ==========================================

export default function GrowerSearchEngine() {
  // Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrower, setSelectedGrower] = useState(null);
  const [usdaPrices, setUsdaPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    state: 'all',
    commodity: 'all',
    certification: 'all',
    minQualityRating: 0,
    preferredPOE: 'all'
  });
  
  // UI States
  const [showFilters, setShowFilters] = useState(false);
  const [expandedGrower, setExpandedGrower] = useState(null);

  // Filter Options
  const states = ['all', 'Michoacán', 'Jalisco', 'Baja California', 'Guanajuato', 'Sinaloa'];
  const commodities = ['all', 'avocado', 'strawberry', 'lettuce', 'broccoli', 'leafy greens'];
  const certifications = ['all', 'SENASICA', 'GLOBALG.A.P.', 'Primus GFS', 'USDA Organic'];
  const poes = ['all', 'Otay Mesa, CA', 'Nogales, AZ', 'Pharr, TX', 'Laredo, TX'];

  // Search growers with filters
  const filteredGrowers = useMemo(() => {
    return searchGrowers({ ...filters, searchTerm });
  }, [searchTerm, filters]);

  // Load USDA prices on mount
  useEffect(() => {
    loadUSDAData();
  }, []);

  const loadUSDAData = async () => {
    setLoading(true);
    try {
      // Get avocado data (most important commodity)
      const avocadoData = await getAvocadoData();
      if (avocadoData) {
        setUsdaPrices([avocadoData]);
      }
    } catch (error) {
      console.error('Error loading USDA data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrowerSelect = (grower) => {
    setSelectedGrower(grower);
    setExpandedGrower(grower.growerId);
  };

  const handleContactGrower = (grower) => {
    // Open deal room or contact modal
    window.open(`mailto:${grower.contact.email}?subject=MEXaUSA Inquiry - ${grower.growerName}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20 pb-12 px-4">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Search className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">MEXaUSA Grower Search Engine</h1>
                <p className="text-green-100">Find certified growers | Live USDA pricing | Direct contact</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-100">Total Growers</div>
              <div className="text-3xl font-bold">{GROWERS_DATABASE.length}</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-sm text-green-100">Avocado Growers</div>
              <div className="text-2xl font-bold">
                {GROWERS_DATABASE.filter(g => g.commoditiesGrown.some(c => c.commodityId.includes('avo'))).length}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-sm text-green-100">Berry Growers</div>
              <div className="text-2xl font-bold">
                {GROWERS_DATABASE.filter(g => g.commoditiesGrown.some(c => c.commodityId.includes('strawberry'))).length}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-sm text-green-100">Vegetable Growers</div>
              <div className="text-2xl font-bold">
                {GROWERS_DATABASE.filter(g => g.commoditiesGrown.some(c => 
                  c.commodityId.includes('lettuce') || c.commodityId.includes('broccoli')
                )).length}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="text-sm text-green-100">Avg Quality</div>
              <div className="text-2xl font-bold">
                {(GROWERS_DATABASE.reduce((sum, g) => sum + g.metrics.qualityRating, 0) / GROWERS_DATABASE.length).toFixed(1)} ⭐
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search growers, regions, commodities..."
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
              
              {/* State Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({...filters, state: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state === 'all' ? 'All States' : state}</option>
                  ))}
                </select>
              </div>

              {/* Commodity Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Commodity</label>
                <select
                  value={filters.commodity}
                  onChange={(e) => setFilters({...filters, commodity: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {commodities.map(commodity => (
                    <option key={commodity} value={commodity}>
                      {commodity === 'all' ? 'All Commodities' : commodity.charAt(0).toUpperCase() + commodity.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Certification Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Certification</label>
                <select
                  value={filters.certification}
                  onChange={(e) => setFilters({...filters, certification: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {certifications.map(cert => (
                    <option key={cert} value={cert}>{cert === 'all' ? 'All Certifications' : cert}</option>
                  ))}
                </select>
              </div>

              {/* POE Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred POE</label>
                <select
                  value={filters.preferredPOE}
                  onChange={(e) => setFilters({...filters, preferredPOE: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {poes.map(poe => (
                    <option key={poe} value={poe}>{poe === 'all' ? 'All POEs' : poe}</option>
                  ))}
                </select>
              </div>

              {/* Quality Rating Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Min Quality: {filters.minQualityRating.toFixed(1)} ⭐
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.minQualityRating}
                  onChange={(e) => setFilters({...filters, minQualityRating: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Found <span className="font-bold text-green-600">{filteredGrowers.length}</span> growers matching your criteria
          </div>
        </div>
      </div>

      {/* GROWER RESULTS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT - Grower List */}
        <div className="lg:col-span-2 space-y-4 max-h-[800px] overflow-y-auto">
          {filteredGrowers.map(grower => (
            <div
              key={grower.growerId}
              className={`bg-white rounded-xl shadow-lg transition-all cursor-pointer ${
                selectedGrower?.growerId === grower.growerId
                  ? 'ring-4 ring-green-500'
                  : 'hover:shadow-xl'
              }`}
              onClick={() => handleGrowerSelect(grower)}
            >
              <div className="p-6">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{grower.businessName}</h3>
                      {grower.status.verified && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{grower.growerName}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        {grower.location.city}, {grower.location.state}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold text-lg">{grower.metrics.qualityRating}</span>
                    </div>
                    <div className="text-xs text-gray-600">{grower.metrics.totalDealsCompleted} deals</div>
                  </div>
                </div>

                {/* Commodities Grown */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Products Available:</h4>
                  <div className="space-y-2">
                    {grower.commoditiesGrown.map((commodity, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{commodity.commodityName}</div>
                          <div className="text-xs text-gray-600">
                            {commodity.sizesAvailable.join(', ')} • {commodity.qualityGrade}
                            {commodity.organicCertified && ' • Organic'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-700">
                            ${commodity.pricePerCarton}
                          </div>
                          <div className="text-xs text-gray-600">{commodity.weeklyVolume} cartons/wk</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Acreage</div>
                    <div className="font-bold text-blue-700">{grower.operations.acreage} ha</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Capacity</div>
                    <div className="font-bold text-purple-700">{grower.operations.productionCapacity} plt/wk</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">On-Time</div>
                    <div className="font-bold text-green-700">{grower.metrics.onTimeDelivery}%</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Experience</div>
                    <div className="font-bold text-orange-700">{grower.metrics.yearsInBusiness} yrs</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">CERTIFICATIONS</h4>
                  <div className="flex gap-2 flex-wrap">
                    {grower.certifications.filter(c => c.status === 'Active').map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {cert.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferred POEs */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">PREFERRED POEs</h4>
                  <div className="flex gap-2 flex-wrap">
                    {grower.logistics.preferredPOEs.map((poe, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold flex items-center gap-1"
                      >
                        <Truck className="w-3 h-3" />
                        {poe}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactGrower(grower);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Grower
                  </button>
                  
                  {grower.contact.whatsapp && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://wa.me/${grower.contact.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      WhatsApp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredGrowers.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No growers found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>

        {/* RIGHT - Selected Grower Details */}
        <div className="lg:col-span-1">
          {selectedGrower ? (
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Grower Details</h3>
              
              <div className="space-y-4">
                {/* Contact Info */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${selectedGrower.contact.email}`} className="text-green-600 hover:underline">
                        {selectedGrower.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedGrower.contact.phone}</span>
                    </div>
                    {selectedGrower.contact.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <a 
                          href={`https://${selectedGrower.contact.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline flex items-center gap-1"
                        >
                          {selectedGrower.contact.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Operations */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Operations</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-semibold">{selectedGrower.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cold Storage:</span>
                      <span className="font-semibold">
                        {selectedGrower.operations.coldStorage ? '✅ Yes' : '❌ No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Packing House:</span>
                      <span className="font-semibold">
                        {selectedGrower.operations.packingHouse ? '✅ Yes' : '❌ No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Employees:</span>
                      <span className="font-semibold">{selectedGrower.operations.employees}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Quality Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold">{selectedGrower.metrics.qualityRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">On-Time Delivery</span>
                      <span className="font-bold text-green-600">{selectedGrower.metrics.onTimeDelivery}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Compliance</span>
                      <span className="font-bold text-green-600">{selectedGrower.metrics.certificationCompliance}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="font-bold text-blue-600">{selectedGrower.status.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Financial */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Financial</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credit Rating</span>
                      <span className="font-bold text-green-600">{selectedGrower.financial.creditRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Terms</span>
                      <span className="font-semibold">{selectedGrower.logistics.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Order</span>
                      <span className="font-semibold">{selectedGrower.logistics.minimumOrder} pallets</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg p-12 text-center sticky top-24">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-2">Select a Grower</h3>
              <p className="text-sm text-gray-600">Click on a grower to see detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}