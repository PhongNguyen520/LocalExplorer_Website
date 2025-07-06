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

    
    const setupTokenRefresh = (token) => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
            
            const refreshTime = Math.max(timeUntilExpiry - (2 * 60 * 1000), 0);
            
            refreshTimerRef.current = setTimeout(() => {
                refreshAccessToken();
            }, refreshTime);
        } catch (error) {
        }
    };
    
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

            Cookies.set('access_token', newAccessToken, { expires: 1/96 });
            Cookies.set('refresh_token', newRefreshToken, { expires: 7 });

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            const decodedToken = jwtDecode(newAccessToken);
            setAuth({
                isLoggedIn: true,
                userId: decodedToken.nameid,
                roleName: decodedToken.role,
                email: decodedToken.email,
                avatar: decodedToken.Avatar,
                fullName: decodedToken.unique_name,
            });

            setupTokenRefresh(newAccessToken);

            return newAccessToken;
        } catch (error) {
            logout();
            throw error;
        }
    };

    
    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    refreshAccessToken().catch(() => {      
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
                logout();
            }
        }
        else {
            setAuth(null); 
            stopNotificationHub();
        }
        setLoading(false)
    }, [accessToken]);

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
