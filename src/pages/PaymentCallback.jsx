// import React, { useState, useEffect } from 'react';
// import { CheckCircle, XCircle, Loader2, ArrowRight, Calendar, MapPin } from 'lucide-react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';

// const PaymentCallback = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   const [status, setStatus] = useState('verifying'); // verifying, success, failed
//   const [payment, setPayment] = useState(null);
//   const [booking, setBooking] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const reference = searchParams.get('reference');
//       const paystackStatus = searchParams.get('status');

//       if (!reference) {
//         setStatus('failed');
//         setError('No payment reference found');
//         return;
//       }

//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get(`${URL}/payments/verify/${reference}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.data.success) {
//           setPayment(response.data.data.payment);
//           setBooking(response.data.data.booking);
//           setStatus(paystackStatus === 'success' ? 'success' : 'failed');
//         } else {
//           setStatus('failed');
//           setError(response.data.message || 'Payment verification failed');
//         }
//       } catch (err) {
//         console.error('Error verifying payment:', err);
//         setStatus('failed');
//         setError(err.response?.data?.message || 'Payment verification failed');
//       }
//     };

//     verifyPayment();
//   }, [searchParams, navigate]);

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString('en-US', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }),
//       time: date.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit'
//       })
//     };
//   };

//   const renderContent = () => {
//     switch (status) {
//       case 'verifying':
//         return (
//           <div className="text-center py-12">
//             <Loader2 className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-spin" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
//             <p className="text-gray-600">Please wait while we confirm your payment...</p>
//           </div>
//         );

//       case 'success':
//         return (
//           <div className="text-center py-8">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <CheckCircle className="w-12 h-12 text-green-600" />
//             </div>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
//             <p className="text-gray-600 mb-8">
//               Your booking has been confirmed. You'll receive a confirmation email shortly.
//             </p>

//             {booking && (
//               <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
//                 <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                
//                 {/* Facility/Coach Info */}
//                 {booking.Facility && (
//                   <div className="mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
//                         <div className="text-white text-lg">🏟️</div>
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-gray-900">{booking.Facility.name}</h4>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <MapPin size={12} className="mr-1" />
//                           <span>{booking.Facility.address}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {booking.Coach && (
//                   <div className="mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
//                         <span className="text-white text-lg">👨‍🏫</span>
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-gray-900">
//                           Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
//                         </h4>
//                         <p className="text-sm text-gray-600">Personal Training Session</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Date and Time */}
//                 <div className="space-y-2">
//                   <div className="flex items-center text-sm">
//                     <Calendar size={14} className="mr-2 text-gray-500" />
//                     <span className="text-gray-600">Date: </span>
//                     <span className="font-medium text-gray-900 ml-1">
//                       {formatDateTime(booking.startTime).date}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-sm">
//                     <span className="text-gray-600 ml-4">Time: </span>
//                     <span className="font-medium text-gray-900 ml-1">
//                       {formatDateTime(booking.startTime).time} - {formatDateTime(booking.endTime).time}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Amount */}
//                 <div className="border-t mt-4 pt-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Amount Paid:</span>
//                     <span className="text-lg font-bold text-green-600">
//                       ₦{parseFloat(payment?.amount || booking.totalAmount).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="space-y-3">
//               <button
//                 onClick={() => navigate('/bookings')}
//                 className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center"
//               >
//                 View My Bookings
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </button>
              
//               <button
//                 onClick={() => navigate('/explore')}
//                 className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 Book Another Session
//               </button>
//             </div>
//           </div>
//         );

//       case 'failed':
//         return (
//           <div className="text-center py-8">
//             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <XCircle className="w-12 h-12 text-red-600" />
//             </div>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
//             <p className="text-gray-600 mb-2">
//               Unfortunately, your payment could not be processed.
//             </p>
//             {error && (
//               <p className="text-red-600 text-sm mb-8">{error}</p>
//             )}

//             <div className="space-y-3">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
//               >
//                 Try Again
//               </button>
              
//               <button
//                 onClick={() => navigate('/explore')}
//                 className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 Back to Browse
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white min-h-screen">
//       {/* Header */}
//       <div className="bg-white px-6 py-4 border-b">
//         <h1 className="text-lg font-semibold text-gray-900 text-center">
//           {status === 'verifying' ? 'Processing...' : 
//            status === 'success' ? 'Payment Complete' : 'Payment Failed'}
//         </h1>
//       </div>

