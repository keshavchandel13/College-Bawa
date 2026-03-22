import React, { useState } from "react";

export default function Comment({ comment, onReply }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment._id, replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="group animate-in fade-in slide-in-from-left-2">
      <div className="flex gap-3">
        <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700">
          <p className="text-[11px] font-black uppercase text-indigo-500 mb-1">{comment.user.name}</p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{comment.text}</p>
        </div>
      </div>

      <div className="ml-2 mt-1 flex items-center gap-4">
        <button
          onClick={() => setShowReply(!showReply)}
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors"
        >
          Reply
        </button>
        <span className="text-[10px] text-slate-300">2h ago</span>
      </div>

      {showReply && (
        <div className="mt-3 flex gap-2 ml-4">
          <input
            value={replyText}
            autoFocus
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-indigo-100 dark:border-slate-600 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
            placeholder="Reply..."
          />
          <button
            onClick={handleReply}
            className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-xs font-bold"
          >
            Post
          </button>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="ml-6 mt-3 border-l-2 border-slate-100 dark:border-slate-800 pl-4 space-y-4">
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}