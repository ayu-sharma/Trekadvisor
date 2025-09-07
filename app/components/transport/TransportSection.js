"use client";
import React from 'react';
import TransportCard from './TransportCard';
import RouteMap from './RouteMap';

const TransportSection = ({
  title,
  icon: Icon,
  description,
  options,
  className = ""
}) => {
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 ${className}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="text-blue-600" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
          
          <div className="space-y-4">
            {options.map((option, index) => (
              <TransportCard
                key={index}
                {...option}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportSection; 