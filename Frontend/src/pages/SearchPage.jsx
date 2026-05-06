import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchBar from "../features/search/SearchBar";
import SearchCard from "../features/search/SearchCard";
import { fetchUsersByQuery } from "../features/user/userService";
import { useChat } from "../context/chatContext";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "users",    label: "Students", icon: "🎓" },
  { id: "colleges", label: "Campuses", icon: "🏛️" },
  { id: "groups",   label: "Squads",   icon: "🔥" },
  { id: "events",   label: "Events",   icon: "🎸" },
];

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4" />
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4" />
    <div className="flex justify-center gap-2 mb-6">
      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </div>
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
  </div>
);

const EmptyState = ({ searchTerm }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
    <span className="text-5xl mb-4">🔍</span>
    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">No results found</h3>
    <p className="text-sm text-gray-400 mt-1">
      {searchTerm
        ? `We couldn't find anyone matching "${searchTerm}"`
        : "Start typing to search for students"}
    </p>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
    <span className="text-5xl mb-4">⚠️</span>
    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Something went wrong</h3>
    <p className="text-sm text-gray-400 mt-1 mb-4">Failed to load results. Please try again.</p>
    <button
      onClick={onRetry}
      className="px-5 py-2 bg-purple-600 text-white rounded-2xl text-sm font-bold hover:bg-purple-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

const SearchPage = () => {
  const [searchMode, setSearchMode]   = useState("users");
  const [searchTerm, setSearchTerm]   = useState("");
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [retryKey, setRetryKey]       = useState(0);

  const debouncedTerm = useDebounce(searchTerm, 300);
  const { currentUser } = useChat();
  const abortRef = useRef(null);

 const fetchUsers = useCallback(async () => {
  if (searchMode !== "users") return;

  if (!currentUser?._id) return;

  abortRef.current?.abort();
  abortRef.current = new AbortController();

  if (!debouncedTerm.trim()) {
    setUserResults([]);
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const users = await fetchUsersByQuery(
      debouncedTerm,
      currentUser._id,
      abortRef.current.signal
    );

    setUserResults(users ?? []);
  } catch (err) {
    if (err.name !== "CanceledError" && err.name !== "AbortError") {
      setError("Failed to fetch users");
      setUserResults([]);
    }
  } finally {
    setLoading(false);
  }
}, [debouncedTerm, searchMode, currentUser, retryKey]);
  useEffect(() => {
    fetchUsers();
    return () => abortRef.current?.abort();
  }, [fetchUsers]);

  const showSkeletons  = loading;
  const showEmpty      = !loading && !error && userResults.length === 0 && searchMode === "users";
  const showError      = !loading && !!error;
  const showResults    = !loading && !error && userResults.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Find Your Tribe
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Search for students, squads, and the next big thing.
        </p>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSearchMode(cat.id); setUserResults([]); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl border-2 transition-all duration-300 font-bold whitespace-nowrap ${
              searchMode === cat.id
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "border-gray-200 dark:border-gray-800 hover:border-purple-400"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {showSkeletons && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        <AnimatePresence>
          {showResults && userResults.map((user, i) => (
            <SearchCard
  key={user?._id || i}
  user={user}
  index={i}
/>
          ))}
        </AnimatePresence>

        {showEmpty && <EmptyState searchTerm={debouncedTerm} />}
        {showError && <ErrorState onRetry={() => setRetryKey((k) => k + 1)} />}
      </motion.div>
    </div>
  );
};

export default SearchPage;