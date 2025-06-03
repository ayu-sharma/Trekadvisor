"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import Button from "../ui/Button";

export default function FormFields() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState("");

  

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
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-start">
        <Dropdown
          icon="/images/hero/location.svg"
          placeholder="Select District"
          options={districts}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className=" z-[30] w-full items-start" 
        />
      </div>
    </div>
  );
}