import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Package } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';

const FacilitySessionOptions = () => {
  const { sportId } = useParams();
  const navigate = useNavigate();

  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSport = async () => {
      try {
        const res = await axios.get(`${URL}/sports/${sportId}`);
        if (res.data.success) setSport(res.data.data);
      } catch (err) {
        console.error('Error:', err);
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button onClick={() => navigate(`/sport/${sportId}`)} className="flex items-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          <ChevronLeft size={18} className="sm:w-5 sm:h-5 mr-1" />
          Back to {sport?.name || 'Sport'}
        </button>

        <div className="flex items-center gap-2 sm:gap-4 mb-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl sm:text-4xl flex-shrink-0">
            {sport?.icon || '⚽'}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Facility & Coach Session</h1>
            <p className="text-sm sm:text-base text-gray-600">{sport?.name} — Choose your session type</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl">
        {/* Individual Session */}
        <div
          onClick={() => navigate(`/book-session/${sportId}`)}
          className="cursor-pointer bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all hover:scale-[1.02] border border-black border-r-[6px] border-b-[4px]"
        >
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={24} className="text-purple-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Individual Session</h2>
          <p className="text-sm sm:text-base text-gray-600">Book a single session — pick your facility, coach, date & time</p>
        </div>

        {/* Session Packages */}
        <div
          onClick={() => navigate(`/sport/${sportId}/facility-packages`)}
          className="cursor-pointer bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all hover:scale-[1.02] border border-black border-r-[6px] border-b-[4px]"
        >
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Package size={24} className="text-blue-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Session Packages</h2>
          <p className="text-sm sm:text-base text-gray-600">Save more with bundled sessions — multiple sessions at a discounted price</p>
        </div>
      </div>
    </div>
  );
};

export default FacilitySessionOptions;
