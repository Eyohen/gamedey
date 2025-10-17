// pages/Bookings.jsx
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Filter options
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'no_show', label: 'No Show' }
  ];

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view bookings');
        return;
      }

      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      if (statusFilter) params.status = statusFilter;
      if (dateFilter) {
        params.startDate = dateFilter;
        params.endDate = dateFilter;
      }

      const response = await axios.get(`${URL}/coaches/profile/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params
      });
      
      if (response.data.success) {
        setBookings(response.data.data);
        setPagination(response.data.pagination || pagination);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, status, reason = '') => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to update booking status');
        return;
      }

      const response = await axios.patch(
        `${URL}/bookings/${bookingId}/status`,
        { status, cancellationReason: reason },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBookings(prev => 
          prev.map(booking => 
            booking.id === bookingId 
              ? { ...booking, status, cancellationReason: reason }
              : booking
          )
        );
        alert(`Booking ${status} successfully`);
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert(err.response?.data?.message || 'Failed to update booking status');
    }
  };

  // Handle status change
  const handleStatusChange = (booking, newStatus) => {
    if (newStatus === 'cancelled') {
      const reason = prompt('Please provide a reason for cancellation:');
      if (reason !== null) {
        updateBookingStatus(booking.id, newStatus, reason);
      }
    } else {
      const confirmMessage = `Are you sure you want to ${newStatus} this booking?`;
      if (window.confirm(confirmMessage)) {
        updateBookingStatus(booking.id, newStatus);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [pagination.page, statusFilter, dateFilter]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBookings();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'no_show':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      case 'completed':
        return <CheckCircle size={16} className="text-blue-600" />;
      case 'no_show':
        return <AlertCircle size={16} className="text-gray-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  // Format booking ID
  const formatBookingId = (id) => {
    return `#COACH-${id.slice(-8).toUpperCase()}`;
  };


// Check if a booking is scheduled for today
const isBookingToday = (bookingStartTime) => {
  const today = new Date();
  const bookingDate = new Date(bookingStartTime);
  
  return today.toDateString() === bookingDate.toDateString();
};

// Check if a booking is scheduled for future dates
const isBookingUpcoming = (bookingStartTime) => {
  const today = new Date();
  const bookingDate = new Date(bookingStartTime);
  
  // Reset time to compare only dates
  today.setHours(0, 0, 0, 0);
  bookingDate.setHours(0, 0, 0, 0);
  
  return bookingDate > today;
};


// Optional: Add booking counts for each tab (add this after your existing state declarations)
const getTodayCount = () => bookings.filter(booking => isBookingToday(booking.startTime)).length;
const getUpcomingCount = () => bookings.filter(booking => isBookingUpcoming(booking.startTime)).length;


  // Filter bookings based on search term
  // const filteredBookings = bookings.filter(booking => {
  //   if (!searchTerm) return true;
    
  //   const searchLower = searchTerm.toLowerCase();
  //   const userName = booking.User ? `${booking.User.firstName} ${booking.User.lastName}`.toLowerCase() : '';
  //   const bookingId = formatBookingId(booking.id).toLowerCase();
  //   const facilityName = booking.Facility?.name?.toLowerCase() || '';
    
  //   return userName.includes(searchLower) || 
  //          bookingId.includes(searchLower) || 
  //          facilityName.includes(searchLower);
  // });

  const filteredBookings = bookings.filter(booking => {
  // First apply search term filter
  let matchesSearch = true;
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    const userName = booking.User ? `${booking.User.firstName} ${booking.User.lastName}`.toLowerCase() : '';
    const bookingId = formatBookingId(booking.id).toLowerCase();
    const facilityName = booking.Facility?.name?.toLowerCase() || '';
    
    matchesSearch = userName.includes(searchLower) || 
                   bookingId.includes(searchLower) || 
                   facilityName.includes(searchLower);
  }
  
  if (!matchesSearch) return false;
  
  // Then apply date-based active filter
  switch (activeFilter) {
    case 'today':
      return isBookingToday(booking.startTime);
    case 'upcoming':
      return isBookingUpcoming(booking.startTime);
    case 'all':
    default:
      return true;
  }
});

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Mobile-Responsive Header with filters */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Coach Filter Tabs - Mobile Responsive */}
        {/* <div className='bg-gray-100 w-full p-2 rounded-lg'>
          <div className='grid grid-cols-3 gap-2'>
            <button
              className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                activeFilter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All Bookings
            </button>
            <button
              className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                activeFilter === 'today'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('today')}
            >
              Today
            </button>
            <button
              className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                activeFilter === 'upcoming'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div> */}
        <div className='bg-gray-100 w-full p-2 rounded-lg'>
  <div className='grid grid-cols-3 gap-2'>
    <button
      className={`px-3 py-2 rounded-lg transition-colors text-sm relative ${
        activeFilter === 'all'
          ? 'bg-white text-black'
          : 'bg-transparent text-gray-600 hover:bg-gray-200'
      }`}
      onClick={() => setActiveFilter('all')}
    >
      All Bookings
      <span className="ml-1 text-xs bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded-full">
        {bookings.length}
      </span>
    </button>
    <button
      className={`px-3 py-2 rounded-lg transition-colors text-sm relative ${
        activeFilter === 'today'
          ? 'bg-white text-black'
          : 'bg-transparent text-gray-600 hover:bg-gray-200'
      }`}
      onClick={() => setActiveFilter('today')}
    >
      Today
      <span className="ml-1 text-xs bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded-full">
        {getTodayCount()}
      </span>
    </button>
    <button
      className={`px-3 py-2 rounded-lg transition-colors text-sm relative ${
        activeFilter === 'upcoming'
          ? 'bg-white text-black'
          : 'bg-transparent text-gray-600 hover:bg-gray-200'
      }`}
      onClick={() => setActiveFilter('upcoming')}
    >
      Upcoming
      <span className="ml-1 text-xs bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded-full">
        {getUpcomingCount()}
      </span>
    </button>
  </div>
