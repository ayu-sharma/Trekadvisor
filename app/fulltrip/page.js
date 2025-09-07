"use client"
import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Star, PlaneTakeoff, Car, Clock, Mountain, Thermometer, Calendar, Users, Camera, TreePine, Bus, Train, Navigation, AlertCircle, Info, Plane, Check, Map } from "lucide-react";
import TransportSection from "../components/transport/TransportSection";
import OnwardJourney from "../components/transport/OnwardJourney";
import BusSection from "../components/transport/BusSection";
import CarSection from "../components/transport/CarSection";
import TrainSection from "../components/transport/TrainSection";
import FlightSection from "../components/transport/FlightSection";

const iconMap = {
  Clock,
  Thermometer,
  Mountain,
  Calendar
};

const KinnaurDetails = () => {
  const [selectedTransport, setSelectedTransport] = useState('car');
  const [userLocation, setUserLocation] = useState('Delhi');
  const [customLocation, setCustomLocation] = useState('');
  const [showDirections, setShowDirections] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/kinnaur.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        // Set initial transport mode based on available data
        if (jsonData.carData) setSelectedTransport('car');
        else if (jsonData.busData) setSelectedTransport('bus');
        else if (jsonData.trainData) setSelectedTransport('train');
        else if (jsonData.flightData) setSelectedTransport('flight');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLocationSelect = (type, location) => {
    setUserLocation(type);
    if (type === 'Custom') {
      setCustomLocation(location);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const {
    tripData,
    carRoutes,
    busServices,
    trainData,
    flightData,
    busData,
    carData,
    highlights,
    quickFacts,
    importantTips,
    whatToPack,
    bestExperience
  } = data;

  // Get available transport options
  const availableTransport = [
    { id: 'car', icon: Car, name: 'By Car', data: carData },
    { id: 'bus', icon: Bus, name: 'By Bus', data: busData },
    { id: 'flight', icon: Plane, name: 'By Flight', data: flightData },
    { id: 'train', icon: Train, name: 'By Train', data: trainData }
  ].filter(option => option.data);

  // Render transport section based on selected mode
  const renderTransportSection = () => {
    switch (selectedTransport) {
      case 'train':
        return trainData && (
          <TrainSection 
            routes={Object.entries(trainData).map(([city, data]) => ({
              to: city,
              from: data.from,
              duration: data.duration || "4-6 hours",
              options: data.onwardJourney?.options || [],
              mapLink: data.onwardJourney?.mapLink,
              bookingLink: data.bookingLink
            }))}
          />
        );
      case 'flight':
        return flightData && (
          <FlightSection 
            routes={Object.entries(flightData).map(([city, data]) => ({
              to: city,
              from: data.from,
              duration: data.duration || "1-2 hours",
              options: data.onwardJourney?.options || [],
              mapLink: data.onwardJourney?.mapLink,
              bookingLink: data.bookingLink
            }))}
          />
        );
      case 'bus':
        return busData && <BusSection routes={busData.routes || []} />;
      case 'car':
        return carData && (
          <CarSection 
            routes={carData.routes || []}
            onLocationSelect={handleLocationSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={tripData.image}
          alt={tripData.place}
          className="w-full h-[50vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <button
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-white transition-all"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            {tripData.is_trending && (
              <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star size={14} /> Trending
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {tripData.trip_type}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{tripData.place}</h1>
          <p className="text-white/90 text-lg">{tripData.short_description}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Facts Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickFacts.map((fact, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {fact.icon && iconMap[fact.icon] && React.createElement(iconMap[fact.icon], {
                    size: 20,
                    className: "text-blue-600"
                  })}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{fact.label}</p>
                  <p className="font-semibold text-gray-800">{fact.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* What Makes It Special */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">What Makes {tripData.place} Special</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <highlight.icon size={20} className={highlight.color} />
                    <span className="text-gray-700">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Experience {tripData.place}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {tripData.long_description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tripData.popular_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* How to Reach */}
            {availableTransport.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">How to Reach {tripData.place}</h2>
                
                {/* Transport Mode Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {availableTransport.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedTransport(option.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        selectedTransport === option.id
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <option.icon size={18} />
                      <span className="font-medium">{option.name}</span>
                    </button>
                  ))}
                </div>

                {/* Transport Section */}
                {renderTransportSection()}
              </div>
            )}
          </div>

          {/* Right Column - Travel Tips */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
              <h3 className="font-bold text-gray-800 mb-4">⚠️ Important Tips</h3>
              <ul className="space-y-3 text-sm">
                {importantTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">🎒 What to Pack</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {whatToPack.map((item, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-center">{item}</div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="font-bold text-gray-800 mb-3">{bestExperience.title}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {bestExperience.description}
              </p>
              <div className="bg-white/50 rounded-lg p-3 text-xs text-gray-600">
                {bestExperience.highlights.join(" + ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KinnaurDetails;