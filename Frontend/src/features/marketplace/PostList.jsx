import React from "react";
import PostCard from "./Postcard";

export default function PostList({ posts }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No items found
        </p>
      )}
    </div>
  );
}