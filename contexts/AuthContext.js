import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getInternalApiUrl } from '../utils/internalApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // 여기에 토큰 유효성 검사 로직을 추가할 수 있습니다.
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setIsLoading(true);

      const apiRouter = getInternalApiUrl('/api/login')
      console.log('apiRouter', apiRouter)

      const response = await fetch(apiRouter, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         // setUser(data.user);
//         setIsAuthenticated(true);
//         router.push('/');
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);