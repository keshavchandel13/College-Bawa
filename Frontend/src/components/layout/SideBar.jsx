import '../../styles/SideBar/sidebar.css';
import { Link } from "react-router-dom";
import React from 'react';
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
  { icon: <Search />, label: "Search", path:"/home/search" },
  { icon: <Star />, label: "Market Place",path:"/home/MarketPlace" },
  { icon: <Users />, label: "Communities", path:"/home/community" },
  { icon: <MessageSquare />, label: "Messages", path:"/home/chat" },
  { icon: <Bell />, label: "Notification", path:"/home/notification" },
  { icon: <PlusCircle />, label: "Post", path: "/home/createpost" },
  { icon: <User />, label: "Profile", path: "/home/profile" },
  { icon: <FaUserSecret />, label: "Anonymous Posts", path:"/home/anonymous"},  // 👈 hacker icon used here
  { icon: <MoreHorizontal />, label: "More", path:"/home/more"},
];

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src="/logo2.png" alt="College Bawa Logo" className="sidebar-logo" />
        <h1 className="sidebar-title">College Bawa</h1>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className="sidebar-item">
            {item.path ? (
              <Link to={item.path} className="sidebar-link">
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            ) : (
              <div className="sidebar-link">
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
