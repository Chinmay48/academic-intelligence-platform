import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});


// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        const isPublicAuthRequest =
            config.url?.startsWith("/auth/login") ||
            config.url?.startsWith("/auth/register");

        if (token && !isPublicAuthRequest) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            if (window.location.pathname !== "/login") {

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default api;