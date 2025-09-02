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
import { motion, AnimatePresence } from "framer-motion";
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

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { x: "100%", opacity: 0, transition: { ease: "easeInOut" } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 },
  }),
};

export default function MobileSidebar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="mobile-sidebar-overlay"
            onClick={onClose}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          {/* Sidebar */}
          <motion.div
            className="mobile-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button className="close-btn" onClick={onClose} aria-label="Close sidebar">
              <X size={24} />
            </button>
            <ul className="mobile-sidebar-menu">
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="mobile-sidebar-item"
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={item.path} className="mobile-sidebar-link" onClick={onClose}>
                    <span className="mobile-sidebar-icon">{item.icon}</span>
                    <span className="mobile-sidebar-label">{item.label}</span>
                  </Link>
                  <hr/>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}