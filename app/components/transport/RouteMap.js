"use client";
import React from 'react';
import { MapPin, Map } from 'lucide-react';

const RouteMap = ({ 
  title, 
  description = "View the route and get directions using Google Maps:", 
  mapLink,
  className = ""
}) => {
  return (
    <div className={`bg-gray-50 rounded-lg overflow-hidden border border-gray-100 ${className}`}>
      <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <MapPin size={16} className="text-gray-600" />
      </div>
      <div className="p-4">
        {description && (
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        )}
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Map size={16} />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default RouteMap; 