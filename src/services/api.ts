// src/services/api.ts
import axios from 'axios';
import {SearchTicket} from "../model/searchTicket";

const API_BASE_URL = 'http://171.244.3.117:8080/bts/api/v1';

export const login = (phoneNumber: string) =>
    axios.post(`${API_BASE_URL}/auth/send-otp-login`, { phoneNumber : phoneNumber });

export const verifyOtp = (phoneNumber: string, otp: string) =>
    axios.post(`${API_BASE_URL}/auth/login`, { phoneNumber : phoneNumber, otpCode: otp });

export const getUserInfo = (token: string) =>
    axios.get(`${API_BASE_URL}/user/info`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const search = async (query: string = ""): Promise<SearchTicket[]> => {
    try {
        let token = localStorage.getItem("access_token")
        const response = await axios.get(`${API_BASE_URL}/tickets`, {
            params: { search: query, size: 100, page : 1 }, // Passing query and size as parameters
            headers: { Authorization: `Bearer ${token}` },
        });
        // Assuming response data matches the StationData model
        return response.data.data.content as SearchTicket[];
    } catch (error) {
        console.error("Error fetching station data:", error);
        throw error;
    }
};

