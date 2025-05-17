"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: "Ayush Sharma",
    role: "Co-Founder & Lead Developer",
    location: "Jasur, Kangra, Himachal Pradesh",
    phone: "+91 9015063856",
    email: "ayushsharma@trekadvisor.com",
    education: "Computer Science Engineering",
    image: "/images/about/user1.png",
    bio: "Passionate about his home state Himachal Pradesh, Ayush combines his technical expertise with deep knowledge of local culture and hidden treasures to create authentic travel experiences.",
    socials: {
      linkedin: "https://linkedin.com/in/ayushsharma",
      github: "https://github.com/ayushsharma"
    }
  },
  {
    id: 2,
    name: "Munish Thakur",
    role: "Co-Founder & Experience Designer",
    location: "Hamirpur, Himachal Pradesh",
    phone: "+91 6284589934",
    email: "munishthakur@trekadvisor.com",
    education: "UI/UX Design & Tourism Management",
    image: "/images/about/user2.jpg",
    bio: "A native of Hamirpur with extensive hiking experience across Himachal, Munish brings local insights and creativity to every itinerary and digital experience on TrekAdvisor.",
    socials: {
      linkedin: "https://linkedin.com/in/munishthakur",
      github: "https://github.com/munishthakur"
    }
  }
];

export default function Team() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-green-600 font-medium"
          >
            THE MINDS BEHIND TREKADVISOR
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mt-2"
          >
            Meet Our Team
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '120px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 bg-green-500 mx-auto mt-6 mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-slate-600"
          >
            Born and raised in the Himalayan landscapes of Himachal Pradesh, our founders combine deep local knowledge with technical expertise to bring you authentic travel experiences.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-green-100 flex flex-col h-full"
            >
              <div className="relative h-72 bg-green-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    // Use static placeholder
                    e.currentTarget.src = `/images/placeholder.svg`;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-white text-2xl font-bold">{member.name}</h3>
                    <p className="text-green-300 font-medium">{member.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={member.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-green-600 transition-colors"
                    >
                      <Linkedin size={18} className="text-white" />
                    </a>
                    <a 
                      href={member.socials.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-green-600 transition-colors"
                    >
                      <Github size={18} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <p className="text-slate-600 mb-6">{member.bio}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <MapPin size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Location</p>
                      <p className="text-slate-500">{member.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Phone size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Phone</p>
                      <p className="text-slate-500">{member.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Mail size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Email</p>
                      <p className="text-slate-500">{member.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 max-w-2xl mx-auto">
            As locals born and raised in Himachal Pradesh, we've spent years exploring every corner of this beautiful state. Our mission is to share our intimate knowledge and help you discover the authentic Himachal beyond the tourist trail.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 