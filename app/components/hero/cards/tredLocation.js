import React from 'react'

export default function TredLocation({ image, title, subtitle, className }) {
  return (
    <div className={`relative w-72 h-56 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 ${className}`}>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {subtitle && (
          <span className="text-white text-sm font-semibold tracking-widest mb-2 drop-shadow-md">
            {subtitle}
          </span>
        )}
        <span className="text-white text-3xl font-bold drop-shadow-lg">
          {title}
        </span>
      </div>
    </div>
  )
}