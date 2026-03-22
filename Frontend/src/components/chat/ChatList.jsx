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
    onlineUsers,
  } = useChat();

  const [allChats, setAllChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchUsers(currentUser._id);
        const mergedChats = [];

        if (data.users?.length)
          data.users.forEach((user) => mergedChats.push({ ...user, chatType: "user" }));
        if (data.groups?.length)
          data.groups.forEach((group) => mergedChats.push({ ...group, chatType: "group" }));

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
  if (loading)
    return (
      <div className="text-center text-sm p-5 text-[#555] dark:text-[#aaa]">
        Loading chats...
      </div>
    );

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
    <div
      className="
        p-4 h-full flex flex-col overflow-y-auto
        bg-white dark:bg-black
        border-r border-[#e0e0e0] dark:border-[#2c2c2c]
        max-sm:w-screen max-sm:text-[15px] max-sm:px-0.5
      "
    >
      <h2 className="text-2xl font-bold text-[#222] dark:text-[#f1f1f1] mb-4">
        Chats
      </h2>

      <UserSearchList token={token} />

      <div className="flex flex-col gap-1 mt-2">
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

            const isOnline = onlineUsers.includes(chat._id);
            const name = chat.chatType === "user" ? chat.name : chat.chatName;
            const lastMessage = chat.latestMessage?.content
              ? chat.latestMessage.content.slice(0, 40) + "..."
              : chat.chatType === "group"
              ? `Admin: ${chat.groupAdmin?.name}`
              : "";

            return (
              <div
                key={chat._id}
                onClick={() => handleChatClick(chat)}
                className={`
                  mt-[13px] flex items-center px-3 py-3 rounded-[10px] cursor-pointer
                  transition-all duration-[250ms] ease-in-out
                  hover:bg-[#f5f7fa] hover:scale-[1.01]
                  dark:hover:bg-[#1e1e1e]
                  max-sm:px-1 max-sm:py-2
                  ${isActive
                    ? "bg-[#e6f0ff] shadow-[0_2px_6px_rgba(0,102,255,0.2)] dark:bg-[#2b3a55]"
                    : "bg-transparent"
                  }
                `}
              >
                {/* Avatar + online dot */}
                <div className="relative mr-3">
                  <img
                    src={profileImage}
                    alt="Chat"
                    className="w-[46px] h-[46px] rounded-full object-cover border-2 border-[#ddd]"
                  />
                  {chat.chatType === "user" && (
                    <div
                      className={`
                        w-3 h-3 rounded-full absolute bottom-[3px] right-[3px]
                        border-2 border-white transition-all duration-300
                        ${isOnline ? "bg-[#4caf50]" : "bg-[#bbb]"}
                      `}
                    />
                  )}
                </div>

                {/* Name + last message */}
                <div className="flex-1 flex flex-col justify-center overflow-hidden">
                  <div className="font-semibold text-[15px] text-[#111] dark:text-white truncate">
                    {name}
                  </div>
                  <div className="text-[13px] text-[#666] dark:text-[#aaa] mt-0.5 truncate">
                    {lastMessage}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-4 text-center text-[#999] text-sm dark:text-[#aaa]">
            No chats found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;