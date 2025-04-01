import React, { useEffect, useState } from "react";
import { useChat } from "../../context/chatContext";
import { fetchUsers } from "../../features/chat/chatService";
import UserSearchList from "./UserSearchList";
import "../../styles/chat/chatList.css";

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

        if (data.users?.length) {
          data.users.forEach((user) =>
            mergedChats.push({ ...user, chatType: "user" })
          );
        }

        if (data.groups?.length) {
          data.groups.forEach((group) =>
            mergedChats.push({ ...group, chatType: "group" })
          );
        }

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
  if (loading) return <div className="loading-text">Loading chats...</div>;

  return (
    <div className="chat-list">
      <h2 className="chat-list-title">Chats</h2>

      <UserSearchList setChats={setChats} token={token} />

      <div className="chat-items">
        {allChats.length > 0 ? (
          allChats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                if (chat.chatType === "user") {
                  setSelectedUser(chat);
                  setActiveChat(null);
                } else {
                  setActiveChat(chat);
                  setSelectedUser(null);
                }
              }}
              className={`chat-item ${
                selectedUser &&
                chat.chatType === "user" &&
                selectedUser._id === chat._id
                  ? "chat-item-active"
                  : ""
              }`}
            >
              <img
                src={
                  chat.chatType === "user"
                    ? chat.profileImage || "/default.jpg"
                    : chat.groupImage || "/default.jpg"
                }
                alt="Chat"
                className="chat-image"
              />
              <div className="chat-info">
                <div className="chat-name">
                  {chat.chatType === "user" ? chat.name : chat.chatName}
                </div>
                <div className="chat-message">
                  {chat.latestMessage?.content
                    ? chat.latestMessage.content.slice(0, 40) + "..."
                    : chat.chatType === "group"
                    ? `Admin: ${chat.groupAdmin?.name}`
                    : ""}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-chats">No chats found.</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
