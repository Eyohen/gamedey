//pages/Bookings.jsx 
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  User,
  Eye
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import stadium1 from '../assets/stadium1.png'
import stadium2 from '../assets/stadium2.png'
import stadium3 from '../assets/stadium3.png'
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('today');
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    facility: 0,
    coach: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view bookings');
        setLoading(false);
        return;
      }
      
      let params = {};
      
      if (activeButton === 'today') {
        const today = new Date().toISOString().split('T')[0];
        params.date = today;
      } else if (activeButton === 'upcoming') {
        params.status = 'confirmed';
      }
      
      const response = await axios.get(`${URL}/users/bookings`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setBookings(response.data.data);
        
        // Calculate stats
        const totalBookings = response.data.data.length;
        const facilityBookings = response.data.data.filter(b => 
          b.bookingType === 'facility' || b.bookingType === 'both'
        ).length;
        const coachBookings = response.data.data.filter(b => 
          b.bookingType === 'coach' || b.bookingType === 'both'
        ).length;
        
        setStats({
          total: totalBookings,
          facility: facilityBookings,
          coach: coachBookings
        });
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [activeButton]);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <div className="max-w-[1125px]">
        {/* Stats Cards */}
        <div className='flex gap-x-6 pb-6'>
          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-4 px-6 min-w-[200px]'>
            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm text-gray-600'>Total Bookings</p>
                <p className='font-semibold text-3xl'>{stats.total}</p>
              </div>
              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500 text-sm'>Active</p>
              </div>
            </div>
          </div>

          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-4 px-6 min-w-[200px]'>
            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm text-gray-600'>Facility Bookings</p>
                <p className='font-semibold text-3xl'>{stats.facility}</p>
              </div>
              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500 text-sm'>Active</p>
              </div>
            </div>
          </div>

          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-4 px-6 min-w-[200px]'>
            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm text-gray-600'>Coach Bookings</p>
                <p className='font-semibold text-3xl'>{stats.coach}</p>
              </div>
              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500 text-sm'>Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
          <div className='flex'>
            <button
              className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'today'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setActiveButton('today')}
            >
              Today's Schedule
            </button>
            <button
              className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'upcoming'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setActiveButton('upcoming')}
            >
              Upcoming Schedule
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div>
          {bookings.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {bookings.map((booking) => (
                <div key={booking.id} className='border border-black rounded-xl p-4 hover:shadow-lg transition-shadow'>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">#{booking.id.slice(-6)}</span>
                  </div>

                  {/* Facility/Coach Info */}
                  {booking.Facility && (
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg">{booking.Facility.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{booking.Facility.address?.split(',')[0] || 'Lagos'}</span>
                      </div>
                    </div>
                  )}

                  {booking.Coach && (
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg">
                        Coach {booking.Coach.User?.firstName} {booking.Coach.User?.lastName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <User size={14} className="mr-1" />
                        <span>Personal Training Session</span>
                      </div>
                    </div>
                  )}

                  {/* Date and Time */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(booking.startTime)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-1" />
                      <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                    </div>
                  </div>

                  {/* Amount and Action */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#7042D2]">₦{booking.totalAmount}</span>
                    <button 
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium hover:underline flex items-center"
                      onClick={() => navigate(`/booking-details/${booking.id}`)}
                    >
                      <Eye size={14} className="mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {activeButton === 'today' 
                  ? "You don't have any bookings scheduled for today." 
                  : "You don't have any upcoming bookings."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;