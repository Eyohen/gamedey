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
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningLine,
  RiUserLine,
  RiPhoneLine
} from 'react-icons/ri';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import authpic from '../../assets/authpic.png';
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
    specialties: '',
    certifications: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
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
    if (!formData.specialties.trim()) {
      setError('At least one specialty is required');
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
      // Prepare data for API
      const registrationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim(),
        bio: formData.bio.trim(),
        experience: parseInt(formData.experience) || 0,
        hourlyRate: parseFloat(formData.hourlyRate) || 0,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
        certifications: formData.certifications.split(',').map(s => s.trim()).filter(s => s)
      };

      // Call registration API
      const response = await axios.post(`${URL}/auth/register/coach`, registrationData);

      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Log the user in automatically
        login(user, token);
        
        // Navigate to dashboard
        navigate("/dashboard");
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
                    <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-1">
                      Specialties
                    </label>
                    <input
                      id="specialties"
                      name="specialties"
                      type="text"
                      required
                      value={formData.specialties}
                      onChange={handleChange}
                      className="block w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="e.g., Football, Basketball, Fitness Training"
                      disabled={isLoading}
                    />
                    <p className="mt-1 text-xs text-gray-500">Separate multiple specialties with commas</p>
                  </div>

                  <div>
                    <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
                      Certifications (Optional)
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