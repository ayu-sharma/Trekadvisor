"use client"
import { useState, useEffect, Suspense } from 'react';
import { Map, Navigation, Info, Coffee, Utensils, Music, Star, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import { useSearchParams } from 'next/navigation';
import HeroSection from '../components/places/HeroSection';
import AboutSection from '../components/places/AboutSection';
import MapSection from '../components/places/MapSection';
import LocationsSection from '../components/places/LocationsSection';
import Footer from '../components/ui/Footer';

// Loading component
function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-green-700">Loading district information...</p>
      </div>
    </div>
  );
}

// Main Place component with a green color scheme
function PlaceContent() {
  const searchParams = useSearchParams();
  const districtId = searchParams.get('district');
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const response = await fetch(`/data/${districtId}.json`);
        if (!response.ok) {
          throw new Error('District data not found');
        }
        const data = await response.json();
        setDistrictData(data);
      } catch (error) {
        console.error('Error loading district data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (districtId) {
      fetchDistrictData();
    }
  }, [districtId]);
  
  if (loading) {
    return <LoadingState />;
  }

  if (!districtData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-center">
          <div className="bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-red-500 w-8 h-8" />
          </div>
          <p className="text-red-700 text-lg">District information not found.</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    coverImage,
    summary,
    locations
  } = districtData;

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <HeroSection name={name} coverImage={coverImage} summary={summary} />
      
      <div className="container mx-auto px-4 py-12 -mt-16 relative z-30">
        <AboutSection name={name} description={description} />
        {/* <MapSection /> */}
        <LocationsSection name={name} locations={locations} />
      </div>

      <Footer name={name} />
    </div>
  );
}

// Export the wrapped component
export default function Place() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PlaceContent />
    </Suspense>
  );
}

// Enhanced Location card component with hover effects
function LocationCard({ location, isHovered, onHover, onLeave, getCategoryIcon }) {
  const {
    name,
    description,
    image,
    category,
    rating,
    address,
    hours,
    phone
  } = location;

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-green-500" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-slate-300" />);
      }
    }
    return stars;
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-green-100"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-56 object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
          <div className="flex mr-1">
            {renderStars()}
          </div>
          <span className="font-semibold text-green-900">{rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-green-600 text-white text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full flex items-center w-fit">
            {getCategoryIcon(category)}
            <span className="ml-1">{category}</span>
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-900 mb-3">{name}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mt-0.5 mr-2 text-green-500" />
            <span>{address}</span>
          </div>
          <div className="flex items-start">
            <Clock className="w-4 h-4 mt-0.5 mr-2 text-green-500" />
            <span>{hours}</span>
          </div>
          {phone && (
            <div className="flex items-start">
              <Phone className="w-4 h-4 mt-0.5 mr-2 text-green-500" />
              <span>{phone}</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-green-100">
          <Button 
            variant="secondary"
            className="w-full text-green-700 hover:bg-green-100 flex items-center justify-center"
          >
            View Details
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}