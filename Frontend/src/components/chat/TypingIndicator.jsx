import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-1 items-center px-3 py-1">
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></span>
    </div>
  );
};

export default TypingIndicator;