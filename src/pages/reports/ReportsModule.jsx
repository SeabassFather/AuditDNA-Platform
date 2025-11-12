import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReportsModule() {
  const navigate = useNavigate();
  return (
    <div style={{minHeight: "100vh", background: "linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)", padding: "40px"}}>
      <button onClick={() => navigate("/")} style={{background: "#059669", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginBottom: "30px"}}>← Back</button>
      <h1 style={{fontSize: "36px", fontWeight: "bold", color: "#065f46"}}>📄 Reports Center</h1>
    </div>
  );
}
