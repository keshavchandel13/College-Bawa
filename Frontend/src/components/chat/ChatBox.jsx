import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/chatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../features/message/messageService";
import socket from "../../sockets/socket";
import { getUserChats } from "../../features/chat/chatService";
import Navbar from "./Navbar";
import "../../styles/chat/chatBox.css";

const ChatBox = ({ token }) => {
  const { currentUser, selectedUser } = useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [chatId, setChatId] = useState(null);

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
        setChatId(data.chat._id);
      }
      setMessages((prev) =>
        page === 1 ? [...data.messages] : [...data.messages, ...prev]
      );
      if (page === 1) {
        setTimeout(() => {
          messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    } catch (err) {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }
    setLoading(true);
    fetchMessages(1);
  }, [selectedUser, token]);

  useEffect(() => {
    if (!chatId) return;
    socket.emit("join-chat", chatId);

    const handleMessageReceived = (newMessage) => {
      if (!newMessage.chat || newMessage.chat._id !== chatId) return;
      setMessages((prev) => {
        if (prev.some((msg) => msg._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });

      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket.on("receive-message", handleMessageReceived);

    return () => {
      socket.off("receive-message", handleMessageReceived);
    };
  }, [chatId]);

  const handleSendMessage = async (messageContent) => {
    if (!selectedUser) return;

    try {
      const response = await sendMessage(
        chatId,
        messageContent,
        currentUser._id,
        token
      );
      setMessages((prev) => [...prev, response]);

      socket.emit("send-message", {
        chatId: chatId,
        message: response,
        senderId: currentUser._id,
      });
    } catch (error) {
      setError("Error sending message");
    }
  };

  const loadMoreChats = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchMessages(nextPage);
      return nextPage;
    });
  };

  useEffect(() => {
    if (page === 1 && messages.length > 0) {
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [messages, page]);

  return (
    <div className="chatbox-container">
      {error && <div className="error-message">{error}</div>}

      {selectedUser ? (
        <div className="chatbox">
          <div className="chatbox-header">
            <Navbar selectedUser={selectedUser} />
          </div>

          <div className="chatbox-messages" ref={messageContainerRef}>
            {!loading && messages.length > 0 && (
              <button onClick={loadMoreChats} className="load-more">
                Load More Messages
              </button>
            )}

            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageBubble
                  key={message._id || Math.random()}
                  message={message}
                  isOwnMessage={message.sender?._id === currentUser?._id}
                />
              ))
            ) : (
              <div className="no-messages">No messages available</div>
            )}

            <div ref={messageEndRef} />
          </div>
          <div className="chat-box-message-input">
            <MessageInput onSend={handleSendMessage} />
          </div>
        </div>
      ) : (
        <div className="select-chat-message">
          Select a chat to start messaging ✉️
        </div>
      )}
    </div>
  );
};

export default ChatBox;
