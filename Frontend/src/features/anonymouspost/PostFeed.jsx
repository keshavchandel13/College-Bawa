import React from 'react';
import { PostCard } from './PostCard';

export function PostFeed({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}