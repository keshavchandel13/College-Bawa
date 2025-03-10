import React, { useState } from 'react';
import '../styles/homepage/homefeed.css'; 
const posts = [
  {
    id: 1,
    user: 'John Doe',
    text: 'Excited for the upcoming coding challenge. Let’s smash it!',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 2,
    user: 'Jane Smith',
    text: 'Looking for study partners for the upcoming exams!',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 3,
    user: 'Alice Brown',
    text: 'Had a great time at the college event today! #FunDay',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 4,
    user: 'Bob Williams',
    text: 'Who’s up for a weekend trip? Let’s plan it out.',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 5,
    user: 'Emma White',
    text: 'Studying for the final exams, send good vibes!',
    image: 'https://via.placeholder.com/40',
  },
];

export default function HomeFeed() {
  const [likedPosts, setLikedPosts] = useState([]);

  // Toggle like on post
  const toggleLike = (postId) => {
    setLikedPosts((prevLikes) => 
      prevLikes.includes(postId) ? prevLikes.filter(id => id !== postId) : [...prevLikes, postId]
    );
  };

  return (
    <div className="home-feed-container">


      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.image} alt={`${post.user} avatar`} className="post-avatar" />
              <span className="post-user">{post.user}</span>
            </div>
            <p className="post-text">{post.text}</p>
            <div className="post-actions">
              <button 
                className={`post-action-button ${likedPosts.includes(post.id) ? 'liked' : ''}`} 
                onClick={() => toggleLike(post.id)}
              >
                {likedPosts.includes(post.id) ? 'Liked' : 'Like'}
              </button>
              <button className="post-action-button">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
