//pages/BookingDetails.jsx - on the user frontend
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Star,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');

  // Fetch booking details
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${URL}/bookings/${bookingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setBooking(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId, navigate]);

  // Cancel booking
  const handleCancelBooking = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return;
    }

    setCancelling(true);
    try {
      const token = localStorage.getItem('access_token');
      
      const response = await axios.patch(`${URL}/bookings/${bookingId}/cancel`, 
        { reason: 'Cancelled by user from booking details' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setBooking(prev => ({ ...prev, status: 'cancelled' }));
        // Show success message or navigate back
        setTimeout(() => navigate('/bookings'), 2000);
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  // Calculate duration
  const calculateDuration = () => {
    if (!booking) return '';
    
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  // Get status icon and color
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          color: 'bg-green-100 text-green-800',
          text: 'Confirmed'
        };
      case 'pending':
        return {
          icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Pending'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="w-5 h-5 text-red-600" />,
          color: 'bg-red-100 text-red-800',
          text: 'Cancelled'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
          color: 'bg-blue-100 text-blue-800',
          text: 'Completed'
        };
      default:
        return {
          icon: <AlertCircle className="w-5 h-5 text-gray-600" />,
          color: 'bg-gray-100 text-gray-800',
          text: status
        };
    }
  };

  // Check if booking can be cancelled
  const canCancelBooking = () => {
    if (!booking) return false;
    
    const now = new Date();
    const bookingStart = new Date(booking.startTime);
    const hoursDifference = (bookingStart - now) / (1000 * 60 * 60);
    
    return booking.status === 'confirmed' && hoursDifference >= 24;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Booking not found</p>
        <button onClick={() => navigate('/bookings')} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
          Back to Bookings
        </button>
      </div>
    );
  }

  const statusDisplay = getStatusDisplay(booking.status);
  const startDateTime = formatDateTime(booking.startTime);
  const endDateTime = formatDateTime(booking.endTime);

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b sticky top-0 z-10">
        <button onClick={() => navigate('/bookings')} className="mr-4">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Booking Details</h1>
      </div>

      {error && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-md p-3">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Status Card */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Booking Status</h2>
            <span className="text-sm text-gray-500">#{booking.id.slice(-8).toUpperCase()}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {statusDisplay.icon}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.color}`}>
              {statusDisplay.text}
            </span>
            {booking.paymentStatus && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.paymentStatus === 'paid' ? 'Payment Completed' : 'Payment Pending'}
              </span>
            )}
          </div>
        </div>

        {/* Facility/Coach Information */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
          
          {booking.Facility && (
            <div className="mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <div className="text-white text-2xl">🏟️</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{booking.Facility.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span>{booking.Facility.address}</span>
                  </div>
                  {booking.Facility.Owner && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <User size={14} className="mr-1" />
                      <span>Managed by {booking.Facility.Owner.firstName} {booking.Facility.Owner.lastName}</span>
                    </div>
                  )}
                  {booking.Facility.averageRating && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Star size={14} className="mr-1 text-yellow-500" fill="currentColor" />
                      <span>{booking.Facility.averageRating} ({booking.Facility.totalReviews} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {booking.Coach && (
            <div className="mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">Personal Training Session</p>
                  {booking.Coach.experience && (
                    <p className="text-sm text-gray-600">{booking.Coach.experience} years experience</p>
                  )}
                  {booking.Coach.averageRating && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Star size={14} className="mr-1 text-yellow-500" fill="currentColor" />
                      <span>{booking.Coach.averageRating} ({booking.Coach.totalReviews} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Booking Information */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{startDateTime.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">
                    {startDateTime.time} - {endDateTime.time}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-medium text-gray-900">{booking.participantsCount}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">{calculateDuration()}</p>
                </div>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-gray-900">{booking.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
          
          <div className="flex items-center justify-between py-4 border-b">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-2xl font-bold text-purple-600">
              ₦{parseFloat(booking.totalAmount).toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Payment Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
            </span>
          </div>
          
          {booking.Payment && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">
                    {booking.Payment.paymentMethod} via {booking.Payment.paymentGateway}
                  </p>
                  {booking.Payment.transactionId && (
                    <p className="text-xs text-gray-500 font-mono">
                      Transaction ID: {booking.Payment.transactionId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            {booking.paymentStatus === 'pending' && booking.status === 'pending' && (
              <button
                onClick={() => navigate(`/payment/${booking.id}`)}
                className="flex-1 bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
              >
                Complete Payment
              </button>
            )}
            
            {canCancelBooking() && (
              <button
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            )}
            
            {booking.status === 'completed' && (
              <button
                onClick={() => navigate(`/review/${booking.id}`)}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Write Review
              </button>
            )}
            
            <button
              onClick={() => navigate('/bookings')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Bookings
            </button>
          </div>
        </div>

        {/* Cancellation Policy */}
        {booking.status !== 'cancelled' && booking.status !== 'completed' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Cancellation Policy</p>
                <p className="text-sm text-blue-700">
                  You can cancel this booking free of charge up to 24 hours before the scheduled time. 
                  Cancellations within 24 hours may be subject to charges.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;