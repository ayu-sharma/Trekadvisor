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
  className="col-span-4 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
    style={{
      backgroundImage: `url("images/home/pangi.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  
  {/* Overlay Layer */}
  <div 
    className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 transition-opacity duration-300"
  />
  
  {/* Content goes here */}
  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
  </div>

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Pangi Valley</h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Forgotten Valley</span>
              </div>
            </div>

            {/* Manali - Center Large */}
           <div 
  className="col-span-4 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20"
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.2]"
    style={{
      backgroundImage: `url("images/home/barot.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  
  {/* Overlay Layer */}
  <div 
    className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 transition-opacity duration-300"
  />
  
  {/* Content goes here */}
  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
    {/* Your content here */}
  </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">Barot Valley</h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Secret Escape</span>
              </div>
            </div>

            {/* Kasol - Top Right */}
            <div 
  className="col-span-4 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20"
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.2]"
    style={{
      backgroundImage: `url("images/home/kugti.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  
  {/* Overlay Layer */}
  <div 
    className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 transition-opacity duration-300"
  />
  
  {/* Content goes here */}
  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
    {/* Your content here */}
  </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Kugti Valley</h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Secret Pastures</span>
              </div>
            </div>

            {/* Dharamshala - Bottom Left */}
          <div 
  className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.2]"
    style={{
      backgroundImage: `url("images/home/churah.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  
  {/* Overlay Layer */}
  <div 
    className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 transition-opacity duration-300"
  />
  
  {/* Content goes here */}
  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
    {/* Your content here */}
  </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Churah Valley</h3>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-xs font-medium">Untouched Beauty</span>
              </div>
            </div>

            {/* Kinnaur - Bottom Center Left */}
           <div 
  className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.2]"
    style={{
      backgroundImage: `url("images/home/bathu.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  
  {/* Overlay Layer */}
  <div 
    className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 transition-opacity duration-300"
  />
  
  {/* Content goes here */}
  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
    {/* Your content here */}
  </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Bathu Ki Ladi</h3>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-xs font-medium">Drowned Heritage</span>
              </div>
            </div>

            {/* Malana - Bottom Right */}
           <div 
  className="col-span-4 row-span-1 rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20"
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.2]"
    style={{
      backgroundImage: `url("images/home/rancer.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  
  {/* Overlay Layer */}
  <div 
    className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 transition-opacity duration-300"
  />
  
  {/* Content goes here */}
  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
    {/* Your content here */}
  </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Rancer Island</h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Hidden Isle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenGems;