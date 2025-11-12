// ==========================================
// AUDITDNA - PROFESSIONAL NAVBAR
// MexaUSA Food Group, Inc. | CEO: Saul Garcia
// ==========================================

import React from "react";
import { Link, useLocation } from "react-router-dom";

// Professional avatar (replace with user's actual image)
const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";

const navLinks = [
  { to: "/", label: "Produce", icon: "🥑" },
  { to: "/traceability", label: "Traceability", icon: "🌾" },
  { to: "/usda", label: "USDA", icon: "🇺🇸" },
  { to: "/watertech", label: "Water Tech", icon: "💧" },
  { to: "/supplier", label: "Suppliers", icon: "🏭" },
  { to: "/compliance", label: "Compliance", icon: "✅" },
  { to: "/trade", label: "Trade", icon: "🌎" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        height: "80px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontWeight: 900,
              fontSize: "1.75rem",
              color: "#fff",
              letterSpacing: "-0.5px",
            }}
          >
            🥑 MexaUSA Produce Intelligence
          </span>
        </Link>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#fff",
                textDecoration: "none",
                background: isActive
                  ? "rgba(255,255,255,0.25)"
                  : "transparent",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: isActive
                  ? "2px solid rgba(255,255,255,0.4)"
                  : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}

        {/* Notifications */}
        <button
          title="Notifications"
          style={{
            fontSize: "1.5rem",
            color: "#fff",
            marginLeft: "1rem",
            marginRight: "0.5rem",
            cursor: "pointer",
            transition: "transform 0.2s",
            background: "transparent",
            border: "none",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          🔔
        </button>

        {/* Profile Avatar */}
        <button
          style={{
            marginLeft: "1rem",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(255,255,255,0.9)",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
            padding: 0,
            background: "transparent",
          }}
          title="Profile"
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={avatarUrl}
            alt="Saul Garcia Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </button>
      </div>
    </nav>
  );
}
