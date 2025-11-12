import React from "react";
import { useNavigate } from "react-router-dom";

export default function SupplierManagement() {
  const navigate = useNavigate();

  const suppliers = [
    { id: "SUP-001", name: "Aguacate Premium México", country: "🇲🇽 Mexico", rating: 4.9, orders: 847, compliance: "100%", color: "#10b981" },
    { id: "SUP-002", name: "Peruvian Avocado Exports", country: "🇵🇪 Peru", rating: 4.8, orders: 456, compliance: "98%", color: "#10b981" },
    { id: "SUP-003", name: "Chilean Fresh Produce", country: "🇨🇱 Chile", rating: 4.7, orders: 678, compliance: "99%", color: "#10b981" },
    { id: "SUP-004", name: "Colombian Agro Solutions", country: "🇨🇴 Colombia", rating: 4.6, orders: 234, compliance: "97%", color: "#f59e0b" },
    { id: "SUP-005", name: "Brazilian Exports Ltd", country: "🇧🇷 Brazil", rating: 4.5, orders: 389, compliance: "96%", color: "#f59e0b" }
  ];

  return (
    <div style={{minHeight: "100vh", background: "linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)"}}>
      <div style={{background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)", padding: "30px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)"}}>
        <div style={{maxWidth: "1600px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>
            <h1 style={{fontSize: "36px", fontWeight: "bold", color: "#ffffff", margin: 0}}>🤝 Supplier Management</h1>
            <p style={{color: "rgba(255,255,255,0.9)", fontSize: "16px", marginTop: "8px"}}>Vendor Relations • Performance Tracking • Compliance Monitoring</p>
          </div>
          <button onClick={() => navigate("/")} style={{background: "rgba(255,255,255,0.2)", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold"}}>← Back</button>
        </div>
      </div>

      <div style={{maxWidth: "1600px", margin: "0 auto", padding: "40px"}}>
        {/* Stats */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px"}}>
          {[
            { icon: "🏢", label: "Active Suppliers", value: "156", color: "#10b981" },
            { icon: "📊", label: "Avg Rating", value: "4.7★", color: "#f59e0b" },
            { icon: "✅", label: "Compliance Rate", value: "98.2%", color: "#3b82f6" },
            { icon: "💰", label: "Total Orders", value: "$24.5M", color: "#8b5cf6" }
          ].map((stat, i) => (
            <div key={i} style={{background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: `2px solid ${stat.color}20`}}>
              <div style={{fontSize: "32px", marginBottom: "10px"}}>{stat.icon}</div>
              <div style={{fontSize: "28px", fontWeight: "bold", color: stat.color, marginBottom: "8px"}}>{stat.value}</div>
              <div style={{fontSize: "13px", color: "#6b7280", textTransform: "uppercase"}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Suppliers */}
        <h2 style={{fontSize: "28px", fontWeight: "bold", color: "#065f46", marginBottom: "25px"}}>Top Suppliers</h2>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", gap: "25px"}}>
          {suppliers.map((supplier, i) => (
            <div key={i} style={{background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: `2px solid ${supplier.color}40`, transition: "all 0.3s", cursor: "pointer"}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = supplier.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = supplier.color + "40";
              }}
            >
              <h3 style={{fontSize: "20px", fontWeight: "bold", color: "#065f46", marginBottom: "12px"}}>{supplier.name}</h3>
              <div style={{fontSize: "14px", color: "#6b7280", marginBottom: "20px"}}>ID: {supplier.id} • {supplier.country}</div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px"}}>
                <div>
                  <div style={{fontSize: "11px", color: "#6b7280", textTransform: "uppercase", marginBottom: "4px"}}>Rating</div>
                  <div style={{fontSize: "20px", fontWeight: "bold", color: "#f59e0b"}}>{supplier.rating}★</div>
                </div>
                <div>
                  <div style={{fontSize: "11px", color: "#6b7280", textTransform: "uppercase", marginBottom: "4px"}}>Orders</div>
                  <div style={{fontSize: "20px", fontWeight: "bold", color: "#065f46"}}>{supplier.orders}</div>
                </div>
                <div>
                  <div style={{fontSize: "11px", color: "#6b7280", textTransform: "uppercase", marginBottom: "4px"}}>Compliance</div>
                  <div style={{fontSize: "20px", fontWeight: "bold", color: supplier.color}}>{supplier.compliance}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
