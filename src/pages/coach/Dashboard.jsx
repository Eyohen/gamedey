// // pages/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   TrendingUp,
//   MessageSquareMore,
//   Meh,
//   Ellipsis,
//   Calendar,
//   Clock,
//   User,
//   MapPin,
//   DollarSign,
//   Eye,
//   RefreshCw,
//   AlertCircle
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [activeButton, setActiveButton] = useState('recent');
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     totalEarnings: 0,
//     monthlyBookings: 0,
//     weeklyBookings: 0,
//     averageRating: 0,
//     totalReviews: 0,
//     upcomingBookings: []
//   });
//   const [recentBookings, setRecentBookings] = useState([]);
//   const [todaySchedule, setTodaySchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch dashboard stats
//   const fetchDashboardStats = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view dashboard');
//         return;
//       }

//       const response = await axios.get(`${URL}/coaches/profile/dashboard`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setDashboardStats(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching dashboard stats:', err);
//       setError('Failed to load dashboard stats');
//     }
//   };

//   // Fetch recent bookings
//   const fetchRecentBookings = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       const response = await axios.get(`${URL}/coaches/profile/bookings`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         params: {
//           page: 1,
//           limit: 5,
//           status: 'confirmed'
//         }
//       });

//       if (response.data.success) {
//         setRecentBookings(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching recent bookings:', err);
//     }
//   };

//   // Fetch today's schedule
//   const fetchTodaySchedule = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       const today = new Date().toISOString().split('T')[0];
//       const response = await axios.get(`${URL}/coaches/profile/bookings`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         params: {
//           page: 1,
//           limit: 10,
//           startDate: today,
//           endDate: today
//         }
//       });

//       if (response.data.success) {
//         setTodaySchedule(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching today schedule:', err);
//     }
//   };

//   // Load all data
//   const loadDashboardData = async () => {
//     setLoading(true);
//     try {
//       await Promise.all([
//         fetchDashboardStats(),
//         fetchRecentBookings(),
//         fetchTodaySchedule()
//       ]);
//     } catch (err) {
//       console.error('Error loading dashboard data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatTime = (dateTime) => {
//     return new Date(dateTime).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatDate = (dateTime) => {
//     return new Date(dateTime).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatCurrency = (amount) => {
//     return `₦${parseFloat(amount).toLocaleString()}`;
//   };

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

//       {/* Stats Cards */}
//       <div className='flex gap-x-6 pb-6 overflow-x-auto'>
//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2 min-w-[200px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>Total Revenue</p>
//               <p className='font-semibold text-3xl'>{formatCurrency(dashboardStats.totalEarnings || 0)}</p>
//             </div>
//             <div>
//               <p className='text-green-500'><TrendingUp size={16} /></p>
//               <p className='text-green-500'>+15%</p>
//             </div>
//           </div>
//         </div>

//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2 min-w-[200px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>Total Sessions</p>
//               <p className='font-semibold text-3xl'>{dashboardStats.totalBookings || 0}</p>
//             </div>
//             <div>
//               <p className='text-green-500'><TrendingUp size={16} /></p>
//               <p className='text-green-500'>+12%</p>
//             </div>
//           </div>
//         </div>

//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2 min-w-[200px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>This Month</p>
//               <p className='font-semibold text-3xl'>{dashboardStats.monthlyBookings || 0}</p>
//             </div>
//             <div>
//               <p className='text-green-500'><TrendingUp size={16} /></p>
//               <p className='text-green-500'>+8%</p>
//             </div>
//           </div>
//         </div>

//         <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2 min-w-[200px]'>
//           <div className='flex gap-x-6 items-center'>
//             <div>
//               <p className='text-sm'>Rating</p>
//               <p className='font-semibold text-3xl'>{dashboardStats.averageRating || 0}/5</p>
//             </div>
//             <div>
//               <p className='text-blue-500'><MessageSquareMore size={16} /></p>
//               <p className='text-blue-500'>{dashboardStats.totalReviews || 0} reviews</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className='bg-gray-100 w-[310px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'recent'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('recent')}
//           >
//             Recent Bookings
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'today'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('today')}
//           >
//             Today Schedule
//           </button>
//         </div>
//       </div>

//       {/* Quick Action Cards */}
//       <div className='mb-6'>
//         <div className='flex justify-between items-center mb-4'>
//           <h3 className='font-semibold text-xl'>Quick Actions</h3>
//           <button 
//             onClick={loadDashboardData}
//             className="flex items-center gap-2 px-3 py-1 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
//           >
//             <RefreshCw size={16} />
//             Refresh
//           </button>
//         </div>
        
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
//           {dashboardStats.upcomingBookings?.slice(0, 4).map((booking, index) => {
//             const colors = ['bg-orange-500', 'bg-green-400', 'bg-red-300', 'bg-blue-300'];
//             const textColors = ['text-orange-700', 'text-green-700', 'text-red-700', 'text-blue-700'];
            
