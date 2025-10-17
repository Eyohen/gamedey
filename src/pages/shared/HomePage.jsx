// //pages/HomePage.jsx
// import React from 'react';
// import { ShoppingBag, Search, Menu, Star, ArrowRight, Users, Award, Truck } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../../url';

// import Navbar from '../../components/Navbar';
// // Your actual image imports
// import hero from '../../assets/hero.svg';
// import stadium1 from '../../assets/stadium1.png';
// import stadium2 from '../../assets/stadium2.png';
// import stadium3 from '../../assets/stadium3.png';
// import makesiteasier from '../../assets/makesiteasier.png';
// import signascoach from '../../assets/signascoach.png';
// import signasfacility from '../../assets/signasfacility.png';


// const Footer = () => (
//   <footer className="bg-gray-900 text-white p-8">
//     <div className="text-center">
//       <p>&copy; 2025 GameDey. All rights reserved.</p>
//     </div>
//   </footer>
// );

// export default function HomePage() {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative">
//         <Navbar />
        
//         {/* Hero Content */}
//         <div className="relative bg-gradient-to-b from-purple-50 to-white">
//           {/* Background Image - Hidden on small screens, visible on larger screens */}
//           <div className="hidden md:block absolute inset-0 z-0">
//             <img 
//               src={hero} 
//               alt="Hero background" 
//               className="w-full h-full object-cover opacity-20"
//             />
//           </div>
          
//           {/* Hero Text Content */}
//           <div className="relative z-10 px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
//             <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
//               Find Instant Access to Top Sports
//             </h1>
//             <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
//               Facilities & Coaches{' '}
//               <span className="text-purple-600">Near You!</span>
//             </h2>
//             <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
//               Discover venues within a 3km radius, reserve slots in seconds, and train with certified coaches—all in one.
//             </p>

//             {/* Search Form - Mobile First Design */}
//             <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-w-2xl mx-auto">
//               <div className="space-y-3 md:space-y-0 md:flex md:gap-3">
//                 <input 
//                   className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
//                   placeholder="Enter location"
//                 />
//                 <input 
//                   className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
//                   placeholder="Select sport"
//                 />
//                 <button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Top Searched Sport Section */}
//       <section className="py-8 md:py-16 px-4">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 md:mb-8">
//             Top Searched Sport Facilities in Lekki
//           </h2>
          
//           {/* Mobile: Horizontal scroll, Desktop: Grid */}
//           <div className="md:hidden">
//             <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
//               {[
//                 { img: stadium1, name: "Don Man Stadium" },
//                 { img: stadium2, name: "Nick Pitch" },
//                 { img: stadium3, name: "Anderson Stadium" }
//               ].map((stadium, index) => (
//                 <div key={index} className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden">
//                   <img src={stadium.img} alt={stadium.name} className="w-full h-40 object-cover" />
//                   <div className="p-4">
//                     <h3 className="font-semibold text-lg mb-2">{stadium.name}</h3>
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
//                     </p>
//                     <div className="flex justify-between text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
//                       <span>Mon-Tue</span>
//                       <span>8am-6pm</span>
//                       <span>Lekki Phase1</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Desktop Grid */}
//           <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               { img: stadium1, name: "Don Man Stadium" },
//               { img: stadium2, name: "Nick Pitch" },
//               { img: stadium3, name: "Anderson Stadium" }
//             ].map((stadium, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                 <img src={stadium.img} alt={stadium.name} className="w-full h-48 object-cover" />
//                 <div className="p-5">
//                   <h3 className="font-semibold text-xl mb-3">{stadium.name}</h3>
//                   <p className="text-gray-600 mb-4">
//                     A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
//                   </p>
//                   <div className="flex justify-between text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
//                     <span>Mon-Tue</span>
//                     <span>8am-6pm</span>
//                     <span>Lekki Phase1</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* GameDey Makes it Easier Section */}
//       <section className="py-8 md:py-16 px-4 bg-gray-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <img 
//             src={makesiteasier} 
//             alt="GameDey makes it easier" 
//             className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
//           />
//         </div>
//       </section>

//       {/* Earn from GameDey Section */}
//       <section className="py-12 md:py-16 bg-white">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3">Earn From GameDey</h2>
//           <p className="text-gray-600 mb-8 md:mb-12">
//             Earn from GameDey by posting your sport facility or become a sport coach
//           </p>
          
