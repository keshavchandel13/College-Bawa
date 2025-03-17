import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";
import TypingIndicator from "../components/TypingIndicator";

const ChatLayout = ({ currentUser , token }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="flex h-full">
      <ChatList
        token={token}
        currentUser ={currentUser }
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <div className="flex-1">
        <ChatBox selectedChat={selectedChat} currentUser ={currentUser } token={token} />
        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
};

export default ChatLayout;