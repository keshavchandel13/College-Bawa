import React, { useState, useEffect } from "react";
import { useChat } from "../../context/chatContext";
import { fetchUsersByQuery } from "../../features/user/userService";

const UserSearchList = () => {
  const {     currentUser,
    selectedUser, setSelectedChat, setSelectedUser } = useChat(); // Access selectedUser from context
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
      const users = await fetchUsersByQuery(query);
      setSuggestions(users);
      setShowDropdown(true);
    } catch (err) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search users by name or email..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-60 overflow-y-auto shadow-lg">
          {suggestions.map((user) => (
            <li
              key={user._id}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setSelectedUser(user); // Update selectedUser globally when clicked
                setSearchQuery(""); // Clear search query
                setShowDropdown(false);                
                setSelectedChat(null); // Clear selected chat

              }}
            >
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </li>
          ))}
        </ul>
      )}

      {showDropdown && suggestions.length === 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 px-4 py-2 text-gray-500 text-sm">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UserSearchList;
