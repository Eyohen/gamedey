// // pages/Community.jsx - for coaches
// import React, { useState, useEffect } from 'react';
// import {
//   Search,
//   Filter,
//   Plus,
//   Heart,
//   MessageCircle,
//   Share,
//   MoreVertical,
//   TrendingUp,
//   Clock,
//   User,
//   MapPin,
//   ThumbsUp,
//   ThumbsDown,
//   Send,
//   Edit,
//   Trash2,
//   Flag,
//   RefreshCw,
//   Eye,
//   BookOpen,
//   Users,
//   Target,
//   Award,
//   ChevronDown,
//   X
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';

// const Community = () => {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('recent');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });

//   // Create post form state
//   const [newPost, setNewPost] = useState({
//     title: '',
//     content: '',
//     type: 'discussion',
//     tags: []
//   });

//   // Comment form state
//   const [commentForms, setCommentForms] = useState({});
//   const [showComments, setShowComments] = useState({});

//   const postTypes = [
//     { value: 'discussion', label: 'Discussion', icon: '💬' },
//     { value: 'question', label: 'Question', icon: '❓' },
//     { value: 'tip', label: 'Training Tip', icon: '💡' },
//     { value: 'review', label: 'Review', icon: '⭐' }
//   ];

//   const filterOptions = [
//     { value: 'recent', label: 'Recent', sortBy: 'recent' },
//     { value: 'popular', label: 'Popular', sortBy: 'popular' },
//     { value: 'comments', label: 'Most Discussed', sortBy: 'comments' }
//   ];

//   // Coach-specific community categories - Mobile optimized
//   const coachCategories = [
//     {
//       id: 1,
//       title: 'Training Techniques',
//       description: 'Share and discover effective training methods.',
//       color: 'bg-blue-600',
//       icon: '🏃‍♂️',
//       count: '1.2k posts'
//     },
//     {
//       id: 2,
//       title: 'Player Development',
//       description: 'Discuss strategies for developing players.',
//       color: 'bg-green-600',
//       icon: '📈',
//       count: '856 posts'
//     },
//     {
//       id: 3,
//       title: 'Sports Psychology',
//       description: 'Mental training and psychological aspects.',
//       color: 'bg-purple-600',
//       icon: '🧠',
//       count: '642 posts'
//     },
//     {
//       id: 4,
//       title: 'Equipment & Gear',
//       description: 'Reviews and recommendations for gear.',
//       color: 'bg-orange-600',
//       icon: '⚽',
//       count: '423 posts'
//     },
//     {
//       id: 5,
//       title: 'Coaching Business',
//       description: 'Business aspects of professional coaching.',
//       color: 'bg-cyan-600',
//       icon: '💼',
//       count: '789 posts'
//     },
//     {
//       id: 6,
//       title: 'Nutrition & Health',
//       description: 'Athlete nutrition and health management.',
//       color: 'bg-red-600',
//       icon: '🥗',
//       count: '567 posts'
//     }
//   ];

//   // Fetch posts
//   const fetchPosts = async (resetPagination = false) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const currentPage = resetPagination ? 1 : pagination.page;
//       const selectedFilterObj = filterOptions.find(f => f.value === selectedFilter);
      
//       const params = {
//         page: currentPage,
//         limit: pagination.limit,
//         sortBy: selectedFilterObj?.sortBy || 'recent'
//       };

//       if (searchTerm) params.search = searchTerm;

//       const response = await axios.get(`${URL}/community/posts`, { params });
      
//       if (response.data.success) {
//         if (resetPagination) {
//           setPosts(response.data.data);
//           setPagination(response.data.pagination);
//         } else {
//           setPosts(prev => [...prev, ...response.data.data]);
//           setPagination(response.data.pagination);
//         }
//       }
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       setError('Failed to load community posts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create post
//   const createPost = async () => {
//     try {
//       if (!newPost.title.trim() || !newPost.content.trim()) {
//         alert('Please fill in title and content');
//         return;
//       }

//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to create posts');
//         return;
//       }

//       const response = await axios.post(`${URL}/community/posts`, newPost, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setNewPost({ title: '', content: '', type: 'discussion', tags: [] });
//         setShowCreatePost(false);
//         alert('Post created successfully! It will be visible after admin approval.');
//         fetchPosts(true);
//       }
//     } catch (err) {
//       console.error('Error creating post:', err);
//       alert(err.response?.data?.message || 'Failed to create post');
//     }
//   };

//   // Vote on post
//   const voteOnPost = async (postId, type) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         alert('Please login to vote');
//         return;
//       }

//       const response = await axios.post(
//         `${URL}/community/posts/${postId}/vote`,
//         { type },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setPosts(prev => prev.map(post => {
//           if (post.id === postId) {
//             const updatedPost = { ...post };
//             if (response.data.data.removed) {
//               if (type === 'upvote') {
//                 updatedPost.upvotes = Math.max(0, (updatedPost.upvotes || 0) - 1);
//               } else {
//                 updatedPost.downvotes = Math.max(0, (updatedPost.downvotes || 0) - 1);
//               }
//             } else {
//               if (type === 'upvote') {
//                 updatedPost.upvotes = (updatedPost.upvotes || 0) + 1;
//                 if (response.data.data.changed) {
//                   updatedPost.downvotes = Math.max(0, (updatedPost.downvotes || 0) - 1);
//                 }
//               } else {
//                 updatedPost.downvotes = (updatedPost.downvotes || 0) + 1;
//                 if (response.data.data.changed) {
//                   updatedPost.upvotes = Math.max(0, (updatedPost.upvotes || 0) - 1);
//                 }
//               }
//             }
//             return updatedPost;
//           }
//           return post;
//         }));
//       }
//     } catch (err) {
//       console.error('Error voting on post:', err);
//       alert(err.response?.data?.message || 'Failed to vote');
//     }
//   };

//   // Share post
//   const sharePost = async (postId, platform = 'general') => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         alert('Please login to share posts');
//         return;
//       }

//       const response = await axios.post(
//         `${URL}/community/posts/${postId}/share`,
//         { platform },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setPosts(prev => prev.map(post => 
//           post.id === postId 
//             ? { ...post, shareCount: (post.shareCount || 0) + 1 }
//             : post
//         ));
//         alert('Post shared successfully!');
//       }
//     } catch (err) {
//       console.error('Error sharing post:', err);
//       alert(err.response?.data?.message || 'Failed to share post');
//     }
//   };

//   // Add comment
//   const addComment = async (postId) => {
//     try {
//       const commentText = commentForms[postId]?.trim();
//       if (!commentText) return;

//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         alert('Please login to comment');
//         return;
//       }

//       const response = await axios.post(
//         `${URL}/community/posts/${postId}/comments`,
//         { content: commentText },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setCommentForms(prev => ({ ...prev, [postId]: '' }));
//         alert('Comment added! It will be visible after admin approval.');
//       }
//     } catch (err) {
//       console.error('Error adding comment:', err);
//       alert(err.response?.data?.message || 'Failed to add comment');
//     }
//   };

//   // Flag post
//   const flagPost = async (postId, reason = 'inappropriate') => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         alert('Please login to flag posts');
//         return;
//       }

//       const response = await axios.post(
//         `${URL}/community/posts/${postId}/flag`,
//         { reason },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         alert('Post has been flagged for review');
//       }
//     } catch (err) {
//       console.error('Error flagging post:', err);
//       alert(err.response?.data?.message || 'Failed to flag post');
//     }
//   };

//   // Delete post
//   const deletePost = async (postId) => {
//     if (!window.confirm('Are you sure you want to delete this post?')) return;

//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.delete(`${URL}/community/posts/${postId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setPosts(prev => prev.filter(post => post.id !== postId));
//         alert('Post deleted successfully');
//       }
//     } catch (err) {
//       console.error('Error deleting post:', err);
//       alert(err.response?.data?.message || 'Failed to delete post');
//     }
//   };

//   // Format time ago
//   const formatTimeAgo = (dateString) => {
//     const now = new Date();
//     const postDate = new Date(dateString);
//     const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    
//     if (diffInMinutes < 1) return 'Just now';
//     if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
//     if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
//     return `${Math.floor(diffInMinutes / 1440)}d ago`;
//   };

//   // Handle search with debouncing
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchPosts(true);
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchTerm, selectedFilter]);

