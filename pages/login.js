import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      // 로그인 성공 시 AuthContext의 login 함수가 홈으로 리다이렉트합니다.
    } catch (error) {
      setError(error.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logos/banimani-logo.png"
            alt="Banimani Logo"
            width={192}
            height={48}
            className="object-contain"
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

Login.getLayout = (page) => page;

export default Login;
