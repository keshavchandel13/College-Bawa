import React, { useState } from "react";
import UserSearchList from "./UserSearchList";

const GroupChatModal = ({ createGroupChat, searchUsers }) => {
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async () => {
    const result = await searchUsers(searchTerm);
    setUsers(result);
  };

  const handleUserSelect = (user) => {
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const handleCreateGroup = () => {
    const userIds = selectedUsers.map((u) => u._id);
    createGroupChat(groupName, userIds);
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Create Group Chat</h2>
      <input
        className="w-full p-2 border rounded mb-2"
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="text-sm bg-blue-500 text-white px-3 py-1 rounded mb-2"
        onClick={handleSearch}
      >
        Search
      </button>

      <UserSearchList users={users} handleUserSelect={handleUserSelect} />

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedUsers.map((u) => (
          <span
            key={u._id}
            className="text-xs px-2 py-1 bg-blue-100 rounded-full"
          >
            {u.name}
          </span>
        ))}
      </div>

      <button
        onClick={handleCreateGroup}
        className="mt-4 bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        Create Group
      </button>
    </div>
  );
};

export default GroupChatModal;