"use client";

import { useState, useEffect } from 'react';
import Background from "./Background";
import Header from "./Header";
import TripPlanner from "./TripPlanner";
import TravelStats from "./TravelStats";
import AboutHimachal from "./aboutHimachal";

export default function HeroWithTripFocus() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="relative overflow-visible bg-slate-50 py-16 md:py-0 rounded-t-3xl z-10 shadow-lg">
      <Background />
      
      <div className="container mx-auto max-w-7xl px-4 flex flex-col justify-between relative z-10 md:pt-16">
        {/* Main content with trip planner prominence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full py-8 mt-8">
          <div className="lg:col-span-5">
            <Header />
          </div>
          <div className="lg:col-span-7">
            <TripPlanner />
          </div>
        </div>

        {/* Featured Destinations Section */}
        <div className="w-full pb-8">
          <AboutHimachal />
        </div>
      </div>
    </div>
  );
}