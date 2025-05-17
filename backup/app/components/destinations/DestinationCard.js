"use client";

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import Tag from './Tag';

const DestinationCard = ({ destination, onOpenDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div 
        className="h-48 bg-emerald-100 relative cursor-pointer"
        onClick={() => onOpenDetails(destination.id)}
      >
        <img 
          src={`/api/placeholder/400/320`} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-sm font-medium text-white bg-emerald-700 bg-opacity-80 px-2 py-1 rounded">
                {destination.district}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 
          className="font-bold text-lg mb-1 text-gray-800 hover:text-emerald-600 cursor-pointer"
          onClick={() => onOpenDetails(destination.id)}
        >
          {destination.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.tags.map(tag => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onOpenDetails(destination.id)}
        >
          Explore
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default DestinationCard; 