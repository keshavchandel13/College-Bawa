import React, { useState } from 'react';
import '../styles/marketplace/marketplace.css';
import SearchBar from '../features/marketplace/SearchBar';
import ToggleButtons from '../features/marketplace/ToggleButton';
import SellForm from '../features/marketplace/SellForm';
import PostList from '../features/marketplace/PostList';

const initialPosts = [
  {
    id: 1,
    category: 'Books',
    title: 'Data Structures & Algorithms',
    price: '300 Rs',
    description: 'Clean, lightly used textbook for DSA.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    category: 'Handmade Notes',
    title: 'Physics Class 12 Notes',
    price: '150 Rs',
    description: 'Handwritten, well-organized and colored notes.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5g0JmbY-pJVbyOZTQp6k6lRmCmyUSwYotw&s'
  },
  {
    id: 3,
    category: 'Projects',
    title: 'Arduino Uno',
    price: '500 Rs',
    description: 'Complete working project with code and hardware.',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSW67LKE1m5sInWse4RKZxBB3ETzRWb3b7mr3xhXe6HXbUe0pMHQynoOAIzdHvyRVIdQFhJdg-IER8ka4ZgigUL5qQBcfpkAsFaGOIj9Atfy-ityu4Tu_IuFWm6AL0y5puIs2-0eA&usqp=CAc'
  },
];
export default function Marketplace() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    category: 'Books',
    description: '',
    price: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSellClick = () => setShowForm(true);
  const handleBuyClick = () => setShowForm(false);

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      setImagePreview(URL.createObjectURL(file));
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
      image: imagePreview
    };
    setPosts([postToAdd, ...posts]);
    setNewPost({ category: 'Books', description: '', price: '', image: '' });
    setImagePreview('');
    setShowForm(false);
  };

  return (
    <div className="marketplace-container">
      <h1 className="page-title">Student Marketplace</h1>
      <p className="page-subtitle">Buy & sell study materials, notes, and projects</p>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ToggleButtons showForm={showForm} handleBuyClick={handleBuyClick} handleSellClick={handleSellClick} />

      {showForm
        ? <SellForm
            newPost={newPost}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
            handleSubmit={handleSubmit}
          />
        : <PostList posts={filteredPosts} />}
    </div>
  );
}
