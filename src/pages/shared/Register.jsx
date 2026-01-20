// //pages/Register
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   RiMailLine,
//   RiLockLine,
//   RiEyeLine,
//   RiEyeOffLine,
//   RiErrorWarningLine,
//   RiUserLine
// } from 'react-icons/ri';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';
// import authpic from '../../assets/authpic.png'
// import logo from '../../assets/logo.png';
// import { LuUserRoundPlus } from "react-icons/lu";

// const Register = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     bio: '',
//     experience: '',
//     hourlyRate: '',
//     specialties: [],
//     certifications: [],
//     facilityName: '',
//     facilityAddress: '',
//     facilityDescription: '',
//     pricePerHour: '',
//     amenities: [],
//     capacity: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedRole, setSelectedRole] = useState('user');

//   const roles = [
//     { id: 'user', label: 'User' },
//     { id: 'facility-owner', label: 'Facility Owner' },
//     { id: 'coach', label: 'Coach' }
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     if (!selectedRole) {
//       setError('Please select your role');
//       return;
//     }

//     // Role-specific validation
//     if (selectedRole === 'coach' && (!formData.bio || !formData.hourlyRate)) {
//       setError('Please fill in bio and hourly rate for coach registration');
//       return;
//     }

//     if (selectedRole === 'facility-owner' && (!formData.facilityName || !formData.facilityAddress)) {
//       setError('Please fill in facility name and address for facility owner registration');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Prepare data based on role
//       let registrationData = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone
//       };

//       if (selectedRole === 'coach') {
//         registrationData = {
//           ...registrationData,
//           bio: formData.bio,
//           experience: parseInt(formData.experience) || 0,
//           hourlyRate: parseFloat(formData.hourlyRate) || 0,
//           specialties: formData.specialties,
//           certifications: formData.certifications
//         };
//       } else if (selectedRole === 'facility-owner') {
//         registrationData = {
//           ...registrationData,
//           facilityName: formData.facilityName,
//           facilityAddress: formData.facilityAddress,
//           facilityDescription: formData.facilityDescription,
//           pricePerHour: parseFloat(formData.pricePerHour) || 0,
//           amenities: formData.amenities,
//           capacity: parseInt(formData.capacity) || 1
//         };
//       }

//       // Determine endpoint based on role
//       const endpoint = selectedRole === 'user' ? '/auth/register' : 
//                      selectedRole === 'coach' ? '/auth/register/coach' :
//                      selectedRole === 'facility-owner' ? '/auth/register/facility' : '/auth/register';

//       console.log('Registration data:', registrationData);
//       console.log('Endpoint:', endpoint);
//       console.log('Full URL:', `${URL}${endpoint}`);

//       const response = await axios.post(`${URL}${endpoint}`, registrationData, {
//         timeout: 50000,
//       });

//       console.log('Full response:', response);
//       console.log('Response data:', response.data);
//       console.log('Response status:', response.status);

//       // Check for successful response
//       if (response.status >= 200 && response.status < 300) {
//         // Handle different response structures
//         let user, token, refreshToken;
        
//         if (response.data && response.data.success) {
//           // Standard format: { success: true, data: { user, token, refreshToken } }
//           const { data } = response.data;
//           user = data.user;
//           token = data.token;
//           refreshToken = data.refreshToken;
//         } else if (response.data && response.data.user) {
//           // Alternative format: { user, token, refreshToken }
//           user = response.data.user;
//           token = response.data.token;
//           refreshToken = response.data.refreshToken;
//         } else {
//           // Fallback: assume the entire response.data is the user
//           user = response.data;
//           console.warn('Unexpected response format, using entire response as user data');
//         }

//         console.log('Extracted user:', user);
//         console.log('Extracted token:', token);

//         if (user) {
//           // Store tokens if available
//           if (token) {
//             localStorage.setItem("access_token", token);
//           }
//           if (refreshToken) {
//             localStorage.setItem("refresh_token", refreshToken);
//           }
          
//           // Update auth context
//           login(user);
          
//           console.log('Registration successful, navigating to explore');
//           navigate("/explore");
//         } else {
//           setError('Registration completed but user data is missing. Please try logging in.');
//         }
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       console.error('Error response:', err.response);
//       console.error('Error response data:', err.response?.data);
      
//       if (err.response?.status === 409) {
//         setError('User already exists with this email');
//       } else if (err.response?.status === 500) {
//         setError('Server error occurred. Please check if the user was created and try logging in.');
//       } else if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else if (err.response?.data?.errors && err.response.data.errors.length > 0) {
//         setError(err.response.data.errors[0].msg);
//       } else {
//         setError('Registration failed. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className='flex justify-center gap-x-32'>
//         <div>
//           <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
//             <div className="mx-auto flex items-center">
//               <span className="text-white"><img src={logo} className='w-36 object-cover' /></span>
//             </div>

//             <div className='bg-yellow-400 w-[75px] h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mt-9'>
//               <div className='bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center border border-black'>
//                 <LuUserRoundPlus />
//               </div>
//             </div>

//             <div className="mt-2 flex items-center gap-x-4">
//               {roles.map((role) => (
//                 <div 
//                   key={role.id}
//                   className="flex items-center space-x-3 cursor-pointer"
//                   onClick={() => setSelectedRole(role.id)}
//                 >
//                   <div className="relative">
//                     <div 
//                       className={`w-5 h-5 rounded-full border-2 transition-colors ${
//                         selectedRole === role.id 
//                           ? 'border-blue-500 bg-blue-50' 
//                           : 'border-gray-300 bg-white'
//                       }`}
//                     >
//                       {selectedRole === role.id && (
//                         <div className="absolute inset-1 bg-blue-500 rounded-full"></div>
//                       )}
//                     </div>
//                   </div>
//                   <label 
//                     className="text-gray-700 cursor-pointer select-none"
//                     onClick={() => setSelectedRole(role.id)}
//                   >
//                     {role.label}
//                   </label>
//                 </div>
//               ))}
//             </div>

//             <h2 className="mt-4 text-3xl font-semibold text-gray-900">
//               Sign Up
//             </h2>
//             <p className="mt-1 text-sm text-gray-600 font-medium">
//               Fill out your details to create your gamedey account
//             </p>
//           </div>

//           <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-3">
//                   <div className="flex items-center">
//                     <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2" />
//                     <span className="text-sm text-red-700">{error}</span>
//                   </div>
//                 </div>
//               )}

//               {/* Name Fields */}
//               <div className='flex gap-x-4'>
//                 <div className="flex-1">
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                     First Name
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <RiUserLine className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="firstName"
//                       name="firstName"
//                       type="text"
//                       required
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="First name"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                     Last Name
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <RiUserLine className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="lastName"
//                       name="lastName"
//                       type="text"
//                       required
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Last name"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <RiMailLine className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//               </div>

//               {/* Coach-specific fields */}
//               {selectedRole === 'coach' && (
//                 <>
//                   <div>
//                     <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//                       Bio
//                     </label>
//                     <div className="mt-1">
//                       <textarea
//                         id="bio"
//                         name="bio"
//                         rows={3}
//                         value={formData.bio}
//                         onChange={handleChange}
//                         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Tell us about yourself..."
//                       />
//                     </div>
//                   </div>

//                   <div className='flex gap-x-4'>
//                     <div className="flex-1">
//                       <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                         Experience (Years)
//                       </label>
//                       <input
//                         id="experience"
//                         name="experience"
//                         type="number"
//                         min="0"
//                         max="50"
//                         value={formData.experience}
//                         onChange={handleChange}
//                         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="0"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
//                         Hourly Rate (₦)
//                       </label>
//                       <input
//                         id="hourlyRate"
//                         name="hourlyRate"
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         required
//                         value={formData.hourlyRate}
//                         onChange={handleChange}
//                         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="5000"
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Facility Owner specific fields */}
//               {selectedRole === 'facility-owner' && (
//                 <>
//                   <div>
//                     <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700">
//                       Facility Name
//                     </label>
//                     <input
//                       id="facilityName"
//                       name="facilityName"
//                       type="text"
//                       required
//                       value={formData.facilityName}
//                       onChange={handleChange}
//                       className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter facility name"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="facilityAddress" className="block text-sm font-medium text-gray-700">
//                       Facility Address
//                     </label>
//                     <textarea
//                       id="facilityAddress"
//                       name="facilityAddress"
//                       rows={2}
//                       required
//                       value={formData.facilityAddress}
//                       onChange={handleChange}
//                       className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter facility address"
//                     />
//                   </div>

