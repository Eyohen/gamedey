// // pages/Register.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   RiMailLine,
//   RiLockLine,
//   RiEyeLine,
//   RiEyeOffLine,
//   RiErrorWarningLine,
//   RiUserLine,
//   RiPhoneLine
// } from 'react-icons/ri';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';
// import authpic from '../../assets/authpic.png';
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
//     specialties: '',
//     certifications: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setError(''); // Clear error when user types
//   };

//   const validateStep1 = () => {
//     if (!formData.firstName.trim()) {
//       setError('First name is required');
//       return false;
//     }
//     if (!formData.lastName.trim()) {
//       setError('Last name is required');
//       return false;
//     }
//     if (!formData.email.trim()) {
//       setError('Email is required');
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }
//     if (!formData.password) {
//       setError('Password is required');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     return true;
//   };

//   const validateStep2 = () => {
//     if (!formData.bio.trim()) {
//       setError('Bio is required');
//       return false;
//     }
//     if (!formData.experience) {
//       setError('Years of experience is required');
//       return false;
//     }
//     if (!formData.hourlyRate) {
//       setError('Hourly rate is required');
//       return false;
//     }
//     if (!formData.specialties.trim()) {
//       setError('At least one specialty is required');
//       return false;
//     }
//     return true;
//   };

//   const handleNext = () => {
//     if (currentStep === 1 && validateStep1()) {
//       setCurrentStep(2);
//       setError('');
//     }
//   };

//   const handleBack = () => {
//     if (currentStep === 2) {
//       setCurrentStep(1);
//       setError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (currentStep === 1) {
//       handleNext();
//       return;
//     }

//     if (!validateStep2()) {
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       // Prepare data for API
//       const registrationData = {
//         firstName: formData.firstName.trim(),
//         lastName: formData.lastName.trim(),
//         email: formData.email.trim().toLowerCase(),
//         password: formData.password,
//         phone: formData.phone.trim(),
//         bio: formData.bio.trim(),
//         experience: parseInt(formData.experience) || 0,
//         hourlyRate: parseFloat(formData.hourlyRate) || 0,
//         specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
//         certifications: formData.certifications.split(',').map(s => s.trim()).filter(s => s)
//       };

//       // Call registration API
//       const response = await axios.post(`${URL}/auth/register/coach`, registrationData);

//       if (response.data.success) {
//         const { user, token } = response.data.data;
        
//         // Log the user in automatically
//         login(user, token);
        
//         // Navigate to dashboard
//         navigate("/dashboard");
//       } else {
//         setError(response.data.message || 'Registration failed');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className='flex justify-center gap-x-32'>
//         <div>
//           <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
//             {/* Logo */}
//             <div className="mx-auto flex items-center">
//               <span className="text-white"><img src={logo} className='w-36 object-cover' /></span>
//             </div>

//             <div className='bg-yellow-400 w-[75px] h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mt-9'>
//               <div className='bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center border border-black'>
//                 <LuUserRoundPlus />
//               </div>
//             </div>

//             <h2 className="mt-4 text-3xl font-semibold text-gray-900">
//               Sign Up as A Coach
//             </h2>
//             <p className="mt-1 text-sm text-gray-600 font-medium">
//               Join our platform and start coaching clients
//             </p>

//             {/* Progress Indicator */}
//             <div className="mt-4 flex items-center">
//               <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                 currentStep >= 1 ? 'bg-[#7042D2] text-white' : 'bg-gray-200 text-gray-600'
//               }`}>
//                 1
//               </div>
//               <div className={`flex-1 h-1 mx-2 ${
//                 currentStep >= 2 ? 'bg-[#7042D2]' : 'bg-gray-200'
//               }`}></div>
//               <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                 currentStep >= 2 ? 'bg-[#7042D2] text-white' : 'bg-gray-200 text-gray-600'
//               }`}>
//                 2
//               </div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>Personal Info</span>
//               <span>Coach Details</span>
//             </div>
//           </div>

//           <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Error Display */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-3">
//                   <div className="flex items-center">
//                     <RiErrorWarningLine className="w-5 h-5 text-red-400 mr-2" />
//                     <span className="text-sm text-red-700">{error}</span>
//                   </div>
//                 </div>
//               )}

