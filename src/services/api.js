
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(` API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log(` API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(' API Error:', error.response.status, error.response.data);
      throw new Error('API request failed');
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