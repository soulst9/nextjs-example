import { useQuery } from "react-query";
import { fetchCommuteStatus } from "../pages/api/home";
import { useAuth } from "../contexts/AuthContext";

const useEmployeeStats = (enterpriseId) => {
  const { isAuthenticated } = useAuth();

  console.log("useEmployeeStats - isAuthenticated:", isAuthenticated);
  console.log("useEmployeeStats - enterpriseId:", enterpriseId);

  return useQuery(
    ["employeeStats", enterpriseId],
    async () => {
      console.log("Fetching employee stats for enterprise:", enterpriseId);
      if (!enterpriseId) {
        throw new Error("Enterprise ID is required");
      }
      const data = await fetchCommuteStatus(enterpriseId);
      console.log("Fetched employee stats:", data);
      return data;
    },
    {
      enabled: isAuthenticated && !!enterpriseId,
      // retry: 3,
      onError: (error) => {
        console.error("Error fetching employee stats:", error);
      },
      onSuccess: (data) => {
        console.log("Successfully fetched employee stats:", data);
      },
    }
  );
};

export default useEmployeeStats;
