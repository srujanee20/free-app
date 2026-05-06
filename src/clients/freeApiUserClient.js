import { freeApiClient } from "../configs/axiosConfig.js";

// Helper to get token
const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registerUser = async (userData) => {
    const response = await freeApiClient.post("/v1/users/register", userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await freeApiClient.post("/v1/users/login", credentials);
    if (response.data?.success && response.data?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
    }
    return response.data;
};

export const logoutUser = async () => {
    const response = await freeApiClient.post("/v1/users/logout", {}, {
        headers: getAuthHeaders(),
    });
    localStorage.removeItem("accessToken");
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await freeApiClient.get("/v1/users/current-user", {
        headers: getAuthHeaders(),
    });
    return response.data;
};
