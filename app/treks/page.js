import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { treksData } from '../constants/treksData';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/Footer';
import { Map, Mountain, Calendar, Route, ArrowRight } from 'lucide-react';

export default function TreksPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-[url('/images/treks/treks-hero.jpg')] bg-cover bg-center" />
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{treksData.title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">{treksData.subtitle}</p>
          <a href="#treks" className="bg-white text-slate-900 px-6 py-3 rounded-full font-medium hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
            Explore Treks <ArrowRight size={16} />
          </a>
        </div>
      </div>
      
      {/* Introduction */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Discover the Himalayas</h2>
          <p className="text-lg text-slate-600">{treksData.description}</p>
        </div>
      </section>
      
      {/* Trek Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">Trek Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treksData.categories.map((category, index) => (
              <div key={index} className="bg-slate-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      category.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      category.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {category.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{category.name}</h3>
                  <p className="text-slate-600">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Treks */}
      <section id="treks" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">Popular Treks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treksData.treks.map((trek, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={trek.images[0]} 
                    alt={trek.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{trek.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trek.difficulty.includes('Easy') ? 'bg-green-100 text-green-800' :
                        trek.difficulty.includes('Moderate') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {trek.difficulty}
                      </span>
                      <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-medium">
                        {trek.duration}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-6 mb-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Map size={16} />
                      <span>{trek.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mountain size={16} />
                      <span>{trek.maxAltitude}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Route size={16} />
                      <span>{trek.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{trek.bestSeason}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4">{trek.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Highlights:</h4>
                    <ul className="list-disc pl-5 text-slate-600 space-y-1">
                      {trek.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={`/treks/${trek.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trekking Essentials */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Trekking Essentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What to Pack</h3>
                <ul className="space-y-2">
                  {treksData.essentials.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-blue-200">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Trekking Tips</h3>
                <ul className="space-y-2">
                  {treksData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-blue-200">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Ready for an Adventure?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Join us on an unforgettable journey through the breathtaking landscapes of Himachal Pradesh. 
            Book your trek today and experience the beauty of the Himalayas firsthand.
          </p>
          <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-block">
            Book Your Trek
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 