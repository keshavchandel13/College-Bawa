import React from "react";
import ChatBox from "../components/chat/ChatBox";
import ChatList from "../components/chat/ChatList";
import { useChat } from "../context/chatContext";

const Chat = ({ token }) => {
  const { selectedChat, selectedUser } = useChat();

  return (
    <div
      className="
        flex h-screen overflow-hidden mt-[3px] rounded-xl
        bg-gradient-to-br from-[#f9fafb] to-[#e0e7ff]
        dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#1e293b]
        animate-[fadeIn_0.8s_ease-in-out]
        max-sm:text-[15px] max-sm:px-1
        md:flex-row flex-col md:rounded-xl rounded-none
      "
    >
      {/* Sidebar – Chat List */}
      <div
        className="
          w-[28%] max-w-[360px] max-h-screen
          bg-[#f7f9fc] dark:bg-black
          border-r border-[#e5e7eb] dark:border-[#1f2937]
          shadow-[2px_0_8px_rgba(0,0,0,0.08)] dark:shadow-[2px_0_8px_rgba(0,0,0,0.5)]
          overflow-y-auto py-[18px] px-[15px]
          transition-[transform,background] duration-400
          scrollbar-thin scrollbar-thumb-[#cbd5e1] dark:scrollbar-thumb-black scrollbar-thumb-rounded-lg
          lg:w-[35%]
          md:w-full md:max-w-none md:border-r-0 md:border-b md:border-b-[#ddd] dark:md:border-b-[#374151] md:shadow-none
        "
      >
        <ChatList token={token} />
      </div>

      {/* Chat Box */}
      <div
        className="
          flex-1 flex flex-col relative
          bg-white dark:bg-[#1e293b]
          border-l border-[#e5e7eb] dark:border-[#374151]
          shadow-[-2px_0_8px_rgba(0,0,0,0.08)] dark:shadow-none
          rounded-tr-xl rounded-br-xl
          transition-[transform,background] duration-400
          md:border-l-0 md:border-t md:border-t-[#ddd] dark:md:border-t-[#374151] md:rounded-none md:shadow-none
        "
      >
        {selectedChat || selectedUser ? (
          <ChatBox token={token} />
        ) : (
          <div
            className="
              flex items-center justify-center h-full
              text-xl font-semibold tracking-wide text-center
              text-[#444] dark:text-[#e5e7eb] dark:bg-black
              opacity-0 animate-[zoomIn_0.6s_ease-in-out_forwards]
            "
          >
            Select a chat to start messaging ✉️
          </div>
        )}
      </div>

      {/* Keyframe animations injected via a style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Chat;