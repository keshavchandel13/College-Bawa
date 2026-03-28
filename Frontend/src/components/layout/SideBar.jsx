import { Link, useLocation } from "react-router-dom";
import React from "react";
import {
  Home, Search, Star, Users, MessageSquare,
  Bell, PlusCircle, User, MoreHorizontal
} from "lucide-react";
import { FaUserSecret } from "react-icons/fa";

const menuItems = [
  { icon: <Home size={22}/>, label: "Home", path: "/home/homefeed" },
  { icon: <Search size={22}/>, label: "Search", path: "/home/search" },
  { icon: <Star size={22}/>, label: "Market Place", path: "/home/MarketPlace" },
  { icon: <Users size={22}/>, label: "Communities", path: "/home/community" },
  { icon: <MessageSquare size={22}/>, label: "Messages", path: "/home/chat" },
  // { icon: <Bell size={22}/>, label: "Event Zone", path: "/home/notification" },
  { icon: <PlusCircle size={22}/>, label: "Post", path: "/home/createpost" },
  { icon: <User size={22}/>, label: "Profile", path: "/home/profile" },
  // { icon: <FaUserSecret size={22}/>, label: "Anonymous", path: "/home/anonymous" },
  { icon: <MoreHorizontal size={22}/>, label: "More", path: "/home/more" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="group fixed h-[96vh] m-[2vh] w-[70px] hover:w-[260px] transition-all duration-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-[2rem] z-50 hidden md:flex flex-col p-4 shadow-2xl overflow-hidden">
      
      {/* Brand */}
      <div className="flex items-center gap-3 mb-1 px-2">
        <div className="min-w-[40px] h-[40px] rounded-2xl  flex items-center justify-center text-white shadow-lg">
           <img src="/logo2.png" className="w-10 h-10 rounded-full bg-black p-1" />
        </div>
        <h1 className="font-black text-xl tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          COLLEGE BAWA
        </h1>
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group/item ${
                  isActive 
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" 
                  : "hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                <span className={`${isActive ? "scale-110" : "group-hover/item:scale-110"} transition-transform`}>
                  {item.icon}
                </span>
                <span className={`font-semibold opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all duration-300`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}