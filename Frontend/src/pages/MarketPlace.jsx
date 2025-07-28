import React, { useState } from 'react';
import '../styles/marketplace/marketplace.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialPosts = [
  {
    id: 1,
    category: 'Books',
    title: 'Data Structures & Algorithms',
    price: '300',
    originalPrice: '500',
    description: 'Clean, lightly used textbook for DSA.',
    seller: 'Ravi Kumar',
    rating: 4.8,
    location: 'Delhi University',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    views: 156,
    label: 'Trending',
    dateAdded: '2023-07-20'
  },
  {
    id: 2,
    category: 'Handwritten Notes',
    title: 'Physics Class 12 Notes',
    price: '150',
    description: 'Colored and detailed handwritten notes.',
    seller: 'Aarti Sharma',
    rating: 4.9,
    location: 'IIT Campus',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5g0JmbY-pJVbyOZTQp6k6lRmCmyUSwYotw&s',
    views: 234,
    label: 'Just Listed',
    dateAdded: '2024-07-27'
  },
  {
    id: 3,
    category: 'Projects',
    title: 'Arduino Uno Project Kit',
    price: '500',
    originalPrice: '',
    description: 'Fully working IoT project setup.',
    seller: 'Neha Verma',
    rating: 4.7,
    location: 'Mumbai',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSW67LKE1m5sInWse4RKZxBB3ETzRWb3b7mr3xhXe6HXbUe0pMHQynoOAIzdHvyRVIdQFhJdg-IER8ka4ZgigUL5qQBcfpkAsFaGOIj9Atfy-ityu4Tu_IuFWm6AL0y5puIs2-0eA&usqp=CAc',
    views: 89,
    label: 'Best Deals',
    dateAdded: '2024-06-18'
  }
];

export default function Marketplace() {
  const [posts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const filteredPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedSort === 'priceLow') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (selectedSort === 'priceHigh') {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (selectedSort === 'recent') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      } else if (selectedSort === 'discount') {
        const discountA = a.originalPrice ? parseFloat(a.originalPrice) - parseFloat(a.price) : 0;
        const discountB = b.originalPrice ? parseFloat(b.originalPrice) - parseFloat(b.price) : 0;
        return discountB - discountA;
      } else {
        return 0;
      }
    });

  return (
    <div className="marketplace marketplace-container">
      {/* 🔥 Promo Banner */}
      <div className="promo-banner">
        🎉 <strong>Abhi ye decide hoga</strong>
      </div>

      {/* 🔍 Search + Sort + Filters */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search for books, notes, or projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filter-bar">
        <select
          className="sort-dropdown"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="recent">Recently Added</option>
          <option value="discount">Highest Discount</option>
        </select>

        <div className="filter-tabs">
          <button className="active">🔥 Trending</button>
          <button>🕒 Just Listed</button>
          <button>💰 Best Deals</button>
          <button>📍 Nearby</button>
          <button>✅ Verified</button>
        </div>
      </div>

      {/* 🧾 Post Cards */}
      <div className="posts-container-marketplace">
        {filteredPosts.map(post => (
          <div className="post-card" key={post.id}>
            <div className="tag-label">{post.label}</div>
            <img className="post-image" src={post.image} alt={post.title} />
            <div className="post-content">
              <p className="category">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="price">
                ₹{post.price}
                {post.originalPrice && <span className="original-price"> ₹{post.originalPrice}</span>}
              </div>
              <div className="meta">
                <span className="seller">{post.seller} ⭐ {post.rating}</span>
                <span className="location">{post.location}</span>
              </div>
              <button className="buy-now">⚡ Buy Now</button>
              <div className="views">{post.views} people viewed this today!</div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}
