import React from 'react';
import { Search } from 'lucide-react';

const EmployeeStats = ({ stats }) => {
  if (!stats) return <div>Loading...</div>;

  const statusData = [
    { label: '근무중', value: stats.working, color: 'purple' },
    { label: '휴무', value: stats.resting, color: 'blue' },
    { label: '퇴근', value: stats.offWork, color: 'gray' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">계약한 직원</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">전체</span>
          <span className="text-xl font-bold">{stats.total}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {statusData.map((item, index) => (
          <div key={index} className={`bg-${item.color}-50 rounded-lg p-4 flex items-center justify-between`}>
            <div>
              <div className={`text-3xl font-bold text-${item.color}-700`}>{item.value}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
            <Search className={`text-${item.color}-400`} size={24} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          지급 예정액 <span className="font-semibold text-purple-600">(월)</span>
        </div>
        <div className="text-lg font-bold text-gray-800">{stats.expectedPayment.toLocaleString()} 원</div>
      </div>
    </div>
  );
};

export default EmployeeStats;