"use client";

import React, { useState } from 'react';
import Button from '../ui/Button';

const amenities = [
  { id: 'transportation', label: 'Transportation' },
  { id: 'meals', label: 'Meals Included' },
  { id: 'guide', label: 'Tour Guide' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'insurance', label: 'Travel Insurance' },
  { id: 'equipment', label: 'Equipment Provided' },
  { id: 'wifi', label: 'WiFi Access' },
  { id: 'water', label: 'Drinking Water' },
  { id: 'firstAid', label: 'First Aid Kit' },
  { id: 'permits', label: 'Required Permits' }
];

const HostForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phoneNumber: '',
    tourName: '',
    price: '',
    date: '',
    email: '',
    location: '',
    amenities: amenities.reduce((acc, amenity) => ({
      ...acc,
      [amenity.id]: ''
    }), {})
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('amenity_')) {
      const amenityId = name.replace('amenity_', '');
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [amenityId]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Host Information</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="tourName" className="block text-sm font-medium text-gray-700 mb-1">
              Tour Name
            </label>
            <input
              type="text"
              id="tourName"
              name="tourName"
              value={formData.tourName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price per Person
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Tour Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Tour Amenities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="bg-gray-50 p-3 rounded-lg">
                <label htmlFor={`amenity_${amenity.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                  {amenity.label}
                </label>
                <select
                  id={`amenity_${amenity.id}`}
                  name={`amenity_${amenity.id}`}
                  value={formData.amenities[amenity.id]}
                  onChange={handleChange}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default HostForm; 