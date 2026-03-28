import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircle } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
const SearchCard = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative bg-white dark:bg-gray-800 p-5 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
    >
      {/* Profile Image with 'Active' Ring */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        <img
          src={user.profileImage || "/default.jpg"}
          className="w-full h-full object-cover rounded-full ring-4 ring-purple-100 dark:ring-purple-900"
        />
        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold truncate">{user.name}</h3>
        <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-widest">
          {user.major || "Computer Science"}
        </p>
        
        {/* Interests/Skills Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['MERN', 'Python'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-[10px] font-bold">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-sm transition-colors">
          Connect
        </button>
        <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:bg-gray-200 transition-colors">
          <FiMessageCircle className="text-lg" />
        </button>
      </div>
    </motion.div>
  );
};

export default SearchCard;