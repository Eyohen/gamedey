// import React from 'react'
// import profilepic from "../assets/profilepic.jpg"

// const Profile = () => {
//   return (
//     <div className='px-6'>
//       <div className='flex gap-3 items-center'>
//         <img src={profilepic} className='rounded-full w-24 h-24 object-cover' />
//         <div>
//           <p className='font-semibold'>Abiodun Ayobami</p>
//           <p className='font-thin'>Role: User</p>
//         </div>
//       </div>

//       <div className='border-b pt-9'></div>

//       <div className='flex gap-32 py-9'>


//         <div>
//           <p className='font-semibold text-lg'>Name</p>
//           <p className='font-normal'>Make changes to your name</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1'>First Name</p>
//             <input placeholder='Austin' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
//           </div>
//           <div>
//             <p className='py-1 pt-3'>Last Name</p>
//             <input placeholder='David' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
//           </div>
//         </div>



//       </div>


//       <div className='border-b '></div>


//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Email Address</p>
//           <p className='font-normal'>Make changes to your email</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1'>Email</p>
//             <input placeholder='abiodunobami@gmail.com' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
//           </div>

//         </div>

//       </div>


//   <div className='border-b '></div>


// <div className='flex gap-24 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Password</p>
//           <p className='font-normal'>Make changes to your password</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1'>Password</p>
//             <input placeholder='*********' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
//           </div>
         
//         </div>


// </div>

// <div className='flex gap-x-6'>
//   <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
//     <button className='bg-[#946BEF] text-white px-12 py-2 rounded-lg'>Save</button>

// </div>

//     </div>
//   )
// }

// export default Profile
















// // Updated Profile.jsx with direct axios integration
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import profilepic from "../assets/profilepic.jpg";

// const Profile = () => {
//   const { user, login } = useAuth(); // Using login to update user data
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     dateOfBirth: '',
//     gender: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Load user profile data
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) return;

//         const response = await axios.get(`${URL}/users/profile`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (response.data.success) {
//           const userData = response.data.data;
//           setFormData({
//             firstName: userData.firstName || '',
//             lastName: userData.lastName || '',
//             email: userData.email || '',
//             phone: userData.phone || '',
//             dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '',
//             gender: userData.gender || '',
//             currentPassword: '',
//             newPassword: '',
//             confirmPassword: ''
//           });
//         }
//       } catch (err) {
//         console.error('Error loading profile:', err);
//         setError('Failed to load profile data');
//       }
//     };

//     if (user) {
//       loadProfile();
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setError('');
//     setSuccess('');
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Validate password fields if changing password
//       if (formData.newPassword || formData.confirmPassword) {
//         if (!formData.currentPassword) {
//           setError('Current password is required to change password');
//           setLoading(false);
//           return;
//         }
//         if (formData.newPassword !== formData.confirmPassword) {
//           setError('New passwords do not match');
//           setLoading(false);
//           return;
//         }
//         if (formData.newPassword.length < 6) {
//           setError('New password must be at least 6 characters long');
//           setLoading(false);
//           return;
//         }
//       }

//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to update profile');
//         setLoading(false);
//         return;
//       }

//       // Prepare update data
//       const updateData = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         phone: formData.phone,
//         dateOfBirth: formData.dateOfBirth,
//         gender: formData.gender
//       };

//       // Add password change if provided
//       if (formData.newPassword) {
//         updateData.currentPassword = formData.currentPassword;
//         updateData.password = formData.newPassword;
//       }

//       const response = await axios.put(`${URL}/users/profile`, updateData, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setSuccess('Profile updated successfully');
//         setIsEditing(false);
        
//         // Update user context with new data
//         login(response.data.data);
        
//         // Clear password fields
//         setFormData(prev => ({
//           ...prev,
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         }));
//       }
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError('Failed to update profile');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setError('');
//     setSuccess('');
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setError('');
//     setSuccess('');
//     // Reset form data to original values
//     if (user) {
//       setFormData({
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
//         gender: user.gender || '',
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//     }
//   };

//   return (
//     <div className='px-6'>
//       {/* Profile Header */}
//       <div className='flex gap-3 items-center mb-6'>
//         <div className="relative">
//           <img 
//             src={user?.profileImage || profilepic} 
//             alt="Profile"
//             className='rounded-full w-24 h-24 object-cover border-2 border-gray-200' 
//           />
//           {isEditing && (
//             <button className="absolute bottom-0 right-0 bg-[#7042D2] text-white rounded-full p-2 hover:bg-[#5c35a8]">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//             </button>
//           )}
//         </div>
//         <div>
//           <p className='font-semibold text-xl'>{user?.firstName} {user?.lastName}</p>
//           <p className='font-thin text-gray-600'>Role: User</p>
//           <p className='text-sm text-gray-500'>Member since {new Date(user?.createdAt).getFullYear()}</p>
//         </div>
//       </div>

//       {/* Success/Error Messages */}
//       {success && (
//         <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-green-700">{success}</span>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       <div className='border-b pt-9'></div>