//                   <div className='flex gap-x-4'>
//                     <div className="flex-1">
//                       <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700">
//                         Price per Hour (₦)
//                       </label>
//                       <input
//                         id="pricePerHour"
//                         name="pricePerHour"
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         value={formData.pricePerHour}
//                         onChange={handleChange}
//                         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="10000"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
//                         Capacity
//                       </label>
//                       <input
//                         id="capacity"
//                         name="capacity"
//                         type="number"
//                         min="1"
//                         value={formData.capacity}
//                         onChange={handleChange}
//                         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="50"
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Password Fields */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <RiLockLine className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="new-password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     ) : (
//                       <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <RiLockLine className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     autoComplete="new-password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Confirm your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     ) : (
//                       <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5c35a8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isLoading ? 'Signing up...' : 'Sign Up'}
//                 </button>
//               </div>

//               <p className="mt-2 text-center text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-medium text-purple-400 hover:text-blue-500">
//                   Sign in
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>

//         <img src={authpic} className='w-[750px] h-[650px] object-cover rounded-3xl hidden md:block' />
//       </div>
//     </div>
//   );
// };

// export default Register;





//pages/Register
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningLine,
  RiUserLine,
  RiUploadCloud2Line,
  RiCloseLine,
  RiInformationLine
} from 'react-icons/ri';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import authpic from '../../assets/authpic.png'
import logo from '../../assets/logo.png';
import { LuUserRoundPlus } from "react-icons/lu";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bio: '',
    experience: '',
    hourlyRate: '',
    specialties: [],
    certifications: [],
    certificateImage: null,
    country: 'Nigeria',
    state: '',
    facilityName: '',
    facilityAddress: '',
    facilityDescription: '',
    pricePerHour: '',
    amenities: [],
    capacity: ''
  });

  const [certificatePreview, setCertificatePreview] = useState(null);

  // Nigerian states for coach registration
  const nigerianStates = [
    { id: 'abuja', name: 'Abuja' },
    { id: 'lagos', name: 'Lagos' },
    { id: 'portharcourt', name: 'Port Harcourt' },
    { id: 'uyo', name: 'Uyo' }
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [availableSports, setAvailableSports] = useState([]);
  const [sportsLoading, setSportsLoading] = useState(false);

  // Fetch available sports when component mounts
  useEffect(() => {
    const fetchSports = async () => {
      setSportsLoading(true);
      try {
        const response = await axios.get(`${URL}/sports`);
        if (response.data.success) {
          setAvailableSports(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch sports:', err);
        // Fallback to default sports list if API fails
        setAvailableSports([
          { id: '1', name: 'Football', icon: '⚽' },
          { id: '2', name: 'Basketball', icon: '🏀' },
          { id: '3', name: 'Tennis', icon: '🎾' },
          { id: '4', name: 'Volleyball', icon: '🏐' },
          { id: '5', name: 'Swimming', icon: '🏊‍♂️' },
          { id: '6', name: 'Badminton', icon: '🏸' },
          { id: '7', name: 'Table Tennis', icon: '🏓' },
          { id: '8', name: 'Fitness Training', icon: '💪' }
        ]);
      } finally {
        setSportsLoading(false);
      }
    };
    fetchSports();
  }, []);

  const roles = [
    { id: 'user', label: 'User' },
    { id: 'facility-owner', label: 'Facility Owner' },
    { id: 'coach', label: 'Coach' }
  ];

  // Handle sport selection toggle
  const handleSportToggle = (sportName) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(sportName)
        ? prev.specialties.filter(s => s !== sportName)
        : [...prev.specialties, sportName]
    }));
    setError('');
  };

  // Handle certificate image upload
  const handleCertificateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPG, PNG, etc.)');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, certificateImage: file }));
      setCertificatePreview(window.URL.createObjectURL(file));
      setError('');
    }
  };

  // Remove certificate image
  const removeCertificateImage = () => {
    setFormData(prev => ({ ...prev, certificateImage: null }));
    setCertificatePreview(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!selectedRole) {
      setError('Please select your role');
      return;
    }

    // Role-specific validation
    if (selectedRole === 'coach') {
      if (!formData.bio || !formData.hourlyRate) {
        setError('Please fill in bio and hourly rate for coach registration');
        return;
      }
      if (!formData.specialties || formData.specialties.length === 0) {
        setError('Please add at least one specialty/sport for coach registration');
        return;
      }
      if (!formData.state) {
        setError('Please select your state');
        return;
      }
    }

    if (selectedRole === 'facility-owner' && (!formData.facilityName || !formData.facilityAddress)) {
      setError('Please fill in facility name and address for facility owner registration');
      return;
    }

    setIsLoading(true);
    try {
      // Determine endpoint based on role
      const endpoint = selectedRole === 'user' ? '/auth/register' :
                     selectedRole === 'coach' ? '/auth/register/coach' :
                     selectedRole === 'facility-owner' ? '/auth/register/facility' : '/auth/register';

      let response;

      // For coach registration, use FormData to support file upload
      if (selectedRole === 'coach') {
        const registrationFormData = new FormData();
        registrationFormData.append('firstName', formData.firstName.trim());
        registrationFormData.append('lastName', formData.lastName.trim());
        registrationFormData.append('email', formData.email.trim().toLowerCase());
        registrationFormData.append('password', formData.password);
        registrationFormData.append('phone', formData.phone.trim());
        registrationFormData.append('bio', formData.bio.trim());
        registrationFormData.append('experience', parseInt(formData.experience) || 0);
        registrationFormData.append('hourlyRate', parseFloat(formData.hourlyRate) || 0);
        registrationFormData.append('country', formData.country);
        registrationFormData.append('state', formData.state);

        // Append arrays as JSON strings
        registrationFormData.append('specialties', JSON.stringify(formData.specialties));
        registrationFormData.append('certifications', JSON.stringify(
          Array.isArray(formData.certifications)
            ? formData.certifications
            : formData.certifications.split(',').map(s => s.trim()).filter(s => s)
        ));

        // Append certificate image if provided
        if (formData.certificateImage) {
          registrationFormData.append('certificateImage', formData.certificateImage);
        }

        console.log('Registration data (FormData for coach)');
        console.log('Endpoint:', endpoint);
        console.log('Full URL:', `${URL}${endpoint}`);

        response = await axios.post(`${URL}${endpoint}`, registrationFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 50000,
        });
      } else {
        // For user and facility-owner, use regular JSON
        let registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        };

        if (selectedRole === 'facility-owner') {
          registrationData = {
            ...registrationData,
            facilityName: formData.facilityName,
            facilityAddress: formData.facilityAddress,
            facilityDescription: formData.facilityDescription,
            pricePerHour: parseFloat(formData.pricePerHour) || 0,
            amenities: formData.amenities,
            capacity: parseInt(formData.capacity) || 1
          };
        }

        console.log('Registration data:', registrationData);
        console.log('Endpoint:', endpoint);
        console.log('Full URL:', `${URL}${endpoint}`);

        response = await axios.post(`${URL}${endpoint}`, registrationData, {
          timeout: 50000,
        });
      }

      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Response status:', response.status);

      // Check for successful response
      if (response.status >= 200 && response.status < 300) {
        console.log('Registration successful!');

        // Show success message and redirect to login
        // Don't store tokens or login - user must verify email first
        setError(''); // Clear any errors

        // Navigate to a success/verification page with the registered email
        navigate('/login', {
          state: {
            message: 'Registration successful! Please check your email to verify your account before logging in.',
            email: formData.email
          }
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response);
      console.error('Error response data:', err.response?.data);

      // Use the actual error message from backend
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors && err.response.data.errors.length > 0) {
        setError(err.response.data.errors[0].msg);
      } else if (err.response?.status === 409) {
        setError('A user with this email or phone number already exists');
      } else if (err.response?.status === 500) {
        setError('Server error occurred. Please check if the user was created and try logging in.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Container with responsive layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8 lg:flex-none lg:w-1/2">
          <div className="mx-auto w-full max-w-md lg:max-w-sm xl:max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={logo} className='w-24 sm:w-32 lg:w-36 object-cover' alt="Logo" />
            </div>

            {/* Icon and Header */}
            <div className="text-center mb-6">
              <div className='bg-yellow-400 w-16 h-16 sm:w-20 sm:h-20 lg:w-[75px] lg:h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mx-auto mb-4'>
                <div className='bg-white w-8 h-8 sm:w-10 sm:h-10 lg:w-[40px] lg:h-[40px] rounded-full flex justify-center items-center border border-black'>
                  <LuUserRoundPlus className="text-sm sm:text-base" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Sign Up
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                Fill out your details to create your gamedey account
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Select your role:</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {roles.map((role) => (
                  <div 
                    key={role.id}
                    className="flex items-center space-x-3 cursor-pointer p-2 sm:p-0"
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="relative">
                      <div 
                        className={`w-5 h-5 rounded-full border-2 transition-colors ${
                          selectedRole === role.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {selectedRole === role.id && (
                          <div className="absolute inset-1 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <label 
                      className="text-sm sm:text-base text-gray-700 cursor-pointer select-none"
                      onClick={() => setSelectedRole(role.id)}
                    >
                      {role.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-start">
                    <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Name Fields */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiUserLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="First name"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiUserLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiMailLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Coach-specific fields */}
              {selectedRole === 'coach' && (
                <>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base resize-none"
                      placeholder="Tell us about your coaching experience and philosophy..."
                    />
                  </div>

                  <div className='flex flex-col sm:flex-row gap-4'>
                    <div className="flex-1">
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Experience (Years)
                      </label>
                      <input
                        id="experience"
                        name="experience"
                        type="number"
                        min="0"
                        max="50"
                        value={formData.experience}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                        Hourly Rate (₦)
                      </label>
                      <input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialties / Sports *
                    </label>
                    {sportsLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7042D2]"></div>
                        <span className="ml-2 text-sm text-gray-500">Loading sports...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {availableSports.map((sport) => (
                          <label
                            key={sport.id}
                            className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${
                              formData.specialties.includes(sport.name)
                                ? 'border-[#7042D2] bg-purple-50 ring-1 ring-[#7042D2]'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.specialties.includes(sport.name)}
                              onChange={() => handleSportToggle(sport.name)}
                              className="sr-only"
                            />
                            <span className="text-lg">{sport.icon}</span>
                            <span className="text-sm font-medium text-gray-700 truncate">{sport.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {formData.specialties.length > 0 && (
                      <p className="mt-2 text-xs text-[#7042D2]">
                        Selected: {formData.specialties.join(', ')}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">Select the sports you specialize in coaching</p>
                  </div>

                  {/* Certifications Section */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
                        Certifications
                      </label>
                      <input
                        id="certifications"
                        name="certifications"
                        type="text"
                        value={Array.isArray(formData.certifications) ? formData.certifications.join(', ') : formData.certifications}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            certifications: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                          }));
                          setError('');
                        }}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="e.g., UEFA License, NASM CPT, CAF Coaching Badge"
                      />
                      <p className="mt-1 text-xs text-gray-500">Separate multiple certifications with commas</p>
                    </div>

                    {/* Certificate Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certificate Image
                      </label>
                      {!certificatePreview ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <RiUploadCloud2Line className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-1 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> certificate image
                            </p>
                            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleCertificateImageChange}
                          />
                        </label>
                      ) : (
                        <div className="relative">
                          <img
                            src={certificatePreview}
                            alt="Certificate preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={removeCertificateImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <RiCloseLine className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <RiInformationLine className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">
                        <span className="font-semibold">Note:</span> You can skip uploading certifications for now, but your profile will not be visible to users until you upload your certificates and a profile photo. You can complete this later in your profile settings.
                      </p>
                    </div>
                  </div>

                  {/* Country and State */}
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <div className="flex-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
                      >
                        <option value="Nigeria">Nigeria</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <select
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
                      >
                        <option value="">Select your state</option>
                        {nigerianStates.map((state) => (
                          <option key={state.id} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Facility Owner specific fields */}
              {selectedRole === 'facility-owner' && (
                <>
                  <div>
                    <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700 mb-1">
                      Facility Name
                    </label>
                    <input
                      id="facilityName"
                      name="facilityName"
                      type="text"
                      required
                      value={formData.facilityName}
                      onChange={handleChange}
                      className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Enter facility name"
                    />
                  </div>

                  <div>
                    <label htmlFor="facilityAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Facility Address
                    </label>
                    <textarea
                      id="facilityAddress"
                      name="facilityAddress"
                      rows={2}
                      required
                      value={formData.facilityAddress}
                      onChange={handleChange}
                      className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base resize-none"
                      placeholder="Enter facility address"
                    />
                  </div>

                  <div className='flex flex-col sm:flex-row gap-4'>
                    <div className="flex-1">
                      <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700 mb-1">
                        Price per Hour (₦)
                      </label>
                      <input
                        id="pricePerHour"
                        name="pricePerHour"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.pricePerHour}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="10000"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity
                      </label>
                      <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min="1"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="50"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Password Fields */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5c35a8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing up...
                    </div>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>

              {/* Already have an account */}
              <p className="text-center text-sm text-gray-600 pt-2">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-purple-400 hover:text-blue-500 transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-gray-50 p-8">
          <img 
            src={authpic} 
            className='max-w-full max-h-full object-cover rounded-3xl shadow-lg' 
            alt="Authentication illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;