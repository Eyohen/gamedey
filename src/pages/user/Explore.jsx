// // src/pages/Explore.jsx
// // Explore Page with Facilities and Coaches
// import React, { useState, useEffect } from 'react';
// import {
//   Search,
//   Filter,
//   Eye,
//   MapPin,
//   Star,
//   Clock
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';
// import stadium1 from '../../assets/stadium1.png';
// import stadium2 from '../../assets/stadium2.png';
// import stadium3 from '../../assets/stadium3.png';
// import topcoaches from '../../assets/topcoaches.png';
// import { useNavigate } from 'react-router-dom';

// const Explore = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [facilities, setFacilities] = useState([]);
//   const [coaches, setCoaches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch facilities
//   const fetchFacilities = async () => {
//     try {
//       const response = await axios.get(`${URL}/facilities`, {
//         params: { limit: 4 }
//       });
      
//       if (response.data.success) {
//         setFacilities(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching facilities:', err);
//       setError('Failed to fetch facilities');
//     }
//   };

//   // Fetch coaches
//   const fetchCoaches = async () => {
//     try {
//       const response = await axios.get(`${URL}/coaches`, {
//         params: { limit: 4 }
//       });
      
//       if (response.data.success) {
//         setCoaches(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching coaches:', err);
//       setError('Failed to fetch coaches');
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         await Promise.all([fetchFacilities(), fetchCoaches()]);
//       } catch (err) {
//         console.error('Error loading data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   // Handle facility booking
//   const handleFacilityBooking = (facilityId) => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     navigate(`/choose-facility/${facilityId}`);
//   };

//   // Handle coach booking
//   const handleCoachBooking = (coachId) => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     navigate(`/choose-coach/${coachId}`);
//   };

//   // Format operating hours
//   const formatOperatingHours = (operatingHours) => {
//     if (!operatingHours || typeof operatingHours !== 'object') {
//       return 'Mon-Sun: 6am-10pm';
//     }
    
//     const today = new Date().getDay();
//     const todayHours = operatingHours[today];
    
//     if (todayHours) {
//       return `Today: ${todayHours.open}:00-${todayHours.close}:00`;
//     }
    
//     return 'Mon-Sun: 6am-10pm';
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 sm:px-6 lg:px-24">
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {/* TOP FACILITIES SECTION */}
//       <div className="flex justify-between py-3 mb-4">
//         <p className="font-medium text-lg sm:text-xl md:text-2xl">Top Facilities</p>
//         <button 
//           onClick={() => navigate('/facilities')}
//           className="text-[#946BEF] font-medium cursor-pointer hover:underline text-sm sm:text-base"
//         >
//           View All
//         </button>
//       </div>
      
//       {/* Facilities Grid - Mobile Responsive */}
//       <div className="mb-8 sm:mb-12">
//         {/* Mobile: Horizontal Scroll */}
//         <div className="block md:hidden">
//           <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
//             {facilities.length > 0 ? (
//               facilities.map((facility) => (
//                 <div 
//                   key={facility.id} 
//                   className="flex-none w-72 border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
//                   onClick={() => handleFacilityBooking(facility.id)}
//                 >
//                   <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
//                     {facility.images && facility.images.length > 0 ? (
//                       <img 
//                         src={facility.images[0]} 
//                         alt={facility.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <img src={stadium1} alt={facility.name} className="w-full h-full object-cover" />
//                     )}
//                   </div>
                  
//                   <div className="px-3 py-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="font-semibold text-lg truncate">{facility.name}</p>
//                       <div className="flex items-center text-yellow-500">
//                         <Star size={16} fill="currentColor" />
//                         <span className="text-sm ml-1">{facility.averageRating || '4.5'}</span>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-500 text-sm mb-3 line-clamp-2">
//                       {facility.description || 'A vibrant facility buzzing with energy, perfect for sports activities.'}
//                     </p>
                    
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <Clock size={14} className="mr-1" />
//                       <span>{formatOperatingHours(facility.operatingHours)}</span>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center text-sm text-gray-600">
//                         <MapPin size={14} className="mr-1" />
//                         <span className="truncate">{facility.address?.slice(0, 12) || 'Lagos'}...</span>
//                       </div>
//                       <span className="text-[#7042D2] font-semibold">
//                         ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               // Mobile Placeholder cards when no data
//               Array.from({ length: 4 }).map((_, index) => (
//                 <div key={index} className="flex-none w-72 border border-black rounded-xl">
//                   <img src={[stadium1, stadium2, stadium3][index % 3]} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample facility ${index + 1}`} />
//                   <div className="px-3 py-4">
//                     <p className="font-semibold py-2">Sample Facility {index + 1}</p>
//                     <p className="text-gray-500 text-sm mb-3">A vibrant facility buzzing with energy, perfect for sports activities.</p>
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <Clock size={14} className="mr-1" />
//                       <span>Mon-Sun: 6am-10pm</span>
//                     </div>
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center text-sm text-gray-600">
//                         <MapPin size={14} className="mr-1" />
//                         <span>Lagos</span>
//                       </div>
//                       <span className="text-[#7042D2] font-semibold">₦5,000/hr</span>
//                     </div>
//                     <button 
//                       onClick={() => navigate('/login')} 
//                       className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
//                     >
//                       Choose Facility
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Desktop: Grid Layout */}
//         <div className="hidden md:block">
//           <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
//             {facilities.length > 0 ? (
//               facilities.map((facility) => (
//                 <div 
//                   key={facility.id} 
//                   className="border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
//                   onClick={() => handleFacilityBooking(facility.id)}
//                 >
//                   <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
//                     {facility.images && facility.images.length > 0 ? (
//                       <img 
//                         src={facility.images[0]} 
//                         alt={facility.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <img src={stadium1} alt={facility.name} className="w-full h-full object-cover" />
//                     )}
//                   </div>
                  
