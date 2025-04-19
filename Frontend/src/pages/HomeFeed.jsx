import React, { useState } from 'react';
import '../styles/homepage/homefeed.css';
import CreatePostModal from '../features/homefeed/CreatePostModal';

const initialPosts = [
  {
    id: 1,
    user: 'Coder Chacha',
    caption: 'Excited for the upcoming coding challenge. Let’s smash it!',
    profilePicture: 'https://picsum.photos/id/238/50/50',
    image: 'https://picsum.photos/id/238/500/300',
  },
  {
    id: 2,
    user: 'Coder dada',
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

export default function HomeFeed({ token }) {
  const [likedPosts, setLikedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openCreatePost = () => setShowModal(true);
  const closeCreatePost = () => setShowModal(false);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikes) =>
      prevLikes.includes(postId)
        ? prevLikes.filter((id) => id !== postId)
        : [...prevLikes, postId]
    );
  };

  return (
    <div className="home-feed-container">
      <div className="home-feed-title">College Bawa</div>

      {/* Stories Section */}
      <div className="stories-container">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="story">
            <img src={`https://picsum.photos/id/24${num}/80/80`} alt="story" />
            <span>Ustad {num}</span>
          </div>
        ))}
      </div>

      {/* Create Post Box */}
      <div className="create-post-box">
        <img src="https://picsum.photos/id/255/50/50" alt="Your Avatar" />
        <input
          type="text"
          onClick={openCreatePost}
          placeholder="What's on your mind?"
          readOnly
        />
        <button onClick={openCreatePost}>Post</button>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal show={showModal} onClose={closeCreatePost} token={token} />

      {/* Posts Section */}
      <div className="posts-container">
        {initialPosts.map((post) => (
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
            {post.image && (
              <img src={post.image} alt="Post visual" className="post-image" />
            )}
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
