"use client"
import React, { useState, useEffect } from 'react';
import { Mountain, MapPin, Compass } from 'lucide-react';
import Footer from '../components/ui/Footer';
import DestinationCard from '../components/destinations/DestinationCard';
import DestinationModal from '../components/destinations/DestinationModal';
import { destinations } from '../constants/destinationdata';
import Navbar from '../components/ui/Navbar';

export default function TravelDestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Handle destination details modal
  const openDestinationDetails = (destId) => {
    setSelectedDestination(destinations.find(d => d.id === destId));
    document.body.style.overflow = 'hidden';
  };

  const closeDestinationDetails = () => {
    setSelectedDestination(null);
    document.body.style.overflow = 'auto';
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Hidden Gems of Himachal Pradesh
            </h1>
            <p className="text-gray-600 mb-6">
              Discover the untouched beauty and serene landscapes of Himachal's best-kept secrets. 
              From ancient temples to pristine valleys, explore destinations that few have witnessed.
            </p>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <Mountain className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Majestic Mountains</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Sacred Temples</span>
              </div>
              <div className="flex items-center">
                <Compass className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Hidden Valleys</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Explore the Unexplored
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Venture beyond the beaten path and discover the authentic charm of Himachal Pradesh. 
            Each destination tells a unique story of culture, nature, and adventure.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onOpenDetails={openDestinationDetails}
            />
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />

      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={closeDestinationDetails}
      />
    </div>
  );
}