//   useEffect(() => {
//     fetchPosts(true);
//   }, []);

//   const loadMorePosts = () => {
//     if (pagination.page < pagination.pages) {
//       setPagination(prev => ({ ...prev, page: prev.page + 1 }));
//       fetchPosts();
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Mobile-Responsive Header */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Coach Community</h1>
//           <p className="text-sm lg:text-base text-gray-600">Connect with fellow coaches and share knowledge</p>
//         </div>
        
//         <button
//           onClick={() => setShowCreatePost(!showCreatePost)}
//           className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-3 lg:py-2 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] transition-colors"
//         >
//           <Plus size={16} />
//           Create Post
//         </button>
//       </div>

//       {/* Error Display */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-red-700">{error}</span>
//             <button 
//               onClick={() => setError('')}
//               className="text-red-500 hover:text-red-700"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Mobile-Responsive Coach Categories */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {coachCategories.map((category) => (
//           <div 
//             key={category.id}
//             className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
//           >
//             <div className={`w-10 h-10 lg:w-12 lg:h-12 ${category.color} rounded-lg flex items-center justify-center text-xl lg:text-2xl mb-3`}>
//               {category.icon}
//             </div>
//             <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">{category.title}</h3>
//             <p className="text-xs lg:text-sm text-gray-600 mb-2 line-clamp-2">{category.description}</p>
//             <span className="text-xs text-gray-500">{category.count}</span>
//           </div>
//         ))}
//       </div>

//       {/* Mobile-Responsive Filters and Search */}
//       <div className="flex flex-col gap-4 items-stretch mb-6">
//         {/* Mobile Filter Buttons */}
//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {filterOptions.map(option => (
//             <button
//               key={option.value}
//               onClick={() => setSelectedFilter(option.value)}
//               className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors text-sm ${
//                 selectedFilter === option.value
//                   ? 'bg-[#7042D2] text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="text"
//             placeholder="Search posts..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         {/* Refresh Button */}
//         <button
//           onClick={() => fetchPosts(true)}
//           className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <RefreshCw size={16} />
//           Refresh
//         </button>
//       </div>

//       {/* Mobile-Responsive Create Post Form */}
//       {showCreatePost && (
//         <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 mb-6">
//           <h3 className="text-lg font-semibold mb-4">Share Your Coaching Knowledge</h3>
          
//           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
//             <p className="text-sm text-yellow-700">
//               📝 Your post will be reviewed by our moderators before appearing in the community.
//             </p>
//           </div>
          
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Post title..."
//               value={newPost.title}
//               onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
//               className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />

//             <select
//               value={newPost.type}
//               onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value }))}
//               className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               {postTypes.map(type => (
//                 <option key={type.value} value={type.value}>
//                   {type.icon} {type.label}
//                 </option>
//               ))}
//             </select>

//             <textarea
//               placeholder="Share your coaching insights, ask questions, or start a discussion..."
//               value={newPost.content}
//               onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
//               rows={4}
//               className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
//             />

//             <div className="flex flex-col sm:flex-row gap-2">
//               <button
//                 onClick={createPost}
//                 className="flex-1 px-4 py-3 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] transition-colors"
//               >
//                 Share Post
//               </button>
//               <button
//                 onClick={() => setShowCreatePost(false)}
//                 className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile-Responsive Posts List */}
//       <div className="space-y-4 lg:space-y-6">
//         {posts.map((post) => (
//           <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
//             {/* Post Header */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3 flex-1 min-w-0">
//                 <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <User size={16} className="lg:w-5 lg:h-5 text-purple-600" />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <h4 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
//                     {post.User ? `${post.User.firstName} ${post.User.lastName}` : 'Anonymous Coach'}
//                   </h4>
//                   <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
//                     <Clock size={10} className="lg:w-3 lg:h-3" />
//                     {formatTimeAgo(post.createdAt)}
//                     <span className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
//                       {postTypes.find(t => t.value === post.type)?.icon} {post.type}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Post Actions Menu */}
//               <div className="relative">
//                 <button className="p-1 hover:bg-gray-100 rounded">
//                   <MoreVertical size={16} />
//                 </button>
//               </div>
//             </div>

