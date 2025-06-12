import { createContext, useContext, useEffect, useState } from 'react';
import { startNotificationHub, stopNotificationHub } from '../hubs/notificationHub';
import { useCustomNotification } from './CustomNotificationProvider';

export const NotificationContext = createContext();

export const NotificationProvider = ({ accessToken, children }) => {
  const [notifications, setNotifications] = useState([]);
  const { notify } = useCustomNotification();

  useEffect(() => {
    if (!accessToken) return;
    startNotificationHub(accessToken, (message) => {
    //   if (!message.createdAt) message.createdAt = new Date().toISOString();
    //   setNotifications(prev => [message, ...prev]);
      notify({
        message: message.title || 'Thông báo',
        description: message.content || 'Bạn có một thông báo mới.',
        type: 'info',
      });
      console.log("message", message);
    });
    return () => stopNotificationHub();
  }, [accessToken, notify]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
