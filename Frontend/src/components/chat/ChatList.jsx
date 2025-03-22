import React, { useEffect } from "react";
import { useChat } from "../../context/chatContext";
import { fetchChats } from "../../features/chat/chatService";
import UserSearchList from "./UserSearchList";

const ChatList = ({token}) => {
  const {
    currentUser,
    selectedUser,
    setSelectedUser,
    setActiveChat,
    chats,
    setChats
  } = useChat();

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    };

    getChats();
  }, []);

  return (
    <div className="w-1/4 p-4 sm:w-1/3 md:w-1/4 lg:w-1/5 h-full border-r border-gray-300 bg-white rounded-lg space-y-4">
      <h2 className="text-xl font-bold p-6 border-b">Chats</h2>

      {/* Pass setChats to update the chat list */}
      <UserSearchList setChats={setChats} token={token} />

      <div className="space-y-2">
        {chats && chats.length > 0 ? (
          chats.map((chat) => {
            const chatUser = chat.users?.find((user) => user._id !== currentUser._id);

            return (
              <div
                key={chat._id}
                onClick={() => {
                  setSelectedUser(chatUser);
                  setActiveChat(chat);
                }}
                className={`cursor-pointer p-3 rounded-lg hover:bg-gray-100 ${
                  selectedUser?._id === chatUser?._id ? "bg-gray-200" : ""
                }`}
              >
                <div className="font-medium text-sm">
                  {chatUser?.name || "Unnamed User"}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-sm">No previous chats found.</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