//               {/* Step 1: Personal Information */}
//               {currentStep === 1 && (
//                 <>
//                   <div className='flex gap-x-4'>
//                     <div className="flex-1">
//                       <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                         First Name
//                       </label>
//                       <div className="mt-1 relative rounded-md shadow-sm">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <RiUserLine className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           id="firstName"
//                           name="firstName"
//                           type="text"
//                           required
//                           value={formData.firstName}
//                           onChange={handleChange}
//                           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="First name"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex-1">
//                       <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                         Last Name
//                       </label>
//                       <div className="mt-1 relative rounded-md shadow-sm">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <RiUserLine className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           id="lastName"
//                           name="lastName"
//                           type="text"
//                           required
//                           value={formData.lastName}
//                           onChange={handleChange}
//                           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Last name"
//                           disabled={isLoading}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email address
//                     </label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <RiMailLine className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         autoComplete="email"
//                         required
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your email"
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                       Phone Number
//                     </label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <RiPhoneLine className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your phone number"
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                       Password
//                     </label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <RiLockLine className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="password"
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         autoComplete="new-password"
//                         required
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your password"
//                         disabled={isLoading}
//                       />
//                       <button
//                         type="button"
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                         onClick={() => setShowPassword(!showPassword)}
//                         disabled={isLoading}
//                       >
//                         {showPassword ? (
//                           <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                         ) : (
//                           <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                       Confirm Password
//                     </label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <RiLockLine className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         type={showConfirmPassword ? "text" : "password"}
//                         autoComplete="new-password"
//                         required
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Confirm your password"
//                         disabled={isLoading}
//                       />
//                       <button
//                         type="button"
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         disabled={isLoading}
//                       >
//                         {showConfirmPassword ? (
//                           <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                         ) : (
//                           <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Step 2: Coach Details */}
//               {currentStep === 2 && (
//                 <>
//                   <div>
//                     <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//                       Bio
//                     </label>
//                     <textarea
//                       id="bio"
//                       name="bio"
//                       rows={3}
//                       required
//                       value={formData.bio}
//                       onChange={handleChange}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Tell us about your coaching experience and philosophy..."
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className='flex gap-x-4'>
//                     <div className="flex-1">
//                       <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                         Years of Experience
//                       </label>
//                       <input
//                         id="experience"
//                         name="experience"
//                         type="number"
//                         min="0"
//                         max="50"
//                         required
//                         value={formData.experience}
//                         onChange={handleChange}
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="e.g., 5"
//                         disabled={isLoading}
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
//                         step="100"
//                         required
//                         value={formData.hourlyRate}
//                         onChange={handleChange}
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="e.g., 5000"
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
//                       Specialties
//                     </label>
//                     <input
//                       id="specialties"
//                       name="specialties"
//                       type="text"
//                       required
//                       value={formData.specialties}
//                       onChange={handleChange}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="e.g., Football, Basketball, Fitness Training (comma separated)"
//                       disabled={isLoading}
//                     />
//                     <p className="mt-1 text-xs text-gray-500">Separate multiple specialties with commas</p>
//                   </div>

//                   <div>
//                     <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">
//                       Certifications (Optional)
//                     </label>
//                     <input
//                       id="certifications"
//                       name="certifications"
//                       type="text"
//                       value={formData.certifications}
//                       onChange={handleChange}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="e.g., UEFA License, NASM CPT (comma separated)"
//                       disabled={isLoading}
//                     />
//                     <p className="mt-1 text-xs text-gray-500">Separate multiple certifications with commas</p>
//                   </div>
//                 </>
//               )}

