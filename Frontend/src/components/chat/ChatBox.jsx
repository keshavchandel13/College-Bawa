import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useChat } from "../../context/chatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { sendMessage } from "../../features/message/messageService";
import socket from "../../sockets/socket";
import { accessOrCreateChat, getUserChats } from "../../features/chat/chatService";
import Navbar from "./Navbar";

const ChatBox = ({ token }) => {
  const { currentUser, selectedUser } = useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [chatId, setChatId] = useState(null);
  const typingTimeoutRef = useRef(null);

  const fetchMessages = async (page = 1) => {
    if (!selectedUser) return;
    setLoading(true);

    try {
      const chat = await accessOrCreateChat(
        { userId: selectedUser._id, currentUserId: currentUser._id },
        token
      );
      setChatId(chat._id);

      const data = await getUserChats(token, currentUser._id, selectedUser._id, page, 10);

      setMessages((prev) =>
        page === 1 ? [...data.messages] : [...data.messages, ...prev]
      );

      if (page === 1) {
        setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedUser) { setMessages([]); return; }
    setPage(1);
    setChatId(null);
    fetchMessages(1);
  }, [selectedUser, token]);

  useEffect(() => {
    if (!chatId) return;
    socket.emit("join-chat", chatId);

    const handleMessageReceived = (newMessage) => {
      if (!newMessage.chat || newMessage.chat._id !== chatId) return;
      setMessages((prev) => {
        if (prev.some((msg) => msg._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });

      // Toast for incoming message when window not focused
      if (document.hidden) {
        toast.info(`💬 ${selectedUser?.name}: ${newMessage.content?.slice(0, 40)}...`, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    };

    const handleTyping = (data) => {
      if (data.chatId === chatId && data.userId !== currentUser._id) {
        setIsTyping(true);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2500);
      }
    };

    socket.on("receive-message", handleMessageReceived);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("receive-message", handleMessageReceived);
      socket.off("typing", handleTyping);
    };
  }, [chatId]);

  const handleSendMessage = async (messageContent) => {
    if (!selectedUser) return;
    try {
      const response = await sendMessage(chatId, messageContent, currentUser._id, token);
      setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch {
      toast.error("Failed to send message. Try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleTypingEmit = () => {
    if (chatId) socket.emit("typing", { chatId, userId: currentUser._id });
  };

  const loadMoreChats = () => {
    const nextPage = page + 1;
    fetchMessages(nextPage);
    setPage(nextPage);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#0d1117]">

      {/* ── Navbar ── */}
      <Navbar selectedUser={selectedUser} />
              <hr />

      {/* ── Messages area ── */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-1 bg-[#f8faff] dark:bg-[#0d1117]
          scrollbar-thin scrollbar-thumb-[#cbd5e1] dark:scrollbar-thumb-[#1e293b] scrollbar-track-transparent"
      >
        {/* Load more */}
        {!loading && messages.length > 0 && (
          <div className="flex justify-center mb-3">
            <button
              onClick={loadMoreChats}
              className="text-xs px-4 py-1.5 rounded-full bg-white dark:bg-[#1e293b] text-[#6366f1] dark:text-blue-400 border border-[#e5e7eb] dark:border-[#334155] hover:bg-[#f0f0ff] dark:hover:bg-[#263045] transition-all shadow-sm font-medium"
            >
              ↑ Load older messages
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && messages.length === 0 && (
          <div className="space-y-3 px-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className={`h-10 rounded-2xl bg-[#e5e7eb] dark:bg-[#1e293b] animate-pulse ${i % 2 === 0 ? "w-48" : "w-64"}`} />
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        <AnimatePresence initial={false}>
          {messages.length > 0 ? (
            messages.map((message, idx) => (
              <motion.div
                key={message._id || idx}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <MessageBubble
                  message={message}
                  isOwnMessage={message.sender?._id === currentUser?._id}
                  showAvatar={
                    idx === 0 ||
                    messages[idx - 1]?.sender?._id !== message.sender?._id
                  }
                />
              </motion.div>
            ))
          ) : (
            !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-40 gap-2"
              >
                <span className="text-3xl">👋</span>
                <p className="text-sm text-[#9ca3af] dark:text-gray-500">
                  Say hello to {selectedUser?.name}!
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <TypingIndicator name={selectedUser?.name} />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messageEndRef} />
      </div>

      {/* ── Input ── */}
      <MessageInput onSend={handleSendMessage} onTyping={handleTypingEmit} />
    </div>
  );
};

export default ChatBox;