// import React,{useState} from 'react'
// import {
//   TrendingUp,
//   Star,
//   Trash
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import stadium1 from '../assets/stadium1.png'
// import stadium2 from '../assets/stadium2.png'

// const Reviews = () => {
//     const [activeButton, setActiveButton] = useState('given'); // 

//   return (
//     <div>
//   <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'given'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('given')}
//           >
//             Given Reviews
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'completed'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('completed')}
//           >
//             Completed Sessions
//           </button>

//         </div>

//         {/* Optional: Show which is selected */}
//         {/* <div className="mt-4 text-sm text-gray-600">
//         Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
//       </div> */}

//       </div>


//       <div className='pt-2'>
//         <p className='font-medium '>Facility</p>

//          <div className='flex gap-x-2 pt-2'>
//         <img src={stadium1} className='w-8 h-8 object-cover' />
//         <p className='font-thin'>Don Sport Facility</p>
//         </div>

//         <div className='flex gap-x-2 items-center pt-2'>
//         <Star color={'orange'} size={20}/>
//           <Star color={'orange'} size={20}/>
//             <Star color={'orange'} size={20}/>
//               <Star color={'orange'} size={20}/> 
//         <p>15 - 01 - 2025</p>
//         </div>

//         <p className='text-sm pt-2 max-w-[1000px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet consectetur nisl vel ultricies. Nulla sit amet quam ultrices, suscipit nibh eget, ornare ipsum. Integer ac leo eu tortor consectetur tempus. Quisque sem lorem, varius id tortor at, ultrices tristique quam. Vestibulum id felis accumsan, placerat arcu vitae, egestas risus. Aliquam erat purus, interdum sed varius eu, placerat id elit. Sed a nibh imperdiet mauris vestibulum efficitur. </p>

// <div className='flex gap-x-6 pt-2'>
//   <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
//     <button className='bg-red-800 text-white px-4 py-2 rounded-lg'><Trash /></button>

// </div>


//       </div>

//       <div className='border-b pt-6'></div>


//          <div className='pt-6'>
//         <p className='font-medium '>Facility</p>

//          <div className='flex gap-x-2 pt-2'>
//         <img src={stadium1} className='w-8 h-8 object-cover' />
//         <p className='font-thin'>Don Sport Facility</p>
//         </div>

//         <div className='flex gap-x-2 items-center pt-2'>
//         <Star color={'orange'} size={20}/>
//           <Star color={'orange'} size={20}/>
//             <Star color={'orange'} size={20}/>
//               <Star color={'orange'} size={20}/> 
//         <p>15 - 01 - 2025</p>
//         </div>

//         <p className='text-sm pt-2 max-w-[1000px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet consectetur nisl vel ultricies. Nulla sit amet quam ultrices, suscipit nibh eget, ornare ipsum. Integer ac leo eu tortor consectetur tempus. Quisque sem lorem, varius id tortor at, ultrices tristique quam. Vestibulum id felis accumsan, placerat arcu vitae, egestas risus. Aliquam erat purus, interdum sed varius eu, placerat id elit. Sed a nibh imperdiet mauris vestibulum efficitur. </p>

// <div className='flex gap-x-6 pt-2'>
//   <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
//     <button className='bg-red-800 text-white px-4 py-2 rounded-lg'><Trash /></button>

// </div>


//       </div>

//       <div className='border-b pt-6'></div>

//     </div>
//   )
// }

// export default Reviews






// // Updated Reviews.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Star,
//   Trash,
//   Edit,
//   Calendar
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import stadium1 from '../assets/stadium1.png';

