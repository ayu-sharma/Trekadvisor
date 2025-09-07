"use client";
import React, { useRef } from 'react';
import TrekCard from './cards/trekCard';
import trekCards from '../../constants/trekCards';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrekLocations() {
  const scrollRef = useRef(null);

  const CARD_WIDTH = 320; // px
  const CARD_GAP = 18; // px (gap-6 = 1.5rem = 24px, but screenshot looks closer to 18px)
  const VISIBLE_CARDS = 4;

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
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 px-12">TREK LOCATIONS</h2>
      {/* Carousel Container */}
      <div className="relative ">
        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto py-2 pr-28 hide-scrollbar"
          style={{            
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            width: `${CARD_WIDTH * VISIBLE_CARDS + CARD_GAP * (VISIBLE_CARDS - 1)}px`,
          }}
        >
          {trekCards.map((trek, idx) => (
            <div
              key={trek.name + idx}
              style={{
                minWidth: `${CARD_WIDTH}px`,
                maxWidth: `${CARD_WIDTH}px`,
                scrollSnapAlign: 'start',
                flex: '0 0 auto',
              }}
            >
              <TrekCard {...trek} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
