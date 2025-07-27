// context/chatContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "../sockets/socket";
import { io } from "socket.io-client";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

useEffect(() => {
  if (!currentUser) return;

  const socket = io(`${import.meta.env.VITE_APP_BACKEND_URL}`);

  socket.emit("join", { userId: currentUser._id });

  socket.on("online-users", (users) => {
    setOnlineUsers(users);
  });

  socket.on("user-online", ({ userId }) => {
    setOnlineUsers((prev) =>
      prev.includes(userId) ? prev : [...prev, userId]
    );
  });

  socket.on("user-offline", ({ userId }) => {
    setOnlineUsers((prev) => prev.filter((id) => id !== userId));
  });

  return () => {
    socket.disconnect();
  };
}, [currentUser]);


  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        currentUser,
        setCurrentUser,
        selectedUser,
        setSelectedUser,
        activeChat,
        setActiveChat,
        chats,
        setChats, 
        onlineUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