//       {/* Name Section */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Name</p>
//           <p className='font-normal text-gray-600 max-w-[250px]'>Make changes to your name</p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <p className='py-1 font-medium'>First Name</p>
//             <input 
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder='Enter first name' 
//               className={`px-3 py-2 rounded-2xl border border-gray-500 w-[320px] ${
//                 !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//               }`}
//             />
//           </div>
//           <div>
//             <p className='py-1 font-medium'>Last Name</p>
//             <input 
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder='Enter last name' 
//               className={`px-3 py-2 rounded-2xl border border-gray-500 w-[320px] ${
//                 !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//               }`}
//             />
//           </div>
//         </div>
//       </div>

//       <div className='border-b'></div>

//       {/* Email Section */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Email Address</p>
//           <p className='font-normal text-gray-600 max-w-[250px]'>Your email address (cannot be changed)</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1 font-medium'>Email</p>
//             <input 
//               name="email"
//               value={formData.email}
//               disabled={true}
//               placeholder='email@example.com' 
//               className='px-3 py-2 rounded-2xl border border-gray-500 w-[320px] bg-gray-100 cursor-not-allowed'
//             />
//           </div>
//         </div>
//       </div>

//       <div className='border-b'></div>

//       {/* Additional Information */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Additional Information</p>
//           <p className='font-normal text-gray-600 max-w-[250px]'>Update your personal details</p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <p className='py-1 font-medium'>Phone Number</p>
//             <input 
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder='Enter phone number' 
//               className={`px-3 py-2 rounded-2xl border border-gray-500 w-[320px] ${
//                 !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//               }`}
//             />
//           </div>
//           <div>
//             <p className='py-1 font-medium'>Date of Birth</p>
//             <input 
//               name="dateOfBirth"
//               type="date"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`px-3 py-2 rounded-2xl border border-gray-500 w-[320px] ${
//                 !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//               }`}
//             />
//           </div>
//           <div>
//             <p className='py-1 font-medium'>Gender</p>
//             <select 
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`px-3 py-2 rounded-2xl border border-gray-500 w-[320px] ${
//                 !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//               }`}
//             >
//               <option value="">Select gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className='border-b'></div>

//       {/* Password Section */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Password</p>
//           <p className='font-normal text-gray-600 max-w-[250px]'>Change your account password</p>
//         </div>

//         <div className="space-y-4">
//           {isEditing && (
//             <>
//               <div>
//                 <p className='py-1 font-medium'>Current Password</p>
//                 <input 
//                   name="currentPassword"
//                   type="password"
//                   value={formData.currentPassword}
//                   onChange={handleChange}
//                   placeholder='Enter current password' 
//                   className='px-3 py-2 rounded-2xl border border-gray-500 w-[320px]'
//                 />
//               </div>
//               <div>
//                 <p className='py-1 font-medium'>New Password</p>
//                 <input 
//                   name="newPassword"
//                   type="password"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   placeholder='Enter new password' 
//                   className='px-3 py-2 rounded-2xl border border-gray-500 w-[320px]'
//                 />
//               </div>
//               <div>
//                 <p className='py-1 font-medium'>Confirm New Password</p>
//                 <input 
//                   name="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder='Confirm new password' 
//                   className='px-3 py-2 rounded-2xl border border-gray-500 w-[320px]'
//                 />
//               </div>
//             </>
//           )}
          
//           {!isEditing && (
//             <div>
//               <p className='py-1 font-medium'>Password</p>
//               <input 
//                 type="password"
//                 value="********"
//                 disabled={true}
//                 className='px-3 py-2 rounded-2xl border border-gray-500 w-[320px] bg-gray-100 cursor-not-allowed'
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className='flex gap-x-6 pb-8'>
//         {!isEditing ? (
//           <button 
//             onClick={handleEdit}
//             className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg hover:bg-[#946BEF] hover:text-white transition-colors'
//           >
//             Edit
//           </button>
//         ) : (
//           <>
//             <button 
//               onClick={handleCancel}
//               className='border-2 border-gray-400 text-gray-600 px-12 py-2 rounded-lg hover:bg-gray-100 transition-colors'
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={handleSave}
//               disabled={loading}
//               className={`bg-[#946BEF] text-white px-12 py-2 rounded-lg hover:bg-[#7a3bc7] transition-colors ${
//                 loading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? 'Saving...' : 'Save'}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;








