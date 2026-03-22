import React from "react";

const SearchCard = ({ title, description, image }) => {
  return (
    <div className="card hover:scale-[1.02] transition">

      <img
        src={image || "/default.jpg"}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />

      <h3 className="text-sm font-semibold">{title}</h3>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {description}
      </p>

      <div className="flex justify-between">
        <button className="text-primary text-sm font-medium">
          View
        </button>

        <button className="text-sm text-gray-500">
          Follow
        </button>
      </div>
    </div>
  );
};

export default SearchCard;