import React from "react";
// import { Bell } from "lucide-react";

const StyleDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayNames[today.getDay()];

  return (
    <div className="bg-purple-100 rounded-lg p-2 inline-flex items-center">
      <div className="bg-white rounded-md p-2 mr-2">
        <div className="text-purple-600 text-xs font-semibold">
          {month}/{date}
        </div>
      </div>
      <div className="text-purple-600 font-medium">{dayOfWeek}요일</div>
    </div>
  );
};

const Greeting = ({ user }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 relative">
      {/* 날짜를 오른쪽 위에 배치 */}
      <div className="absolute top-4 right-4">
        <StyleDate />
      </div>

      <div className="mr-24">
        {" "}
        {/* 날짜 공간 확보를 위한 마진 */}
        <p className="text-gray-800">안녕하세요, {user?.name || "관리자"}님</p>
        <p className="text-sm text-gray-600">
          일교차가 큰 요즘, 감기 조심하세요!
        </p>
      </div>
      <div className="mt-4 bg-yellow-100 p-2 rounded-md flex items-center">
        <span className="text-yellow-600 mr-2">🔊</span>
        <p className="text-sm text-yellow-800">급여 정산이 7일 남았습니다.</p>
      </div>
    </div>
  );
};

export default Greeting;
