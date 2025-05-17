"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';

const hiddenGemsData = [
  {
    id: 1,
    name: "Chitkul",
    location: "Kinnaur",
    image: "/images/destinations/himachal-8.jpeg",
    description: "The last inhabited village on the Indo-Tibet border, known for its stunning views, traditional houses, and friendly locals."
  },
  {
    id: 2,
    name: "Jibhi",
    location: "Banjar Valley",
    image: "/images/destinations/deistination-1.jpeg",
    description: "A tranquil hamlet nestled amid pine and cedar forests with gushing rivers and waterfalls, perfect for solitude seekers."
  },
  {
    id: 3,
    name: "Tirthan Valley",
    location: "Kullu",
    image: "/images/destinations/destination-2.jpeg",
    description: "A serene valley with crystal clear water streams, abundant trout fishing, and gateway to the Great Himalayan National Park."
  },
  {
    id: 4,
    name: "Malana",
    location: "Parvati Valley",
    image: "/images/destinations/destination-3.jpg",
    description: "An ancient village with unique architecture and culture, believed to be one of the oldest democracies in the world."
  }
];

export default function HiddenGems() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const element = document.getElementById('hidden-gems-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="hidden-gems-section" className="relative py-20 bg-white z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Hidden <span className="text-green-600">Gems</span> of Himachal
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Explore lesser-known treasures of Himachal Pradesh, away from the tourist crowds. 
            Discover pristine landscapes, authentic villages, and unspoiled natural beauty.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {hiddenGemsData.map((gem, index) => (
            <motion.div
              key={gem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible && isMounted ? 1 : 0, y: isVisible && isMounted ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative rounded-xl overflow-hidden shadow-lg group"
              onMouseEnter={() => setActiveCard(gem.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative h-80">
                <Image
                  src={gem.image}
                  alt={gem.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin size={18} className="mr-2 text-green-400" />
                    <span className="text-sm font-medium">{gem.location}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{gem.name}</h3>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      activeCard === gem.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-200 text-sm mb-4">{gem.description}</p>
                    <button className="inline-flex items-center text-green-400 font-medium hover:text-green-300 transition-colors">
                      Explore More <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="px-5 py-3 bg-white border-2 border-green-600 text-green-600 font-semibold rounded-lg shadow hover:bg-green-50 transition-colors flex items-center mx-auto">
            Discover All Hidden Gems <ArrowRight size={18} className="ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
} 