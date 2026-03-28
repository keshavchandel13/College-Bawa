import React from "react";
import { motion } from "framer-motion";

const MessageBubble = ({ message, isOwnMessage, showAvatar = false }) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Read receipt tick icons
  const ReadReceipt = () => (
    <span className="ml-1 inline-flex items-center">
      {message.read ? (
        // Double tick - blue (read)
        <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 16 11" fill="currentColor">
          <path d="M11.071.653a.75.75 0 0 1 .01 1.06L5.39 7.562a.75.75 0 0 1-1.064.005L1.653 4.894a.75.75 0 0 1 1.059-1.062l2.145 2.139L10.01.663a.75.75 0 0 1 1.06-.01Z"/>
          <path d="M14.571.653a.75.75 0 0 1 .01 1.06l-5.69 5.85a.75.75 0 0 1-1.064.004L6.403 6.12a.75.75 0 0 1 1.059-1.063l.92.918 5.129-5.312a.75.75 0 0 1 1.06-.01Z" opacity="0.5"/>
        </svg>
      ) : message.delivered ? (
        // Double tick - gray (delivered)
        <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 16 11" fill="currentColor">
          <path d="M11.071.653a.75.75 0 0 1 .01 1.06L5.39 7.562a.75.75 0 0 1-1.064.005L1.653 4.894a.75.75 0 0 1 1.059-1.062l2.145 2.139L10.01.663a.75.75 0 0 1 1.06-.01Z"/>
          <path d="M14.571.653a.75.75 0 0 1 .01 1.06l-5.69 5.85a.75.75 0 0 1-1.064.004L6.403 6.12a.75.75 0 0 1 1.059-1.063l.92.918 5.129-5.312a.75.75 0 0 1 1.06-.01Z" opacity="0.5"/>
        </svg>
      ) : (
        // Single tick - sent
        <svg className="w-3 h-3 text-white/50" viewBox="0 0 12 11" fill="currentColor">
          <path d="M10.071.653a.75.75 0 0 1 .01 1.06L4.39 7.562a.75.75 0 0 1-1.064.005L.653 4.894a.75.75 0 0 1 1.059-1.062l2.145 2.139L9.01.663a.75.75 0 0 1 1.06-.01Z"/>
        </svg>
      )}
    </span>
  );

  return (
    <div className={`flex items-end gap-2 mb-1 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar (other user only, show on first in group) */}
      {!isOwnMessage && (
        <div className="w-7 h-7 flex-shrink-0 mb-1">
          {showAvatar ? (
            <img
              src={message.sender?.profileImage || "/default.jpg"}
              alt={message.sender?.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7" />
          )}
        </div>
      )}

      <motion.div
        layout
        className={`
          max-w-[68%] sm:max-w-[60%] relative group
          ${isOwnMessage ? "items-end" : "items-start"}
        `}
      >
        {/* Sender name for received messages (show on first in group) */}
        {!isOwnMessage && showAvatar && message.sender?.name && (
          <p className="text-[10px] font-semibold text-[#6366f1] dark:text-indigo-400 mb-0.5 ml-1">
            {message.sender.name}
          </p>
        )}

        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm
            ${isOwnMessage
              ? "bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white rounded-br-md"
              : "bg-white dark:bg-[#1e293b] text-[#111827] dark:text-[#e2e8f0] rounded-bl-md border border-[#f1f5f9] dark:border-[#334155]"
            }
          `}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Time + read receipt */}
          <div className={`flex items-center gap-0.5 mt-1 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
            <span className={`text-[10px] ${isOwnMessage ? "text-white/60" : "text-[#9ca3af] dark:text-gray-500"}`}>
              {time}
            </span>
            {isOwnMessage && <ReadReceipt />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageBubble;