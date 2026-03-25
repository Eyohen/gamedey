import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  Star,
  Award,
  Home,
  Phone
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import topcoaches from '../../assets/topcoaches.png';

const HomeSession = () => {
  const { sportId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [sport, setSport] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch sport details (includes homeSessionPrice)
        const sportRes = await axios.get(`${URL}/sports/${sportId}`);
        if (sportRes.data.success) {
          setSport(sportRes.data.data);
        }

        // Fetch coaches for this sport
        const providersRes = await axios.get(`${URL}/sports/${sportId}/providers`);
        if (providersRes.data.success) {
          setCoaches(providersRes.data.data.coaches || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load home session details');
      } finally {
        setLoading(false);
      }
    };

    if (sportId) {
      fetchData();
    }
  }, [sportId]);

  const handleBookCoach = (coachId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/choose-coach/${coachId}`, { state: { sportId, bookingType: 'home_session' } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (!sport) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Sport not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <button onClick={() => navigate(`/sport/${sportId}/home-session`)} className="flex items-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          <ChevronLeft size={18} className="sm:w-5 sm:h-5 mr-1" />
          Back
        </button>

        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl sm:text-4xl flex-shrink-0">
            <Home size={24} className="sm:w-8 sm:h-8 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Home Session - {sport.name}</h1>
            <p className="text-sm sm:text-base text-gray-600">Book a coach to train you at your location</p>
          </div>
        </div>
      </div>

      {/* Coaches List */}
      {coaches.length === 0 ? (
        <div className="text-center py-12">
          <Award size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No coaches available for this sport yet</p>
          <p className="text-gray-400 text-sm mt-1">Check back later for available trainers</p>
        </div>
      ) : (
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Available Coaches ({coaches.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coaches.map((coach) => (
              <div key={coach.id} className="border border-black rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={coach.profileImage || coach.User?.profileImage || topcoaches}
                  alt="Coach"
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-1">
                    {coach.User?.firstName} {coach.User?.lastName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{coach.bio}</p>

                  {/* Location */}
                  {(coach.state || coach.location?.address) && (
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{coach.location?.address || coach.state || 'Nigeria'}</span>
                    </div>
                  )}

                  {/* Experience & Rating */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 mb-3">
                    {coach.experience > 0 && (
                      <div className="flex items-center">
                        <Award size={14} className="mr-1" />
                        {coach.experience} yrs exp
                      </div>
                    )}
                    <div className="flex items-center">
                      <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                      {coach.averageRating || '0.0'}
                    </div>
                  </div>

                  {/* Price & Book Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-green-600 text-sm sm:text-base">
                      ₦{parseFloat(coach.homeSessionRate || coach.hourlyRate || 0).toLocaleString()}/session
                    </span>
                    <button
                      onClick={() => handleBookCoach(coach.id)}
                      className="bg-[#7042D2] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#5e35b1] transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSession;