import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Shield,
  Bell,
  CreditCard,
  UserCheck,
  Star,
  Trophy
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    reviewsGiven: 0,
    avgRating: 0
  });
  
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: {
      city: '',
      state: '',
      country: ''
    },
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false
    }
  });

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view profile');
        return;
      }

      const response = await axios.get(`${URL}/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        const profileData = response.data.data;
        setProfile(profileData);
        
        // Initialize edit form with current data
        setEditForm({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          phone: profileData.phone || '',
          dateOfBirth: profileData.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : '',
          gender: profileData.gender || '',
          location: {
            city: profileData.location?.city || '',
            state: profileData.location?.state || '',
            country: profileData.location?.country || 'Nigeria'
          },
          preferences: {
            notifications: profileData.preferences?.notifications ?? true,
            emailUpdates: profileData.preferences?.emailUpdates ?? true,
            smsUpdates: profileData.preferences?.smsUpdates ?? false
          }
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user stats
  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      // Fetch bookings
      const bookingsResponse = await axios.get(`${URL}/users/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Fetch reviews
      const reviewsResponse = await axios.get(`${URL}/users/reviews`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (bookingsResponse.data.success && reviewsResponse.data.success) {
        const bookings = bookingsResponse.data.data;
        const reviews = reviewsResponse.data.data;
        
        const completedBookings = bookings.filter(b => b.status === 'completed');
        
        // Calculate average rating received (if user is a coach/facility owner)
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
          : 0;

        setStats({
          totalBookings: bookings.length,
          completedBookings: completedBookings.length,
          reviewsGiven: reviews.length,
          avgRating: avgRating.toFixed(1)
        });
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  };

  // Update profile
  const updateProfile = async () => {
    try {
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('access_token');
      const response = await axios.put(`${URL}/users/profile`, editForm, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setProfile(response.data.data);
        setUser(response.data.data); // Update auth context
        setEditing(false);
        setSuccess('Profile updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditing(false);
    setError('');
    
    // Reset form to current profile data
    if (profile) {
      setEditForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
        gender: profile.gender || '',
        location: {
          city: profile.location?.city || '',
          state: profile.location?.state || '',
          country: profile.location?.country || 'Nigeria'
        },
        preferences: {
          notifications: profile.preferences?.notifications ?? true,
          emailUpdates: profile.preferences?.emailUpdates ?? true,
          smsUpdates: profile.preferences?.smsUpdates ?? false
        }
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  useEffect(() => {
    fetchProfile();
    fetchUserStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
                <Camera size={16} />
              </button>
            </div>

            {/* Profile Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-gray-600 flex items-center mt-1">
                <Mail size={16} className="mr-2" />
                {profile.email}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Member since {formatDate(profile.createdAt)}
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Trophy size={16} className="mr-1 text-yellow-500" />
                  <span>{stats.completedBookings} Completed</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span>{stats.reviewsGiven} Reviews</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UserCheck size={16} className="mr-1 text-green-500" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex space-x-2">
            {editing ? (
              <>
                <button
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.firstName || 'Not provided'}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.lastName || 'Not provided'}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                    <Phone size={16} className="mr-2 text-gray-500" />
                    {profile.phone || 'Not provided'}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                {editing ? (
                  <input
                    type="date"
                    value={editForm.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    {formatDate(profile.dateOfBirth)}
                    {profile.dateOfBirth && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Age: {calculateAge(profile.dateOfBirth)})
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                {editing ? (
                  <select
                    value={editForm.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg capitalize">
                    {profile.gender || 'Not specified'}
                  </p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-600 flex items-center">
                  <Mail size={16} className="mr-2" />
                  {profile.email}
                  <span className="ml-2 text-xs text-green-600">Verified</span>
                </p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.location.city}
                    onChange={(e) => handleInputChange('location.city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {profile.location?.city || 'Not provided'}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.location.state}
                    onChange={(e) => handleInputChange('location.state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {profile.location?.state || 'Not provided'}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                {editing ? (
                  <select
                    value={editForm.location.country}
                    onChange={(e) => handleInputChange('location.country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    {profile.location?.country || 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
            
            <div className="space-y-4">
              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={20} className="mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications about bookings and updates</p>
                  </div>
                </div>
                {editing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.preferences.notifications}
                      onChange={(e) => handleInputChange('preferences.notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.preferences?.notifications ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>

              {/* Email Updates */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail size={20} className="mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email Updates</p>
                    <p className="text-sm text-gray-500">Receive email updates about new features and promotions</p>
                  </div>
                </div>
                {editing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.preferences.emailUpdates}
                      onChange={(e) => handleInputChange('preferences.emailUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.emailUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.preferences?.emailUpdates ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>

              {/* SMS Updates */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone size={20} className="mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">SMS Updates</p>
                    <p className="text-sm text-gray-500">Receive SMS notifications for important updates</p>
                  </div>
                </div>
                {editing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.preferences.smsUpdates}
                      onChange={(e) => handleInputChange('preferences.smsUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.smsUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.preferences?.smsUpdates ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-semibold text-purple-600">{stats.totalBookings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{stats.completedBookings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Reviews Given</span>
                <span className="font-semibold text-blue-600">{stats.reviewsGiven}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold text-gray-900">
                  {new Date(profile.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Email Verified</span>
              </div>
              
              <div className="flex items-center">
                <div className={`w-2 h-2 ${profile.phoneVerified ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-3`}></div>
                <span className="text-sm text-gray-600">
                  Phone {profile.phoneVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Account Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings size={16} className="mr-3" />
                Account Settings
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Shield size={16} className="mr-3" />
                Privacy Settings
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <CreditCard size={16} className="mr-3" />
                Payment Methods
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <X size={16} className="mr-3" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;