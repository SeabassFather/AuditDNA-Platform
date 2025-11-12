import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <NotificationContext.Provider value={{ setMessage }}>
      {message && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

