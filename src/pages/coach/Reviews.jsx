// // pages/Reviews.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';
// import {
//   Star,
//   User,
//   Calendar,
//   Filter,
//   Search,
//   RefreshCw,
//   AlertCircle,
//   TrendingUp,
//   MessageCircle,
//   Award,
//   ThumbsUp,
//   BarChart3
// } from 'lucide-react';

// const Reviews = () => {
//   const { user } = useAuth();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [ratingFilter, setRatingFilter] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });
//   const [reviewStats, setReviewStats] = useState({
//     averageRating: 0,
//     totalReviews: 0,
//     ratingDistribution: {
//       5: 0,
//       4: 0,
//       3: 0,
//       2: 0,
//       1: 0
//     },
//     recentReviews: 0
//   });

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view reviews');
//         return;
//       }

//       const params = {
//         page: pagination.page,
//         limit: pagination.limit
//       };

//       if (ratingFilter) params.rating = ratingFilter;
//       if (searchTerm) params.search = searchTerm;

//       const response = await axios.get(`${URL}/coaches/profile/reviews`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         params
//       });

//       if (response.data.success) {
//         setReviews(response.data.data);
//         setPagination(response.data.pagination || pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//       setError('Failed to load reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch coach profile for stats
//   const fetchCoachStats = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       const response = await axios.get(`${URL}/coaches/profile/me`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         const coachData = response.data.data;
//         setReviewStats(prev => ({
//           ...prev,
//           averageRating: coachData.averageRating || 0,
//           totalReviews: coachData.totalReviews || 0
//         }));
//       }
//     } catch (err) {
//       console.error('Error fetching coach stats:', err);
//     }
//   };

//   // Calculate rating distribution from reviews
//   const calculateRatingDistribution = (reviewsData) => {
//     const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
//     reviewsData.forEach(review => {
//       const rating = Math.floor(review.rating);
//       if (rating >= 1 && rating <= 5) {
//         distribution[rating]++;
//       }
//     });
//     return distribution;
//   };

//   // Load all review data
//   const loadReviewData = async () => {
//     setLoading(true);
//     try {
//       await Promise.all([
//         fetchReviews(),
//         fetchCoachStats()
//       ]);
//     } catch (err) {
//       console.error('Error loading review data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render star rating
//   const renderStars = (rating, size = 16) => {
//     return (
//       <div className="flex items-center">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             size={size}
//             className={`${star <= rating
//                 ? 'text-yellow-400 fill-yellow-400'
//                 : 'text-gray-300'
//               }`}
//           />
//         ))}
//       </div>
//     );
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Format relative time
//   const formatRelativeTime = (dateString) => {
//     const now = new Date();
//     const reviewDate = new Date(dateString);
//     const diffInDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

//     if (diffInDays === 0) return 'Today';
//     if (diffInDays === 1) return 'Yesterday';
//     if (diffInDays < 7) return `${diffInDays} days ago`;
//     if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
//     return `${Math.floor(diffInDays / 30)} months ago`;
//   };

//   // Calculate percentage for rating distribution
//   const getRatingPercentage = (count, total) => {
//     return total > 0 ? (count / total) * 100 : 0;
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   // Filter reviews based on search term
//   const filteredReviews = reviews.filter(review => {
//     if (!searchTerm) return true;

//     const searchLower = searchTerm.toLowerCase();
//     const reviewerName = review.User ? `${review.User.firstName} ${review.User.lastName}`.toLowerCase() : '';
//     const reviewText = (review.comment || '').toLowerCase();

//     return reviewerName.includes(searchLower) || reviewText.includes(searchLower);
//   });

//   useEffect(() => {
//     loadReviewData();
//   }, []);

//   useEffect(() => {
//     fetchReviews();
//   }, [pagination.page, ratingFilter]);

//   // Debounced search
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchReviews();
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchTerm]);

//   // Calculate rating distribution when reviews change
//   useEffect(() => {
//     if (reviews.length > 0) {
//       const distribution = calculateRatingDistribution(reviews);
//       const recentCount = reviews.filter(review => {
//         const reviewDate = new Date(review.createdAt);
//         const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//         return reviewDate >= weekAgo;
//       }).length;

//       setReviewStats(prev => ({
//         ...prev,
//         ratingDistribution: distribution,
//         recentReviews: recentCount
//       }));
//     }
//   }, [reviews]);

//   if (loading && reviews.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
//           <p className="text-gray-600">See what your clients are saying about your coaching</p>
//         </div>

//         <button
//           onClick={loadReviewData}
//           className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <RefreshCw size={16} />
//           Refresh
//         </button>
//       </div>

