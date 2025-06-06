import React from "react";
import "../styles/community/community.css";
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
    <div className="container">
      <CreateCommunity />

      <h1>Explore Communities</h1>
      <div className="community-grid">
        {dummyCommunities.map((community, index) => (
          <CommunityCard
            key={index}
            name={community.name}
            description={community.description}
            members={community.members}
          />
        ))}
      </div>
      <div className="footer-community">
        <TopCommunities items={topList} />
        <TopSearch items={topSearch}/>
        <TrendingCommunity items={trending}/>
      </div>
    </div>
  );
};

export default Community;
