import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/chatContext"; // Use global state
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { sendMessage, accessOrCreateChat } from "../../features/message/messageService";
import socket from "../../sockets/socket";

const ChatBox = ({ token }) => {
  const {
    selectedChat,
    setSelectedChat,
    currentUser,
    selectedUser,
  } = useChat(); // Access global state

  const messageEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  // Access/Create chat when selectedUser changes
  useEffect(() => {
    const createOrGetChat = async () => {
      if (selectedUser && !selectedChat) {
        try {
          const chat = await accessOrCreateChat({ userId: selectedUser._id, uid: currentUser._id }, token);
          setSelectedChat(chat); // Set the returned chat in context
        } catch (error) {
          console.error("Error creating or accessing chat:", error);
        }
      }
    };
    createOrGetChat();
  }, [selectedUser]);

  // Listen for socket messages
  useEffect(() => {
    const handleMessageReceived = (newMessage) => {
      if (newMessage.chat === selectedChat?._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("message-received", handleMessageReceived);
    return () => socket.off("message-received", handleMessageReceived);
  }, [selectedChat]);

  const handleSendMessage = async (messageContent) => {
    if (selectedChat) {
      const newMessage = {
        content: messageContent,
        sender: currentUser._id,
        chat: selectedChat._id,
      };

      await sendMessage(newMessage); // Backend send
      setMessages((prev) => [...prev, newMessage]); // Local state update
      socket.emit("send-message", newMessage); // Socket emit
    }
  };

  return (
    <div className="chatbox-container">
      {selectedChat || selectedUser ? (
        <div>
          <div className="font-semibold text-lg">{selectedUser.name}</div>
          <div className="h-[400px] overflow-y-auto">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} currentUser={currentUser} />
            ))}
            <div ref={messageEndRef} />
          </div>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-600 text-lg">
          Select a chat to start messaging ✉️
        </div>
      )}
    </div>
  );
};

export default ChatBox;
