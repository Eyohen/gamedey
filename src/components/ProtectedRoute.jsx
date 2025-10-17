// components/ProtectedRoute.jsx - Role-based route protection
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute check:', {
    path: location.pathname,
    userRole,
    allowedRoles,
    hasUser: !!user,
    loading
  });

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles required, just check authentication
  if (allowedRoles.length === 0) {
    console.log('No role restrictions, allowing access');
    return children;
  }

  // Check if user has required role
  if (!allowedRoles.includes(userRole)) {
    console.log(`Role mismatch! User role: ${userRole}, Allowed: ${allowedRoles.join(', ')}`);
    console.log('Redirecting to appropriate dashboard for role:', userRole);

    // Redirect to user's appropriate dashboard
    switch (userRole) {
      case 'coach':
        return <Navigate to="/coach/dashboard" replace />;
      case 'facility':
        return <Navigate to="/facility/dashboard" replace />;
      case 'user':
      default:
        return <Navigate to="/explore" replace />;
    }
  }

  console.log('Access granted to:', location.pathname);
  return children;
};

export default ProtectedRoute;