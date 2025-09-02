import React from "react";
import { Link } from "react-router-dom";
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
  X
} from "lucide-react";
import "../../styles/SideBar/mobileSidebar.css";

const menuItems = [
  { icon: <Home />, label: "Home", path: "/home/homefeed" },
  { icon: <Search />, label: "Search", path: "/home/search" },
  { icon: <Star />, label: "Market Place", path: "/home/MarketPlace" },
  { icon: <Users />, label: "Communities", path: "/home/community" },
  { icon: <MessageSquare />, label: "Messages", path: "/home/chat" },
  { icon: <Bell />, label: "Notification", path: "/home/notification" },
  { icon: <PlusCircle />, label: "Post", path: "/home/createpost" },
  { icon: <User />, label: "Profile", path: "/home/profile" },
  { icon: <MoreHorizontal />, label: "More", path: "/home/more" },
];

export default function MobileSidebar({ isOpen, onClose }) {
  return (
    <div className={`mobile-sidebar-overlay ${isOpen ? "open" : ""}`}>
      <div className="mobile-sidebar">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <ul className="mobile-sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="mobile-sidebar-item">
              <Link to={item.path} className="mobile-sidebar-link" onClick={onClose}>
                <span className="mobile-sidebar-icon">{item.icon}</span>
                <span className="mobile-sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
