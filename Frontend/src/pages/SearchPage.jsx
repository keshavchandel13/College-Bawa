import React, { useState, useEffect } from "react";
import SearchBar from "../features/search/SearchBar";
import SearchCard from "../features/search/SearchCard";
import { fetchUsersByQuery } from "../features/user/userService";
import { useChat } from "../context/chatContext";

const SearchPage = () => {
  const [searchMode, setSearchMode] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useChat();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory((prev) => [...prev.slice(-4), searchTerm]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchMode !== "users" || !searchTerm) {
        setUserResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const users = await fetchUsersByQuery(
          token,
          searchTerm,
          currentUser._id
        );
        setUserResults(users || []);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, searchMode]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mb-6">
        Search College Bawa
      </h1>

      {/* Mode Switch */}
      <div className="flex gap-2 overflow-x-auto mb-5">
        {["users", "colleges", "groups", "events", "posts"].map((mode) => (
          <button
            key={mode}
            onClick={() => setSearchMode(mode)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition 
              ${
                searchMode === mode
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* History */}
      {searchHistory.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 mb-4 text-sm">
          {searchHistory.map((term, i) => (
            <span
              key={i}
              onClick={() => setSearchTerm(term)}
              className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer"
            >
              {term}
            </span>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">

        {loading ? (
          <p className="col-span-full text-center">Loading...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500">
            {error}
          </p>
        ) : userResults.length > 0 ? (
          userResults.map((user) => (
            <SearchCard
              key={user._id}
              title={user.name}
              description={user.email}
              image={user.profileImage}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No results found
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;