import { freeApiClient } from "../configs/axiosConfig.js";

export const fetchVideos = async ({ page = 1, limit = 12, query = "javascript", sortBy = "latest" } = {}) => {
    const response = await freeApiClient.get(
        `/v1/public/youtube/videos?page=${page}&limit=${limit}&query=${encodeURIComponent(query)}&sortBy=${encodeURIComponent(sortBy)}`
    );
    return response.data;
};

export const fetchVideoById = async (videoId) => {
    const response = await freeApiClient.get(`/v1/public/youtube/videos/${videoId}`);
    return response.data;
};

export const fetchVideoComments = async (videoId) => {
    const response = await freeApiClient.get(`/v1/public/youtube/comments/${videoId}`);
    return response.data;
};
