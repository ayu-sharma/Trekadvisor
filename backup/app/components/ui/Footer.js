"use client";

import { Globe, Instagram, Twitter, Facebook, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Globe size={24} className="text-teal-400 mr-2" />
              <span className="text-xl font-bold">TravelEase</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted companion for exploring the beautiful destinations of Himachal Pradesh. We bring you authentic experiences and local insights.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4">Explore Himachal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400">Popular Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400">Local Experiences</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400">Travel Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400">Seasonal Guide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start text-gray-400">
                <MapPin size={18} className="mr-2 text-teal-400" />
                <span> Himachal Pradesh, India</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-400">
                <Mail size={18} className="mr-2 text-teal-400" />
                <span>hello@travelease.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Attribution */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <p className="text-center text-gray-500 text-sm">
            Location information and ratings are sourced from Google Maps 
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-teal-400">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400">Terms of Service</a>
            <a href="#" className="hover:text-teal-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;