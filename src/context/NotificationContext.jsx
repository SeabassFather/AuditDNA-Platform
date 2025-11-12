import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success: (msg) => addNotification(msg, 'success'),
    error: (msg) => addNotification(msg, 'error'),
    warning: (msg) => addNotification(msg, 'warning'),
    info: (msg) => addNotification(msg, 'info')
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationDisplay notifications={notifications} onClose={removeNotification} />
    </NotificationContext.Provider>
  );
};

function NotificationDisplay({ notifications, onClose }) {
  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {notifications.map(notif => (
        <div
          key={notif.id}
          style={{
            background: notif.type === 'success' ? '#4caf50' :
                       notif.type === 'error' ? '#f44336' :
                       notif.type === 'warning' ? '#ff9800' : '#2196f3',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            minWidth: '250px',
            maxWidth: '400px',
            cursor: 'pointer'
          }}
          onClick={() => onClose(notif.id)}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
}

