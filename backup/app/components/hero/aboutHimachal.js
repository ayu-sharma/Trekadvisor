"use client";

import Image from "next/image";
import himachalSceneries from "@/app/constants/himachalSceneries";
import SwipableCard from './SwipableCard';
import { Mountain, Landmark, Tent, Utensils } from "lucide-react";

export default function AboutHimachal() {
  const features = [
    {
      title: "Breathtaking Landscapes",
      description: "Home to majestic Himalayan peaks, lush valleys, and pristine rivers that create a paradise for nature lovers.",
      icon: <Mountain className="text-blue-500" size={24} />
    },
    {
      title: "Rich Cultural Heritage",
      description: "Experience centuries-old temples, vibrant local festivals, and traditional Pahadi lifestyle.",
      icon: <Landmark className="text-blue-500" size={24} />
    },
    {
      title: "Adventure Paradise",
      description: "From trekking and paragliding to river rafting and skiing, Himachal offers thrills for every adventure seeker.",
      icon: <Tent className="text-blue-500" size={24} />
    },
    {
      title: "Culinary Delights",
      description: "Savor authentic mountain cuisine with dishes like Dham, Madra, Siddu, and Babru that tantalize your taste buds.",
      icon: <Utensils className="text-blue-500" size={24} />
    }
  ];
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Discover Himachal Pradesh</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Known as "Dev Bhoomi" or the Land of Gods, Himachal Pradesh is a mountainous state in northern India renowned for its stunning landscapes and vibrant culture.
          </p>
        </div>

        {/* Main content with image and text */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="w-full lg:w-1/2 relative h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/mountains.jpeg" // Replace with actual image path
              alt="Panoramic view of Himachal Pradesh mountains"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">A World of Natural Wonder</h3>
            <p className="text-gray-600">
              Nestled in the western Himalayas, Himachal Pradesh captivates visitors with its diverse landscapes ranging from snow-capped mountains and dense forests to meandering rivers and verdant valleys.
            </p>
            <p className="text-gray-600">
              The state spans altitudes from 350 to 7,000 meters above sea level, creating distinct climate zones that support incredible biodiversity and offer year-round travel opportunities.
            </p>
            <p className="text-gray-600">
              Whether you seek spiritual solace, adventure thrills, or simply a peaceful retreat in nature's lap, Himachal's 12 diverse districts each offer their own unique charm and attractions.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Image gallery */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-8">Glimpses of Himachal</h3>
          <div className="md:hidden">
            <SwipableCard images={himachalSceneries} />
          </div>
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-4">
            {himachalSceneries.map((scenery) => (
              <div key={scenery.id} className="relative h-52 lg:h-64 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={scenery.src}
                  alt={scenery.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Plan Your Himalayan Adventure</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Explore the 12 diverse districts of Himachal Pradesh and discover the perfect destination for your next journey.
          </p>
        </div>
      </div>
    </section>
  );
}