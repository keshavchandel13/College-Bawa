import React, { useState } from 'react';
import '../styles/homepage/homefeed.css';

const posts = [
  {
    id: 1,
    user: 'John Doe',
    caption: 'Excited for the upcoming coding challenge. Let’s smash it!',
    profilePicture: 'https://picsum.photos/id/238/50/50',
    image: 'https://picsum.photos/id/238/500/300',
  },
  {
    id: 2,
    user: 'Jane Smith',
    caption: 'Looking for study partners for the upcoming exams!',
    profilePicture: 'https://picsum.photos/id/237/50/50',
    image: 'https://picsum.photos/id/237/500/300',
  },
  {
    id: 3,
    user: 'Alice Brown',
    caption: 'Had a great time at the college event today! #FunDay',
    profilePicture: 'https://picsum.photos/id/239/50/50',
    image: 'https://picsum.photos/id/239/500/300',
  },
  {
    id: 4,
    user: 'Bob Williams',
    caption: 'Who’s up for a weekend trip? Let’s plan it out.',
    profilePicture: 'https://picsum.photos/id/240/50/50',
    image: 'https://picsum.photos/id/240/500/300',
  },
  {
    id: 5,
    user: 'Emma White',
    caption: 'Studying for the final exams, send good vibes!',
    profilePicture: 'https://picsum.photos/id/253/50/50',
    image: 'https://picsum.photos/id/253/500/300',
  },
];

export default function HomeFeed() {
  const [likedPosts, setLikedPosts] = useState([]);

  // Toggle like on post
  const toggleLike = (postId) => {
    setLikedPosts((prevLikes) =>
      prevLikes.includes(postId)
        ? prevLikes.filter((id) => id !== postId)
        : [...prevLikes, postId]
    );
  };

  return (
    <div className="home-feed-container">
      <div className="home-feed-title">Explore</div>

      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img
                src={post.profilePicture}
                alt={`${post.user} avatar`}
                className="post-avatar"
              />
              <span className="post-user">{post.user}</span>
            </div>
            <p className="post-caption">{post.caption}</p>
            <img src={post.image} alt="Post visual" className="post-image" />
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
