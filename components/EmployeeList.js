import React from "react";

const EmployeeList = ({ employees, color }) => {
  const bgColor = color === "blue" ? `${color}-100` : `${color}-100`;
  const textColor = color === "blue" ? `${color}-700` : `${color}-700`;
  const maxDisplayCount = 5;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {employees.slice(0, maxDisplayCount).map((employee, index) => (
        <div
          key={index}
          className={`bg-${bgColor} text-${textColor} text-xs font-semibold px-2 py-1 rounded-full`}
        >
          {employee}
        </div>
      ))}
      {employees.length > maxDisplayCount && (
        <div
          className={`bg-${bgColor} text-${textColor} text-xs font-semibold px-2 py-1 rounded-full`}
        >
          +
          {employees.length - maxDisplayCount > 0
            ? employees.length - maxDisplayCount
            : 0}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
