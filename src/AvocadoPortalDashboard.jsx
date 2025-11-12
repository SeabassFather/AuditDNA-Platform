import React from "react";
import { useAvocadoIntel } from "./AvocadoIntelligenceContext";
import QRCode from "react-qr-code"; // npm install react-qr-code

export default function AvocadoPortalDashboard() {
  const {
    language, selectedSize, setSelectedSize, SIZES, VARIETIES, PACKS,
    marketStats, growerUploads, offerBoard, traceabilityLots,
  } = useAvocadoIntel();

  // Example rendering for Grower Uploads and Market Analytics
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen p-12">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-green-900 mb-4">ðŸ¥‘ Avocado Intelligence Portal</h1>
        <p className="text-lg text-green-700">All crop, price, season, compliance, and finance infoâ€”QR code ready.</p>
      </header>
      {/* Choose size/pack */}
      <div className="mb-6 flex gap-6 items-center">
        <b className="text-xl">Size:</b>
        {SIZES.map(s => (
          <button 
            key={s}
            className={`px-4 py-2 border rounded ${
              selectedSize===s ? "bg-green-600 text-white border-green-900" : "bg-white text-green-900"
            }`}
            onClick={()=>setSelectedSize(s)}
            data-size={s}
          >{s}</button>
        ))}
      </div>
      {/* Market Stats */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Market Analytics ({selectedSize})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(marketStats[selectedSize]||{}).map(([region, stats]) => (
            <div key={region} className="bg-white rounded-xl p-6 shadow border-green-200 border">
              <b className="block text-green-900 text-xl mb-2">{region}</b>
              <ul className="mb-4 space-y-2">
                <li>Cases: <b>{stats.cases}</b></li>
                <li>Pallets: <b>{stats.pallets}</b></li>
                <li>Containers: <b>{stats.containers}</b></li>
                <li>Avg Price (USD/box): <b>${stats.avgPrice}</b></li>
                <li>Active Offers: <b>{stats.offers}</b></li>
              </ul>
              <b className="block mt-4 text-green-700">Export | Print | PDF | Email | QR</b>
            </div>
          ))}
        </div>
      </section>

      {/* Grower Upload Panel */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Grower Uploads & Season Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {growerUploads.map((grower,i) => (
            <div key={i} className="bg-green-50 border border-green-200 p-6 rounded-xl shadow">
              <b>{grower.grower}: {grower.variety} ({grower.size})</b>
              <div>Region: <b>{grower.region}</b></div>
              <div>Expected Cases: <b>{grower.casesExpected}</b></div>
              <div>Season: <b>{grower.seasonStart} to {grower.seasonEnd}</b></div>
              <div>Certs: <b>{grower.certifications.join(", ")}</b></div>
              <div>Compliance Score: <b className="text-green-700">{grower.complianceScore}</b></div>
              <div>Files: {grower.files.map((file,j)=><a key={j} href={`#${file}`} className="text-blue-700 underline mx-1">{file}</a>)}</div>
              {grower.qrCodeUrl && (
                <div className="my-3">
                  <QRCode value={grower.qrCodeUrl} size={64}/>
                  <span className="ml-2 text-xs text-green-600">Scan QR for crop data</span>
                </div>
              )}
              <div className="mt-3">
                <b>Water Test:</b> {grower.waterTest.result} (EC: {grower.waterTest.ec}, pH: {grower.waterTest.pH})<br/>
                <b>Microbial:</b> {grower.microbialTest.result} (E.Coli: {grower.microbialTest.ecoli})<br/>
                <b className="block mt-1 text-green-700">Food Safety: {grower.foodSafety}</b>
              </div>
              <div className="mt-2 text-right">
                <button className="px-3 py-2 bg-green-700 text-white rounded" onClick={()=>window.print()}>Print</button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded ml-2">Email</button>
                <button className="px-3 py-2 bg-purple-600 text-white rounded ml-2">PDF</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Board, Traceability, Factoring, etc. */}
      {/* Repeat similar structure for other features; context-driven, interactive */}
    </div>
  );
}
