import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "../components/chat/ChatBox";
import ChatList from "../components/chat/ChatList";
import { useChat } from "../context/chatContext";

const Chat = ({ token }) => {
  const { selectedChat, selectedUser } = useChat();
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-screen overflow-hidden mt-[3px] rounded-xl bg-gradient-to-br from-[#f0f4ff] to-[#e8eeff] dark:from-[#0a0f1e] dark:to-[#111827] relative"
    >
      {/* ── Sidebar ── */}
      <AnimatePresence>
        {(showSidebar || (!selectedUser && !selectedChat)) && (
          <motion.div
            key="sidebar"
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="
              w-[300px] xl:w-[340px] flex-shrink-0
              bg-white/90 dark:bg-[#0d1117]/95
              backdrop-blur-xl
              border-r border-white/50 dark:border-[#1e293b]
              shadow-[4px_0_24px_rgba(0,0,0,0.06)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.4)]
              flex flex-col overflow-hidden
              max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-30 max-md:w-[85vw] max-md:max-w-[340px]
            "
          >
            <ChatList token={token} onSelectChat={() => setShowSidebar(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile overlay backdrop ── */}
      <AnimatePresence>
        {showSidebar && (selectedUser || selectedChat) && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="md:hidden fixed inset-0 bg-black/40 z-20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* ── Main Chat Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* Mobile header bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#1e293b]">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 rounded-xl bg-[#f3f4f6] dark:bg-[#1e293b] text-[#374151] dark:text-gray-300 hover:bg-[#e5e7eb] dark:hover:bg-[#263548] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-[#111827] dark:text-white truncate">
            {selectedUser?.name || selectedChat?.chatName || "Messages"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {selectedChat || selectedUser ? (
            <motion.div
              key="chatbox"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex-1 overflow-hidden flex flex-col"
            >
              <ChatBox token={token} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center gap-5 select-none px-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-2 border-blue-300/40 dark:border-blue-500/20"
                />
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center text-4xl shadow-inner">
                  💬
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-[#374151] dark:text-gray-200">Your messages</p>
                <p className="text-sm text-[#9ca3af] dark:text-gray-500 mt-1 max-w-xs">
                  Select a conversation from the sidebar to start chatting
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Chat;