//       {/* Error Display */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
//           <div className="flex items-center">
//             <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
//             <span className="text-sm text-red-700">{error}</span>
//           </div>
//         </div>
//       )}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-yellow-600 text-sm font-medium">Average Rating</p>
//               <div className="flex items-center gap-2 mt-1">
//                 {/* <p className="text-2xl font-bold text-yellow-800">{reviewStats.averageRating.toFixed(1)}</p> */}
//                 <p className="text-2xl font-bold text-yellow-800">{(parseFloat(reviewStats.averageRating) || 0).toFixed(1)}</p>
//                 {renderStars(reviewStats.averageRating, 20)}
//               </div>
//             </div>
//             <div className="p-3 bg-yellow-200 rounded-full">
//               <Star className="w-6 h-6 text-yellow-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-blue-600 text-sm font-medium">Total Reviews</p>
//               <p className="text-2xl font-bold text-blue-800">{reviewStats.totalReviews}</p>
//             </div>
//             <div className="p-3 bg-blue-200 rounded-full">
//               <MessageCircle className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-green-600 text-sm font-medium">This Week</p>
//               <p className="text-2xl font-bold text-green-800">{reviewStats.recentReviews}</p>
//             </div>
//             <div className="p-3 bg-green-200 rounded-full">
//               <TrendingUp className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-purple-600 text-sm font-medium">Positive Rate</p>
//               <p className="text-2xl font-bold text-purple-800">
//                 {reviewStats.totalReviews > 0
//                   ? Math.round((reviewStats.ratingDistribution[4] + reviewStats.ratingDistribution[5]) / reviewStats.totalReviews * 100)
//                   : 0}%
//               </p>
//             </div>
//             <div className="p-3 bg-purple-200 rounded-full">
//               <ThumbsUp className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Rating Distribution */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
//         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//           <BarChart3 size={20} />
//           Rating Distribution
//         </h3>

//         <div className="space-y-3">
//           {[5, 4, 3, 2, 1].map((rating) => {
//             const count = reviewStats.ratingDistribution[rating] || 0;
//             const percentage = getRatingPercentage(count, reviewStats.totalReviews);

//             return (
//               <div key={rating} className="flex items-center gap-4">
//                 <div className="flex items-center gap-1 w-16">
//                   <span className="text-sm font-medium">{rating}</span>
//                   <Star size={14} className="text-yellow-400 fill-yellow-400" />
//                 </div>

//                 <div className="flex-1 bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${percentage}%` }}
//                   />
//                 </div>

//                 <div className="text-sm text-gray-600 w-16 text-right">
//                   {count} ({percentage.toFixed(0)}%)
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="text"
//             placeholder="Search reviews..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         <select
//           value={ratingFilter}
//           onChange={(e) => setRatingFilter(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="">All Ratings</option>
//           <option value="5">5 Stars</option>
//           <option value="4">4 Stars</option>
//           <option value="3">3 Stars</option>
//           <option value="2">2 Stars</option>
//           <option value="1">1 Star</option>
//         </select>

//         <input
//           type="date"
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       </div>

//       {/* Reviews List */}
//       <div className="space-y-6">
//         {filteredReviews.length > 0 ? (
//           filteredReviews.map((review) => (
//             <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
//               {/* Review Header */}
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                     <User size={24} className="text-purple-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">
//                       {review.User ? `${review.User.firstName} ${review.User.lastName}` : 'Anonymous'}
//                     </h4>
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Calendar size={12} />
//                       {formatDate(review.createdAt)}
//                       <span>•</span>
//                       <span>{formatRelativeTime(review.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   {renderStars(review.rating)}
//                   <span className="text-sm font-medium text-gray-700">({review.rating}/5)</span>
//                 </div>
//               </div>

//               {/* Review Content */}
//               <div className="mb-4">
//                 <p className="text-gray-700 leading-relaxed">
//                   {review.comment || 'No comment provided'}
//                 </p>
//               </div>

