import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../context/chatContext";
import { fetchUsersByQuery } from "../../features/user/userService";
import { IoIosSearch } from "react-icons/io";

const UserSearchList = ({ token }) => {
  const { currentUser, setSelectedUser, setActiveChat } = useChat();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setSearching(true);
        try {
          const users = await fetchUsersByQuery(token, searchQuery, currentUser._id);
          setSuggestions(users);
          setShowDropdown(true);
        } catch {
          setSuggestions([]);
          setShowDropdown(false);
        } finally {
          setSearching(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="relative">
      {/* Search input */}
      <div className="
        flex items-center gap-2 px-3 py-2 rounded-xl
        bg-[#f8faff] dark:bg-[#1e293b]
        border border-[#e5e7eb] dark:border-[#334155]
        focus-within:border-[#6366f1] dark:focus-within:border-[#4f46e5]
        focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]
        transition-all duration-200
      ">
        {searching ? (
          <div className="w-4 h-4 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin flex-shrink-0" />
        ) : (
          <IoIosSearch className="text-[#9ca3af] dark:text-gray-500 text-lg flex-shrink-0" />
        )}
        <input
          type="text"
          placeholder="Search people…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-[#111827] dark:text-white placeholder-[#9ca3af] dark:placeholder-gray-600"
        />
        {searchQuery && (
          <button
            onClick={() => { setSearchQuery(""); setShowDropdown(false); }}
            className="text-[#9ca3af] hover:text-[#374151] dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="
              absolute top-[calc(100%+6px)] left-0 right-0 z-50
              bg-white dark:bg-[#1a2234]
              rounded-xl overflow-hidden
              border border-[#e5e7eb] dark:border-[#334155]
              shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]
              max-h-[220px] overflow-y-auto
            "
          >
            {suggestions.length > 0 ? (
              suggestions.map((user, idx) => (
                <motion.li
                  key={user._id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    setSelectedUser(user);
                    setActiveChat(null);
                    setShowDropdown(false);
                    setSearchQuery("");
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-[#f8faff] dark:hover:bg-[#263045] transition-colors border-b border-[#f9fafb] dark:border-[#1e293b] last:border-b-0"
                >
                  <img
                    src={user.profileImage || "/default.jpg"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-[#9ca3af] dark:text-gray-500 truncate">{user.email}</p>
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="px-4 py-4 text-sm text-[#9ca3af] dark:text-gray-500 text-center">
                No users found for "{searchQuery}"
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserSearchList;