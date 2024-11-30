// src/services/axiosInstance.ts
import axios from 'axios';

const API_BASE_URL = 'http://171.244.3.117:8080/bts/api/v1';

const axiosInstance = axios.create({
  baseURL: 'http://171.244.3.117:8080/bts/api/v1',  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';  
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
