import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/chatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../features/message/messageService";
import socket from "../../sockets/socket";
import { getUserChats } from "../../features/chat/chatService";

const ChatBox = ({ token }) => {
  const { currentUser, selectedUser } = useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const messageEndRef = useRef(null);

  // Fetch messages from API
  const fetchMessages = async (page = 1) => {
    if (!selectedUser) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getUserChats(selectedUser._id, page, 10);
      setMessages((prev) => (page === 1 ? data.messages : [...prev, ...data.messages]));
    } catch (err) {
      setError("Failed to load messages");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages when selectedUser changes
  useEffect(() => {
    setMessages([]);
    if (selectedUser) {
      fetchMessages(1);
    }
  }, [selectedUser]);

  // Listen for new messages
  useEffect(() => {
    const handleMessageReceived = (newMessage) => {
      if (newMessage.chat === selectedUser?._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("message-received", handleMessageReceived);
    return () => socket.off("message-received", handleMessageReceived);
  }, [selectedUser]);

  // Send a message
  const handleSendMessage = async (messageContent) => {
    if (!selectedUser) return;

    const newMessage = {
      content: messageContent,
      chat: selectedUser._id,
      sender: currentUser._id,
    };

    try {
      await sendMessage(selectedUser._id, messageContent, currentUser._id, token);
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("send-message", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Load more messages
  const loadMoreChats = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      fetchMessages(page + 1);
    }
  };

  return (
    <div className="chatbox-container">
      {error && <div className="error-message">Error: {error}</div>}

      {selectedUser ? (
        <div>
          <div className="font-semibold text-lg">{selectedUser?.name}</div>
          <div className="h-[400px] overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, idx) => (
                <MessageBubble key={idx} message={message} currentUser={currentUser} />
              ))
            ) : (
              <div>No messages available</div>
            )}
            <div ref={messageEndRef} />
          </div>
          {loading && <div>Loading more messages...</div>}
          {!loading && messages.length > 0 && (
            <button onClick={loadMoreChats} className="load-more-btn">
              Load More Messages
            </button>
          )}
          <MessageInput onSend={handleSendMessage} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-600 text-lg">
          Select a chat to start messaging ✉️
        </div>
      )}
    </div>
  );
};

export default ChatBox;
