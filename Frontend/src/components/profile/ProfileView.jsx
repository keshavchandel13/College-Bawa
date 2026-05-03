import React, { useEffect, useState } from 'react';
import { getUserStats } from '../../api/profile';

// Stat card with loading skeleton 
const StatCard = ({ label, value, color, icon, loading }) => (
  <div className="bg-[#f9fafb] dark:bg-[#111827] rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f3f4f6] dark:hover:bg-[#1f2937]">
    {loading ? (
      <>
        <div className="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mb-1" />
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
      </>
    ) : (
      <>
        <p className="text-xl mb-0.5">{icon}</p>
        <p className={`text-2xl font-bold max-sm:text-xl ${color}`}>
          {value ?? 0}
        </p>
        <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-0.5">{label}</p>
      </>
    )}
  </div>
);

// Main component 
const UserProfile = ({ user, setEdit }) => {
  const [stats, setStats]           = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const safeUser = user || {};
  const details  = safeUser.additionalDetails || {};
  const skills   = Array.isArray(details.skills)
    ? details.skills
    : details.skills
      ? [details.skills]
      : [];

  useEffect(() => {
    if (!safeUser._id) return;
    setStatsLoading(true);
    getUserStats(safeUser._id)
      .then(setStats)
      .catch(err => console.error('[getUserStats]', err))
      .finally(() => setStatsLoading(false));
  }, [safeUser._id]);

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">No user profile found.</div>
    );
  }

  const statCards = [
    { label: 'Posts',      value: stats?.postCount,      color: 'text-blue-600',   icon: '📝' },
    { label: 'Friends',    value: stats?.friendCount,    color: 'text-green-600',  icon: '🤝' },
    { label: 'Likes',      value: stats?.totalLikes,     color: 'text-red-500',    icon: '❤️' },
    { label: 'Comments',   value: stats?.totalComments,  color: 'text-yellow-500', icon: '💬' },
    { label: 'Communities',value: stats?.communityCount, color: 'text-purple-600', icon: '🏛️' },
    { label: 'Months',     value: stats?.memberSince,    color: 'text-indigo-500', icon: '📅' },
  ];

  return (
    <div className="max-w-[768px] mx-auto px-6 pb-12 min-h-screen flex flex-col box-border bg-white dark:bg-[#111827] max-sm:px-4 max-sm:pt-4 md:max-w-full md:m-0 md:px-8 md:pb-16">
      <div className="bg-white dark:bg-[#1f2937] dark:text-[#f9fafb] rounded-2xl p-8 mt-4 flex-1 flex flex-col relative z-10 shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-[#e5e7eb] dark:border-[#374151] max-sm:p-5 max-sm:rounded-xl">

        {/* Header */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="flex-shrink-0 relative">
            <img
              src={safeUser.profileImage || '/default.jpg'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-[#1f2937] shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-sm:w-24 max-sm:h-24"
              onError={e => (e.target.src = '/default.jpg')}
            />
            {/* Online indicator */}
            {safeUser.isOnline && (
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#1f2937] rounded-full" />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-[1.875rem] font-bold text-[#111827] dark:text-[#f9fafb] max-sm:text-2xl">
              {safeUser.name || safeUser.email || 'User'}
            </h1>
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">
              {details.branch || 'Branch not specified'}
            </p>
            {details.college && (
              <p className="text-[0.9rem] text-[#4b5563] dark:text-[#d1d5db] mt-1">
                🎓 {details.college}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {details.bio && (
          <div className="mt-8 text-[#374151] dark:text-[#e5e7eb] leading-relaxed">
            <h3 className="font-semibold text-base mb-2">Bio</h3>
            <p className="text-sm">{details.bio}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="my-6">
            <h3 className="text-base font-semibold mb-2.5">Skills</h3>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="bg-[#f0f0f0] dark:bg-[#374151] text-[#333] dark:text-[#f9fafb] px-3 py-1 rounded-xl text-xs font-medium"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stats grid — real data from aggregate */}
        <div className="mt-8">
          <h3 className="text-base font-semibold mb-4 text-[#111827] dark:text-[#f9fafb]">
            Activity Stats
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {statCards.map(card => (
              <StatCard key={card.label} {...card} loading={statsLoading} />
            ))}
          </div>
        </div>

        {/* Edit button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setEdit?.(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] dark:bg-[#2563eb] dark:hover:bg-[#1e40af] text-white text-base font-medium cursor-pointer hover:-translate-y-px transition-all duration-300"
          >
            ✏️ Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;