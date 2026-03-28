import React, { useState, useEffect } from "react";
import SearchBar from "../features/search/SearchBar";
import SearchCard from "../features/search/SearchCard";
import { fetchUsersByQuery } from "../features/user/userService";
import { useChat } from "../context/chatContext";
import { motion, AnimatePresence } from "framer-motion";

const SearchPage = () => {
  const [searchMode, setSearchMode] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useChat();
  const token = localStorage.getItem("token");
  const categories = [
    { id: "users", label: "Students", icon: "🎓" },
    { id: "colleges", label: "Campuses", icon: "🏛️" },
    { id: "groups", label: "Squads", icon: "🔥" },
    { id: "events", label: "Events", icon: "🎸" },
  ];

  useEffect(() => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory((prev) => [...prev.slice(-4), searchTerm]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchMode !== "users" || !searchTerm) {
        setUserResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const users = await fetchUsersByQuery(
          token,
          searchTerm,
          currentUser._id
        );
        setUserResults(users || []);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, searchMode]);

return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen">
      {/* Header with Gen Z Slang/Vibe */}
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Find Your Tribe
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Search for students, squads, and the next big thing.</p>
      </header>

      {/* Modern Mode Switcher */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSearchMode(cat.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl border-2 transition-all duration-300 font-bold ${
              searchMode === cat.id
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "border-gray-200 dark:border-gray-800 hover:border-purple-400"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Results Grid - Using Masonry-style or standard Bento */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        <AnimatePresence>
          {userResults.map((user) => (
            <SearchCard key={user._id} user={user} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchPage;