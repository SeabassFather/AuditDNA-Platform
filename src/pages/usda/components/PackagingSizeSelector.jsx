import React from 'react';
import { Package } from 'lucide-react';

const PACKAGING_SIZES = {
  avocado: [
    { id: '32s', name: '32 count', weight: '25 lbs', priceMultiplier: 1.35 },
    { id: '40s', name: '40 count', weight: '25 lbs', priceMultiplier: 1.25 },
    { id: '48s', name: '48 count', weight: '25 lbs', priceMultiplier: 1.15 },
    { id: '60s', name: '60 count', weight: '25 lbs', priceMultiplier: 1.05 },
    { id: '70s', name: '70 count', weight: '25 lbs', priceMultiplier: 0.95 },
    { id: '84s', name: '84 count', weight: '25 lbs', priceMultiplier: 0.85 }
  ],
  strawberry: [
    { id: 'large', name: 'Large', weight: '12 lbs', priceMultiplier: 1.2 },
    { id: 'medium', name: 'Medium', weight: '12 lbs', priceMultiplier: 1.0 },
    { id: 'small', name: 'Small', weight: '12 lbs', priceMultiplier: 0.85 }
  ],
  tomato: [
    { id: 'xlarge', name: 'XLarge', weight: '25 lbs', priceMultiplier: 1.3 },
    { id: 'large', name: 'Large', weight: '25 lbs', priceMultiplier: 1.15 },
    { id: 'medium', name: 'Medium', weight: '25 lbs', priceMultiplier: 1.0 },
    { id: 'small', name: 'Small', weight: '25 lbs', priceMultiplier: 0.85 }
  ],
  default: [
    { id: 'standard', name: 'Standard', weight: '25 lbs', priceMultiplier: 1.0 }
  ]
};

export default function PackagingSizeSelector({ commodity, selected, onSelect }) {
  const sizes = PACKAGING_SIZES[commodity?.id] || PACKAGING_SIZES.default;

  if (!commodity) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Select a commodity first</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        Packaging Size
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sizes.map(size => (
          <button
            key={size.id}
            onClick={() => onSelect(size)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selected?.id === size.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <div className="font-bold text-gray-800">{size.name}</div>
            <div className="text-sm text-gray-600">{size.weight}</div>
            {size.priceMultiplier !== 1.0 && (
              <div className={`text-xs font-bold mt-1 ${size.priceMultiplier > 1 ? 'text-green-600' : 'text-orange-600'}`}>
                {size.priceMultiplier > 1 ? '+' : ''}{((size.priceMultiplier - 1) * 100).toFixed(0)}% premium
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
