"use client";

import Image from "next/image";

export default function DestinationPreview() {
  const destinations = [
    {
      name: "Rohtang Pass",
      location: "Manali",
      rating: 5,
      image: "/images/1.png"
    },
    {
      name: "Shimla",
      location: "Old Town",
      rating: 4,
      image: null
    },
    {
      name: "McLeod Ganj",
      location: "Dharamshala",
      rating: 5,
      image: null
    }
  ];

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {destinations.map((destination, index) => (
        <div key={index} className="relative rounded-lg overflow-hidden h-32 shadow-md group cursor-pointer sm:block hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
          {destination.image && (
            <Image
              src={destination.image}
              alt={destination.name}
              width={300}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute bottom-2 left-2 z-20 text-white">
            <div className="flex items-center mb-1">
              {[...Array(destination.rating)].map((_, i) => (
                <Image
                  key={i}
                  src="/images/hero/star.svg"
                  alt="Star rating"
                  width={12}
                  height={12}
                  className="text-yellow-400"
                />
              ))}
            </div>
            <h3 className="text-sm font-bold">{destination.name}</h3>
            <p className="text-xs text-slate-200">{destination.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 