//               {/* Navigation Buttons */}
//               <div className="flex gap-4">
//                 {currentStep === 2 && (
//                   <button
//                     type="button"
//                     onClick={handleBack}
//                     disabled={isLoading}
//                     className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Back
//                   </button>
//                 )}
                
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`${currentStep === 1 ? 'w-full' : 'flex-1'} flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5a359e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] transition-colors ${
//                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       {currentStep === 1 ? 'Processing...' : 'Creating Account...'}
//                     </div>
//                   ) : (
//                     currentStep === 1 ? 'Next' : 'Create Coach Account'
//                   )}
//                 </button>
//               </div>

//               {/* Already have an account */}
//               <p className="mt-2 text-center text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-medium text-purple-400 hover:text-blue-500">
//                   Sign In
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






// pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningLine,
  RiUserLine,
  RiPhoneLine,
  RiUploadCloud2Line,
  RiCloseLine,
  RiInformationLine
} from 'react-icons/ri';
import axios from 'axios';
import { URL } from '../../url';
import authpic from '../../assets/authpic.png';
import logo from '../../assets/logo.png';
import { LuUserRoundPlus } from "react-icons/lu";

const Register = () => {
  const navigate = useNavigate();
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
    certifications: '',
    certificateImage: null,
    country: 'Nigeria',
    state: ''
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
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

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

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.bio.trim()) {
      setError('Bio is required');
      return false;
    }
    if (!formData.experience) {
      setError('Years of experience is required');
      return false;
    }
    if (!formData.hourlyRate) {
      setError('Hourly rate is required');
      return false;
    }
    if (!formData.specialties || formData.specialties.length === 0) {
      setError('Please select at least one sport/specialty');
      return false;
    }
    if (!formData.state) {
      setError('Please select your state');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setError('');
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      handleNext();
      return;
    }

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use FormData for file upload support
      const registrationData = new FormData();
      registrationData.append('firstName', formData.firstName.trim());
      registrationData.append('lastName', formData.lastName.trim());
      registrationData.append('email', formData.email.trim().toLowerCase());
      registrationData.append('password', formData.password);
      registrationData.append('phone', formData.phone.trim());
      registrationData.append('bio', formData.bio.trim());
      registrationData.append('experience', parseInt(formData.experience) || 0);
      registrationData.append('hourlyRate', parseFloat(formData.hourlyRate) || 0);
      registrationData.append('country', formData.country);
      registrationData.append('state', formData.state);

      // Append arrays as JSON strings
      registrationData.append('specialties', JSON.stringify(formData.specialties));
      registrationData.append('certifications', JSON.stringify(
        formData.certifications.split(',').map(s => s.trim()).filter(s => s)
      ));

      // Append certificate image if provided
      if (formData.certificateImage) {
        registrationData.append('certificateImage', formData.certificateImage);
      }

      // Call registration API with multipart/form-data
      const response = await axios.post(`${URL}/auth/register/coach`, registrationData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Don't log in automatically - user must verify email first
        // Navigate to login page with verification message
        navigate("/coach/login", {
          state: {
            message: 'Registration successful! Please check your email to verify your account before logging in.',
            email: formData.email
          }
        });
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Container with responsive layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 lg:flex-none lg:w-1/2">
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
                Sign Up as A Coach
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                Join our platform and start coaching clients
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= 1 ? 'bg-[#7042D2] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-3 max-w-[80px] ${
                  currentStep >= 2 ? 'bg-[#7042D2]' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= 2 ? 'bg-[#7042D2] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2 max-w-[200px] mx-auto">
                <span>Personal Info</span>
                <span>Coach Details</span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-center">
                    <RiErrorWarningLine className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
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
                          disabled={isLoading}
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
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

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
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiPhoneLine className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="Enter your phone number"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

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
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        ) : (
                          <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

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
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        ) : (
                          <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Coach Details */}
              {currentStep === 2 && (
                <>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      required
                      value={formData.bio}
                      onChange={handleChange}
                      className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base resize-none"
                      placeholder="Tell us about your coaching experience and philosophy..."
                      disabled={isLoading}
                    />
                  </div>

                  <div className='flex flex-col sm:flex-row gap-4'>
                    <div className="flex-1">
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        id="experience"
                        name="experience"
                        type="number"
                        min="0"
                        max="50"
                        required
                        value={formData.experience}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="e.g., 5"
                        disabled={isLoading}
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
                        step="100"
                        required
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="e.g., 5000"
                        disabled={isLoading}
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
                      <div className="grid grid-cols-2 gap-2">
                        {availableSports.map((sport) => (
                          <label
                            key={sport.id}
                            className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${
                              formData.specialties.includes(sport.name)
                                ? 'border-[#7042D2] bg-purple-50 ring-1 ring-[#7042D2]'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.specialties.includes(sport.name)}
                              onChange={() => !isLoading && handleSportToggle(sport.name)}
                              className="sr-only"
                              disabled={isLoading}
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
                        value={formData.certifications}
                        onChange={handleChange}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="e.g., UEFA License, NASM CPT"
                        disabled={isLoading}
                      />
                      <p className="mt-1 text-xs text-gray-500">Separate multiple certifications with commas</p>
                    </div>

                    {/* Certificate Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certificate Image
                      </label>
                      {!certificatePreview ? (
                        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
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
                        disabled={isLoading}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white disabled:opacity-50"
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
                        disabled={isLoading}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white disabled:opacity-50"
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

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="w-full sm:flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${currentStep === 1 ? 'w-full' : 'w-full sm:flex-1'} flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5a359e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {currentStep === 1 ? 'Processing...' : 'Creating Account...'}
                    </div>
                  ) : (
                    currentStep === 1 ? 'Next' : 'Create Coach Account'
                  )}
                </button>
              </div>

              {/* Already have an account */}
              <p className="text-center text-sm text-gray-600 pt-2">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-purple-400 hover:text-blue-500 transition-colors">
                  Sign In
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