import React from "react";
import { Link, useLocation } from "react-router-dom";

// Demo avatar, replace with user image as needed
const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: "ðŸ“Š" },
  { to: "/traceability", label: "Traceability", icon: "ðŸŒ¾" },
  { to: "/usda", label: "USDA", icon: "ðŸ‡ºðŸ‡¸" },
  { to: "/ag-market", label: "Ag Market", icon: "ðŸŒ½" },
  { to: "/water-tech", label: "Water Tech", icon: "ðŸ’§" },
  { to: "/services", label: "Services", icon: "âš™ï¸" },
  { to: "/mortgages", label: "Mortgages", icon: "ðŸ " },
  { to: "/compliance", label: "Compliance", icon: "âœ…" },
  { to: "/trade", label: "Trade", icon: "ðŸŒ" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        height: 72,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 900, fontSize: 28, color: "#fff" }}>
            ðŸ§¬ AuditDNA
          </span>
        </Link>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontWeight: 600,
              fontSize: 15,
              color: "#fff",
              textDecoration: "none",
              background: location.pathname === link.to
                ? "rgba(255,255,255,0.2)"
                : "transparent",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              border: location.pathname === link.to
                ? "2px solid rgba(255,255,255,0.4)"
                : "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== link.to) {
                e.target.style.background = "rgba(255,255,255,0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== link.to) {
                e.target.style.background = "transparent";
              }
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
        <span
          title="Notifications"
          style={{
            fontSize: 22,
            color: "#fff",
            marginLeft: 12,
            marginRight: 6,
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          ðŸ›Žï¸
        </span>
        <div
          style={{
            marginLeft: 16,
            width: 42,
            height: 42,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(255,255,255,0.8)",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          title="Profile"
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          <img
            src={avatarUrl}
            alt="profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </nav>
  );
}
