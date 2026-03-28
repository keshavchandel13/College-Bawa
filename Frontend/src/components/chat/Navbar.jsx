import React from "react";
import { motion } from "framer-motion";
import { useChat } from "../../context/chatContext";

const ChatNavbar = ({ selectedUser }) => {
  const { onlineUsers } = useChat();
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        flex items-center gap-3 px-5 py-3.5
        bg-white dark:bg-[#0d1117]
        border-b border-[#f1f5f9] dark:border-[#1e293b]
        shadow-[0_1px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_8px_rgba(0,0,0,0.3)]
      "
    >
      {/* Avatar with online ring */}
      <div className="relative flex-shrink-0">
        <img
          src={selectedUser?.profileImage || "/default.jpg"}
          alt={selectedUser?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className={`
          absolute bottom-0 right-0 w-3 h-3 rounded-full
          border-2 border-white dark:border-[#0d1117]
          transition-colors duration-300
          ${isOnline ? "bg-green-400" : "bg-[#d1d5db]"}
        `} />
      </div>

      {/* Name + status */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#111827] dark:text-white truncate leading-tight">
          {selectedUser?.name || "User"}
        </p>
        <p className={`text-[11px] font-medium leading-tight ${isOnline ? "text-green-500" : "text-[#9ca3af]"}`}>
          {isOnline ? "● Active now" : "● Offline"}
        </p>

      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-xl text-[#6b7280] dark:text-gray-400 hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] transition-colors">
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="p-2 rounded-xl text-[#6b7280] dark:text-gray-400 hover:bg-[#f3f4f6] dark:hover:bg-[#1e293b] transition-colors">
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ChatNavbar;