//                   <div className="px-3 py-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="font-semibold text-lg truncate">{facility.name}</p>
//                       <div className="flex items-center text-yellow-500">
//                         <Star size={16} fill="currentColor" />
//                         <span className="text-sm ml-1">{facility.averageRating || '4.5'}</span>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-500 text-sm mb-3 line-clamp-2">
//                       {facility.description || 'A vibrant facility buzzing with energy, perfect for sports activities.'}
//                     </p>
                    
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <Clock size={14} className="mr-1" />
//                       <span>{formatOperatingHours(facility.operatingHours)}</span>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center text-sm text-gray-600">
//                         <MapPin size={14} className="mr-1" />
//                         <span className="truncate">{facility.address?.slice(0, 12) || 'Lagos'}...</span>
//                       </div>
//                       <span className="text-[#7042D2] font-semibold">
//                         ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               // Desktop Placeholder cards when no data
//               Array.from({ length: 4 }).map((_, index) => (
//                 <div key={index} className="border border-black rounded-xl">
//                   <img src={[stadium1, stadium2, stadium3][index % 3]} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample facility ${index + 1}`} />
//                   <div className="px-3 py-4">
//                     <p className="font-semibold py-2">Sample Facility {index + 1}</p>
//                     <p className="text-gray-500 text-sm mb-3">A vibrant facility buzzing with energy, perfect for sports activities.</p>
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <Clock size={14} className="mr-1" />
//                       <span>Mon-Sun: 6am-10pm</span>
//                     </div>
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center text-sm text-gray-600">
//                         <MapPin size={14} className="mr-1" />
//                         <span>Lagos</span>
//                       </div>
//                       <span className="text-[#7042D2] font-semibold">₦5,000/hr</span>
//                     </div>
//                     <button 
//                       onClick={() => navigate('/login')} 
//                       className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
//                     >
//                       Choose Facility
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* TOP COACHES SECTION */}
//       <div className="flex justify-between py-3 mt-12 sm:mt-16 mb-4">
//         <p className="font-medium text-lg sm:text-xl md:text-2xl">Top Coaches</p>
//         <button 
//           onClick={() => navigate('/coaches')}
//           className="text-[#946BEF] font-medium cursor-pointer hover:underline text-sm sm:text-base"
//         >
//           View All
//         </button>
//       </div>
      
//       {/* Coaches Grid - Mobile Responsive */}
//       <div>
//         {/* Mobile: Horizontal Scroll */}
//         <div className="block md:hidden">
//           <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
//             {coaches.length > 0 ? (
//               coaches.map((coach) => (
//                 <div 
//                   key={coach.id} 
//                   className="flex-none w-72 border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
//                   onClick={() => handleCoachBooking(coach.id)}
//                 >
//                   <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
//                     {coach.User?.profileImage ? (
//                       <img 
//                         src={coach.User.profileImage} 
//                         alt={`${coach.User.firstName} ${coach.User.lastName}`}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <img src={topcoaches} alt="Coach" className="w-full h-full object-cover" />
//                     )}
//                   </div>
                  
