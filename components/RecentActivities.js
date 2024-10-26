import React from 'react';

const RecentActivities = ({ activities }) => {
  if (!activities) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;