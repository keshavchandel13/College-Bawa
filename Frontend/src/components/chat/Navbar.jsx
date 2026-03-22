import React from "react";

const ChatNavbar = ({ selectedUser }) => {
  return (
    <div
      className="
        w-full flex items-center px-5 py-3
        bg-[#336699] dark:bg-[#242526]
        text-white
        rounded-bl-[20px] rounded-br-[20px]
        shadow-[0px_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[0px_4px_12px_rgba(0,0,0,0.4)]
        font-[Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]
        max-sm:flex-col max-sm:items-start max-sm:px-1 max-sm:py-2
      "
    >
      <div className="flex items-center gap-[15px]">
        <img
          src={selectedUser?.profileImage || "/default.jpg"}
          alt="Profile"
          className="
            w-12 h-12 rounded-full object-cover
            border-2 border-white dark:border-[#3a3b3c]
            shadow-[0px_3px_6px_rgba(0,0,0,0.15)]
          "
        />
        <span className="text-[1.2rem] font-semibold text-[#f2f2f2] dark:text-[#e4e6eb] tracking-[0.5px]">
          {selectedUser?.name || "User"}
        </span>
      </div>
    </div>
  );
};

export default ChatNavbar;