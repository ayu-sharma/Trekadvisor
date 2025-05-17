'use client'
import { timelineData } from '../../constants/timelineData';
import { useState, useEffect } from 'react';

export default function MilestoneShowcase() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (index) => {
    if (isTransitioning || index === activeMilestone) return;
    setIsTransitioning(true);
    setActiveMilestone(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const nextMilestone = () => {
    handleNavigation((activeMilestone + 1) % timelineData.length);
  };

  const prevMilestone = () => {
    handleNavigation((activeMilestone - 1 + timelineData.length) % timelineData.length);
  };

  // Auto-rotation (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextMilestone();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [activeMilestone, isTransitioning]);

  return (
    <section className="py-16 px-4 bg-green-800 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          <span className="text-green-300">Milestone</span> Showcase
        </h2>

        {/* Main showcase area */}
        <div className="relative overflow-hidden rounded-xl shadow-2xl mb-12">
          {/* Large showcase display */}
          <div className="relative min-h-[400px] md:min-h-[500px] bg-green-900">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 flex flex-col md:flex-row
                  ${index === activeMilestone ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                `}
              >
                {/* Image side */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <img
                    src={item.imageUrl || '/api/placeholder/800/600'}
                    alt={item.imageAlt || `Milestone ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-lg font-bold">
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="w-full md:w-1/2 p-6 md:p-12 bg-green-900 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-green-300">
                    Milestone {index + 1}
                  </h3>
                  <p className="text-lg mb-6">{item.description}</p>
                  <p className="italic text-green-300 mb-8">{item.caption}</p>
                  
                  <div className="bg-green-800/60 p-4 rounded-lg border-l-4 border-green-600">
                    <p className="text-sm md:text-base">
                      Additional context and details about this milestone and its significance 
                      in our journey of growth and development.
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button 
              onClick={prevMilestone}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20 transition-colors"
              aria-label="Previous milestone"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextMilestone}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20 transition-colors"
              aria-label="Next milestone"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Visual milestone navigation - Years on a horizontal scroll */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-1 min-w-max">
            {timelineData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(index)}
                className={`
                  cursor-pointer px-6 py-3 rounded-lg transition-all duration-300
                  ${index === activeMilestone 
                    ? 'bg-green-600 shadow-lg scale-105' 
                    : 'bg-green-900 hover:bg-green-700'}
                `}
              >
                <div className="text-center">
                  <span className="font-bold">{item.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-10 flex justify-between items-center max-w-lg mx-auto">
          <span className="text-green-300 font-medium">01</span>
          <div className="flex-1 mx-4 bg-green-900 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((activeMilestone + 1) / timelineData.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-green-300 font-medium">{String(timelineData.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}