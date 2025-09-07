"use client";
import React from 'react';
import { Clock, Calendar, Check, MapPin } from 'lucide-react';

const TransportCard = ({ 
  title, 
  description, 
  fare, 
  duration, 
  frequency, 
  features, 
  bookingLink, 
  bookingText = "Book Now",
  className = ""
}) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-4 border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-medium text-gray-800">{title}</h5>
        {fare && <span className="text-sm font-semibold text-blue-600">{fare}</span>}
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}
      
      <div className="space-y-2 mb-3">
        {duration && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-2 text-gray-500" />
            <span>{duration}</span>
          </div>
        )}
        {frequency && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-2 text-gray-500" />
            <span>{frequency}</span>
          </div>
        )}
      </div>

      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {features.map((feature, idx) => (
            <span key={idx} className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              <Check size={12} className="mr-1" />
              {feature}
            </span>
          ))}
        </div>
      )}

      {bookingLink && (
        <a
          href={bookingLink.startsWith('http') ? bookingLink : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          {bookingText}
        </a>
      )}
    </div>
  );
};

export default TransportCard; 