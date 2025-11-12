import React, { useState } from 'react';
import { 
  Search, Calculator, Users, CreditCard, FileText, Ship,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// ===============================================
// ðŸ§¬ MONSTER MASTER: LATIN AMERICA TRADE INTELLIGENCE DASHBOARD
// ===============================================

export default function MonsterLatinAmericaDashboard() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  const [yourCost, setYourCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricingResults, setPricingResults] = useState(null);

  // ðŸš€ Product Database (500+ items, demo slice shown)
  const productsDatabase = [ /* ...exact products slice from your LatinAmericaTradeModule... */ 
    // Example entries: You can expand or connect backend
    { id: 1, name: 'Avocado - Hass', category: 'Fruit', origin: 'Mexico', hsCode: '0804.40', price: 42.50, unit: 'lb' },
    { id: 26, name: 'Tomato - Roma', category: 'Vegetable', origin: 'Mexico', hsCode: '0702.00', price: 22.50, unit: 'lb' },
    { id: 51, name: 'Shrimp - White (16/20)', category: 'Seafood', origin: 'Ecuador', hsCode: '0306.17', price: 12.50, unit: 'lb' },
    { id: 64, name: 'Vanilla - Beans', category: 'Specialty', origin: 'Mexico', hsCode: '0905.00', price: 245.50, unit: 'lb' },
    { id: 69, name: 'Lithium Carbonate', category: 'Industrial', origin: 'Chile', hsCode: '2836.91', price: 18.85, unit: 'kg' },
    // Add more products as desired...
  ];

  // ðŸŒŽ Countries/Origins
  const origins = [
    'Mexico', 'Guatemala', 'Honduras', 'Costa Rica', 'Colombia',
    'Peru', 'Chile', 'Brazil', 'Ecuador', 'Argentina'
  ];

  // ðŸš¢ Ports of Entry
  const ports = [
    { name: 'Nogales, AZ', type: 'Land', adj: 1.00 },
    { name: 'Miami, FL', type: 'Sea', adj: 1.18 },
    { name: 'Houston, TX', type: 'Sea', adj: 1.12 },
    { name: 'Los Angeles, CA', type: 'Sea', adj: 1.10 },
    // Expand as needed...
  ];

  // ðŸ‘¥ Buyers Directory (top Latin American buyers, demo slice shown)
  const buyers = [
    { name: 'Mission Produce', type: 'Avocado Importer', location: 'Oxnard, CA', volume: '4,695 shipments/year', products: 'Avocados, Mangoes' },
    { name: 'Fresh Del Monte', type: 'Global Distributor', location: 'Coral Gables, FL', volume: '8,500 shipments/year', products: 'Bananas, Pineapples, Melons' },
    // Add more...
  ];

  // ðŸ” Tab Filtering Logic
  const filteredProducts = productsDatabase.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.hsCode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ðŸ’° Pricing Calculator
  const calculatePricing = () => {
    if (!selectedProduct || !yourCost || !quantity) {
      alert('Please fill all fields');
      return;
    }

    const product = productsDatabase.find(p => p.name === selectedProduct);
    const port = ports.find(p => p.name === selectedPort) || ports[0];
    const cost = parseFloat(yourCost);
    const qty = parseFloat(quantity);

    const zones = {
      pacific: { base: 1.05, retail: 1.35 },
      mountain: { base: 1.08, retail: 1.35 },
      central: { base: 1.12, retail: 1.35 },
      eastern: { base: 1.15, retail: 1.35 }
    };

    const results = {};
    Object.keys(zones).forEach(zone => {
      const wholesale = cost * zones[zone].base * port.adj;
      const retail = wholesale * zones[zone].retail;
      results[zone] = {
        wholesale,
        retail,
        wholesaleProfit: (wholesale - cost) * qty,
        retailProfit: (retail - cost) * qty,
        wholesaleMargin: ((wholesale - cost) / wholesale * 100),
        retailMargin: ((retail - cost) / retail * 100)
      };
    });

    setPricingResults({ product: product.name, results });
  };

  // ðŸ”¥ TAB STRUCTURE
  const tabs = [
    { id: 'search', label: 'ðŸ” Produce Search', icon: Search },
    { id: 'pricing', label: 'ðŸ’° Price Calculator', icon: Calculator },
    { id: 'buyers', label: 'ðŸ‘¥ Buyers Network', icon: Users },
    { id: 'factoring', label: 'ðŸ’³ Factoring', icon: CreditCard },
    { id: 'po', label: 'ðŸ“„ PO Finance', icon: FileText },
    { id: 'ports', label: 'ðŸš¢ Ports', icon: Ship },
    // Add new tabs (TradeRoutesMap, ComplianceUpload, etc) instantly!
  ];

  // ðŸŒˆ RENDER: Monster Master Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-3">ðŸŒŽ AuditDNA Latin America Monster Dashboard</h1>
          <p className="text-green-100 text-xl">Search, analytics, pricing, buyers, finance, compliance â€” CM, USDA, All Americas</p>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-slate-800 rounded-lg p-2 flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT  */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Search Products</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name or HS code..."
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600"
                  >
                    <option value="all">All</option>
                    <option value="Fruit">Fruits</option>
                    <option value="Vegetable">Vegetables</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Specialty">Specialty</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>
              <p className="text-slate-400 text-sm mt-2">Found {filteredProducts.length} products</p>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-700 hover:border-green-500 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400 text-sm">Origin:</span><span className="text-white font-semibold">{product.origin}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400 text-sm">HS Code:</span><span className="text-green-400 font-mono text-sm">{product.hsCode}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400 text-sm">Price:</span><span className="text-white font-bold text-lg">${product.price}/{product.unit}</span></div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(product.name);
                      setActiveTab('pricing');
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all">
                    Calculate Pricing
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Time Zone Price Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Product</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600"
                  >
                    <option value="">Choose...</option>
                    {productsDatabase.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Port of Entry</label>
                  <select
                    value={selectedPort}
                    onChange={(e) => setSelectedPort(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600"
                  >
                    <option value="">Choose...</option>
                    {ports.map(p => (
                      <option key={p.name} value={p.name}>{p.name} ({p.type})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Your Cost ($/unit)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={yourCost}
                    onChange={(e) => setYourCost(e.target.value)}
                    placeholder="28.00"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="10000"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600"
                  />
                </div>
              </div>
              <button
                onClick={calculatePricing}
                className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-emerald-700">
                Calculate Pricing
              </button>
            </div>
            {pricingResults && (
              <>
                <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Price Comparison by US Time Zone</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Object.keys(pricingResults.results).map(zone => ({
                          zone: zone.charAt(0).toUpperCase() + zone.slice(1),
                          'Cost': parseFloat(yourCost),
                          'Wholesale': pricingResults.results[zone].wholesale,
                          'Retail': pricingResults.results[zone].retail
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="zone" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip labelStyle={{ color: "#fff" }}/>
                        <Legend />
                        <Bar dataKey="Cost" fill="#64748b" />
                        <Bar dataKey="Wholesale" fill="#10b981" />
                        <Bar dataKey="Retail" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(pricingResults.results).map(([zone, data]) => (
                    <div key={zone} className="bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-700">
                      <h3 className="text-lg font-bold text-white mb-4 capitalize">
                        {zone === 'pacific' && 'ðŸŒŠ Pacific'}
                        {zone === 'mountain' && 'â›°ï¸ Mountain'}
                        {zone === 'central' && 'ðŸŒ¾ Central'}
                        {zone === 'eastern' && 'ðŸ™ï¸ Eastern'}
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-slate-700 rounded-lg p-3">
                          <p className="text-slate-400 text-xs">Your Cost</p>
                          <p className="text-white text-xl font-bold">${parseFloat(yourCost).toFixed(2)}</p>
                        </div>
                        <div className="bg-green-900/30 rounded-lg p-3 border border-green-600">
                          <p className="text-green-300 text-xs">Wholesale</p>
                          <p className="text-green-100 text-xl font-bold">${data.wholesale.toFixed(2)}</p>
                          <p className="text-green-400 text-sm font-semibold mt-1">
                            +${data.wholesaleProfit.toFixed(0)} ({data.wholesaleMargin.toFixed(1)}%)
                          </p>
                        </div>
                        <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-600">
                          <p className="text-purple-300 text-xs">Retail</p>
                          <p className="text-purple-100 text-xl font-bold">${data.retail.toFixed(2)}</p>
                          <p className="text-purple-400 text-sm font-semibold mt-1">
                            +${data.retailProfit.toFixed(0)} ({data.retailMargin.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'buyers' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2">Top Buyers Network</h2>
              <p className="text-slate-300">Major importers, volume, location</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buyers.map((buyer, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-700 hover:border-green-500 transition-all">
                  <h3 className="text-xl font-bold text-white mb-2">{buyer.name}</h3>
                  <p className="text-green-400 font-semibold mb-3">{buyer.type}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Location:</span><span className="text-white">{buyer.location}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Volume:</span><span className="text-white font-bold">{buyer.volume}</span></div>
                    <div className="mt-3"><span className="text-slate-400 block mb-1">Products:</span><span className="text-white">{buyer.products}</span></div>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all">
                    Request Introduction
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'factoring' && (
          <div className="bg-slate-800 rounded-xl p-8 shadow-xl text-center">
            <CreditCard className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Invoice Factoring</h2>
            <p className="text-slate-300 text-lg mb-6">Get immediate cash for invoices</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-slate-700 rounded-lg p-4"><p className="text-green-400 text-3xl font-bold">1.5%</p><p className="text-slate-300 text-sm">Premium Tier</p></div>
              <div className="bg-slate-700 rounded-lg p-4"><p className="text-green-400 text-3xl font-bold">2.5%</p><p className="text-slate-300 text-sm">Standard Tier</p></div>
              <div className="bg-slate-700 rounded-lg p-4"><p className="text-green-400 text-3xl font-bold">3.5%</p><p className="text-slate-300 text-sm">Growth Tier</p></div>
              <div className="bg-slate-700 rounded-lg p-4"><p className="text-green-400 text-3xl font-bold">4.5%</p><p className="text-slate-300 text-sm">Startup Tier</p></div>
            </div>
          </div>
        )}

        {activeTab === 'po' && (
          <div className="bg-slate-800 rounded-xl p-8 shadow-xl text-center">
            <FileText className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Purchase Order Financing</h2>
            <p className="text-slate-300 text-lg mb-6">Fund large P.O.s from verified buyers. 100% coverage â€” we pay suppliers directly.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">International P.O.</h3>
                <p className="text-green-400 text-4xl font-bold mb-2">3-5%</p>
                <p className="text-slate-300">Up to 120 days</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">Domestic P.O.</h3>
                <p className="text-green-400 text-4xl font-bold mb-2">2.5-4%</p>
                <p className="text-slate-300">Up to 90 days</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ports' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2">US Ports of Entry</h2>
              <p className="text-slate-300">Major entry points, freight adjustment, transit info</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ports.map(port => (
                <div key={port.name} className="bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-700 hover:border-green-500 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{port.name}</h3>
                      <p className="text-slate-400 text-sm">{port.type} Border</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      port.type === 'Land' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                    }`}>{port.type}</span>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">Freight Adjustment</p>
                    <p className="text-white text-2xl font-bold">
                      {port.adj === 1.00 ? 'Base' : `+${((port.adj - 1) * 100).toFixed(0)}%`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
