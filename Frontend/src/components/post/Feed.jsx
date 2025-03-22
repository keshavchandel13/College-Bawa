//Ye post display kregi file frontend mai backend se

import React, { useEffect, useState } from "react";
import { likePost, commentOnPost, sharePost } from "../../api/post";
import PostItem from "./PostItem";

const Feed = ({ token }) => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleLike = async (postId) => {
    await likePost(postId, token);
    fetchPosts();
  };

  const handleComment = async (postId, text) => {
    if (!text.trim()) return;
    await commentOnPost(postId, text, token);
    fetchPosts();
  };

  const handleShare = async (postId) => {
    await sharePost(postId, token);
    fetchPosts();
  };

  return (
    <div className="feed">
      {posts.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          onLike={handleLike}
          onShare={handleShare}
          onComment={handleComment}
        />
      ))}
    </div>
  );
};

export default Feed;
