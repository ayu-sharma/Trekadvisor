"use client";
import React from 'react';
import { BadgeCheck, MapPin, Star } from 'lucide-react';

const tripData = {
  place: "Kinnaur",
  min_days: 4,
  trip_type: "Adventurous",
  short_description: "Snowy valleys, rugged terrain, perfect for adventure seekers.",
  tags: ["trending", "mountains", "trekking"],
  image: "https://images.unsplash.com/photo-1608623297751-fdcff38a8c7d", // Replace with your preferred image
  is_trending: true,
  popular_tags: ["nature", "hiking", "snow"],
  how_to_reach: "Take a bus or drive from Shimla via NH5.",
  long_description:
    "Kinnaur is known for its scenic mountain beauty, apple orchards, and adventurous roads. Ideal for thrill-seekers who love nature and offbeat destinations."
};

const TripCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <img src={tripData.image} alt={tripData.place} className="w-full h-56 object-cover" />
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{tripData.place}</h2>
          {tripData.is_trending && (
            <span className="text-sm px-2 py-1 bg-pink-100 text-pink-600 rounded-full flex items-center gap-1">
              <Star size={14} /> Trending
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{tripData.short_description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tripData.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500 pt-1 flex items-center gap-1">
          <MapPin size={14} /> Min Days: {tripData.min_days}
        </div>
        <button className="mt-4 w-full py-2 text-center bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default TripCard;
