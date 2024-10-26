// import React, { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "../contexts/AuthContext";
// import { useEnterpriseContext } from "../contexts/EnterpriseContext";
// import useEmployeeStats from "../hooks/useEmployeeStats";
// import LoadingSpinner from "../components/LoadingSpinner";
// import Sidebar from "../components/Sidebar";
// import Greeting from "../components/Greeting";
// import EmployeeListView from "../components/EmployeeListView";
// import EmployeeStatsSection from "../components/EmployeeStatsSection";

// const Home = () => {
//   const { isAuthenticated, isLoading: authLoading, user } = useAuth();
//   const { selectedEnterprise } = useEnterpriseContext();
//   const router = useRouter();
//   const [viewEmployees, setViewEmployees] = React.useState(null);

//   console.log("selectedEnterprise in Home:", selectedEnterprise);

//   const {
//     data: employeeStats,
//     isLoading: statsLoading,
//     error: statsError,
//   } = useEmployeeStats(selectedEnterprise);

//   console.log("Home - employeeStats:", employeeStats);
//   console.log("Home - statsLoading:", statsLoading);
//   console.log("Home - statsError:", statsError);

//   useEffect(() => {
//     if (!authLoading && !isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthenticated, authLoading, router]);

//   if (authLoading || statsLoading) {
//     return <LoadingSpinner />;
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   if (!selectedEnterprise) {
//     return <div>Please select an enterprise</div>;
//   }

//   if (statsError) {
//     return (
//       <div className="text-red-500">
//         Error loading employee stats: {statsError.message}
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
//       <Sidebar />
//       <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
//         <Greeting user={user} />
//         {employeeStats ? (
//           <EmployeeStatsSection
//             employeeStats={employeeStats}
//             setViewEmployees={setViewEmployees}
//           />
//         ) : (
//           <div>No employee stats available</div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { useEnterpriseContext } from "../contexts/EnterpriseContext";
import useEmployeeStats from "../hooks/useEmployeeStats";
import LoadingSpinner from "../components/LoadingSpinner";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Greeting from "../components/Greeting";
import EmployeeStatsSection from "../components/EmployeeStatsSection";

const Home = () => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { selectedEnterprise } = useEnterpriseContext();
  const router = useRouter();

  const {
    data: employeeStats,
    isLoading: statsLoading,
    error: statsError,
  } = useEmployeeStats(selectedEnterprise);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || statsLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Greeting user={user} />
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">직원 현황</h2>
        {employeeStats && Object.keys(employeeStats).length > 0 ? (
          <EmployeeStatsSection employeeStats={employeeStats} />
        ) : (
          <div>현재 표시할 직원 통계가 없습니다.</div>
        )}
      </div>
    </>
  );

  // return (
  //   <div className="flex h-screen bg-gray-50">
  //     <Sidebar />
  //     <div className="flex flex-col flex-grow">
  //       <Header user={user} />
  //       <main className="flex-grow p-6 overflow-auto">
  //         <Greeting user={user} />
  //         <div className="mt-6 bg-white rounded-lg shadow p-6">
  //           <h2 className="text-xl font-semibold mb-4">직원 현황</h2>
  //           {employeeStats && Object.keys(employeeStats).length > 0 ? (
  //             <EmployeeStatsSection employeeStats={employeeStats} />
  //           ) : (
  //             <div>현재 표시할 직원 통계가 없습니다.</div>
  //           )}
  //         </div>
  //       </main>
  //     </div>
  //   </div>
  // );
};

export default Home;
