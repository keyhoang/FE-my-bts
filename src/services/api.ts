// src/services/api.ts
import axios from 'axios';
import { SearchTicket } from "../model/searchTicket";
import { UserInfo } from "../model/UserInfo";
import { TicketDetail } from "../model/TicketDetail";
import { FormValues, OptionSelect, TicketItemList } from '../types/homePage';

const API_BASE_URL = 'http://171.244.3.117:8080/bts/api/v1';

export const login = (phoneNumber: string) =>
    axios.post(`${API_BASE_URL}/auth/send-otp-login-web`, { phoneNumber: phoneNumber });

export const verifyOtp = (phoneNumber: string, otp: string) =>
    axios.post(`${API_BASE_URL}/auth/login-web`, { phoneNumber: phoneNumber, otpCode: otp });

export const getUserInfo = async (): Promise<UserInfo> => {
    try {

        let token = localStorage.getItem("access_token")
        const response = await axios.get(`${API_BASE_URL}/users/who-am-i`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data as UserInfo;
    } catch (error) {
        console.error("Error fetching station data:", error);
        throw error;
    }
}

export const getTicketDetail = async (id: number): Promise<TicketDetail> => {
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

export const search = async (params: FormValues): Promise<TicketItemList[]> => {
    try {
        let token = localStorage.getItem("access_token")
        const response = await axios.get(`${API_BASE_URL}/tickets`, {
            params: params, 
            headers: { Authorization: `Bearer ${token}` },
        });
        // Assuming response data matches the StationData model
        return response.data.data.content as TicketItemList[];
    } catch (error) {
        console.error("Error fetching station data:", error);
        return [];
    }
};

const fetchData = async (url: string): Promise<OptionSelect[]> => {
    try {
        let token = localStorage.getItem("access_token");
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data?.map((item: string) => ({
            label: item,
            value: item,
        })) ?? [];
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

export const getAllCompany = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/common/companies`);
}

export const getAllBranches = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/common/branches`);
}

export const getAllTownships = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/common/townships`);
}
