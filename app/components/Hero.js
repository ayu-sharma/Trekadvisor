"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroWithTripFocus from "./hero/index";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden" ref={ref}>
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/destinations/himachal-8.jpeg)',
          y,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </motion.div>
      
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-[70vh] text-white px-4 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
        >
          Discover the Unseen <span className="text-green-400">Himachal</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-center max-w-3xl mb-10"
        >
          Explore majestic mountains, ancient temples, and hidden valleys in India's paradise
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-30"
        >
          <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transform transition hover:scale-105 shadow-lg">
            <span>Plan Your Trip</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
      
      {/* Trip Planner Component - adjusted position */}
      <div className="relative z-10 px-4 -mt-[20vh]">
        <HeroWithTripFocus />
      </div>
    </div>
  );
}