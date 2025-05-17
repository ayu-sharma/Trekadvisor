"use client";

import Image from "next/image";

export default function TravelPerks() {
  const perks = [
    {
      icon: "/images/hero/safe-travel.svg",
      title: "Safe Travel",
      color: "blue"
    },
    {
      icon: "/images/hero/best-prices.svg",
      title: "Best Prices",
      color: "green"
    },
    {
      icon: "/images/hero/support.svg",
      title: "24/7 Support",
      color: "yellow"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mt-6">
      {perks.map((perk, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className={`w-10 h-10 flex items-center justify-center bg-${perk.color}-100 text-${perk.color}-600 rounded-full mb-2`}>
            <Image
              src={perk.icon}
              alt={`${perk.title} icon`}
              width={20}
              height={20}
            />
          </div>
          <p className="text-xs font-medium text-slate-600">{perk.title}</p>
        </div>
      ))}
    </div>
  );
} 