// const Reviews = () => {
//   const { user } = useAuth();
//   const [activeButton, setActiveButton] = useState('given');
//   const [reviews, setReviews] = useState([]);
//   const [completedSessions, setCompletedSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch user reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view reviews');
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`${URL}/users/reviews`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.data.success) {
//         setReviews(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//       setError('Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch completed sessions (bookings that can be reviewed)
//   const fetchCompletedSessions = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view completed sessions');
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`${URL}/users/bookings`, {
//         params: { status: 'completed' },
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.data.success) {
//         setCompletedSessions(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching completed sessions:', err);
//       setError('Failed to fetch completed sessions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeButton === 'given') {
//       fetchReviews();
//     } else {
//       fetchCompletedSessions();
//     }
//   }, [activeButton]);

//   // Render star rating
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={20}
//         className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
//       />
//     ));
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="px-6">
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {/* Tab Navigation */}
//       <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'given'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('given')}
//           >
//             Given Reviews
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'completed'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('completed')}
//           >
//             Completed Sessions
//           </button>
//         </div>
//       </div>

//       {/* Content based on active tab */}
//       {activeButton === 'given' ? (
//         <div className="space-y-8">
//           {reviews.length > 0 ? (
//             reviews.map((review) => (
//               <div key={review.id}>
//                 <div className="mb-4">
//                   <p className='font-medium text-lg'>
//                     {review.Facility ? 'Facility' : 'Coach'}
//                   </p>

//                   <div className='flex gap-x-2 pt-2 items-center'>
//                     <img src={stadium1} className='w-8 h-8 object-cover rounded' />
//                     <p className='font-thin'>
//                       {review.Facility?.name || 
//                        (review.Coach?.User ? `${review.Coach.User.firstName} ${review.Coach.User.lastName}` : 'Coach')}
//                     </p>
//                   </div>

//                   <div className='flex gap-x-2 items-center pt-2'>
//                     {renderStars(review.rating)}
//                     <p className="text-sm text-gray-500 ml-2">
//                       {formatDate(review.createdAt)}
//                     </p>
//                   </div>

//                   {review.title && (
//                     <h4 className="font-semibold mt-2">{review.title}</h4>
//                   )}

//                   <p className='text-sm pt-2 max-w-[1000px] text-gray-700'>
//                     {review.comment || 'No comment provided.'}
//                   </p>

//                   <div className='flex gap-x-6 pt-4'>
//                     <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg hover:bg-[#946BEF] hover:text-white transition-colors'>
//                       <Edit size={16} className="inline mr-2" />
//                       Edit
//                     </button>
//                     <button className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'>
//                       <Trash size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className='border-b pt-6'></div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <Star size={48} className="mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
//               <p className="text-gray-500">Your reviews will appear here after you rate facilities or coaches.</p>
//             </div>
//           )}
//         </div>
//       ) : (
//         // Completed Sessions Tab
//         <div className="space-y-6">
//           {completedSessions.length > 0 ? (
//             completedSessions.map((session) => (
//               <div key={session.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h3 className="font-semibold text-lg">
//                       {session.Facility?.name || 
//                        (session.Coach?.User ? `${session.Coach.User.firstName} ${session.Coach.User.lastName}` : 'Session')}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       {session.Facility ? 'Facility Booking' : 'Coach Session'}
//                     </p>
//                   </div>
//                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                     Completed
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Date</p>
//                     <p className="text-sm text-gray-600">
//                       {formatDate(session.startTime)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Duration</p>
//                     <p className="text-sm text-gray-600">
//                       {Math.round((new Date(session.endTime) - new Date(session.startTime)) / (1000 * 60 * 60))} hours
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Amount Paid</p>
//                     <p className="text-sm text-gray-600">₦{session.totalAmount}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Participants</p>
//                     <p className="text-sm text-gray-600">{session.participantsCount || 1} person(s)</p>
//                   </div>
//                 </div>

//                 <button className="bg-[#7042D2] text-white px-6 py-2 rounded-lg hover:bg-[#5c35a8] transition-colors">
//                   <Star size={16} className="inline mr-2" />
//                   Write Review
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No completed sessions</h3>
//               <p className="text-gray-500">Complete a booking to write reviews for facilities and coaches.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reviews;



















// import React, { useState, useEffect } from 'react';
// import {
//   Star,
//   Trash,
//   Edit,
//   Calendar,
//   Clock,
//   MapPin
// } from 'lucide-react';

// const Reviews = () => {
//   const [activeButton, setActiveButton] = useState('given');
//   const [reviews, setReviews] = useState([]);
//   const [completedSessions, setCompletedSessions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Mock completed sessions data based on your design
//   const mockCompletedSessions = [
//     {
//       id: 1,
//       type: 'facility',
//       name: 'Don Man Stadium',
//       description: 'A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.',
//       price: '₦50,000',
//       date: '27th Apr,2025',
//       time: '10am',
//       location: 'Leeki Phase 1',
//       image: 'stadium',
//       status: 'Completed',
//       sportsIcons: ['⚽', '🏃‍♂️', '🤸‍♂️'],
//       backgroundColor: 'bg-blue-600'
//     },
//     {
//       id: 2,
//       type: 'coach',
//       name: 'Andrew Tate',
//       description: 'A vibrant coach with the touch of excellence and provides the perfect guide for different sports.',
//       price: '₦50,000',
//       date: '27th Apr,2025',
//       time: '10am',
//       location: 'Leeki Phase 1',
//       image: 'coach',
//       status: 'Completed',
//       sportsIcons: ['⚽', '🏃‍♂️', '🤸‍♂️'],
//       backgroundColor: 'bg-yellow-600'
//     },
//     {
//       id: 3,
//       type: 'facility',
//       name: 'Anderson Stadium',
//       description: 'A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.',
//       price: '₦50,000',
//       date: '27th Apr,2025',
//       time: '10am',
//       location: 'Leeki Phase 1',
//       image: 'stadium',
//       status: 'Completed',
//       sportsIcons: ['⚽', '🏃‍♂️', '🤸‍♂️'],
//       backgroundColor: 'bg-purple-800'
//     }
//   ];

//   // Mock given reviews data
//   const mockReviews = [
//     {
//       id: 1,
//       facilityName: 'Stadium Arena',
//       rating: 5,
//       title: 'Excellent facility!',
//       comment: 'Amazing experience, well-maintained facility with great amenities.',
//       createdAt: '2025-01-15',
//       type: 'Facility'
//     }
//   ];

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       if (activeButton === 'given') {
//         setReviews(mockReviews);
//       } else {
//         setCompletedSessions(mockCompletedSessions);
//       }
//       setLoading(false);
//     }, 500);
//   }, [activeButton]);

//   // Render star rating
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         size={20}
//         className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
//       />
//     ));
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const renderSessionCard = (session) => {
//     return (
//       <div key={session.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
//         {/* Card Header with Image/Illustration */}
//         <div className={`h-40 ${session.backgroundColor} relative overflow-hidden`}>
//           {/* Status Badge */}
//           <div className="absolute top-3 left-3">
//             <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
//               {session.status}
//             </span>
//           </div>
          
//           {/* Price Badge */}
//           <div className="absolute top-3 right-3">
//             <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
//               {session.price}
//             </span>
//           </div>

//           {/* Content based on type */}
//           {session.type === 'facility' ? (
//             // Stadium illustration
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative w-32 h-20">
//                 {/* Stadium structure */}
//                 <div className="absolute bottom-0 w-full h-16 bg-white/20 rounded-t-full"></div>
//                 <div className="absolute bottom-2 left-4 right-4 h-8 bg-green-400 rounded"></div>
//                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 border-2 border-white rounded-full"></div>
//                 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
//               </div>
//             </div>
//           ) : (
//             // Coach illustration
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
//                 <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
//                   <span className="text-white text-2xl">👨‍🏫</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Card Content */}
//         <div className="p-4">
//           {/* Sports Icons */}
//           <div className="mb-3">
//             <p className="text-xs text-gray-600 mb-2">
//               {session.type === 'facility' ? 'Suitable for Sports like:' : 'Coaching for Sports like:'}
//             </p>
//             <div className="flex gap-2">
//               {session.sportsIcons.map((icon, index) => (
//                 <div key={index} className="w-6 h-6 text-sm flex items-center justify-center">
//                   {icon}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Session Name */}
//           <h3 className="font-semibold text-lg text-gray-900 mb-2">{session.name}</h3>
          
//           {/* Description */}
//           <p className="text-sm text-gray-600 mb-4 line-clamp-3">
//             {session.description}
//           </p>

//           {/* Session Details */}
//           <div className="space-y-2 mb-4">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Calendar size={14} />
//               <span>{session.date}</span>
//               <Clock size={14} className="ml-4" />
//               <span>{session.time}</span>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <MapPin size={14} />
//               <span>{session.location}</span>
//             </div>
//           </div>

//           {/* Give Review Button */}
//           <button className="w-full bg-white border-2 border-purple-500 text-purple-500 py-2 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors">
//             Give Review
//           </button>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="px-6">
    

//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {/* Tab Navigation */}
//       <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'given'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('given')}
//           >
//             Given Reviews
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'completed'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('completed')}
//           >
//             Completed Sessions
//           </button>
//         </div>
//       </div>

//       {/* Content based on active tab */}
//       {activeButton === 'given' ? (
//         <div className="space-y-8">
//           {reviews.length > 0 ? (
//             reviews.map((review) => (
//               <div key={review.id}>
//                 <div className="mb-4">
//                   <p className='font-medium text-lg'>{review.type}</p>

//                   <div className='flex gap-x-2 pt-2 items-center'>
//                     <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded"></div>
//                     <p className='font-thin'>{review.facilityName}</p>
//                   </div>

//                   <div className='flex gap-x-2 items-center pt-2'>
//                     {renderStars(review.rating)}
//                     <p className="text-sm text-gray-500 ml-2">
//                       {formatDate(review.createdAt)}
//                     </p>
//                   </div>

//                   {review.title && (
//                     <h4 className="font-semibold mt-2">{review.title}</h4>
//                   )}

//                   <p className='text-sm pt-2 max-w-[1000px] text-gray-700'>
//                     {review.comment || 'No comment provided.'}
//                   </p>

//                   <div className='flex gap-x-6 pt-4'>
//                     <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg hover:bg-[#946BEF] hover:text-white transition-colors'>
//                       <Edit size={16} className="inline mr-2" />
//                       Edit
//                     </button>
//                     <button className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'>
//                       <Trash size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className='border-b pt-6'></div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <Star size={48} className="mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
//               <p className="text-gray-500">Your reviews will appear here after you rate facilities or coaches.</p>
//             </div>
//           )}
//         </div>
//       ) : (
//         // Completed Sessions Tab
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {completedSessions.length > 0 ? (
//             completedSessions.map((session) => renderSessionCard(session))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No completed sessions</h3>
//               <p className="text-gray-500">Complete a booking to write reviews for facilities and coaches.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reviews;




import React, { useState, useEffect } from 'react';
import {
  Star,
  Trash,
  Edit,
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Send
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Reviews = () => {
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState('given');
  const [givenReviews, setGivenReviews] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    bookingId: null
  });
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch user's given reviews
  const fetchGivenReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view reviews');
        return;
      }

      const response = await axios.get(`${URL}/users/reviews`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setGivenReviews(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.response?.data?.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  // Fetch completed sessions (bookings) that can be reviewed
  const fetchCompletedSessions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view completed sessions');
        return;
      }

      const response = await axios.get(`${URL}/users/bookings`, {
        params: { status: 'completed' },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        // Filter bookings that don't have reviews yet
        const bookingsWithoutReviews = response.data.data.filter(booking => {
          return !givenReviews.find(review => 
            (review.facilityId && review.facilityId === booking.facilityId) ||
            (review.coachId && review.coachId === booking.coachId)
          );
        });
        setCompletedSessions(bookingsWithoutReviews);
      }
    } catch (err) {
      console.error('Error fetching completed sessions:', err);
      setError(err.response?.data?.message || 'Failed to fetch completed sessions');
    } finally {
      setLoading(false);
    }
  };

  // Create a new review
  const createReview = async (bookingData) => {
    try {
      const token = localStorage.getItem('access_token');
      const reviewData = {
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        facilityId: bookingData.facilityId || null,
        coachId: bookingData.coachId || null
      };

      const response = await axios.post(`${URL}/reviews`, reviewData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        // Refresh the reviews list
        fetchGivenReviews();
        fetchCompletedSessions();
        setShowReviewModal(false);
        setReviewForm({ rating: 5, title: '', comment: '', bookingId: null });
      }
    } catch (err) {
      console.error('Error creating review:', err);
      setError(err.response?.data?.message || 'Failed to create review');
    }
  };

  // Update an existing review
  const updateReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('access_token');
      const updateData = {
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment
      };

      const response = await axios.put(`${URL}/reviews/${reviewId}`, updateData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        fetchGivenReviews();
        setEditingReview(null);
        setReviewForm({ rating: 5, title: '', comment: '', bookingId: null });
      }
    } catch (err) {
      console.error('Error updating review:', err);
      setError(err.response?.data?.message || 'Failed to update review');
    }
  };

  // Delete a review
  const deleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(`${URL}/reviews/${reviewId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        fetchGivenReviews();
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err.response?.data?.message || 'Failed to delete review');
    }
  };

  // Start editing a review
  const startEditReview = (review) => {
    setEditingReview(review.id);
    setReviewForm({
      rating: review.rating,
      title: review.title || '',
      comment: review.comment || '',
      bookingId: null
    });
  };

  // Start creating a review for a booking
  const startCreateReview = (booking) => {
    setReviewForm({
      rating: 5,
      title: '',
      comment: '',
      bookingId: booking.id
    });
    setShowReviewModal(true);
  };

  useEffect(() => {
    if (activeButton === 'given') {
      fetchGivenReviews();
    } else {
      fetchCompletedSessions();
    }
  }, [activeButton]);

  // Render star rating input
  const renderStarInput = (rating, onChange) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onChange(index + 1)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

  // Render star display
  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={16}
            className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format date and time for bookings
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const renderSessionCard = (booking) => {
    const isCoach = booking.bookingType === 'coach' || booking.bookingType === 'both';
    const isFacility = booking.bookingType === 'facility' || booking.bookingType === 'both';
    const startDateTime = formatDateTime(booking.startTime);
    const endDateTime = formatDateTime(booking.endTime);

    return (
      <div key={booking.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {/* Card Header */}
        <div className={`h-40 ${isCoach ? 'bg-green-600' : 'bg-blue-600'} relative overflow-hidden`}>
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Completed
            </span>
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
              ₦{parseFloat(booking.totalAmount).toLocaleString()}
            </span>
          </div>

          {/* Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isCoach ? (
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
            ) : (
              <div className="relative w-32 h-20">
                <div className="absolute bottom-0 w-full h-16 bg-white/20 rounded-t-full"></div>
                <div className="absolute bottom-2 left-4 right-4 h-8 bg-green-400 rounded"></div>
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Session Name */}
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            {isFacility && booking.Facility ? booking.Facility.name : ''}
            {isCoach && booking.Coach ? `Coach ${booking.Coach.User?.firstName} ${booking.Coach.User?.lastName}` : ''}
          </h3>
          
          {/* Session Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>{startDateTime.date}</span>
              <Clock size={14} className="ml-4" />
              <span>{startDateTime.time} - {endDateTime.time}</span>
            </div>
            {(isFacility && booking.Facility) && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{booking.Facility.address}</span>
              </div>
            )}
          </div>

          {/* Give Review Button */}
          <button 
            onClick={() => startCreateReview(booking)}
            className="w-full bg-white border-2 border-purple-500 text-purple-500 py-2 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center"
          >
            <Plus size={16} className="mr-2" />
            Give Review
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="px-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'given'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('given')}
          >
            Given Reviews
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'completed'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('completed')}
          >
            Completed Sessions
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeButton === 'given' ? (
        <div className="space-y-8">
          {givenReviews.length > 0 ? (
            givenReviews.map((review) => (
              <div key={review.id}>
                <div className="mb-4">
                  <p className='font-medium text-lg'>
                    {review.Facility ? 'Facility Review' : 'Coach Review'}
                  </p>

                  <div className='flex gap-x-2 pt-2 items-center'>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded"></div>
                    <p className='font-thin'>
                      {review.Facility ? review.Facility.name : 
                       review.Coach ? `Coach ${review.Coach.User?.firstName} ${review.Coach.User?.lastName}` : 'Unknown'}
                    </p>
                  </div>

                  {editingReview === review.id ? (
                    // Edit form
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          {renderStarInput(reviewForm.rating, (rating) => setReviewForm(prev => ({ ...prev, rating })))}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title (Optional)</label>
                          <input
                            type="text"
                            value={reviewForm.title}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Review title"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                          <textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Share your experience..."
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateReview(review.id)}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                          >
                            Update Review
                          </button>
                          <button
                            onClick={() => {
                              setEditingReview(null);
                              setReviewForm({ rating: 5, title: '', comment: '', bookingId: null });
                            }}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Display review
                    <>
                      <div className='flex gap-x-2 items-center pt-2'>
                        {renderStars(review.rating)}
                        <p className="text-sm text-gray-500 ml-2">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>

                      {review.title && (
                        <h4 className="font-semibold mt-2">{review.title}</h4>
                      )}

                      <p className='text-sm pt-2 max-w-[1000px] text-gray-700'>
                        {review.comment || 'No comment provided.'}
                      </p>

                      <div className='flex gap-x-6 pt-4'>
                        <button 
                          onClick={() => startEditReview(review)}
                          className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg hover:bg-[#946BEF] hover:text-white transition-colors'
                        >
                          <Edit size={16} className="inline mr-2" />
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteReview(review.id)}
                          className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className='border-b pt-6'></div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Star size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500">Your reviews will appear here after you rate facilities or coaches.</p>
            </div>
          )}
        </div>
      ) : (
        // Completed Sessions Tab
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedSessions.length > 0 ? (
            completedSessions.map((session) => renderSessionCard(session))
          ) : (
            <div className="col-span-full text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No completed sessions</h3>
              <p className="text-gray-500">Complete a booking to write reviews for facilities and coaches.</p>
            </div>
          )}
        </div>
      )}

      {/* Create Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                {renderStarInput(reviewForm.rating, (rating) => setReviewForm(prev => ({ ...prev, rating })))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title (Optional)</label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Review title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Share your experience..."
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const booking = completedSessions.find(s => s.id === reviewForm.bookingId);
                    if (booking) createReview(booking);
                  }}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
                >
                  <Send size={16} className="mr-2" />
                  Submit Review
                </button>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setReviewForm({ rating: 5, title: '', comment: '', bookingId: null });
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;