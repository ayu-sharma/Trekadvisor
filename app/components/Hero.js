"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Dropdown from './hero/Dropdown';
import { Search } from 'lucide-react';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between bg-black text-white overflow-hidden mb-8">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/home/hero.png)' }} />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="sm:text-4xl text-2xl md:text-5xl lg:text-6xl font-bold mb-8">
          Seamless holidays in <span className="text-green-400">Himachal</span> await.
        </h1>
        <form 
          onSubmit={handleSearch}
          className="w-[90%] max-w-xl h-16 rounded-full border-4 border-lime-400 bg-white shadow-[0_4px_32px_0_rgba(0,0,0,0.25)] mb-8 flex items-center px-6"
        >
          <Search className="h-6 w-6 text-gray-500" />
          <input
            type="text"
            placeholder="Search for destinations..."
            className="flex-1 h-full bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg ml-2 cursor-pointer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setShowForm(true)}
          />
        </form>
      </div>

      {/* Full screen destination picker */}
      {showForm && (
        <Dropdown
          onClose={() => setShowForm(false)}
          onSelect={(destination) => {
            console.log('Selected:', destination);
            setShowForm(false);
          }}
        />
      )}
    </section>
  );
}