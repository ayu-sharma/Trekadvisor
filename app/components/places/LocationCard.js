"use client";

import { useState, useEffect } from 'react';
import { Star, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import DestinationModal from '../destinations/DestinationModal';

export default function LocationCard({ location, isHovered, onHover, onLeave, getCategoryIcon }) {
  const [showModal, setShowModal] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    id,
    name,
    description,
    image,
    category,
    rating,
    address,
    hours,
    phone,
    travelTips
  } = location;

  const handleToggleSave = (locationId) => {
    setSavedDestinations(prev => 
      prev.includes(locationId) 
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-green-500" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-slate-300" />);
      }
    }
    return stars;
  };

  // Return a simplified version until client-side hydration is complete
  if (!isMounted) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-green-100 flex flex-col h-[550px]">
        <div className="relative">
          <div className="w-full h-56 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="h-7 bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="mt-auto pt-4 border-t border-green-100">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-green-100 flex flex-col h-[550px]"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-56 object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
            <div className="flex mr-1">
              {renderStars()}
            </div>
            <span className="font-semibold text-green-900">{rating}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-600 text-white text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full flex items-center w-fit">
              {getCategoryIcon(category)}
              <span className="ml-1">{category}</span>
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-green-900 mb-3">{name}</h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{description}</p>
          
          <div className="space-y-2 text-sm text-slate-500">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
              <span className="line-clamp-2">{address}</span>
            </div>
            <div className="flex items-start">
              <Clock className="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
              <span className="line-clamp-1">{hours}</span>
            </div>
            {phone && (
              <div className="flex items-start">
                <Phone className="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                <span>{phone}</span>
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-4 border-t border-green-100">
            <Button 
              variant="secondary"
              className="w-full text-green-700 hover:bg-green-100 flex items-center justify-center"
              onClick={() => setShowModal(true)}
            >
              View Details
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <DestinationModal
          destination={{
            id,
            name,
            description,
            image,
            rating,
            category,
            address,
            hours,
            phone
          }}
          onClose={() => setShowModal(false)}
          savedDestinations={savedDestinations}
          onToggleSave={handleToggleSave}
          travelTips={travelTips}
        />
      )}
    </>
  );
} 