//           {/* Mobile: Stacked, Desktop: Side by side */}
//           <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
//             <div className="w-full max-w-xs">
//               <img 
//                 src={signascoach} 
//                 alt="Sign as coach" 
//                 className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//               />
//             </div>
//             <div className="w-full max-w-xs">
//               <img 
//                 src={signasfacility} 
//                 alt="Sign as facility" 
//                 className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 md:py-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-center text-gray-600 mb-8 md:mb-12">
//             Get answers to your questions
//           </p>

//           <div className="flex justify-center">
//             <div className="w-full max-w-4xl bg-yellow-50 rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-800 border-r-8 border-b-6">
//               <div className="flex flex-col lg:flex-row gap-6">
//                 {/* FAQ Questions */}
//                 <div className="flex-1 space-y-3">
//                   <h3 className="font-bold text-lg mb-4">FAQs.</h3>
//                   <div className="p-3 text-sm bg-purple-600 text-white border border-black border-r-4 border-b-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
//                     How do I search for facilities/coaches on GameDey?
//                   </div>
//                   <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
//                     Is my payment secure?
//                   </div>
//                   <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
//                     Can I cancel or reschedule a booking?
//                   </div>
//                   <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
//                     How do I leave a review?
//                   </div>
//                 </div>

//                 {/* FAQ Answer */}
//                 <div className="flex-1 space-y-3">
//                   <h3 className="font-bold text-lg mb-4">Ans.</h3>
//                   <div className="bg-yellow-400 text-sm rounded-lg p-4 border border-gray-300">
//                     <p>
//                       Use the search bar to enter your sport, location, or coach name. 
//                       Filter by distance (e.g., within 3km), price, ratings, or amenities 
//                       to narrow results. Click 'Book Now' to reserve instantly.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }









// //pages/HomePage.jsx
// import React, { useState, useEffect } from 'react';
// import { ShoppingBag, Search, Menu, Star, ArrowRight, Users, Award, Truck } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useNavigate } from 'react-router-dom';

// import Navbar from '../../components/Navbar';
// // Your actual image imports
// import hero from '../../assets/hero.svg';
// import stadium1 from '../../assets/stadium1.png';
// import stadium2 from '../../assets/stadium2.png';
// import stadium3 from '../../assets/stadium3.png';
// import makesiteasier from '../../assets/makesiteasier.png';
// import signascoach from '../../assets/signascoach.png';
// import signasfacility from '../../assets/signasfacility.png';

// const Footer = () => (
//   <footer className="bg-gray-900 text-white p-8">
//     <div className="text-center">
//       <p>&copy; 2025 GameDey. All rights reserved.</p>
//     </div>
//   </footer>
// );

// export default function HomePage() {
//   const navigate = useNavigate();
  
//   // Search state
//   const [searchData, setSearchData] = useState({
//     location: '',
//     sport: ''
//   });
//   const [searchResults, setSearchResults] = useState({
//     facilities: [],
//     coaches: [],
//     loading: false,
//     hasSearched: false
//   });
//   const [sports, setSports] = useState([]);

//   // Fetch available sports for dropdown
//   useEffect(() => {
//     const fetchSports = async () => {
//       try {
//         // You might need to create a sports endpoint or get this from your existing data
//         // For now, using common sports
//         setSports([
//           { id: '1', name: 'Football' },
//           { id: '2', name: 'Basketball' },
//           { id: '3', name: 'Tennis' },
//           { id: '4', name: 'Swimming' },
//           { id: '5', name: 'Cricket' },
//           { id: '6', name: 'Badminton' }
//         ]);
//       } catch (error) {
//         console.error('Error fetching sports:', error);
//       }
//     };
    
//     fetchSports();
//   }, []);

//   // Handle search input changes
//   const handleSearchChange = (e) => {
//     const { name, value } = e.target;
//     setSearchData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Perform search
//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!searchData.location.trim() && !searchData.sport.trim()) {
//       alert('Please enter a location or select a sport to search');
//       return;
//     }

//     setSearchResults(prev => ({ ...prev, loading: true, hasSearched: true }));

//     try {
//       // Search facilities and coaches simultaneously
//       const [facilitiesResponse, coachesResponse] = await Promise.all([
//         // Search facilities
//         axios.get(`${URL}/facilities`, {
//           params: {
//             search: searchData.location,
//             sport: searchData.sport,
//             limit: 6
//           }
//         }),
//         // Search coaches
//         axios.get(`${URL}/coaches`, {
//           params: {
//             search: searchData.location,
//             sport: searchData.sport,
//             limit: 6
//           }
//         })
//       ]);

