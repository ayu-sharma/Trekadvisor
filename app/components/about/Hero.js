"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <header className="relative h-[65vh] md:h-[75vh] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <div className="h-full w-full relative">
        <Image 
          src="/images/about/mountains.jpeg" 
          alt="Mountains of Himachal Pradesh" 
          fill 
          className="object-cover" 
          priority
        />
      </div>
      
      {/* Content - Added margin-top to push content down */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-4 pt-24 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="scale-90">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              About <span className="text-green-400">TrekAdvisor</span>
            </h1>
            
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8">
              Created by locals who know every trail and hidden gem in Himachal Pradesh
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-16 h-16 md:w-20 md:h-20 relative rounded-full overflow-hidden border-2 border-green-400"
            >
              <Image
                src="/images/about/user1.png"
                alt="Ayush Sharma"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = `/images/placeholder.svg`;
                }}
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-16 h-16 md:w-20 md:h-20 relative rounded-full overflow-hidden border-2 border-green-400"
            >
              <Image
                src="/images/about/user2.jpg"
                alt="Munish Thakur"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = `/images/placeholder.svg`;
                }}
              />
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-green-300 mt-4 font-medium"
          >
            Founded by Ayush Sharma & Munish Thakur
          </motion.p>
        </motion.div>
      </div>
      
      {/* Curved bottom - adjusted for better display at -10% zoom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full" style={{display: 'block', height: '6rem'}}>
          <path 
            fill="#f9fafb" 
            fillOpacity="1" 
            d="M0,128L48,138.7C96,149,192,171,288,176C384,181,480,171,576,144C672,117,768,75,864,80C960,85,1056,139,1152,165.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </header>
  );
} 