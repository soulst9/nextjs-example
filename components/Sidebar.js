// import React from "react";
// import { Home, Users, Calendar, DollarSign, Settings } from "lucide-react";

// const Sidebar = ({ onMenuSelect }) => {
//   const menuItems = [
//     { icon: <Home size={20} />, label: "홈", key: "home" },
//     { icon: <Users size={20} />, label: "직원", key: "employees" },
//     { icon: <Calendar size={20} />, label: "일정", key: "schedule" },
//     { icon: <DollarSign size={20} />, label: "정산", key: "settlement" },
//     { icon: <Settings size={20} />, label: "관리", key: "management" },
//   ];

//   return (
//     <aside className="w-24 bg-white p-4 flex flex-col items-center border-r border-gray-200 h-screen">
//       <div className="text-purple-600 text-2xl font-bold mb-10">🍌</div>
//       {menuItems.map((item, index) => (
//         <button
//           key={index}
//           className="flex flex-col items-center justify-center text-gray-500 p-2 rounded-lg hover:bg-purple-100 hover:text-purple-600 mb-6 transition-all duration-200 w-full"
//           onClick={() => onMenuSelect(item.key)}
//         >
//           <div className="mb-1">{item.icon}</div>
//           <span className="text-xs font-medium">{item.label}</span>
//         </button>
//       ))}
//     </aside>
//   );
// };

// export default Sidebar;
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Users, Calendar, DollarSign, Settings } from "lucide-react";
import Image from "next/image";
import CustomImage from "./CustomImage";

const Sidebar = () => {
  const router = useRouter();
  const menuItems = [
    { icon: <Home size={20} />, label: "홈", path: "/" },
    { icon: <Users size={20} />, label: "직원", path: "/Employees" },
    { icon: <Calendar size={20} />, label: "일정", path: "/Schedule" },
    { icon: <DollarSign size={20} />, label: "정산", path: "/Payrolls" },
    { icon: <Settings size={20} />, label: "관리", path: "/Management" },
  ];

  return (
    <aside className="w-24 bg-white p-4 flex flex-col items-center border-r border-gray-200 h-screen">
      <div className="text-purple-600 text-2xl font-bold mb-10">
        <CustomImage src="/images/svg/banimani-logo.svg" alt="banana" width={50} height={50} />
      </div>
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`flex flex-col items-center justify-center text-gray-500 p-2 rounded-lg hover:bg-purple-100 hover:text-purple-600 mb-6 transition-all duration-200 w-full ${
            router.pathname === item.path ? "bg-purple-100 text-purple-600" : ""
          }`}
        >
          <div className="mb-1">{item.icon}</div>
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