//       setSearchResults({
//         facilities: facilitiesResponse.data.success ? facilitiesResponse.data.data : [],
//         coaches: coachesResponse.data.success ? coachesResponse.data.data : [],
//         loading: false,
//         hasSearched: true
//       });
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults({
//         facilities: [],
//         coaches: [],
//         loading: false,
//         hasSearched: true
//       });
//     }
//   };

//   // Clear search
//   const clearSearch = () => {
//     setSearchData({ location: '', sport: '' });
//     setSearchResults({
//       facilities: [],
//       coaches: [],
//       loading: false,
//       hasSearched: false
//     });
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative">
//         <Navbar />
        
//         {/* Hero Content */}
//         <div className="relative bg-gradient-to-b from-purple-50 to-white">
//           {/* Background Image - Hidden on small screens, visible on larger screens */}
//           <div className="hidden md:block absolute inset-0 z-0">
//             <img 
//               src={hero} 
//               alt="Hero background" 
//               className="w-full h-full object-cover opacity-20"
//             />
//           </div>
          
//           {/* Hero Text Content */}
//           <div className="relative z-10 px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
//             <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
//               Find Instant Access to Top Sports
//             </h1>
//             <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
//               Facilities & Coaches{' '}
//               <span className="text-purple-600">Near You!</span>
//             </h2>
//             <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
//               Discover venues within a 3km radius, reserve slots in seconds, and train with certified coaches—all in one.
//             </p>

//             {/* Search Form - Mobile First Design */}
//             <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-w-2xl mx-auto">
//               <form onSubmit={handleSearch} className="space-y-3 md:space-y-0 md:flex md:gap-3">
//                 <input 
//                   name="location"
//                   value={searchData.location}
//                   onChange={handleSearchChange}
//                   className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
//                   placeholder="Enter location (e.g., Lekki, Victoria Island)"
//                 />
//                 <select
//                   name="sport"
//                   value={searchData.sport}
//                   onChange={handleSearchChange}
//                   className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   <option value="">Select sport (optional)</option>
//                   {sports.map(sport => (
//                     <option key={sport.id} value={sport.id}>{sport.name}</option>
//                   ))}
//                 </select>
//                 <button 
//                   type="submit"
//                   disabled={searchResults.loading}
//                   className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//                 >
//                   {searchResults.loading ? 'Searching...' : 'Search'}
//                 </button>
//               </form>
              
//               {/* Clear search button */}
//               {searchResults.hasSearched && (
//                 <div className="mt-3 text-center">
//                   <button
//                     onClick={clearSearch}
//                     className="text-purple-600 hover:text-purple-700 text-sm underline"
//                   >
//                     Clear search
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Search Results Section */}
//       {searchResults.hasSearched && (
//         <section className="py-8 md:py-16 px-4 bg-gray-50">
//           <div className="max-w-6xl mx-auto">
//             {searchResults.loading ? (
//               <div className="flex justify-center items-center h-32">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//               </div>
//             ) : (
//               <>
//                 {/* Search Results Header */}
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl md:text-3xl font-bold mb-2">Search Results</h2>
//                   <p className="text-gray-600">
//                     Found {searchResults.facilities.length + searchResults.coaches.length} results
//                     {searchData.location && ` in ${searchData.location}`}
//                     {searchData.sport && ` for ${sports.find(s => s.id === searchData.sport)?.name}`}
//                   </p>
//                 </div>

//                 {/* Facilities Results */}
//                 {searchResults.facilities.length > 0 && (
//                   <div className="mb-12">
//                     <div className="flex justify-between items-center mb-6">
//                       <h3 className="text-xl md:text-2xl font-bold">Facilities</h3>
//                       <button
//                         onClick={() => navigate('/facilities')}
//                         className="text-purple-600 hover:text-purple-700 font-medium"
//                       >
//                         View All Facilities
//                       </button>
//                     </div>
                    
//                     {/* Mobile: Horizontal scroll */}
//                     <div className="md:hidden">
//                       <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
//                         {searchResults.facilities.map((facility) => (
//                           <div 
//                             key={facility.id}
//                             className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//                             onClick={() => navigate(`/choose-facility/${facility.id}`)}
//                           >
//                             <div className="w-full h-40 bg-gray-200">
//                               {facility.images && facility.images.length > 0 ? (
//                                 <img 
//                                   src={facility.images[0]} 
//                                   alt={facility.name}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <img src={stadium1} alt={facility.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
//                             <div className="p-4">
//                               <h4 className="font-semibold text-lg mb-2">{facility.name}</h4>
//                               <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                                 {facility.description || 'Professional sports facility'}
//                               </p>
//                               <div className="flex justify-between items-center">
//                                 <div className="flex items-center text-yellow-500">
//                                   <Star size={16} fill="currentColor" />
//                                   <span className="text-sm ml-1">{facility.averageRating || '4.5'}</span>
//                                 </div>
//                                 <span className="text-purple-600 font-semibold">
//                                   ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop: Grid */}
//                     <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {searchResults.facilities.map((facility) => (
//                         <div 
//                           key={facility.id}
//                           className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//                           onClick={() => navigate(`/choose-facility/${facility.id}`)}
//                         >
//                           <div className="w-full h-48 bg-gray-200">
//                             {facility.images && facility.images.length > 0 ? (
//                               <img 
//                                 src={facility.images[0]} 
//                                 alt={facility.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <img src={stadium1} alt={facility.name} className="w-full h-full object-cover" />
//                             )}
//                           </div>
//                           <div className="p-5">
//                             <h4 className="font-semibold text-xl mb-3">{facility.name}</h4>
//                             <p className="text-gray-600 mb-4">
//                               {facility.description || 'Professional sports facility'}
//                             </p>
//                             <div className="flex justify-between items-center">
//                               <div className="flex items-center text-yellow-500">
//                                 <Star size={16} fill="currentColor" />
//                                 <span className="ml-1">{facility.averageRating || '4.5'}</span>
//                               </div>
//                               <span className="text-purple-600 font-semibold">
//                                 ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Coaches Results */}
//                 {searchResults.coaches.length > 0 && (
//                   <div className="mb-8">
//                     <div className="flex justify-between items-center mb-6">
//                       <h3 className="text-xl md:text-2xl font-bold">Coaches</h3>
//                       <button
//                         onClick={() => navigate('/coaches')}
//                         className="text-purple-600 hover:text-purple-700 font-medium"
//                       >
//                         View All Coaches
//                       </button>
//                     </div>
                    
//                     {/* Mobile: Horizontal scroll */}
//                     <div className="md:hidden">
//                       <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
//                         {searchResults.coaches.map((coach) => (
//                           <div 
//                             key={coach.id}
//                             className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//                             onClick={() => navigate(`/choose-coach/${coach.id}`)}
//                           >
//                             <div className="w-full h-40 bg-gray-200">
//                               {coach.User?.profileImage ? (
//                                 <img 
//                                   src={coach.User.profileImage} 
//                                   alt={`${coach.User.firstName} ${coach.User.lastName}`}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center">
//                                   <span className="text-white text-2xl font-bold">
//                                     {coach.User?.firstName?.[0]}{coach.User?.lastName?.[0]}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                             <div className="p-4">
//                               <h4 className="font-semibold text-lg mb-2">
//                                 {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
//                               </h4>
//                               <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                                 {coach.bio || 'Professional sports coach'}
//                               </p>
//                               <div className="flex justify-between items-center">
//                                 <div className="flex items-center text-yellow-500">
//                                   <Star size={16} fill="currentColor" />
//                                   <span className="text-sm ml-1">{coach.averageRating || '4.8'}</span>
//                                 </div>
//                                 <span className="text-purple-600 font-semibold">
//                                   ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Desktop: Grid */}
//                     <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {searchResults.coaches.map((coach) => (
//                         <div 
//                           key={coach.id}
//                           className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//                           onClick={() => navigate(`/choose-coach/${coach.id}`)}
//                         >
//                           <div className="w-full h-48 bg-gray-200">
//                             {coach.User?.profileImage ? (
//                               <img 
//                                 src={coach.User.profileImage} 
//                                 alt={`${coach.User.firstName} ${coach.User.lastName}`}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center">
//                                 <span className="text-white text-3xl font-bold">
//                                   {coach.User?.firstName?.[0]}{coach.User?.lastName?.[0]}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="p-5">
//                             <h4 className="font-semibold text-xl mb-3">
//                               {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
//                             </h4>
//                             <p className="text-gray-600 mb-4">
//                               {coach.bio || 'Professional sports coach'}
//                             </p>
//                             <div className="flex justify-between items-center">
//                               <div className="flex items-center text-yellow-500">
//                                 <Star size={16} fill="currentColor" />
//                                 <span className="ml-1">{coach.averageRating || '4.8'}</span>
//                               </div>
//                               <span className="text-purple-600 font-semibold">
//                                 ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* No Results */}
//                 {searchResults.facilities.length === 0 && searchResults.coaches.length === 0 && (
//                   <div className="text-center py-12">
//                     <div className="text-gray-400 mb-4">
//                       <Search size={48} className="mx-auto" />
//                     </div>
//                     <h3 className="text-xl font-semibold mb-2">No results found</h3>
//                     <p className="text-gray-600 mb-4">
//                       Try searching with different keywords or check out our featured facilities and coaches below.
//                     </p>
//                     <button
//                       onClick={clearSearch}
//                       className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//                     >
//                       View All Options
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Top Searched Sport Section - Only show if no search results */}
//       {!searchResults.hasSearched && (
//         <section className="py-8 md:py-16 px-4">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 md:mb-8">
//               Top Searched Sport Facilities in Lekki
//             </h2>
            
//             {/* Mobile: Horizontal scroll, Desktop: Grid */}
//             <div className="md:hidden">
//               <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
//                 {[
//                   { img: stadium1, name: "Don Man Stadium" },
//                   { img: stadium2, name: "Nick Pitch" },
//                   { img: stadium3, name: "Anderson Stadium" }
//                 ].map((stadium, index) => (
//                   <div key={index} className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden">
//                     <img src={stadium.img} alt={stadium.name} className="w-full h-40 object-cover" />
//                     <div className="p-4">
//                       <h3 className="font-semibold text-lg mb-2">{stadium.name}</h3>
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
//                       </p>
//                       <div className="flex justify-between text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
//                         <span>Mon-Tue</span>
//                         <span>8am-6pm</span>
//                         <span>Lekki Phase1</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Desktop Grid */}
//             <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { img: stadium1, name: "Don Man Stadium" },
//                 { img: stadium2, name: "Nick Pitch" },
//                 { img: stadium3, name: "Anderson Stadium" }
//               ].map((stadium, index) => (
//                 <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                   <img src={stadium.img} alt={stadium.name} className="w-full h-48 object-cover" />
//                   <div className="p-5">
//                     <h3 className="font-semibold text-xl mb-3">{stadium.name}</h3>
//                     <p className="text-gray-600 mb-4">
//                       A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
//                     </p>
//                     <div className="flex justify-between text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
//                       <span>Mon-Tue</span>
//                       <span>8am-6pm</span>
//                       <span>Lekki Phase1</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* GameDey Makes it Easier Section */}
//       <section className="py-8 md:py-16 px-4 bg-gray-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <img 
//             src={makesiteasier} 
//             alt="GameDey makes it easier" 
//             className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
//           />
//         </div>
//       </section>

