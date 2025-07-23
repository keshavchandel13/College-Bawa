import React, { useState, useEffect } from 'react';
import SearchBar from '../features/search/SearchBar';
import SearchCard from '../features/search/SearchCard';
import TopSection from '../features/search/TopSection';
import '../styles/search/search.css';

const dummyUsers = [
  { id: 1, name: 'Aman Sharma', description: 'CSE Student, JUIT Solan', avatar: '/default.jpg' },
  { id: 2, name: 'Priya Verma', description: 'ECE, NIT Trichy', avatar: '/default.jpg' },
  { id: 3, name: 'Shivam Chambyal', description: 'CSE, IIT Mandi', avatar: '/default.jpg' },
];

const dummyColleges = [
  { id: 1, name: 'IIT Bombay', description: 'Top Engineering College in India', logo: '/iitb.png' },
  { id: 2, name: 'NIT Surathkal', description: 'Leading technical institute', logo: '/nits.png' },
];

const dummyGroups = [
  { id: 1, name: 'Coding Club', description: 'Competitive programming group' },
];

const dummyEvents = [
  { id: 1, name: 'HackFest 2025', description: 'National-level Hackathon' },
];

const dummyPosts = [
  { id: 1, name: '10 Best Colleges for AI', description: 'Detailed comparison of top colleges' },
];

const topSearches = ['#Hackathon', '#IIT', '#PhotographyClub', '#CSE', '#Delhi'];
const topUniversities = ['IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'NIT Trichy'];

const SearchPage = () => {
  const [searchMode, setSearchMode] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory(prev => [...prev.slice(-4), searchTerm]); // Keep last 5
    }
  }, [searchTerm]);

  const getDataByMode = () => {
    switch (searchMode) {
      case 'users':
        return dummyUsers;
      case 'colleges':
        return dummyColleges;
      case 'groups':
        return dummyGroups;
      case 'events':
        return dummyEvents;
      case 'posts':
        return dummyPosts;
      default:
        return [];
    }
  };

  const filteredResults = getDataByMode().filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className={`container ${theme}`}>
      <div className="header-row">
        <h1 className="title">Search College Bawa</h1>
      </div>

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

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {searchHistory.length > 0 && (
        <div className="search-history">
          <strong>Recent:</strong>{' '}
          {searchHistory.map((term, i) => (
            <span key={i} onClick={() => setSearchTerm(term)}>{term}</span>
          ))}
        </div>
      )}

      <div className="grid">
        {filteredResults.length > 0 ? (
          filteredResults.map(result => (
            <SearchCard
              key={result.id}
              title={result.name}
              description={result.description}
              image={result.avatar || result.logo}
              hasAction={true}
            />
          ))
        ) : (
          <p className="no-results">No results found. Try a different keyword or check trending searches.</p>
        )}
      </div>

      <div className="search-footer">
        <TopSection title="Top Searches" items={topSearches} />
        <TopSection title="Top Universities" items={topUniversities} />
      </div>
    </div>
  );
};

export default SearchPage;
