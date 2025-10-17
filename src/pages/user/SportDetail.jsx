// src/pages/SportDetail.jsx - SIMPLE VERSION
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Award,
  Users,
  Trophy,
  ChevronLeft,
  Tag,
  Building2,
  User as UserIcon
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import stadium1 from '../../assets/stadium1.png';
import topcoaches from '../../assets/topcoaches.png';

const SportDetail = () => {
  const { sportId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [sport, setSport] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch sport
        const sportRes = await axios.get(`${URL}/sports/${sportId}`);
        if (sportRes.data.success) {
          setSport(sportRes.data.data);
        }

        // Fetch providers
        const providersRes = await axios.get(`${URL}/sports/${sportId}/providers`);
        if (providersRes.data.success) {
          setFacilities(providersRes.data.data.facilities || []);
          setCoaches(providersRes.data.data.coaches || []);
        }

        // Fetch packages
        const packagesRes = await axios.get(`${URL}/sports/${sportId}/packages`);
        if (packagesRes.data.success) {
          setPackages(packagesRes.data.data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load sport details');
      } finally {
        setLoading(false);
      }
    };

    if (sportId) {
      fetchData();
    }
  }, [sportId]);

  const handleBookSession = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/book-session/${sportId}`);
  };

  const handleBookNow = (type, id) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (type === 'facility') {
      navigate(`/choose-facility/${id}`, { state: { sportId } });
    } else {
      navigate(`/choose-coach/${id}`, { state: { sportId } });
    }
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

  // Filter data based on tab
  const displayFacilities = activeTab === 'all' || activeTab === 'facilities' ? facilities : [];
  const displayCoaches = activeTab === 'all' || activeTab === 'coaches' ? coaches : [];
  const displayPackages = activeTab === 'all' || activeTab === 'packages' ? packages : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Header - Mobile Responsive */}
      <div className="mb-4 sm:mb-6">
        <button onClick={() => navigate('/explore')} className="flex items-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          <ChevronLeft size={18} className="sm:w-5 sm:h-5 mr-1" />
          Back to Sports
        </button>

        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl sm:text-4xl flex-shrink-0">
            {sport.icon || '⚽'}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate sm:whitespace-normal">{sport.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-none">{sport.description}</p>
          </div>
        </div>

        {/* Main CTA - Book Complete Session - Mobile Responsive */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Book Your Complete Session</h2>
          <p className="mb-3 sm:mb-4 opacity-90 text-sm sm:text-base">Get a facility and coach together - pay once for everything!</p>
          <button
            onClick={handleBookSession}
            className="bg-white text-purple-600 px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-1.5 sm:gap-2"
          >
            <Building2 size={16} className="sm:w-5 sm:h-5" />
            <span>+</span>
            <UserIcon size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Book Session Now</span>
            <span className="sm:hidden">Book Now</span>
          </button>
        </div>
      </div>

      {/* Tabs - Mobile Responsive with Scroll */}
      <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm whitespace-nowrap ${activeTab === 'all' ? 'bg-white' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm whitespace-nowrap ${activeTab === 'packages' ? 'bg-white' : ''}`}
          >
            Packages ({packages.length})
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm whitespace-nowrap ${activeTab === 'facilities' ? 'bg-white' : ''}`}
          >
            Facilities ({facilities.length})
          </button>
          <button
            onClick={() => setActiveTab('coaches')}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm whitespace-nowrap ${activeTab === 'coaches' ? 'bg-white' : ''}`}
          >
            Coaches ({coaches.length})
          </button>
        </div>
      </div>

      {/* Packages - Mobile Responsive */}
      {displayPackages.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Session Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayPackages.map((pkg) => (
              <div key={pkg.id} className="border border-black rounded-xl p-4 sm:p-6">
                <h3 className="font-semibold text-base sm:text-lg mb-2">{pkg.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{pkg.description}</p>
                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
                  ₦{parseFloat(pkg.totalPrice).toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{pkg.numberOfSessions} Sessions</p>
                <button className="w-full bg-purple-600 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors">
                  Book Package
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facilities - Mobile Responsive */}
      {displayFacilities.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Facilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayFacilities.map((facility) => (
              <div key={facility.id} className="border border-black rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img src={facility.images?.[0] || stadium1} alt={facility.name} className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{facility.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{facility.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-600 text-sm sm:text-base">₦{parseFloat(facility.pricePerHour).toLocaleString()}/hr</span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <MapPin size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
                      <Star size={12} className="sm:w-3.5 sm:h-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                      {facility.averageRating || '4.5'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coaches - Mobile Responsive */}
      {displayCoaches.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Coaches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayCoaches.map((coach) => (
              <div key={coach.id} className="border border-black rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img src={coach.User?.profileImage || topcoaches} alt="Coach" className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    {coach.User?.firstName} {coach.User?.lastName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{coach.bio}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-600 text-sm sm:text-base">₦{parseFloat(coach.hourlyRate).toLocaleString()}/hr</span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Award size={12} className="sm:w-3.5 sm:h-3.5 mr-1" />
                      <Star size={12} className="sm:w-3.5 sm:h-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                      {coach.averageRating || '4.8'}
                    </div>
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

export default SportDetail;