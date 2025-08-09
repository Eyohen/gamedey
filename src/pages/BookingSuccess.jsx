// pages/BookingSuccess.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
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
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId, navigate]);

  // Format date and time (keeping your existing format)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{error || 'Booking not found'}</p>
        <button onClick={() => navigate('/bookings')} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
          View My Bookings
        </button>
      </div>
    );
  }

  const startDateTime = formatDateTime(booking.startTime);
  const endDateTime = formatDateTime(booking.endTime);

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen relative">
      {/* Header - keeping your existing style */}
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => navigate('/explore')} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <button onClick={() => navigate('/explore')} className="p-2">
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Hero Section - keeping your gradient style */}
      <div className="relative">
        <div className="bg-gradient-to-r from-green-600 to-green-800 h-64 relative overflow-hidden">
          {/* Success illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-40">
              {/* Success check mark */}
              <div className="absolute bottom-8 w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">✓</span>
                </div>
              </div>
              
              {/* Celebration elements */}
              <div className="absolute top-4 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Floating celebration elements */}
          <div className="absolute top-8 left-8 w-12 h-6 bg-yellow-400 rounded-full opacity-80"></div>
          <div className="absolute top-12 right-12 w-8 h-4 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-24">
        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h1>
          <p className="text-gray-600 text-sm mb-4">
            Your payment was successful and your booking is confirmed.
          </p>
          <p className="text-sm text-gray-500">
            Booking ID: #{booking.id.slice(-8).toUpperCase()}
          </p>
        </div>

        {/* Booking Details - keeping your card style */}
        <div className="border border-black rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-lg mb-4">Booking Details</h2>
          
          {booking.Facility && (
            <div className="mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏟️</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{booking.Facility.name}</p>
                  <p className="text-sm text-gray-500">Facility Booking</p>
                  {booking.Facility.address && (
                    <p className="text-sm text-gray-500">{booking.Facility.address}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {booking.Coach && (
            <div className="mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">
                    Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">Personal Training Session</p>
                  {booking.Coach.User?.phone && (
                    <p className="text-sm text-gray-500">📞 {booking.Coach.User.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{startDateTime.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">{startDateTime.time} - {endDateTime.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Participants:</span>
              <span className="font-medium">{booking.participantsCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-medium text-green-600">Confirmed ✓</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Paid:</span>
              <span className="text-green-600">₦{parseFloat(booking.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• You'll receive a confirmation email shortly</li>
            <li>• Arrive 10 minutes early to your session</li>
            <li>• Bring your ID and any necessary equipment</li>
            <li>• You can cancel up to 24 hours before your session</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/booking-details/${booking.id}`)}
            className="w-full bg-purple-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
          >
            View Booking Details
          </button>
          
          <button
            onClick={() => navigate('/bookings')}
            className="w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            View All My Bookings
          </button>
          
          <button
            onClick={() => navigate('/explore')}
            className="w-full border border-[#946BEF] text-[#946BEF] py-4 px-6 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Book Another Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;