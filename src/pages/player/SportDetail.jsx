import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Building2, User as UserIcon, Home } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';

const SportDetail = () => {
  const { sportId } = useParams();
  const navigate = useNavigate();

  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSport = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${URL}/sports/${sportId}`);
        if (res.data.success) {
          setSport(res.data.data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load sport details');
      } finally {
        setLoading(false);
      }
    };

    if (sportId) fetchSport();
  }, [sportId]);

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
      <div className="mb-6 sm:mb-8">
        <button onClick={() => navigate('/explore')} className="flex items-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          <ChevronLeft size={18} className="sm:w-5 sm:h-5 mr-1" />
          Back to Sports
        </button>

        <div className="flex items-center gap-2 sm:gap-4 mb-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl sm:text-4xl flex-shrink-0">
            {sport.icon || '⚽'}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate sm:whitespace-normal">{sport.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-none">{sport.description}</p>
          </div>
        </div>
      </div>

      {/* Session Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl">
        {/* Facility & Coach Session */}
        <div
          onClick={() => navigate(`/sport/${sportId}/facility-session`)}
          className="cursor-pointer bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white hover:shadow-xl transition-all hover:scale-[1.02] border border-black border-r-[6px] border-b-[4px]"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center -ml-3">
              <UserIcon size={22} className="text-white" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Facility & Coach Session</h2>
          <p className="text-sm sm:text-base opacity-90">Book a facility and coach together — play at a stadium or sports center</p>
        </div>

        {/* Home Session */}
        <div
          onClick={() => navigate(`/sport/${sportId}/home-session`)}
          className="cursor-pointer bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white hover:shadow-xl transition-all hover:scale-[1.02] border border-black border-r-[6px] border-b-[4px]"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Home size={22} className="text-white" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Home Session</h2>
          <p className="text-sm sm:text-base opacity-90">Get a personal coach to train you at your preferred location</p>
        </div>
      </div>
    </div>
  );
};

export default SportDetail;
