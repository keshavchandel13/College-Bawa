import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommunityCard   from '../features/community/CommunityCard';
import CreateCommunity from '../features/community/CreateCommunity';
import CommunityChat   from '../features/community/CommunityChat';
import * as svc        from '../api/community/api';
import { useChat }     from '../context/chatContext';

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 animate-pulse border border-gray-100 dark:border-gray-700">
    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-5" />
    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-xl" />
  </div>
);

const Community = () => {
  const { currentUser } = useChat();

  const [communities, setCommunities] = useState([]);
  const [trending,    setTrending]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [query,       setQuery]       = useState('');
  const [activeChat,  setActiveChat]  = useState(null); // community object

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [{ communities: list }, trend] = await Promise.all([
        svc.fetchCommunities(query),
        svc.fetchTrending(),
      ]);
      setCommunities(list);
      setTrending(trend);
    } catch {
      setError('Failed to load communities');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => { load(); }, [load]);

  const handleJoin = async (community) => {
    try {
      const updated = await svc.joinCommunity(community._id);
      setCommunities(prev => prev.map(c => c._id === updated._id ? updated : c));
    } catch { /* toast error */ }
  };

  const handleLeave = async (community) => {
    try {
      const updated = await svc.leaveCommunity(community._id);
      setCommunities(prev => prev.map(c => c._id === updated._id ? updated : c));
      if (activeChat?._id === community._id) setActiveChat(null);
    } catch { /* toast error */ }
  };

  const handleCreated = (newCommunity) => {
    setCommunities(prev => [newCommunity, ...prev]);
  };

  const isMember = (community) =>
    community.members?.some(m => (m._id || m) === currentUser._id);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 font-sans">
      <CreateCommunity onCreated={handleCreated} />

      {/* Search */}
      <div className="mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search communities…"
          className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      <h1 className="text-2xl font-bold text-[#003366] dark:text-gray-100 mb-5">
        Explore Communities
      </h1>

      {error && (
        <div className="text-center py-10 text-red-500">
          {error}{' '}
          <button onClick={load} className="underline ml-2">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : communities.map(c => (
              <CommunityCard
                key={c._id}
                community={c}
                isMember={isMember(c)}
                onJoin={() => handleJoin(c)}
                onLeave={() => handleLeave(c)}
                onChat={() => setActiveChat(c)}
              />
            ))
        }
        {!loading && !error && communities.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-16">No communities found.</p>
        )}
      </div>

      {/* Sidebar strips */}
      <div className="flex gap-10 mt-12 flex-wrap">
        <div>
          <h2 className="text-lg font-bold text-[#003366] dark:text-gray-200 mb-3">🔥 Trending</h2>
          <ul className="space-y-1">
            {trending.map(t => (
              <li key={t._id} className="text-sm text-gray-600 dark:text-gray-300">
                {t.name} <span className="text-gray-400">· {t.memberCount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat drawer */}
      <AnimatePresence>
        {activeChat && (
          <CommunityChat
            community={activeChat}
            currentUser={currentUser}
            onClose={() => setActiveChat(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;