import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiSearch, FiMessageCircle, FiUser } from "react-icons/fi";
import "../../styles/SideBar/mobileNav.css";

export default function MobileNav() {
  return (
    <div className="mobile-nav">
      <Link to="/home" className="mobile-nav-item">
        <FiHome />
        <span>Home</span>
      </Link>
      <Link to="/home/search" className="mobile-nav-item">
        <FiSearch />
        <span>Search</span>
      </Link>
      <Link to="/home/chat" className="mobile-nav-item">
        <FiMessageCircle />
        <span>Messages</span>
      </Link>
      <Link to="/home/profile" className="mobile-nav-item">
        <FiUser />
        <span>Profile</span>
      </Link>
    </div>
  );
}