//             {/* Post Content */}
//             <div className="mb-4">
//               <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
//               <p className="text-gray-700 whitespace-pre-wrap text-sm lg:text-base">{post.content}</p>
              
//               {/* Post Tags */}
//               {post.tags && post.tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {post.tags.map((tag, index) => (
//                     <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Post Stats and Actions */}
//             <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//               <div className="flex items-center gap-4 lg:gap-6">
//                 <button
//                   onClick={() => voteOnPost(post.id, 'upvote')}
//                   className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
//                 >
//                   <ThumbsUp size={14} className="lg:w-4 lg:h-4" />
//                   <span className="text-xs lg:text-sm">{post.upvotes || 0}</span>
//                 </button>

//                 <button
//                   onClick={() => voteOnPost(post.id, 'downvote')}
//                   className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"
//                 >
//                   <ThumbsDown size={14} className="lg:w-4 lg:h-4" />
//                   <span className="text-xs lg:text-sm">{post.downvotes || 0}</span>
//                 </button>

//                 <div className="flex items-center gap-1 text-gray-500">
//                   <Eye size={14} className="lg:w-4 lg:h-4" />
//                   <span className="text-xs lg:text-sm">{post.viewCount || 0} views</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button 
//                   onClick={() => sharePost(post.id)}
//                   className="flex items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors"
//                 >
//                   <Share size={14} className="lg:w-4 lg:h-4" />
//                   <span className="text-xs lg:text-sm">{post.shareCount || 0}</span>
//                 </button>
                
//                 {post.User?.id !== user?.id && (
//                   <button 
//                     onClick={() => flagPost(post.id)}
//                     className="p-2 text-gray-400 hover:text-red-500 transition-colors"
//                     title="Flag inappropriate content"
//                   >
//                     <Flag size={14} className="lg:w-4 lg:h-4" />
//                   </button>
//                 )}
                
//                 {post.User?.id === user?.id && (
//                   <button 
//                     onClick={() => deletePost(post.id)}
//                     className="p-2 text-gray-400 hover:text-red-500 transition-colors"
//                     title="Delete post"
//                   >
//                     <Trash2 size={14} className="lg:w-4 lg:h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Mobile-Responsive Comment Form */}
//             {showComments[post.id] && (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="flex gap-3">
//                   <div className="w-6 h-6 lg:w-8 lg:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <User size={12} className="lg:w-4 lg:h-4 text-purple-600" />
//                   </div>
//                   <div className="flex-1 flex flex-col sm:flex-row gap-2">
//                     <input
//                       type="text"
//                       placeholder="Add a comment..."
//                       value={commentForms[post.id] || ''}
//                       onChange={(e) => setCommentForms(prev => ({ ...prev, [post.id]: e.target.value }))}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                       onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
//                     />
//                     <button
//                       onClick={() => addComment(post.id)}
//                       className="px-4 py-2 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] transition-colors"
//                     >
//                       <Send size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Loading State */}
//       {loading && posts.length === 0 && (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && posts.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
//           <p className="text-gray-500 mb-4 px-4">
//             {searchTerm ? 'Try adjusting your search terms' : 'Be the first to start a coaching discussion!'}
//           </p>
//           <button 
//             onClick={() => setShowCreatePost(true)}
//             className="bg-[#7042D2] text-white px-6 py-3 rounded-lg hover:bg-[#5a359e] transition-colors"
//           >
//             Create Your First Post
//           </button>
//         </div>
//       )}

//       {/* Mobile-Responsive Load More */}
//       {pagination.page < pagination.pages && (
//         <div className="text-center mt-8">
//           <button
//             onClick={loadMorePosts}
//             disabled={loading}
//             className="w-full lg:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//           >
//             {loading ? 'Loading...' : 'Load More Posts'}
//           </button>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Community;







// pages/Community.jsx - FIXED Coach Community with Working Posts and Comments
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Heart,
  MessageCircle,
  Share,
  MoreVertical,
  TrendingUp,
  Clock,
  User,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Send,
  Edit,
  Trash2,
  Flag,
  RefreshCw,
  Eye,
  BookOpen,
  Users,
  Target,
  Award,
  ChevronDown,
  X,
  MessageCircleMore
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';

