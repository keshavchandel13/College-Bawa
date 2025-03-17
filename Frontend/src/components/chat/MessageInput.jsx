import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex items-center border-t px-4 py-2 bg-white">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;