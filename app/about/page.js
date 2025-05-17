// pages/index.js

import React from 'react';
import Head from 'next/head';
import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/about/Hero';
import Introduction from '../components/about/Introduction';
import Team from '../components/about/Team';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Head>
        <title>About Himachal Pradesh | Tourism Evolution</title>
        <meta name="description" content="Discover the rich history and evolution of tourism in Himachal Pradesh" />
      </Head>

      <Navbar/>
      <Hero />
      <Introduction />
      <Team />
      <Footer/>
    </div>
  );
}