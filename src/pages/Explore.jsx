// src/pages/Explore.jsx
// MOBILE RESPONSIVE VERSION - Explore Page with Facilities and Coaches
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  MapPin,
  Star,
  Clock
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import stadium1 from '../assets/stadium1.png';
import stadium2 from '../assets/stadium2.png';
import stadium3 from '../assets/stadium3.png';
import topcoaches from '../assets/topcoaches.png';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch facilities
  const fetchFacilities = async () => {
    try {
      const response = await axios.get(`${URL}/facilities`, {
        params: { limit: 4 }
      });
      
      if (response.data.success) {
        setFacilities(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching facilities:', err);
      setError('Failed to fetch facilities');
    }
  };

  // Fetch coaches
  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${URL}/coaches`, {
        params: { limit: 4 }
      });
      
      if (response.data.success) {
        setCoaches(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching coaches:', err);
      setError('Failed to fetch coaches');
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchFacilities(), fetchCoaches()]);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle facility booking
  const handleFacilityBooking = (facilityId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/choose-facility/${facilityId}`);
  };

  // Handle coach booking
  const handleCoachBooking = (coachId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/choose-coach/${coachId}`);
  };

  // Format operating hours
  const formatOperatingHours = (operatingHours) => {
    if (!operatingHours || typeof operatingHours !== 'object') {
      return 'Mon-Sun: 6am-10pm';
    }
    
    const today = new Date().getDay();
    const todayHours = operatingHours[today];
    
    if (todayHours) {
      return `Today: ${todayHours.open}:00-${todayHours.close}:00`;
    }
    
    return 'Mon-Sun: 6am-10pm';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-24">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* TOP FACILITIES SECTION */}
      <div className="flex justify-between py-3 mb-4">
        <p className="font-medium text-lg sm:text-xl md:text-2xl">Top Facilities</p>
        <button 
          onClick={() => navigate('/facilities')}
          className="text-[#946BEF] font-medium cursor-pointer hover:underline text-sm sm:text-base"
        >
          View All
        </button>
      </div>
      
      {/* Facilities Grid - Mobile Responsive */}
      <div className="mb-8 sm:mb-12">
        {/* Mobile: Horizontal Scroll */}
        <div className="block md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {facilities.length > 0 ? (
              facilities.map((facility) => (
                <div 
                  key={facility.id} 
                  className="flex-none w-72 border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleFacilityBooking(facility.id)}
                >
                  <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
                    {facility.images && facility.images.length > 0 ? (
                      <img 
                        src={facility.images[0]} 
                        alt={facility.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={stadium1} alt={facility.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  <div className="px-3 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-lg truncate">{facility.name}</p>
                      <div className="flex items-center text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm ml-1">{facility.averageRating || '4.5'}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {facility.description || 'A vibrant facility buzzing with energy, perfect for sports activities.'}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>{formatOperatingHours(facility.operatingHours)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span className="truncate">{facility.address?.slice(0, 12) || 'Lagos'}...</span>
                      </div>
                      <span className="text-[#7042D2] font-semibold">
                        ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Mobile Placeholder cards when no data
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-none w-72 border border-black rounded-xl">
                  <img src={[stadium1, stadium2, stadium3][index % 3]} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample facility ${index + 1}`} />
                  <div className="px-3 py-4">
                    <p className="font-semibold py-2">Sample Facility {index + 1}</p>
                    <p className="text-gray-500 text-sm mb-3">A vibrant facility buzzing with energy, perfect for sports activities.</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>Mon-Sun: 6am-10pm</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span>Lagos</span>
                      </div>
                      <span className="text-[#7042D2] font-semibold">₦5,000/hr</span>
                    </div>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
                    >
                      Choose Facility
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {facilities.length > 0 ? (
              facilities.map((facility) => (
                <div 
                  key={facility.id} 
                  className="border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleFacilityBooking(facility.id)}
                >
                  <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
                    {facility.images && facility.images.length > 0 ? (
                      <img 
                        src={facility.images[0]} 
                        alt={facility.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={stadium1} alt={facility.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  <div className="px-3 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-lg truncate">{facility.name}</p>
                      <div className="flex items-center text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm ml-1">{facility.averageRating || '4.5'}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {facility.description || 'A vibrant facility buzzing with energy, perfect for sports activities.'}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>{formatOperatingHours(facility.operatingHours)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span className="truncate">{facility.address?.slice(0, 12) || 'Lagos'}...</span>
                      </div>
                      <span className="text-[#7042D2] font-semibold">
                        ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Desktop Placeholder cards when no data
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border border-black rounded-xl">
                  <img src={[stadium1, stadium2, stadium3][index % 3]} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample facility ${index + 1}`} />
                  <div className="px-3 py-4">
                    <p className="font-semibold py-2">Sample Facility {index + 1}</p>
                    <p className="text-gray-500 text-sm mb-3">A vibrant facility buzzing with energy, perfect for sports activities.</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>Mon-Sun: 6am-10pm</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span>Lagos</span>
                      </div>
                      <span className="text-[#7042D2] font-semibold">₦5,000/hr</span>
                    </div>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
                    >
                      Choose Facility
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* TOP COACHES SECTION */}
      <div className="flex justify-between py-3 mt-12 sm:mt-16 mb-4">
        <p className="font-medium text-lg sm:text-xl md:text-2xl">Top Coaches</p>
        <button 
          onClick={() => navigate('/coaches')}
          className="text-[#946BEF] font-medium cursor-pointer hover:underline text-sm sm:text-base"
        >
          View All
        </button>
      </div>
      
      {/* Coaches Grid - Mobile Responsive */}
      <div>
        {/* Mobile: Horizontal Scroll */}
        <div className="block md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {coaches.length > 0 ? (
              coaches.map((coach) => (
                <div 
                  key={coach.id} 
                  className="flex-none w-72 border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCoachBooking(coach.id)}
                >
                  <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
                    {coach.User?.profileImage ? (
                      <img 
                        src={coach.User.profileImage} 
                        alt={`${coach.User.firstName} ${coach.User.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={topcoaches} alt="Coach" className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  <div className="px-3 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-lg truncate">
                        {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
                      </p>
                      <div className="flex items-center text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm ml-1">{coach.averageRating || '4.8'}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {coach.bio || 'Experienced coach dedicated to helping athletes reach their potential.'}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {coach.experience || 5}+ years exp.
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="text-[#7042D2] font-semibold">
                        ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Mobile Placeholder cards when no data
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-none w-72 border border-black rounded-xl">
                  <img src={topcoaches} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample coach ${index + 1}`} />
                  <div className="px-3 py-4">
                    <p className="font-semibold py-2">Sample Coach {index + 1}</p>
                    <p className="text-gray-500 text-sm mb-3">Experienced coach dedicated to helping athletes reach their potential.</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">5+ years exp.</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="text-[#7042D2] font-semibold">₦3,000/hr</span>
                    </div>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
                    >
                      Choose Coach
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {coaches.length > 0 ? (
              coaches.map((coach) => (
                <div 
                  key={coach.id} 
                  className="border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCoachBooking(coach.id)}
                >
                  <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
                    {coach.User?.profileImage ? (
                      <img 
                        src={coach.User.profileImage} 
                        alt={`${coach.User.firstName} ${coach.User.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={topcoaches} alt="Coach" className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  <div className="px-3 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-lg truncate">
                        {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
                      </p>
                      <div className="flex items-center text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm ml-1">{coach.averageRating || '4.8'}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {coach.bio || 'Experienced coach dedicated to helping athletes reach their potential.'}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {coach.experience || 5}+ years exp.
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="text-[#7042D2] font-semibold">
                        ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Desktop Placeholder cards when no data
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border border-black rounded-xl">
                  <img src={topcoaches} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample coach ${index + 1}`} />
                  <div className="px-3 py-4">
                    <p className="font-semibold py-2">Sample Coach {index + 1}</p>
                    <p className="text-gray-500 text-sm mb-3">Experienced coach dedicated to helping athletes reach their potential.</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">5+ years exp.</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="text-[#7042D2] font-semibold">₦3,000/hr</span>
                    </div>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
                    >
                      Choose Coach
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;