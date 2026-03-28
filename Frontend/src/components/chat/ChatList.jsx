import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../context/chatContext";
import { fetchUsers } from "../../features/chat/chatService";
import UserSearchList from "./UserSearchList";

const ChatList = ({ token, onSelectChat }) => {
  const { currentUser, selectedUser, setSelectedUser, setActiveChat, onlineUsers } = useChat();
  const [allChats, setAllChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchUsers(currentUser._id);
        const mergedChats = [];
        if (data.users?.length) data.users.forEach((u) => mergedChats.push({ ...u, chatType: "user" }));
        if (data.groups?.length) data.groups.forEach((g) => mergedChats.push({ ...g, chatType: "group" }));
        mergedChats.sort((a, b) => {
          const dA = new Date(a.latestMessage?.createdAt || a.createdAt);
          const dB = new Date(b.latestMessage?.createdAt || b.createdAt);
          return dB - dA;
        });
        setAllChats(mergedChats);
      } catch (err) {
        console.error("Failed to load chats:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?._id) loadChats();
  }, [currentUser]);

  if (!currentUser?._id) return null;

  const handleChatClick = (chat) => {
    if (chat.chatType === "user") { setSelectedUser(chat); setActiveChat(null); }
    else { setActiveChat(chat); setSelectedUser(null); }
    onSelectChat?.();
  };

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-[#f0f0f0] dark:border-[#1e293b]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#111827] dark:text-white tracking-tight">Messages</h2>
          {/* Online count badge */}
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
            {onlineUsers.length} online
          </span>
        </div>
        <UserSearchList token={token} />
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-[#e5e7eb] dark:scrollbar-thumb-[#1e293b] scrollbar-track-transparent">
        {loading ? (
          <div className="space-y-3 px-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-2">
                <div className="w-11 h-11 rounded-full bg-[#f3f4f6] dark:bg-[#1e293b] animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-28 bg-[#f3f4f6] dark:bg-[#1e293b] rounded-full animate-pulse" />
                  <div className="h-2.5 w-40 bg-[#f3f4f6] dark:bg-[#1e293b] rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : allChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <span className="text-3xl">🗨️</span>
            <p className="text-sm text-[#9ca3af] dark:text-gray-500">No conversations yet</p>
          </div>
        ) : (
          <AnimatePresence>
            {allChats.map((chat, idx) => {
              const isActive = selectedUser?.chatType === "user"
                ? selectedUser._id === chat._id
                : false;
              const profileImage = chat.chatType === "user"
                ? chat.profileImage || "/default.jpg"
                : chat.groupImage || "/default.jpg";
              const isOnline = onlineUsers.includes(chat._id);
              const name = chat.chatType === "user" ? chat.name : chat.chatName;
              const lastMessage = chat.latestMessage?.content
                ? chat.latestMessage.content.slice(0, 38) + (chat.latestMessage.content.length > 38 ? "…" : "")
                : chat.chatType === "group" ? `Group · ${chat.groupAdmin?.name}` : "Start a conversation";

              // Format time
              const msgTime = chat.latestMessage?.createdAt
                ? new Date(chat.latestMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "";

              return (
                <motion.div
                  key={chat._id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  onClick={() => handleChatClick(chat)}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer
                    transition-all duration-200 group
                    ${isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-sm"
                      : "hover:bg-[#f8f9ff] dark:hover:bg-[#1a2234]"
                    }
                  `}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={profileImage}
                      alt={name}
                      className={`w-11 h-11 rounded-full object-cover transition-all duration-200
                        ${isActive ? "ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1 ring-offset-white dark:ring-offset-[#0d1117]" : ""}
                      `}
                    />
                    {chat.chatType === "user" && (
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-[#0d1117] transition-colors duration-300
                        ${isOnline ? "bg-green-400" : "bg-[#d1d5db]"}
                      `} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-sm font-semibold truncate ${isActive ? "text-blue-700 dark:text-blue-300" : "text-[#111827] dark:text-white"}`}>
                        {name}
                      </span>
                      {msgTime && (
                        <span className="text-[10px] text-[#9ca3af] dark:text-gray-600 flex-shrink-0">{msgTime}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6b7280] dark:text-gray-500 truncate mt-0.5">{lastMessage}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ChatList;