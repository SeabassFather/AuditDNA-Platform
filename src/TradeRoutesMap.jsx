import React from "react";
// Install and set up react-leaflet if not done: npm install react-leaflet leaflet
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
export default function TradeRoutesMap() {
  const routes = [
    { from: [19.7, -101.2], to: [34.0, -118.2], label: "Avocado â€“ MichoacÃ¡n â†’ Los Angeles" },
    { from: [31.3, -110.9], to: [32.2, -110.9], label: "Tomato â€“ Nogales â†’ Tucson" },
    { from: [20.6, -100.4], to: [25.6, -100.3], label: "Berry â€“ QuerÃ©taro â†’ Monterrey" },
  ];
  return (
    <div className="bg-slate-800/70 rounded-xl p-4">
      <h2 className="text-xl font-semibold text-teal-400 mb-4">Trade Routes</h2>
      <MapContainer center={[22, -99]} zoom={4} style={{height:"400px",borderRadius:"16px"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {routes.map((r, i) => (<Polyline key={i} positions={[r.from, r.to]} color="#06b6d4" />))}
        {routes.map((r, i) => (<Marker key={i} position={r.to}><Popup>{r.label}</Popup></Marker>))}
      </MapContainer>
    </div>
  );
}
