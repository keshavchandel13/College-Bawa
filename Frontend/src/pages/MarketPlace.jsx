import React, { useState } from 'react';
import '../styles/marketplace/marketplace.css'; // Include your styles here

const initialPosts = [
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
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false); // Toggle between buy and sell view
  const [newPost, setNewPost] = useState({
    category: 'Books',
    description: '',
    price: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(''); // State for image preview

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSellClick = () => {
    setShowForm(true); // Show the form to sell an item
  };

  const handleBuyClick = () => {
    setShowForm(false); // Show the buy posts again
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a local URL for the file
      setNewPost({ ...newPost, image: file });
      setImagePreview(URL.createObjectURL(file)); // Set the image preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = posts.length + 1;
    const title = `${newPost.category} Item #${newId}`;
    const postToAdd = {
      id: newId,
      title,
      description: newPost.description,
      price: `$${newPost.price}`,
      category: newPost.category,
      image: imagePreview || '' // Use the local image URL or fallback to empty
    };
    setPosts([postToAdd, ...posts]);
    setNewPost({ category: 'Books', description: '', price: '', image: '' });
    setImagePreview(''); // Clear the image preview after submission
    setShowForm(false); // After submitting, hide the form again
  };

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
        <button className={!showForm ? 'active' : ''} onClick={handleBuyClick}>
          Buy
        </button>
        <button className={showForm ? 'active' : ''} onClick={handleSellClick}>
          Sell
        </button>
      </div>

      {showForm ? (
        <form className="sell-form" onSubmit={handleSubmit}>
          <h3>List Your Item for Sale</h3>

          <label>Category:</label>
          <select name="category" value={newPost.category} onChange={handleInputChange}>
            <option value="Books">Books</option>
            <option value="Handmade Notes">Handmade Notes</option>
            <option value="Projects">Projects</option>
          </select>

          <label>Description:</label>
          <textarea
            name="description"
            value={newPost.description}
            onChange={handleInputChange}
            required
            placeholder="Describe the item..."
          />

          <label>Price ($):</label>
          <input
            type="number"
            name="price"
            value={newPost.price}
            onChange={handleInputChange}
            required
            min="1"
          />

          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" className="preview-image" />
            </div>
          )}

          <button type="submit">Post Item</button>
        </form>
      ) : (
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
      )}
    </div>
  );
}
