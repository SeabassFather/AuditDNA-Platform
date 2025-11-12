import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  return (
    <div style={{minHeight: "100vh", background: "linear-gradient(135deg, #d1fae5 0%, #e5e7eb 50%, #fef9c3 100%)", padding: "40px"}}>
      <button onClick={() => navigate("/")} style={{background: "#06b6d4", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginBottom: "30px"}}>← Back</button>
      <h1 style={{fontSize: "36px", fontWeight: "bold", color: "#065f46"}}>👤 User Profile</h1>
      <div style={{textAlign: "center", marginTop: "40px"}}>
        <div style={{width: "120px", height: "120px", borderRadius: "50%", background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", color: "white", fontWeight: "bold"}}>SF</div>
        <h2 style={{fontSize: "24px", fontWeight: "bold", color: "#065f46"}}>SeabassFather</h2>
      </div>
    </div>
  );
}
