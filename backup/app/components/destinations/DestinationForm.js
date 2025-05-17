"use client";

import { useState } from "react";
import Image from "next/image";
import { DESTINATIONS } from "../../constants/famousPackage";
import Button from "../ui/Button";

export default function DestinationForm() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      destination: selectedDestination,
      date: selectedDate,
      duration: selectedDuration,
      budget: selectedBudget
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">Plan Your Trip</h3>
        <p className="text-gray-600">Fill in the details to find the perfect package</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Destination Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Destination</label>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Destination</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Travel Date</label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 hover:border-green-500 transition-all">
            <Image
              src="/images/hero/calendar.svg"
              alt="Calendar icon"
              width={20}
              height={20}
              className="text-green-600"
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Duration Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Duration</label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Duration</option>
            <option value="3">3 Days</option>
            <option value="5">5 Days</option>
            <option value="7">7 Days</option>
            <option value="10">10 Days</option>
          </select>
        </div>

        {/* Budget Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Budget Range</label>
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Budget</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-15000">₹10,000 - ₹15,000</option>
            <option value="15000-20000">₹15,000 - ₹20,000</option>
            <option value="20000+">₹20,000+</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-3 text-lg"
      >
        Find Packages
      </Button>
    </form>
  );
} 