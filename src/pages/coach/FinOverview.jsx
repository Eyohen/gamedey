// // pages/FinOverview.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';
// import {
//   TrendingUp,
//   DollarSign,
//   Calendar,
//   Clock,
//   Eye,
//   Download,
//   Filter,
//   RefreshCw,
//   AlertCircle,
//   CreditCard,
//   Wallet,
//   TrendingDown
// } from 'lucide-react';

// const FinOverview = () => {
//   const { user } = useAuth();
//   const [activeButton, setActiveButton] = useState('earnings');
//   const [financialStats, setFinancialStats] = useState({
//     totalEarnings: 0,
//     weeklyEarnings: 0,
//     monthlyEarnings: 0,
//     pendingPayouts: 0,
//     completedSessions: 0,
//     averageSessionRate: 0
//   });
//   const [transactions, setTransactions] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });

//   // Fetch dashboard stats for financial overview
//   const fetchFinancialStats = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view financial data');
//         return;
//       }

//       const response = await axios.get(`${URL}/coaches/profile/dashboard`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         const data = response.data.data;
//         setFinancialStats({
//           totalEarnings: data.totalEarnings || 0,
//           weeklyEarnings: data.weeklyBookings * 5000 || 0, // Estimate
//           monthlyEarnings: data.monthlyBookings * 5000 || 0, // Estimate
//           pendingPayouts: data.totalBookings * 0.1 || 0, // Estimate
//           completedSessions: data.totalBookings || 0,
//           averageSessionRate: data.totalEarnings / (data.totalBookings || 1) || 0
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching financial stats:', err);
//       setError('Failed to load financial statistics');
//     }
//   };

//   // Fetch payments (earnings from bookings)
//   const fetchPayments = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       const params = {
//         page: pagination.page,
//         limit: pagination.limit
//       };

//       if (statusFilter) params.status = statusFilter;

//       const response = await axios.get(`${URL}/payments`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         params
//       });

//       if (response.data.success) {
//         setPayments(response.data.data);
//         setPagination(response.data.pagination || pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching payments:', err);
//     }
//   };

//   // Fetch user transactions (if available)
//   const fetchTransactions = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       // This endpoint might not exist in your backend, so we'll handle the error gracefully
//       const response = await axios.get(`${URL}/users/wallet`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         params: {
//           page: pagination.page,
//           limit: pagination.limit
//         }
//       });

//       if (response.data.success) {
//         setTransactions(response.data.transactions || []);
//       }
//     } catch (err) {
//       console.log('Transactions endpoint not available:', err);
//       // Set empty transactions if endpoint doesn't exist
//       setTransactions([]);
//     }
//   };

//   // Fetch bookings to calculate earnings
//   const fetchBookingsForEarnings = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       const params = {
//         page: 1,
//         limit: 100, // Get more records for calculations
//         status: 'completed' // Only completed bookings count as earnings
//       };

//       if (dateFilter) {
//         params.startDate = dateFilter;
//         params.endDate = dateFilter;
//       }

//       const response = await axios.get(`${URL}/coaches/profile/bookings`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         params
//       });

//       if (response.data.success) {
//         const completedBookings = response.data.data;
        
//         // Calculate actual earnings from completed bookings
//         const totalEarnings = completedBookings.reduce((sum, booking) => {
//           return sum + parseFloat(booking.totalAmount || 0);
//         }, 0);

//         // Calculate weekly and monthly earnings
//         const now = new Date();
//         const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//         const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//         const weeklyEarnings = completedBookings
//           .filter(booking => new Date(booking.createdAt) >= weekAgo)
//           .reduce((sum, booking) => sum + parseFloat(booking.totalAmount || 0), 0);

//         const monthlyEarnings = completedBookings
//           .filter(booking => new Date(booking.createdAt) >= monthAgo)
//           .reduce((sum, booking) => sum + parseFloat(booking.totalAmount || 0), 0);

