import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

export function FiltersSection({ activeCategory, onCategoryChange, searchTerm, onSearchChange }) {
  const categories = [
    { name: "All",            color: "#95a5a6" },
    { name: "Cultural",       color: "#e74c3c" },
    { name: "Technical",      color: "#5387f5" },
    { name: "Sports",         color: "#f1c40f" },
    { name: "Workshops",      color: "#9b59b6" },
    { name: "Fests",          color: "#e67e22" },
  ];

  return (
    <div className="
      bg-white dark:bg-[#1f2937]
      border border-[#eee] dark:border-[#374151]
      rounded-2xl p-5 mb-5
      shadow-[0_2px_6px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.6)]
    ">
      {/* Top Row: Search + Filter button */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        {/* Search box */}
        <div className="relative flex-1 max-w-[350px]">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-[#999] dark:text-[#9ca3af] pointer-events-none" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full py-2.5 pl-9 pr-3 rounded-full text-sm outline-none
              border border-[#ddd] dark:border-[#4b5563]
              bg-white dark:bg-[#374151]
              text-gray-900 dark:text-[#f9fafb]
              placeholder-[#999] dark:placeholder-[#9ca3af]
              focus:border-[#5387f5] focus:shadow-[0_0_0_2px_rgba(83,135,245,0.2)]
              transition-all duration-200
            "
          />
        </div>

        {/* More Filters button */}
        <button className="
          flex items-center gap-1.5 px-4 py-2 text-sm rounded-full cursor-pointer
          border border-[#ddd] dark:border-[#4b5563]
          bg-white dark:bg-[#374151]
          text-gray-800 dark:text-[#f9fafb]
          hover:border-[#bbb] hover:bg-[#f8f8f8]
          dark:hover:bg-[#4b5563] dark:hover:border-[#60a5fa]
          transition-all duration-200
        ">
          <FaFilter /> More Filters
        </button>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2.5 mb-3">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`
              px-4 py-1.5 rounded-full border text-sm cursor-pointer transition-all duration-200
              ${activeCategory === category.name
                ? "text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                : "bg-white dark:bg-[#374151] dark:border-[#4b5563] dark:text-[#f9fafb]"
              }
            `}
            style={
              activeCategory === category.name
                ? { backgroundColor: category.color, borderColor: category.color, color: "#fff" }
                : { borderColor: category.color, color: category.color }
            }
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Results info */}
      <div className="text-[13px] text-[#666] dark:text-[#d1d5db] mt-2">
        {activeCategory === "All" ? "Showing all events" : `Filtered by ${activeCategory}`}
        {searchTerm && ` • Search: "${searchTerm}"`}
      </div>
    </div>
  );
}