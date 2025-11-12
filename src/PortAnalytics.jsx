import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
export default function PortAnalytics() {
  const data = [
    { month: "Jan", volume: 320 },
    { month: "Feb", volume: 470 },
    { month: "Mar", volume: 590 },
    { month: "Apr", volume: 660 },
  ];
  return (
    <div className="bg-slate-800/70 p-6 rounded-xl">
      <h2 className="text-teal-400 font-bold mb-4">âš“ Port Volume Analytics</h2>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="port" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="#94a3b8"/>
          <YAxis stroke="#94a3b8"/>
          <Tooltip />
          <Area type="monotone" dataKey="volume" stroke="#06b6d4" fillOpacity={1} fill="url(#port)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
