import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = async (creds) => {/* Call API, setUser */};
  const logout = () => setUser(null);
  useEffect(() => { /* Auto-load user from localStorage/API */ }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
