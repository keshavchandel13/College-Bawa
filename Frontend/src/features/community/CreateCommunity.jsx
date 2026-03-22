import React from 'react';

const CreateCommunity = () => {
  return (
    <div className="
      p-8 rounded-xl mb-8 w-full
      bg-white dark:bg-gray-800
      shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.6)]
    ">
      <h2 className="text-[#00aaff] dark:text-gray-200 mb-4 text-xl font-semibold">
        Create a New Community
      </h2>

      <input
        type="text"
        placeholder="Community Name"
        className="
          w-full px-3 py-3 mb-4 rounded-lg border-none outline-none
          bg-[#f9f9f9] dark:bg-gray-700
          text-[#111] dark:text-gray-100
          placeholder-[#aaa] dark:placeholder-gray-400
        "
      />

      <textarea
        rows="4"
        placeholder="Description..."
        className="
          w-full px-3 py-3 mb-4 rounded-lg border-none outline-none resize-none
          bg-[#f9f9f9] dark:bg-gray-700
          text-[#111] dark:text-gray-100
          placeholder-[#aaa] dark:placeholder-gray-400
        "
      />

      <button className="
        bg-[#00aaff] hover:bg-[#008ecc]
        text-white px-5 py-2.5 rounded-md border-none cursor-pointer
        transition-colors duration-200
      ">
        Create
      </button>
    </div>
  );
};

export default CreateCommunity;