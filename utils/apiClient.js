// utils/apiClient.js

const BASE_URL = process.env.BASE_API_URL || 'http://www.localbani.co.kr/v2';
console.log('BASE_URL ===========> ', BASE_URL)
const DEFAULT_TIMEOUT = 5000; // 5 seconds

async function apiClient(endpoint, { method = 'GET', body, headers = {}, timeout = DEFAULT_TIMEOUT } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

//   const token = localStorage.getItem('token');
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    //   'x-access-token': token || '',
      ...headers,
    },
    signal: controller.signal,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

// Convenience methods
apiClient.get = (endpoint, options) => apiClient(endpoint, { ...options, method: 'GET' });
apiClient.post = (endpoint, body, options) => apiClient(endpoint, { ...options, method: 'POST', body });
apiClient.put = (endpoint, body, options) => apiClient(endpoint, { ...options, method: 'PUT', body });
apiClient.delete = (endpoint, options) => apiClient(endpoint, { ...options, method: 'DELETE' });

export default apiClient;