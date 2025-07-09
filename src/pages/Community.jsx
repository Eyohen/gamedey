// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../url';
// import {
// ThumbsUp,
// MessageCircleMore,
// BellRing
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import tenniscoaches from '../assets/tenniscoaches.png'
// import footballfacilities from '../assets/footballfacilities.png'
// import largestadium from '../assets/largestadium.png'
// import largefootballcoaches from '../assets/largefootballcoaches.png'
// import jay from '../assets/jay.png'


// const Community = () => {
//   // const { user, login } = useAuth();
//     const [activeButton, setActiveButton] = useState('home'); // 'home' or 'explore'
  

//   return (
//     <div className="container mx-auto px-4 py-8">
//         <div className='bg-gray-100 w-[200px] p-2 rounded-lg'>
//         <div className='flex gap-x-2'>
//           <button
//             className={`px-5 py-1 rounded-lg transition-colors ${activeButton === 'home'
//                 ? 'bg-white text-black'
//                 : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('home')}
//           >
//             Home
//           </button>
//           <button
//             className={`px-4 py-1 rounded-lg transition-colors ${activeButton === 'explore'
//                 ? 'bg-white text-black'
//                 : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('explore')}
//           >
//             Explore
//           </button>
//         </div>
//       </div>


//  <div className='flex gap-6 max-w-[1100px] pt-6 h-[170px]'>

//         <div className='border border-black rounded-md '>
//           <img src={footballfacilities} className='w-auto rounded-md' />
//           {/* text part */}
//           <div className='px-2 py-1'>
//             <p className='font-semibold'>Football Facilities</p>
   
//           </div>
//         </div>

//  <div className='border border-black rounded-md '>
//           <img src={tenniscoaches} className='w-auto rounded-md' />
//           {/* text part */}
//           <div className='px-2 py-1'>
//             <p className='font-semibold'>Tennis Coaches</p>

//           </div>
//         </div>



//          <div className='border border-black rounded-md '>
//           <img src={tenniscoaches} className='w-auto rounded-md' />
//           {/* text part */}
//           <div className='px-2 py-1'>
//             <p className='font-semibold'>Basketball Coaches</p>

//           </div>
//         </div>



//          <div className='border border-black rounded-md '>
//           <img src={tenniscoaches} className='w-auto rounded-md' />
//           {/* text part */}
//           <div className='px-2 py-1'>
//             <p className='font-semibold'>Soccer Facilities</p>

//           </div>
//         </div>



//       </div>
      
// {/* trending */}
// <button className='border-2 border-black rounded-2xl px-2 py-1 mt-4'>Trending</button>


// <div className='py-5'>
//   <p className='text-gray-300 flex items-center gap-x-1'><BellRing size={16} />Football Community</p>
//   <div className='flex gap-x-2 py-2'>
//   <img src={jay} className='w-8 rounded-full'/>
//   <p className='text-gray-600'>Jay Anderson</p>
//   </div>

// <p className=''>I am offering 50% discount on my football pitch, order ends tomorrow</p>
// <p className='pb-2'>Link to book now: <span className='text-[#946BEF] font-medium'>Jay Football Pitch</span></p>

// <img src={largestadium} className='w-auto'/>
// <div className='text-[#946BEF] flex gap-x-6 py-2'>
// <p className='flex items-center gap-x-1'><ThumbsUp size={16} />18 Likes </p>
// <p className='flex items-center gap-x-1'><MessageCircleMore size={16} />25 Comments</p>
// </div>


// </div>


// <div className='py-5'>
//   <p className='text-gray-300 flex items-center gap-x-1'><BellRing size={16} />Football Community</p>
//   <div className='flex gap-x-2 py-2'>
//   <img src={jay} className='w-8 rounded-full'/>
//   <p className='text-gray-600'>Jay Anderson</p>
//   </div>

// <p className=''>I am offering 50% discount on my football pitch, order ends tomorrow</p>
// <p className='pb-2'>Link to book now: <span className='text-[#946BEF] font-medium'>Jay Football Pitch</span></p>

// <img src={largestadium} className='w-auto'/>
// <div className='text-[#946BEF] flex gap-x-6 py-2'>
// <p className='flex items-center gap-x-1'><ThumbsUp size={16} />18 Likes </p>
// <p className='flex items-center gap-x-1'><MessageCircleMore size={16} />25 Comments</p>
// </div>


// </div>



