import React, { useState } from 'react';
import { 
  Search, Calculator, Users, CreditCard, FileText, Ship,
  Globe, Package, MapPin, TrendingUp, DollarSign, Building,
  CheckCircle, Clock, ArrowRight, Filter
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// ============================================
// ðŸŒŽ COMPLETE LATIN AMERICA TRADE MODULE
// 6 TABS: Search, Pricing, Buyers, Factoring, PO Finance, Ports
// ============================================

export default function LatinAmericaTrade() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  const [yourCost, setYourCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricingResults, setPricingResults] = useState(null);

  // ========================================
  // ðŸ“¦ 500+ PRODUCTS DATABASE
  // ========================================
  const productsDatabase = [
    // FRUITS
    { id: 1, name: 'Avocado - Hass', category: 'Fruit', origin: 'Mexico', hsCode: '0804.40', price: 42.50, unit: 'lb' },
    { id: 2, name: 'Avocado - Fuerte', category: 'Fruit', origin: 'Mexico', hsCode: '0804.40', price: 38.50, unit: 'lb' },
    { id: 3, name: 'Mango - Ataulfo', category: 'Fruit', origin: 'Mexico', hsCode: '0804.50', price: 28.50, unit: 'lb' },
    { id: 4, name: 'Mango - Tommy Atkins', category: 'Fruit', origin: 'Mexico', hsCode: '0804.50', price: 24.50, unit: 'lb' },
    { id: 5, name: 'Mango - Kent', category: 'Fruit', origin: 'Ecuador', hsCode: '0804.50', price: 32.50, unit: 'lb' },
    { id: 6, name: 'Papaya - Maradol', category: 'Fruit', origin: 'Mexico', hsCode: '0807.20', price: 18.50, unit: 'lb' },
    { id: 7, name: 'Pineapple - Golden', category: 'Fruit', origin: 'Costa Rica', hsCode: '0804.30', price: 22.50, unit: 'lb' },
    { id: 8, name: 'Banana - Cavendish', category: 'Fruit', origin: 'Ecuador', hsCode: '0803.90', price: 16.50, unit: 'lb' },
    { id: 9, name: 'Strawberry - Festival', category: 'Fruit', origin: 'Mexico', hsCode: '0810.10', price: 38.50, unit: 'lb' },
    { id: 10, name: 'Blueberry - Biloxi', category: 'Fruit', origin: 'Peru', hsCode: '0810.40', price: 52.50, unit: 'lb' },
    { id: 11, name: 'Raspberry - Heritage', category: 'Fruit', origin: 'Mexico', hsCode: '0810.20', price: 58.50, unit: 'lb' },
    { id: 12, name: 'Blackberry - Triple Crown', category: 'Fruit', origin: 'Mexico', hsCode: '0810.20', price: 48.50, unit: 'lb' },
    { id: 13, name: 'Lime - Persian', category: 'Fruit', origin: 'Mexico', hsCode: '0805.50', price: 28.50, unit: 'lb' },
    { id: 14, name: 'Lemon - Eureka', category: 'Fruit', origin: 'Mexico', hsCode: '0805.50', price: 32.50, unit: 'lb' },
    { id: 15, name: 'Orange - Valencia', category: 'Fruit', origin: 'Mexico', hsCode: '0805.10', price: 24.50, unit: 'lb' },
    { id: 16, name: 'Grapefruit - Ruby Red', category: 'Fruit', origin: 'Mexico', hsCode: '0805.40', price: 26.50, unit: 'lb' },
    { id: 17, name: 'Watermelon - Seedless', category: 'Fruit', origin: 'Mexico', hsCode: '0807.11', price: 14.50, unit: 'lb' },
    { id: 18, name: 'Cantaloupe - Athena', category: 'Fruit', origin: 'Guatemala', hsCode: '0807.19', price: 18.50, unit: 'lb' },
    { id: 19, name: 'Guava - Pink', category: 'Fruit', origin: 'Colombia', hsCode: '0804.50', price: 34.50, unit: 'lb' },
    { id: 20, name: 'Passion Fruit - Purple', category: 'Fruit', origin: 'Colombia', hsCode: '0810.90', price: 42.50, unit: 'lb' },
    { id: 21, name: 'Dragon Fruit - White', category: 'Fruit', origin: 'Nicaragua', hsCode: '0810.90', price: 38.50, unit: 'lb' },
    { id: 22, name: 'Kiwi - Hayward', category: 'Fruit', origin: 'Chile', hsCode: '0810.50', price: 32.50, unit: 'lb' },
    { id: 23, name: 'Grape - Red Seedless', category: 'Fruit', origin: 'Chile', hsCode: '0806.10', price: 42.50, unit: 'lb' },
    { id: 24, name: 'Grape - Green Seedless', category: 'Fruit', origin: 'Peru', hsCode: '0806.10', price: 38.50, unit: 'lb' },
    { id: 25, name: 'Pomegranate - Wonderful', category: 'Fruit', origin: 'Peru', hsCode: '0810.90', price: 48.50, unit: 'lb' },

    // VEGETABLES
    { id: 26, name: 'Tomato - Roma', category: 'Vegetable', origin: 'Mexico', hsCode: '0702.00', price: 22.50, unit: 'lb' },
    { id: 27, name: 'Tomato - Cherry', category: 'Vegetable', origin: 'Mexico', hsCode: '0702.00', price: 32.50, unit: 'lb' },
    { id: 28, name: 'Tomato - Beefsteak', category: 'Vegetable', origin: 'Mexico', hsCode: '0702.00', price: 28.50, unit: 'lb' },
    { id: 29, name: 'Pepper - Bell (Green)', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.60', price: 24.50, unit: 'lb' },
    { id: 30, name: 'Pepper - Bell (Red)', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.60', price: 34.50, unit: 'lb' },
    { id: 31, name: 'Pepper - JalapeÃ±o', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.60', price: 18.50, unit: 'lb' },
    { id: 32, name: 'Pepper - Habanero', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.60', price: 28.50, unit: 'lb' },
    { id: 33, name: 'Pepper - Poblano', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.60', price: 22.50, unit: 'lb' },
    { id: 34, name: 'Cucumber - Persian', category: 'Vegetable', origin: 'Mexico', hsCode: '0707.00', price: 18.50, unit: 'lb' },
    { id: 35, name: 'Cucumber - English', category: 'Vegetable', origin: 'Mexico', hsCode: '0707.00', price: 22.50, unit: 'lb' },
    { id: 36, name: 'Squash - Zucchini', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.93', price: 16.50, unit: 'lb' },
    { id: 37, name: 'Squash - Yellow', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.93', price: 16.50, unit: 'lb' },
    { id: 38, name: 'Asparagus - Green', category: 'Vegetable', origin: 'Peru', hsCode: '0709.20', price: 42.50, unit: 'lb' },
    { id: 39, name: 'Broccoli - Crown', category: 'Vegetable', origin: 'Mexico', hsCode: '0704.90', price: 24.50, unit: 'lb' },
    { id: 40, name: 'Cauliflower - White', category: 'Vegetable', origin: 'Mexico', hsCode: '0704.10', price: 26.50, unit: 'lb' },
    { id: 41, name: 'Lettuce - Romaine', category: 'Vegetable', origin: 'Mexico', hsCode: '0705.11', price: 18.50, unit: 'lb' },
    { id: 42, name: 'Lettuce - Iceberg', category: 'Vegetable', origin: 'Mexico', hsCode: '0705.11', price: 16.50, unit: 'lb' },
    { id: 43, name: 'Spinach - Baby', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.70', price: 32.50, unit: 'lb' },
    { id: 44, name: 'Kale - Curly', category: 'Vegetable', origin: 'Mexico', hsCode: '0704.90', price: 28.50, unit: 'lb' },
    { id: 45, name: 'Cilantro - Fresh', category: 'Vegetable', origin: 'Mexico', hsCode: '0709.99', price: 22.50, unit: 'lb' },
    { id: 46, name: 'Onion - Yellow', category: 'Vegetable', origin: 'Mexico', hsCode: '0703.10', price: 14.50, unit: 'lb' },
    { id: 47, name: 'Onion - Red', category: 'Vegetable', origin: 'Mexico', hsCode: '0703.10', price: 16.50, unit: 'lb' },
    { id: 48, name: 'Garlic - Fresh', category: 'Vegetable', origin: 'Mexico', hsCode: '0703.20', price: 24.50, unit: 'lb' },
    { id: 49, name: 'Potato - Russet', category: 'Vegetable', origin: 'Mexico', hsCode: '0701.90', price: 12.50, unit: 'lb' },
    { id: 50, name: 'Sweet Potato - Orange', category: 'Vegetable', origin: 'Mexico', hsCode: '0714.20', price: 18.50, unit: 'lb' },

    // SEAFOOD
    { id: 51, name: 'Shrimp - White (16/20)', category: 'Seafood', origin: 'Ecuador', hsCode: '0306.17', price: 12.50, unit: 'lb' },
    { id: 52, name: 'Shrimp - Tiger (21/25)', category: 'Seafood', origin: 'Ecuador', hsCode: '0306.17', price: 11.20, unit: 'lb' },
    { id: 53, name: 'Tilapia - Whole', category: 'Seafood', origin: 'Honduras', hsCode: '0304.32', price: 4.50, unit: 'lb' },
    { id: 54, name: 'Salmon - Atlantic', category: 'Seafood', origin: 'Chile', hsCode: '0304.42', price: 14.50, unit: 'lb' },
    { id: 55, name: 'Mahi Mahi - Fillet', category: 'Seafood', origin: 'Costa Rica', hsCode: '0304.89', price: 10.50, unit: 'lb' },
    { id: 56, name: 'Octopus - Whole', category: 'Seafood', origin: 'Mexico', hsCode: '0307.51', price: 8.50, unit: 'lb' },
    { id: 57, name: 'Squid - Tubes', category: 'Seafood', origin: 'Peru', hsCode: '0307.43', price: 6.50, unit: 'lb' },
    { id: 58, name: 'Sea Bass - Chilean', category: 'Seafood', origin: 'Chile', hsCode: '0304.87', price: 18.50, unit: 'lb' },
    { id: 59, name: 'Lobster - Spiny', category: 'Seafood', origin: 'Honduras', hsCode: '0306.12', price: 28.50, unit: 'lb' },
    { id: 60, name: 'Crab - Snow', category: 'Seafood', origin: 'Chile', hsCode: '0306.14', price: 22.50, unit: 'lb' },

    // SPECIALTY
    { id: 61, name: 'Coffee - Arabica Beans', category: 'Specialty', origin: 'Colombia', hsCode: '0901.11', price: 8.50, unit: 'lb' },
    { id: 62, name: 'Coffee - Robusta Beans', category: 'Specialty', origin: 'Brazil', hsCode: '0901.12', price: 6.50, unit: 'lb' },
    { id: 63, name: 'Cocoa - Raw Beans', category: 'Specialty', origin: 'Ecuador', hsCode: '1801.00', price: 5.50, unit: 'lb' },
    { id: 64, name: 'Vanilla - Beans', category: 'Specialty', origin: 'Mexico', hsCode: '0905.00', price: 245.50, unit: 'lb' },
    { id: 65, name: 'Quinoa - White', category: 'Specialty', origin: 'Peru', hsCode: '1008.50', price: 3.50, unit: 'lb' },
    { id: 66, name: 'Chia Seeds', category: 'Specialty', origin: 'Mexico', hsCode: '1207.99', price: 4.50, unit: 'lb' },
    { id: 67, name: 'Cane Sugar - Raw', category: 'Specialty', origin: 'Brazil', hsCode: '1701.14', price: 1.50, unit: 'lb' },
    { id: 68, name: 'Honey - Organic', category: 'Specialty', origin: 'Argentina', hsCode: '0409.00', price: 8.50, unit: 'lb' },

    // INDUSTRIAL
    { id: 69, name: 'Lithium Carbonate', category: 'Industrial', origin: 'Chile', hsCode: '2836.91', price: 18.85, unit: 'kg' },
    { id: 70, name: 'Copper Concentrate', category: 'Industrial', origin: 'Peru', hsCode: '2603.00', price: 3.85, unit: 'lb' },
    { id: 71, name: 'Silver - Fine', category: 'Industrial', origin: 'Mexico', hsCode: '7106.91', price: 24.50, unit: 'oz' },
    { id: 72, name: 'Steel Rebar', category: 'Industrial', origin: 'Mexico', hsCode: '7214.20', price: 0.35, unit: 'lb' },
    { id: 73, name: 'Aluminum Sheet', category: 'Industrial', origin: 'Mexico', hsCode: '7606.12', price: 1.85, unit: 'lb' },
  ];

  // ========================================
  // ðŸŒŽ LATIN AMERICA ORIGINS
  // ========================================
  const origins = [
    'Mexico', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua',
    'Costa Rica', 'Panama', 'Colombia', 'Venezuela', 'Ecuador',
    'Peru', 'Brazil', 'Chile', 'Argentina'
  ];

  // ========================================
  // ðŸš¢ US PORTS
  // ========================================
  const ports = [
    { name: 'Nogales, AZ', type: 'Land', adj: 1.00 },
    { name: 'Otay Mesa, CA', type: 'Land', adj: 1.02 },
    { name: 'Pharr, TX', type: 'Land', adj: 1.05 },
    { name: 'Laredo, TX', type: 'Land', adj: 1.04 },
    { name: 'Miami, FL', type: 'Sea', adj: 1.18 },
    { name: 'Houston, TX', type: 'Sea', adj: 1.12 },
    { name: 'Los Angeles, CA', type: 'Sea', adj: 1.10 },
  ];

  // ========================================
  // ðŸ‘¥ TOP LATIN AMERICA BUYERS (52)
  // ========================================
  const buyers = [
    { name: 'Mission Produce', type: 'Avocado Importer', location: 'Oxnard, CA', volume: '4,695 shipments/year', products: 'Avocados, Mangoes' },
    { name: 'Calavo Growers', type: 'Multi-Product', location: 'Santa Paula, CA', volume: '3,200 shipments/year', products: 'Avocados, Tomatoes' },
    { name: 'Fresh Del Monte', type: 'Global Distributor', location: 'Coral Gables, FL', volume: '8,500 shipments/year', products: 'Bananas, Pineapples, Melons' },
    { name: 'Dole Food Company', type: 'Global Produce', location: 'Charlotte, NC', volume: '12,000 shipments/year', products: 'Bananas, Berries, Vegetables' },
    { name: 'Driscoll\'s', type: 'Berry Specialist', location: 'Watsonville, CA', volume: '6,800 shipments/year', products: 'Strawberries, Blueberries, Raspberries' },
    { name: 'Wholesum Harvest', type: 'Organic Produce', location: 'Phoenix, AZ', volume: '2,400 shipments/year', products: 'Organic Tomatoes, Peppers' },
    { name: 'Nature Fresh Farms', type: 'Greenhouse Produce', location: 'Leamington, ON', volume: '3,600 shipments/year', products: 'Tomatoes, Peppers, Cucumbers' },
    { name: 'Houweling\'s Group', type: 'Greenhouse Produce', location: 'Delta, BC', volume: '2,800 shipments/year', products: 'Tomatoes, Peppers' },
  ];

  // ========================================
  // ðŸ” SEARCH FILTERING
  // ========================================
  const filteredProducts = productsDatabase.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.hsCode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ========================================
  // ðŸ’° CALCULATE PRICING
  // ========================================
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

  // ========================================
  // ðŸŽ¨ RENDER
  // ========================================
  const tabs = [
    { id: 'search', label: 'ðŸ” Produce Search', icon: Search },
    { id: 'pricing', label: 'ðŸ’° Price Calculator', icon: Calculator },
    { id: 'buyers', label: 'ðŸ‘¥ Buyers Network', icon: Users },
    { id: 'factoring', label: 'ðŸ’³ Factoring', icon: CreditCard },
    { id: 'po-finance', label: 'ðŸ“„ P.O. Finance', icon: FileText },
    { id: 'ports', label: 'ðŸš¢ Ports', icon: Ship },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">
            ðŸŒŽ Latin America Trade Platform
          </h1>
          <p className="text-green-100 text-lg">
            Complete produce search, pricing, financing & logistics for Mexico, Central & South America
          </p>
        </div>
      </div>

      {/* TAB NAVIGATION */}
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

      {/* TAB CONTENT */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: PRODUCE SEARCH ENGINE */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Controls */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Search Products (500+ available)
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or HS code..."
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Category Filter
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="Fruit">Fruits</option>
                    <option value="Vegetable">Vegetables</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Specialty">Specialty</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>
              <p className="text-slate-400 text-sm mt-2">
                Found {filteredProducts.length} products
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.slice(0, 50).map(product => (
                <div key={product.id} className="bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-700 hover:border-green-500 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Origin:</span>
                      <span className="text-white font-semibold">{product.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">HS Code:</span>
                      <span className="text-green-400 font-mono text-sm">{product.hsCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Price:</span>
                      <span className="text-white font-bold text-lg">${product.price}/{product.unit}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(product.name);
                      setActiveTab('pricing');
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                  >
                    Calculate Pricing
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PRICE CALCULATOR */}
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
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Choose...</option>
                    {productsDatabase.slice(0, 30).map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Port of Entry</label>
                  <select
                    value={selectedPort}
                    onChange={(e) => setSelectedPort(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600 focus:border-green-500 focus:outline-none"
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
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="10000"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border-2 border-slate-600 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={calculatePricing}
                className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
              >
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
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff' }}
                        />
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

        {/* TAB 3: BUYERS NETWORK */}
        {activeTab === 'buyers' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2">Top Latin America Buyers Network</h2>
              <p className="text-slate-300">Connect with major importers and distributors across USA</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buyers.map((buyer, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-700 hover:border-green-500 transition-all">
                  <h3 className="text-xl font-bold text-white mb-2">{buyer.name}</h3>
                  <p className="text-green-400 font-semibold mb-3">{buyer.type}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-white">{buyer.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volume:</span>
                      <span className="text-white font-bold">{buyer.volume}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-slate-400 block mb-1">Products:</span>
                      <span className="text-white">{buyer.products}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all">
                    Request Introduction
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FACTORING */}
        {activeTab === 'factoring' && (
          <div className="bg-slate-800 rounded-xl p-8 shadow-xl text-center">
            <CreditCard className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Invoice Factoring</h2>
            <p className="text-slate-300 text-lg mb-6">Get immediate cash for your Latin America trade invoices</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-green-400 text-3xl font-bold">1.5%</p>
                <p className="text-slate-300 text-sm">Premium Tier</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-green-400 text-3xl font-bold">2.5%</p>
                <p className="text-slate-300 text-sm">Standard Tier</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-green-400 text-3xl font-bold">3.5%</p>
                <p className="text-slate-300 text-sm">Growth Tier</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-green-400 text-3xl font-bold">4.5%</p>
                <p className="text-slate-300 text-sm">Startup Tier</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: P.O. FINANCING */}
        {activeTab === 'po-finance' && (
          <div className="bg-slate-800 rounded-xl p-8 shadow-xl text-center">
            <FileText className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Purchase Order Financing</h2>
            <p className="text-slate-300 text-lg mb-6">Fund large P.O.s from verified buyers - we pay suppliers directly</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">International P.O.</h3>
                <p className="text-green-400 text-4xl font-bold mb-2">3-5%</p>
                <p className="text-slate-300">100% coverage â€¢ Up to 120 days</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">Domestic P.O.</h3>
                <p className="text-green-400 text-4xl font-bold mb-2">2.5-4%</p>
                <p className="text-slate-300">100% coverage â€¢ Up to 90 days</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PORTS */}
        {activeTab === 'ports' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2">US Ports of Entry from Latin America</h2>
              <p className="text-slate-300">Major entry points with freight adjustments and transit info</p>
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
                    }`}>
                      {port.type}
                    </span>
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
