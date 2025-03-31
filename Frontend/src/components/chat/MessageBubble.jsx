import React from "react";

const MessageBubble = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-xs shadow-md ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className="text-xs mt-1 text-right text-gray-500">
          {message?.createdAt
            ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
