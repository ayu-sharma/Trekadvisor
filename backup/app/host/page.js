"use client";

import React from 'react';
import Navbar from '../components/ui/Navbar';
import HostForm from '../components/host/HostForm';
import HostBenefits from '../components/host/HostBenefits';

export default function HostPage() {
  return (
    <main>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Become a Host</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your unique experiences and earn money by hosting tours and activities in your area.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <HostForm />
            </div>
            <div>
              <HostBenefits />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
