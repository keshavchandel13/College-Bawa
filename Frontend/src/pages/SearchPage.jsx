import React, { useState } from 'react';
import SearchBar from '../features/search/SearchBar';
import SearchCard from '../features/search/SearchCard';
import TopSection from '../features/search/TopSection';
import '../styles/search/search.css'
const dummyUsers = [
  { id: 1, name: 'Aman Sharma', description: 'CSE Student, JUIT Solan' },
  { id: 2, name: 'Priya Verma', description: 'ECE, NIT Trichy' },
  { id: 2, name: 'Shivam Chambyal', description: 'CSE,  IIT Mandi' },
];

const dummyColleges = [
  { id: 1, name: 'IIT Bombay', description: 'Top Engineering College in India' },
  { id: 2, name: 'NIT Surathkal', description: 'Leading technical institute' },
];

const topSearches = ['IIT', 'Design Club', 'CSE', 'Delhi', 'Hackathons'];
const topUniversities = ['IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'NIT Trichy'];

const SearchPage = () => {
  const [searchMode, setSearchMode] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults =
    searchMode === 'users'
      ? dummyUsers.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : dummyColleges.filter(college =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="container">
      <h1 className="title">Search College Bawa</h1>

      <div className="button-group">
        <button
          onClick={() => setSearchMode('users')}
          className={`switch-btn ${searchMode === 'users' ? 'active' : ''}`}
        >
          Search Users
        </button>
        <button
          onClick={() => setSearchMode('colleges')}
          className={`switch-btn ${searchMode === 'colleges' ? 'active' : ''}`}
        >
          Search Colleges
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid">
        {filteredResults.map(result => (
          <SearchCard key={result.id} title={result.name} description={result.description} />
        ))}
      </div>
        <div className="search-footer">

      <TopSection title="Top Searches" items={topSearches} />
      <TopSection title="Top Universities" items={topUniversities} />
        </div>
    </div>
  );
};

export default SearchPage;