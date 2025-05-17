"use client";

const stats = [
  {
    value: '50+',
    label: 'Destinations',
    description: 'Across Himachal'
  },
  {
    value: '10K+',
    label: 'Happy Travelers',
    description: 'This Season'
  },
  {
    value: '4.8',
    label: 'Average Rating',
    description: 'From Our Customers'
  },
  {
    value: '24/7',
    label: 'Support',
    description: 'Always Available'
  }
];

export default function TravelStats() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-green-600">{stat.value}</div>
            <div className="text-lg font-semibold text-gray-800">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 