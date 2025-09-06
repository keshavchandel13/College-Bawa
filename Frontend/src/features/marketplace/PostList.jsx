import React from 'react';
import PostCard from '../marketplace/Postcard';

export default function PostList({ posts }) {
  return (
    <div className="posts-container-marketplace">
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard key={post._id || post.id} post={post} />
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}
