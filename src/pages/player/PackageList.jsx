import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Package } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';

const PackageList = () => {
  const { sportId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isHome = location.pathname.includes('home-packages');
  const sessionType = isHome ? 'home' : 'facility';

  const [sport, setSport] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const [sportRes, pkgRes] = await Promise.all([
          axios.get(`${URL}/sports/${sportId}`),
          axios.get(`${URL}/sports/${sportId}/packages?sessionType=${sessionType}`)
        ]);

        if (sportRes.data.success) setSport(sportRes.data.data);
        if (pkgRes.data.success) setPackages(pkgRes.data.data || []);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };

    if (sportId) fetchData();
  }, [sportId, sessionType]);

  const backPath = isHome
    ? `/sport/${sportId}/home-session`
    : `/sport/${sportId}/facility-session`;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
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
        <button onClick={() => navigate(backPath)} className="flex items-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          <ChevronLeft size={18} className="sm:w-5 sm:h-5 mr-1" />
          Back
        </button>

        <div className="flex items-center gap-2 sm:gap-4 mb-2">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 ${isHome ? 'bg-green-100' : 'bg-purple-100'} rounded-full flex items-center justify-center text-2xl sm:text-4xl flex-shrink-0`}>
            {sport?.icon || '⚽'}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              {isHome ? 'Home Session' : 'Facility & Coach'} Packages
            </h1>
            <p className="text-sm sm:text-base text-gray-600">{sport?.name} — Bundled session packages</p>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      {packages.length === 0 ? (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No packages available yet</p>
          <p className="text-gray-400 text-sm mt-1">Check back later for session packages</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="border border-black border-r-[6px] border-b-[4px] rounded-xl p-4 sm:p-6 bg-white">
              <h3 className="font-semibold text-base sm:text-lg mb-2">{pkg.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{pkg.description}</p>

              <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
                ₦{parseFloat(pkg.totalPrice).toLocaleString()}
              </div>
              {pkg.discount > 0 && (
                <p className="text-xs text-green-600 font-medium mb-2">{pkg.discount}% discount applied</p>
              )}
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{pkg.numberOfSessions} Sessions</p>
              <p className="text-xs text-gray-400 mb-4">₦{parseFloat(pkg.pricePerSession).toLocaleString()} per session</p>

              {/* Coach & Facility info if available */}
              {pkg.Coach && (
                <p className="text-xs text-gray-500 mb-1">
                  Coach: {pkg.Coach.User?.firstName} {pkg.Coach.User?.lastName}
                </p>
              )}
              {pkg.Facility && (
                <p className="text-xs text-gray-500 mb-3">
                  Facility: {pkg.Facility.name}
                </p>
              )}

              <button
                onClick={() => {
                  if (!user) { navigate('/login'); return; }
                  navigate(`/book-package/${pkg.id}`, { state: { sportId } });
                }}
                className={`w-full text-white py-2.5 text-sm sm:text-base rounded-lg transition-colors font-medium ${
                  isHome
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                Book Package
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageList;
