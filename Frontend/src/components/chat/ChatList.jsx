import React, { useEffect, useState } from "react";
import { useChat } from "../../context/chatContext";
import { fetchUsers } from "../../features/chat/chatService";
import UserSearchList from "./UserSearchList";

const ChatList = ({ token }) => {
  const {
    currentUser,
    selectedUser,
    setSelectedUser,
    setActiveChat,
    chats,
    setChats,
  } = useChat();

  const [allChats, setAllChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchUsers(currentUser._id);

        const mergedChats = [];

        // Add type to distinguish users vs groups
        if (data.users?.length) {
          data.users.forEach(user =>
            mergedChats.push({ ...user, chatType: "user" })
          );
        }

        if (data.groups?.length) {
          data.groups.forEach(group =>
            mergedChats.push({ ...group, chatType: "group" })
          );
        }

        // Sort by latestMessage timestamp (fallback to createdAt)
        mergedChats.sort((a, b) => {
          const dateA = new Date(a.latestMessage?.createdAt || a.createdAt);
          const dateB = new Date(b.latestMessage?.createdAt || b.createdAt);
          return dateB - dateA;
        });
        setAllChats(mergedChats);
      } catch (error) {
        console.error("Failed to load chats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser._id) {
      loadChats();
    }
  }, [currentUser]);

  if (!currentUser || !currentUser._id) return null;
  if (loading) return <div className="p-4 text-gray-600">Loading chats...</div>;

  return (
    <div className="w-[30%] min-w-[280px] p-4 h-full border-r border-gray-300 bg-white rounded-lg space-y-4">
      <h2 className="text-xl font-bold p-4 border-b">Chats</h2>
  
      <UserSearchList setChats={setChats} token={token} />
  
      <div className="space-y-2">
        {allChats.length > 0 ? (
          allChats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                if (chat.chatType === "user") {
                  setSelectedUser (chat);
                  setActiveChat(null);
                } else {
                  setActiveChat(chat);
                  setSelectedUser (null);
                }
              }}
              className={`cursor-pointer p-3 rounded-lg hover:bg-gray-100 ${
                (selectedUser  && chat.chatType === "user" && selectedUser ._id === chat._id) ||
                (chat.chatType === "group" && selectedUser ?._id === chat._id)
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={
                    chat.chatType === "user"
                      ? chat.profileImage || "https://picsum.photos/201"
                      : chat.groupImage || "https://picsum.photos/203"
                  }
                  alt="Chat"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <div className="font-medium text-sm">
                    {chat.chatType === "user"
                      ? chat.name
                      : chat.chatName || "Unnamed Group"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {chat.latestMessage?.content
                      ? chat.latestMessage.content.slice(0, 40) + (chat.latestMessage.content.length > 40 ? "..." : "")
                      : chat.chatType === "group"
                      ? `Admin: ${chat.groupAdmin?.name}`
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No chats found.</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
