import React, { useState, useEffect } from "react";
import { getComment, commentOnPost } from "../../api/post";
import Comment from "./Comment";

export default function CommentSection({ postId, token }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const data = await getComment(postId, token);
    setComments(data);
  };

  useEffect(() => { fetchComments(); }, []);

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
      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
          placeholder="Type a spicy comment..."
        />
        <button
          onClick={handleComment}
          className="bg-indigo-500 text-white px-5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 hover:brightness-110 active:scale-95 transition-all"
        >
          Send
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-indigo-500">
        {comments.map((c) => (
          <Comment key={c._id} comment={c} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}