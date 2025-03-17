import React from "react";

const Navbar = ({ currentUser  }) => {
  return (
    <div className="w-full bg-blue-600 text-white flex items-center justify-between px-4 py-3">
      <h1 className="text-xl font-semibold">College Bawa Chat</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm">{currentUser ?.name}</span>
        <img
          src="/profile-placeholder.png"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;