import React from 'react';

const TopCommunities = ({ items }) => {
  return (
    <div className="mt-10">
      <h2 className="text-[1.4rem] font-semibold text-[#003366] dark:text-gray-200 mb-2.5">
        Top Communities
      </h2>
      <ul className="list-none p-0">
        {items.map((name, idx) => (
          <li key={idx} className="mb-2 text-[0.95rem] text-[#333] dark:text-gray-300">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCommunities;