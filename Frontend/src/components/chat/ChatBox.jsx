import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/chatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { sendMessage, accessOrCreateChat, fetchMessages  } from "../../features/message/messageService";
import socket from "../../sockets/socket";

const ChatBox = ({ token }) => {
  const {  currentUser, selectedUser,setSelectedUser, setActiveChat, activeChat } = useChat();
  const messageEndRef = useRef(null);
  const [messages, setMessages] = useState([]);



  // Access/Create chat
  useEffect(() => {
    const createOrGetChat = async () => {
      if (selectedUser) {
        try {
          const chat = await accessOrCreateChat({ userId: selectedUser._id, uid: currentUser._id }, token);
          setActiveChat(chat);
        } catch (error) {
          console.error("Error accessing chat:", error);
        }
      }
    };
    createOrGetChat();
  }, [selectedUser]);

  // Load previous messages when selectedUser changes
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (selectedUser) {
        try {
          const data = await fetchMessages(activeChat._id, token);
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchChatMessages();
  }, [activeChat]);

  // Listen for new messages
  useEffect(() => {
    const handleMessageReceived = (newMessage) => {
      if (newMessage.chat === selectedUser?._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("message-received", handleMessageReceived);
    return () => socket.off("message-received", handleMessageReceived);
  }, [activeChat]);

  const handleSendMessage = async (messageContent) => {
    if (selectedUser) {
      const newMessage = {
        content: messageContent,
        chat: selectedUser._id,
      };

      await sendMessage(activeChat._id, messageContent, currentUser._id, token);
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("send-message", newMessage);
    }
  };

  return (
    <div className="chatbox-container">
      { selectedUser ? (
        <div>
          <div className="font-semibold text-lg">{selectedUser?.name}</div>
          <div className="h-[400px] overflow-y-auto">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} currentUser={currentUser} />
            ))}
            <div ref={messageEndRef} />
          </div>
          <MessageInput onSend={handleSendMessage} />
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
