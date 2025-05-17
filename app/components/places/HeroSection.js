"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

export default function HeroSection({ name, coverImage, summary }) {
  // Use useState and useEffect to handle client-side animations
  // This prevents hydration mismatches
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverImage})`,
          transform: 'scale(1.1)',
        }}
      >
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-900/70 to-green-800/90"></div>
      </div>

      {/* Animated Mountain Silhouette for Bottom  */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full"
        >
          <path 
            fill="#f3f4f6" 
            fillOpacity="1" 
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="container mx-auto px-4">
          <div 
            className={`text-center max-w-4xl mx-auto text-white transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* District Label */}
            <div className="inline-block mb-4 px-4 py-1 bg-green-500/30 backdrop-blur-sm rounded-full text-green-100 font-medium">
              Explore Himachal Districts
            </div>
            
            {/* District Name */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-white">{name}</span>
              <span className="block text-green-300 mt-2">{summary}</span>
            </h1>
            
            {/* Decorative Line */}
            <div className="w-32 h-1 bg-green-400 mx-auto mb-6 rounded-full"></div>
            
            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              <div className="flex items-center text-green-200">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Himachal Pradesh</span>
              </div>
              <div className="flex items-center text-green-200">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Best Time: Apr-Jun, Sep-Nov</span>
              </div>
              <div className="flex items-center text-green-200">
                <Users className="w-5 h-5 mr-2" />
                <span>Family Friendly</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full flex items-center transition-all transform hover:scale-105 shadow-lg">
                View Attractions
                <ArrowRight size={18} className="ml-2" />
              </button>
              <button className="px-6 py-3 bg-white hover:bg-gray-100 text-green-800 font-medium rounded-full transition-all shadow-lg">
                Plan Your Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 