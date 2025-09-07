"use client";
import React from 'react';
import { Bus, Clock, MapPin, Navigation } from 'lucide-react';
import TransportCard from './TransportCard';
import RouteMap from './RouteMap';

const BusSection = ({ 
  title = "Bus Transport Options",
  description = "Direct bus services to Kinnaur from major cities. Choose from HRTC or private bus operators.",
  icon: Icon = Bus,
  gradientFrom = "from-blue-600",
  gradientTo = "to-blue-800",
  iconColor = "text-blue-600",
  routes = [],
  className = ""
}) => {
  return (
    <div className={`w-full space-y-6 px-0 ${className}`}>
      <div className={`w-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg p-6 text-white`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-blue-100">
          {description}
        </p>
      </div>

      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {routes.map((route, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className={`w-5 h-5 ${iconColor}`} />
                <h3 className="text-xl font-semibold">{route.from} to {route.to}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Duration: {route.duration}</span>
                </div>
                
                <div className="space-y-3">
                  {route.options.map((option, idx) => (
                    <TransportCard
                      key={idx}
                      type={option.type}
                      features={option.features}
                      fare={option.fare}
                      duration={option.duration}
                      booking={option.booking}
                    />
                  ))}
                </div>

                <div className="mt-4">
                  <RouteMap
                    from={route.from}
                    to={route.to}
                    mapLink={route.mapLink}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusSection; 