// // pages/WriteReview.jsx - for user frontend
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronLeft, 
//   Star, 
//   User, 
//   Calendar,
//   Clock,
//   MapPin,
//   FileText,
//   Send,
//   CheckCircle,
//   AlertCircle
// } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// const WriteReview = () => {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
  
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
  
//   // Review form state
//   const [reviewData, setReviewData] = useState({
//     rating: 0,
//     comment: '',
//     wouldRecommend: true
//   });

//   // Hover state for stars
//   const [hoverRating, setHoverRating] = useState(0);

//   // Fetch booking details
//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get(`${URL}/bookings/${bookingId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.data.success) {
//           const bookingData = response.data.data;
//           setBooking(bookingData);
          
//           // Check if booking is completed
//           if (bookingData.status !== 'completed') {
//             setError('You can only review completed sessions');
//           }
          
//           // Check if review already exists
//           if (bookingData.review) {
//             setError('You have already reviewed this session');
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching booking details:', err);
//         setError('Failed to load booking details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (bookingId) {
//       fetchBookingDetails();
//     }
//   }, [bookingId, navigate]);

//   // Handle rating change
//   const handleRatingChange = (rating) => {
//     setReviewData(prev => ({ ...prev, rating }));
//   };

//   // Handle form input changes
//   const handleInputChange = (field, value) => {
//     setReviewData(prev => ({ ...prev, [field]: value }));
//   };

//   // Submit review
//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
    
//     if (reviewData.rating === 0) {
//       setError('Please provide a rating');
//       return;
//     }
    
//     if (!reviewData.comment.trim()) {
//       setError('Please write a comment about your experience');
//       return;
//     }

//     setSubmitting(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('access_token');
      
//       const reviewPayload = {
//         bookingId: booking.id,
//         coachId: booking.Coach?.id,
//         facilityId: booking.Facility?.id,
//         rating: reviewData.rating,
//         comment: reviewData.comment.trim(),
//         wouldRecommend: reviewData.wouldRecommend
//       };

//       const response = await axios.post(`${URL}/reviews`, reviewPayload, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setSuccess(true);
        
//         // Redirect after 3 seconds
//         setTimeout(() => {
//           navigate('/bookings');
//         }, 3000);
//       }
//     } catch (err) {
//       console.error('Error submitting review:', err);
//       setError(err.response?.data?.message || 'Failed to submit review');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Format time
//   const formatTime = (dateString) => {
//     return new Date(dateString).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Render star rating component
//   const renderStarRating = () => {
//     return (
//       <div className="flex items-center space-x-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => handleRatingChange(star)}
//             onMouseEnter={() => setHoverRating(star)}
//             onMouseLeave={() => setHoverRating(0)}
//             className="focus:outline-none transition-transform hover:scale-110"
//           >
//             <Star
//               size={32}
//               className={`${
//                 star <= (hoverRating || reviewData.rating)
//                   ? 'text-yellow-400 fill-yellow-400'
//                   : 'text-gray-300'
//               } transition-colors`}
//             />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   // Get rating description
//   const getRatingDescription = (rating) => {
//     switch (rating) {
//       case 1: return 'Poor - Not satisfied';
//       case 2: return 'Fair - Below expectations';
//       case 3: return 'Good - Meets expectations';
//       case 4: return 'Very Good - Exceeds expectations';
//       case 5: return 'Excellent - Outstanding service';
//       default: return 'Select a rating';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   if (success) {
//     return (
//       <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
//         <div className="bg-white px-6 py-4 flex items-center border-b">
//           <h1 className="text-lg font-semibold text-gray-900">Review Submitted</h1>
//         </div>
        
//         <div className="p-6">
//           <div className="text-center py-12">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
//             <p className="text-gray-600 mb-4">
//               Your review has been submitted successfully. It will help other users make informed decisions.
//             </p>
//             <p className="text-sm text-gray-500">
//               Redirecting you back to bookings in a few seconds...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!booking || error) {
//     return (
//       <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
//         <div className="bg-white px-6 py-4 flex items-center border-b">
//           <button onClick={() => navigate('/bookings')} className="mr-4">
//             <ChevronLeft className="w-6 h-6 text-gray-600" />
//           </button>
//           <h1 className="text-lg font-semibold text-gray-900">Write Review</h1>
//         </div>
        
