import { freeApiClient } from "../configs/axiosConfig.js";

export const fetchRandomJoke = async () => {
    const response = await freeApiClient.get("/v1/public/randomjokes/joke/random");
    return response.data;
};
