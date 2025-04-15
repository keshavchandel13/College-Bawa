import React, { useState, useEffect } from "react";
import { useChat } from "../../context/chatContext";
import { fetchUsersByQuery } from "../../features/user/userService";
import { accessOrCreateChat } from "../../features/chat/chatService";
import "../../styles/chat/UserSearchList.css";
import { IoIosSearch } from "react-icons/io";
const UserSearchList = ({ setChats, token }) => {
  const { setActiveChat, setSelectedUser, currentUser, chats } = useChat();
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
    } catch (err) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-user-input-container">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IoIosSearch className="search-user-input-container-icon" />
      </div>

      {showDropdown && (
        <ul className="dropdown">
          {suggestions.length > 0 ? (
            suggestions.map((user) => (
              <li key={user._id} className="dropdown-item">
                <div>{user.name}</div>
                <small>{user.email}</small>
              </li>
            ))
          ) : (
            <div className="dropdown-no-results">No users found.</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserSearchList;
