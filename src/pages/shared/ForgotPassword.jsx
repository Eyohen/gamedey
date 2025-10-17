import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMailLine, RiArrowLeftLine, RiCheckLine } from 'react-icons/ri';
import axios from 'axios';
import { URL } from '../../url';
import logo from '../../assets/logo.png';
import authpic from '../../assets/authpic.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${URL}/auth/forgot-password`, { email }, {
        timeout: 50000,
      });

      console.log('Forgot password response:', response.data);

      if (response.status === 200) {
        setSuccess(true);
        // In development, the backend returns the reset URL
        if (response.data.data?.resetUrl) {
          setResetUrl(response.data.data.resetUrl);
        }
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send reset link. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className='flex justify-center gap-x-32'>
          <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
              <div className="mx-auto flex items-center justify-center mb-8">
                <img src={logo} className='w-36 object-cover' alt="Logo" />
              </div>

              <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 border-2 border-black">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <RiCheckLine className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    If you don't see the email, check your spam folder or try again.
                  </p>

                  {/* Show reset URL in development */}
                  {resetUrl && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800 mb-2">
                        <strong>Development Mode:</strong> Use this link to reset your password
                      </p>
                      <a
                        href={resetUrl}
                        className="text-xs text-blue-600 hover:text-blue-800 break-all"
                      >
                        {resetUrl}
                      </a>
                    </div>
                  )}

                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center w-full px-4 py-2 border-2 border-black rounded-lg text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5c35b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] transition-colors"
                  >
                    <RiArrowLeftLine className="mr-2" />
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='hidden lg:block'>
            <img src={authpic} className='w-[500px] h-[600px] object-cover rounded-3xl' alt="Auth" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className='flex justify-center gap-x-32'>
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
            <div className="mx-auto flex items-center justify-center mb-8">
              <img src={logo} className='w-36 object-cover' alt="Logo" />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
              Forgot Password?
            </h2>
            <p className="text-center text-sm text-gray-600 mb-8">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 border-2 border-black">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-md bg-red-50 border border-red-200 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiMailLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2.5 px-4 border-2 border-black rounded-lg shadow-sm text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5c35b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-sm font-medium text-[#7042D2] hover:text-[#5c35b3]"
                  >
                    <RiArrowLeftLine className="mr-1" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='hidden lg:block'>
          <img src={authpic} className='w-[500px] h-[600px] object-cover rounded-3xl' alt="Auth" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
