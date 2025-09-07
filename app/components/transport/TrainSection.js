"use client";
import React from 'react';
import { Train, Clock, MapPin, Navigation } from 'lucide-react';
import TransportCard from './TransportCard';
import RouteMap from './RouteMap';

const TrainSection = ({ 
  title = "Train Transport Options",
  description = "Book your train to either Chandigarh or Delhi, then continue your journey to Kinnaur using local transport options.",
  icon: Icon = Train,
  gradientFrom = "from-purple-600",
  gradientTo = "to-purple-800",
  iconColor = "text-purple-600",
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
        <p className="text-purple-100">
          {description}
        </p>
      </div>

      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {routes.map((route, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className={`w-5 h-5 ${iconColor}`} />
                <h3 className="text-xl font-semibold">Trains to {route.to}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-gray-600">
                  <p className="mb-2">Available from: {route.from.join(', ')}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Duration: {route.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {route.options.map((option, idx) => (
                    <TransportCard
                      key={idx}
                      type={option.type}
                      features={option.features}
                      fare={option.fare}
                      frequency={option.frequency}
                      booking={option.booking}
                    />
                  ))}
                </div>

                <div className="mt-4">
                  <RouteMap
                    from={route.from[0]}
                    to={route.to}
                    mapLink={route.mapLink}
                  />
                </div>

                <a
                  href={route.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center px-4 py-2 ${gradientFrom.replace('from-', 'bg-')} text-white rounded-lg hover:opacity-90 transition-colors`}
                >
                  Book Train to {route.to}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainSection; 