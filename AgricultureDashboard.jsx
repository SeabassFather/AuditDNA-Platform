import React from "react";
import FileUpload from "./FileUpload";

export default function AgricultureDashboard() {
  return (
    <div className="p-8">
      {/* Section 1: Headline */}
      <div className="text-3xl font-bold mb-6">Agriculture & Analytics Dashboard</div>
      
      {/* Section 2: Analytics (Coming Soon) */}
      <div className="bg-slate-100 rounded-xl mb-8 p-6 shadow">
        <div className="text-2xl font-bold mb-2">Analytics Module</div>
        <div className="text-lg text-gray-600">Coming Soon!</div>
      </div>

      {/* Section 3: Ag Search Form */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-xl font-bold mb-4">Agriculture Search / Marketplace Match</div>
        <form
          style={{
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: "2.5rem",
            minWidth: 340,
            maxWidth: 900,
            width: "100%",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" }}>
            <div>
              <label>Legal Name</label>
              <input className="input-main" />
              <label>DBA</label>
              <input className="input-main" />
              <label>Country</label>
              <input className="input-main" />
              <label>EIN/RFC</label>
              <input className="input-main" />
              <label>DUNS</label>
              <input className="input-main" />
              <label>Owners List</label>
              <input className="input-main" />
              <label>Years in Biz</label>
              <input className="input-main" />
              <label>Location(s)</label>
              <input className="input-main" />
              <label>Warehouse Option</label>
              <select className="input-main">
                <option>LA Partner</option>
              </select>
            </div>
            <div>
              <label>Certifications</label>
              <FileUpload />
              <label>Products</label>
              <input className="input-main" />
              <label>Crop Type</label>
              <input className="input-main" />
              <label>Variety</label>
              <input className="input-main" />
              <label>Grade/Spec</label>
              <input className="input-main" />
              <label>Harvest Window</label>
              <input className="input-main" />
              <label>Volume (per week/month)</label>
              <input className="input-main" />
              <label>Target Price</label>
              <input className="input-main" />
            </div>
            <div>
              <label>Buyer Name</label>
              <input className="input-main" />
              <label>Buyer Type</label>
              <select className="input-main">
                <option>Retail</option>
                <option>Wholesale</option>
                <option>Chain</option>
              </select>
              <label>PO #</label>
              <input className="input-main" />
              <label>PO Value</label>
              <input className="input-main" />
              <label>Payment Terms</label>
              <input className="input-main" />
              <label>Insurance</label>
              <FileUpload />
              <label>Compliance Docs</label>
              <FileUpload />
            </div>
            <div style={{ gridColumn: "1/4", textAlign: "center", marginTop: "1.5rem" }}>
              <button className="btn-main" type="submit">
                Search / Match
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}