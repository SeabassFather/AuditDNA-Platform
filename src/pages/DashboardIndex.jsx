import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Leaf, ShieldCheck, Droplets, Globe, Coins, Truck, FileSearch } from "lucide-react";

export default function DashboardIndex() {
  const modules = [
    {
      id: "produce",
      title: "Produce Intelligence / Inteligencia de Productos",
      desc: "Market prices, volumes, and analytics for global produce flows.",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      path: "/produce",
      color: "from-green-100 to-green-50 hover:from-green-200"
    },
    {
      id: "market",
      title: "Global Market & Trade / Mercado Global y Comercio",
      desc: "Regional, export, and import analytics from Mexico, Central & South America.",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      path: "/market",
      color: "from-blue-100 to-blue-50 hover:from-blue-200"
    },
    {
      id: "finance",
      title: "Trade Finance / Financiamiento Comercial",
      desc: "Factoring, PO financing, and cross-border financial tools.",
      icon: <Coins className="w-6 h-6 text-yellow-600" />,
      path: "/market/finance",
      color: "from-yellow-100 to-yellow-50 hover:from-yellow-200"
    },
    {
      id: "tariffs",
      title: "Tariffs & Customs / Aranceles y Aduanas",
      desc: "Real-time tariff reference, compliance, and customs cost overview.",
      icon: <FileSearch className="w-6 h-6 text-amber-600" />,
      path: "/market/tariffs",
      color: "from-amber-100 to-amber-50 hover:from-amber-200"
    },
    {
      id: "mexicoops",
      title: "Mexico Operations / Operaciones en MÃ©xico",
      desc: "Port of entry data, shipping routes, and distributor networks.",
      icon: <Truck className="w-6 h-6 text-red-600" />,
      path: "/market/ops",
      color: "from-red-100 to-red-50 hover:from-red-200"
    },
    {
      id: "traceability",
      title: "Traceability AI / Trazabilidad con IA",
      desc: "AI-powered analysis of lab results, quality, and compliance improvements.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      path: "/traceability",
      color: "from-emerald-100 to-emerald-50 hover:from-emerald-200"
    },
    {
      id: "watertech",
      title: "WaterTech / TecnologÃ­a del Agua",
      desc: "Water & soil analysis, microbial tests, and conditioning systems.",
      icon: <Droplets className="w-6 h-6 text-cyan-600" />,
      path: "/watertech",
      color: "from-cyan-100 to-cyan-50 hover:from-cyan-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-green-50 text-gray-800">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-3xl font-extrabold text-green-700 drop-shadow">
          AuditDNA Produce & Market Intelligence
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Latin America | Central & South America | Mexico | Global Market Insight
        </p>
      </header>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16 max-w-7xl mx-auto">
        {modules.map((m) => (
          <Link
            key={m.id}
            to={m.path}
            className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${m.color} border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1 backdrop-blur`}
          >
            <div className="flex items-center space-x-3 mb-3">
              {m.icon}
              <h2 className="font-semibold text-lg text-gray-800">{m.title}</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-200 bg-gray-50">
        Â© {new Date().getFullYear()} AuditDNA Produce & Market Intelligence.  
        All Rights Reserved | Todos los Derechos Reservados.
      </footer>
    </div>
  );
}

