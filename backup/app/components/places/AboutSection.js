"use client";

import { Info } from 'lucide-react';

export default function AboutSection({ name, description }) {
  return (
    <div className="mb-10 bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-600">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-100 rounded-full mr-4">
          <Info className="text-green-600 w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-green-900">About {name}</h2>
      </div>
      <p className="text-slate-600 text-lg leading-relaxed">{description}</p>
    </div>
  );
} 