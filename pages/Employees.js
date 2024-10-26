import React, { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import Image from "next/image";

const EmployeeList = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const tabs = ["전체", "정직원", "아르바이트", "퇴사"];

  const employees = [
    {
      id: 1,
      name: "김진이",
      type: "정직원",
      status: "09:00",
      image: "path_to_image1.jpg",
    },
    {
      id: 2,
      name: "윤현빈",
      type: "정직원",
      status: "근무중",
      image: "path_to_image2.jpg",
    },
    {
      id: 3,
      name: "이서하",
      type: "아르바이트",
      status: "근무중",
      image: "path_to_image3.jpg",
    },
    {
      id: 4,
      name: "김주원",
      type: "아르바이트",
      status: "3-15(금)",
      image: "path_to_image4.jpg",
    },
    {
      id: 5,
      name: "박현지",
      type: "정직원",
      status: "휴무",
      image: "path_to_image5.jpg",
    },
  ];

  return (
    <div className="container mx-auto p-1 max-w-1xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">직원 관리</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
          <UserPlus className="mr-2" size={20} />
          직원 초대하기
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-center ${
                activeTab === tab
                  ? "bg-purple-100 text-purple-600 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="이름, 전화번호 검색"
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">이름</th>
                <th className="text-left py-2">구분</th>
                <th className="text-left py-2">상태</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b last:border-b-0">
                  <td className="py-3 flex items-center">
                    <Image
                      src={employee.imageUrl || `/images/base-employee.png`}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    {employee.name}
                  </td>
                  <td>{employee.type}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        employee.status === "근무중"
                          ? "bg-green-100 text-green-800"
                          : employee.status === "휴무"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