// Create Post Modal Component - Mobile Responsive
const CreatePostModal = ({
  showCreatePost,
  setShowCreatePost,
  newPost,
  setNewPost,
  createPost
}) => {
  const postTypes = [
    { value: 'discussion', label: 'Discussion', icon: '💬' },
    { value: 'question', label: 'Question', icon: '❓' },
    { value: 'tip', label: 'Training Tip', icon: '💡' },
    { value: 'review', label: 'Review', icon: '⭐' }
  ];

  if (!showCreatePost) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h3 className="text-lg font-semibold">Share Your Coaching Knowledge</h3>
          <button onClick={() => setShowCreatePost(false)}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <p className="text-sm text-yellow-700">
              📝 Your post will be reviewed by our moderators before appearing in the community.
            </p>
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
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newPost.type}
                onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {postTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Share your coaching insights, ask questions, or start a discussion..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={newPost.tags.join(', ')}
                onChange={(e) => setNewPost(prev => ({ 
                  ...prev, 
                  tags: e.target.value ? e.target.value.split(',').map(tag => tag.trim()) : [] 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="coaching, training, tips"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={createPost}
                className="w-full sm:w-auto bg-[#7042D2] text-white px-6 py-2 rounded-lg hover:bg-[#5a359e] transition-colors flex items-center justify-center"
              >
                <Send size={16} className="mr-2" />
                Share Post
              </button>
              <button
                onClick={() => setShowCreatePost(false)}
                className="w-full sm:w-auto border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comment Modal Component - Mobile Responsive
const CommentModal = ({
  showComments,
  setShowComments,
  post,
  commentText,
  setCommentText,
  onAddComment,
  comments = []
}) => {
  if (!showComments) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold">Comments</h3>
          <button onClick={() => setShowComments(false)}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Post Summary */}
        <div className="p-4 border-b bg-gray-50 flex-shrink-0">
          <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">{post?.title}</h4>
          <p className="text-xs text-gray-600 line-clamp-2">{post?.content}</p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4 pb-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-xs font-bold">
                      {comment.User?.firstName?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {comment.User?.firstName} {comment.User?.lastName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="p-4 border-t bg-gray-50 flex-shrink-0">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 mb-3">
            <p className="text-xs text-yellow-700">
              💭 Your comment will be reviewed before appearing.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 text-xs font-bold">You</span>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && onAddComment()}
              />
              <button
                onClick={onAddComment}
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Create post form state
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'discussion',
    tags: []
  });

  // Comment state
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState([]);

  const filterOptions = [
    { value: 'recent', label: 'Recent', sortBy: 'recent' },
    { value: 'popular', label: 'Popular', sortBy: 'popular' },
    { value: 'comments', label: 'Most Discussed', sortBy: 'comments' }
  ];

  // Coach-specific community categories
  const coachCategories = [
    {
      id: 1,
      title: 'Training Techniques',
      description: 'Share and discover effective training methods.',
      color: 'bg-blue-600',
      icon: '🏃‍♂️',
      count: '1.2k posts'
    },
    {
      id: 2,
      title: 'Player Development',
      description: 'Discuss strategies for developing players.',
      color: 'bg-green-600',
      icon: '📈',
      count: '856 posts'
    },
    {
      id: 3,
      title: 'Sports Psychology',
      description: 'Mental training and psychological aspects.',
      color: 'bg-purple-600',
      icon: '🧠',
      count: '642 posts'
    },
    {
      id: 4,
      title: 'Equipment & Gear',
      description: 'Reviews and recommendations for gear.',
      color: 'bg-orange-600',
      icon: '⚽',
      count: '423 posts'
    },
    {
      id: 5,
      title: 'Coaching Business',
      description: 'Business aspects of professional coaching.',
      color: 'bg-cyan-600',
      icon: '💼',
      count: '789 posts'
    },
    {
      id: 6,
      title: 'Nutrition & Health',
      description: 'Athlete nutrition and health management.',
      color: 'bg-red-600',
      icon: '🥗',
      count: '567 posts'
    }
  ];

  // Fetch posts - FIXED API endpoint
  const fetchPosts = async (resetPagination = false) => {
    try {
      setLoading(true);
      setError('');
      
      const currentPage = resetPagination ? 1 : pagination.page;
      const selectedFilterObj = filterOptions.find(f => f.value === selectedFilter);
      
      const params = {
        page: currentPage,
        limit: pagination.limit,
        sortBy: selectedFilterObj?.sortBy || 'recent'
      };

      if (searchTerm) params.search = searchTerm;

      // FIXED: Correct API endpoint
      const response = await axios.get(`${URL}/community/posts`, { params });
      
      if (response.data.success) {
        if (resetPagination) {
          setPosts(response.data.data);
          setPagination(response.data.pagination);
        } else {
          setPosts(prev => [...prev, ...response.data.data]);
          setPagination(response.data.pagination);
        }
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load community posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments for a post
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${URL}/community/posts/${postId}`);
      if (response.data.success) {
        setPostComments(response.data.data.Comments || []);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  // Open comments modal
  const openComments = async (post) => {
    setSelectedPost(post);
    setShowComments(true);
    await fetchComments(post.id);
  };

  // Create post - FIXED API endpoint
  const createPost = async () => {
    try {
      if (!newPost.title.trim() || !newPost.content.trim()) {
        alert('Please fill in title and content');
        return;
      }

      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to create posts');
        return;
      }

      // FIXED: Correct API endpoint
      const response = await axios.post(`${URL}/community/posts`, newPost, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setNewPost({ title: '', content: '', type: 'discussion', tags: [] });
        setShowCreatePost(false);
        alert('Post created successfully! It will be visible after admin approval.');
        fetchPosts(true);
      }
    } catch (err) {
      console.error('Error creating post:', err);
      alert(err.response?.data?.message || 'Failed to create post');
    }
  };

  // Add comment - FIXED
  const addComment = async () => {
    try {
      if (!commentText.trim()) return;

      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Please login to comment');
        return;
      }

      const response = await axios.post(
        `${URL}/community/posts/${selectedPost.id}/comments`,
        { content: commentText },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCommentText('');
        alert('Comment added! It will be visible after admin approval.');
        await fetchComments(selectedPost.id);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.response?.data?.message || 'Failed to add comment');
    }
  };

  // Vote on post - FIXED API endpoint
  const voteOnPost = async (postId, type) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Please login to vote');
        return;
      }

      const response = await axios.post(
        `${URL}/community/posts/${postId}/vote`,
        { type },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setPosts(prev => prev.map(post => {
          if (post.id === postId) {
            const updatedPost = { ...post };
            if (response.data.data.removed) {
              if (type === 'upvote') {
                updatedPost.upvotes = Math.max(0, (updatedPost.upvotes || 0) - 1);
              } else {
                updatedPost.downvotes = Math.max(0, (updatedPost.downvotes || 0) - 1);
              }
            } else {
              if (type === 'upvote') {
                updatedPost.upvotes = (updatedPost.upvotes || 0) + 1;
                if (response.data.data.changed) {
                  updatedPost.downvotes = Math.max(0, (updatedPost.downvotes || 0) - 1);
                }
              } else {
                updatedPost.downvotes = (updatedPost.downvotes || 0) + 1;
                if (response.data.data.changed) {
                  updatedPost.upvotes = Math.max(0, (updatedPost.upvotes || 0) - 1);
                }
              }
            }
            return updatedPost;
          }
          return post;
        }));
      }
    } catch (err) {
      console.error('Error voting on post:', err);
      alert(err.response?.data?.message || 'Failed to vote');
    }
  };

  // Share post - FIXED API endpoint
  const sharePost = async (postId, platform = 'general') => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Please login to share posts');
        return;
      }

      const response = await axios.post(
        `${URL}/community/posts/${postId}/share`,
        { platform },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, shareCount: (post.shareCount || 0) + 1 }
            : post
        ));
        alert('Post shared successfully!');
      }
    } catch (err) {
      console.error('Error sharing post:', err);
      alert(err.response?.data?.message || 'Failed to share post');
    }
  };

  // Flag post - FIXED API endpoint
  const flagPost = async (postId, reason = 'inappropriate') => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Please login to flag posts');
        return;
      }

      const response = await axios.post(
        `${URL}/community/posts/${postId}/flag`,
        { reason },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Post has been flagged for review');
      }
    } catch (err) {
      console.error('Error flagging post:', err);
      alert(err.response?.data?.message || 'Failed to flag post');
    }
  };

  // Delete post - FIXED API endpoint
  const deletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(`${URL}/community/posts/${postId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setPosts(prev => prev.filter(post => post.id !== postId));
        alert('Post deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert(err.response?.data?.message || 'Failed to delete post');
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedFilter]);

  useEffect(() => {
    fetchPosts(true);
  }, []);

  const loadMorePosts = () => {
    if (pagination.page < pagination.pages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
      fetchPosts();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile-Responsive Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Coach Community</h1>
          <p className="text-sm lg:text-base text-gray-600">Connect with fellow coaches and share knowledge</p>
        </div>
        
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-3 lg:py-2 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a359e] transition-colors"
        >
          <Plus size={16} />
          Create Post
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-700">{error}</span>
            <button 
              onClick={() => setError('')}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile-Responsive Coach Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {coachCategories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className={`w-10 h-10 lg:w-12 lg:h-12 ${category.color} rounded-lg flex items-center justify-center text-xl lg:text-2xl mb-3`}>
              {category.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">{category.title}</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2 line-clamp-2">{category.description}</p>
            <span className="text-xs text-gray-500">{category.count}</span>
          </div>
        ))}
      </div>

      {/* Mobile-Responsive Filters and Search */}
      <div className="flex flex-col gap-4 items-stretch mb-6">
        {/* Mobile Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors text-sm ${
                selectedFilter === option.value
                  ? 'bg-[#7042D2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => fetchPosts(true)}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Mobile-Responsive Posts List */}
      <div className="space-y-4 lg:space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="lg:w-5 lg:h-5 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                    {post.User ? `${post.User.firstName} ${post.User.lastName}` : 'Anonymous Coach'}
                  </h4>
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                    <Clock size={10} className="lg:w-3 lg:h-3" />
                    {formatTimeAgo(post.createdAt)}
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                      {post.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Actions Menu */}
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-700 whitespace-pre-wrap text-sm lg:text-base">{post.content}</p>
              
              {/* Post Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Stats and Actions */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4 lg:gap-6">
                <button
                  onClick={() => voteOnPost(post.id, 'upvote')}
                  className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
                >
                  <ThumbsUp size={14} className="lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm">{post.upvotes || 0}</span>
                </button>

                <button
                  onClick={() => openComments(post)}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <MessageCircleMore size={14} className="lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm">{post.commentCount || 0} Comments</span>
                </button>

                <div className="flex items-center gap-1 text-gray-500">
                  <Eye size={14} className="lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm">{post.viewCount || 0} views</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => sharePost(post.id)}
                  className="flex items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Share size={14} className="lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm">{post.shareCount || 0}</span>
                </button>
                
                {post.User?.id !== user?.id && (
                  <button 
                    onClick={() => flagPost(post.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Flag inappropriate content"
                  >
                    <Flag size={14} className="lg:w-4 lg:h-4" />
                  </button>
                )}
                
                {post.User?.id === user?.id && (
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete post"
                  >
                    <Trash2 size={14} className="lg:w-4 lg:h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && posts.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4 px-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Be the first to start a coaching discussion!'}
          </p>
          <button 
            onClick={() => setShowCreatePost(true)}
            className="bg-[#7042D2] text-white px-6 py-3 rounded-lg hover:bg-[#5a359e] transition-colors"
          >
            Create Your First Post
          </button>
        </div>
      )}

      {/* Mobile-Responsive Load More */}
      {pagination.page < pagination.pages && (
        <div className="text-center mt-8">
          <button
            onClick={loadMorePosts}
            disabled={loading}
            className="w-full lg:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Posts'}
          </button>
        </div>
      )}

      {/* Modals */}
      <CreatePostModal
        showCreatePost={showCreatePost}
        setShowCreatePost={setShowCreatePost}
        newPost={newPost}
        setNewPost={setNewPost}
        createPost={createPost}
      />
      
      <CommentModal
        showComments={showComments}
        setShowComments={setShowComments}
        post={selectedPost}
        commentText={commentText}
        setCommentText={setCommentText}
        onAddComment={addComment}
        comments={postComments}
      />
    </div>
  );
};

export default Community;