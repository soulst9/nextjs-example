import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { fetchBusinesses } from "../pages/api/business";

const BusinessSelector = ({ onSelectEnterprise }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const loadBusinesses = useCallback(async () => {
    try {
      const data = await fetchBusinesses();
      setBusinesses(data);
      if (data.length > 0) {
        setSelectedBusiness(data[0]);
        if (typeof onSelectEnterprise === "function") {
          onSelectEnterprise(data[0].enterprise);
        }
      }
    } catch (error) {
      console.error("사업장 목록을 불러오는데 실패했습니다.", error);
      // 여기에 사용자에게 에러를 표시하는 로직을 추가할 수 있습니다.
    }
  }, [onSelectEnterprise]);

  useEffect(() => {
    loadBusinesses();
  }, [loadBusinesses]);

  const handleSelectBusiness = useCallback((business) => {
    setSelectedBusiness(business);
    setIsOpen(false);
    if (typeof onSelectEnterprise === "function") {
      onSelectEnterprise(business.enterprise);
    } else {
      console.warn("onSelectEnterprise is not a function");
    }
  }, [onSelectEnterprise]);

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span className="block truncate">
          {selectedBusiness
            ? selectedBusiness.enterprisename
            : "사업장을 선택하세요"}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
          {businesses.map((business) => (
            <li
              key={business.enterprise}
              onClick={() => handleSelectBusiness(business)}
              className="relative py-2 pl-3 pr-9 text-gray-900 cursor-pointer select-none hover:bg-blue-100 focus:bg-blue-100"
            >
              <span className="block truncate">{business.enterprisename}</span>
              {selectedBusiness?.enterprise === business.enterprise && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// CheckIcon 컴포넌트 (이전과 동일)
const CheckIcon = (props) => (
  <svg {...props} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default BusinessSelector;
// import React, { useState, useEffect } from "react";
// import { ChevronDown } from "lucide-react";
// import { fetchBusinesses } from "../pages/api/business";

// const BusinessSelector = (props) => {
//   const { onSelectEnterprise } = props; // props에서 onSelectEnterprise를 추출

//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     loadBusinesses();
//   }, []);

//   const loadBusinesses = async () => {
//     try {
//       const data = await fetchBusinesses();
//       setBusinesses(data);
//       if (data.length > 0) {
//         setSelectedBusiness(data[0]);
//         if (typeof onSelectEnterprise === "function") {
//           onSelectEnterprise(data[0].enterprise);
//         }
//       }
//     } catch (error) {
//       console.error("사업장 목록을 불러오는데 실패했습니다.", error);
//       // 여기에 사용자에게 에러를 표시하는 로직을 추가할 수 있습니다.
//     }
//   };

//   const handleSelectBusiness = (business) => {
//     setSelectedBusiness(business);
//     setIsOpen(false);
//     if (typeof onSelectEnterprise === "function") {
//       onSelectEnterprise(business.enterprise);
//     } else {
//       console.warn("onSelectEnterprise is not a function");
//     }
//   };

//   return (
//     <div className="relative w-64">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//       >
//         <span className="block truncate">
//           {selectedBusiness
//             ? selectedBusiness.enterprisename
//             : "사업장을 선택하세요"}
//         </span>
//         <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//           <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
//         </span>
//       </button>

//       {isOpen && (
//         <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
//           {businesses.map((business) => (
//             <li
//               key={business.enterprise}
//               onClick={() => handleSelectBusiness(business)}
//               className="relative py-2 pl-3 pr-9 text-gray-900 cursor-pointer select-none hover:bg-blue-100 focus:bg-blue-100"
//             >
//               <span className="block truncate">{business.enterprisename}</span>
//               {selectedBusiness?.enterprise === business.enterprise && (
//                 <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
//                   <CheckIcon className="w-5 h-5" aria-hidden="true" />
//                 </span>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// // CheckIcon 컴포넌트 (이전과 동일)
// const CheckIcon = (props) => (
//   <svg {...props} viewBox="0 0 20 20" fill="currentColor">
//     <path
//       fillRule="evenodd"
//       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// export default BusinessSelector;
