import React from 'react';
import { FiUsers, FiMessageSquare, FiLogOut, FiLogIn } from 'react-icons/fi';

const CommunityCard = ({ community, isMember, onJoin, onLeave, onChat }) => {
  const { name, description, memberCount, tags = [] } = community;

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-3">
      <div>
        <h3 className="text-[#003366] dark:text-gray-100 text-lg font-bold truncate">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1 text-xs text-gray-400">
        <FiUsers className="text-sm" />
        <span>{memberCount ?? community.members?.length ?? 0} members</span>
      </div>

      <div className="flex gap-2 mt-auto pt-2">
        {isMember ? (
          <>
            <button
              onClick={onChat}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#003366] hover:bg-[#00264d] text-white rounded-xl text-sm font-semibold transition-colors"
            >
              <FiMessageSquare /> Chat
            </button>
            <button
              onClick={onLeave}
              aria-label="Leave community"
              className="p-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-500 rounded-xl transition-colors"
            >
              <FiLogOut />
            </button>
          </>
        ) : (
          <button
            onClick={onJoin}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <FiLogIn /> Join
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;