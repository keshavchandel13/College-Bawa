import React from "react";

function Suggestion() {
  const suggestedUsers = [
    { name: "priya._23", avatar: "https://picsum.photos/201/300" },
    { name: "rahul_dev", avatar: "https://picsum.photos/202/300" },
    { name: "artsy.aman", avatar: "https://picsum.photos/205/300" },
  ];

  const trendingCommunities = [
    { name: "Tech Geeks", color: "bg-blue-500" },
    { name: "Campus Startups", color: "bg-emerald-500" },
    { name: "Photography Club", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Suggestions Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Vibe Check</h3>
        <div className="space-y-4">
          {suggestedUsers.map((user, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover" />
                <span className="text-sm font-bold tracking-tight">{user.name}</span>
              </div>
              <button className="text-[11px] font-black uppercase tracking-tighter text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg hover:bg-indigo-500 hover:text-white transition-all">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Widget */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-500/20">
        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-5">Trending Tribes</h3>
        <div className="space-y-3">
          {trendingCommunities.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl hover:bg-white/20 cursor-pointer transition-colors group">
               <span className="text-lg group-hover:scale-125 transition-transform">🚀</span>
               <span className="text-sm font-bold">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Suggestion;