import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old"
    },
    {
      id: 2,
      content: "Very simple to understand. Superb content. Would love to sign up for more courses and will recommend them to others.",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old"
    },
    {
      id: 3,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old"
    },
    {
      id: 4,
      content: "Such a wonderful session. Brilliant! Understanding the growth of children with proven science is a must for 2k parents.",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old",
      hasImage: true
    },
    {
      id: 5,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old"
    },
    {
      id: 6,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old",
      hasImage: true
    },
    {
      id: 7,
      content: "Such a good session. Brilliant! Understanding growth of a child with proven science.",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old"
    },
    {
      id: 8,
      content: "Excellent. Sensible. Honest & To the point",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old",
      hasImage: true
    },
    {
      id: 9,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old",
      hasImage: true
    },
    {
      id: 10,
      content: "Very simple to understand. Superb content. Would love to sign up for more courses and will recommend them to others.",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old"
    },
    {
      id: 11,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old"
    },
    {
      id: 12,
      content: "Such a wonderful session. Brilliant! Understanding the growth of children with proven science is a must.",
      author: "Pranjal Gupta",
      role: "Parent of a 8 yr old",
      hasImage: true
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold inline-flex items-center justify-center">
            Wall of <span className="text-pink-500 ml-2">❤</span>
          </h1>
          <p className="text-gray-600 mt-2">from 5000+ Curious Parents</p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                testimonial.hasImage ? "row-span-1" : ""
              }`}
            >
              {testimonial.hasImage && (
                <div className="h-40 bg-gray-200 relative">
                  {/* This is where the image would be, replaced with a colored div */}
                </div>
              )}
              <div className="p-6">
                <p className="text-gray-800 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}