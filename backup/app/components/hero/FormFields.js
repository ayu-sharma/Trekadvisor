"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import Button from "../ui/Button";

export default function FormFields() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const districts = [
    { id: "shimla", name: "Shimla" },
    { id: "kullu", name: "Kullu" },
    { id: "kangra", name: "Kangra" },
    { id: "mandi", name: "Mandi" },
    { id: "chamba", name: "Chamba" },
    { id: "solan", name: "Solan" },
    { id: "sirmaur", name: "Sirmaur" },
    { id: "bilaspur", name: "Bilaspur" },
    { id: "hamirpur", name: "Hamirpur" },
    { id: "una", name: "Una" },
    { id: "kinnaur", name: "Kinnaur" },
    { id: "lahaul-spiti", name: "Lahaul and Spiti" }
  ];

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
  };

  const handleFindDestinations = () => {
    if (selectedDistrict) {
      router.push(`/place?district=${selectedDistrict}`);
    } else {
      alert("Please select a district first");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start">
        <Dropdown
          icon="/images/hero/location.svg"
          placeholder="Select District"
          options={districts}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="bg-white z-[30] w-full items-start" 
        />
      </div>

      <Button
        variant="default"
        onClick={handleFindDestinations}
        disabled={!selectedDistrict}
        className={`w-full flex items-center justify-center gap-2 ${
          !selectedDistrict ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Search 
          size={20}
          className="brightness-0 invert"
        />
        Find Destinations
      </Button>
    </div>
  );
}