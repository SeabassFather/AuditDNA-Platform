import React from 'react';
import { DollarSign, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriceAnalytics({ commodity, yourCost, regionalData }) {
  if (!commodity) {
    return (
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Select a commodity to view price analytics</p>
      </div>
    );
  }

  const calculateMargins = (region) => {
    const cost = parseFloat(yourCost) || 0;
    const wholesale = region.wholesale;
    const retail = region.retail;
    return {
      wholesaleMargin: wholesale - cost,
      wholesaleMarginPercent: cost > 0 ? ((wholesale - cost) / cost * 100).toFixed(1) : 0,
      retailMargin: retail - wholesale,
      retailMarginPercent: wholesale > 0 ? ((retail - wholesale) / wholesale * 100).toFixed(1) : 0
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">Your Cost ($/box)</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            value={yourCost}
            onChange={(e) => {/* handled by parent */}}
            placeholder="Enter your cost"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-lg font-bold"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-bold text-gray-800 mb-4">Regional Price Comparison</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="yourCost" fill="#94a3b8" name="Your Cost" />
            <Bar dataKey="wholesale" fill="#10b981" name="Wholesale" />
            <Bar dataKey="retail" fill="#8b5cf6" name="Retail" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {regionalData.map((region, idx) => {
          const margins = calculateMargins(region);
          return (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h5 className="font-bold text-gray-800">{region.region}</h5>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600">Wholesale Margin</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">${margins.wholesaleMargin.toFixed(2)}</span>
                    <span className={`text-sm font-bold ${margins.wholesaleMarginPercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {margins.wholesaleMarginPercent}%
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Retail Margin</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">${margins.retailMargin.toFixed(2)}</span>
                    <span className="text-sm font-bold text-purple-600">{margins.retailMarginPercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
