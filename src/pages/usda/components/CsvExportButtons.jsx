import React from "react";
import { Download } from "lucide-react";
import { useSelector } from "react-redux";

export default function CsvExportButton({ selector, filename = "auditdna-export.csv", label = "Export CSV" }) {
  const data = useSelector(selector);
  const handleExport = () => {
    if (!data || !data.length) return;
    const cols = Object.keys(data[0]);
    const rows = [cols.join(","), ...data.map(obj => cols.map(k => `"${obj[k]}"`).join(","))];
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };
  return (
    <button
      className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded font-bold shadow hover:from-green-700 hover:to-blue-700"
      onClick={handleExport}
      title="Export CSV file"
    >
      <Download className="w-4 h-4 mr-2" /> {label}
    </button>
  );
}
