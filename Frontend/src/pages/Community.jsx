import React from 'react'
import '../styles/community/community.css'
import CommunityCard from '../features/community/CommunityCard';
import TopCommunities from '../features/community/TopCommunity';

const dummyCommunities = [
  {
    name: 'Frontend Developers',
    description: 'For all React, HTML, and CSS enthusiasts!',
    members: 5320,
  },
  {
    name: 'College Startups',
    description: 'Ideas, funding, and peer advice for student founders.',
    members: 2980,
  },
  {
    name: 'Hackathon Lovers',
    description: 'Find, share, and prep for hackathons worldwide.',
    members: 4120,
  },
  {
    name: 'AI & ML Club',
    description: 'Talk about AI trends, projects, and resources.',
    members: 6200,
  },
];

const topList = ['Frontend Developers', 'College Startups', 'Hackathon Lovers', 'Product Builders'];

const Community = () => {
  return (
    <div className="container">
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

      <TopCommunities items={topList} />

      <div className="create-community">
        <h2>Create a New Community</h2>
        <input type="text" placeholder="Community Name" />
        <textarea rows="4" placeholder="Description..."></textarea>
        <button className="create-btn">Create</button>
      </div>
    </div>
  );
};
export default Community;
