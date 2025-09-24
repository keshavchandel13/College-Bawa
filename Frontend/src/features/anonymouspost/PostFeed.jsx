import React from 'react';
import { PostCard } from './PostCard';
import '../../styles/anonymouspost/postfeed.css';

export function PostFeed({ posts }) {
  return (
    <div className="anon-post-feed">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
