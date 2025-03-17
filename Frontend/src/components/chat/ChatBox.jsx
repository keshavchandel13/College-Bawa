import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { fetchMessages, sendMessage } from "../../features/message/messageService";
import socket from "../../sockets/socket";

const ChatBox = ({ selectedChat, currentUser , token }) => {
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const getMsgs = async () => {
      if (selectedChat?._id) {
        const msgs = await fetchMessages(selectedChat._id, token);
        setMessages(msgs);
      }
    };
    getMsgs();
  }, [selectedChat, token]);

  useEffect(() => {
    const handleMessageReceived = (newMessage) => {
      if (newMessage.chat === selectedChat._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("message-received", handleMessageReceived);
    return () => socket.off("message-received", handleMessageReceived);
  }, [selectedChat]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (msg) => {
    const sentMsg = await sendMessage(selectedChat._id, msg, token);
    setMessages((prev) => [...prev, sentMsg]);
    socket.emit("send-message", sentMsg);
  };

  return (
    <div className="flex flex-col w-full h-full border-l border-gray-300 bg-white">
      <div className="px-4 py-3 bg-blue-600 text-white font-semibold">
        {selectedChat?.name || "Select a chat"}
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwnMessage={msg.sender === currentUser ._id}
          />
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatBox;