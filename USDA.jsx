import React, { useState } from 'react';
import { Home, DollarSign, Calculator, CheckCircle, FileText, Award, Tractor, Sprout, BookOpen, MapPin } from 'lucide-react';

// ============================================
// ALL 10 TABS INLINE - NO SEPARATE FILES
// ============================================

// TAB 1: OVERVIEW
function OverviewTab() {
  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-6">
        <h2 className="text-3xl font-bold mb-2">Welcome to USDA Farm Service Agency</h2>
        <p className="text-lg opacity-90">Empowering American farmers with financial support and programs</p>
        <div className="mt-4 flex gap-4">
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">Apply for Loan</button>
          <button className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-green-600">Check Eligibility</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Loans', value: '$142.8B', change: '+8.2%' },
          { label: 'Farmers Served', value: '115,000+', change: '+12%' },
          { label: 'Avg Loan Size', value: '$487K', change: '+5.1%' },
          { label: 'Approval Rate', value: '73%', change: '+3%' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-green-600 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 cursor-pointer hover:shadow-lg">
          <h4 className="text-xl font-bold mb-2">New to USDA?</h4>
          <p className="text-sm opacity-90">Learn about our programs and how we can help</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 cursor-pointer hover:shadow-lg">
          <h4 className="text-xl font-bold mb-2">Disaster Assistance</h4>
          <p className="text-sm opacity-90">Emergency loans and relief programs</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 cursor-pointer hover:shadow-lg">
          <h4 className="text-xl font-bold mb-2">Conservation</h4>
          <p className="text-sm opacity-90">Financial incentives for sustainable farming</p>
        </div>
      </div>
    </div>
  );
}

// TAB 2: LOAN PROGRAMS
function LoanProgramsTab() {
  const programs = [
    { name: 'Farm Ownership', max: '$600,000', rate: '4.5-5.5%', term: '40 years' },
    { name: 'Operating Loan', max: '$400,000', rate: '4.0-5.0%', term: '7 years' },
    { name: 'Microloan', max: '$50,000', rate: '3.5-4.5%', term: '7 years' },
    { name: 'Emergency Loan', max: '$500,000', rate: '3.75%', term: '30 years' },
    { name: 'Youth Loan', max: '$5,000', rate: '2.5%', term: '7 years' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">USDA Loan Programs</h2>
      <div className="space-y-4">
        {programs.map((p, i) => (
          <div key={i} className="bg-white border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{p.name}</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Max Amount</div>
                <div className="font-bold text-green-600">{p.max}</div>
              </div>
              <div>
                <div className="text-gray-500">Interest Rate</div>
                <div className="font-bold text-gray-800">{p.rate}</div>
              </div>
              <div>
                <div className="text-gray-500">Term</div>
                <div className="font-bold text-gray-800">{p.term}</div>
              </div>
            </div>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// TAB 3: CALCULATOR
function CalculatorTab() {
  const [amount, setAmount] = useState(250000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(30);

  const monthlyRate = rate / 100 / 12;
  const payments = term * 12;
  const monthly = amount * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Loan Calculator</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Loan Amount: ${amount.toLocaleString()}</label>
              <input type="range" min="10000" max="600000" step="5000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Interest Rate: {rate}%</label>
              <input type="range" min="2.5" max="10" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Term: {term} years</label>
              <input type="range" min="5" max="40" step="1" value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-8">
          <div className="text-lg mb-2">Monthly Payment</div>
          <div className="text-5xl font-bold mb-4">${monthly.toFixed(2).toLocaleString()}</div>
          <div className="text-sm opacity-90">Principal & Interest</div>
        </div>
      </div>
    </div>
  );
}

// TABS 4-10: PLACEHOLDER (Keep it simple for now)
function PlaceholderTab({ title }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">Content coming soon...</p>
    </div>
  );
}

// ============================================
// MAIN USDA COMPONENT
// ============================================
export default function USDA() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home, component: OverviewTab },
    { id: 'programs', label: 'Loan Programs', icon: DollarSign, component: LoanProgramsTab },
    { id: 'calculator', label: 'Calculator', icon: Calculator, component: CalculatorTab },
    { id: 'eligibility', label: 'Eligibility', icon: CheckCircle, component: () => <PlaceholderTab title="Eligibility Check" /> },
    { id: 'apply', label: 'Apply', icon: FileText, component: () => <PlaceholderTab title="Application" /> },
    { id: 'grants', label: 'Grants', icon: Award, component: () => <PlaceholderTab title="Grants & Assistance" /> },
    { id: 'farm', label: 'Farm Programs', icon: Tractor, component: () => <PlaceholderTab title="Farm Programs" /> },
    { id: 'conservation', label: 'Conservation', icon: Sprout, component: () => <PlaceholderTab title="Conservation" /> },
    { id: 'resources', label: 'Resources', icon: BookOpen, component: () => <PlaceholderTab title="Resources" /> },
    { id: 'office', label: 'Find Office', icon: MapPin, component: () => <PlaceholderTab title="Find Office" /> }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || OverviewTab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">USDA Farm Service Agency</h1>
          <p className="text-gray-600 mt-1">Agricultural Loans, Grants & Programs</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-x-auto">
          <div className="flex border-b">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
                  }`}>
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ActiveComponent />
        </div>

      </div>
    </div>
  );
}