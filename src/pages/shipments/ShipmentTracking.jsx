import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShipmentTracking() {
  const navigate = useNavigate();

  const shipments = [
    { id: "SH-8847", origin: "Mexico City", destination: "Los Angeles", status: "In Transit", progress: 67, eta: "Nov 10, 2025", product: "Frozen Avocado", weight: "25,000 kg", color: "#3b82f6" },
    { id: "SH-8848", origin: "Lima", destination: "Miami", status: "In Transit", progress: 42, eta: "Nov 12, 2025", product: "Guacamole", weight: "15,000 kg", color: "#3b82f6" },
    { id: "SH-8849", origin: "Santiago", destination: "New York", status: "Delivered", progress: 100, eta: "Nov 8, 2025", product: "IQF Avocado", weight: "18,000 kg", color: "#10b981" },
    { id: "SH-8850", origin: "Bogotá", destination: "Houston", status: "Delayed", progress: 28, eta: "Nov 14, 2025", product: "Avocado Puree", weight: "12,000 kg", color: "#ef4444" },
    { id: "SH-8851", origin: "São Paulo", destination: "Chicago", status: "In Transit", progress: 85, eta: "Nov 9, 2025", product: "Frozen Avocado", weight: "30,000 kg", color: "#3b82f6" },
    { id: "SH-8852", origin: "Mexico City", destination: "Seattle", status: "At Port", progress: 15, eta: "Nov 15, 2025", product: "Guacamole", weight: "20,000 kg", color: "#f59e0b" }
  ];

  return (
    <div style={{minHeight: "100vh", background: "linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)"}}>
      <div style={{background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)", padding: "30px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)"}}>
        <div style={{maxWidth: "1800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>
            <h1 style={{fontSize: "36px", fontWeight: "bold", color: "#ffffff", margin: 0}}>🚢 Shipment Tracking</h1>
            <p style={{color: "rgba(255,255,255,0.9)", fontSize: "16px", marginTop: "8px"}}>Real-time GPS • Port Analytics • Global Logistics</p>
          </div>
          <button onClick={() => navigate("/")} style={{background: "rgba(255,255,255,0.2)", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold"}}>← Back</button>
        </div>
      </div>

      <div style={{maxWidth: "1800px", margin: "0 auto", padding: "40px"}}>
        {/* Stats */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px"}}>
          {[
            { icon: "🚢", label: "Active Shipments", value: "847", color: "#3b82f6" },
            { icon: "✅", label: "Delivered This Week", value: "234", color: "#10b981" },
            { icon: "⏱️", label: "Avg Transit Time", value: "5.2 days", color: "#f59e0b" },
            { icon: "🌍", label: "Countries Served", value: "47", color: "#8b5cf6" },
            { icon: "⚠️", label: "Delayed Shipments", value: "12", color: "#ef4444" }
          ].map((stat, i) => (
            <div key={i} style={{background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: `2px solid ${stat.color}20`}}>
              <div style={{fontSize: "32px", marginBottom: "10px"}}>{stat.icon}</div>
              <div style={{fontSize: "28px", fontWeight: "bold", color: stat.color, marginBottom: "8px"}}>{stat.value}</div>
              <div style={{fontSize: "13px", color: "#6b7280", textTransform: "uppercase"}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Active Shipments */}
        <h2 style={{fontSize: "28px", fontWeight: "bold", color: "#065f46", marginBottom: "25px"}}>Active Shipments</h2>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))", gap: "25px"}}>
          {shipments.map((shipment, i) => (
            <div key={i} style={{background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: `2px solid ${shipment.color}40`, transition: "all 0.3s", cursor: "pointer"}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = shipment.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = shipment.color + "40";
              }}
            >
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                <h3 style={{fontSize: "20px", fontWeight: "bold", color: "#065f46"}}>{shipment.id}</h3>
                <span style={{padding: "6px 14px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", background: `${shipment.color}20`, color: shipment.color}}>{shipment.status}</span>
              </div>

              <div style={{marginBottom: "20px"}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                  <span style={{color: "#6b7280", fontSize: "14px"}}>📍 Origin:</span>
                  <span style={{fontWeight: "bold", color: "#065f46"}}>{shipment.origin}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                  <span style={{color: "#6b7280", fontSize: "14px"}}>🎯 Destination:</span>
                  <span style={{fontWeight: "bold", color: "#065f46"}}>{shipment.destination}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                  <span style={{color: "#6b7280", fontSize: "14px"}}>📦 Product:</span>
                  <span style={{fontWeight: "bold", color: "#065f46"}}>{shipment.product}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                  <span style={{color: "#6b7280", fontSize: "14px"}}>⚖️ Weight:</span>
                  <span style={{fontWeight: "bold", color: "#065f46"}}>{shipment.weight}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <span style={{color: "#6b7280", fontSize: "14px"}}>🕐 ETA:</span>
                  <span style={{fontWeight: "bold", color: "#065f46"}}>{shipment.eta}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
                  <span style={{fontSize: "13px", fontWeight: "bold", color: "#6b7280"}}>Progress</span>
                  <span style={{fontSize: "13px", fontWeight: "bold", color: shipment.color}}>{shipment.progress}%</span>
                </div>
                <div style={{width: "100%", height: "12px", background: "#e5e7eb", borderRadius: "6px", overflow: "hidden"}}>
                  <div style={{width: `${shipment.progress}%`, height: "100%", background: `linear-gradient(90deg, ${shipment.color} 0%, ${shipment.color}dd 100%)`, borderRadius: "6px", transition: "width 0.5s ease"}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
