import '../../styles/SideBar/sidebar.css';
import { Link } from "react-router-dom";
import { Home, Search, Star, Users, MessageSquare, Bell, PlusCircle, User, MoreHorizontal } from "lucide-react";

const menuItems = [
  { icon: <Home />, label: "Home", path: "/home/homefeed" },
  { icon: <Search />, label: "Search" },
  { icon: <Star />, label: "Reviews" },
  { icon: <Users />, label: "Communities" },
  { icon: <MessageSquare />, label: "Messages", path:"/home/chat" },
  { icon: <Bell />, label: "Notification" },
  { icon: <PlusCircle />, label: "Post" },
  { icon: <User />, label: "Profile", path: "/home/profile" },
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
              <>
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
