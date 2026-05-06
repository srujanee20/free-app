import { freeApiClient } from "../configs/axiosConfig.js";

export const fetchRandomCat = async () => {
    const response = await freeApiClient.get(`/v1/public/cats/cat/random`);
    return response.data;
};
