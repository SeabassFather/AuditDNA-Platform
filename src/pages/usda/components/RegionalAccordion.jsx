import React, { useState, useContext } from "react";
import { ChevronDown, ChevronRight, MapPin, Globe } from "lucide-react";
import { useSelector } from "react-redux"; // or Context

export default function RegionalAccordion() {
  const regions = useSelector(state => state.regionalPackData.regions); // Adjust your store selector as needed
  const [openIdx, setOpenIdx] = useState(null);

  if (!regions || !regions.length) return <div className="text-gray-500">No regional data.</div>;

  return (
    <div className="divide-y divide-gray-100 rounded-lg bg-white">
      {regions.map((region, idx) => (
        <div key={region.state + idx}>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className={`w-full text-left px-5 py-3 font-bold flex justify-between items-center bg-gray-50 hover:bg-green-50 transition rounded`}
          >
            <span className="flex items-center gap-2"><Globe className="w-5 h-5 text-green-600"/>{region.state}</span>
            {openIdx === idx ? <ChevronDown /> : <ChevronRight />}
          </button>
          {openIdx === idx && (
            <div className="p-5 bg-white">
              {region.cities.map(city => (
                <div key={city} className="flex items-center gap-2 text-sm mb-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-blue-600" /> {city}
                </div>
              ))}
              <div className="mt-2">
                <div className="font-bold mb-1 text-blue-800">Pack Sizes & Prices:</div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 text-left text-xs text-gray-500">Size</th>
                      <th className="px-2 py-1 text-left text-xs text-gray-500">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(region.packs || []).map(pack => (
                      <tr key={pack.size}>
                        <td className="px-2 py-1">{pack.size}</td>
                        <td className="px-2 py-1">${pack.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