//         setFinancialStats(prev => ({
//           ...prev,
//           totalEarnings,
//           weeklyEarnings,
//           monthlyEarnings,
//           completedSessions: completedBookings.length,
//           averageSessionRate: totalEarnings / (completedBookings.length || 1)
//         }));
//       }
//     } catch (err) {
//       console.error('Error fetching bookings for earnings:', err);
//     }
//   };

//   // Load all financial data
//   const loadFinancialData = async () => {
//     setLoading(true);
//     try {
//       await Promise.all([
//         fetchFinancialStats(),
//         fetchPayments(),
//         fetchTransactions(),
//         fetchBookingsForEarnings()
//       ]);
//     } catch (err) {
//       console.error('Error loading financial data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `₦${parseFloat(amount || 0).toLocaleString()}`;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'success':
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'failed':
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   useEffect(() => {
//     loadFinancialData();
//   }, []);

//   useEffect(() => {
//     if (activeButton === 'earnings') {
//       fetchPayments();
//     } else {
//       fetchTransactions();
//     }
//   }, [pagination.page, statusFilter, dateFilter, activeButton]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className='px-6 py-6'>
//       {/* Error Display */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <div className="flex items-center">
//             <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
//             <span className="text-sm text-red-700">{error}</span>
//           </div>
//         </div>
//       )}

//       {/* Financial Stats Cards */}
//       <div className='flex gap-x-6 pb-6 overflow-x-auto'>
//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4 min-w-[240px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>Total Earnings</p>
//               <p className='font-semibold text-3xl'>{formatCurrency(financialStats.totalEarnings)}</p>
//             </div>
//             <div>
//               <p className='text-green-500'><TrendingUp size={16} /></p>
//               <p className='text-green-500'>All time</p>
//             </div>
//           </div>
//         </div>

//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4 min-w-[240px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>This Week Earnings</p>
//               <p className='font-semibold text-3xl'>{formatCurrency(financialStats.weeklyEarnings)}</p>
//             </div>
//             <div>
//               <p className='text-blue-500'><Calendar size={16} /></p>
//               <p className='text-blue-500'>7 days</p>
//             </div>
//           </div>
//         </div>

//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4 min-w-[240px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>This Month</p>
//               <p className='font-semibold text-3xl'>{formatCurrency(financialStats.monthlyEarnings)}</p>
//             </div>
//             <div>
//               <p className='text-purple-500'><Clock size={16} /></p>
//               <p className='text-purple-500'>30 days</p>
//             </div>
//           </div>
//         </div>

//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4 min-w-[240px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>Avg per Session</p>
//               <p className='font-semibold text-3xl'>{formatCurrency(financialStats.averageSessionRate)}</p>
//             </div>
//             <div>
//               <p className='text-orange-500'><DollarSign size={16} /></p>
//               <p className='text-orange-500'>Rate</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className='bg-gray-100 w-[340px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'earnings'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('earnings')}
//           >
//             Earnings History
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'transactions'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('transactions')}
//           >
//             All Transactions
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="">All Status</option>
//           <option value="success">Success</option>
//           <option value="completed">Completed</option>
//           <option value="pending">Pending</option>
//           <option value="failed">Failed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         <input
//           type="date"
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />

//         <button
//           onClick={loadFinancialData}
//           className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <RefreshCw size={16} />
//           Refresh
//         </button>

//         <button
//           onClick={() => alert('Export feature coming soon')}
//           className="flex items-center gap-2 px-4 py-2 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] transition-colors"
//         >
//           <Download size={16} />
//           Export
//         </button>
//       </div>

//       {/* Transactions Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Description
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Reference
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Payment Method
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {(activeButton === 'earnings' ? payments : transactions).length > 0 ? (
//               (activeButton === 'earnings' ? payments : transactions).map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       <Calendar size={14} className="mr-2 text-gray-400" />
//                       {formatDate(item.createdAt)}
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       {activeButton === 'earnings' ? (
//                         <CreditCard size={14} className="mr-2 text-green-500" />
//                       ) : (
//                         <Wallet size={14} className="mr-2 text-blue-500" />
//                       )}
//                       {item.description || 
//                        (activeButton === 'earnings' ? 'Coaching Session Payment' : 'Transaction') ||
//                        `${item.Booking?.bookingType} booking`}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
//                     {item.transactionId || item.reference || item.id?.slice(-8).toUpperCase()}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className={`flex items-center ${
//                       activeButton === 'earnings' ? 'text-green-600' : 'text-gray-900'
//                     }`}>
//                       <DollarSign size={14} className="mr-1" />
//                       {formatCurrency(item.amount)}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       <CreditCard size={14} className="mr-2 text-gray-400" />
//                       {item.paymentMethod || item.paymentGateway || 'Card'}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
//                       {item.status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       onClick={() => alert(`Viewing details for ${item.id}`)}
//                       className="text-purple-600 hover:text-purple-900 flex items-center"
//                       title="View Details"
//                     >
//                       <Eye size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="px-6 py-12 text-center">
//                   <div className="flex flex-col items-center">
//                     <DollarSign size={48} className="text-gray-400 mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No {activeButton === 'earnings' ? 'earnings' : 'transactions'} found
//                     </h3>
//                     <p className="text-gray-500">
//                       {activeButton === 'earnings' 
//                         ? 'Complete coaching sessions to start earning'
//                         : 'Transactions will appear here once you start using the platform'
//                       }
//                     </p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {pagination.pages > 1 && (
//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
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
//                   className={`px-3 py-1 border rounded-md ${
//                     pageNumber === pagination.page
//                       ? 'bg-purple-500 text-white border-purple-500'
//                       : 'border-gray-300 hover:bg-gray-50'
//                   }`}
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

//       {/* Financial Summary */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-green-600 text-sm font-medium">Completed Sessions</p>
//               <p className="text-2xl font-bold text-green-800">{financialStats.completedSessions}</p>
//             </div>
//             <div className="p-3 bg-green-200 rounded-full">
//               <TrendingUp className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-blue-600 text-sm font-medium">Average Rate</p>
//               <p className="text-2xl font-bold text-blue-800">{formatCurrency(financialStats.averageSessionRate)}</p>
//             </div>
//             <div className="p-3 bg-blue-200 rounded-full">
//               <DollarSign className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-purple-600 text-sm font-medium">Growth Rate</p>
//               <p className="text-2xl font-bold text-purple-800">+15.3%</p>
//             </div>
//             <div className="p-3 bg-purple-200 rounded-full">
//               <TrendingUp className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinOverview;






// pages/FinOverview.jsx - Mobile Responsive Version
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  Eye,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  CreditCard,
  Wallet,
  TrendingDown,
  ChevronDown,
  X
} from 'lucide-react';

const FinOverview = () => {
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState('earnings');
  const [showFilters, setShowFilters] = useState(false);
  const [financialStats, setFinancialStats] = useState({
    totalEarnings: 0,
    weeklyEarnings: 0,
    monthlyEarnings: 0,
    pendingPayouts: 0,
    completedSessions: 0,
    averageSessionRate: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Fetch dashboard stats for financial overview
  const fetchFinancialStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view financial data');
        return;
      }

      const response = await axios.get(`${URL}/coaches/profile/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        const data = response.data.data;
        setFinancialStats({
          totalEarnings: data.totalEarnings || 0,
          weeklyEarnings: data.weeklyBookings * 5000 || 0,
          monthlyEarnings: data.monthlyBookings * 5000 || 0,
          pendingPayouts: data.totalBookings * 0.1 || 0,
          completedSessions: data.totalBookings || 0,
          averageSessionRate: data.totalEarnings / (data.totalBookings || 1) || 0
        });
      }
    } catch (err) {
      console.error('Error fetching financial stats:', err);
      setError('Failed to load financial statistics');
    }
  };

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const params = {
        page: pagination.page,
        limit: pagination.limit
      };

      if (statusFilter) params.status = statusFilter;

      const response = await axios.get(`${URL}/payments`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params
      });

      if (response.data.success) {
        setPayments(response.data.data);
        setPagination(response.data.pagination || pagination);
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  // Fetch user transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await axios.get(`${URL}/users/wallet`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
          page: pagination.page,
          limit: pagination.limit
        }
      });

      if (response.data.success) {
        setTransactions(response.data.transactions || []);
      }
    } catch (err) {
      console.log('Transactions endpoint not available:', err);
      setTransactions([]);
    }
  };

  // Fetch bookings to calculate earnings
  const fetchBookingsForEarnings = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const params = {
        page: 1,
        limit: 100,
        status: 'completed'
      };

      if (dateFilter) {
        params.startDate = dateFilter;
        params.endDate = dateFilter;
      }

      const response = await axios.get(`${URL}/coaches/profile/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params
      });

      if (response.data.success) {
        const completedBookings = response.data.data;
        
        const totalEarnings = completedBookings.reduce((sum, booking) => {
          return sum + parseFloat(booking.totalAmount || 0);
        }, 0);

        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const weeklyEarnings = completedBookings
          .filter(booking => new Date(booking.createdAt) >= weekAgo)
          .reduce((sum, booking) => sum + parseFloat(booking.totalAmount || 0), 0);

        const monthlyEarnings = completedBookings
          .filter(booking => new Date(booking.createdAt) >= monthAgo)
          .reduce((sum, booking) => sum + parseFloat(booking.totalAmount || 0), 0);

        setFinancialStats(prev => ({
          ...prev,
          totalEarnings,
          weeklyEarnings,
          monthlyEarnings,
          completedSessions: completedBookings.length,
          averageSessionRate: totalEarnings / (completedBookings.length || 1)
        }));
      }
    } catch (err) {
      console.error('Error fetching bookings for earnings:', err);
    }
  };

  // Load all financial data
  const loadFinancialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchFinancialStats(),
        fetchPayments(),
        fetchTransactions(),
        fetchBookingsForEarnings()
      ]);
    } catch (err) {
      console.error('Error loading financial data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount || 0).toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    loadFinancialData();
  }, []);

  useEffect(() => {
    if (activeButton === 'earnings') {
      fetchPayments();
    } else {
      fetchTransactions();
    }
  }, [pagination.page, statusFilter, dateFilter, activeButton]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-3 lg:px-6 py-4 lg:py-6'>
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile-Responsive Financial Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pb-6'>
        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>Total Earnings</p>
              <p className='font-semibold text-xl lg:text-3xl truncate'>{formatCurrency(financialStats.totalEarnings)}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-green-500'><TrendingUp size={16} /></p>
              <p className='text-green-500 text-xs'>All time</p>
            </div>
          </div>
        </div>

        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>This Week</p>
              <p className='font-semibold text-xl lg:text-3xl truncate'>{formatCurrency(financialStats.weeklyEarnings)}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-blue-500'><Calendar size={16} /></p>
              <p className='text-blue-500 text-xs'>7 days</p>
            </div>
          </div>
        </div>

        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>This Month</p>
              <p className='font-semibold text-xl lg:text-3xl truncate'>{formatCurrency(financialStats.monthlyEarnings)}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-purple-500'><Clock size={16} /></p>
              <p className='text-purple-500 text-xs'>30 days</p>
            </div>
          </div>
        </div>

        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>Avg per Session</p>
              <p className='font-semibold text-xl lg:text-3xl truncate'>{formatCurrency(financialStats.averageSessionRate)}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-orange-500'><DollarSign size={16} /></p>
              <p className='text-orange-500 text-xs'>Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Responsive Tab Navigation */}
      <div className='bg-gray-100 w-full sm:w-[380px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm transition-colors ${activeButton === 'earnings'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('earnings')}
          >
            Earnings History
          </button>
          <button
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm transition-colors ${activeButton === 'transactions'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('transactions')}
          >
            All Transactions
          </button>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center justify-center gap-2 w-full py-3 mb-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
      >
        <Filter size={16} />
        Filters & Actions
        <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile Filters (Collapsible) */}
      <div className={`space-y-3 mb-6 lg:hidden ${showFilters ? 'block' : 'hidden'}`}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={loadFinancialData}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            onClick={() => alert('Export feature coming soon')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:flex flex-col sm:flex-row gap-4 items-center mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={loadFinancialData}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

        <button
          onClick={() => alert('Export feature coming soon')}
          className="flex items-center gap-2 px-4 py-2 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] transition-colors"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Mobile Card View - Transactions */}
      <div className="block lg:hidden space-y-4 mb-6">
        {(activeButton === 'earnings' ? payments : transactions).length > 0 ? (
          (activeButton === 'earnings' ? payments : transactions).map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {activeButton === 'earnings' ? (
                      <CreditCard size={16} className="text-green-500" />
                    ) : (
                      <Wallet size={16} className="text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {item.description || 
                       (activeButton === 'earnings' ? 'Coaching Session Payment' : 'Transaction') ||
                       `${item.Booking?.bookingType} booking`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
                
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {/* Card Details */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Reference:</span>
                  <span className="text-sm font-mono text-gray-900">
                    {item.transactionId || item.reference || item.id?.slice(-8).toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className={`text-sm font-medium ${
                    activeButton === 'earnings' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {formatCurrency(item.amount)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Method:</span>
                  <span className="text-sm text-gray-900">
                    {item.paymentMethod || item.paymentGateway || 'Card'}
                  </span>
                </div>
              </div>

              {/* Card Action */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => alert(`Viewing details for ${item.id}`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <DollarSign size={48} className="text-gray-400 mb-4 mx-auto" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeButton === 'earnings' ? 'earnings' : 'transactions'} found
            </h3>
            <p className="text-gray-500 px-4">
              {activeButton === 'earnings' 
                ? 'Complete coaching sessions to start earning'
                : 'Transactions will appear here once you start using the platform'
              }
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(activeButton === 'earnings' ? payments : transactions).length > 0 ? (
              (activeButton === 'earnings' ? payments : transactions).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {formatDate(item.createdAt)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      {activeButton === 'earnings' ? (
                        <CreditCard size={14} className="mr-2 text-green-500" />
                      ) : (
                        <Wallet size={14} className="mr-2 text-blue-500" />
                      )}
                      {item.description || 
                       (activeButton === 'earnings' ? 'Coaching Session Payment' : 'Transaction') ||
                       `${item.Booking?.bookingType} booking`}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {item.transactionId || item.reference || item.id?.slice(-8).toUpperCase()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className={`flex items-center ${
                      activeButton === 'earnings' ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      <DollarSign size={14} className="mr-1" />
                      {formatCurrency(item.amount)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <CreditCard size={14} className="mr-2 text-gray-400" />
                      {item.paymentMethod || item.paymentGateway || 'Card'}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => alert(`Viewing details for ${item.id}`)}
                      className="text-purple-600 hover:text-purple-900 flex items-center"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <DollarSign size={48} className="text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No {activeButton === 'earnings' ? 'earnings' : 'transactions'} found
                    </h3>
                    <p className="text-gray-500">
                      {activeButton === 'earnings' 
                        ? 'Complete coaching sessions to start earning'
                        : 'Transactions will appear here once you start using the platform'
                      }
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

      {/* Mobile-Responsive Financial Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 lg:p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed Sessions</p>
              <p className="text-xl lg:text-2xl font-bold text-green-800">{financialStats.completedSessions}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Average Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-blue-800 truncate">{formatCurrency(financialStats.averageSessionRate)}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Growth Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-purple-800">+15.3%</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinOverview;