"use client";
import React, { useState } from 'react';
import { Car, Clock, MapPin, Navigation, Search } from 'lucide-react';
import TransportCard from './TransportCard';
import RouteMap from './RouteMap';

const CarSection = ({ 
  title = "Car Transport Options",
  description = "Drive to Kinnaur or hire a taxi. Choose from various routes based on your starting point.",
  icon: Icon = Car,
  gradientFrom = "from-green-600",
  gradientTo = "to-green-800",
  iconColor = "text-green-600",
  routes = [],
  className = "",
  onLocationSelect,
  destination = "Kinnaur"
}) => {
  const [customLocation, setCustomLocation] = useState('');
  const [showDirections, setShowDirections] = useState(false);

  const handleCustomLocationSubmit = (e) => {
    e.preventDefault();
    if (customLocation.trim()) {
      const mapUrl = `https://www.google.com/maps/dir/${encodeURIComponent(customLocation.trim())}/${encodeURIComponent(destination)}/`;
      window.open(mapUrl, '_blank');
      onLocationSelect?.('Custom', customLocation);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${encodeURIComponent(destination)}/`;
          window.open(mapUrl, '_blank');
          onLocationSelect?.('Current', `${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className={`w-full space-y-6 px-0 ${className}`}>
      <div className={`w-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg p-6 text-white`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-green-100">
          {description}
        </p>
      </div>

      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Enter Your Location</h3>
          <form onSubmit={handleCustomLocationSubmit} className="flex gap-4">
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="Enter your city or location"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Use Current Location
            </button>
          </form>
        </div>

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
                    showDirections={showDirections}
                    onToggleDirections={() => setShowDirections(!showDirections)}
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

export default CarSection; 