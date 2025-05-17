"use client";

import { Map, Navigation } from 'lucide-react';

export default function MapSection() {
  return (
    <div className="mb-10 bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-600">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-100 rounded-full mr-4">
          <Map className="text-green-600 w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-green-900">Explore the Area</h2>
      </div>
      <div className="bg-green-50 h-80 rounded-lg overflow-hidden border border-green-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-green-700 flex items-center bg-white py-3 px-6 rounded-full shadow-md">
            <Navigation className="mr-2 text-green-600" />
            Interactive map would be displayed here
          </p>
        </div>
      </div>
    </div>
  );
} 