"use client";

import Image from "next/image";
import { Mountain } from "lucide-react";

export default function TrekCard({ name, image, altitude, features = [] }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer">
      <div className="relative h-56 w-full shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 80vw, 320px"
          className="object-cover"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
          <Mountain size={14} className="text-lime-300" />
          {altitude}
        </div>
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
          {name}
        </h3>
        <div className="flex flex-wrap gap-2 mt-3">
          {features.map((feature) => (
            <span
              key={feature}
              className="text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
