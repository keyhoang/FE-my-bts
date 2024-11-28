// src/utils/auth.ts
export const getAccessToken = () => localStorage.getItem('access_token');

export const setAccessToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
};
