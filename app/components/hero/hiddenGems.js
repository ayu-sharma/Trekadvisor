import React from 'react';
import destinations from '../../constants/hiddenGems';

const HiddenGems = () => {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen my-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Hidden Gems</h1>
          <p className="text-lg text-gray-600">Discover the untouched beauty of Himachal Pradesh</p>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[600px] min-w-[1200px]">
            {/* Spiti Valley - Top Left */}
            <div 
              className="col-span-4 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${destinations[0].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[0].name}</h3>
                <p className="text-lg opacity-90">{destinations[0].price}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Mountain Desert</span>
              </div>
            </div>

            {/* Manali - Center Large */}
            <div 
              className="col-span-4 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${destinations[1].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{destinations[1].name}</h3>
                <p className="text-xl opacity-90">{destinations[1].price}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Snow Paradise</span>
              </div>
            </div>

            {/* Kasol - Top Right */}
            <div 
              className="col-span-4 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${destinations[2].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[2].name}</h3>
                <p className="text-lg opacity-90">{destinations[2].price}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Mini Israel</span>
              </div>
            </div>

            {/* Dharamshala - Bottom Left */}
            <div 
              className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${destinations[3].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">{destinations[3].name}</h3>
                <p className="text-sm opacity-90">{destinations[3].price}</p>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-xs font-medium">Dalai Lama</span>
              </div>
            </div>

            {/* Kinnaur - Bottom Center Left */}
            <div 
              className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${destinations[4].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">{destinations[4].name}</h3>
                <p className="text-sm opacity-90">{destinations[4].price}</p>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-xs font-medium">Apple Valley</span>
              </div>
            </div>

            {/* Malana - Bottom Right */}
            <div 
              className="col-span-4 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${destinations[5].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[5].name}</h3>
                <p className="text-lg opacity-90">{destinations[5].price}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Ancient Village</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenGems;