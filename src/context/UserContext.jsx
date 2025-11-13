// ================================================================
// USER CONTEXT - SIMPLE ROLE-BASED ACCESS CONTROL
// ================================================================
// Date: 2025-11-13 00:38:10 UTC
// User: SeabassFather
// Purpose: Provide UserContext for SuppliersModule and App
// ================================================================

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('admin');

  const hasPermission = (permission) => {
    if (userRole === 'admin') return true;
    
    const permissions = {
      viewer: ['view'],
      editor: ['view', 'edit'],
      admin: ['view', 'edit', 'delete', 'manage']
    };
    
    return permissions[userRole]?.includes(permission) || false;
  };

  const switchRole = (newRole) => {
    if (['viewer', 'editor', 'admin'].includes(newRole)) {
      setUserRole(newRole);
    }
  };

  return (
    <UserContext.Provider value={{ userRole, hasPermission, switchRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export default UserContext;