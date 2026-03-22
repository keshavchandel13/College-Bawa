import React, { useState, useEffect } from "react";
import { useChat } from "../../context/chatContext";
import { fetchUsersByQuery } from "../../features/user/userService";
import { IoIosSearch } from "react-icons/io";

const UserSearchList = ({ token }) => {
  const { currentUser, setSelectedUser, setActiveChat } = useChat();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        loadUsers(searchQuery);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const loadUsers = async (query) => {
    try {
      const users = await fetchUsersByQuery(token, query, currentUser._id);
      setSuggestions(users);
      setShowDropdown(true);
    } catch {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="w-full mt-[6px] relative font-[Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Search input */}
      <div className="flex items-center relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full py-[10px] pl-[14px] pr-[40px] rounded-[20px] outline-none text-sm
            border border-[#ccc] dark:border-[#555]
            bg-white dark:bg-[#3a3b3c]
            text-[#111] dark:text-[#e4e6eb]
            placeholder-[#aaa] dark:placeholder-[#aaa]
            transition-all duration-300
            focus:border-[#007bff] focus:shadow-[0_0_6px_rgba(0,123,255,0.3)]
            dark:focus:border-[#0084ff] dark:focus:shadow-[0_0_6px_rgba(0,132,255,0.4)]
          "
        />
        <IoIosSearch className="absolute right-[14px] text-[#888] dark:text-[#aaa] text-[18px] pointer-events-none" />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <ul
          className="
            absolute top-[110%] left-0 right-0 z-[1000]
            bg-white dark:bg-[#242526]
            border border-[#ddd] dark:border-[#3a3b3c]
            rounded-xl max-h-[240px] overflow-y-auto
            shadow-[0px_6px_15px_rgba(0,0,0,0.08)] dark:shadow-[0px_6px_15px_rgba(0,0,0,0.4)]
            animate-[dropdownFade_0.2s_ease]
          "
        >
          {suggestions.length > 0 ? (
            suggestions.map((user) => (
              <li
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setShowDropdown(false);
                  setActiveChat(null);
                }}
                className="
                  px-[14px] py-[10px] cursor-pointer flex flex-col
                  text-[#111] dark:text-[#e4e6eb]
                  border-b border-[#f5f5f5] last:border-b-0 dark:border-[#3a3b3c]
                  transition-colors duration-200
                  hover:bg-[#007bff] hover:text-white
                  dark:hover:bg-[#0084ff] dark:hover:text-white
                  [&:hover_small]:text-[#e0e0e0]
                "
              >
                <span>{user.name}</span>
                <small className="text-xs text-[#777] dark:text-[#aaa]">
                  {user.email}
                </small>
              </li>
            ))
          ) : (
            <li className="p-3 text-center text-[#777] dark:text-[#aaa] italic text-sm">
              No users found.
            </li>
          )}
        </ul>
      )}

      <style>{`
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default UserSearchList;