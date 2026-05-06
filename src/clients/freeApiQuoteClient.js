import {freeApiClient} from "../configs/axiosConfig.js";

export const fetchQuotes = async ({ page = 1, limit = 10 } = {}) => {
    const response = await freeApiClient.get(`/v1/public/quotes?page=${page}&limit=${limit}`);
    return response.data;
}

export const fetchQuoteById = async (quoteId) => {
    const response = await freeApiClient.get(`/v1/public/quotes/${quoteId}`);
    return response.data;
}

export const fetchRandomQuote = async () => {
    const response = await freeApiClient.get("/v1/public/quotes/quote/random");
    return response.data;
}