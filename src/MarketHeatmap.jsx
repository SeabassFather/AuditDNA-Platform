import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

// Demo weekly price movement: each entry = { date, value }
const heatmapData = [
  { date: "2025-09-27", value: 30 },
  { date: "2025-09-28", value: 34 },
  { date: "2025-09-29", value: 31 },
  { date: "2025-09-30", value: 33 },
  { date: "2025-10-01", value: 28 },
  // ...and so on for a month or more!
];

export default function MarketHeatmap() {
  return (
    <div className="bg-white rounded-xl shadow p-6 my-8">
      <h3 className="text-lg font-bold text-cyan-500 mb-2">Calendar Analytics â€“ Price Heatmap</h3>
      <CalendarHeatmap
        startDate={new Date("2025-09-27")}
        endDate={new Date("2025-10-22")}
        values={heatmapData}
        classForValue={val =>
          !val ? "color-empty" : val.value < 30 ? "color-scale-1" : val.value < 33 ? "color-scale-2" : "color-scale-3"
        }
        showWeekdayLabels={true}
      />
      <style>{`
        .color-empty { fill: #e5e7eb; }
        .color-scale-1 { fill: #bae6fd; }
        .color-scale-2 { fill: #38bdf8; }
        .color-scale-3 { fill: #0ea5e9; }
      `}</style>
    </div>
  );
}
