import React from "react";
import { useState, useEffect } from "react";
import { getComment, commentOnPost } from "../../api/post";
import Comment from "./Comment";

export default function CommentSection({ postId, token }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const data = await getComment(postId, token);
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleComment = async () => {
    if (!text.trim()) return;

    await commentOnPost(postId, text, token);
    setText("");
    fetchComments();
  };

  const handleReply = async (parentId, replyText) => {
    await commentOnPost(postId, replyText, token, parentId);
    fetchComments();
  };

  return (
    <div className="w-full">

    <div className="bg-black text-white p-4 rounded-lg mt-3">
      
      {/* Input */}
      <div className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-gray-800"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleComment}
          className="bg-blue-500 px-4 rounded"
        >
          Post
        </button>
      </div>

      {/* Comments */}
      <div className="max-h-60 overflow-y-auto">
        {comments.map((c) => (
          <Comment key={c._id} comment={c} onReply={handleReply} />
        ))}
      </div>
    </div>
    </div>
  );
}