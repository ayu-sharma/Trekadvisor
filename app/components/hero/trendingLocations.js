'use client';
import React, { useRef } from 'react';
import TredLocation from './cards/tredLocation';
import tredLocations from '../../constants/tredLocations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrendingLocations() {
  const scrollRef = useRef(null);

  const CARD_WIDTH = 320; // px
  const CARD_GAP = 18; // px
  const VISIBLE_CARDS = 4;
  const isCarousel = tredLocations.length > 5;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = CARD_WIDTH + CARD_GAP;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative py-8 max-w-7xl mx-auto">
      {/* Navigation Buttons */}
      {isCarousel && (
        <div className='flex space-x-1 absolute right-2 z-10'>
          <button
            className="bg-neutral-200/80 hover:bg-neutral-300 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={28} />
          </button>
          {/* Right Arrow */}
          <button
            className="bg-neutral-200/80 hover:bg-neutral-300 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 p">TRENDING LOCATIONS</h2>
      {/* Carousel Container */}
      <div className="relative">
        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className={`flex ${isCarousel ? 'gap-4 hide-scrollbar' : 'gap-6'} overflow-x-auto py-2`}
          style={isCarousel ? {
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            width: `${CARD_WIDTH * VISIBLE_CARDS + CARD_GAP * (VISIBLE_CARDS - 1)}px`,
            paddingRight: `${CARD_WIDTH / 2}px`, // allow peeking of 5th card
            // no left padding, handled by px-12 on parent
          } : {
            width: '100%',
            scrollBehavior: 'auto',
            scrollSnapType: 'none',
          }}
        >
          {tredLocations.map((loc, idx) => (
            <div
              key={loc.title}
              style={isCarousel ? {
                minWidth: `${CARD_WIDTH}px`,
                maxWidth: `${CARD_WIDTH}px`,
                scrollSnapAlign: 'start',
                flex: '0 0 auto',
              } : {
                minWidth: '220px',
                flex: '1 1 0',
              }}
            >
              <TredLocation
                image={loc.image}
                title={loc.title}
                subtitle={loc.subtitle}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}