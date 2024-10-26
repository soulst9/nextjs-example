const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchCommuteStatus = async (enterpriseId) => {
  // JWT 토큰을 가져오는 방법 (예: localStorage에서 가져오기)
  const token = localStorage.getItem("token");
  console.log("token:", token);

  const response = await fetch(
    `${API_URL}/base/v3/enterprises/${enterpriseId}/employees/status`,
    {
      method: "GET",
      headers: {
        "x-access-token": `${token}`, // JWT 토큰을 Authorization 헤더에 추가
        "Content-Type": "application/json", // 필요한 경우 Content-Type 헤더 추가
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch commute status");
  }

  const result = await response.json();

  console.log("result", result);

  return result.data;

  // return {
  //   total: 10,
  //   status: {
  //     working: {
  //       count: 5,
  //       employees: ["김철수", "이영희", "박지성", "홍길동", "강감찬"],
  //     },
  //     scheduled: {
  //       count: 3,
  //       employees: ["유관순", "안중근", "이순신"],
  //     },
  //     offWork: {
  //       count: 2,
  //       employees: ["이황", "안창호"],
  //     },
  //     onLeave: {
  //       count: 2,
  //       employees: ["장보고", "안중근"],
  //     },
  //   },
  // };
};

// export const fetchRecentActivities = async () => {
//   const response = await fetch(`${API_URL}/recent-activities`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch recent activities');
//   }
//   return response.json();
// };
