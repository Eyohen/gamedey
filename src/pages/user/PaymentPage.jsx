// pages/PaymentPage.jsx - Simplified approach based on your ecommerce implementation
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X, CreditCard, Shield, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
          // Check if booking is already paid
          if (response.data.data.paymentStatus === 'paid') {
            navigate(`/booking-success/${bookingId}`);
          }
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

  // Handle successful payment - Similar to your ecommerce approach
  const handlePaystackSuccess = async (reference) => {
    try {
      const token = localStorage.getItem('access_token');
      
      // Create a simple payment confirmation endpoint
      const response = await axios.post(`${URL}/payments/confirm`, {
        bookingId: booking.id,
        paymentReference: reference.reference,
        paymentMethod: 'paystack'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Update booking status to confirmed
        navigate(`/booking-success/${booking.id}`);
      } else {
        throw new Error('Payment confirmation failed');
      }
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      setError('Payment confirmation failed. Please contact support with reference: ' + reference.reference);
    } finally {
      setProcessing(false);
    }
  };

  const handlePaystackClose = () => {
    setProcessing(false);
    // Optional: Show a message that payment was cancelled
  };

  // Make payment - Simplified like your ecommerce version
  const handleMakePayment = async () => {
    if (!user || !booking) {
      setError('Please login to make payment');
      return;
    }

    setProcessing(true);
    setError('');
    
    try {
      // Initialize Paystack payment directly (no backend payment record needed initially)
      if (!window.PaystackPop) {
        setError('Paystack is not loaded. Please refresh the page and try again.');
        setProcessing(false);
        return;
      }

      const handler = window.PaystackPop.setup({
      
        key: 'pk_live_ad43da25a04e811c0d7ebc42c312c07abaae2744',
        email: user.email,
        amount: Math.round(parseFloat(booking.totalAmount) * 100), // Convert to kobo
        currency: 'NGN',
        ref: `booking-${booking.id}-${Date.now()}`, // Generate reference
        metadata: {
          booking_id: booking.id,
          booking_type: booking.bookingType,
          customer_name: `${user.firstName} ${user.lastName}`,
          facility_name: booking.Facility?.name || '',
          coach_name: booking.Coach?.User ? `${booking.Coach.User.firstName} ${booking.Coach.User.lastName}` : ''
        },
        callback: function(response) {
          console.log('Payment successful:', response);
          handlePaystackSuccess(response);
        },
        onClose: handlePaystackClose
      });

      handler.openIframe();
    } catch (err) {
      console.error('Payment initialization failed:', err);
      setError('Failed to initialize payment. Please try again.');
      setProcessing(false);
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

  const startDateTime = formatDateTime(booking.startTime);
  const endDateTime = formatDateTime(booking.endTime);

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen relative">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-md">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <button onClick={() => navigate('/bookings')} className="p-2 bg-white rounded-full shadow-md">
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 h-32 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <CreditCard className="w-12 h-12 text-white mx-auto mb-2" />
            <h1 className="text-white text-xl font-semibold">Complete Payment</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-32">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Booking Summary */}
        <div className="border border-black rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-lg mb-4">Booking Summary</h2>
          
          {/* Service Info */}
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
                    <p className="text-xs text-gray-500">{booking.Facility.address}</p>
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
                  <p className="text-sm text-gray-500">Personal Training</p>
                </div>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="space-y-2 text-sm border-t pt-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{startDateTime.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{startDateTime.time} - {endDateTime.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{calculateDuration()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Participants:</span>
              <span className="font-medium">{booking.participantsCount}</span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>₦{parseFloat(booking.totalAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Service fee:</span>
              <span>₦0</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span className="text-purple-600">₦{parseFloat(booking.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Security Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Secure Payment</p>
              <p className="text-sm text-green-700">
                Your payment is secured by Paystack with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Payment Terms</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Payment is processed immediately</li>
            <li>• Full refund available up to 24 hours before session</li>
            <li>• You'll receive a confirmation email after payment</li>
            <li>• Contact support for any payment issues</li>
          </ul>
        </div>
      </div>

      {/* Bottom Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={handleMakePayment}
            disabled={processing}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 ${
              processing
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pay ₦{parseFloat(booking.totalAmount).toLocaleString()}</span>
              </>
            )}
          </button>
          
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;