//       {/* Earn from GameDey Section */}
//       <section className="py-12 md:py-16 bg-white">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3">Earn From GameDey</h2>
//           <p className="text-gray-600 mb-8 md:mb-12">
//             Earn from GameDey by posting your sport facility or become a sport coach
//           </p>
          
//           {/* Mobile: Stacked, Desktop: Side by side */}
//           <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
//             <div className="w-full max-w-xs">
//               <img 
//                 src={signascoach} 
//                 alt="Sign as coach" 
//                 className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//               />
//             </div>
//             <div className="w-full max-w-xs">
//               <img 
//                 src={signasfacility} 
//                 alt="Sign as facility" 
//                 className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 md:py-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-center text-gray-600 mb-8 md:mb-12">
//             Get answers to your questions
//           </p>

//           <div className="flex justify-center">
//             <div className="w-full max-w-4xl bg-yellow-50 rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-800 border-r-8 border-b-6">
//               <div className="flex flex-col lg:flex-row gap-6">
//                 {/* FAQ Questions */}
//                 <div className="flex-1 space-y-3">
//                   <h3 className="font-bold text-lg mb-4">FAQs.</h3>
//                   <div className="p-3 text-sm bg-purple-600 text-white border border-black border-r-4 border-b-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
//                     How do I search for facilities/coaches on GameDey?
//                   </div>
//                   <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
//                     Is my payment secure?
//                   </div>
//                   <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
//                     Can I cancel or reschedule a booking?
//                   </div>
//                   <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
//                     How do I leave a review?
//                   </div>
//                 </div>

