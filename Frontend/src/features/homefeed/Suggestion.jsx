import React from 'react';
import '../../styles/homepage/suggestion.css';

function Suggestion() {
  const suggestedUsers = [
    { name: "priya._23", avatar: "https://picsum.photos/201/300" },
    { name: "rahul_dev", avatar: "https://picsum.photos/202/300" },
    { name: "artsy.aman", avatar: "https://picsum.photos/205/300" },
  ];

  const trendingCommunities = [
    { name: "Tech Geeks" },
    { name: "Campus Startups" },
    { name: "Photography Club" },
  ];

  return (
    <div className="suggestion-container">
      <h4 className="section-title">Suggested for you</h4>
      {suggestedUsers.map((user, index) => (
        <div className="suggestion-item" key={index}>
          <img src={user.avatar} alt={user.name} className="suggestion-avatar" />
          <span className="suggestion-name">{user.name}</span>
          <button className="follow-btn">Follow</button>
        </div>
      ))}

      <h4 className="section-title community-title">Trending Communities</h4>
      {trendingCommunities.map((community, index) => (
        <div className="community-item" key={index}>
          <span className="community-icon">📈</span>
          <span className="community-name">{community.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Suggestion;
