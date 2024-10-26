// api/serverApiClient.js

const getBaseUrl = () => {
    if (typeof window === 'undefined') {
      // 서버 사이드
      return process.env.BASE_API_URL;
    } else {
      // 클라이언트 사이드
      return process.env.NEXT_PUBLIC_BASE_API_URL;
    }
  };
  
const BASE_URL = getBaseUrl();

const serverApiClient = {
  request: async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    console.log('BASE_URL', BASE_URL)

    console.log('url ========>', url)
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // localStorage에서 토큰 가져오기
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        defaultHeaders['x-access-token'] = token;
      }
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  get: (endpoint, options = {}) => 
    serverApiClient.request(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) => 
    serverApiClient.request(endpoint, { ...options, method: 'POST', body }),

  put: (endpoint, body, options = {}) => 
    serverApiClient.request(endpoint, { ...options, method: 'PUT', body }),

  delete: (endpoint, options = {}) => 
    serverApiClient.request(endpoint, { ...options, method: 'DELETE' }),
};

export default serverApiClient;