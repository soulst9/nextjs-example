import serverApiClient from "./serverApiClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const response = await serverApiClient.post('/users/login', { 
      userID: username, 
      password, 
      usertype: 2 
    });

    const { logincode: token, user_name, user_img, usertype, last_login_date } = response.data;

    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);
    
    res.status(200).json({ 
      message: "Login successful",
      token: token,
      user: {
        name: user_name,
        img: user_img,
        userType: usertype,
        lastLoginDate: last_login_date
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
}

// const API_URL = process.env.BASE_API_URL;

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: "Username and password are required" });
//     }

//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 2000);

//     console.log('BASE_API_URL:', process.env.BASE_API_URL);

//     const apiResponse = await fetch(`${API_URL}/v2/users/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userID: username, password, usertype: 2 }),
//       signal: controller.signal
//     });

//     clearTimeout(timeoutId);

//     if (apiResponse.ok) {
//       const data = await apiResponse.json();

//       // 인증 서버에서 받은 토큰 정보 사용
//       const token = data.data.logincode; // 실제 응답 구조에 맞게 조정 필요

//       res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);
      
//       // 클라이언트에 필요한 정보 전달
//       res.status(200).json({ 
//         message: "Login successful",
//         token: token,
//         user: {
//           name: data.data.user_name,
//           img: data.data.user_img,
//           userType: data.data.usertype,
//           lastLoginDate: data.data.last_login_date
//         }
//       });
//     } else {
//       res.status(apiResponse.status).json({ message: "Login failed" });
//     }
//   } catch (error) {
//     console.error("Login error:", error.message);
//     if (error.name === 'AbortError') {
//       res.status(504).json({ message: "Request timeout" });
//     } else if (error instanceof TypeError) {
//       res.status(500).json({ message: "Network error" });
//     } else {
//       res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// }