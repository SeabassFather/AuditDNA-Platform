import React, { createContext, useContext, useState } from 'react';
const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const show = (msg, type='info') => setNotifications(n => [...n, {msg, type}]);
  return (
    <NotificationContext.Provider value={{ notifications, show }}>
      {children}
      <div style={{position:'fixed', top:10, right:10}}>
        {notifications.map((n, i) => <div key={i} style={{
          background: n.type==='error'?'#ef4444':n.type==='success'?'#10b981':'#334155', color:'#fff',marginBottom:8,padding:16,borderRadius:8}}>
          {n.msg}
        </div>)}
      </div>
    </NotificationContext.Provider>
  );
}
