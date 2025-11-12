import React, { useContext } from "react";
import { CheckCircle, Star, MapPin, Mail, Phone, Leaf } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { closeGrowerModal } from "../../store/growerSlice"; // Adjust path as needed

export default function GrowerProfileModal() {
  const grower = useSelector(state => state.growers.selectedGrower); // Automatically picks selected from Redux
  const dispatch = useDispatch();
  if (!grower) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-8 relative overflow-y-auto">
        <button onClick={() => dispatch(closeGrowerModal())} className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 font-bold">âœ•</button>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{grower.flag}</span>
          <div>
            <h2 className="text-2xl font-black">{grower.name}</h2>
            <div className="text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {grower.location}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="font-bold text-blue-700 mb-1">Products</div>
          <div className="text-gray-900">{grower.products.join(", ")}</div>
        </div>
        <div className="flex gap-6 mb-6">
          <div>
            <div className="font-bold text-green-700 text-xs flex items-center gap-1">
              <Leaf className="w-4 h-4" /> Organic
            </div>
            <div>{grower.organic ? "Yes" : "No"}</div>
          </div>
          <div>
            <div className="font-bold text-yellow-700 text-xs flex items-center gap-1">
              <Star className="w-4 h-4" /> Rating
            </div>
            <div className="flex items-center gap-1 text-lg font-bold">
              {grower.rating}
              <Star className="w-3 h-3 text-yellow-400" />
            </div>
          </div>
          <div>
            <div className="font-bold text-gray-700 text-xs">Volume</div>
            <div>{grower.volume}</div>
          </div>
          <div>
            <div className="font-bold text-gray-700 text-xs">Hectares</div>
            <div>{grower.hectares} ha</div>
          </div>
        </div>
        <div className="mb-6">
          <div className="font-bold mb-2">Certifications</div>
          <div className="flex flex-wrap gap-2">
            {grower.certifications.map((cert, idx) => (
              <div key={idx} className="bg-blue-50 px-3 py-1 rounded border border-blue-200 text-sm font-bold text-blue-700 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {cert}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <div className="font-bold text-gray-700 text-xs">Contact</div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a className="underline" href={`mailto:${grower.contact}`}>{grower.contact}</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {grower.phone}
            </div>
          </div>
          <div>
            <div className="font-bold text-gray-700 text-xs">Season</div>
            <div>{grower.season}</div>
            <div className="font-bold text-green-700 text-xs mt-2">Target Price</div>
            <div>{grower.targetPrice}</div>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          {/* Connect to messaging API/modal */}
          <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-blue-700 transition-all"
            onClick={() => window.open(`mailto:${grower.contact}`, '_blank')}>
            Contact Grower
          </button>
          <button onClick={() => dispatch(closeGrowerModal())} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
