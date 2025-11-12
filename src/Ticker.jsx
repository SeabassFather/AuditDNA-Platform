import React, { useEffect, useState } from "react";

export default function Ticker({ label, endpoint }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!endpoint) return; // Skip if no endpoint configured
    
    let id = setInterval(async () => {
      try {
        const r = await fetch(endpoint);
        const j = await r.json();
        setData(j.slice(0, 5)); // show latest 5 entries
      } catch (e) {
        console.error("Ticker error", e);
      }
    }, 3000);
    return () => clearInterval(id);
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-title">{label} Ticker</div>
      {!endpoint ? (
        <div className="empty">Endpoint not configured</div>
      ) : data.length === 0 ? (
        <div className="empty">Loading...</div>
      ) : (
        <ul>
          {data.map((row, i) => (
            <li key={i} className="subtext">
              {JSON.stringify(row)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
