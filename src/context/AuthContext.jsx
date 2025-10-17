// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to detect user role
const getUserRole = (userData) => {
  if (!userData) return null;

  // Check if user has coach profile
  if (userData.Coach || userData.role === 'coach') {
    return 'coach';
  }

  // Check if user has facility ownership
  if (userData.ownedFacilities && userData.ownedFacilities.length > 0) {
    return 'facility';
  }

  // Check if user has facility role
  if (userData.Facility || userData.role === 'facility' || userData.role === 'facility-owner') {
    return 'facility';
  }

  // Default to regular user
  return 'user';
};

// Helper function to get dashboard route based on role
const getDashboardRoute = (role) => {
  switch (role) {
    case 'coach':
      return '/coach/dashboard';
    case 'facility':
      return '/facility/dashboard';
    case 'user':
    default:
      return '/explore';
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUserRole(getUserRole(parsedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log('AuthContext.login called with userData:', userData);
    setUser(userData);
    const role = getUserRole(userData);
    console.log('AuthContext detected role:', role);
    setUserRole(role);
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('user_role', role);
    console.log('AuthContext state updated with role:', role);
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_role');
  };

  const updateUser = (userData) => {
    setUser(userData);
    const role = getUserRole(userData);
    setUserRole(role);
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('user_role', role);
  };

  // Role checking helpers
  const isUser = () => userRole === 'user';
  const isCoach = () => userRole === 'coach';
  const isFacility = () => userRole === 'facility';
  const hasRole = (role) => userRole === role;

  const value = {
    user,
    userRole,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    isUser,
    isCoach,
    isFacility,
    hasRole,
    getDashboardRoute: () => getDashboardRoute(userRole)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