//                   <div className="px-3 py-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="font-semibold text-lg truncate">
//                         {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
//                       </p>
//                       <div className="flex items-center text-yellow-500">
//                         <Star size={16} fill="currentColor" />
//                         <span className="text-sm ml-1">{coach.averageRating || '4.8'}</span>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-500 text-sm mb-3 line-clamp-2">
//                       {coach.bio || 'Experienced coach dedicated to helping athletes reach their potential.'}
//                     </p>
                    
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
//                         {coach.experience || 5}+ years exp.
//                       </span>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600">Available</span>
//                       <span className="text-[#7042D2] font-semibold">
//                         ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               // Mobile Placeholder cards when no data
//               Array.from({ length: 4 }).map((_, index) => (
//                 <div key={index} className="flex-none w-72 border border-black rounded-xl">
//                   <img src={topcoaches} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample coach ${index + 1}`} />
//                   <div className="px-3 py-4">
//                     <p className="font-semibold py-2">Sample Coach {index + 1}</p>
//                     <p className="text-gray-500 text-sm mb-3">Experienced coach dedicated to helping athletes reach their potential.</p>
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">5+ years exp.</span>
//                     </div>
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-sm text-gray-600">Available</span>
//                       <span className="text-[#7042D2] font-semibold">₦3,000/hr</span>
//                     </div>
//                     <button 
//                       onClick={() => navigate('/login')} 
//                       className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
//                     >
//                       Choose Coach
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Desktop: Grid Layout */}
//         <div className="hidden md:block">
//           <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
//             {coaches.length > 0 ? (
//               coaches.map((coach) => (
//                 <div 
//                   key={coach.id} 
//                   className="border border-black rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
//                   onClick={() => handleCoachBooking(coach.id)}
//                 >
//                   <div className="w-full h-40 bg-gray-200 rounded-t-xl overflow-hidden">
//                     {coach.User?.profileImage ? (
//                       <img 
//                         src={coach.User.profileImage} 
//                         alt={`${coach.User.firstName} ${coach.User.lastName}`}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <img src={topcoaches} alt="Coach" className="w-full h-full object-cover" />
//                     )}
//                   </div>
                  
//                   <div className="px-3 py-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="font-semibold text-lg truncate">
//                         {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
//                       </p>
//                       <div className="flex items-center text-yellow-500">
//                         <Star size={16} fill="currentColor" />
//                         <span className="text-sm ml-1">{coach.averageRating || '4.8'}</span>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-500 text-sm mb-3 line-clamp-2">
//                       {coach.bio || 'Experienced coach dedicated to helping athletes reach their potential.'}
//                     </p>
                    
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
//                         {coach.experience || 5}+ years exp.
//                       </span>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600">Available</span>
//                       <span className="text-[#7042D2] font-semibold">
//                         ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               // Desktop Placeholder cards when no data
//               Array.from({ length: 4 }).map((_, index) => (
//                 <div key={index} className="border border-black rounded-xl">
//                   <img src={topcoaches} className="w-full h-40 object-cover rounded-t-xl" alt={`Sample coach ${index + 1}`} />
//                   <div className="px-3 py-4">
//                     <p className="font-semibold py-2">Sample Coach {index + 1}</p>
//                     <p className="text-gray-500 text-sm mb-3">Experienced coach dedicated to helping athletes reach their potential.</p>
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">5+ years exp.</span>
//                     </div>
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-sm text-gray-600">Available</span>
//                       <span className="text-[#7042D2] font-semibold">₦3,000/hr</span>
//                     </div>
//                     <button 
//                       onClick={() => navigate('/login')} 
//                       className="w-full border border-[#946BEF] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#946BEF] hover:text-white transition-colors"
//                     >
//                       Choose Coach
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Explore;




// src/pages/Explore.jsx - Sport-centric version
import React, { useState, useEffect } from 'react';
import { Search, Trophy, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Sports' },
    { value: 'team', label: 'Team Sports' },
    { value: 'individual', label: 'Individual' },
    { value: 'racquet', label: 'Racquet Sports' },
    { value: 'fitness', label: 'Fitness' }
  ];

  useEffect(() => {
    fetchSports();
  }, [selectedCategory, searchTerm]);

  const fetchSports = async () => {
    try {
      const params = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;

      const response = await axios.get(`${URL}/sports`, { params });
      
      if (response.data.success) {
        setSports(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching sports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSportClick = (sportId) => {
    navigate(`/sport/${sportId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-24 py-4 sm:py-8">
      {/* Header - Mobile Responsive */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Explore Sports</h1>
        <p className="text-sm sm:text-base text-gray-600">Find facilities and coaches for your favorite sport</p>
      </div>

      {/* Search Bar - Mobile Responsive */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search sports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
          />
        </div>
      </div>

      {/* Category Filter - Mobile Responsive with Scroll */}
      <div className="flex gap-2 overflow-x-auto mb-6 sm:mb-8 pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${
              selectedCategory === cat.value
                ? 'bg-[#7042D2] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sports Grid - Mobile Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {sports.map((sport) => (
          <div
            key={sport.id}
            onClick={() => handleSportClick(sport.id)}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow active:scale-95"
          >
            <div className="text-center">
              {sport.image ? (
                <img src={sport.image} alt={sport.name} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 object-contain" />
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl">
                  {sport.icon || '⚽'}
                </div>
              )}
              <h3 className="font-semibold text-sm sm:text-lg mb-1">{sport.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 capitalize">{sport.category}</p>

              {sport.popularityScore >= 80 && (
                <div className="mt-2 flex items-center justify-center text-xs text-yellow-600">
                  <TrendingUp size={12} className="mr-1" />
                  <span className="hidden sm:inline">Popular</span>
                  <span className="sm:hidden">🔥</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {sports.length === 0 && (
        <div className="text-center py-12">
          <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-sm sm:text-base">No sports found</p>
        </div>
      )}
    </div>
  );
};

export default Explore;