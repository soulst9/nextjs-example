import serverApiClient from './serverApiClient';

export const fetchBusinesses = async () => {
  try {
    const response = await serverApiClient.get('/entpr');

    if (response.status_code !== "01") {
      throw new Error(`API Error: ${response.status_name}`);
    }
    return response.data;
  } catch (error) {
    console.error("사업장 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
};

export const fetchBusinessDetails = async (businessId) => {
  try {
    const response = await serverApiClient.get(`/businesses/${businessId}/details`);

    if (response.status_code !== "01") {
      throw new Error(`API Error: ${response.status_name}`);
    }
    return response.data;
  } catch (error) {
    console.error("사업장 상세 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// export const fetchBusinesses = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     console.log("token:", token);

//     const response = await fetch(`${API_URL}/v2/entpr`, {
//       method: "GET",
//       headers: {
//         "x-access-token": `${token}`, // JWT 토큰을 Authorization 헤더에 추가
//         "Content-Type": "application/json", // 필요한 경우 Content-Type 헤더 추가
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();
//     if (result.status_code !== "01") {
//       throw new Error(`API Error: ${result.status_name}`);
//     }
//     return result.data;
//   } catch (error) {
//     console.error("사업장 목록을 가져오는데 실패했습니다:", error);
//     throw error;
//   }
// };

// export const fetchBusinessDetails = async (businessId) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/businesses/${businessId}/details`
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();
//     if (result.status_code !== "01") {
//       throw new Error(`API Error: ${result.status_name}`);
//     }
//     return result.data;
//   } catch (error) {
//     console.error("사업장 상세 정보를 가져오는데 실패했습니다:", error);
//     throw error;
//   }
// };
