import React, { useEffect, useState } from "react";
import { useChat } from "../../context/chatContext";
import { fetchUsers } from "../../features/chat/chatService";
import UserSearchList from "./UserSearchList";
import "../../styles/chat/chatList.css";

const ChatList = ({ token }) => {
  // Global chat context state
  const {
    currentUser,
    selectedUser,
    setSelectedUser,
    setActiveChat,
    chats,
    setChats,
  } = useChat();

  // Local state for all chats and loading indicator
  const [allChats, setAllChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchUsers(currentUser._id);

        const mergedChats = [];

        // Add 1-to-1 user chats
        if (data.users?.length) {
          data.users.forEach((user) =>
            mergedChats.push({ ...user, chatType: "user" })
          );
        }

        // Add group chats
        if (data.groups?.length) {
          data.groups.forEach((group) =>
            mergedChats.push({ ...group, chatType: "group" })
          );
        }

        // Sort chats by latest message time or createdAt
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

    if (currentUser?._id) loadChats();
  }, [currentUser]);

  if (!currentUser?._id) return null;
  if (loading) return <div className="loading-text">Loading chats...</div>;

  // Handle chat click
  const handleChatClick = (chat) => {
    if (chat.chatType === "user") {
      setSelectedUser(chat);
      setActiveChat(null);
    } else {
      setActiveChat(chat);
      setSelectedUser(null);
    }
  };

  return (
    <div className="chat-list">
      <h2 className="chat-list-title">Chats</h2>

      {/* Search input for users */}
      <UserSearchList setChats={setChats} token={token} />

      <div className="chat-items">
        {allChats.length > 0 ? (
          allChats.map((chat) => {
            const isActive =
              selectedUser &&
              chat.chatType === "user" &&
              selectedUser._id === chat._id;

            const profileImage =
              chat.chatType === "user"
                ? chat.profileImage || "/default.jpg"
                : chat.groupImage || "/default.jpg";

            const name =
              chat.chatType === "user" ? chat.name : chat.chatName;

            const lastMessage =
              chat.latestMessage?.content
                ? chat.latestMessage.content.slice(0, 40) + "..."
                : chat.chatType === "group"
                ? `Admin: ${chat.groupAdmin?.name}`
                : "";

            return (
              <div
                key={chat._id}
                onClick={() => handleChatClick(chat)}
                className={`chat-item ${isActive ? "chat-item-active" : ""}`}
              >
                <img src={profileImage} alt="Chat" className="chat-image" />
                <div className="chat-info">
                  <div className="chat-name">{name}</div>
                  <div className="chat-message">{lastMessage}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-chats">No chats found.</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
