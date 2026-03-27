import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, MapPin, User as UserIcon, DollarSign, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import ChatBox from '../../components/ChatBox';
import { getConversationByBookingId } from '../../services/chatService';

const CoachBookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      // Fetch from coach bookings endpoint and find the specific one
      const response = await axios.get(`${URL}/coaches/profile/bookings?limit=100`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        const found = response.data.data.find(b => b.id === bookingId);
        if (found) {
          setBooking(found);
        } else {
          setError('Booking not found');
        }
      }
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChat = async () => {
    if (!booking || booking.status !== 'confirmed') {
      alert('Chat is only available for confirmed bookings');
      return;
    }
    try {
      setLoadingChat(true);
      const response = await getConversationByBookingId(booking.id, 'coach');
      setActiveConversation(response.data.conversation);
      setShowChat(true);
    } catch (err) {
      console.error('Error loading conversation:', err);
      alert(err.response?.status === 404
        ? 'Chat room not found. The conversation may not have been created yet.'
        : 'Failed to load chat. Please try again.');
    } finally {
      setLoadingChat(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      timeZone: 'Africa/Lagos'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true,
      timeZone: 'Africa/Lagos'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/coach/bookings')} className="flex items-center text-gray-600 mb-4 text-sm">
          <ChevronLeft size={18} className="mr-1" /> Back to Bookings
        </button>
        <div className="text-center py-12">
          <p className="text-gray-500">{error || 'Booking not found'}</p>
        </div>
      </div>
    );
  }

  const durationHours = Math.round((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      {/* Header */}
      <button onClick={() => navigate('/coach/bookings')} className="flex items-center text-gray-600 mb-4 text-sm">
        <ChevronLeft size={18} className="mr-1" /> Back to Bookings
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Booking Details</h1>
          <p className="text-sm text-gray-500">#{booking.id.slice(-8).toUpperCase()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      {/* Player Info */}
      <div className="bg-white rounded-2xl border border-black border-r-[6px] border-b-[4px] p-5 sm:p-6 mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Player</h2>
        <div className="flex items-center gap-4">
          {booking.User?.profileImage ? (
            <img src={booking.User.profileImage} alt="" className="w-14 h-14 rounded-full object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#946BEF] flex items-center justify-center text-white font-semibold text-lg">
              {booking.User?.firstName?.[0]}{booking.User?.lastName?.[0]}
            </div>
          )}
          <div>
            <p className="font-semibold text-base">{booking.User?.firstName} {booking.User?.lastName}</p>
            <p className="text-sm text-gray-500">{booking.User?.phone || 'No phone'}</p>
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="bg-white rounded-2xl border border-black border-r-[6px] border-b-[4px] p-5 sm:p-6 mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Session Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {booking.Sport && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">{booking.Sport.icon || '⚽'}</span>
              <div>
                <p className="text-xs text-gray-400">Sport</p>
                <p className="font-medium">{booking.Sport.name}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Date</p>
              <p className="font-medium">{formatDate(booking.startTime)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Time</p>
              <p className="font-medium">{formatTime(booking.startTime)} — {formatTime(booking.endTime)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Duration</p>
              <p className="font-medium">{durationHours} hour{durationHours !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Info */}
      {booking.Facility && (
        <div className="bg-white rounded-2xl border border-black border-r-[6px] border-b-[4px] p-5 sm:p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Facility</h2>
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-gray-400" />
            <div>
              <p className="font-medium">{booking.Facility.name}</p>
              <p className="text-sm text-gray-500">{booking.Facility.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Payment */}
      <div className="bg-white rounded-2xl border border-black border-r-[6px] border-b-[4px] p-5 sm:p-6 mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Your Earnings</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign size={20} className="text-green-500" />
            <div>
              <p className="text-xs text-gray-400">Coach Amount</p>
              <p className="text-2xl font-bold text-green-600">₦{parseFloat(booking.coachAmount || booking.totalAmount).toLocaleString()}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {booking.paymentStatus || 'pending'}
          </span>
        </div>
      </div>

      {/* Chat Button */}
      {booking.status === 'confirmed' && (
        <button
          onClick={handleOpenChat}
          disabled={loadingChat}
          className="w-full bg-[#946BEF] text-white py-3 rounded-xl font-semibold hover:bg-[#7042D2] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} />
          {loadingChat ? 'Loading Chat...' : 'Chat with Player'}
        </button>
      )}

      {/* Chat Modal */}
      {showChat && activeConversation && (
        <ChatBox
          conversation={activeConversation}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default CoachBookingDetails;
