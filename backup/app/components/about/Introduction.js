export default function Introduction() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">The Abode of Snow</h2>
          <p className="text-lg mb-4">
            Nestled in the western Himalayas, Himachal Pradesh is a mountainous state known for its breathtaking landscapes, 
            rich biodiversity, and cultural heritage. The name "Himachal" literally means "the abode of snow" in Sanskrit.
          </p>
          <p className="text-lg">
            From dense cedar forests to snow-capped peaks, from ancient temples to colonial architecture, 
            Himachal Pradesh offers a diverse tapestry of experiences that have made it one of India's most 
            beloved tourist destinations.
          </p>
        </div>
        <div className="md:w-1/2 h-64 md:h-96 relative rounded-lg overflow-hidden shadow-xl">
          <img src="/api/placeholder/600/400" alt="Scenic view of Himachal Valley" className="object-cover w-full h-full" />
        </div>
      </div>
    </section>
  );
} 