import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative mb-5">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-full border border-borderLight dark:border-borderDark bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}