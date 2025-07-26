// context/chatContext.jsx
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]); // ADD THIS

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
