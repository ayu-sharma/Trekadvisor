import React from 'react';

export default function TrekCard({ name, image, price, originalPrice, discount, altitude, features }) {
  return (
    <div className="rounded-2xl overflow-hidden w-80 border border-gray-200">
      {/* Image */}
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      {/* Card Content */}
      <div className=" p-4">
        <div className="font-semibold text-lg mb-1">{name}</div>
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold text-gray-900 mr-2">Altitude: {altitude}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, idx) => (
              <span key={idx} className="flex items-center text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full">
              ✓ {feature}
            </span>
          ))}
          </div>
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">View Details &rarr;</button>
    </div>
  );
}
