import React from "react";
import { FiSearch, FiBell, FiMessageCircle, FiSettings, FiUser, FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logout from "../../features/auth/Logout";
import { useTheme } from "../../context/ThemeContext";

export default function TopBar({ onViewChange }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const profilePic = localStorage.getItem("profileImage");
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 bg-bgLight/70 dark:bg-bgDark/70 backdrop-blur-md">
      
      {/* Search Bar - Modern pill shape */}
      <div className="relative group w-full max-w-md ml-20">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <Link to="/home/search">
          <input
            type="text"
            placeholder="Find your tribe..."
            className="w-full pl-12 pr-4 py-2.5 rounded-2xl border-none bg-white dark:bg-slate-800/50 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
          />
        </Link>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl p-1 shadow-sm border border-slate-100 dark:border-slate-700">
          <Link to="/home/chat" className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl relative transition-colors">
            <FiMessageCircle className="text-xl" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          </Link>

          <button onClick={toggleTheme} className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
            {theme === "light" ? <FiMoon className="text-xl"/> : <FiSun className="text-xl"/>}
          </button>
        </div>

        {/* Profile */}
        <div className="relative group">
          <button className="flex items-center gap-2 p-1 pr-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-indigo-500 transition-all">
            <img
              src={profilePic || "/default-avatar.png"}
              className="w-8 h-8 rounded-xl object-cover"
              alt="profile"
            />
            <span className="text-xs font-bold tracking-tight hidden sm:block">{user?.name?.split(' ')[0]}</span>
          </button>

          <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl py-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-2">
            <Link to="/home/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-sm font-medium">
              <FiUser className="text-indigo-500"/> Profile
            </Link>
            <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-sm font-medium cursor-pointer">
              <FiSettings className="text-slate-400"/> Settings
            </div>
            <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1"></div>
            <div className="px-4 py-2 text-red-500 text-sm font-bold">
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}