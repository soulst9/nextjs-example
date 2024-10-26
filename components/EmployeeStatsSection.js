import React from "react";
import { ChevronRight } from "lucide-react";
import EmployeeList from "./EmployeeList";

const EmployeeStatsSection = ({ employeeStats, setViewEmployees }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">직원</h2>
        <div className="bg-purple-100 px-4 py-2 rounded-full">
          <span className="text-purple-700 font-semibold">전체 </span>
          <span className="text-2xl font-bold text-purple-800">
            {employeeStats?.total || 0}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatusCard
          status="working"
          label="근무중"
          count={employeeStats?.status.working.count || 0}
          scheduledCount={employeeStats?.status.scheduled.count || 0}
          employees={employeeStats?.status.working.employees || []}
          color="purple"
          setViewEmployees={setViewEmployees}
          scheduledEmployees={employeeStats?.status.scheduled.employees || []}
        />

        <StatusCard
          status="offWork"
          label="퇴근"
          count={employeeStats?.status.offWork.count || 0}
          employees={employeeStats?.status.offWork.employees || []}
          color="gray"
          setViewEmployees={setViewEmployees}
        />

        <StatusCard
          status="onLeave"
          label="휴무"
          count={employeeStats?.status.onLeave.count || 0}
          employees={employeeStats?.status.onLeave.employees || []}
          color="blue"
          setViewEmployees={setViewEmployees}
        />
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <span className="text-sm text-gray-600">
          지급 예정액{" "}
          <span className="font-semibold text-purple-600">(월)</span>
        </span>
        <span className="text-2xl font-bold text-gray-800">
          {new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
          }).format(employeeStats?.expectedPayment || 0)}
        </span>
      </div>
    </div>
  );
};

const StatusCard = ({
  status,
  label,
  count,
  scheduledCount,
  employees,
  color,
  setViewEmployees,
  scheduledEmployees,
}) => {
  const bgColor = `bg-${color}-50`;
  const textColor = `text-${color}-700`;
  const buttonColor = `text-${color}-600`;

  return (
    <div className={`${bgColor} rounded-lg p-4 shadow`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-4xl font-bold ${textColor}`}>
          {count}
          {scheduledCount > 0 && (
            <span className="text-sm font-normal text-purple-500 ml-1">
              +{scheduledCount}
            </span>
          )}
        </span>
        <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
      </div>
      <div className="text-sm text-purple-600 mb-2">&nbsp;</div>
      <EmployeeList employees={employees} color={color} />
      <button
        onClick={() =>
          setViewEmployees({
            employees: scheduledEmployees
              ? [...employees, ...scheduledEmployees]
              : employees,
            status: scheduledEmployees ? `${label}/예정` : label,
          })
        }
        className={`mt-2 ${buttonColor} text-sm font-semibold flex items-center`}
      >
        더 보기 <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default EmployeeStatsSection;