//             return (
//               <div key={booking.id} className={`border border-black rounded-md ${colors[index % colors.length]}`}>
//                 <div className='px-2'>
//                   <div className={`border border-black bg-yellow-500 rounded-md text-[10px] px-1 w-[60px] font-medium ml-auto mt-2 pl-2 ${getStatusColor(booking.status).split(' ')[1]}`}>
//                     {booking.status}
//                   </div>
//                 </div>
//                 <div className={`flex justify-center items-center py-5 ${colors[index % colors.length]} rounded-t-md`}>
//                   <User size={50} className={textColors[index % textColors.length]} />
//                 </div>
//                 <div className='p-2 bg-white rounded-b-md'>
//                   <div className='flex gap-x-4'>
//                     <p className='font-semibold text-md'>Booking Details</p>
//                     <Ellipsis size={20}/>
//                   </div>
//                   <p className='text-sm'>{formatDate(booking.startTime)} {formatTime(booking.startTime)}</p>
//                   <p className='text-sm'>{booking.Facility?.name || 'No facility'}</p>
//                   <p className='text-sm'>{booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}</p>
//                   <p className='text-sm font-medium'>{formatCurrency(booking.totalAmount)}</p>
//                 </div>
//               </div>
//             );
//           })}
          
//           {(!dashboardStats.upcomingBookings || dashboardStats.upcomingBookings.length === 0) && (
//             <div className="col-span-full text-center py-8">
//               <Calendar size={48} className="mx-auto text-gray-400 mb-2" />
//               <p className="text-gray-500">No upcoming bookings</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bookings Table */}
//       <div className='flex justify-between py-2 mt-4'>
//         <p className='font-semibold text-xl'>
//           {activeButton === 'recent' ? 'Recent Bookings' : "Today's Schedule"}
//         </p>
//         <p className='text-[#946BEF] cursor-pointer'>View all</p>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Client
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Facility
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Time
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {(activeButton === 'recent' ? recentBookings : todaySchedule).length > 0 ? (
//               (activeButton === 'recent' ? recentBookings : todaySchedule).map((booking) => (
//                 <tr key={booking.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     <div className="flex items-center">
//                       <Calendar size={14} className="mr-2 text-gray-400" />
//                       {formatDate(booking.startTime)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       <User size={14} className="mr-2 text-gray-400" />
//                       {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       <MapPin size={14} className="mr-2 text-gray-400" />
//                       {booking.Facility?.name || 'No facility'}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       <Clock size={14} className="mr-2 text-gray-400" />
//                       {formatTime(booking.startTime)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       <DollarSign size={14} className="mr-2 text-gray-400" />
//                       {formatCurrency(booking.totalAmount)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="px-6 py-12 text-center">
//                   <div className="flex flex-col items-center">
//                     <Calendar size={48} className="text-gray-400 mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No {activeButton === 'recent' ? 'recent bookings' : 'schedule for today'}
//                     </h3>
//                     <p className="text-gray-500">
//                       {activeButton === 'recent' 
//                         ? 'Bookings will appear here once clients start booking sessions' 
//                         : 'Your schedule for today is clear'
//                       }
//                     </p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// pages/Dashboard.jsx - Mobile Responsive Version
import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  MessageSquareMore,
  Meh,
  Ellipsis,
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Eye,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState('recent');
  const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    totalEarnings: 0,
    monthlyBookings: 0,
    weeklyBookings: 0,
    averageRating: 0,
    totalReviews: 0,
    upcomingBookings: []
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view dashboard');
        return;
      }

      const response = await axios.get(`${URL}/coaches/profile/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setDashboardStats(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load dashboard stats');
    }
  };

  // Fetch recent bookings
  const fetchRecentBookings = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await axios.get(`${URL}/coaches/profile/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
          page: 1,
          limit: 5,
          status: 'confirmed'
        }
      });

      if (response.data.success) {
        setRecentBookings(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching recent bookings:', err);
    }
  };

  // Fetch today's schedule
  const fetchTodaySchedule = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${URL}/coaches/profile/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
          page: 1,
          limit: 10,
          startDate: today,
          endDate: today
        }
      });

      if (response.data.success) {
        setTodaySchedule(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching today schedule:', err);
    }
  };

  // Load all data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchRecentBookings(),
        fetchTodaySchedule()
      ]);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString()}`;
  };

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
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Mobile-Responsive Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pb-6'>
        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>Total Revenue</p>
              <p className='font-semibold text-xl lg:text-3xl truncate'>{formatCurrency(dashboardStats.totalEarnings || 0)}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-green-500'><TrendingUp size={16} /></p>
              <p className='text-green-500 text-xs'>+15%</p>
            </div>
          </div>
        </div>

        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>Total Sessions</p>
              <p className='font-semibold text-xl lg:text-3xl'>{dashboardStats.totalBookings || 0}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-green-500'><TrendingUp size={16} /></p>
              <p className='text-green-500 text-xs'>+12%</p>
            </div>
          </div>
        </div>

        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>This Month</p>
              <p className='font-semibold text-xl lg:text-3xl'>{dashboardStats.monthlyBookings || 0}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-green-500'><TrendingUp size={16} /></p>
              <p className='text-green-500 text-xs'>+8%</p>
            </div>
          </div>
        </div>

        <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-3 px-4'>
          <div className='flex gap-x-4 items-center'>
            <div className="flex-1 min-w-0">
              <p className='text-sm text-gray-600'>Rating</p>
              <p className='font-semibold text-xl lg:text-3xl'>{dashboardStats.averageRating || 0}/5</p>
            </div>
            <div className="flex flex-col items-center">
              <p className='text-blue-500'><MessageSquareMore size={16} /></p>
              <p className='text-blue-500 text-xs'>{dashboardStats.totalReviews || 0} reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Responsive Tab Navigation */}
      <div className='bg-gray-100 w-full sm:w-[340px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm transition-colors ${activeButton === 'recent'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('recent')}
          >
            Recent Bookings
          </button>
          <button
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm transition-colors ${activeButton === 'today'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('today')}
          >
            Today Schedule
          </button>
        </div>
      </div>

      {/* Mobile-Responsive Quick Action Cards */}
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4'>
          <h3 className='font-semibold text-lg lg:text-xl'>Quick Actions</h3>
          <button 
            onClick={loadDashboardData}
            className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors text-sm"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        
        {/* Mobile-responsive grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {dashboardStats.upcomingBookings?.slice(0, 4).map((booking, index) => {
            const colors = ['bg-orange-500', 'bg-green-400', 'bg-red-300', 'bg-blue-300'];
            const textColors = ['text-orange-700', 'text-green-700', 'text-red-700', 'text-blue-700'];
            
            return (
              <div key={booking.id} className={`border border-black rounded-md ${colors[index % colors.length]}`}>
                <div className='px-2'>
                  <div className={`border border-black bg-yellow-500 rounded-md text-[10px] px-2 py-1 w-fit ml-auto mt-2 font-medium ${getStatusColor(booking.status).split(' ')[1]}`}>
                    {booking.status}
                  </div>
                </div>
                <div className={`flex justify-center items-center py-5 ${colors[index % colors.length]} rounded-t-md`}>
                  <User size={40} className={textColors[index % textColors.length]} />
                </div>
                <div className='p-3 bg-white rounded-b-md'>
                  <div className='flex justify-between items-center mb-2'>
                    <p className='font-semibold text-sm'>Booking Details</p>
                    <Ellipsis size={16}/>
                  </div>
                  <div className="space-y-1">
                    <p className='text-xs text-gray-600'>{formatDate(booking.startTime)} {formatTime(booking.startTime)}</p>
                    <p className='text-xs text-gray-600 truncate'>{booking.Facility?.name || 'No facility'}</p>
                    <p className='text-xs text-gray-600 truncate'>{booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}</p>
                    <p className='text-sm font-medium text-gray-900'>{formatCurrency(booking.totalAmount)}</p>
                  </div>
                </div>
              </div>
            );
          })}
          
          {(!dashboardStats.upcomingBookings || dashboardStats.upcomingBookings.length === 0) && (
            <div className="col-span-full text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No upcoming bookings</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile-Responsive Bookings Table Section */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 mt-4 gap-4'>
        <p className='font-semibold text-lg lg:text-xl'>
          {activeButton === 'recent' ? 'Recent Bookings' : "Today's Schedule"}
        </p>
        <p className='text-[#946BEF] cursor-pointer text-sm'>View all</p>
      </div>

      {/* Mobile-responsive table container */}
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
        <div className="min-w-[600px] lg:min-w-full">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Date
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Client
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden sm:table-cell">
                  Facility
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Time
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Amount
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeButton === 'recent' ? recentBookings : todaySchedule).length > 0 ? (
                (activeButton === 'recent' ? recentBookings : todaySchedule).map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-gray-400" />
                        <span className="text-xs lg:text-sm">{formatDate(booking.startTime)}</span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-gray-400" />
                        <span className="text-xs lg:text-sm truncate max-w-[100px] lg:max-w-none">
                          {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-gray-400" />
                        <span className="text-xs lg:text-sm truncate max-w-[120px]">
                          {booking.Facility?.name || 'No facility'}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        <span className="text-xs lg:text-sm">{formatTime(booking.startTime)}</span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <DollarSign size={14} className="mr-2 text-gray-400" />
                        <span className="text-xs lg:text-sm font-medium">{formatCurrency(booking.totalAmount)}</span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Calendar size={48} className="text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No {activeButton === 'recent' ? 'recent bookings' : 'schedule for today'}
                      </h3>
                      <p className="text-gray-500 text-center px-4">
                        {activeButton === 'recent' 
                          ? 'Bookings will appear here once clients start booking sessions' 
                          : 'Your schedule for today is clear'
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
    </div>
  );
};

export default Dashboard;