// <div className='py-5'>
//   <p className='text-gray-300 flex items-center gap-x-1'><BellRing size={16} />Football Community</p>
//   <div className='flex gap-x-2 py-2'>
//   <img src={jay} className='w-8 rounded-full'/>
//   <p className='text-gray-600'>Jay Anderson</p>
//   </div>

// <p className=''>I am offering 50% discount on my football pitch, order ends tomorrow</p>
// <p className='pb-2'>Link to book now: <span className='text-[#946BEF] font-medium'>Jay Football Pitch</span></p>

// <img src={largestadium} className='w-auto'/>
// <div className='text-[#946BEF] flex gap-x-6 py-2'>
// <p className='flex items-center gap-x-1'><ThumbsUp size={16} />18 Likes </p>
// <p className='flex items-center gap-x-1'><MessageCircleMore size={16} />25 Comments</p>
// </div>


// </div>


     
//     </div>
//   );
// };

// export default Community;






// // Updated Community.jsx with direct axios integration
// import React, { useState, useEffect } from 'react';
// import {
//   ThumbsUp,
//   MessageCircleMore,
//   BellRing,
//   Plus,
//   TrendingUp
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import jay from '../assets/jay.png'
// import largestadium from '../assets/largestadium.png'
// import { useNavigate } from 'react-router-dom';

// const Community = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate()
//   const [activeButton, setActiveButton] = useState('home');
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch posts based on active tab
//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
      
//       let url = `${URL}/community/posts`;
//       let params = { limit: 10 };
      
//       if (activeButton === 'home') {
//         params.sortBy = 'recent';
//       } else if (activeButton === 'explore') {
//         url = `${URL}/community/posts/trending`;
//         params = { limit: 10 };
//       }
      
//       const response = await axios.get(url, { params });
      
//       if (response.data.success) {
//         setPosts(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       setError('Failed to fetch posts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [activeButton]);

//   // Handle post voting
//   const handleVote = async (postId, voteType) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to vote');
//         return;
//       }

//       await axios.post(`${URL}/community/posts/${postId}/vote`, 
//         { type: voteType }, 
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
      
//       // Refresh posts to show updated vote counts
//       fetchPosts();
//     } catch (err) {
//       console.error('Error voting on post:', err);
//       setError('Failed to vote on post');
//     }
//   };

//   // Format time ago
//   const formatTimeAgo = (dateString) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
//     return date.toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

// <div className='flex justify-between'>
//       {/* Tab Navigation */}
//       <div className='bg-gray-100 w-[200px] p-2 rounded-lg mb-6'>
//         <div className='flex gap-x-2'>
//           <button
//             className={`px-5 py-1 rounded-lg transition-colors ${activeButton === 'home'
//                 ? 'bg-white text-black'
//                 : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('home')}
//           >
//             Home
//           </button>
//           <button
//             className={`px-4 py-1 rounded-lg transition-colors ${activeButton === 'explore'
//                 ? 'bg-white text-black'
//                 : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('explore')}
//           >
//             Explore
//           </button>
//         </div>

//       </div>

//       <div><button onClick={()=>navigate('/create-community')} className='bg-[#946BEF] border-2 border-black rounded-lg text-white px-4 py-2'>Create Community</button></div>
//       </div>

//       {/* Sports Categories */}
//       <div className='flex gap-6 max-w-[1100px] pt-6 h-[170px] mb-8'>
//         {[
//           { name: 'Football Facilities', color: 'bg-blue-500' },
//           { name: 'Tennis Coaches', color: 'bg-green-500' },
//           { name: 'Basketball Coaches', color: 'bg-orange-500' },
//           { name: 'Soccer Facilities', color: 'bg-red-500' }
//         ].map((category, index) => (
//           <div key={index} className='border border-black rounded-md cursor-pointer hover:shadow-lg transition-shadow'>
//             <div className={`w-auto h-24 ${category.color} rounded-t-md`}></div>
//             <div className='px-2 py-2'>
//               <p className='font-semibold text-sm'>{category.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Trending Badge */}
//       <button className='border-2 border-black rounded-2xl px-3 py-1 mt-4 mb-6 hover:bg-gray-50 transition-colors'>
//         <TrendingUp size={16} className="inline mr-1" />
//         Trending
//       </button>

