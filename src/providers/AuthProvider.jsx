import { createContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { startNotificationHub, stopNotificationHub } from '../hubs/notificationHub';
import { notification } from 'antd';
import 'antd/dist/reset.css';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));

    console.log(accessToken);
    
    
    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                
                setAuth({
                    isLoggedIn: true,
                    userId: decodedToken.nameid,
                    roleName: decodedToken.role,
                    email: decodedToken.email,
                    avatar: decodedToken.Avatar,
                    fullName: decodedToken.unique_name,
                  });
                
            } catch (error) {
                console.error('Error decoding token:', error);
                Cookies.remove('access_token');
                setAuth(null);
                stopNotificationHub();
            }
        }
        else {
            setAuth(null); 
            stopNotificationHub();
        }
        setLoading(false)
    }, [accessToken]);

  const logout = () => {
        Cookies.remove('access_token');
        setAccessToken(null);
        setAuth(null);
        stopNotificationHub();
    };

    const value = {
        accessToken,
        auth,
        setAuth,
        loading,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
