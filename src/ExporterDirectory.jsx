import React from "react";
export default function ExporterDirectory({ data }) {
  return (
    <div className="bg-slate-800/70 p-6 rounded-xl">
      <h2 className="text-teal-400 font-bold mb-4">ðŸ­ Exporters by Country</h2>
      <table className="w-full text-left text-slate-300">
        <thead>
          <tr>
            <th>Country</th><th>Exporters</th><th>Ports</th><th>Certifications</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.country}</td>
              <td>{row.exporters}</td>
              <td>{row.mainPorts?.join(", ")}</td>
              <td>{row.certifications?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
