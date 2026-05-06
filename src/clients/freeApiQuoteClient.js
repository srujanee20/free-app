import {freeApiClient} from "../configs/axiosConfig.js";

export const fetchQuote = async () => {
    try {
        const response = await freeApiClient.get("/v1/public/quotes");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchQuoteById = async (quoteId) => {
    try {
        const response = await freeApiClient.get("/v1/public/quotes/" + quoteId);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}