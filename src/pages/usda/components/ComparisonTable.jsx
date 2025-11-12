import React from 'react';
import { useSelector } from 'react-redux';

export default function ComparisonTable({ highlightColumn }) {
  // Pull columns and rows from your analytics/data slice
  const { columns, rows } = useSelector(store => store.priceComparison);

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-xs text-gray-600 font-bold bg-gray-50 border-b">Week</th>
            {columns.map((col, idx) => (
              <th key={col.key} className="px-4 py-2 text-xs text-gray-600 font-bold bg-gray-50 border-b">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              <td className="px-4 py-2 font-bold text-blue-900 border-b bg-blue-50">{row.label}</td>
              {columns.map((col, cIdx) => (
                <td
                  key={col.key}
                  className={`px-4 py-2 border-b text-right font-mono ${
                    col.key === highlightColumn ? "bg-green-100 font-bold text-green-800" : ""
                  }`}
                >
                  {row[col.key] != null ? `$${row[col.key]}` : "--"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
