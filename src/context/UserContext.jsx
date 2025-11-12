// ================================================================
// USER CONTEXT - ROLE-BASED ACCESS CONTROL
// ================================================================
// Date: 2025-11-12 20:47:36 UTC
// User: SeabassFather
// Purpose: Control supplier data visibility based on user role
// ================================================================

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // CHANGE THIS TO CONTROL VIEW:
  // 'admin' = CM Products internal team (full access)
  // 'buyer' = External customers (masked data)
  // 'guest' = Public view (very limited)
  const [userRole, setUserRole] = useState('admin'); // Default to 'admin' for testing

  const [userInfo, setUserInfo] = useState({
    name: 'Sebastian',
    company: 'CM Products International',
    role: 'admin',
    permissions: {
      viewSupplierNames: true,
      viewContactInfo: true,
      viewFullLocation: true,
      directContact: true,
      viewPricing: true,
      createOrders: true
    }
  });

  // Function to check permissions
  const hasPermission = (permission) => {
    const rolePermissions = {
      admin: {
        viewSupplierNames: true,
        viewContactInfo: true,
        viewFullLocation: true,
        directContact: true,
        viewPricing: true,
        createOrders: true,
        exportData: true
      },
      buyer: {
        viewSupplierNames: false,  // MASKED
        viewContactInfo: false,     // HIDDEN
        viewFullLocation: false,    // City & Country only
        directContact: false,       // Must request quote
        viewPricing: true,
        createOrders: true,
        exportData: false
      },
      guest: {
        viewSupplierNames: false,
        viewContactInfo: false,
        viewFullLocation: false,
        directContact: false,
        viewPricing: false,
        createOrders: false,
        exportData: false
      }
    };

    return rolePermissions[userRole]?.[permission] || false;
  };

  // Function to switch roles (for testing)
  const switchRole = (role) => {
    setUserRole(role);
    setUserInfo(prev => ({ ...prev, role }));
  };

  return (
    <UserContext.Provider value={{ 
      userRole, 
      userInfo, 
      hasPermission, 
      switchRole 
    }}>
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