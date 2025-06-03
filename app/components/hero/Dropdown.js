import { useState } from "react";
import { X, Search } from "lucide-react";

// Simple Button component since we don't have access to the external one
const Button = ({ children, onClick, className = "", variant = "normal" }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50";
  const variantClasses = {
    normal: "bg-transparent hover:bg-gray-100",
    text: "bg-transparent hover:bg-gray-50"
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default function Dropdown({ onClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  
  const destinations = [
    { id: "shimla", name: "Shimla", tag: "MOST POPULAR", tagColor: "bg-green-100 text-green-700" },
    { id: "kullu", name: "Kullu", tag: "IN SEASON", tagColor: "bg-blue-100 text-blue-700" },
    { id: "kangra", name: "Kangra", tag: "TRENDING", tagColor: "bg-purple-100 text-purple-700" },
    { id: "mandi", name: "Mandi", tag: "BUDGET", tagColor: "bg-orange-100 text-orange-700" },
    { id: "chamba", name: "Chamba", tag: "FAMILY", tagColor: "bg-pink-100 text-pink-700" },
    { id: "solan", name: "Solan", tag: "POPULAR", tagColor: "bg-gray-100 text-gray-700" },
    { id: "sirmaur", name: "Sirmaur", tag: "HONEYMOON", tagColor: "bg-red-100 text-red-700" },
    { id: "bilaspur", name: "Bilaspur", tag: "ADVENTURE", tagColor: "bg-yellow-100 text-yellow-700" },
    { id: "hamirpur", name: "Hamirpur", tag: "PEACEFUL", tagColor: "bg-teal-100 text-teal-700" },
    { id: "una", name: "Una", tag: "NATURE", tagColor: "bg-green-100 text-green-700" },
    { id: "kinnaur", name: "Kinnaur", tag: "REMOTE", tagColor: "bg-indigo-100 text-indigo-700" },
    { id: "lahaul-spiti", name: "Lahaul and Spiti", tag: "EXTREME", tagColor: "bg-slate-100 text-slate-700" }
  ];

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (destination) => {
    onSelect?.(destination);
    setIsOpen(false);
  };

  const handleChange = (id) => {
    setValue(id);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 w-full max-w-4xl mx-auto pt-10">
        <div className="flex items-center justify-between w-full p-6">
          <h1 className="text-xl font-medium text-gray-800">
            What's <span className="text-green-500">your pick</span> for your next vacation?
          </h1>
          <Button
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 p-2 cursor-pointer"
            variant="normal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </Button>
        </div>

        {/* Search Bar - Fixed */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pick your destination"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none font-bold shadow text-black"
            />
          </div>
        </div>
      </div>

      {/* Destinations List - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full px-6 pb-6 overflow-y-auto">
          <div className="max-w-4xl px-6 mx-auto space-y-1">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => handleSelect(destination)}
                className="w-full flex items-center gap-x-2 p-4 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer"
              >
                <span className="text-xl font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                  {destination.name}
                </span>
                <span className={`px-3 py-1 text-[7px] font-medium rounded-full uppercase tracking-wide ${destination.tagColor}`}>
                  {destination.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional dropdown section - only shows if isOpen is true */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {destinations.map((option, index) => (
            <div key={option.id} className="w-full">
              {index > 0 && <div className="border-t border-gray-200"></div>}
              <Button
                variant="text"
                className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 transition-colors flex items-center justify-between ${
                  value === option.id ? "bg-green-50 text-green-600" : ""
                }`}
                onClick={() => {
                  handleChange(option.id);
                  setIsOpen(false);
                }}
              >
                <span className="text-left">{option.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${option.tagColor}`}>{option.tag}</span> 
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}