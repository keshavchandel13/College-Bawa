import React from 'react';

const TopSection = ({ title, items }) => {
  return (
    <div className="top-section">
      <h2>{title}</h2>
      <div className="top-tags">
        {items.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default TopSection;