import React from "react";

const MessageBubble = ({ message, isOwnMessage }) => {
  return (
    <div
      className={`
        max-w-[70%] px-[14px] py-[10px] my-[6px] rounded-[18px]
        text-[15px] leading-[1.4] break-words relative inline-block clear-both
        max-sm:max-w-[85vw] max-sm:text-[15px] max-sm:px-[10px] max-sm:py-[7px]
        ${isOwnMessage
          ? "bg-[#0084ff] text-white ml-auto rounded-br-[4px] rounded-bl-[18px]"
          : "bg-[#f1f0f0] dark:bg-[#3a3b3c] text-[#111] dark:text-[#e4e6eb] mr-auto rounded-bl-[4px] rounded-br-[18px]"
        }
      `}
    >
      <p>{message.content}</p>
      <span
        className={`
          block text-[11px] mt-1 text-right
          ${isOwnMessage
            ? "text-white/70"
            : "text-[#777] dark:text-[#aaa]"
          }
        `}
      >
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default MessageBubble;