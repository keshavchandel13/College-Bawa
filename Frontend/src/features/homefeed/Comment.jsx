import React,{ useState } from "react";

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
    <div className="ml-4 mt-2">
      <div className="bg-gray-800 text-white p-2 rounded-lg">
        <p className="text-sm font-semibold">{comment.user.name}</p>
        <p className="text-sm">{comment.text}</p>
      </div>

      <button
        onClick={() => setShowReply(!showReply)}
        className="text-xs text-blue-400 mt-1"
      >
        Reply
      </button>

      {showReply && (
        <div className="mt-2 flex gap-2">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 px-2 py-1 rounded bg-gray-700 text-white"
            placeholder="Write reply..."
          />
          <button
            onClick={handleReply}
            className="bg-blue-500 px-3 rounded"
          >
            Send
          </button>
        </div>
      )}

      {/* Render replies recursively */}
      {comment.replies?.map((reply) => (
        <Comment key={reply._id} comment={reply} onReply={onReply} />
      ))}
    </div>
  );
}