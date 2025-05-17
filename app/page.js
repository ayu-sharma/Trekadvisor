import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/ui/Navbar';
import PopularTreks from './components/treks/PopularTreks';
import HiddenGems from './components/destinations/HiddenGems';
import Testimonials from './components/Testimonials';
import EnquirySection from './components/EnquirySection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <HiddenGems />
      <PopularTreks />
      <Testimonials />
      <EnquirySection />
      <Footer />
    </main>
  );
} 