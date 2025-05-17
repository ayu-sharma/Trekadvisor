"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Anjali Sharma",
    location: "Mumbai, Maharashtra",
    image: "/images/about/user1.jpg",
    rating: 5,
    testimonial: "Our Himalayan trek was life-changing. The team's knowledge of hidden trails and local culture made this journey unforgettable. From snow-capped mountains to peaceful valleys, every moment was perfect."
  },
  {
    id: 2,
    name: "Rohit Patel",
    location: "Ahmedabad, Gujarat",
    image: "/images/about/user2.jpg",
    rating: 5,
    testimonial: "As a first-time trekker, I was nervous, but the guides made me feel at ease. The breathtaking views of Hampta Pass and the well-planned itinerary exceeded my expectations. Can't wait to come back!"
  },
  {
    id: 3,
    name: "Priya Mehta",
    location: "Bangalore, Karnataka",
    image: "/images/about/user3.jpg",
    rating: 4,
    testimonial: "My family's trip to Himachal was magical! From apple orchards to pristine lakes, we experienced nature at its finest. The local homestay experience gave us authentic insights into mountain life."
  },
  {
    id: 4,
    name: "Arjun Singh",
    location: "Delhi, NCR",
    image: "/images/about/user4.jpg",
    rating: 5,
    testimonial: "The Triund Trek was absolutely spectacular. The guides were knowledgeable and friendly, and the arrangements were flawless. Watching the sunset from the summit was a moment I'll cherish forever."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const maxIndex = testimonials.length - 1;
  const testimonialRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }
    
    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current);
      }
    };
  }, []);
  
  const nextTestimonial = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };
  
  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };
  
  return (
    <section ref={testimonialRef} className="py-16 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            What Our <span className="text-green-600">Travelers</span> Say
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Hear from travelers who have experienced the magic of Himachal Pradesh with us. 
            Real stories from real adventurers.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div 
              className="transition-all duration-500 ease-in-out"
              style={{
                display: 'flex',
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${testimonials.length * 100}%`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex flex-col md:flex-row p-6 md:p-10"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center md:items-start">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{testimonial.name}</h3>
                    <p className="text-sm text-slate-500 mb-2">{testimonial.location}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < testimonial.rating ? "#16a34a" : "none"} 
                          color={i < testimonial.rating ? "#16a34a" : "#d1d5db"}
                          className="mr-1"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-green-200 opacity-50 text-6xl font-serif">"</div>
                      <p className="relative z-10 text-slate-700 italic leading-relaxed pt-4">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button 
                onClick={prevTestimonial}
                className="bg-white rounded-full p-2 shadow-md hover:bg-green-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} className="text-green-600" />
              </button>
            </div>
            
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button 
                onClick={nextTestimonial}
                className="bg-white rounded-full p-2 shadow-md hover:bg-green-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} className="text-green-600" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-green-600 w-6' : 'bg-green-200'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 