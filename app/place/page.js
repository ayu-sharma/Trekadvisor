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
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Only render content when client-side has mounted
  if (!isMounted) {
    return <LoadingState />;
  }

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

// LocationCard has been moved to its own component file and should not be defined here