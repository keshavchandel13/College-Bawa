import React from 'react';
// import '../../styles/homepage/story.css';

export default function Story({ image, name }) {
  return (
    <div className="story">
      <img src={image} alt={`${name}'s story`} />
      <span>{name}</span>
    </div>
  );
}
