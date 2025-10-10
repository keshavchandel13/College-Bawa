import React, { useState, useEffect } from 'react';
import SearchBar from '../features/search/SearchBar';
import SearchCard from '../features/search/SearchCard';
import TopSection from '../features/search/TopSection';
import '../styles/search/search.css';
import { fetchUsersByQuery } from '../features/user/userService';
import { useChat } from '../context/chatContext';

const SearchPage = () => {
  const [searchMode, setSearchMode] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [searchHistory, setSearchHistory] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useChat();

  const token = localStorage.getItem('token');


  // keep search history (last 5)
  useEffect(() => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory(prev => [...prev.slice(-4), searchTerm]);
    }
  }, [searchTerm]);

  // fetch users when in "users" mode
  useEffect(() => {
    const fetchUsers = async () => {
      if (searchMode !== 'users' || !searchTerm) {
        setUserResults([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const users = await fetchUsersByQuery(token, searchTerm, currentUser._id);
        console.log(users)
        setUserResults(users || []);
      } catch (err) {
        setError('Failed to fetch users');
        setUserResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchTerm, searchMode, token, currentUser]);


  // data handling for different search modes
  const getDataByMode = () => {
    switch (searchMode) {
      case 'users':
        return userResults;
      case 'colleges':
      case 'groups':
      case 'events':
      case 'posts':
        return []; // TODO: hook up APIs for these modes
      default:
        return [];
    }
  };

  const filteredResults =
    searchMode === 'users'
      ? userResults
      : getDataByMode().filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className={`container ${theme}`}>
      <div className="header-row">
        <h1 className="title">Search College Bawa</h1>
      </div>

      {/* Mode switch buttons */}
      <div className="button-group scroll-x">
        {['users', 'colleges', 'groups', 'events', 'posts'].map(mode => (
          <button
            key={mode}
            onClick={() => setSearchMode(mode)}
            className={`switch-btn ${searchMode === mode ? 'active' : ''}`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Search history */}
      {searchHistory.length > 0 && (
        <div className="search-history">
          <strong>Recent:</strong>{' '}
          {searchHistory.map((term, i) => (
            <span key={i} onClick={() => setSearchTerm(term)}>
              {term}
            </span>
          ))}
        </div>
      )}

      {/* Search results */}
      <div className="grid">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="no-results">{error}</p>
        ) : filteredResults.length > 0 ? (
          filteredResults.map(result => (
            <SearchCard
              key={result.id || result._id}
              title={result.name || result.fullName || result.username}
              description={result.description || result.email || ''}
              image={result.profileImage || result.logo || '/default.jpg'}
              hasAction={true}
            />
          ))
        ) : (
          <p className="no-results">
            No results found. Try a different keyword or check trending searches.
          </p>
        )}
      </div>

      {/* Footer (currently no top searches/universities since dummy removed) */}
      <div className="search-footer">
        {/* You can add <TopSection /> back once real data is available */}
      </div>
    </div>
  );
};

export default SearchPage;
