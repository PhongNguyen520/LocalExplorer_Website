import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { refreshTokenApi } from '../api/auth';

axios.defaults.withCredentials = true;

const requests = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
});

export const requestsPrivate = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: { 'Content-Type': 'application/json' },
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    
    failedQueue = [];
};

requestsPrivate.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

requestsPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return requestsPrivate(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const currentAccessToken = Cookies.get('access_token');
                const currentRefreshToken = Cookies.get('refresh_token');
                
                if (!currentAccessToken || !currentRefreshToken) {
                    throw new Error('No tokens available');
                }

                const response = await refreshTokenApi({
                    accessToken: currentAccessToken,
                    refreshToken: currentRefreshToken
                });

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

                // Update cookies
                Cookies.set('access_token', newAccessToken, { expires: 1/96 }); // 15 minutes
                Cookies.set('refresh_token', newRefreshToken, { expires: 7 });

                // Update authorization header
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                
                // Process queue
                processQueue(null, newAccessToken);
                
                return requestsPrivate(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                
                // Clear tokens and redirect to login
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                
                // Redirect to login page
                window.location.href = '/login';
                
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default requests;