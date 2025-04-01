import React from "react";
import "../../styles/chat/MessageBubble.css";

const MessageBubble = ({ message, isOwnMessage }) => {
  return (
    <div className={`message-bubble ${isOwnMessage ? "own-message" : ""}`}>
      <p>{message.content}</p>
      <span className="timestamp">
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

export default MessageBubble;