//         <div className="p-6">
//           <div className="text-center py-12">
//             <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Write Review</h2>
//             <p className="text-gray-600 mb-4">{error || 'Booking not found'}</p>
//             <button 
//               onClick={() => navigate('/bookings')}
//               className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//             >
//               Back to Bookings
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-white px-6 py-4 flex items-center border-b sticky top-0 z-10">
//         <button onClick={() => navigate('/bookings')} className="mr-4">
//           <ChevronLeft className="w-6 h-6 text-gray-600" />
//         </button>
//         <h1 className="text-lg font-semibold text-gray-900">Write Review</h1>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* Session Information */}
//         <div className="bg-white rounded-lg p-6 border shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h2>
          
//           {/* Coach Information */}
//           {booking.Coach && (
//             <div className="flex items-start space-x-4 mb-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
//                 <User size={20} className="text-white" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900">
//                   Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
//                 </h3>
//                 <p className="text-sm text-gray-600">Personal Training Session</p>
//               </div>
//             </div>
//           )}

//           {/* Facility Information */}
//           {booking.Facility && (
//             <div className="flex items-center space-x-3 mb-4">
//               <MapPin className="w-4 h-4 text-gray-500" />
//               <span className="text-sm text-gray-600">{booking.Facility.name}</span>
//             </div>
//           )}

//           {/* Date and Time */}
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="flex items-center space-x-2">
//               <Calendar className="w-4 h-4 text-gray-500" />
//               <span className="text-gray-600">{formatDate(booking.startTime)}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Clock className="w-4 h-4 text-gray-500" />
//               <span className="text-gray-600">
//                 {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Review Form */}
//         <form onSubmit={handleSubmitReview} className="space-y-6">
//           {/* Rating Section */}
//           <div className="bg-white rounded-lg p-6 border shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
            
//             <div className="text-center mb-4">
//               {renderStarRating()}
//               <p className="text-sm text-gray-600 mt-2">
//                 {getRatingDescription(hoverRating || reviewData.rating)}
//               </p>
//             </div>
//           </div>

//           {/* Written Review */}
//           <div className="bg-white rounded-lg p-6 border shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h3>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tell others about your coaching session
//               </label>
//               <textarea
//                 value={reviewData.comment}
//                 onChange={(e) => handleInputChange('comment', e.target.value)}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 placeholder="What did you think of the coaching session? How was the coach's communication, expertise, and overall service?"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 {reviewData.comment.length}/500 characters
//               </p>
//             </div>

//             {/* Recommendation */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Would you recommend this coach to others?
//               </label>
//               <div className="flex space-x-4">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="recommend"
//                     checked={reviewData.wouldRecommend === true}
//                     onChange={() => handleInputChange('wouldRecommend', true)}
//                     className="mr-2 text-purple-600 focus:ring-purple-500"
//                   />
//                   <span className="text-sm text-gray-700">Yes, I would recommend</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="recommend"
//                     checked={reviewData.wouldRecommend === false}
//                     onChange={() => handleInputChange('wouldRecommend', false)}
//                     className="mr-2 text-purple-600 focus:ring-purple-500"
//                   />
//                   <span className="text-sm text-gray-700">No, I would not recommend</span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Error Display */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-md p-3">
//               <div className="flex items-center">
//                 <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
//                 <span className="text-sm text-red-700">{error}</span>
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="bg-white rounded-lg p-6 border shadow-sm">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 type="button"
//                 onClick={() => navigate('/bookings')}
//                 className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={submitting || reviewData.rating === 0 || !reviewData.comment.trim()}
//                 className="flex-1 bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {submitting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4 mr-2" />
//                     Submit Review
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Review Guidelines */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <div className="flex items-start space-x-3">
//             <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
//             <div>
//               <p className="text-sm font-medium text-blue-900">Review Guidelines</p>
//               <ul className="text-sm text-blue-700 mt-1 space-y-1">
//                 <li>• Be honest and fair in your review</li>
//                 <li>• Focus on your actual experience with the coach</li>
//                 <li>• Avoid personal attacks or inappropriate language</li>
//                 <li>• Help other users make informed decisions</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WriteReview;







