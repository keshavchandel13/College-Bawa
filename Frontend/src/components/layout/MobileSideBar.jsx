import React, { useEffect } from "react";
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
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: <Home size={20} />, label: "Home", path: "/home/homefeed" },
  { icon: <Search size={20} />, label: "Search", path: "/home/search" },
  { icon: <Star size={20} />, label: "Market Place", path: "/home/MarketPlace" },
  { icon: <Users size={20} />, label: "Communities", path: "/home/community" },
  { icon: <MessageSquare size={20} />, label: "Messages", path: "/home/chat" },
  { icon: <Bell size={20} />, label: "Notification", path: "/home/notification" },
  { icon: <PlusCircle size={20} />, label: "Post", path: "/home/createpost" },
  { icon: <User size={20} />, label: "Profile", path: "/home/profile" },
  { icon: <MoreHorizontal size={20} />, label: "More", path: "/home/more" },
];

export default function MobileSidebar({ isOpen, onClose }) {

  // 🔥 prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[280px] z-50 
                       bg-cardLight dark:bg-cardDark 
                       border-l border-borderLight dark:border-borderDark
                       shadow-xl p-5 flex flex-col"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="self-end mb-6 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X />
            </button>

            {/* Menu */}
            <ul className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-lg 
                               hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <span className="text-lg text-gray-600 dark:text-gray-300">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}