//       {/* Posts Feed */}
//       <div className="space-y-6">
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <div key={post.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
//               {/* Post Header */}
//               <div className="flex items-center mb-4">
//                 <BellRing size={16} className="text-gray-400 mr-2" />
//                 <span className="text-gray-400 text-sm">
//                   {post.Sport?.name || 'General'} Community
//                 </span>
//               </div>

//               {/* User Info */}
//               <div className='flex gap-x-2 py-2 items-center'>
//                 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//                   {post.User?.profileImage ? (
//                     <img src={post.User.profileImage} alt="User" className="w-full h-full object-cover" />
//                   ) : (
//                     <img src={jay} alt="User" className="w-full h-full object-cover" />
//                   )}
//                 </div>
//                 <div>
//                   <p className='text-gray-600 font-medium'>
//                     {post.User ? `${post.User.firstName} ${post.User.lastName}` : 'Anonymous User'}
//                   </p>
//                   <p className='text-xs text-gray-400'>{formatTimeAgo(post.createdAt)}</p>
//                 </div>
//               </div>

//               {/* Post Content */}
//               <div className="mb-4">
//                 <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                 <p className="text-gray-700 mb-2">{post.content}</p>
                
//                 {/* Post Tags */}
//                 {post.tags && post.tags.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     {post.tags.map((tag, index) => (
//                       <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
//                         #{tag}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Post Image */}
//               {post.images && post.images.length > 0 ? (
//                 <div className="mb-4">
//                   <img 
//                     src={post.images[0]} 
//                     alt="Post content"
//                     className='w-full max-w-md rounded-lg object-cover'
//                   />
//                 </div>
//               ) : (
//                 <div className="mb-4">
//                   <img 
//                     src={largestadium} 
//                     alt="Default post"
//                     className='w-full max-w-md rounded-lg object-cover'
//                   />
//                 </div>
//               )}

//               {/* Post Actions */}
//               <div className='text-[#946BEF] flex gap-x-6 py-2 border-t pt-4'>
//                 <button 
//                   className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors'
//                   onClick={() => handleVote(post.id, 'upvote')}
//                 >
//                   <ThumbsUp size={16} />
//                   <span>{post.upvotes || 0} Likes</span>
//                 </button>
//                 <button className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors'>
//                   <MessageCircleMore size={16} />
//                   <span>{post.commentCount || 0} Comments</span>
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-12">
//             <MessageCircleMore size={48} className="mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
//             <p className="text-gray-500 mb-4">
//               {activeButton === 'home' 
//                 ? "Be the first to share something with the community!" 
//                 : "No trending posts at the moment."}
//             </p>
//             <button className="bg-[#7042D2] text-white px-6 py-2 rounded-lg hover:bg-[#5c35a8] transition-colors">
//               <Plus size={16} className="inline mr-2" />
//               Create Post
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Community;























// import React, { useState, useEffect } from 'react';
// import {
//   ThumbsUp,
//   MessageCircleMore,
//   BellRing,
//   Plus,
//   TrendingUp,
//   Filter
// } from 'lucide-react';
//  import { useNavigate } from 'react-router-dom';

// const Community = () => {
//   const [activeButton, setActiveButton] = useState('home');
//    const navigate = useNavigate()
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Community data for explore view
//   const communityCategories = [
//     {
//       id: 1,
//       title: 'Football Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-blue-600',
//       image: '🏈'
//     },
//     {
//       id: 2,
//       title: 'Football Coaches',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-green-600',
//       image: '⚽'
//     },
//     {
//       id: 3,
//       title: 'Tennis Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-pink-600',
//       image: '🎾'
//     },
//     {
//       id: 4,
//       title: 'Football Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-blue-600',
//       image: '🏈'
//     },
//     {
//       id: 5,
//       title: 'Football Coaches',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-green-600',
//       image: '⚽'
//     },
//     {
//       id: 6,
//       title: 'Tennis Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-pink-600',
//       image: '🎾'
//     },
//     {
//       id: 7,
//       title: 'Football Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-blue-600',
//       image: '🏈'
//     },
//     {
//       id: 8,
//       title: 'Football Coaches',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-green-600',
//       image: '⚽'
//     },
//     {
//       id: 9,
//       title: 'Tennis Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-pink-600',
//       image: '🎾'
//     },
//     {
//       id: 10,
//       title: 'Football Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-blue-600',
//       image: '🏈'
//     },
//     {
//       id: 11,
//       title: 'Football Coaches',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-green-600',
//       image: '⚽'
//     },
//     {
//       id: 12,
//       title: 'Tennis Facilities',
//       description: 'We a community that provides with great insights of maintaining your facility.',
//       color: 'bg-pink-600',
//       image: '🎾'
//     }
//   ];

//   // Fetch posts based on active tab
//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
      
//       // Simulate API call with mock data
//       const mockPosts = [
//         {
//           id: 1,
//           title: 'Great Football Facility',
//           content: 'This is an amazing facility for football training.',
//           createdAt: new Date().toISOString(),
//           upvotes: 15,
//           commentCount: 3,
//           User: { firstName: 'John', lastName: 'Doe' },
//           Sport: { name: 'Football' }
//         }
//       ];
      
//       setTimeout(() => {
//         setPosts(mockPosts);
//         setLoading(false);
//       }, 500);
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       setError('Failed to fetch posts');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeButton === 'home') {
//       fetchPosts();
//     } else {
//       setLoading(false); // No need to fetch for explore view
//     }
//   }, [activeButton]);

//   // Handle post voting
//   const handleVote = async (postId, voteType) => {
//     try {
//       console.log('Voting on post:', postId, voteType);
//       // Simulate vote update
//       fetchPosts();
//     } catch (err) {
//       console.error('Error voting on post:', err);
//       setError('Failed to vote on post');
//     }
//   };

//   // Format time ago
//   const formatTimeAgo = (dateString) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
//     return date.toLocaleDateString();
//   };

//   const handleCommunityClick = (community) => {
//     // Handle community navigation
//     console.log('Clicked community:', community.title);
//     navigate('/community-post')
//     // You can navigate to a specific community page here
//   };

//   // Render Explore View
//   const renderExploreView = () => {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         {/* Header with tabs and create button */}
//         <div className='flex justify-between items-center mb-6'>
//           {/* Tab Navigation */}
//           <div className='bg-gray-100 w-[200px] p-2 rounded-lg'>
//             <div className='flex gap-x-2'>
//               <button
//                 className={`px-5 py-1 rounded-lg transition-colors ${activeButton === 'home'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('home')}
//               >
//                 Home
//               </button>
//               <button
//                 className={`px-4 py-1 rounded-lg transition-colors ${activeButton === 'explore'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('explore')}
//               >
//                 Explore
//               </button>
//             </div>
//           </div>

//           {/* Right side buttons */}
//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               <Filter size={16} />
//               Filter
//             </button>
//             <button 
//               onClick={() => navigate('/create-community')} 
//               className='bg-[#946BEF] rounded-lg text-white px-4 py-2 hover:bg-[#7c3aed] transition-colors'
//             >
//               Create Community
//             </button>
//           </div>
//         </div>

//         {/* Communities Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {communityCategories.map((community) => (
//             <div 
//               key={community.id}
//               onClick={() => handleCommunityClick(community)}
//               className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//             >
//               {/* Community Image/Header */}
//               <div className={`h-32 ${community.color} relative flex items-center justify-center`}>
//                 <div className="text-4xl">
//                   {community.image}
//                 </div>
//                 {/* You can replace this with actual images */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
//               </div>
              
//               {/* Community Info */}
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg text-gray-900 mb-2">
//                   {community.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {community.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Render Home View (your existing posts view)
//   const renderHomeView = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//         </div>
//       );
//     }

//     return (
//       <div className="container mx-auto px-4 py-8">
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//             <span className="text-sm text-red-700">{error}</span>
//           </div>
//         )}

//         <div className='flex justify-between'>
//           {/* Tab Navigation */}
//           <div className='bg-gray-100 w-[200px] p-2 rounded-lg mb-6'>
//             <div className='flex gap-x-2'>
//               <button
//                 className={`px-5 py-1 rounded-lg transition-colors ${activeButton === 'home'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('home')}
//               >
//                 Home
//               </button>
//               <button
//                 className={`px-4 py-1 rounded-lg transition-colors ${activeButton === 'explore'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('explore')}
//               >
//                 Explore
//               </button>
//             </div>
//           </div>

//           <div>
//             <button 
//              onClick={() => navigate('/create-community')} 
//               className='bg-[#946BEF] border-2 border-black rounded-lg text-white px-4 py-2'
//             >
//               Create Community
//             </button>
//           </div>
//         </div>

//         {/* Sports Categories */}
//         <div className='flex gap-6 max-w-[1100px] pt-6 h-[170px] mb-8'>
//           {[
//             { name: 'Football Facilities', color: 'bg-blue-500' },
//             { name: 'Tennis Coaches', color: 'bg-green-500' },
//             { name: 'Basketball Coaches', color: 'bg-orange-500' },
//             { name: 'Soccer Facilities', color: 'bg-red-500' }
//           ].map((category, index) => (
//             <div key={index} className='border border-black rounded-md cursor-pointer hover:shadow-lg transition-shadow'>
//               <div className={`w-auto h-24 ${category.color} rounded-t-md`}></div>
//               <div className='px-2 py-2'>
//                 <p className='font-semibold text-sm'>{category.name}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Trending Badge */}
//         <button className='border-2 border-black rounded-2xl px-3 py-1 mt-4 mb-6 hover:bg-gray-50 transition-colors'>
//           <TrendingUp size={16} className="inline mr-1" />
//           Trending
//         </button>

//         {/* Posts Feed */}
//         <div className="space-y-6">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
//                 {/* Post Header */}
//                 <div className="flex items-center mb-4">
//                   <BellRing size={16} className="text-gray-400 mr-2" />
//                   <span className="text-gray-400 text-sm">
//                     {post.Sport?.name || 'General'} Community
//                   </span>
//                 </div>

//                 {/* User Info */}
//                 <div className='flex gap-x-2 py-2 items-center'>
//                   <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//                     <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
//                       {post.User ? post.User.firstName.charAt(0) : 'U'}
//                     </div>
//                   </div>
//                   <div>
//                     <p className='text-gray-600 font-medium'>
//                       {post.User ? `${post.User.firstName} ${post.User.lastName}` : 'Anonymous User'}
//                     </p>
//                     <p className='text-xs text-gray-400'>{formatTimeAgo(post.createdAt)}</p>
//                   </div>
//                 </div>

//                 {/* Post Content */}
//                 <div className="mb-4">
//                   <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                   <p className="text-gray-700 mb-2">{post.content}</p>
                  
//                   {/* Post Tags */}
//                   {post.tags && post.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-2">
//                       {post.tags.map((tag, index) => (
//                         <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Post Image */}
//                 <div className="mb-4">
//                   <div className="w-full max-w-md h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
//                     <span className="text-white text-lg font-semibold">Stadium Image</span>
//                   </div>
//                 </div>

//                 {/* Post Actions */}
//                 <div className='text-[#946BEF] flex gap-x-6 py-2 border-t pt-4'>
//                   <button 
//                     className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors'
//                     onClick={() => handleVote(post.id, 'upvote')}
//                   >
//                     <ThumbsUp size={16} />
//                     <span>{post.upvotes || 0} Likes</span>
//                   </button>
//                   <button className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors'>
//                     <MessageCircleMore size={16} />
//                     <span>{post.commentCount || 0} Comments</span>
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <MessageCircleMore size={48} className="mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
//               <p className="text-gray-500 mb-4">
//                 Be the first to share something with the community!
//               </p>
//               <button className="bg-[#7042D2] text-white px-6 py-2 rounded-lg hover:bg-[#5c35a8] transition-colors">
//                 <Plus size={16} className="inline mr-2" />
//                 Create Post
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Main render
//   return (
//     <div>
//       {activeButton === 'explore' ? renderExploreView() : renderHomeView()}
//     </div>
//   );
// };

// export default Community;










import React, { useState, useEffect } from 'react';
import {
  ThumbsUp,
  MessageCircleMore,
  BellRing,
  Plus,
  TrendingUp,
  Filter,
  Search,
  Send,
  Image as ImageIcon,
  X,
  Flag,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('home');
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'discussion',
    tags: '',
    images: []
  });

  // Community categories for explore view
  const communityCategories = [
    {
      id: 1,
      title: 'Football Facilities',
      description: 'We a community that provides with great insights of maintaining your facility.',
      color: 'bg-blue-600',
      image: '🏈'
    },
    {
      id: 2,
      title: 'Football Coaches',
      description: 'We a community that provides with great insights of maintaining your facility.',
      color: 'bg-green-600',
      image: '⚽'
    },
    {
      id: 3,
      title: 'Tennis Facilities',
      description: 'We a community that provides with great insights of maintaining your facility.',
      color: 'bg-pink-600',
      image: '🎾'
    },
    {
      id: 4,
      title: 'Basketball Courts',
      description: 'We a community that provides with great insights of maintaining your facility.',
      color: 'bg-orange-600',
      image: '🏀'
    },
    {
      id: 5,
      title: 'Swimming Pools',
      description: 'We a community that provides with great insights of maintaining your facility.',
      color: 'bg-cyan-600',
      image: '🏊'
    },
    {
      id: 6,
      title: 'Volleyball Courts',
      description: 'We a community that provides with great insights of maintaining your facility.',
      color: 'bg-purple-600',
      image: '🏐'
    }
  ];

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        sortBy,
        limit: 20
      };
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await axios.get(`${URL}/community/posts`, { params });
      
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending posts
  const fetchTrendingPosts = async () => {
    try {
      const response = await axios.get(`${URL}/community/posts/trending`, {
        params: { limit: 5 }
      });
      
      if (response.data.success) {
        setTrendingPosts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching trending posts:', err);
    }
  };

  // Create a new post
  const createPost = async () => {
    try {
      if (!user) {
        setError('Please login to create a post');
        return;
      }

      if (!newPost.title.trim() || !newPost.content.trim()) {
        setError('Title and content are required');
        return;
      }

      const token = localStorage.getItem('access_token');
      const postData = {
        title: newPost.title,
        content: newPost.content,
        type: newPost.type,
        tags: newPost.tags ? newPost.tags.split(',').map(tag => tag.trim()) : []
      };

      const response = await axios.post(`${URL}/community/posts`, postData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setShowCreatePost(false);
        setNewPost({ title: '', content: '', type: 'discussion', tags: '', images: [] });
        fetchPosts(); // Refresh posts
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  // Vote on a post
  const voteOnPost = async (postId, voteType) => {
    try {
      if (!user) {
        setError('Please login to vote');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${URL}/community/posts/${postId}/vote`, 
        { type: voteType },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Update the post in the local state
        setPosts(prevPosts => 
          prevPosts.map(post => {
            if (post.id === postId) {
              const updatedPost = { ...post };
              if (voteType === 'upvote') {
                updatedPost.upvotes = (updatedPost.upvotes || 0) + (response.data.data.removed ? -1 : 1);
              } else {
                updatedPost.downvotes = (updatedPost.downvotes || 0) + (response.data.data.removed ? -1 : 1);
              }
              return updatedPost;
            }
            return post;
          })
        );
      }
    } catch (err) {
      console.error('Error voting on post:', err);
      setError(err.response?.data?.message || 'Failed to vote on post');
    }
  };

  // Flag a post
  const flagPost = async (postId, reason) => {
    try {
      if (!user) {
        setError('Please login to flag posts');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${URL}/community/posts/${postId}/flag`, 
        { reason },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Post has been flagged for review');
      }
    } catch (err) {
      console.error('Error flagging post:', err);
      setError(err.response?.data?.message || 'Failed to flag post');
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (activeButton === 'home') {
      fetchPosts();
      fetchTrendingPosts();
    }
  }, [activeButton, sortBy, searchTerm]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeButton === 'home') {
        fetchPosts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleCommunityClick = (community) => {
    navigate('/community-post', { state: { community } });
  };

  // Render Explore View
  const renderExploreView = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header with tabs and create button */}
        <div className='flex justify-between items-center mb-6'>
          {/* Tab Navigation */}
          <div className='bg-gray-100 w-[200px] p-2 rounded-lg'>
            <div className='flex gap-x-2'>
              <button
                className={`px-5 py-1 rounded-lg transition-colors ${activeButton === 'home'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('home')}
              >
                Home
              </button>
              <button
                className={`px-4 py-1 rounded-lg transition-colors ${activeButton === 'explore'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('explore')}
              >
                Explore
              </button>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
            <button 
              onClick={() => navigate('/create-community')} 
              className='bg-[#946BEF] rounded-lg text-white px-4 py-2 hover:bg-[#7c3aed] transition-colors'
            >
              Create Community
            </button>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityCategories.map((community) => (
            <div 
              key={community.id}
              onClick={() => handleCommunityClick(community)}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Community Image/Header */}
              <div className={`h-32 ${community.color} relative flex items-center justify-center`}>
                <div className="text-4xl">
                  {community.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
              </div>
              
              {/* Community Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {community.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {community.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Home View
  const renderHomeView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className='flex justify-between items-center mb-6'>
          {/* Tab Navigation */}
          <div className='bg-gray-100 w-[200px] p-2 rounded-lg'>
            <div className='flex gap-x-2'>
              <button
                className={`px-5 py-1 rounded-lg transition-colors ${activeButton === 'home'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('home')}
              >
                Home
              </button>
              <button
                className={`px-4 py-1 rounded-lg transition-colors ${activeButton === 'explore'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('explore')}
              >
                Explore
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="recent">Recent</option>
              <option value="popular">Popular</option>
              <option value="comments">Most Comments</option>
            </select>

            <button 
              onClick={() => setShowCreatePost(true)}
              className='bg-[#946BEF] border-2 border-black rounded-lg text-white px-4 py-2 hover:bg-[#7c3aed] transition-colors flex items-center gap-2'
            >
              <Plus size={16} />
              Create Post
            </button>
          </div>
        </div>

        {/* Sports Categories */}
        <div className='flex gap-6 max-w-[1100px] pt-6 h-[170px] mb-8 overflow-x-auto'>
          {[
            { name: 'Football Facilities', color: 'bg-blue-500' },
            { name: 'Tennis Coaches', color: 'bg-green-500' },
            { name: 'Basketball Coaches', color: 'bg-orange-500' },
            { name: 'Soccer Facilities', color: 'bg-red-500' },
            { name: 'Swimming Pools', color: 'bg-cyan-500' },
            { name: 'Volleyball Courts', color: 'bg-purple-500' }
          ].map((category, index) => (
            <div key={index} className='border border-black rounded-md cursor-pointer hover:shadow-lg transition-shadow min-w-[200px]'>
              <div className={`w-full h-24 ${category.color} rounded-t-md`}></div>
              <div className='px-2 py-2'>
                <p className='font-semibold text-sm'>{category.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Badge */}
        {trendingPosts.length > 0 && (
          <button className='border-2 border-black rounded-2xl px-3 py-1 mt-4 mb-6 hover:bg-gray-50 transition-colors'>
            <TrendingUp size={16} className="inline mr-1" />
            Trending
          </button>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BellRing size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-400 text-sm">
                      {post.Sport?.name || 'General'} Community
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => flagPost(post.id, 'inappropriate')}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Flag size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                {/* User Info */}
                <div className='flex gap-x-2 py-2 items-center'>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {post.User ? post.User.firstName.charAt(0) : 'U'}
                    </div>
                  </div>
                  <div>
                    <p className='text-gray-600 font-medium'>
                      {post.User ? `${post.User.firstName} ${post.User.lastName}` : 'Anonymous User'}
                    </p>
                    <p className='text-xs text-gray-400'>{formatTimeAgo(post.createdAt)}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-2">{post.content}</p>
                  
                  {/* Post Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Post Image */}
                {post.images && post.images.length > 0 && (
                  <div className="mb-4">
                    <div className="w-full max-w-md h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">Post Image</span>
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className='text-[#946BEF] flex gap-x-6 py-2 border-t pt-4'>
                  <button 
                    className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors'
                    onClick={() => voteOnPost(post.id, 'upvote')}
                  >
                    <ThumbsUp size={16} />
                    <span>{post.upvotes || 0} Likes</span>
                  </button>
                  <button 
                    className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors'
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <MessageCircleMore size={16} />
                    <span>{post.commentCount || 0} Comments</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageCircleMore size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-4">
                Be the first to share something with the community!
              </p>
              <button 
                onClick={() => setShowCreatePost(true)}
                className="bg-[#7042D2] text-white px-6 py-2 rounded-lg hover:bg-[#5c35a8] transition-colors"
              >
                <Plus size={16} className="inline mr-2" />
                Create Post
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Create Post Modal
  const CreatePostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create New Post</h3>
          <button onClick={() => setShowCreatePost(false)}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter post title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What's on your mind?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={newPost.type}
              onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="discussion">Discussion</option>
              <option value="question">Question</option>
              <option value="tip">Tip</option>
              <option value="event">Event</option>
              <option value="review">Review</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={newPost.tags}
              onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="football, training, tips"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={createPost}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
            >
              <Send size={16} className="mr-2" />
              Post
            </button>
            <button
              onClick={() => setShowCreatePost(false)}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {activeButton === 'explore' ? renderExploreView() : renderHomeView()}
      {showCreatePost && <CreatePostModal />}
    </div>
  );
};

export default Community;