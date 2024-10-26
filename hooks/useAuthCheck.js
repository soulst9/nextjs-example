import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && router.pathname !== '/login') {
        router.push('/login');
      } else if (isAuthenticated && router.pathname === '/login') {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}