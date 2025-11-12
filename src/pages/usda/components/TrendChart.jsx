import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TrendChart({ data, dataKey, title, color = '#10b981', showArea = false, height = 300 }) {
  const ChartComponent = showArea ? AreaChart : LineChart;
  const DataComponent = showArea ? Area : Line;
  
  // Calculate trend
  const firstValue = data[0]?.[dataKey] || 0;
  const lastValue = data[data.length - 1]?.[dataKey] || 0;
  const change = firstValue ? ((lastValue - firstValue) / firstValue * 100).toFixed(1) : 0;
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
          <span className={`font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '2px solid #e5e7eb', borderRadius: '8px' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <DataComponent 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={3}
            fill={showArea ? `url(#gradient-${dataKey})` : undefined}
            fillOpacity={showArea ? 1 : undefined}
            name={title}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}
