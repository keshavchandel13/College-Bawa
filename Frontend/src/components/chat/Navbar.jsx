import React from "react";

const Navbar = ({ selectedUser }) => {
  return (
    <div className="w-full mt-10 px-px bg-blue-600 text-white flex items-center justify-between  py-3 shadow-md ">
      <div className="flex items-center gap-3 ">
        <img
          src={selectedUser?.profileImage || "https://picsum.photos/201"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
        <span className="text-sm font-semibold">{selectedUser?.name || "User"}</span>
      </div>
    </div>
  );
};

export default Navbar;
