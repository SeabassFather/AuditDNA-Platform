import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InventoryDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const products = [
    { id: "AVO-001", name: "Frozen Avocado Chunks 25kg", stock: 847, location: "Warehouse A", status: "In Stock", temp: "-18°C", color: "#10b981" },
    { id: "AVO-002", name: "Frozen Guacamole 10kg", stock: 456, location: "Warehouse B", status: "In Stock", temp: "-20°C", color: "#10b981" },
    { id: "AVO-003", name: "IQF Avocado Slices 15kg", stock: 234, location: "Warehouse A", status: "In Stock", temp: "-35°C", color: "#10b981" },
    { id: "AVO-004", name: "Avocado Puree 20kg", stock: 89, location: "Warehouse C", status: "Low Stock", temp: "-18°C", color: "#f59e0b" },
    { id: "AVO-005", name: "Organic Avocado Chunks 25kg", stock: 12, location: "Warehouse B", status: "Critical", temp: "-18°C", color: "#ef4444" },
    { id: "AVO-006", name: "Premium Guacamole 5kg", stock: 678, location: "Warehouse A", status: "In Stock", temp: "-20°C", color: "#10b981" }
  ];

  return (
    <div style={{minHeight: "100vh", background: "linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)"}}>
      <div style={{background: "linear-gradient(135deg, #84cc16 0%, #a3e635 100%)", padding: "30px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)"}}>
        <div style={{maxWidth: "1800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>
            <h1 style={{fontSize: "36px", fontWeight: "bold", color: "#ffffff", margin: 0}}>📦 Inventory Management</h1>
            <p style={{color: "rgba(255,255,255,0.9)", fontSize: "16px", marginTop: "8px"}}>Real-time Stock Tracking • Multi-warehouse • Cold Chain Monitoring</p>
          </div>
          <button onClick={() => navigate("/")} style={{background: "rgba(255,255,255,0.2)", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold"}}>← Back</button>
        </div>
      </div>

      <div style={{maxWidth: "1800px", margin: "0 auto", padding: "40px"}}>
        {/* Stats */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px"}}>
          {[
            { icon: "📦", label: "Total Products", value: "2,456", color: "#10b981" },
            { icon: "🏢", label: "Warehouses", value: "12", color: "#3b82f6" },
            { icon: "⚠️", label: "Low Stock Items", value: "23", color: "#f59e0b" },
            { icon: "❄️", label: "Cold Chain Compliance", value: "99.8%", color: "#06b6d4" },
            { icon: "📊", label: "Total Stock Value", value: "$8.4M", color: "#8b5cf6" },
            { icon: "🚚", label: "Outbound Today", value: "156", color: "#ec4899" }
          ].map((stat, i) => (
            <div key={i} style={{background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: `2px solid ${stat.color}20`}}>
              <div style={{fontSize: "36px", marginBottom: "12px"}}>{stat.icon}</div>
              <div style={{fontSize: "32px", fontWeight: "bold", color: stat.color, marginBottom: "8px"}}>{stat.value}</div>
              <div style={{fontSize: "13px", color: "#6b7280", textTransform: "uppercase"}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Product Inventory */}
        <h2 style={{fontSize: "28px", fontWeight: "bold", color: "#065f46", marginBottom: "25px"}}>Product Inventory</h2>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", gap: "20px"}}>
          {products.map((product, i) => (
            <div key={i} style={{background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: `2px solid ${product.color}40`, transition: "all 0.3s", cursor: "pointer"}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = product.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = product.color + "40";
              }}
            >
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "15px"}}>
                <h3 style={{fontSize: "18px", fontWeight: "bold", color: "#065f46"}}>{product.name}</h3>
                <span style={{padding: "4px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", background: `${product.color}20`, color: product.color}}>{product.status}</span>
              </div>
              <div style={{fontSize: "13px", color: "#6b7280", marginBottom: "15px"}}>ID: {product.id}</div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px"}}>
                <div>
                  <div style={{fontSize: "11px", color: "#6b7280", textTransform: "uppercase", marginBottom: "4px"}}>Stock Level</div>
                  <div style={{fontSize: "24px", fontWeight: "bold", color: product.color}}>{product.stock}</div>
                </div>
                <div>
                  <div style={{fontSize: "11px", color: "#6b7280", textTransform: "uppercase", marginBottom: "4px"}}>Location</div>
                  <div style={{fontSize: "14px", fontWeight: "bold", color: "#065f46"}}>{product.location}</div>
                </div>
                <div>
                  <div style={{fontSize: "11px", color: "#6b7280", textTransform: "uppercase", marginBottom: "4px"}}>Storage Temp</div>
                  <div style={{fontSize: "14px", fontWeight: "bold", color: "#3b82f6"}}>{product.temp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
