"use client";

import Image from "next/image";
import { Star, MapPin, Clock } from "lucide-react";
import { PACKAGES } from "@/app/constants/packages";
import Button from '../ui/Button';

export default function PopularPackages() {
  return (
    <div className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Most Popular Packages</h2>
          <p className="text-gray-600 mt-2">Discover the tours chosen by thousands of travelers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative">
                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                  {pkg.soldCount}+ sold
                </div>
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  width={400}
                  height={225}
                  className="w-full h-52 object-cover"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium ml-1">{pkg.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">Best Seller</span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-1">{pkg.name}</h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin size={14} className="mr-1" />
                  <span>{pkg.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock size={14} className="mr-1" />
                  <span>{pkg.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">{pkg.price}</span>
                    <span className="text-sm text-gray-500">/person</span>
                  </div>
                  
                  <Button variant="default">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}