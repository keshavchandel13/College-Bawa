import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import { fetchMessages, sendMessage } from '../../api/community/api';
import socket from '../../sockets/socket';
const CommunityChat = ({ community, currentUser, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text,     setText]     = useState('');
  const [loading,  setLoading]  = useState(true);
  const [sending,  setSending]  = useState(false);
  const bottomRef = useRef(null);

  // Load history + join socket room
  useEffect(() => {
    let cancelled = false;

    socket.emit('community:join_room', community._id);

    (async () => {
      try {
        const msgs = await fetchMessages(community._id);
        if (!cancelled) setMessages(msgs);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    // Real-time incoming messages
    const handleNewMessage = (msg) => {
      setMessages(prev => {
        // Deduplicate: if we already have this _id (from optimistic), skip
        if (prev.some(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    };

    socket.on('community:new_message', handleNewMessage);

    return () => {
      cancelled = true;
      socket.emit('community:leave_room', community._id);
      socket.off('community:new_message', handleNewMessage);
    };
  }, [community._id]);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    // Optimistic message
    const optimisticId = `temp_${Date.now()}`;
    const optimistic = {
      _id: optimisticId,
      content: text.trim(),
      sender: { _id: currentUser._id, name: currentUser.name, profileImage: currentUser.profileImage },
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, optimistic]);
    setText('');
    setSending(true);

    try {
      await sendMessage(community._id, optimistic.content);
      // Real message arrives via socket and deduplication handles the swap
      // Remove optimistic if socket hasn't replaced it in 3s (fallback)
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m._id !== optimisticId));
      }, 3000);
    } catch {
      // Rollback optimistic on failure
      setMessages(prev => prev.filter(m => m._id !== optimisticId));
      setText(optimistic.content); // restore text
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      className="fixed bottom-4 right-4 w-[360px] max-h-[520px] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <div>
          <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{community.name}</p>
          <p className="text-[10px] text-gray-400">
            {community.memberCount ?? community.members?.length} members
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FiX />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
        {loading && <p className="text-center text-gray-400 text-sm pt-10">Loading…</p>}
        {!loading && messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm pt-10">No messages yet. Say hi 👋</p>
        )}
        {messages.map((msg) => {
          const isMe = (msg.sender?._id || msg.sender) === currentUser._id;
          const isOptimistic = msg._id?.startsWith('temp_');
          return (
            <div key={msg._id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              <img
                src={msg.sender?.profileImage || '/default.jpg'}
                alt=""
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5"
              />
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm transition-opacity ${
                isOptimistic ? 'opacity-60' : 'opacity-100'
              } ${
                isMe
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm'
              }`}>
                {!isMe && (
                  <p className="text-[10px] font-bold text-blue-500 mb-0.5">{msg.sender?.name}</p>
                )}
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-700 flex gap-2">
        <textarea
          rows={1}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Message…"
          className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-colors"
        >
          <FiSend className="text-sm" />
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityChat;