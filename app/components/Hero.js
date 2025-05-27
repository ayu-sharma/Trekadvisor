"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroWithTripFocus from "./hero/index";
import TripPlanner from './hero/TripPlanner';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <section className="relative bg-black text-white">
      {/* Main content area in flex layout */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left content area */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 md:py-12 pt-20 lg:py-0 relative z-10">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Animated accent line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-green-400 mb-8"
            />
            
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              Discover the Unseen <br />
              <span className="text-green-400">Himachal</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl lg:text-2xl mb-6 text-gray-300"
            >
              Explore majestic mountains, ancient temples, and hidden valleys in India's paradise
            </motion.p>

            {/* Statistics Section with Avatars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center space-x-6 mb-10"
            >
              {/* Avatar Stack */}
              <div className="relative flex -space-x-3">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden"
                  >
                    <Image
                      src={`/images/about/user${index + 1}.jpg`}
                      alt={`Traveler ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="relative w-12 h-12 rounded-full bg-green-400/20 border-2 border-black flex items-center justify-center"
                >
                  <span className="text-green-400 font-bold">+</span>
                </motion.div>
              </div>

              {/* Statistics */}
              <div className="bg-green-400/10 border border-green-400/20 rounded-lg px-6 py-3">
                <p className="text-2xl font-bold text-green-400">5000+</p>
                <p className="text-sm text-gray-400">Travelers Last Season</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right side with trip planner */}
        <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/60 z-10" />
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/destinations/himachal-8.jpeg)' }}
            />
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full bg-[url('/images/pattern-dots.svg')] bg-repeat bg-[length:20px_20px]" />
            </div>
          </div>
          
          {/* Trip planner card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative z-20 w-full sm:max-w-md lg:max-w-lg bg-black/80 backdrop-blur-md rounded-xl"
          >
            <TripPlanner />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}