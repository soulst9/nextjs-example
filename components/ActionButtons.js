import React from 'react';
import { UserPlus, FileSignature } from 'lucide-react';

const ActionButtons = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <button className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
        <UserPlus size={24} className="text-purple-600 mr-3" />
        <span className="font-semibold text-gray-800">직원 초대하기</span>
      </button>
      <button className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
        <FileSignature size={24} className="text-purple-600 mr-3" />
        <span className="font-semibold text-gray-800">근로계약서 작성하기</span>
      </button>
      <button className="bg-purple-600 rounded-xl shadow-sm p-6 flex items-center justify-center hover:bg-purple-700 transition-colors duration-200">
        <span className="font-semibold text-white">My 직원 관리하기</span>
      </button>
    </div>
  );
};

export default ActionButtons;