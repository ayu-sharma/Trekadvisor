"use client";

import Button from "./Button";

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "locations", label: "Locations" },
    { id: "experiences", label: "Experiences" },
    { id: "seasons", label: "Seasons" }
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "primary" : "secondary"}
          size="small"
          className="whitespace-nowrap"
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
} 