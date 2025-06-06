import React from 'react';
const TrendingCommunity = ({items}) => {
  return (
   <div className="top-section">
      <h2>Today's Trending Community</h2>
      <ul className="top-list">
        {items.map((name, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCommunity;