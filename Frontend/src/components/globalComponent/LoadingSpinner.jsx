import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#f9fafb] dark:bg-[#111827] text-[#333] dark:text-gray-300 font-sans">
      <div className="w-[60px] h-[60px] rounded-full mb-4 animate-spin border-[6px] border-[#e0e0e0] border-t-[#3b82f6] dark:border-[#374151] dark:border-t-[#60a5fa]" />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;