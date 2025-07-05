import { createContext, useEffect, useState, useRef } from 'react';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { startNotificationHub, stopNotificationHub } from '../hubs/notificationHub';
import { notification } from 'antd';
import 'antd/dist/reset.css';
import { refreshTokenApi } from '../api/auth';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));
    const [refreshToken, setRefreshToken] = useState(Cookies.get('refresh_token'));
    const refreshTimerRef = useRef(null);

    console.log(accessToken);
    
    // Function to set up automatic token refresh
    const setupTokenRefresh = (token) => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000; // Convert to milliseconds
            
            // Refresh token 2 minutes before expiry (15 minutes - 2 minutes = 13 minutes)
            const refreshTime = Math.max(timeUntilExpiry - (2 * 60 * 1000), 0);
            
            refreshTimerRef.current = setTimeout(() => {
                refreshAccessToken();
            }, refreshTime);
        } catch (error) {
            console.error('Error setting up token refresh:', error);
        }
    };
    
    // Function to refresh token
    const refreshAccessToken = async () => {
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

            // Update cookies - access token expires in 15 minutes, refresh token in 7 days
            Cookies.set('access_token', newAccessToken, { expires: 1/96 }); // 15 minutes
            Cookies.set('refresh_token', newRefreshToken, { expires: 7 });

            // Update state
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            // Decode and update auth
            const decodedToken = jwtDecode(newAccessToken);
            setAuth({
                isLoggedIn: true,
                userId: decodedToken.nameid,
                roleName: decodedToken.role,
                email: decodedToken.email,
                avatar: decodedToken.Avatar,
                fullName: decodedToken.unique_name,
            });

            // Set up next automatic refresh
            setupTokenRefresh(newAccessToken);

            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
            throw error;
        }
    };

    
    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                
                // Check if token is expired
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // Token is expired, try to refresh
                    refreshAccessToken().catch(() => {
                        // If refresh fails, logout
                        logout();
                    });
                } else {
                    setAuth({
                        isLoggedIn: true,
                        userId: decodedToken.nameid,
                        roleName: decodedToken.role,
                        email: decodedToken.email,
                        avatar: decodedToken.Avatar,
                        fullName: decodedToken.unique_name,
                    });

                    setupTokenRefresh(accessToken);
                }
                
            } catch (error) {
                console.error('Error decoding token:', error);
                logout();
            }
        }
        else {
            setAuth(null); 
            stopNotificationHub();
        }
        setLoading(false)
    }, [accessToken]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }
        };
    }, []);

  const logout = () => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        setAccessToken(null);
        setRefreshToken(null);
        setAuth(null);
        stopNotificationHub();
    };

    const value = {
        accessToken,
        refreshToken,
        auth,
        setAuth,
        loading,
        logout,
        refreshAccessToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
