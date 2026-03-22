import React from "react";
export default function PostCard({ post }) {
  return (
    <div className="card hover:scale-[1.02] transition">

      <img
        src={post.images?.[0] || "/default.jpg"}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="font-semibold text-sm">{post.title}</h3>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {post.description?.slice(0, 60)}...
      </p>

      <div className="flex justify-between items-center mt-2">
        <span className="font-semibold text-primary">
          ₹{post.price}
        </span>

        <button className="text-sm text-gray-500">
          View
        </button>
      </div>
    </div>
  );
}