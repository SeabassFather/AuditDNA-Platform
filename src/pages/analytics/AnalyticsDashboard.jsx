import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [liveData, setLiveData] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev + Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)", padding: "40px"}}>
      <button onClick={() => navigate("/")} style={{background: "#a855f7", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginBottom: "30px"}}>← Back</button>
      <h1 style={{fontSize: "36px", fontWeight: "bold", color: "#ffffff", marginBottom: "20px"}}>📈 Analytics Dashboard</h1>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px"}}>
        <div style={{background: "#1e293b", padding: "25px", borderRadius: "12px", border: "2px solid #a855f740"}}>
          <div style={{fontSize: "32px", marginBottom: "10px"}}>⚡</div>
          <div style={{fontSize: "32px", fontWeight: "bold", color: "#a855f7"}}>{liveData}</div>
          <div style={{fontSize: "13px", color: "#94a3b8"}}>LIVE EVENTS</div>
        </div>
      </div>
    </div>
  );
}