//       {/* Content */}
//       <div className="px-6">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default PaymentCallback;






import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, ArrowRight, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, failed
  const [payment, setPayment] = useState(null);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      const paystackStatus = searchParams.get('status');
      const trxref = searchParams.get('trxref');

      // Use reference or trxref, whichever is available
      const paymentReference = reference || trxref;

      if (!paymentReference) {
        setStatus('failed');
        setError('No payment reference found in URL parameters');
        return;
      }

      console.log('Verifying payment with reference:', paymentReference);
      console.log('Paystack status:', paystackStatus);

      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${URL}/payments/verify/${paymentReference}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Verification response:', response.data);

        if (response.data.success) {
          setPayment(response.data.data.payment);
          setBooking(response.data.data.booking);
          
          // Check if payment is actually successful
          if (response.data.data.payment.status === 'success') {
            setStatus('success');
          } else {
            // Payment might still be processing, retry a few times
            if (verificationAttempts < 3) {
              console.log(`Payment still processing, retry attempt ${verificationAttempts + 1}`);
              setVerificationAttempts(prev => prev + 1);
              setTimeout(() => verifyPayment(), 2000); // Retry after 2 seconds
              return;
            } else {
              setStatus('failed');
              setError('Payment verification timeout. Please contact support if money was debited.');
            }
          }
        } else {
          setStatus('failed');
          setError(response.data.message || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
        
        // If it's a 404, the payment might not be in our system yet
        if (err.response?.status === 404 && verificationAttempts < 3) {
          console.log(`Payment not found, retry attempt ${verificationAttempts + 1}`);
          setVerificationAttempts(prev => prev + 1);
          setTimeout(() => verifyPayment(), 3000); // Retry after 3 seconds
          return;
        }
        
        setStatus('failed');
        setError(err.response?.data?.message || 'Payment verification failed');
      }
    };

    verifyPayment();
  }, [searchParams, navigate, verificationAttempts]);

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

  const retryVerification = () => {
    setStatus('verifying');
    setVerificationAttempts(0);
    setError('');
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center py-12">
            <Loader2 className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600 mb-2">Please wait while we confirm your payment...</p>
            {verificationAttempts > 0 && (
              <p className="text-sm text-orange-600">
                Verification attempt {verificationAttempts + 1} of 3
              </p>
            )}
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">
              Your booking has been confirmed. You'll receive a confirmation email shortly.
            </p>

            {booking && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                
                {/* Facility/Coach Info */}
                {booking.Facility && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <div className="text-white text-lg">🏟️</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{booking.Facility.name}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={12} className="mr-1" />
                          <span>{booking.Facility.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {booking.Coach && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">👨‍🏫</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">Personal Training Session</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Date and Time */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar size={14} className="mr-2 text-gray-500" />
                    <span className="text-gray-600">Date: </span>
                    <span className="font-medium text-gray-900 ml-1">
                      {formatDateTime(booking.startTime).date}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 ml-4">Time: </span>
                    <span className="font-medium text-gray-900 ml-1">
                      {formatDateTime(booking.startTime).time} - {formatDateTime(booking.endTime).time}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="text-lg font-bold text-green-600">
                      ₦{parseFloat(payment?.amount || booking.totalAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => navigate('/bookings')}
                className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center"
              >
                View My Bookings
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button
                onClick={() => navigate('/explore')}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Another Session
              </button>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h2>
            <p className="text-gray-600 mb-2">
              We couldn't verify your payment at this time.
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Show retry option for verification timeout */}
            {error.includes('timeout') && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-left">
                    <p className="text-yellow-800 text-sm font-medium">Payment may still be processing</p>
                    <p className="text-yellow-700 text-sm">
                      If money was debited from your account, please wait a few minutes and check your bookings.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={retryVerification}
                className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
              >
                Retry Verification
              </button>
              
              <button
                onClick={() => navigate('/bookings')}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Check My Bookings
              </button>
              
              <button
                onClick={() => navigate('/explore')}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Browse
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          {status === 'verifying' ? 'Processing...' : 
           status === 'success' ? 'Payment Complete' : 'Payment Verification'}
        </h1>
      </div>

      {/* Content */}
      <div className="px-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentCallback;