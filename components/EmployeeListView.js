import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const EmployeeListView = ({ employees, status, onBack }) => {
  const [sortBy, setSortBy] = useState("name");

  const sortedEmployees = [...employees].sort((a, b) => a.localeCompare(b));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{status} 직원 목록</h2>
      </div>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          정렬:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="name">이름순</option>
        </select>
      </div>
      <div className="space-y-2">
        {sortedEmployees.map((employee, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            {employee}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeListView;
