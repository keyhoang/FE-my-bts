import axios from 'axios';
import config from "../config";

const API_BASE_URL = config.API_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
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

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.config.responseType === 'blob') {
            return response;
        }

        if (response.data && response.data.code === 200) {
            return response.data;
        } else {
            return Promise.reject(response || { code: 500, message: "Server error" });
        }
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else if (error.request) {
            return Promise.reject({ code: 500, message: "No response from server", data: null });
        } else {
            return Promise.reject({ code: 500, message: "Error occurred", data: null });
        }
    }
);

export default axiosInstance;
