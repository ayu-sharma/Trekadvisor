"use client";

export default function HeroSection({ name, coverImage, summary }) {
  return (
    <div className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-800/70 to-green-900/90 z-10"></div>
      <img 
        src={coverImage} 
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transform scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white p-8 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{name}</h1>
          <div className="w-24 h-1 bg-green-300 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl font-light">{summary}</p>
        </div>
      </div>
    </div>
  );
} 