import { freeApiClient } from "../configs/axiosConfig.js";

export const fetchProducts = async ({ page = 1, limit = 12, query = "" } = {}) => {
    // If query is present, encode it. 'inc' parameter isn't strictly necessary but we can pass it, or just use defaults.
    const url = `/v1/public/randomproducts?page=${page}&limit=${limit}${query ? `&query=${encodeURIComponent(query)}` : ""}`;
    const response = await freeApiClient.get(url);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await freeApiClient.get(`/v1/public/randomproducts/${id}`);
    return response.data;
};

export const fetchRandomProduct = async () => {
    const response = await freeApiClient.get("/v1/public/randomproducts/product/random");
    return response.data;
};
