import React, { createContext, useContext, useState, useCallback } from "react";
import { Bell } from "lucide-react";

const CustomNotificationContext = createContext();

export const useCustomNotification = () => useContext(CustomNotificationContext);

let id = 0;

export const CustomNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback(({
    message = "",
    description = "",
    type = "info", 
    duration = 4000,
  }) => {
    const newId = ++id;
    setNotifications((prev) => [
      ...prev,
      { id: newId, message, description, type }
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter(n => n.id !== newId));
    }, duration);
  }, []);

  const typeColor = {
    success: "border-green-500 bg-green-50",
    error: "border-red-500 bg-red-50",
    warning: "border-yellow-500 bg-yellow-50",
    info: "border-blue-500 bg-blue-50"
  };

  return (
    <CustomNotificationContext.Provider value={{ notify }}>
      {children}
      {/* Notification UI */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`min-w-[280px] max-w-sm shadow-xl rounded-xl px-5 py-4 border-l-4 ${typeColor[n.type] || typeColor.info} animate-fadeInUp pointer-events-auto flex items-start gap-3 bg-white`}
          >
            <div className="flex-shrink-0 mt-1">
              <Bell className="w-6 h-6 text-yellow-400" fill="#facc15" />
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1 text-gray-900 text-base leading-tight">{n.message}</div>
              <div className="text-sm text-gray-700 leading-snug">{n.description}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Tailwind animation */}
      <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.3s;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </CustomNotificationContext.Provider>
  );
};