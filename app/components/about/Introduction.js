"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Users, Calendar, Compass } from 'lucide-react';

export default function Introduction() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-green-600 font-medium">OUR STORY</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">Bringing Himachal's Beauty to the World</h2>
          
          <p className="text-slate-600 mb-6">
            TrekAdvisor was born from our lifelong love of Himachal Pradesh's majestic mountains, hidden valleys, and rich cultural heritage. As locals who've explored every corner of this beautiful state, we realized that most travelers only experience a fraction of what Himachal has to offer.
          </p>
          
          <p className="text-slate-600 mb-8">
            Founded by Ayush Sharma from Jasur, Kangra and Munish Thakur from Hamirpur, we combine our intimate knowledge of the region with technological expertise to create unforgettable travel experiences that venture beyond the typical tourist trail.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-2.5 rounded-full mr-3">
                <MapPin className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Local Guides</h3>
                <p className="text-sm text-slate-600">Born and raised in Himachal Pradesh</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2.5 rounded-full mr-3">
                <Compass className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Authentic Experiences</h3>
                <p className="text-sm text-slate-600">Beyond the tourist attractions</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2.5 rounded-full mr-3">
                <Calendar className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Seasonal Insights</h3>
                <p className="text-sm text-slate-600">Best times to visit each location</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2.5 rounded-full mr-3">
                <Users className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Community Focus</h3>
                <p className="text-sm text-slate-600">Supporting local businesses</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 h-80 md:h-[500px] relative rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image 
            src="/images/destinations/himachal-1.jpeg" 
            alt="Scenic view of Himachal Valley" 
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = `/images/placeholder.svg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <h3 className="text-white text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-200">
              To help travelers discover the authentic Himachal Pradesh through the eyes of locals, creating meaningful connections with nature, culture, and communities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 