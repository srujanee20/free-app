import { freeApiClient } from "../configs/axiosConfig.js";

export const fetchRandomUser = async () => {
    const response = await freeApiClient.get("/v1/public/randomusers/user/random");
    return response.data;
};
