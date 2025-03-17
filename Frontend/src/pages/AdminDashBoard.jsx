// src/pages/AdminDashboard.jsx
import React from "react";

const AdminDashboard = ({ stats }) => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <p>Total Users</p>
          <h2 className="text-2xl font-bold">{stats.users}</h2>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p>Total Chats</p>
          <h2 className="text-2xl font-bold">{stats.chats}</h2>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p>Active Sessions</p>
          <h2 className="text-2xl font-bold">{stats.sessions}</h2>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <p>Reported Messages</p>
          <h2 className="text-2xl font-bold">{stats.reports}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
