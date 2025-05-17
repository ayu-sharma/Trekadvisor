"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", href: "/" },
        { name: "Hidden Gems", href: "/hidden-gems" },
        { name: "Popular Treks", href: "/treks" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Destinations",
      links: [
        { name: "Shimla", href: "/destinations/shimla" },
        { name: "Manali", href: "/destinations/manali" },
        { name: "Dharamshala", href: "/destinations/dharamshala" },
        { name: "Spiti Valley", href: "/destinations/spiti" },
        { name: "Kinnaur", href: "/destinations/kinnaur" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Travel Guide", href: "/guide" },
        { name: "Packing List", href: "/packing-list" },
        { name: "Weather", href: "/weather" },
        { name: "FAQs", href: "/faqs" },
        { name: "Terms & Conditions", href: "/terms" }
      ]
    }
  ];

  return (
    <footer className="bg-slate-800 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-green-400">Trek</span>Advisor
            </h3>
            <p className="text-slate-300 mb-4">
              Your guide to exploring the breathtaking landscapes and hidden treasures of Himachal Pradesh.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="bg-slate-700 p-2 rounded-full hover:bg-green-600 transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="bg-slate-700 p-2 rounded-full hover:bg-green-600 transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="bg-slate-700 p-2 rounded-full hover:bg-green-600 transition-colors">
                <Instagram size={18} />
              </Link>
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-green-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-slate-700 pt-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 text-sm mb-8">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-green-400" />
              <span>123 Adventure Road, Dharamshala, HP 176215</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-green-400" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-green-400" />
              <span>info@trekadvisor.com</span>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
          <p>© {currentYear} TrekAdvisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 