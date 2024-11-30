import axiosInstance from './clientAxios';
import { UserInfo } from "../model/UserInfo";
import { FormValues, OptionSelect, TicketItemList } from '../types/homePage';


const API_BASE_URL = 'http://171.244.3.117:8080/bts/api/v1';

export const login = (phoneNumber: string) =>
    axiosInstance.post(`${API_BASE_URL}/auth/send-otp-login-web`, { phoneNumber: phoneNumber });

export const verifyOtp = (phoneNumber: string, otp: string) =>
    axiosInstance.post(`${API_BASE_URL}/auth/login-web`, { phoneNumber: phoneNumber, otpCode: otp });



export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/users/who-am-i`);

        return response.data.data as UserInfo;
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
        const response = await axiosInstance.get(`/tickets/${id}`);

        return response;
    } catch (error: any) {
        throw error; 
    }
};

export const search = async (params: FormValues): Promise<TicketItemList[]> => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/tickets`, {
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
    return fetchData(`${API_BASE_URL}/common/companies`);
}

export const getAllBranches = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/common/branches`);
}

export const getAllTownships = async (): Promise<OptionSelect[]> => {
    return fetchData(`${API_BASE_URL}/common/townships`);
}
