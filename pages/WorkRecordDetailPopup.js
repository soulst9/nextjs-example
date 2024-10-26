import React, { useState, useEffect } from 'react';
import { Clock, Wallet, Edit2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-2xl max-w-md w-full"
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
};

// TimeInput 컴포넌트 정의
const TimeInput = ({ value, onChange, label }) => (
  <div className="flex flex-col items-center">
    <label className="mb-1 text-sm font-medium text-gray-600">{label}</label>
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md p-1 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const WorkRecordDetailPopup = ({ employee, isOpen, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  useEffect(() => {
    if (employee) {
      setStartTime(employee.startTime || "09:00");
      setEndTime(employee.endTime || "18:00");
    }
  }, [employee]);

  const calculateWorkHours = () => {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    const diff = (end - start) / 1000 / 60 / 60;
    return Math.round(diff * 10) / 10;
  };

  const handleSave = () => {
    if (employee) {
      onUpdate({ ...employee, startTime, endTime });
    }
    setIsEditing(false);
  };

  if (!employee) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          {employee.name} - {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
        </h2>
        
        <div className="bg-blue-50 rounded-lg py-5 px-20">
          {isEditing ? (
            <div className="flex justify-between items-center space-x-2">
              <TimeInput value={startTime} onChange={setStartTime} label="출근" />
              <ArrowRight className="text-blue-500" size={20} />
              <TimeInput value={endTime} onChange={setEndTime} label="퇴근" />
            </div>
          ) : (
            <div className="flex justify-between items-center text-lg">
              <div className="text-center">
                <span className="block text-sm font-medium text-gray-600">출근</span>
                <span className="font-semibold text-blue-600">{startTime}</span>
              </div>
              <ArrowRight className="text-blue-500" size={20} />
              <div className="text-center">
                <span className="block text-sm font-medium text-gray-600">퇴근</span>
                <span className="font-semibold text-blue-600">{endTime}</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="mr-2 text-blue-500" size={20} />
              <h3 className="font-semibold text-gray-800">근무 내역</h3>
            </div>
            <div className="ml-7 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">근무 시간:</span> {calculateWorkHours()}시간
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">휴게 시간:</span> 60분
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Image src="/images/svg/payroll.svg" alt="원화" className="mr-2 w-5 h-5" />
              <h3 className="font-semibold text-gray-800">급여 내역</h3>
            </div>
            <div className="ml-7">
              <p className="text-sm text-gray-600">
                <span className="font-medium">일급:</span> {employee.salary.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mt-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-2">
                저장
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
                취소
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center text-blue-500 hover:text-blue-600 transition duration-300">
              <Edit2 size={18} className="mr-1" /> 근무시간 수정하기
            </button>
          )}
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-4 rounded-b-lg">
        <button onClick={onClose} className="w-full bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300">
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default WorkRecordDetailPopup;