</div>

        {/* Mobile Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by user, booking ID, or facility..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
        >
          <Filter size={16} />
          Filters
          <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Filters (Collapsible) */}
        <div className={`space-y-3 lg:hidden ${showFilters ? 'block' : 'hidden'}`}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={fetchBookings}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Mobile Cards View - Shown on small screens */}
      <div className="block lg:hidden space-y-4 mb-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const startTime = formatDateTime(booking.startTime);
            const endTime = formatDateTime(booking.endTime);
            const duration = Math.round((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60));
            
            return (
              <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {formatBookingId(booking.id)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.bookingType}
                    </p>
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-2">
                  {/* User */}
                  <div className="flex items-center">
                    <User size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center">
                    <Calendar size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {startTime.date} at {startTime.time}
                    </span>
                  </div>

                  {/* Facility */}
                  {booking.Facility && (
                    <div className="flex items-center">
                      <MapPin size={14} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 truncate">
                        {booking.Facility.name}
                      </span>
                    </div>
                  )}

                  {/* Amount */}
                  <div className="flex items-center">
                    <DollarSign size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      ₦{parseFloat(booking.totalAmount).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 flex gap-2">
                  <button
                  onClick={() => navigate(`/bookings/${booking.id}`)}
                
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-sm"
                  >
                    <Eye size={14} />
                    View
                  </button>

                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking, 'confirmed')}
                        className="flex items-center justify-center px-3 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking, 'cancelled')}
                        className="flex items-center justify-center px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <XCircle size={14} />
                      </button>
                    </>
                  )}

                  {booking.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking, 'completed')}
                        className="flex items-center justify-center px-3 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking, 'no_show')}
                        className="flex items-center justify-center px-3 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <AlertCircle size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Calendar size={48} className="text-gray-400 mb-4 mx-auto" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter || dateFilter 
                ? 'Try adjusting your search or filters' 
                : 'No bookings have been made yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table View - Hidden on small screens */}
      <div className="hidden lg:block py-6 max-w-full">
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Facility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const startTime = formatDateTime(booking.startTime);
                  const endTime = formatDateTime(booking.endTime);
                  const duration = Math.round((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60));
                  
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatBookingId(booking.id)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.bookingType}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <User size={16} className="text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.User?.phone || 'No phone'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.Facility ? (
                            <>
                              <div className="font-medium">{booking.Facility.name}</div>
                              <div className="text-gray-500">{booking.Facility.address}</div>
                            </>
                          ) : (
                            <span className="text-gray-400">No facility</span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {startTime.date}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock size={14} className="mr-1 text-gray-400" />
                            {startTime.time} - {endTime.time}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {duration} hour{duration !== 1 ? 's' : ''}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₦{parseFloat(booking.totalAmount).toLocaleString()}
                        </div>
                        <div className={`text-xs ${
                          booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {booking.paymentStatus || 'pending'}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/bookings/${booking.id}`)}
                            // onClick={() => alert(`Viewing details for booking ${booking.id}`)}
                            className="text-purple-600 hover:text-purple-900 flex items-center"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Status Actions */}
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking, 'confirmed')}
                                className="text-green-600 hover:text-green-900 flex items-center"
                                title="Confirm Booking"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking, 'cancelled')}
                                className="text-red-600 hover:text-red-900 flex items-center"
                                title="Cancel Booking"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}

                          {booking.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking, 'completed')}
                                className="text-blue-600 hover:text-blue-900 flex items-center"
                                title="Mark as Completed"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking, 'no_show')}
                                className="text-gray-600 hover:text-gray-900 flex items-center"
                                title="Mark as No Show"
                              >
                                <AlertCircle size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Calendar size={48} className="text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-500">
                        {searchTerm || statusFilter || dateFilter 
                          ? 'Try adjusting your search or filters' 
                          : 'No bookings have been made yet'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile-Responsive Pagination */}
      {pagination.pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <div className="text-sm text-gray-700 order-2 sm:order-1">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          
          <div className="flex items-center space-x-1 order-1 sm:order-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {/* Show fewer page numbers on mobile */}
            {[...Array(Math.min(3, pagination.pages))].map((_, index) => {
              const pageNumber = Math.max(1, pagination.page - 1) + index;
              if (pageNumber > pagination.pages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 text-sm border rounded-md ${
                    pageNumber === pagination.page
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;