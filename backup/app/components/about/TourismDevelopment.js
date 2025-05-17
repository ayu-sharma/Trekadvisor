import { tourismDevelopmentData } from '../../constants/tourismDevelopmentData';

export default function TourismDevelopment() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-800">Evolution of Tourism in Himachal Pradesh</h2>
        
        <div className="flex flex-col items-center">
          {tourismDevelopmentData.map((item, index) => (
            <div key={index} className="w-full max-w-md">
              <div className="bg-green-100 p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-2 text-center">{item.period}</h3>
                <p className="text-center">{item.description}</p>
                <div className="mt-4">
                  <img 
                    src={item.imageUrl} 
                    alt={item.imageAlt}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-center text-green-700 italic">{item.caption}</p>
                </div>
                {index !== tourismDevelopmentData.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-0.5 h-12 bg-green-800"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 