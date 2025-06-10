import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout: 20000,
    headers: {
        "Content-Type" : "application/json",
        Accept: "application/json",
    },
});

// request interceptor

axiosInstance.interceptors.request.use(
    (config) =>{
        // do something before request is sent
        const accessToken = localStorage.getItem('token');
        if (accessToken) 
        {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error) =>{
        // handle common errors globally
        if (error.response) 
        {
            if(error.response.status === 401)
            {
                // redirect to login page  
                window.location.href = "/login";
            }
            else if (error.response.status === 500)
            {
                console.error("Server Error. Please Try Again Later.");
            }
        }
        else if (error.code === "ECONNABORTED")
        {
            console.error("Request Timeout. Please Try Again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
