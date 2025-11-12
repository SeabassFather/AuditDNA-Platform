import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navStyle = ({ isActive }) =>
    isActive
      ? "px-4 py-2 rounded bg-blue-200 text-blue-900 font-semibold"
      : "px-4 py-2 rounded text-gray-700 hover:bg-gray-100";
  return (
    <header className="border-b bg-white/90 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-blue-900">AuditDNA</div>
        <nav className="flex gap-2">
          <NavLink to="/" end className={navStyle}>
            Home
          </NavLink>
          <NavLink to="/mortgages" className={navStyle}>
            Mortgages
          </NavLink>
          <NavLink to="/ag-market" className={navStyle}>
            Ag Market
          </NavLink>
          <NavLink to="/trade-finance" className={navStyle}>
            Trade Finance
          </NavLink>
          <NavLink to="/tickers" className={navStyle}>
            Tickers
          </NavLink>
          <NavLink to="/auditdna" className={navStyle}>
            AuditDNA
          </NavLink>
          <NavLink to="/compliance" className={navStyle}>
            Compliance
          </NavLink>
          {isLoggedIn ? (
            <button onClick={logout} className="ml-4 text-red-600 font-bold">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={navStyle}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  ChevronDown, Search, Bell, User, Menu, X, Home, DollarSign, 
  Building, Leaf, Database, Droplet, FileSearch, Shield, Settings,
  TrendingUp, Globe, Calculator, FileText, Briefcase, BarChart3
} from "lucide-react";

export default function MegaNavbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const currentUser = {
    name: "SeabassFather",
    email: "seabass@auditdna.com",
    avatar: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦Ãƒâ€¹Ã¢â‚¬Â ",
    role: "Super Admin"
  };

  const notifications = [
    { id: 1, text: "New USDA pricing data available", time: "5 min ago", unread: true },
    { id: 2, text: "Mexico loan application approved", time: "1 hour ago", unread: true },
    { id: 3, text: "Water quality report uploaded", time: "2 hours ago", unread: false },
    { id: 4, text: "Trade finance deal closed - $2.5M", time: "3 hours ago", unread: false }
  ];

  const megaMenus = {
    financial: {
      label: "Financial Services",
      icon: DollarSign,
      sections: [
        {
          title: "Factoring & Lending",
          links: [
            { to: "/factoring", label: "Invoice Factoring", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â°" },
            { to: "/financial", label: "Financial Suite", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Âµ" },
            { to: "/trade-finance", label: "Trade Finance", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â" },
            { to: "/lender-match", label: "Lender Matching", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¤Ãƒâ€šÃ‚Â" }
          ]
        },
        {
          title: "Mexico Finance",
          links: [
            { to: "/mexico-finance", label: "Mexico Finance Hub", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡Ãƒâ€šÃ‚Â²ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡Ãƒâ€šÃ‚Â½" },
            { to: "/mexico-loans", label: "Mexico Loans", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€šÃ‚Â¦" },
            { to: "/mexico-refi", label: "Refinancing", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã‚Â " }
          ]
        },
        {
          title: "Trade & Capital",
          links: [
            { to: "/trade-finance/search", label: "Trade Search", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â" },
            { to: "/lending-options", label: "Lending Options", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â³" },
            { to: "/loan-match", label: "Loan Calculator", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â®" }
          ]
        }
      ]
    },
    realEstate: {
      label: "Real Estate & Mortgage",
      icon: Building,
      sections: [
        {
          title: "US Mortgage",
          links: [
            { to: "/mortgage", label: "Mortgage Hub", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€šÃ‚Â " },
            { to: "/us-mortgage", label: "US Mortgage Loans", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡Ãƒâ€šÃ‚Â¸" },
            { to: "/mortgage/us", label: "US Mortgage Search", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€¦Ã‚Â½" },
            { to: "/mortgage/search", label: "Mortgage Calculator", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â®" }
          ]
        },
        {
          title: "Mexico Real Estate",
          links: [
            { to: "/mortgage/mexico", label: "Mexico Mortgage", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡Ãƒâ€šÃ‚Â²ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡Ãƒâ€šÃ‚Â½" },
            { to: "/mortgage/real-estate", label: "Real Estate Portal", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€¹Ã…â€œÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" },
            { to: "/property/search", label: "Property Search", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€šÃ‚Â¡" }
          ]
        },
        {
          title: "Agent Tools",
          links: [
            { to: "/real-estate/agent", label: "Agent Dashboard", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â" },
            { to: "/real-estate/register", label: "Agent Registration", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€šÃ‚Â" },
            { to: "/title-search", label: "Title Search", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã¢â‚¬Å“" },
            { to: "/escrow", label: "Escrow Services", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢" }
          ]
        }
      ]
    },
    agriculture: {
      label: "Agriculture & Produce",
      icon: Leaf,
      sections: [
        {
          title: "Agriculture Hub",
          links: [
            { to: "/agriculture", label: "Ag Main Hub", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â¾" },
            { to: "/ag-marketplace", label: "Ag Marketplace", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢" },
            { to: "/ag-explorer", label: "Ag Explorer", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬ÂÃƒâ€šÃ‚ÂºÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" },
            { to: "/ag-main", label: "Ag Main Page", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â¡Ãƒâ€¦Ã¢â‚¬Å“" }
          ]
        },
        {
          title: "Produce Markets",
          links: [
            { to: "/market", label: "Market Overview", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã‚Â " },
            { to: "/market-prices", label: "Live Pricing", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â¹" },
            { to: "/produce-prices", label: "Produce Pricing", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“" },
            { to: "/produce-trends", label: "Market Trends", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¹Ã¢â‚¬Â " }
          ]
        },
        {
          title: "Specialty Products",
          links: [
            { to: "/avocado-guacamole", label: "Avocado & Guacamole", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“" },
            { to: "/produce-inquiry", label: "Product Inquiry", icon: "ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ" },
            { to: "/produce-market-pie", label: "Market Analytics", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥Ãƒâ€šÃ‚Â§" }
          ]
        }
      ]
    },
    usda: {
      label: "USDA & Data",
      icon: Database,
      sections: [
        {
          title: "USDA Intelligence",
          links: [
            { to: "/usda", label: "USDA Hub", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â½" },
            { to: "/usda/marketplace", label: "USDA Marketplace", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€šÃ‚Âª" },
            { to: "/usda/search", label: "USDA Search", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â" },
            { to: "/usda/grower-search", label: "Grower Database", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â¨ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â¾" }
          ]
        },
        {
          title: "Organic & Specialty",
          links: [
            { to: "/usda/organic", label: "Organic Products", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±" },
            { to: "/produce-trends-all", label: "All Produce Trends", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã‚Â " }
          ]
        }
      ]
    },
    water: {
      label: "Water Technology",
      icon: Droplet,
      sections: [
        {
          title: "Water & Traceability",
          links: [
            { to: "/water", label: "Water Tech Hub", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§" },
            { to: "/traceability", label: "Traceability Module", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬" },
            { to: "/water-tech", label: "Water Technology", icon: "ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬ÂÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" },
            { to: "/water-tech/uploads", label: "Lab Uploads", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€šÃ‚Â¤" }
          ]
        }
      ]
    },
    search: {
      label: "Search & Verification",
      icon: FileSearch,
      sections: [
        {
          title: "Search Engines",
          links: [
            { to: "/search", label: "Universal Search", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â" },
            { to: "/search-engines", label: "Search Engines Hub", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€¦Ã‚Â½" },
            { to: "/scanner", label: "Document Scanner", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾" },
            { to: "/facial-recognition", label: "Facial Recognition", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â¤" }
          ]
        },
        {
          title: "Verification",
          links: [
            { to: "/five-verification", label: "5 Verification Engines", icon: "ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦" }
          ]
        }
      ]
    },
    compliance: {
      label: "Audit & Compliance",
      icon: Shield,
      sections: [
        {
          title: "Audit Services",
          links: [
            { to: "/audit", label: "Audit Hub", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â" },
            { to: "/audit/catalog", label: "Audit Catalog", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã‚Â¡" },
            { to: "/audit/report", label: "Audit Reports", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã‚Â " },
            { to: "/audit/service-catalog", label: "Service Catalog", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" }
          ]
        },
        {
          title: "Compliance",
          links: [
            { to: "/compliance", label: "Compliance Hub", icon: "ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦" },
            { to: "/compliance/dashboard", label: "Compliance Dashboard", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¹Ã¢â‚¬Â " },
            { to: "/compliance/page", label: "Compliance Portal", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" }
          ]
        }
      ]
    },
    services: {
      label: "Services & Tools",
      icon: Briefcase,
      sections: [
        {
          title: "Service Catalog",
          links: [
            { to: "/services", label: "All Services", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" },
            { to: "/services/explorer", label: "Service Explorer", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬ÂÃƒâ€šÃ‚ÂºÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" },
            { to: "/services/catalog", label: "Catalog", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“" },
            { to: "/consumer-services", label: "Consumer Services", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" }
          ]
        },
        {
          title: "Documents",
          links: [
            { to: "/files", label: "File Manager", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€šÃ‚Â" },
            { to: "/upload", label: "Upload Center", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€šÃ‚Â¤" },
            { to: "/docusign", label: "DocuSign", icon: "ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â" },
            { to: "/cases", label: "Cases", icon: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹" }
          ]
        }
      ]
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-2xl">
        <div className="max-w-[1920px] mx-auto">
          {/* Top Bar */}
          <div className="border-b border-white/10 px-6 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-300">ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€šÃ‚Â Global Platform</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-400 font-semibold">ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ All Systems Operational</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <span>ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â Multi-Region</span>
              <span>|</span>
              <span>ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã‚Â¾ 24/7 Support</span>
              <span>|</span>
              <span className="font-mono text-blue-300">UTC: 2025-10-26 20:14:52</span>
            </div>
          </div>

          {/* Main Nav */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="text-4xl group-hover:scale-110 transition-transform">ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â¬</div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    AuditDNA
                  </div>
                  <div className="text-xs text-gray-400">Elite Platform v3.0</div>
                </div>
              </NavLink>

              {/* Desktop Menu */}
              <nav className="hidden xl:flex items-center gap-1">
                {/* Home */}
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Home size={18} />
                  Dashboard
                </NavLink>

                {/* Mega Menu Dropdowns */}
                {Object.entries(megaMenus).map(([key, menu]) => {
                  const Icon = menu.icon;
                  return (
                    <div key={key} className="relative">
                      <button
                        onClick={() => toggleDropdown(key)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                          activeDropdown === key
                            ? 'bg-white/20 text-white'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon size={18} />
                        {menu.label}
                        <ChevronDown size={16} className={`transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mega Dropdown */}
                      {activeDropdown === key && (
                        <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 min-w-[600px] p-6 z-50">
                          <div className="grid grid-cols-3 gap-6">
                            {menu.sections.map((section, idx) => (
                              <div key={idx}>
                                <h3 className="font-bold text-sm text-gray-500 uppercase mb-3">{section.title}</h3>
                                <div className="space-y-2">
                                  {section.links.map((link, linkIdx) => (
                                    <NavLink
                                      key={linkIdx}
                                      to={link.to}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                                    >
                                      <span className="text-xl">{link.icon}</span>
                                      <span className="text-sm font-medium group-hover:text-blue-600">{link.label}</span>
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Right Side */}
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-white/10 rounded-lg px-4 py-2 border border-white/20">
                  <Search size={18} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search modules, services..."
                    className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-64"
                  />
                </form>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all relative"
                  >
                    <Bell size={22} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-bold text-lg">Notifications</h3>
                        <p className="text-sm text-gray-500">You have {notifications.filter(n => n.unread).length} unread</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-blue-50' : ''}`}>
                            <div className="flex items-start gap-3">
                              {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                              <div className="flex-1">
                                <p className="text-sm font-medium">{notif.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-gray-200">
                        <NavLink to="/notifications" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                          View All Notifications
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div className="text-2xl">{currentUser.avatar}</div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-semibold">{currentUser.name}</div>
                      <div className="text-xs text-gray-400">{currentUser.role}</div>
                    </div>
                    <ChevronDown size={16} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{currentUser.avatar}</div>
                          <div>
                            <div className="font-bold">{currentUser.name}</div>
                            <div className="text-sm text-gray-500">{currentUser.email}</div>
                            <div className="text-xs text-blue-600 font-semibold">{currentUser.role}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <NavLink to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                          <Home size={18} />
                          <span className="text-sm font-medium">Dashboard</span>
                        </NavLink>
                        <NavLink to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                          <Settings size={18} />
                          <span className="text-sm font-medium">Settings</span>
                        </NavLink>
                        <NavLink to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                          <Shield size={18} />
                          <span className="text-sm font-medium">Admin Panel</span>
                        </NavLink>
                      </div>
                      <div className="p-2 border-t border-gray-200">
                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold">
                          <span>ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â¡Ãƒâ€šÃ‚Âª</span>
                          <span className="text-sm">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="xl:hidden p-2 rounded-lg hover:bg-white/10"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[140px] bg-gray-900/95 backdrop-blur-lg z-40 overflow-y-auto">
          <div className="p-6 space-y-4">
            <NavLink to="/dashboard" className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 font-semibold">
              ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€šÃ‚Â  Dashboard
            </NavLink>
            {Object.entries(megaMenus).map(([key, menu]) => (
              <div key={key} className="space-y-2">
                <div className="px-4 py-2 font-bold text-blue-400">{menu.label}</div>
                {menu.sections.map((section, idx) => (
                  <div key={idx} className="ml-4 space-y-1">
                    <div className="text-sm text-gray-400 font-semibold">{section.title}</div>
                    {section.links.map((link, linkIdx) => (
                      <NavLink
                        key={linkIdx}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg hover:bg-white/10 text-sm"
                      >
                        {link.icon} {link.label}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdowns */}
      {(activeDropdown || showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setActiveDropdown(null);
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </>
  );
}

