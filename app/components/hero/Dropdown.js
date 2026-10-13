"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Search, MapPin, TrendingUp } from "lucide-react";
import tredLocations from "../../constants/tredLocations";

export default function Dropdown({ onClose, onSelect }) {
  const [query, setQuery] = useState("");

  // Close on Escape and lock page scroll while open
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const filtered = tredLocations.filter(
    (loc) =>
      loc.title.toLowerCase().includes(query.toLowerCase()) ||
      loc.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl mt-16 mb-8 mx-4 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <Search className="h-5 w-5 text-gray-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to go?"
            className="flex-1 outline-none text-lg text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Destinations */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            <TrendingUp size={16} className="text-green-600" />
            {query ? "Matching destinations" : "Popular destinations"}
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-500 py-8 text-center">
              No destinations found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((loc) => (
                <button
                  key={loc.title}
                  onClick={() => onSelect(loc.title)}
                  className="group text-left rounded-xl overflow-hidden border border-gray-100 hover:border-green-500 transition-colors duration-300 cursor-pointer"
                >
                  <div className="relative h-28 w-full overflow-hidden">
                    <Image
                      src={loc.image}
                      alt={loc.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-1 font-semibold text-gray-800 group-hover:text-green-600">
                      <MapPin size={14} className="text-green-600 shrink-0" />
                      {loc.title}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{loc.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
