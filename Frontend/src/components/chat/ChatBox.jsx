import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/chatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../features/message/messageService";
import socket from "../../sockets/socket";
import { accessOrCreateChat, getUserChats } from "../../features/chat/chatService";
import Navbar from "./Navbar";

const ChatBox = ({ token }) => {
  const { currentUser, selectedUser } = useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  const fetchMessages = async (page = 1) => {
    if (!selectedUser) return;
    setLoading(true);
    setError(null);

    try {
      const chat = await accessOrCreateChat(
        { userId: selectedUser._id, currentUserId: currentUser._id },
        token
      );
      setChatId(chat._id);

      const data = await getUserChats(
        token,
        currentUser._id,
        selectedUser._id,
        page,
        10
      );

      setMessages((prev) =>
        page === 1 ? [...data.messages] : [...data.messages, ...prev]
      );

      if (page === 1) {
        setTimeout(() => {
          messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }
    setPage(1);
    setChatId(null);
    setLoading(true);
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
    };

    socket.on("receive-message", handleMessageReceived);
    return () => socket.off("receive-message", handleMessageReceived);
  }, [chatId]);

  const handleSendMessage = async (messageContent) => {
    if (!selectedUser) return;
    try {
      const response = await sendMessage(chatId, messageContent, currentUser._id, token);
      socket.emit("send-message", {
        chatId,
        message: response,
        senderId: currentUser._id,
      });
    } catch {
      setError("Error sending message");
    }
  };

  const loadMoreChats = () => {
    const nextPage = page + 1;
    fetchMessages(nextPage);
    setPage(nextPage);
  };

  useEffect(() => {
    if (page === 1 && messages.length > 0) {
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [messages, page]);

  return (
    <div className="flex justify-center items-center h-screen bg-[#f0f2f5] dark:bg-[#181818] max-sm:p-0">
      {selectedUser ? (
        <div className="w-full h-screen bg-white dark:bg-[#242526] dark:text-[#e4e6eb] overflow-hidden flex flex-col max-sm:rounded-none max-sm:shadow-none">

          {/* Header */}
          <div className="text-white text-lg font-bold text-center">
            <Navbar selectedUser={selectedUser} />
          </div>

          {/* Messages */}
          <div
            ref={messageContainerRef}
            className="
              flex flex-col overflow-y-auto p-[15px]
              bg-[#f9f9fb] dark:bg-[#18191a]
              flex-1
              max-sm:p-[10px] max-sm:max-h-[calc(100vh-120px)]
            "
          >
            {!loading && messages.length > 0 && (
              <button
                onClick={loadMoreChats}
                className="
                  block mx-auto my-[10px] px-[15px] py-[5px]
                  bg-[#6ba9f0] hover:bg-[#5d9be8]
                  text-white border-none rounded-[5px]
                  cursor-pointer transition-colors duration-300
                "
              >
                Load More Messages
              </button>
            )}

            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageBubble
                  key={message._id || Math.random()}
                  message={message}
                  isOwnMessage={message.sender?._id === currentUser?._id}
                />
              ))
            ) : (
              <div className="text-center text-[#999ea5] italic">
                No messages available
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          {/* Input */}
          <div
            className="
              fixed bottom-[-3px] bg-white dark:bg-[#242526]
              border-t border-[#e1e4e8] dark:border-[#3a3b3c]
              p-[10px] w-[inherit]
              max-sm:pb-2 max-sm:flex max-sm:items-center max-sm:gap-2
            "
            style={{ width: "-webkit-fill-available" }}
          >
            <MessageInput onSend={handleSendMessage} />
          </div>
        </div>
      ) : (
        <div className="text-lg text-[#888d94] text-center">
          Select a chat to start messaging ✉️
        </div>
      )}
    </div>
  );
};

export default ChatBox;