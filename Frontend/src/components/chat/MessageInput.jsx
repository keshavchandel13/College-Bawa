import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageInput = ({ onSend, onTyping }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = message.trim().length > 0;

  return (
    <div className="
      flex items-end gap-2 px-4 py-3
      bg-white dark:bg-[#0d1117]
      border-t border-[#f1f5f9] dark:border-[#1e293b]
    ">
      {/* Text area wrapper */}
      <div className="
        flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl
        bg-[#f8faff] dark:bg-[#1e293b]
        border border-[#e5e7eb] dark:border-[#334155]
        focus-within:border-[#6366f1] dark:focus-within:border-[#4f46e5]
        focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]
        transition-all duration-200
      ">
        <textarea
          ref={inputRef}
          rows={1}
          placeholder="Type a message…"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="
            flex-1 bg-transparent outline-none resize-none text-sm
            text-[#111827] dark:text-[#e2e8f0]
            placeholder-[#9ca3af] dark:placeholder-gray-600
            max-h-28 leading-relaxed
            scrollbar-thin
          "
          style={{ lineHeight: "1.5" }}
        />
      </div>

      {/* Send button */}
      <AnimatePresence mode="wait">
        <motion.button
          key={canSend ? "send" : "idle"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleSend}
          disabled={!canSend}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
            transition-all duration-200 border-none cursor-pointer
            ${canSend
              ? "bg-gradient-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_12px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_16px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-95"
              : "bg-[#f3f4f6] dark:bg-[#1e293b] cursor-not-allowed"
            }
          `}
        >
          <svg
            className={`w-4 h-4 ${canSend ? "text-white" : "text-[#d1d5db] dark:text-gray-600"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default MessageInput;