import { Link } from "react-router-dom";
import React from "react";
import {
  Home,
  Search,
  Star,
  Users,
  MessageSquare,
  Bell,
  PlusCircle,
  User,
  MoreHorizontal,
} from "lucide-react";
import { FaUserSecret } from "react-icons/fa";

const menuItems = [
  { icon: <Home />, label: "Home", path: "/home/homefeed" },
  { icon: <Search />, label: "Search", path: "/home/search" },
  { icon: <Star />, label: "Market Place", path: "/home/MarketPlace" },
  { icon: <Users />, label: "Communities", path: "/home/community" },
  { icon: <MessageSquare />, label: "Messages", path: "/home/chat" },
  { icon: <Bell />, label: "Event Zone", path: "/home/notification" },
  { icon: <PlusCircle />, label: "Post", path: "/home/createpost" },
  { icon: <User />, label: "Profile", path: "/home/profile" },
  { icon: <FaUserSecret />, label: "Anonymous Posts", path: "/home/anonymous" },
  { icon: <MoreHorizontal />, label: "More", path: "/home/more" },
];

export default function Sidebar() {
  return (
    <div className="group fixed h-screen w-[60px] hover:w-[250px] transition-all duration-300 bg-bgLight dark:bg-cardDark border-r border-borderLight dark:border-borderDark p-2 z-50 hidden md:flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 opacity-0 group-hover:opacity-100 transition">
        <img src="/logo2.png" className="w-10 h-10 rounded-full bg-black p-1" />
        <h1 className="font-semibold text-lg whitespace-nowrap">
          College Bawa
        </h1>
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}