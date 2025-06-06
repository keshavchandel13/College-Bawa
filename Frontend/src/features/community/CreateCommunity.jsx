import React from 'react';
const CreateCommunity = () => {
  return (
    <div className="create-community-container">
      <h2>Create a New Community</h2>
      <input type="text" placeholder="Community Name" />
      <textarea rows="4" placeholder="Description..."></textarea>
      <button className="create-btn">Create</button>
    </div>
  );
};

export default CreateCommunity;
