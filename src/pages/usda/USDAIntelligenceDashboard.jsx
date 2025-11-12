"use client";
import { use, useState, useEffect, useTransition } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/*  🌾  USDA Intelligence Dashboard  — React 22 Edition
    ----------------------------------------------------
    •  Concurrent-safe with useTransition()
    •  Suspense-ready; streaming-friendly
    •  Works with your Metallic Light UI / Tailwind 3+
    ---------------------------------------------------- */

export default function USDAIntelligenceDashboard() {
  const [commodity, setCommodity] = useState("avocado");
  const [region, setRegion] = useState("All");
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const commodities = [
    "avocado",
    "strawberry",
    "tomato",
    "blueberry",
    "lettuce",
  ];

  async function loadData(item) {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/usda/data/${item}`
      );
      setData(res.data ?? []);
      setError("");
    } catch (e) {
      console.error(e);
      setError("⚠️ Unable to reach USDA data service.");
    }
  }

  useEffect(() => {
    startTransition(() => loadData(commodity));
  }, [commodity]);

  const filtered =
    region === "All" ? data : data.filter((d) => d.region === region);
  const regionList = ["All", ...new Set(data.map((d) => d.region).filter(Boolean))];
  const colors = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#10b981",
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-8 font-[Inter]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-green-700">
            USDA Intelligence Dashboard
          </h1>
          <p className="text-gray-600">
            Historical + regional market analytics (AMS / NASS feeds)
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="border border-green-300 rounded-xl p-2 shadow-sm focus:ring focus:ring-green-200"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          >
            {commodities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            className="border border-green-300 rounded-xl p-2 shadow-sm focus:ring focus:ring-green-200"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regionList.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
            onClick={() => startTransition(() => loadData(commodity))}
          >
            {isPending ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* Feedback */}
        {isPending && (
          <p className="text-gray-500 italic">Fetching USDA records…</p>
        )}
        {error && <p className="text-red-600">{error}</p>}

        {/* Chart */}
        {!isPending && filtered.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              {commodity.toUpperCase()} — 5 Year Price Trend
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filtered}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="priceAvg"
                  tickFormatter={(v) => `$${v}`}
                  width={80}
                />
                <Tooltip
                  formatter={(v, n) =>
                    n === "priceAvg" ? [`$${v}`, "Avg Price"] : v
                  }
                />
                <Legend />
                {region === "All"
                  ? [...new Set(filtered.map((d) => d.region))].map((r, i) => (
                      <Line
                        key={r}
                        type="monotone"
                        dataKey="priceAvg"
                        data={filtered.filter((f) => f.region === r)}
                        stroke={colors[i % colors.length]}
                        name={r}
                        dot={false}
                      />
                    ))
                  : (
                      <Line
                        type="monotone"
                        dataKey="priceAvg"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={false}
                      />
                    )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Data Table */}
        {!isPending && filtered.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Region</th>
                  <th className="py-2 px-4 text-left">Variety</th>
                  <th className="py-2 px-4 text-left">Avg $</th>
                  <th className="py-2 px-4 text-left">High $</th>
                  <th className="py-2 px-4 text-left">Low $</th>
                  <th className="py-2 px-4 text-left">Volume</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(-50).map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-gray-50 hover:bg-green-50"
                        : "bg-white hover:bg-green-50"
                    }
                  >
                    <td className="py-2 px-4">{row.date}</td>
                    <td className="py-2 px-4">{row.region}</td>
                    <td className="py-2 px-4">{row.variety}</td>
                    <td className="py-2 px-4 text-green-700 font-semibold">
                      ${row.priceAvg?.toFixed(2)}
                    </td>
                    <td className="py-2 px-4">${row.priceHigh}</td>
                    <td className="py-2 px-4">${row.priceLow}</td>
                    <td className="py-2 px-4">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isPending && filtered.length === 0 && !error && (
          <p className="text-gray-500 italic">
            No records for this commodity.
          </p>
        )}
      </div>
    </section>
  );
}
