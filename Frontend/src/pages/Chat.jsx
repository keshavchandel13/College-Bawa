import React from "react";
import ChatBox from "../components/chat/ChatBox";
import ChatList from "../components/chat/ChatList";
import { useChat } from "../context/chatContext";

const Chat = ({ token }) => {
  const { selectedChat, setSelectedChat, currentUser } = useChat();

  return (
    <div className="h-screen w-full flex flex-col sm:flex-row bg-gray-50">
      <ChatList token={token} />
      <div className="flex-1 border-l border-gray-200">
        {selectedChat ? (
          <ChatBox
            selectedChat={selectedChat}
            currentUser={currentUser}
            token={token}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600 text-lg">
            Select a chat to start messaging ✉️
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
