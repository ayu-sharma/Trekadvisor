import { regionsData } from '../../constants/regionsData';

export default function TouristDestinations() {
  return (
    <section className="py-16 px-4 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-800">{regionsData.title}</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          {regionsData.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regionsData.regions.map((region, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 relative">
                <img 
                  src={region.imageUrl} 
                  alt={region.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{region.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{region.description}</p>
                <div className="flex flex-wrap gap-2">
                  {region.attractions.map((attraction, i) => (
                    <span 
                      key={i} 
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
                    >
                      {attraction}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 