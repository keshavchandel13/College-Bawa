import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export function PostInput({ onPost }) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <div className="
      bg-white/85 dark:bg-[rgba(31,41,55,0.95)]
      backdrop-blur-[6px]
      p-5 max-sm:p-4
      rounded-xl max-sm:rounded-[10px]
      shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)]
      hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5
      transition-all duration-300
      my-3 mx-auto max-w-[480px] w-full
    ">
      <div className="flex flex-col gap-4">
        {/* Textarea */}
        <textarea
          placeholder="Share your thoughts anonymously..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
            w-full min-h-[100px] resize-none
            border border-[#ddd] dark:border-[#6b7280]
            rounded-md p-3
            text-sm max-sm:text-[13px]
            bg-[#f9f9f9] dark:bg-[rgba(55,65,81,0.8)]
            text-gray-900 dark:text-[#f3f4f6]
            placeholder-gray-400
            focus:outline-none focus:border-[#888] dark:focus:border-[#2563eb]
            focus:bg-white dark:focus:bg-[rgba(55,65,81,0.95)]
            transition-all duration-200
          "
        />

        {/* Actions row */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="
              flex items-center gap-1.5
              px-4 py-2 max-sm:px-3 max-sm:py-1.5 max-sm:text-[13px]
              border-none rounded-md
              bg-gradient-to-r from-[#3b82f6] to-[#9333ea]
              dark:from-[#2563eb] dark:to-[#7e22ce]
              text-white font-medium cursor-pointer
              hover:not-disabled:from-[#2563eb] hover:not-disabled:to-[#7e22ce]
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-300
            "
          >
            <FaPaperPlane className="w-4 h-4" />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}