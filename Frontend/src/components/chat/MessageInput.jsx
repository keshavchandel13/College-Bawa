import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div
      className="
        flex p-[10px]
        bg-white dark:bg-[#242526]
        border-t border-[#ddd] dark:border-[#3a3b3c]
        max-sm:w-screen max-sm:max-w-[100vw] max-sm:text-[15px] max-sm:px-1 max-sm:py-2
      "
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="
          flex-1 px-3 py-2 rounded-[20px] outline-none text-sm
          border border-[#ccc] dark:border-[#555]
          bg-white dark:bg-[#3a3b3c]
          text-[#111] dark:text-[#e4e6eb]
          placeholder-[#aaa] dark:placeholder-[#aaa]
          max-sm:text-[15px] max-sm:px-1 max-sm:py-2
        "
      />
      <button
        onClick={handleSend}
        className="
          ml-2 px-[14px] py-2 rounded-[20px] font-medium text-sm
          bg-[#007bff] hover:bg-[#0066d3]
          dark:bg-[#0084ff] dark:hover:bg-[#006fd6]
          text-white border-none cursor-pointer
          transition-colors duration-200
          max-sm:rounded-full max-sm:px-[14px] max-sm:py-2
        "
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;