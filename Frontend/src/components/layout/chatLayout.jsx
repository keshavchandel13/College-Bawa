import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatList from "../components/chat/ChatList";
import ChatBox from "../components/chat/ChatBox";
import TypingIndicator from "../components/chat/TypingIndicator";

const ChatLayout = ({ currentUser, token }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#f0f4ff] to-[#e8eeff] dark:from-[#0a0f1e] dark:to-[#111827] rounded-xl">

      {/* ── Sidebar ── */}
      <AnimatePresence>
        {(showSidebar || !selectedChat) && (
          <motion.div
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="
              w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col
              bg-white/90 dark:bg-[#0d1117]/95 backdrop-blur-xl
              border-r border-white/50 dark:border-[#1e293b]
              shadow-[4px_0_24px_rgba(0,0,0,0.06)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.4)]
              max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-30 max-md:w-[85vw] max-md:max-w-[340px]
            "
          >
            <ChatList
              token={token}
              currentUser={currentUser}
              selectedChat={selectedChat}
              setSelectedChat={(chat) => {
                setSelectedChat(chat);
                setShowSidebar(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {showSidebar && selectedChat && (
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

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* Mobile top bar */}
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
            {selectedChat?.chatName || selectedChat?.name || "Messages"}
          </span>
        </div>

        {/* Chat box or empty state */}
        <AnimatePresence mode="wait">
          {selectedChat ? (
            <motion.div
              key={selectedChat._id || "chatbox"}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ChatBox
                selectedChat={selectedChat}
                currentUser={currentUser}
                token={token}
                onTypingChange={setIsTyping}
              />

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-1"
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center gap-5 px-6 select-none"
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
    </div>
  );
};

export default ChatLayout;