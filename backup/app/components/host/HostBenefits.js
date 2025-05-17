"use client";

import React from 'react';
import { DollarSign, Users, MapPin, Clock } from 'lucide-react';

const benefits = [
  {
    icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
    title: "Earn Money",
    description: "Turn your passion into profit by sharing your local expertise with travelers."
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    title: "Meet New People",
    description: "Connect with travelers from around the world and share your culture."
  },
  {
    icon: <MapPin className="w-6 h-6 text-emerald-600" />,
    title: "Showcase Your Area",
    description: "Highlight the unique aspects of your location and hidden gems."
  },
  {
    icon: <Clock className="w-6 h-6 text-emerald-600" />,
    title: "Flexible Schedule",
    description: "Set your own schedule and work when it's convenient for you."
  }
];

const HostBenefits = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Why Become a Host?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{benefit.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-800 mb-3">Requirements</h4>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
            Valid identification
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
            Local knowledge and expertise
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
            Good communication skills
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
            Passion for sharing experiences
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HostBenefits; 