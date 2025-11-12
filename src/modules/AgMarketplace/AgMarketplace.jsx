import React, { useState, useEffect } from "react";
// NOTE: You may need to adjust import paths for your project structure

const API_BASE = "/api/agmarketplace";
const USDA_API_BASE = "/api/usda";

// UI for a single Offer or Demand
function OfferCard({ offer }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-green-700 text-lg">{offer.commodity || "Commodity"}</span>
        <span className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs">{offer.region}</span>
      </div>
      <div className="flex gap-4 mb-2">
        <span className="text-gray-700">{offer.buyer || offer.seller}</span>
        <span className="text-gray-700">{offer.volume} units</span>
        <span className="font-bold text-blue-700">${offer.price}</span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{offer.createdAt}</span>
        <span>ID: {offer.offerId}</span>
      </div>
    </div>
  );
}

export default function AgMarketplace() {
  // Offers, Demands, Input State
  const [offers, setOffers] = useState([]);
  const [demands, setDemands] = useState([]);
  const [commodity, setCommodity] = useState("");
  const [region, setRegion] = useState("");
  const [filter, setFilter] = useState({ commodity: "", region: "" });

  // Form Inputs
  const [newOffer, setNewOffer] = useState({
    commodity: "",
    price: "",
    volume: "",
    buyer: "",
    region: "",
  });

  // USDA price trends
  const [priceTrends, setPriceTrends] = useState([]);
  const [trendCommodity, setTrendCommodity] = useState("");

  useEffect(() => {
    async function fetchOffers() {
      let url = `${API_BASE}/offers`;
      if (filter.commodity || filter.region) {
        url += `?commodity=${filter.commodity}&region=${filter.region}`;
      }
      const res = await fetch(url);
      setOffers(await res.json());
    }
    fetchOffers();
  }, [filter]);

  useEffect(() => {
    async function fetchDemands() {
      let url = `${API_BASE}/demands`;
      if (filter.commodity || filter.region) {
        url += `?commodity=${filter.commodity}&region=${filter.region}`;
      }
      const res = await fetch(url);
      setDemands(await res.json());
    }
    fetchDemands();
  }, [filter]);

  // Price Trends (USDA Data)
  useEffect(() => {
    if (trendCommodity) {
      fetch(`${USDA_API_BASE}/trends?commodity=${trendCommodity}`)
        .then((r) => r.json())
        .then(setPriceTrends);
    }
  }, [trendCommodity]);

  // Handlers
  function handleInput(e) {
    setNewOffer((o) => ({ ...o, [e.target.name]: e.target.value }));
  }
  async function submitOffer(e) {
    e.preventDefault();
    await fetch(`${API_BASE}/offer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOffer),
    });
    setNewOffer({ commodity: "", price: "", volume: "", buyer: "", region: "" });
    setFilter({ ...filter }); // trigger reload
  }
  function handleFilter(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-6">ðŸŒŽ Ag Marketplace & USDA Price Trends</h1>

      {/* Offer/Demand Filter */}
      <div className="flex gap-4 mb-6">
        <input
          name="commodity"
          value={filter.commodity}
          onChange={handleFilter}
          className="border rounded px-3 py-2"
          placeholder="Filter by Commodity"
        />
        <input
          name="region"
          value={filter.region}
          onChange={handleFilter}
          className="border rounded px-3 py-2"
          placeholder="Filter by Region"
        />
        <button className="px-4 py-2 rounded bg-green-600 text-white font-semibold"
          onClick={() => setTrendCommodity(filter.commodity)}>
          Show Price Trend
        </button>
      </div>

      {/* USDA Commodity Price Trend Chart */}
      {priceTrends.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow mb-8">
          <h2 className="text-xl text-blue-700 font-bold mb-2">
            Price Trend - {trendCommodity}
          </h2>
          <svg width={600} height={200}>
            {priceTrends.map((p, i, arr) => (
              i > 0 && (
                <line
                  key={i}
                  x1={(i - 1) * (600 / arr.length)}
                  y1={200 - arr[i-1].price * 4}
                  x2={i * (600 / arr.length)}
                  y2={200 - p.price * 4}
                  stroke="#06b6d4"
                  strokeWidth="3"
                />
              )
            ))}
            {priceTrends.map((p, i, arr) => (
              <circle
                key={'p' + i}
                cx={i * (600 / arr.length)}
                cy={200 - p.price * 4}
                r={4}
                fill="#06b6d4"
              />
            ))}
          </svg>
        </div>
      )}

      {/* Offers + Demands Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <h2 className="text-xl font-bold text-green-700 mb-3">Current Offers</h2>
          {offers.length === 0 && <div className="text-gray-500">No offers found</div>}
          {offers.map((o) => <OfferCard key={o.offerId} offer={o} />)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-3">Current Demands</h2>
          {demands.length === 0 && <div className="text-gray-500">No demands found</div>}
          {demands.map((o) => <OfferCard key={o.demandId} offer={o} />)}
        </div>
      </div>

      {/* Submit New Offer */}
      <div className="bg-white border rounded-xl p-6 shadow mb-8 max-w-xl mx-auto">
        <h2 className="text-lg font-bold text-green-700 mb-3">Post New Offer (Sell)</h2>
        <form className="space-y-2" onSubmit={submitOffer}>
          <input
            name="commodity"
            value={newOffer.commodity}
            onChange={handleInput}
            className="border rounded px-3 py-2 w-full"
            placeholder="Commodity (e.g. Corn)"
            required
          />
          <input
            name="buyer"
            value={newOffer.buyer}
            onChange={handleInput}
            className="border rounded px-3 py-2 w-full"
            placeholder="Your Name/Company"
            required
          />
          <input
            name="volume"
            value={newOffer.volume}
            onChange={handleInput}
            className="border rounded px-3 py-2 w-full"
            placeholder="Volume"
            type="number"
            required
          />
          <input
            name="price"
            value={newOffer.price}
            onChange={handleInput}
            className="border rounded px-3 py-2 w-full"
            placeholder="Price per Unit"
            type="number"
            required
          />
          <input
            name="region"
            value={newOffer.region}
            onChange={handleInput}
            className="border rounded px-3 py-2 w-full"
            placeholder="Region"
            required
          />
          <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white font-semibold mt-3">
            Submit Offer
          </button>
        </form>
      </div>

      {/* TODO: Add Demand creation and matching UI */}
    </div>
  );
}
