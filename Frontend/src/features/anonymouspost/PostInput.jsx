import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import '../../styles/anonymouspost/postinput.css';

export function PostInput({ onPost }) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <div className="pi-post-card">
      <div className="pi-post-content">
        <textarea
          placeholder="Share your thoughts anonymously..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="pi-post-textarea"
        />
        <div className="pi-post-actions">
          <button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="pi-post-button"
          >
            <FaPaperPlane className="pi-icon" />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