//               {/* Review Footer */}
//               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                 <div className="flex items-center gap-4 text-sm text-gray-500">
//                   {review.Booking && (
//                     <div className="flex items-center gap-1">
//                       <Calendar size={12} />
//                       <span>Session: {formatDate(review.Booking.startTime)}</span>
//                     </div>
//                   )}
//                   {review.helpful > 0 && (
//                     <div className="flex items-center gap-1">
//                       <ThumbsUp size={12} />
//                       <span>{review.helpful} found helpful</span>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => alert('Reply feature coming soon')}
//                   className="text-purple-600 hover:text-purple-800 text-sm font-medium"
//                 >
//                   Reply
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-12">
//             <Award size={48} className="mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {searchTerm || ratingFilter ? 'No reviews match your filters' : 'No reviews yet'}
//             </h3>
//             <p className="text-gray-500">
//               {searchTerm || ratingFilter
//                 ? 'Try adjusting your search or filter criteria'
//                 : 'Reviews from your clients will appear here after they complete sessions'
//               }
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {pagination.pages > 1 && (
//         <div className="flex items-center justify-between mt-8">
//           <div className="text-sm text-gray-700">
//             Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reviews
//           </div>

//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(pagination.page - 1)}
//               disabled={pagination.page === 1}
//               className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Previous
//             </button>

//             {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
//               const pageNumber = pagination.page - 2 + index;
//               if (pageNumber < 1 || pageNumber > pagination.pages) return null;

//               return (
//                 <button
//                   key={pageNumber}
//                   onClick={() => handlePageChange(pageNumber)}
//                   className={`px-3 py-1 border rounded-md ${pageNumber === pagination.page
//                       ? 'bg-purple-500 text-white border-purple-500'
//                       : 'border-gray-300 hover:bg-gray-50'
//                     }`}
//                 >
//                   {pageNumber}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => handlePageChange(pagination.page + 1)}
//               disabled={pagination.page === pagination.pages}
//               className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reviews;























// pages/Reviews.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import {
  Star,
  User,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  Award,
  ThumbsUp,
  BarChart3
} from 'lucide-react';

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    },
    recentReviews: 0
  });

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view reviews');
        return;
      }

      // First get coach profile to get coach ID
      const profileResponse = await axios.get(`${URL}/coaches/profile/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!profileResponse.data.success) {
        setError('Failed to load coach profile');
        return;
      }

      const coachData = profileResponse.data.data;
      const coachId = coachData.id;

      const params = {
        page: pagination.page,
        limit: pagination.limit
      };

      if (ratingFilter) params.rating = ratingFilter;
      if (searchTerm) params.search = searchTerm;

      // Use the new review API endpoint
      const response = await axios.get(`${URL}/reviews/coach/${coachId}`, {
        params
      });

      if (response.data.success) {
        setReviews(response.data.data);
        setPagination(response.data.pagination || pagination);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  // Fetch coach profile for stats
  const fetchCoachStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await axios.get(`${URL}/coaches/profile/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        const coachData = response.data.data;
        setReviewStats(prev => ({
          ...prev,
          averageRating: parseFloat(coachData.averageRating) || 0,
          totalReviews: coachData.totalReviews || 0
        }));
      }
    } catch (err) {
      console.error('Error fetching coach stats:', err);
    }
  };

  // Calculate rating distribution from reviews
  const calculateRatingDistribution = (reviewsData) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsData.forEach(review => {
      const rating = Math.floor(review.rating);
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    });
    return distribution;
  };

  // Load all review data
  const loadReviewData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchReviews(),
        fetchCoachStats()
      ]);
    } catch (err) {
      console.error('Error loading review data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render star rating
  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Calculate percentage for rating distribution
  const getRatingPercentage = (count, total) => {
    return total > 0 ? (count / total) * 100 : 0;
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(review => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const reviewerName = review.User ? `${review.User.firstName} ${review.User.lastName}`.toLowerCase() : '';
    const reviewText = (review.comment || '').toLowerCase();
    
    return reviewerName.includes(searchLower) || reviewText.includes(searchLower);
  });

  useEffect(() => {
    loadReviewData();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [pagination.page, ratingFilter]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchReviews();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Calculate rating distribution when reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      const distribution = calculateRatingDistribution(reviews);
      const recentCount = reviews.filter(review => {
        const reviewDate = new Date(review.createdAt);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return reviewDate >= weekAgo;
      }).length;

      setReviewStats(prev => ({
        ...prev,
        ratingDistribution: distribution,
        recentReviews: recentCount
      }));
    }
  }, [reviews]);

  if (loading && reviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
          <p className="text-gray-600">See what your clients are saying about your coaching</p>
        </div>
        
        <button
          onClick={loadReviewData}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Average Rating</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold text-yellow-800">{reviewStats.averageRating.toFixed(1)}</p>
                {renderStars(reviewStats.averageRating, 20)}
              </div>
            </div>
            <div className="p-3 bg-yellow-200 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Reviews</p>
              <p className="text-2xl font-bold text-blue-800">{reviewStats.totalReviews}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">This Week</p>
              <p className="text-2xl font-bold text-green-800">{reviewStats.recentReviews}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Positive Rate</p>
              <p className="text-2xl font-bold text-purple-800">
                {reviewStats.totalReviews > 0 
                  ? Math.round((reviewStats.ratingDistribution[4] + reviewStats.ratingDistribution[5]) / reviewStats.totalReviews * 100)
                  : 0}%
              </p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <ThumbsUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          Rating Distribution
        </h3>
        
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviewStats.ratingDistribution[rating] || 0;
            const percentage = getRatingPercentage(count, reviewStats.totalReviews);
            
            return (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="text-sm text-gray-600 w-16 text-right">
                  {count} ({percentage.toFixed(0)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.User ? `${review.User.firstName} ${review.User.lastName}` : 'Anonymous'}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={12} />
                      {formatDate(review.createdAt)}
                      <span>•</span>
                      <span>{formatRelativeTime(review.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm font-medium text-gray-700">({review.rating}/5)</span>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">
                  {review.comment || 'No comment provided'}
                </p>
              </div>

              {/* Review Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {review.Booking && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Session: {formatDate(review.Booking.startTime)}</span>
                    </div>
                  )}
                  {review.helpful > 0 && (
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={12} />
                      <span>{review.helpful} found helpful</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => alert('Reply feature coming soon')}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Award size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || ratingFilter ? 'No reviews match your filters' : 'No reviews yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || ratingFilter 
                ? 'Try adjusting your search or filter criteria'
                : 'Reviews from your clients will appear here after they complete sessions'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-700">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reviews
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
              const pageNumber = pagination.page - 2 + index;
              if (pageNumber < 1 || pageNumber > pagination.pages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 border rounded-md ${
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
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;