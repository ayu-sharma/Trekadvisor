"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Users, Clock, MapPin, Phone, Mail, Send } from 'lucide-react';

export default function EnquirySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    people: '',
    destination: '',
    startDate: '',
    message: ''
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('enquiry-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      people: '',
      destination: '',
      startDate: '',
      message: ''
    });
  };
  
  return (
    <section id="enquiry-section" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <Image 
          src="/images/hero/mountains.svg" 
          alt="Mountains pattern" 
          fill 
          className="object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Plan Your <span className="text-green-600">Himalayan</span> Adventure
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Let us help you create a personalized journey through the breathtaking landscapes of Himachal Pradesh. 
            Fill out the form below and our travel experts will get back to you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.7 }}
            className="bg-green-50 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <MapPin size={24} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Office Address</h4>
                  <p className="text-slate-600">123 Adventure Road, Dharamshala, Himachal Pradesh 176215</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Phone size={24} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Phone</h4>
                  <p className="text-slate-600">+91 98765 43210</p>
                  <p className="text-slate-600">+91 98765 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Mail size={24} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Email</h4>
                  <p className="text-slate-600">info@trekadvisor.com</p>
                  <p className="text-slate-600">bookings@trekadvisor.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Why Choose Us?</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">✓</div>
                  <div>Expert local guides with extensive knowledge of Himachal Pradesh</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">✓</div>
                  <div>Customized itineraries based on your preferences and interests</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">✓</div>
                  <div>24/7 support during your adventure</div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-2">✓</div>
                  <div>Sustainable and responsible tourism practices</div>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Right: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Enquiry Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-slate-700 mb-1">
                    Number of People
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="number"
                      id="people"
                      name="people"
                      value={formData.people}
                      onChange={handleChange}
                      min="1"
                      className="w-full pl-10 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="2"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">
                    Preferred Start Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred Destination
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-slate-400" />
                  </div>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select a destination</option>
                    <option value="Manali">Manali</option>
                    <option value="Shimla">Shimla</option>
                    <option value="Dharamshala">Dharamshala</option>
                    <option value="Kasol">Kasol</option>
                    <option value="Spiti Valley">Spiti Valley</option>
                    <option value="Kinnaur">Kinnaur</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Tell us about your trip preferences, special requirements, or any questions you have..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                Send Enquiry <Send size={18} className="ml-2" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 