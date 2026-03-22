import React from "react";
import {
  FiSearch,
  FiBell,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Logout from "../../features/auth/Logout";
import { useTheme } from "../../context/ThemeContext";

export function TopBar({ onViewChange }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const profilePic = localStorage.getItem("profileImage");
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="hidden md:flex items-center justify-between px-6 py-3 bg-cardLight dark:bg-cardDark border-b border-borderLight dark:border-borderDark shadow-sm">

      {/* Search */}
      <div className="relative w-80">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Link to="/home/search">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 rounded-full border border-borderLight dark:border-borderDark bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">

        <Link to="/home/chat" className="relative">
          <FiMessageCircle className="text-xl" />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">3</span>
        </Link>

        <div className="relative">
          <FiBell className="text-xl" />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">2</span>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme}>
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2">
            <img
              src={profilePic || "/default-avatar.png"}
              className="w-9 h-9 rounded-full"
            />
            <span className="text-sm font-medium">{user?.name}</span>
          </button>

          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-borderLight dark:border-borderDark rounded-lg shadow-md hidden group-hover:block">

            <Link to="/home/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiUser /> Profile
            </Link>

            <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiSettings /> Settings
            </div>

            <div className="border-t my-1"></div>

            <div className="px-4 py-2 text-red-500">
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;