//                 {/* FAQ Answer */}
//                 <div className="flex-1 space-y-3">
//                   <h3 className="font-bold text-lg mb-4">Ans.</h3>
//                   <div className="bg-yellow-400 text-sm rounded-lg p-4 border border-gray-300">
//                     <p>
//                       Use the search bar to enter your sport, location, or coach name. 
//                       Filter by distance (e.g., within 3km), price, ratings, or amenities 
//                       to narrow results. Click 'Book Now' to reserve instantly.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }



//pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Star, ArrowRight, Users, Award, Truck } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
// Your actual image imports
import hero from '../../assets/hero.svg';
import stadium1 from '../../assets/stadium1.png';
import stadium2 from '../../assets/stadium2.png';
import stadium3 from '../../assets/stadium3.png';
import makesiteasier from '../../assets/makesiteasier.png';
import signascoach from '../../assets/signascoach.png';
import signasfacility from '../../assets/signasfacility.png';

const Footer = () => (
  <footer className="bg-gray-900 text-white p-8">
    <div className="text-center">
      <p>&copy; 2025 GameDey. All rights reserved.</p>
    </div>
  </footer>
);

export default function HomePage() {
  const navigate = useNavigate();
  
  // Search state
  const [searchData, setSearchData] = useState({
    location: '',
    sport: ''
  });
  const [searchResults, setSearchResults] = useState({
    facilities: [],
    coaches: [],
    loading: false,
    hasSearched: false
  });
  const [sports, setSports] = useState([]);

  // Fetch available sports for dropdown
  useEffect(() => {
    const fetchSports = async () => {
      try {
        // You might need to create a sports endpoint or get this from your existing data
        // For now, using common sports
        setSports([
          { id: '1', name: 'Football' },
          { id: '2', name: 'Basketball' },
          { id: '3', name: 'Tennis' },
          { id: '4', name: 'Swimming' },
          { id: '5', name: 'Cricket' },
          { id: '6', name: 'Badminton' }
        ]);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };
    
    fetchSports();
  }, []);

  // Helper function to extract key location terms
  const extractLocationKeywords = (locationString) => {
    // Common location keywords to prioritize
    const locationKeywords = [
      'lekki', 'victoria island', 'vi', 'ikoyi', 'surulere', 'yaba', 'ikeja', 
      'maryland', 'gbagada', 'magodo', 'ajah', 'banana island', 'lagos island',
      'festac', 'isolo', 'mushin', 'alaba', 'oshodi', 'ketu', 'mile 2',
      'apapa', 'badagry', 'epe', 'ikorodu', 'kosofe', 'agege', 'ifako-ijaiye'
    ];

    const searchTerms = locationString.toLowerCase()
      .replace(/[,\-]/g, ' ') // Replace commas and hyphens with spaces
      .split(/\s+/)           // Split by whitespace
      .filter(term => term.length > 2); // Filter out very short terms

    // Prioritize Nigerian location keywords, otherwise use all terms
    const foundKeywords = searchTerms.filter(term => 
      locationKeywords.some(keyword => keyword.includes(term) || term.includes(keyword))
    );

    return foundKeywords.length > 0 ? foundKeywords.join(' ') : searchTerms.join(' ');
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Perform search
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchData.location.trim() && !searchData.sport.trim()) {
      alert('Please enter a location or select a sport to search');
      return;
    }

    setSearchResults(prev => ({ ...prev, loading: true, hasSearched: true }));

    try {
      // Prepare search terms - extract key location words
      const locationTerms = searchData.location.trim();
      const searchTerm = locationTerms ? extractLocationKeywords(locationTerms) : '';

      // Search facilities and coaches simultaneously
      const [facilitiesResponse, coachesResponse] = await Promise.all([
        // Search facilities
        axios.get(`${URL}/facilities`, {
          params: {
            search: searchTerm,
            sport: searchData.sport,
            limit: 6
          }
        }),
        // Search coaches
        axios.get(`${URL}/coaches`, {
          params: {
            search: searchTerm,
            sport: searchData.sport,
            limit: 6
          }
        })
      ]);

      setSearchResults({
        facilities: facilitiesResponse.data.success ? facilitiesResponse.data.data : [],
        coaches: coachesResponse.data.success ? coachesResponse.data.data : [],
        loading: false,
        hasSearched: true
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({
        facilities: [],
        coaches: [],
        loading: false,
        hasSearched: true
      });
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchData({ location: '', sport: '' });
    setSearchResults({
      facilities: [],
      coaches: [],
      loading: false,
      hasSearched: false
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Navbar />
        
        {/* Hero Content */}
        <div className="relative bg-gradient-to-b from-purple-50 to-white">
          {/* Background Image - Hidden on small screens, visible on larger screens */}
          <div className="hidden md:block absolute inset-0 z-0">
            <img 
              src={hero} 
              alt="Hero background" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          {/* Hero Text Content */}
          <div className="relative z-10 px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Find Instant Access to Top Sports
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Facilities & Coaches{' '}
              <span className="text-purple-600">Near You!</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Discover venues within a 3km radius, reserve slots in seconds, and train with certified coaches—all in one.
            </p>

            {/* Search Form - Mobile First Design */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="space-y-3 md:space-y-0 md:flex md:gap-3">
                <input 
                  name="location"
                  value={searchData.location}
                  onChange={handleSearchChange}
                  className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="Enter location (e.g., Lekki, Victoria Island)"
                />
                <select
                  name="sport"
                  value={searchData.sport}
                  onChange={handleSearchChange}
                  className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select sport (optional)</option>
                  {sports.map(sport => (
                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                  ))}
                </select>
                <button 
                  type="submit"
                  disabled={searchResults.loading}
                  className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {searchResults.loading ? 'Searching...' : 'Search'}
                </button>
              </form>
              
              {/* Clear search button */}
              {searchResults.hasSearched && (
                <div className="mt-3 text-center">
                  <button
                    onClick={clearSearch}
                    className="text-purple-600 hover:text-purple-700 text-sm underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {searchResults.hasSearched && (
        <section className="py-8 md:py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {searchResults.loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : (
              <>
                {/* Search Results Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Search Results</h2>
                  <p className="text-gray-600">
                    Found {searchResults.facilities.length + searchResults.coaches.length} results
                    {searchData.location && ` in ${searchData.location}`}
                    {searchData.sport && ` for ${sports.find(s => s.id === searchData.sport)?.name}`}
                  </p>
                </div>

                {/* Facilities Results */}
                {searchResults.facilities.length > 0 && (
                  <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl md:text-2xl font-bold">Facilities</h3>
                      <button
                        onClick={() => navigate('/facilities')}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View All Facilities
                      </button>
                    </div>
                    
                    {/* Mobile: Horizontal scroll */}
                    <div className="md:hidden">
                      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                        {searchResults.facilities.map((facility) => (
                          <div 
                            key={facility.id}
                            className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => navigate(`/choose-facility/${facility.id}`)}
                          >
                            <div className="w-full h-40 bg-gray-200">
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
                            <div className="p-4">
                              <h4 className="font-semibold text-lg mb-2">{facility.name}</h4>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {facility.description || 'Professional sports facility'}
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-yellow-500">
                                  <Star size={16} fill="currentColor" />
                                  <span className="text-sm ml-1">{facility.averageRating || '4.5'}</span>
                                </div>
                                <span className="text-purple-600 font-semibold">
                                  ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.facilities.map((facility) => (
                        <div 
                          key={facility.id}
                          className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => navigate(`/choose-facility/${facility.id}`)}
                        >
                          <div className="w-full h-48 bg-gray-200">
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
                          <div className="p-5">
                            <h4 className="font-semibold text-xl mb-3">{facility.name}</h4>
                            <p className="text-gray-600 mb-4">
                              {facility.description || 'Professional sports facility'}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-yellow-500">
                                <Star size={16} fill="currentColor" />
                                <span className="ml-1">{facility.averageRating || '4.5'}</span>
                              </div>
                              <span className="text-purple-600 font-semibold">
                                ₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coaches Results */}
                {searchResults.coaches.length > 0 && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl md:text-2xl font-bold">Coaches</h3>
                      <button
                        onClick={() => navigate('/coaches')}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View All Coaches
                      </button>
                    </div>
                    
                    {/* Mobile: Horizontal scroll */}
                    <div className="md:hidden">
                      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                        {searchResults.coaches.map((coach) => (
                          <div 
                            key={coach.id}
                            className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => navigate(`/choose-coach/${coach.id}`)}
                          >
                            <div className="w-full h-40 bg-gray-200">
                              {coach.User?.profileImage ? (
                                <img 
                                  src={coach.User.profileImage} 
                                  alt={`${coach.User.firstName} ${coach.User.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center">
                                  <span className="text-white text-2xl font-bold">
                                    {coach.User?.firstName?.[0]}{coach.User?.lastName?.[0]}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-lg mb-2">
                                {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
                              </h4>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {coach.bio || 'Professional sports coach'}
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-yellow-500">
                                  <Star size={16} fill="currentColor" />
                                  <span className="text-sm ml-1">{coach.averageRating || '4.8'}</span>
                                </div>
                                <span className="text-purple-600 font-semibold">
                                  ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.coaches.map((coach) => (
                        <div 
                          key={coach.id}
                          className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => navigate(`/choose-coach/${coach.id}`)}
                        >
                          <div className="w-full h-48 bg-gray-200">
                            {coach.User?.profileImage ? (
                              <img 
                                src={coach.User.profileImage} 
                                alt={`${coach.User.firstName} ${coach.User.lastName}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-3xl font-bold">
                                  {coach.User?.firstName?.[0]}{coach.User?.lastName?.[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h4 className="font-semibold text-xl mb-3">
                              {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {coach.bio || 'Professional sports coach'}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-yellow-500">
                                <Star size={16} fill="currentColor" />
                                <span className="ml-1">{coach.averageRating || '4.8'}</span>
                              </div>
                              <span className="text-purple-600 font-semibold">
                                ₦{parseFloat(coach.hourlyRate || 3000).toLocaleString()}/hr
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {searchResults.facilities.length === 0 && searchResults.coaches.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No results found</h3>
                    <p className="text-gray-600 mb-4">
                      Try searching with different keywords or check out our featured facilities and coaches below.
                    </p>
                    <button
                      onClick={clearSearch}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      View All Options
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Top Searched Sport Section - Only show if no search results */}
      {!searchResults.hasSearched && (
        <section className="py-8 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 md:mb-8">
              Top Searched Sport Facilities in Lekki
            </h2>
            
            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                {[
                  { img: stadium1, name: "Don Man Stadium" },
                  { img: stadium2, name: "Nick Pitch" },
                  { img: stadium3, name: "Anderson Stadium" }
                ].map((stadium, index) => (
                  <div key={index} className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden">
                    <img src={stadium.img} alt={stadium.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{stadium.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
                      </p>
                      <div className="flex justify-between text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                        <span>Mon-Tue</span>
                        <span>8am-6pm</span>
                        <span>Lekki Phase1</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: stadium1, name: "Don Man Stadium" },
                { img: stadium2, name: "Nick Pitch" },
                { img: stadium3, name: "Anderson Stadium" }
              ].map((stadium, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={stadium.img} alt={stadium.name} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="font-semibold text-xl mb-3">{stadium.name}</h3>
                    <p className="text-gray-600 mb-4">
                      A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                      <span>Mon-Tue</span>
                      <span>8am-6pm</span>
                      <span>Lekki Phase1</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GameDey Makes it Easier Section */}
      <section className="py-8 md:py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={makesiteasier} 
            alt="GameDey makes it easier" 
            className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Earn from GameDey Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Earn From GameDey</h2>
          <p className="text-gray-600 mb-8 md:mb-12">
            Earn from GameDey by posting your sport facility or become a sport coach
          </p>
          
          {/* Mobile: Stacked, Desktop: Side by side */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
            <div className="w-full max-w-xs">
              <img 
                src={signascoach} 
                alt="Sign as coach" 
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
            <div className="w-full max-w-xs">
              <img 
                src={signasfacility} 
                alt="Sign as facility" 
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12">
            Get answers to your questions
          </p>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-yellow-50 rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-800 border-r-8 border-b-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* FAQ Questions */}
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-lg mb-4">FAQs.</h3>
                  <div className="p-3 text-sm bg-purple-600 text-white border border-black border-r-4 border-b-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                    How do I search for facilities/coaches on GameDey?
                  </div>
                  <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
                    Is my payment secure?
                  </div>
                  <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
                    Can I cancel or reschedule a booking?
                  </div>
                  <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
                    How do I leave a review?
                  </div>
                </div>

                {/* FAQ Answer */}
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-lg mb-4">Ans.</h3>
                  <div className="bg-yellow-400 text-sm rounded-lg p-4 border border-gray-300">
                    <p>
                      Use the search bar to enter your sport, location, or coach name. 
                      Filter by distance (e.g., within 3km), price, ratings, or amenities 
                      to narrow results. Click 'Book Now' to reserve instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}