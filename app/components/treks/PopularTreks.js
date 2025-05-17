"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Mountain, Clock, ArrowRight, Filter } from 'lucide-react';

const trekData = [
  {
    id: 1,
    name: "Triund Trek",
    location: "Dharamshala",
    image: "/images/destinations/himachal-4.jpeg",
    difficulty: "Easy",
    duration: "1-2 Days",
    altitude: "2,850m",
    bestSeason: "March-June, Sept-Nov",
    description: "A perfect weekend trek with panoramic views of the Dhauladhar ranges and the Kangra Valley."
  },
  {
    id: 2,
    name: "Hampta Pass",
    location: "Manali",
    image: "/images/destinations/himachal-2.jpeg",
    difficulty: "Moderate",
    duration: "5 Days",
    altitude: "4,270m",
    bestSeason: "June-September",
    description: "Experience dramatic landscape changes from lush green valleys to the stark deserts of Spiti."
  },
  {
    id: 3,
    name: "Indrahar Pass",
    location: "Dharamshala",
    image: "/images/destinations/himachal-3.jpeg",
    difficulty: "Difficult",
    duration: "4-5 Days",
    altitude: "4,342m",
    bestSeason: "May-June, Sept-Oct",
    description: "A challenging trek through the Dhauladhar range offering breathtaking views of the Pir Panjal range."
  },
  {
    id: 4,
    name: "Pin Bhaba Pass",
    location: "Kinnaur/Spiti",
    image: "/images/destinations/himachal-7.jpeg",
    difficulty: "Difficult",
    duration: "8-9 Days",
    altitude: "4,910m",
    bestSeason: "July-September",
    description: "One of the most dramatic crossover treks, transitioning from green forests to the barren landscapes of Spiti."
  },
  {
    id: 5,
    name: "Kareri Lake Trek",
    location: "Dharamshala",
    image: "/images/destinations/himachal-5.jpeg",
    difficulty: "Moderate",
    duration: "2-3 Days",
    altitude: "2,934m",
    bestSeason: "April-June, Sept-Nov",
    description: "A tranquil alpine lake surrounded by snow-capped mountains and lush meadows."
  },
  {
    id: 6,
    name: "Beas Kund Trek",
    location: "Manali",
    image: "/images/destinations/himachal-6.jpeg",
    difficulty: "Easy",
    duration: "3 Days",
    altitude: "3,700m",
    bestSeason: "June-October",
    description: "Trek to the source of River Beas with stunning views of Pir Panjal mountain ranges."
  }
];

const difficultyColors = {
  "Easy": "bg-green-500",
  "Moderate": "bg-amber-500",
  "Difficult": "bg-red-500"
};

export default function PopularTreks() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredTreks, setFilteredTreks] = useState(trekData);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredTreks(trekData);
    } else {
      setFilteredTreks(trekData.filter(trek => trek.difficulty === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Popular <span className="text-green-600">Treks</span> in Himachal
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Discover breathtaking trails through snow-capped mountains, lush valleys, and pristine lakes. 
            From easy walks to challenging expeditions, find your perfect Himalayan adventure.
          </p>
        </motion.div>
        
        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="bg-white p-1 shadow rounded-full flex items-center">
            <Filter size={18} className="text-slate-400 ml-3 mr-1" />
            {['All', 'Easy', 'Moderate', 'Difficult'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeFilter === filter
                    ? 'bg-green-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreks.map((trek, index) => (
            <motion.div
              key={trek.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-56">
                <Image
                  src={trek.image}
                  alt={trek.name}
                  fill
                  className="object-cover"
                />
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: trek.difficulty === "Easy" ? "#22c55e" : trek.difficulty === "Moderate" ? "#f59e0b" : "#ef4444" }}
                >
                  {trek.difficulty}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{trek.name}</h3>
                
                <div className="flex items-center text-slate-600 mb-1">
                  <MapPin size={16} className="mr-2 text-green-600" />
                  <span className="text-sm">{trek.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-y-2 my-3">
                  <div className="w-1/2 flex items-center text-slate-600">
                    <Mountain size={16} className="mr-2 text-green-600" />
                    <span className="text-sm">{trek.altitude}</span>
                  </div>
                  <div className="w-1/2 flex items-center text-slate-600">
                    <Clock size={16} className="mr-2 text-green-600" />
                    <span className="text-sm">{trek.duration}</span>
                  </div>
                  <div className="w-full flex items-center text-slate-600">
                    <Calendar size={16} className="mr-2 text-green-600" />
                    <span className="text-sm">{trek.bestSeason}</span>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{trek.description}</p>
                
                <button className="mt-2 text-green-600 font-medium flex items-center hover:text-green-700 transition-colors">
                  Explore Trek <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors flex items-center mx-auto">
            View All Treks <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
} 