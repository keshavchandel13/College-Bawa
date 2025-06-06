import React from 'react';
import PostCard from '../marketplace/Postcard';

export default function PostList({ posts }) {
  return (
    <div className="posts-container-marketplace">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
