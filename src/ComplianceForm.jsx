import React, { useState } from "react";
export default function ComplianceForm() {
  const [docs, setDocs] = useState(null);
  const handleUpload = () => {/* API call to backend */};
  return (
    <div style={{background:"#fff",padding:"2rem",borderRadius:"1rem",maxWidth:"600px",margin:"2rem auto"}}>
      <h2>Compliance Document Upload</h2>
      <input type="file" multiple onChange={e=>setDocs(e.target.files)} />
      <button style={{marginTop:"18px",background:"#10b981",color:"#fff",padding:"10px 30px",borderRadius:"8px"}} onClick={handleUpload}>Upload Docs</button>
    </div>
  );
}
