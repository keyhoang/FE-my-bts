// import axios from "axios";
import axiosInstance from './clientAxios';
import axios from 'axios';
import { UserInfo } from "../model/UserInfo";
import { FormValues, OptionSelect, TicketItemList } from '../types/homePage';
import { TicketDetail } from "../model/TicketDetail";

const API_BASE_URL = 'http://171.244.3.117:8080';

export const login = (phoneNumber: string) =>
    axios.post(`${API_BASE_URL}/bts/api/v1/auth/send-otp-login-web`, { phoneNumber: phoneNumber });

export const verifyOtp = (phoneNumber: string, otp: string) =>
    axios.post(`${API_BASE_URL}/bts/api/v1/auth/login-web`, { phoneNumber: phoneNumber, otpCode: otp });

export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/bts/api/v1/users/who-am-i`);

        return response.data as UserInfo;
    } catch (error) {
        console.error("Error fetching station data:", error);
        throw error;
    }
}

export const getTicketDetail = async (id: number): Promise<any> => {
    // getTicketDetail(1212).then((res) => {
    //     console.log("res", res); 
    // }).catch((res) => {
    //     console.log("err", res)
    // })

    try {
        return await axiosInstance.get(`${API_BASE_URL}/bts/api/v1/tickets/${id}`);
    } catch (error: any) {
        throw error;
    }
};

export const approvedTicketFuel = async (id: number, amount: number | string): Promise<TicketDetail> => {
    try {
        let token = localStorage.getItem("access_token");
        const params = { amount: amount };
        const response = await axios.post(`${API_BASE_URL}/bts/api/v1/tickets/amount-approve/${id}`, params, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data as TicketDetail;
    } catch (error) {
        console.error("Error approve fuel ticket data:", error);
        throw error;
    }
}

export const approvedTicketPrice = async (id: number, pricePerFuel: number | string, price: number | string) => {
    try {
        let token = localStorage.getItem("access_token");
        const params = { pricePerFuel: pricePerFuel, price: price };
        const response = await axios.post(`${API_BASE_URL}/bts/api/v1/tickets/price-approve/${id}`, params, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data;
    } catch (error) {
        console.error("Error approve ticket price data:", error);
        throw error;
    }
}

export const updateApprovedTicketPrice = async (id: number, pricePerFuel: number | string, amount: number | string, note: string) => {
    try {
        let token = localStorage.getItem("access_token");
        const params = { price: amount, note: note, pricePerFuel: pricePerFuel };
        const response = await axios.post(`${API_BASE_URL}/bts/api/v1/tickets/update-price-approve/${id}`, params, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data as TicketDetail;
    } catch (error) {
        console.error("Error update approve ticket price data:", error);
        throw error;
    }
}

export const updateApprovedTicketFuel = async (id: number, price: number | string, note: string) => {
    try {
        let token = localStorage.getItem("access_token");
        const params = { note: note, amount: price };
        const response = await axios.post(`${API_BASE_URL}/bts/api/v1/tickets/update-amount-approve/${id}`, params, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.data;
    } catch (error) {
        console.error("Error update approve ticket fuel data:", error);
        throw error;
    }
}

export const search = async (params: FormValues): Promise<TicketItemList[]> => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/bts/api/v1/tickets`, {
            params: params,
        });

        return response.data.content as TicketItemList[];
    } catch (error) {
        return [];
    }
};

const fetchData = async (url: string): Promise<OptionSelect[]> => {
    try {
        const response = await axiosInstance.get(url)

        return response.data?.map((item: string) => ({
            label: item,
            value: item,
        })) ?? [];

    } catch (error) {
        return [];
    }
};

export const getAllCompany = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/bts/api/v1/common/companies`);
}

export const getAllBranches = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/bts/api/v1/common/branches`);
}

export const getAllTownships = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/bts/api/v1/common/townships`);
}

export const downloadFile = async (params: FormValues) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/bts/web/v1/export/tickets`, {
            responseType: 'blob',
            params: params,
        });

        let fileName = 'report.xlsx';
        const contentDisposition = response.headers['content-disposition'];
        if (contentDisposition) {
            const matches = contentDisposition.match(/filename="(.+)"/);
            if (matches && matches[1]) {
                fileName = matches[1];
            }
        }

        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); 
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log('File đã được tải về thành công!');
    } catch (error) {
        console.error('Lỗi khi tải file Excel:', error);
    }
}
