import React from 'react';

const SearchCard = ({ title, description, image, hasAction }) => {
  return (
    <div className="card">
      {image && <img src={image} alt="logo" className="card-img" />}
      <h3>{title}</h3>
      <p>{description}</p>
      {hasAction && (
        <div className="card-actions">
          <button className="primary-btn">View</button>
          <button className="secondary-btn">Follow</button>
        </div>
      )}
    </div>
  );
};

export default SearchCard;
