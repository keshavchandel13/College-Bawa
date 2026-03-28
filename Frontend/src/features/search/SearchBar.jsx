import React from "react";
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <FiSearch className="text-xl text-gray-400 group-focus-within:text-purple-500 transition-colors" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a name, stack, or interest..."
        className="w-full pl-14 pr-6 py-5 bg-gray-50 dark:bg-gray-900 border-none rounded-3xl text-lg focus:ring-4 focus:ring-purple-500/20 shadow-xl transition-all placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchBar;