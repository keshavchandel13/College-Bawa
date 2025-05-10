import React from 'react';

const CommunityCard = ({ name, description, members }) => {
  return (
    <div className="community-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <p><strong>{members}</strong> members</p>
      <button className="join-btn">Join</button>
    </div>
  );
};

export default CommunityCard;
