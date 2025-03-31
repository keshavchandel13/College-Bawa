import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/chatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../features/message/messageService";
import socket from "../../sockets/socket";
import { getUserChats } from "../../features/chat/chatService";
import Navbar from "./Navbar";

const ChatBox = ({ token }) => {
  const { currentUser, selectedUser } = useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  // Function to fetch messages from API
  const fetchMessages = async (page = 1) => {
    if (!selectedUser) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getUserChats(
        token,
        currentUser._id,
        selectedUser._id,
        page,
        10
      );
      if (data.chat) {
        setChatId(data.chat._id); // Store chatId for reference
      }
      setMessages((prev) =>
        page === 1 ? [...data.messages] : [...data.messages, ...prev]
      );
    } catch (err) {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }
    setLoading(true);
    fetchMessages(1);
  }, [selectedUser, token]);

  // Listen for new messages via Socket.io
  useEffect(() => {
    if (!chatId) return;
    socket.emit("join-chat", chatId); // Join the chat room

    const handleMessageReceived = (newMessage) => {
      if (!newMessage.chat || newMessage.chat._id !== chatId) {
        return; // Ignore messages from other chats
      }
      setMessages((prev) => {
        // Avoid adding duplicate messages
        if (prev.some((msg) => msg._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });

      // Scroll to the latest message
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket.on("receive-message", handleMessageReceived);

    return () => {
      socket.off("receive-message", handleMessageReceived);
    };
  }, [chatId]);

  // Function to send a message
  const handleSendMessage = async (messageContent) => {
    if (!selectedUser) return;

    try {
      const response = await sendMessage(
        chatId,
        messageContent,
        currentUser._id,
        token
      );
      const savedMessage = response;
      setMessages((prev) => [...prev, savedMessage]);

      // Emit the new message to the server
      socket.emit("send-message", {
        chatId: chatId,
        message: savedMessage,
        senderId: currentUser._id,
      });

      // Scroll to the latest message
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setError("Error sending message");
    }
  };

  // Function to load more messages (pagination)
  const loadMoreChats = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchMessages(nextPage);
      return nextPage;
    });
  };

  // Auto-scroll to the bottom when a new message is received
  useEffect(() => {
    if (messageEndRef.current && !loading) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className=" p-6 border rounded-3xl shadow-xl bg-white max-w-2xl mx-auto transition-all duration-300 ease-in-out">
      {error && (
        <div className="error-message text-red-500 text-center font-semibold">
          {error}
        </div>
      )}

      {selectedUser ? (
        <div>
          <div className="font-bold text-2xl text-center mb-4 border-b pb-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-t-3xl shadow-md">
            <Navbar selectedUser={selectedUser}/>
           
          </div>
          <div
            className="h-[500px] overflow-y-auto flex flex-col p-4 bg-gray-50 rounded-xl shadow-inner space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            ref={messageContainerRef}
          >
            {!loading && messages.length > 0 && (
              <button
                onClick={loadMoreChats}
                className="block mx-auto my-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                Load More Messages
              </button>
            )}

            {messages.length > 0 ? (
              messages.map((message) => {
                if (!message || !message.sender) return null; // Prevent rendering errors
                return (
                  <MessageBubble
                    key={message._id || Math.random()}
                    message={message}
                    isOwnMessage={message.sender?._id === currentUser?._id}
                  />
                );
              })
            ) : (
              <div className="text-gray-500 text-center italic">
                No messages available
              </div>
            )}

            <div ref={messageEndRef} />
          </div>
          <MessageInput onSend={handleSendMessage} className="mt-4 w-full" />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-600 text-lg font-semibold">
          Select a chat to start messaging ✉️
        </div>
      )}
    </div>
  );
};

export default ChatBox;