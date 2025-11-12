import React, { useEffect, useState } from 'react';
export default function CertificationTracker() {
  // Fetch curated certification registry from backend or local data
  const [certs, setCerts] = useState([]);
  useEffect(() => {
    fetch("/api/latin/certifications")
      .then(res => res.json())
      .then(setCerts);
  }, []);
  return (
    <div className="bg-slate-800/70 p-6 rounded-xl">
      <h2 className="text-teal-400 font-bold mb-4">ðŸ§¾ Certification Tracker</h2>
      <ul>
        {certs.map((c,i) => (
          <li key={i} className="mb-2">
            <b>{c.exporter}:</b> {c.certType}, Valid Until: {c.validUntil?.slice(0,10)}
          </li>
        ))}
      </ul>
    </div>
  );
}
