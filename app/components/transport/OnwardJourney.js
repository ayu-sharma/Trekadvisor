"use client";
import React from 'react';
import TransportCard from './TransportCard';
import RouteMap from './RouteMap';

const OnwardJourney = ({
  title = "Onward Journey Options",
  routes,
  className = ""
}) => {
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 ${className}`}>
      <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {routes.map((route, index) => (
          <div key={index} className="bg-white/70 rounded-lg overflow-hidden">
            <div className="bg-blue-100 px-4 py-3 border-b border-blue-200">
              <h4 className="font-semibold text-gray-800">From {route.from} to {route.to}</h4>
              <p className="text-sm text-gray-600">Distance: {route.distance} • Time: {route.time}</p>
            </div>
            
            <div className="p-4 space-y-4">
              {route.options.map((option, idx) => (
                <TransportCard
                  key={idx}
                  {...option}
                />
              ))}

              <RouteMap
                title={`Route Map - ${route.from} to ${route.to}`}
                mapLink={route.mapLink}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnwardJourney; 