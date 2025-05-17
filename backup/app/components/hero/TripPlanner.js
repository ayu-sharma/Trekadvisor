"use client";

import { useState } from "react";
import Image from "next/image";
import Tabs from "./Tabs";
import FormFields from "./FormFields";
import DestinationPreview from "./DestinationPreview";
import TravelPerks from "./TravelPerks";

export default function TripPlanner() {
  const [activeTab, setActiveTab] = useState("locations");

  return (
    <div className="lg:col-span-8 relative">
      {/* FEATURED TRIP PLANNER CARD - Given more prominence */}
      <div className="bg-white rounded-xl shadow-xl p-6 relative z-20 border-2 border-green-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-slate-800 font-bold text-base md:text-xl lg:text-2xl">Explore the 12 diverse districts of Himachal Pradesh</h2>
        </div>
        <FormFields />
      </div>
    </div>
  );
} 