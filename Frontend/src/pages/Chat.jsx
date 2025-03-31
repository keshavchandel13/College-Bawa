import React from "react";
import ChatBox from "../components/chat/ChatBox";
import ChatList from "../components/chat/ChatList";
import { useChat } from "../context/chatContext";
import "../styles/chat/chat.css"; // Import external CSS file

const Chat = ({ token }) => {
  const { selectedChat, selectedUser } = useChat();

  return (
    <div className="chat-container">
      <div className="chat-list">
        <ChatList token={token} />
      </div>
      <div className="chat-box">
        {selectedChat || selectedUser ? (
          <ChatBox token={token} />
        ) : (
          <div className="chat-placeholder">
            Select a chat to start messaging ✉️
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;