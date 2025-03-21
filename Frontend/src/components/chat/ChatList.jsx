import React, { useState } from "react";
import { useChat } from "../../context/chatContext";
import {
  fetchChats,
  accessOrCreateChat,
} from "../../features/chat/chatService";
import UserSearchList from "./UserSearchList";

const ChatList = ({ token }) => {
  const {
    selectedChat,
    setSelectedChat,
    currentUser,
    selectedUser,
    setSelectedUser,
  } = useChat();
  // Function to handle the click on the selected user
  const handleChatClick = async () => {};
  return (
    <div className="w-1/4 p-4 sm:w-1/3 md:w-1/4 lg:w-1/5 h-full border-r border-gray-300 bg-white rounded-lg space-y-4">
      <h2 className="text-xl font-bold p-6 border-b">Chats</h2>

      {/* User Search List with padding */}
      <UserSearchList />

      {/* Show selected user details if selected */}
      {selectedUser && (
        <div
          className="m-1.5 p-4 bg-gray-200 border-b rounded-lg"
          onClick={handleChatClick}
        >
          <div className="font-semibold">{selectedUser.name}</div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
