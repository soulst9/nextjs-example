// import React from "react";
// import Header from "./Header";
// import { useEnterpriseContext } from "../contexts/EnterpriseContext";

// const Layout = ({ children }) => {
//   const { selectedEnterprise, setSelectedEnterprise } = useEnterpriseContext();

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header
//         onSelectEnterprise={setSelectedEnterprise}
//         selectedEnterprise={selectedEnterprise}
//       />
//       <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEnterpriseContext } from "../contexts/EnterpriseContext";

const Layout = ({ children }) => {
  const { selectedEnterprise, setSelectedEnterprise } = useEnterpriseContext();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header
          onSelectEnterprise={setSelectedEnterprise}
          selectedEnterprise={selectedEnterprise}
        />
        <main className="flex-grow p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