// pages/WriteReview.jsx - Updated for user frontend
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Star, 
  User, 
  Calendar,
  Clock,
  MapPin,
  FileText,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const WriteReview = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Review form state
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ''
  });

  // Hover state for stars
  const [hoverRating, setHoverRating] = useState(0);

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
          const bookingData = response.data.data;
          setBooking(bookingData);
          
          // Check if booking is completed
          if (bookingData.status !== 'completed') {
            setError('You can only review completed sessions');
          }
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

  // Handle rating change
  const handleRatingChange = (rating) => {
    setReviewData(prev => ({ ...prev, rating }));
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setReviewData(prev => ({ ...prev, [field]: value }));
  };

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (reviewData.rating === 0) {
      setError('Please provide a rating');
      return;
    }
    
    if (!reviewData.comment.trim()) {
      setError('Please write a comment about your experience');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      
      const reviewPayload = {
        bookingId: booking.id,
        rating: reviewData.rating,
        comment: reviewData.comment.trim()
      };

      // Add either facilityId or coachId based on booking type
      if (booking.Facility) {
        reviewPayload.facilityId = booking.Facility.id;
      }
      if (booking.Coach) {
        reviewPayload.coachId = booking.Coach.id;
      }

      const response = await axios.post(`${URL}/reviews`, reviewPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSuccess(true);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/bookings');
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render star rating component
  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={`${
                star <= (hoverRating || reviewData.rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  // Get rating description
  const getRatingDescription = (rating) => {
    switch (rating) {
      case 1: return 'Poor - Not satisfied';
      case 2: return 'Fair - Below expectations';
      case 3: return 'Good - Meets expectations';
      case 4: return 'Very Good - Exceeds expectations';
      case 5: return 'Excellent - Outstanding service';
      default: return 'Select a rating';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
        <div className="bg-white px-6 py-4 flex items-center border-b">
          <h1 className="text-lg font-semibold text-gray-900">Review Submitted</h1>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              Your review has been submitted successfully. It will help other users make informed decisions.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you back to bookings in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!booking || error) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
        <div className="bg-white px-6 py-4 flex items-center border-b">
          <button onClick={() => navigate('/bookings')} className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Write Review</h1>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Write Review</h2>
            <p className="text-gray-600 mb-4">{error || 'Booking not found'}</p>
            <button 
              onClick={() => navigate('/bookings')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Back to Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b sticky top-0 z-10">
        <button onClick={() => navigate('/bookings')} className="mr-4">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Write Review</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Session Information */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h2>
          
          {/* Coach Information */}
          {booking.Coach && (
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
                </h3>
                <p className="text-sm text-gray-600">Personal Training Session</p>
              </div>
            </div>
          )}

          {/* Facility Information */}
          {booking.Facility && (
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🏟️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{booking.Facility.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{booking.Facility.address}</span>
                </div>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{formatDate(booking.startTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmitReview} className="space-y-6">
          {/* Rating Section */}
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
            
            <div className="text-center mb-4">
              {renderStarRating()}
              <p className="text-sm text-gray-600 mt-2">
                {getRatingDescription(hoverRating || reviewData.rating)}
              </p>
            </div>
          </div>

          {/* Written Review */}
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h3>
            
            {/* Review Comment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell others about your experience *
              </label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="What did you think of the session? How was the service, expertise, and overall experience?"
                required
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">
                {reviewData.comment.length}/1000 characters
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate('/bookings')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || reviewData.rating === 0 || !reviewData.comment.trim()}
                className="flex-1 bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Review Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Review Guidelines</p>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Be honest and fair in your review</li>
                <li>• Focus on your actual experience</li>
                <li>• Avoid personal attacks or inappropriate language</li>
                <li>• Help other users make informed decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;