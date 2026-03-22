import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user, setEdit }) => {
  const navigate = useNavigate();

  if (!user) return <div>No user profile found.</div>;

  return (
    /* ── Outer container ── */
    <div className="
      max-w-[768px] mx-auto px-6 pt-6 pb-12 min-h-screen flex flex-col box-border
      bg-white dark:bg-[#111827]
      max-sm:px-4 max-sm:pt-4 max-sm:pb-[calc(5rem+env(safe-area-inset-bottom))] max-sm:bg-white dark:max-sm:bg-[#111827]
      md:max-w-full md:m-0 md:px-8 md:pb-16
    ">

      {/* ── Profile Card ── */}
      <div className="
        bg-white dark:bg-[#1f2937] dark:text-[#f9fafb]
        rounded-2xl p-8 mt-4 flex-1 flex flex-col relative z-10
        shadow-[0_8px_24px_rgba(0,0,0,0.1)]
        border border-[#e5e7eb] dark:border-[#374151]
        max-sm:p-5 max-sm:rounded-xl max-sm:mt-2
        md:rounded-none md:h-full md:p-8 md:mt-4
      ">

        {/* Header */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">

          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.profileImage || "/default.jpg"}
              alt="Profile"
              className="
                w-32 h-32 rounded-full object-cover
                border-4 border-white dark:border-[#1f2937]
                shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                max-sm:w-24 max-sm:h-24
                md:w-[7rem] md:h-[7rem]
              "
            />
          </div>

          {/* Name + branch + college */}
          <div className="flex-1">
            <h1 className="text-[1.875rem] font-bold text-[#111827] dark:text-[#f9fafb] max-sm:text-2xl md:text-[1.75rem]">
              {user.name || user.email}
            </h1>
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">
              {user.additionalDetails.branch}
            </p>
            <div className="flex flex-wrap gap-3 mt-2 text-[0.9rem] text-[#4b5563] dark:text-[#d1d5db] max-sm:text-[0.8rem]">
              <span>🎓 {user.additionalDetails.college}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.additionalDetails.bio && (
          <div className="mt-8 text-[#374151] dark:text-[#e5e7eb] leading-relaxed max-sm:text-[0.85rem] md:text-[0.95rem]">
            <h3 className="font-semibold text-base mb-2">Bio</h3>
            <p>{user.additionalDetails.bio}</p>
          </div>
        )}

        {/* Skills */}
        {user.additionalDetails.skills && (
          <div className="my-5">
            <h3 className="text-lg font-semibold mb-2.5">Skills</h3>
            <ul className="list-none flex flex-wrap gap-2.5 p-0 m-0">
              {Array.isArray(user.additionalDetails.skills)
                ? user.additionalDetails.skills.map((skill, index) => (
                    <li key={index} className="bg-[#f0f0f0] dark:bg-[#374151] text-[#333] dark:text-[#f9fafb] px-3 py-1.5 rounded-xl text-sm">
                      {skill}
                    </li>
                  ))
                : (
                    <li className="bg-[#f0f0f0] dark:bg-[#374151] text-[#333] dark:text-[#f9fafb] px-3 py-1.5 rounded-xl text-sm">
                      {user.additionalDetails.skills}
                    </li>
                  )
              }
            </ul>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-center max-sm:gap-3 md:grid-cols-3 md:gap-5">
          <StatCard label="Posts"   value={user.posts}   color="text-blue-600" />
          <StatCard label="Friends" value={user.friends} color="text-green-600" />
          <StatCard label="Groups"  value={user.groups}  color="text-purple-600" />
          <StatCard label="Awards"  value={user.awards}  color="text-yellow-500" />
        </div>

        {/* Edit Button */}
        <div className="text-center mt-8 max-sm:mb-[calc(4.5rem+env(safe-area-inset-bottom))]">
          <button
            onClick={() => setEdit(true)}
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl border-none
              bg-[#3b82f6] hover:bg-[#2563eb] dark:bg-[#2563eb] dark:hover:bg-[#1e40af]
              text-white text-base font-medium cursor-pointer
              hover:-translate-y-px transition-all duration-300
              max-sm:px-5 max-sm:py-2.5 max-sm:text-[0.9rem]
            "
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value = 0, color }) => (
  <div className="
    bg-[#f9fafb] dark:bg-[#111827] rounded-xl p-4 text-center
    transition-all duration-200 ease-in-out
    hover:-translate-y-0.5 hover:bg-[#f3f4f6] dark:hover:bg-[#1f2937]
    max-sm:p-3 md:p-5
  ">
    <p className={`text-2xl font-bold max-sm:text-xl ${color}`}>{value}</p>
    <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{label}</p>
  </div>
);

export default UserProfile;