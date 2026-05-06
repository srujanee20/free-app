import axios from "axios";

export const freeApiClient = axios.create({
    baseURL: "https://api.freeapi.app/api",
    headers: {
        'Accept': 'application/json',
    },
    timeout: 10000
})