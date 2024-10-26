// import React from "react";
// import { Bell } from "lucide-react";
// import Image from "next/image";
// import BusinessSelector from "./BusinessSelector";
// import { useEnterpriseContext } from "../contexts/EnterpriseContext";

// const Header = () => {
//   const { selectedEnterprise, setSelectedEnterprise } = useEnterpriseContext();

//   const handleEnterpriseSelect = (enterprise) => {
//     console.log("Enterprise selected in Header:", enterprise);
//     setSelectedEnterprise(enterprise);
//   };

//   return (
//     <header className="flex justify-between items-center p-4 bg-white shadow-sm">
//       <div className="flex items-center">
//         <Image
//           src="/images/logos/banimani-logo.png"
//           alt="Banimani Logo"
//           width={150}
//           height={40}
//           className="mr-4"
//         />
//         <BusinessSelector
//           onSelectEnterprise={handleEnterpriseSelect}
//           currentEnterprise={selectedEnterprise}
//         />
//       </div>
//       <div className="flex items-center">
//         <button className="relative text-gray-600">
//           <Bell size={24} />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//             2
//           </span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import BusinessSelector from "./BusinessSelector";
import { useEnterpriseContext } from "../contexts/EnterpriseContext";

const Header = () => {
  const { selectedEnterprise, setSelectedEnterprise } = useEnterpriseContext();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="flex items-center">
        {/* <Image
          src="/images/logos/banimani-logo.png"
          alt="Banimani Logo"
          width={150}
          height={40}
          className="mr-4"
        /> */}
        <BusinessSelector
          onSelectEnterprise={setSelectedEnterprise}
          currentEnterprise={selectedEnterprise}
        />
      </div>
      <div className="flex items-center">
        <button className="relative text-gray-600">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
