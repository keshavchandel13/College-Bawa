import React from "react";
import CommunityCard from "../features/community/CommunityCard";
import TopCommunities from "../features/community/TopCommunity";
import CreateCommunity from "../features/community/CreateCommunity";
import TopSearch from "../features/community/TopSearch";
import TrendingCommunity from "../features/community/TrendingCommunity";

const dummyCommunities = [
  {
    name: "Frontend Developers",
    description: "For all React, HTML, and CSS enthusiasts!",
    members: 5320,
  },
  {
    name: "College Startups",
    description: "Ideas, funding, and peer advice for student founders.",
    members: 2980,
  },
  {
    name: "Hackathon Lovers",
    description: "Find, share, and prep for hackathons worldwide.",
    members: 4120,
  },
];

const topList = [
  "Frontend Developers",
  "College Startups",
  "Hackathon Lovers",
  "Product Builders",
];
const topSearch = ["AI", "DevOps", "Pharma", "Bsc"];
const trending = ["IIT Mandi", "Juit Startup", "Robot Technology", "Apple Research"];

const Community = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-5 py-10 font-sans">
      <CreateCommunity />

      <h1 className="text-center text-[#003366] dark:text-gray-200 mb-5 text-2xl font-bold">
        Explore Communities
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 mt-5">
        {dummyCommunities.map((community, index) => (
          <CommunityCard
            key={index}
            name={community.name}
            description={community.description}
            members={community.members}
          />
        ))}
      </div>

      <div className="flex gap-[20%] mt-10 flex-wrap">
        <TopCommunities items={topList} />
        <TopSearch items={topSearch} />
        <TrendingCommunity items={trending} />
      </div>
    </div>
  );
};

export default Community;