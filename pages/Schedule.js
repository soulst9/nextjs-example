import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Settings } from 'lucide-react';
import WorkRecordDetailPopup from "./WorkRecordDetailPopup";
import Image from "next/image";

// 한국어 로케일 설정
dayjs.locale("ko");

// 로컬라이저 설정
const localizer = dayjsLocalizer(dayjs);

// 모달 컴포넌트
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   const handleModalClick = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative p-5 border w-96 shadow-lg rounded-md bg-white"
//         onClick={handleModalClick}
//       >
//         <div className="mt-3">
//           {children}
//           <div className="items-center px-4 py-3">
//             <button
//               className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               onClick={onClose}
//             >
//               닫기
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const WorkScheduleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [employees, setEmployees] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 휴일 정보 가져오기
    const fetchHolidays = async () => {
      // 실제 구현에서는 여기에 API 호출 로직이 들어갑니다.
      const mockHolidays = [
        { date: "2024-01-01", name: "신정" },
        { date: "2024-02-09", name: "설날" },
        { date: "2024-02-10", name: "설날" },
        { date: "2024-02-11", name: "설날" },
        { date: "2024-03-01", name: "삼일절" },
      ];
      setHolidays(mockHolidays);
    };

    fetchHolidays();
    fetchEmployeesForMonth(dayjs());
  }, []);

  // const fetchEmployeesForMonth = (date) => {
  //   // 한 달 전체의 근무 일정을 가져오는 함수 (예시 데이터)
  //   const startOfMonth = date.startOf("month");
  //   const endOfMonth = date.endOf("month");

  //   const mockEvents = [];
  //   for (
  //     let day = startOfMonth;
  //     day.isBefore(endOfMonth);
  //     day = day.add(1, "day")
  //   ) {
  //     const dailyEmployees = [
  //       { id: 1, name: "김진아", position: "매니저", startTime: "09:00", endTime: "18:00" },
  //       { id: 2, name: "박현지", position: "직원", startTime: "09:00", endTime: "18:00" },
  //       { id: 3, name: "이준기", position: "아르바이트", startTime: "10:00", endTime: "19:00" },
  //       { id: 4, name: "최서연", position: "직원", startTime: "11:00", endTime: "20:00" },
  //     ];

  //     dailyEmployees.forEach((employee, index) => {
  //       if (index < 3) {
  //         mockEvents.push({
  //           title: `${employee.name} (${employee.position})`,
  //           start: day.toDate(),
  //           end: day.toDate(),
  //           employee: employee,
  //         });
  //       }
  //     });

  //     if (dailyEmployees.length > 3) {
  //       mockEvents.push({
  //         title: `외 ${dailyEmployees.length - 3}명`,
  //         start: day.toDate(),
  //         end: day.toDate(),
  //         isOverflow: true,
  //       });
  //     }
  //   }

  //   setEvents(mockEvents);
  // };

  const fetchEmployeesForMonth = (date) => {
    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");
  
    const mockEvents = [];
    for (let day = startOfMonth; day.isBefore(endOfMonth); day = day.add(1, "day")) {
      const dailyEmployees = [
        { id: 1, name: "김진아", position: "매니저", startTime: "09:00", endTime: "18:00" },
        { id: 2, name: "박현지", position: "직원", startTime: "09:00", endTime: "18:00" },
        { id: 3, name: "이준기", position: "아르바이트", startTime: "10:00", endTime: "19:00" },
        { id: 4, name: "최서연", position: "직원", startTime: "11:00", endTime: "20:00" },
      ];
  
      const displayedEmployees = dailyEmployees.slice(0, 3);
      displayedEmployees.forEach((employee) => {
        mockEvents.push({
          title: `${employee.name} (${employee.position})`,
          start: day.toDate(),
          end: day.toDate(),
          employee: employee,
        });
      });
  
      if (dailyEmployees.length > 3) {
        mockEvents.push({
          title: `+${dailyEmployees.length - 3} more`,
          start: day.toDate(),
          end: day.toDate(),
          isOverflow: true,
        });
      }
    }
  
    setEvents(mockEvents);
  };

  const fetchEmployeesForDate = (date) => {
    // 특정 날짜의 직원 정보를 가져오는 함수 (예시 데이터)
    const mockEmployees = [
      {
        id: 1,
        name: "김진아",
        position: "매니저",
        time: "09:00-18:00",
        salary: 130000,
        details: {
          tasks: ["직원 관리", "고객 응대", "일정 조정"],
          breakTime: "12:00-13:00",
          overtime: "1시간",
        },
      },
      {
        id: 2,
        name: "박현지",
        position: "직원",
        time: "09:00-18:00",
        salary: 150000,
        details: {
          tasks: ["재고 관리", "매장 정리", "상품 진열"],
          breakTime: "13:00-14:00",
          overtime: "없음",
        },
      },
      {
        id: 3,
        name: "이준기",
        position: "아르바이트",
        time: "10:00-19:00",
        salary: 100000,
        details: {
          tasks: ["계산대 업무", "매장 청소"],
          breakTime: "14:00-15:00",
          overtime: "30분",
        },
      },
    ];
    setEmployees(mockEmployees);
  };

  const handleDateSelect = (slotInfo) => {
    setSelectedDate(dayjs(slotInfo.start));
    fetchEmployeesForDate(slotInfo.start);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };  

  const handleEmployeeUpdate = (updatedEmployee) => {
    // 여기에서 직원 정보 업데이트 로직을 구현합니다.
    console.log('Updated employee:', updatedEmployee);
    setIsModalOpen(false);
  };  

  // 캘린더 커스텀 컴포넌트
  const components = {
    event: ({ event }) => (
      <div className={`text-xs ${event.isOverflow ? "text-gray-500" : ""}`}>
        {event.title}
      </div>
    ),
    dateCellWrapper: ({ children, value }) => {
      const dateStr = dayjs(value).format("YYYY-MM-DD");
      const dayEvents = events.filter(event => 
        dayjs(event.start).format("YYYY-MM-DD") === dateStr
      );
      const displayEvents = dayEvents.slice(0, 3);
      const moreCount = Math.max(0, dayEvents.length - 3);
  
      const isHoliday = holidays.some((h) => h.date === dateStr);
      const isSunday = value.getDay() === 0;
      const isSaturday = value.getDay() === 6;
  
      let className = "";
      if (isHoliday || isSunday) {
        className = "holiday-date";
      } else if (isSaturday) {
        className = "saturday-date";
      }
  
      return (
        <div className={`${className} rbc-day-bg`}>
          {children}
          <div className="custom-events">
            {displayEvents.map((event, index) => (
              <div key={index} className="custom-event">
                {event.employee.name}
              </div>
            ))}
            {moreCount > 0 && (
              <div className="custom-event more-event">
                +{moreCount} more
              </div>
            )}
          </div>
        </div>
      );
    },
  };

  // const eventStyleGetter = (event, start, end, isSelected) => {
  //   return {
  //     style: {
  //       backgroundColor: event.isOverflow ? "#f0f0f0" : "#e6f7ff",
  //       color: event.isOverflow ? "#888" : "#1890ff",
  //       border: "none",
  //       borderRadius: "2px",
  //       fontSize: "0.75rem",
  //       padding: "2px 4px",
  //     },
  //   };
  // };


  const EmployeeList = ({ employees, onEmployeeClick, selectedDate }) => {
    const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  
    return (
      <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedDate.format('M월 D일')} {dayNames[selectedDate.day()]}
            </h2>
            <p className="text-sm text-gray-600">전체 {employees.length}명</p>
          </div>
          <button className="text-gray-600 hover:text-gray-800">
            <Settings size={20} />
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {employees.map((employee) => (
            <li 
              key={employee.id} 
              className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => onEmployeeClick(employee)}
            >
              <Image 
                src={employee.imageUrl || `/images/base-employee.png`} 
                alt={employee.name} 
                className="w-10 h-10 mr-3"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-gray-800">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.position}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-600">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    {employee.time}
                  </p>
                  <p className="text-gray-600">{employee.salary.toLocaleString()}원</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    // <div className="container mx-auto p-4 bg-gray-100">
     <div className="container mx-auto p-1 max-w-1xl"> 
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        근무 일정 관리
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            근무 일정 캘린더
          </h2>
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              // events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleDateSelect}
              selectable
              defaultView="month"
              views={["month", "week", "day"]}
              // eventPropGetter={eventStyleGetter}
              components={components}
              className="rounded-md border custom-calendar"
            />
          </div>
        </div>
        <EmployeeList 
          employees={employees} 
          onEmployeeClick={handleEmployeeClick} 
          selectedDate={selectedDate}
        />
      </div>
      <WorkRecordDetailPopup
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleEmployeeUpdate}
      />
      <style jsx global>{`
        .custom-calendar .rbc-today {
          background-color: #e6f7ff;
        }
        .custom-calendar .rbc-off-range-bg {
          background-color: #f8f8f8;
        }
        .custom-calendar .rbc-header {
          background-color: #f0f0f0;
          padding: 10px 0;
          font-weight: bold;
        }
        .custom-calendar .rbc-month-view {
          border-radius: 10px;
          overflow: hidden;
        }
        .custom-calendar .holiday-date .rbc-button-link {
          color: #ff4d4f;
          font-weight: bold;
        }
        .custom-calendar .saturday-date .rbc-button-link {
          color: #1890ff;
          font-weight: bold;
        }
        .custom-calendar .rbc-date-cell {
          text-align: center;
          padding: 3px 0;
        }
        .custom-calendar .rbc-button-link {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .custom-calendar .rbc-event {
          padding: 2px 5px;
        }
        .custom-calendar .rbc-event-content {
          font-size: 0.75rem;
        }
        .custom-calendar .rbc-month-view .rbc-month-row {
          overflow: visible;
        }
        .custom-calendar .rbc-day-bg {
          position: relative;
        }
        .custom-calendar .custom-events {
          position: absolute;
          top: 27px;
          left: 2px;
          right: 2px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .custom-calendar .custom-event {
          background-color: #e6f7ff;
          color: #1890ff;
          font-size: 0.65rem;
          padding: 1px 3px;
          border-radius: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .custom-calendar .more-event {
          background-color: #f0f0f0;
          color: #888;
        }        
      `}</style>
    </div>
  );
};

export default WorkScheduleCalendar;
