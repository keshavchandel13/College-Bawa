import React from 'react';

const TopCommunities = ({ items }) => {
  return (
    <div className="top-section">
      <h2>Top Communities</h2>
      <ul className="top-list">
        {items.map((name, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopCommunities;
