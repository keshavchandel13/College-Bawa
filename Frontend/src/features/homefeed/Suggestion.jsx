import React from "react";

function Suggestion() {
  const suggestedUsers = [
    { name: "priya._23", avatar: "https://picsum.photos/201/300" },
    { name: "rahul_dev", avatar: "https://picsum.photos/202/300" },
    { name: "artsy.aman", avatar: "https://picsum.photos/205/300" },
  ];

  const trendingCommunities = [
    { name: "Tech Geeks" },
    { name: "Campus Startups" },
    { name: "Photography Club" },
  ];

  return (
    <div className="card space-y-5">

      <div>
        <h3 className="text-sm font-semibold mb-3">Suggested for you</h3>

        {suggestedUsers.map((user, i) => (
          <div key={i} className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src={user.avatar} className="w-9 h-9 rounded-full" />
              <span className="text-sm">{user.name}</span>
            </div>
            <button className="text-primary text-sm font-medium">
              Follow
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">
          Trending Communities
        </h3>

        {trendingCommunities.map((c, i) => (
          <div key={i} className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            📈 {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestion;