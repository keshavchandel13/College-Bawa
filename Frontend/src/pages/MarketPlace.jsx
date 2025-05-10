import React, { useState } from 'react';
import "../styles/marketplace/marketplace.css";


const mockPosts = [
  {
    id: 1,
    category: 'Books',
    title: 'Data Structures & Algorithms',
    price: '$25',
    description: 'Clean, lightly used textbook for DSA.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    category: 'Handmade Notes',
    title: 'Physics Class 12 Notes',
    price: '$10',
    description: 'Handwritten, well-organized and colored notes.',
    image: 'https://images.unsplash.com/photo-1616401789869-356aa8e75b1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    category: 'Projects',
    title: 'Arduino Home Automation',
    price: '$50',
    description: 'Complete working project with code and hardware.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1c2?auto=format&fit=crop&w=600&q=80'
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredPosts = mockPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="marketplace-container">
      <h1 className="page-title">🎓 Student Marketplace</h1>
      <p className="page-subtitle">Buy & sell study materials, notes, and projects</p>

      <input
        type="text"
        placeholder="Search Books, Notes, Projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="button-group">
        <button className={filter === 'buy' ? 'active' : ''} onClick={() => setFilter('buy')}>
          Buy
        </button>
        <button className={filter === 'sell' ? 'active' : ''} onClick={() => setFilter('sell')}>
          Sell
        </button>
      </div>

      <div className="posts-container">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <span>{post.price}</span>
              <div className="category-label">{post.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}