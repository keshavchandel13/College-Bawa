import React from 'react';

const TopSearch = ({ items }) => {
  return (
    <div className="top-section">
      <h2>Top Search</h2>
      <ul className="top-list">
        {items.map((name, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopSearch;
