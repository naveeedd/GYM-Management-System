import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-600">Admin dashboard overview content will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 