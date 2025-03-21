import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  
  const [selectedUser, setSelectedUser] = useState(null);  // New state for selected user

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        currentUser,
        setCurrentUser,
        selectedUser,   // Pass selectedUser globally
        setSelectedUser // Pass setter function for selectedUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
