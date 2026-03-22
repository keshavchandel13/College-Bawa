import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiSearch, FiMessageCircle, FiUser } from "react-icons/fi";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-cardLight dark:bg-cardDark border-t border-borderLight dark:border-borderDark flex justify-around py-2 z-50">

      <Link to="/home" className="flex flex-col items-center text-xs">
        <FiHome className="text-xl" />
        Home
      </Link>

      <Link to="/home/search" className="flex flex-col items-center text-xs">
        <FiSearch className="text-xl" />
        Search
      </Link>

      <Link to="/home/chat" className="flex flex-col items-center text-xs">
        <FiMessageCircle className="text-xl" />
        Messages
      </Link>

      <Link to="/home/profile" className="flex flex-col items-center text-xs">
        <FiUser className="text-xl" />
        Profile
      </Link>
    </div>
  );
}