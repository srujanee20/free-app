import { freeApiClient } from "../configs/axiosConfig.js";

export const fetchMeals = async ({ page = 1, limit = 12, query = "" } = {}) => {
    let url = `/v1/public/meals?page=${page}&limit=${limit}`;
    if (query) {
        url += `&query=${encodeURIComponent(query)}`;
    }
    const response = await freeApiClient.get(url);
    return response.data;
};

export const fetchMealById = async (mealId) => {
    const response = await freeApiClient.get(`/v1/public/meals/${mealId}`);
    return response.data;
};

export const fetchRandomMeal = async () => {
    const response = await freeApiClient.get(`/v1/public/meals/meal/random`);
    return response.data;
};
