import React from 'react';

const CommunityCard = ({ name, description, members }) => {
  return (
    <div className="
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      p-5 rounded-[14px]
      shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.6)]
      hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_18px_rgba(0,0,0,0.4)]
      transition-shadow duration-300
    ">
      <h3 className="text-[#003366] dark:text-gray-100 text-[1.2rem] font-semibold">
        {name}
      </h3>

      <p className="text-[0.95rem] my-2.5 text-[#555] dark:text-gray-300">
        {description}
      </p>

      <p className="text-[0.95rem] my-2.5 text-[#555] dark:text-gray-300">
        <strong>{members}</strong> members
      </p>

      <button className="
        px-3.5 py-2 text-[0.9rem] rounded-lg border-none cursor-pointer
        bg-[#003366] dark:bg-blue-600 dark:hover:bg-blue-800
        text-white
        transition-colors duration-200
      ">
        Join
      </button>
    </div>
  );
};

export default CommunityCard;