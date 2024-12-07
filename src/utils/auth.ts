// src/utils/auth.ts
import {UserInfo} from "../model/UserInfo";

export const getAccessToken = () => localStorage.getItem('access_token');

export const setAccessToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

export const setCurrentUser = (user: UserInfo) => {
    localStorage.setItem('current_user', JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
}

export const getCurrentUser = () => {
    const storedValue = localStorage.getItem('current_user')
    if (!storedValue) return null;

    return JSON.parse(storedValue) as UserInfo;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
};
