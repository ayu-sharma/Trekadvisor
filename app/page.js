import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/ui/Navbar';
import Footer from './components/Footer';
import TrendingLocations from './components/hero/trendingLocations';
import TrekLocations from './components/hero/trekLocations';
import HiddenGems from './components/hero/hiddenGems';

export default function Home() {
  return (
    <main className="overflow-x-hidden ">
      <Navbar />
      <Hero />
      <TrendingLocations/>
      <TrekLocations/>
      <HiddenGems/>
      <Footer/>
    </main>
  );
}