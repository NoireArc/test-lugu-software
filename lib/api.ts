import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        console.log("REQUEST:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        console.log("RESPONSE:", response);
        return response;
    },
    (error) => {
        console.error("ERROR:", error);
        return Promise.reject(error);
    }
);

export default api;