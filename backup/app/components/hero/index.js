"use client";

import Background from "./Background";
import Header from "./Header";
import TripPlanner from "./TripPlanner";
import TravelStats from "./TravelStats";
import AboutHimachal from "./aboutHimachal";

export default function HeroWithTripFocus() {
  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-screen py-20 md:py-0">
      <Background />
      
      <div className="container mx-auto max-w-7xl px-4 min-h-[calc(100vh-90px)] flex flex-col justify-between relative z-10 md:pt-24">
        {/* Main content with trip planner prominence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full py-8">
          <div className="lg:col-span-5">
            <Header />
          </div>
          <div className="lg:col-span-7">
            <TripPlanner />
          </div>
        </div>

        {/* Featured Destinations Section */}
        <div className="w-full pb-12">
          <AboutHimachal />
        </div>
      </div>
    </div>
  );
}