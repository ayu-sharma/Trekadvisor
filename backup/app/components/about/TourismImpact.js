export default function TourismImpact() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-700 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Impact of Tourism</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Economic Benefits</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">✓</span>
                <span>Tourism contributes approximately 7-8% to the state's GDP</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">✓</span>
                <span>Direct employment to over 400,000 people</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">✓</span>
                <span>Development of local handicrafts and artisanal products</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">✓</span>
                <span>Infrastructure development including roads, electricity, and water supply</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">✓</span>
                <span>Growth of hospitality, transportation, and service sectors</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Environmental Considerations</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">!</span>
                <span>Increased pressure on natural resources and biodiversity</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">!</span>
                <span>Waste management challenges in popular tourist areas</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">!</span>
                <span>Deforestation for infrastructure development</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">✓</span>
                <span>Growing focus on eco-tourism and sustainable practices</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-300">✓</span>
                <span>Conservation efforts to protect the unique ecosystem</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 