// src/services/api.ts
import axios from 'axios';
import {SearchTicket} from "../model/searchTicket";
import {UserInfo} from "../model/UserInfo";
import {TicketDetail} from "../model/TicketDetail";

const API_BASE_URL = 'http://171.244.3.117:8080/bts/api/v1';

export const login = (phoneNumber: string) =>
    axios.post(`${API_BASE_URL}/auth/send-otp-login`, {phoneNumber: phoneNumber});

export const verifyOtp = (phoneNumber: string, otp: string) =>
    axios.post(`${API_BASE_URL}/auth/login`, {phoneNumber: phoneNumber, otpCode: otp});

export const getUserInfo = async (): Promise<UserInfo> => {
    try {

        let token = localStorage.getItem("access_token")
        const response = await axios.get(`${API_BASE_URL}/users/who-am-i`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        return response.data.data as UserInfo;
    } catch (error) {
        console.error("Error fetching station data:", error);
        throw error;
    }
}

export const getTicketDetail = async(id: number): Promise<TicketDetail> => {
    try {
        let token = localStorage.getItem("access_token")
        const response = await axios.get(`${API_BASE_URL}/tickets/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data as TicketDetail;
    } catch (error) {
        console.error("Error get ticket detail data:", error);
        throw error;
    }
}

export const search = async (query: string = ""): Promise<SearchTicket[]> => {
    try {
        let token = localStorage.getItem("access_token")
        const response = await axios.get(`${API_BASE_URL}/tickets`, {
            params: {search: query, size: 100, page: 1}, // Passing query and size as parameters
            headers: {Authorization: `Bearer ${token}`},
        });
        // Assuming response data matches the StationData model
        return response.data.data.content as SearchTicket[];
    } catch (error) {
        console.error("Error fetching station data:", error);
        throw error;
    }
};

