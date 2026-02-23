// src/components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import {
  Bell,
  User,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
  Search,
  Watch,
  WalletMinimal,
  OctagonAlert,
  Camera
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../assets/logo.png';
import facilities from '../../assets/facilities.png';
import bookings from '../../assets/bookings.png';
import community from '../../assets/community.png';
import financialoverview from '../../assets/financialoverview.png';
import getpaid from '../../assets/getpaid.png';
import reviews from '../../assets/reviews.png';
import profile from '../../assets/profile.png';

// MenuItem Component - Mobile responsive version
const MenuItem = ({ icon, title, path, collapsed, active, onClick, isMobile, onMobileClose }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  // If onClick is provided, use a button instead of a Link
  if (onClick) {
    return (
      <button 
        onClick={handleClick}
        className={`flex items-center w-full px-4 py-3 text-left rounded-xl
            text-gray-500 hover:bg-gray-50 hover:text-black font-semibold transition-colors
            ${isMobile ? 'text-base' : ''}`}
      >
        <span className="flex-shrink-0">{icon}</span>
        {(!collapsed || isMobile) && <span className="ml-3">{title}</span>}
      </button>
    );
  }
  
  // Regular menu item with Link
  return (
    <Link 
      to={path}
      onClick={isMobile ? onMobileClose : undefined}
      className={`flex items-center ${isMobile ? 'w-full' : 'w-[200px]'} px-3 py-3 text-left rounded-xl ${active ?
        'bg-[#7042D2] text-white font-semibold border-r-[6px] border-b-[4px] border-black'  : 
        'text-black font-normal hover:bg-gray-50 hover:text-black border-2 border-black'
      } transition-colors ${isMobile ? 'text-base border-0 hover:bg-gray-100' : ''}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {(!collapsed || isMobile) && <span className="ml-3">{title}</span>}
    </Link>
  );
};

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  console.log("layout user", user);

  // Check if coach has uploaded a profile photo
  useEffect(() => {
    const checkProfilePhoto = async () => {
      // Only check once per session
      if (sessionStorage.getItem('profile_photo_checked')) {
        const needsPhoto = sessionStorage.getItem('needs_profile_photo') === 'true';
        if (needsPhoto) {
          showProfilePhotoReminder();
        }
        return;
      }

      try {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        const response = await axios.get(`${URL}/coaches/profile/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) {
          const coachData = response.data.data;
          const hasProfileImage = coachData.profileImage || coachData.User?.profileImage;

          sessionStorage.setItem('profile_photo_checked', 'true');
          sessionStorage.setItem('needs_profile_photo', (!hasProfileImage).toString());

          if (!hasProfileImage) {
            showProfilePhotoReminder();
          }
        }
      } catch (err) {
        console.error('Error checking profile photo:', err);
      }
    };

    const showProfilePhotoReminder = () => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-sm w-full bg-white shadow-lg rounded-xl pointer-events-auto border border-gray-200 overflow-hidden`}
          >
            <div className="bg-gradient-to-r from-[#7042D2] to-[#9b6dff] px-4 py-2">
              <p className="text-white text-sm font-semibold">Complete Your Profile</p>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera size={20} className="text-[#7042D2]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Upload a profile photo so clients can find and recognize you. Your profile won't be visible without one.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        toast.dismiss(t.id);
                        navigate('/coach/profile');
                      }}
                      className="px-3 py-1.5 bg-[#7042D2] text-white text-xs font-medium rounded-lg hover:bg-[#5a35a8] transition-colors"
                    >
                      Upload Now
                    </button>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="px-3 py-1.5 text-gray-500 text-xs font-medium hover:text-gray-700 transition-colors"
                    >
                      Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          duration: 15000,
          position: 'top-right',
          id: 'profile-photo-reminder',
        }
      );
    };

    checkProfilePhoto();
  }, [navigate]);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    navigate("/");
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Menu items configuration
  const menuItems = [
    { path: "/coach/dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/coach/bookings", title: "Bookings", icon: <img src={facilities} alt="facilities" className="w-5 h-5" /> },
    { path: "/coach/teams", title: "Teams", icon: <img src={bookings} alt="bookings" className="w-5 h-5" /> },
    { path: "/coach/community", title: "Community", icon: <img src={community} alt="community" className="w-5 h-5" /> },
    // { path: "/coach/events", title: "Events", icon: <img src={community} alt="events" className="w-5 h-5" /> },
    { path: "/coach/financial-overview", title: "Financial Overview", icon: <WalletMinimal size={20} /> },
    { path: "/coach/get-paid", title: "Get Paid", icon: <WalletMinimal size={20} /> },
    { path: "/coach/reviews", title: "Reviews", icon: <WalletMinimal size={20} /> },
    { path: "/coach/profile", title: "Profile", icon: <img src={reviews} alt="profile" className="w-5 h-5" /> },
  ];

  // Get page title based on current path
  const getPageTitle = () => {
    const page = menuItems.find(item => item.path === currentPath);
    return page ? page.title : "Dashboard";
  };

  return (
    <div className="flex h-screen text-gray-800">
      <Toaster />
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`${collapsed ? 'w-16' : 'w-64'} bg-gray-100 transition-all duration-300 flex-col hidden lg:flex`}>
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-gray-200">
          {!collapsed && <div className="text-xl font-bold"><img src={logo} className='w-36' alt="logo" /></div>}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="text-gray-500 hover:text-black p-1 rounded-md"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Desktop Menu Items */}
        <nav className="flex-1 py-4 px-2 rounded-xl space-y-4">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path}
              icon={item.icon} 
              title={item.title} 
              path={item.path}
              collapsed={collapsed} 
              active={currentPath === item.path}
              isMobile={false}
            />
          ))}
          
          {/* Logout Item - Special handling */}
          <MenuItem 
            icon={<LogOut size={20} />} 
            title="Logout" 
            collapsed={collapsed}
            onClick={handleLogout}
            isMobile={false}
          />
        </nav>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transform transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <img src={logo} className="w-32" alt="logo" />
          <button 
            onClick={closeMobileMenu}
            className="text-gray-500 hover:text-black p-2 rounded-md"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 py-4 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path}
              icon={item.icon} 
              title={item.title} 
              path={item.path}
              collapsed={false} 
              active={currentPath === item.path}
              isMobile={true}
              onMobileClose={closeMobileMenu}
            />
          ))}
          
          {/* Mobile Logout Item */}
          <MenuItem 
            icon={<LogOut size={20} />} 
            title="Logout" 
            collapsed={false}
            onClick={handleLogout}
            isMobile={true}
            onMobileClose={closeMobileMenu}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile-Responsive Header */}
        <div className='bg-gray-100'>
          <header className="bg-white rounded-t-3xl mt-4 py-4 px-4 lg:px-12 flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-3"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
              
              <h1 className="text-lg lg:text-2xl font-semibold text-gray-800 truncate">
                {getPageTitle()}
              </h1>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
               <p>Coach</p>
              <button className="p-2 text-gray-500 hover:text-black rounded-full">
                <Bell size={18} className="lg:w-5 lg:h-5" />
              </button>
              
                <Link to={'/coach/profile'}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={14} className="lg:w-4 lg:h-4" />
                </div>
                <span className="text-xs lg:text-sm font-medium text-gray-800 hidden sm:block">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              </Link>
            </div>
          </header>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-3 lg:p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;