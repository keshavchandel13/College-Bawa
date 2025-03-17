import React, { useEffect, useState } from "react";
import { useChat } from "../../context/chatContext";
import { fetchChats } from "../../features/chat/chatService";
import UserSearchList from "./UserSearchList";

const ChatList = ({ token }) => {
  const { selectedChat, setSelectedChat, currentUser, selectedUser } = useChat();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      const allChats = await fetchChats(token);
      setChats(Array.isArray(allChats) ? allChats : []);
    };
    loadChats();
  }, [token]);

  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 h-full border-r border-gray-300 bg-white rounded-lg">
      <h2 className="text-xl font-bold p-6 border-b">Chats</h2>
      <UserSearchList />
      {chats.map((chat) => {
        const otherUser = chat.users.find((u) => u._id !== currentUser._id);
        return (
          <div
            key={chat._id}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedChat?._id === chat._id ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <div className="text-sm">{otherUser?.name}</div>
            <div className="text-xs text-gray-500 truncate">
              {chat.latestMessage?.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
