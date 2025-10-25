
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jellee.vercel.app/novel/jellee';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error(' Request Error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      
      console.error(' API Error:', error.response.status, error.response.data);
      
      const errorMessage = {
        400: 'Bad request. Please check your input.',
        404: 'Resource not found.',
        500: 'Server error. Please try again later.',
        503: 'Service unavailable. Please try again later.',
      }[error.response.status] || 'An error occurred. Please try again.';
      
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error(' Network Error:', error.message);
      throw new Error('Network error. Check your connection.');
    } else {
      console.error(' Request Setup Error:', error.message);
      throw new Error('Request failed. Please try again.');
    }
  }
);

export default api;