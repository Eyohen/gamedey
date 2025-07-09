// PaymentPage.jsx - Vite Compatible with Existing UI Style
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

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
    script.onload = () => {
      console.log('Paystack script loaded successfully');
    };
    script.onerror = () => {
      setError('Failed to load payment system. Please refresh the page.');
    };
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
          
          // Check if already paid
          if (response.data.data.paymentStatus === 'paid') {
            navigate(`/booking-success/${bookingId}`);
            return;
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

  // Payment verification function (separate from async context)
  const verifyPayment = (reference, token) => {
    axios.post(`${URL}/payments/verify`, {
      reference: reference,
      bookingId: booking.id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(verifyResponse => {
      if (verifyResponse.data.success) {
        // Payment successful, redirect to success page
        navigate(`/booking-success/${bookingId}`);
      } else {
        setError('Payment verification failed. Please contact support.');
      }
      setProcessing(false);
    })
    .catch(err => {
      console.error('Verification error:', err);
      setError('Payment verification failed. Please contact support.');
      setProcessing(false);
    });
  };

  // Initialize payment and handle Paystack popup
  const handlePayment = async () => {
    if (!booking || !user || !window.PaystackPop) {
      setError('Payment system not ready. Please refresh the page.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Generate reference
      const reference = `gamedey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create payment record in your backend first
      const token = localStorage.getItem('access_token');
      const paymentData = {
        bookingId: booking.id,
        reference: reference,
        amount: booking.totalAmount
      };

      const paymentResponse = await axios.post(`${URL}/payments/create-record`, paymentData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!paymentResponse.data.success) {
        throw new Error('Failed to create payment record');
      }

      // Initialize Paystack payment with proper function scope
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
        email: user.email,
        amount: Math.round(parseFloat(booking.totalAmount) * 100), // Convert to kobo
        ref: reference,
        currency: 'NGN',
        callback: function(response) {
          console.log('Payment successful:', response);
          // Call verification function without async/await
          verifyPayment(response.reference, token);
        },
        onClose: function() {
          console.log('Payment popup closed');
          setProcessing(false);
        },
        metadata: {
          bookingId: booking.id,
          userId: user.id,
          bookingType: booking.bookingType,
          facilityName: booking.Facility?.name || null,
          coachName: booking.Coach?.User ? `${booking.Coach.User.firstName} ${booking.Coach.User.lastName}` : null
        }
      });

      handler.openIframe();

    } catch (err) {
      console.error('Payment initialization error:', err);
      setError(err.response?.data?.message || 'Failed to initialize payment');
      setProcessing(false);
    }
  };

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

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen relative">
      {/* Header - keeping your existing style */}
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Hero Section - keeping your gradient style */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-64 relative overflow-hidden">
          {/* Payment illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-40">
              {/* Credit card illustration */}
              <div className="absolute bottom-8 w-48 h-32 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-lg transform perspective-1000 rotateX-12"></div>
              
              {/* Card details */}
              <div className="absolute bottom-12 left-8 right-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded opacity-80"></div>
              
              {/* Secure badge */}
              <div className="absolute bottom-2 left-12 right-12 h-6 bg-green-400 rounded flex items-center justify-center">
                <span className="text-xs text-white font-semibold">SECURE</span>
              </div>
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute top-8 left-8 w-12 h-6 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-12 right-12 w-8 h-4 bg-white rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-24">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h1>
        <p className="text-gray-600 text-sm mb-6">
          You're almost done! Complete your payment to confirm your booking.
        </p>

        {/* Booking Summary - keeping your card style */}
        <div className="border border-black rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-lg mb-4">Booking Summary</h2>
          
          {booking.Facility && (
            <div className="mb-4">
              <p className="font-medium">{booking.Facility.name}</p>
              <p className="text-sm text-gray-500">Facility Booking</p>
            </div>
          )}

          {booking.Coach && (
            <div className="mb-4">
              <p className="font-medium">
                Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
              </p>
              <p className="text-sm text-gray-500">Personal Training Session</p>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{startDateTime.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span>{startDateTime.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Participants:</span>
              <span>{booking.participantsCount}</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount:</span>
              <span className="text-[#7042D2]">₦{parseFloat(booking.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Method - keeping your style */}
        <div className="border border-black rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">💳</span>
            </div>
            <div>
              <p className="font-medium">Card Payment</p>
              <p className="text-sm text-gray-500">Visa, Mastercard, Verve via Paystack</p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-700">
            🔒 Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>

      {/* Bottom Payment Button - keeping your style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={handlePayment}
            disabled={processing}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
              processing
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {processing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `Pay ₦${parseFloat(booking.totalAmount).toLocaleString()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;