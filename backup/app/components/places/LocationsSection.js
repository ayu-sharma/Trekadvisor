"use client";

import { useState } from 'react';
import { MapPin, Coffee, Utensils, Music, Star, Info } from 'lucide-react';
import Button from '../ui/Button';
import LocationCard from './LocationCard';

export default function LocationsSection({ name, locations }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Filter locations based on selected category
  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(location => location.category === selectedCategory);
  
  // Get unique categories from locations and sort them alphabetically
  const categories = ['all', ...new Set(locations.map(location => location.category))].sort();

  // Function to get appropriate icon based on category
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'cafe': return <Coffee className="w-5 h-5" />;
      case 'restaurant': return <Utensils className="w-5 h-5" />;
      case 'bar': return <MapPin className="w-5 h-5" />;
      case 'landmark': return <MapPin className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'museum': return <Info className="w-5 h-5" />;
      case 'park': return <MapPin className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-600">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-green-900">Places to Discover</h2>
          <p className="text-green-700 mt-2">Find the perfect spots to enjoy in {name}</p>
        </div>
        
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'shadow-md'
                  : 'hover:bg-green-200'
              }`}
            >
              {category !== 'all' && (
                <span className="mr-1.5 inline-flex items-center">
                  {getCategoryIcon(category)}
                </span>
              )}
              <span className="capitalize">{category}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Locations grid with hover effects */}
      {filteredLocations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location, index) => (
            <LocationCard 
              key={index} 
              location={location} 
              isHovered={hoveredCard === index}
              onHover={() => setHoveredCard(index)}
              onLeave={() => setHoveredCard(null)}
              getCategoryIcon={getCategoryIcon}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-green-500 w-8 h-8" />
          </div>
          {locations.length === 0 ? (
            <p className="text-green-700 text-lg">No locations available for this district yet.</p>
          ) : (
            <p className="text-green-700 text-lg">No locations found for the selected category.</p>
          )}
        </div>
      )}
    </div>
  );
} 