import React, { useState } from "react";
import {
  Download,
  ChevronRight,
  Calendar,
  DollarSign,
  PieChart,
} from "lucide-react";

const statusColors = {
  근무확인: "bg-yellow-500 text-yellow-700",
  정산중: "bg-blue-500 text-blue-700",
  정산완료: "bg-green-500 text-green-700",
  급여명세서: "bg-purple-500 text-purple-700",
};

const StatusBar = ({ status }) => {
  const statuses = ["근무확인", "정산중", "정산완료", "급여명세서"];
  const progressPercentage = {
    근무확인: 25,
    정산중: 50,
    정산완료: 75,
    급여명세서: 100,
  };

  const currentProgress = progressPercentage[status];

  return (
    <div className="w-full">
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full ${
            statusColors[status].split(" ")[0]
          } transition-all duration-500 ease-out`}
          style={{ width: `${currentProgress}%` }}
        />
      </div>
      <div className="text-center">
        <span
          className={`text-sm font-semibold ${
            statusColors[status].split(" ")[1]
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

const SalaryItem = ({ date, amount, tax, status }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-500" size={24} />
          <span className="text-2xl font-bold text-gray-800">{date}</span>
        </div>
        <ChevronRight className="text-gray-400" size={24} />
      </div>

      <StatusBar status={status} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="text-blue-500" size={20} />
            <span className="text-sm font-semibold text-gray-600">
              실 지급액
            </span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            {amount.toLocaleString()}원
          </span>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <PieChart className="text-green-500" size={20} />
            <span className="text-sm font-semibold text-gray-600">
              납부세액
            </span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            {tax.toLocaleString()}원
          </span>
        </div>
      </div>

      <button className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center group">
        <Download className="mr-2 group-hover:text-gray-800" size={18} />
        {date.split("-")[1]}월 급여자료 다운로드
      </button>
    </div>
  );
};

const SalarySettlement = () => {
  const [salaryData] = useState([
    {
      id: 1,
      date: "2024-05",
      amount: 2385490,
      tax: 367196,
      status: "정산완료",
    },
    {
      id: 2,
      date: "2024-04",
      amount: 2280000,
      tax: 352000,
      status: "급여명세서",
    },
    { id: 3, date: "2024-03", amount: 2150000, tax: 330000, status: "정산중" },
    {
      id: 4,
      date: "2024-02",
      amount: 2100000,
      tax: 320000,
      status: "근무확인",
    },
  ]);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        급여 정산 내역
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {salaryData.map((salary) => (
          <SalaryItem
            key={salary.id}
            date={salary.date}
            amount={salary.amount}
            tax={salary.tax}
            status={salary.status}
          />
        ))}
      </div>
    </div>
  );
};

export default SalarySettlement;
