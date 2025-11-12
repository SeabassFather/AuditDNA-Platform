import React, { useState, useEffect } from "react";
import { uploadDoc, fetchReports } from "../lib/api";

export default function Uploads() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports().then(setDocs).catch(console.error);
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const res = await uploadDoc(file);
    setDocs((prev) => [...prev, res]);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Document Uploads</h1>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      <ul>
        {docs.map((d, i) => (
          <li key={i}>
            {d.name} Ã¢â‚¬â€œ {d.status || "Ã¢ÂÂ³ Pending"}
            {d.name} ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ {d.status || "ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒâ€šÃ‚Â³ Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}




