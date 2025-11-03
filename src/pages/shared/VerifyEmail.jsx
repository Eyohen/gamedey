import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url';
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiMailLine,
  RiRefreshLine,
  RiLoader4Line
} from 'react-icons/ri';
import logo from '../../assets/logo.png';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from URL query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);

  // Verify email token on component mount
  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setStatus('error');
      setMessage('Verification token is missing. Please check your email link and try again.');
    }
  }, [token]);

  // Verify the token with the server
  const verifyToken = async () => {
    try {
      const response = await axios.post(`${URL}/auth/verify-email`, {
        token: token
      });

      if (response.data && response.data.success) {
        setStatus('success');
        setMessage(response.data.message || 'Your email has been successfully verified!');

        // Extract user information from response
        const userData = response.data.data;
        if (userData) {
          setUserType(userData.userType);
          if (userData.user) {
            setUserName(userData.user.firstName);
          }
        }

        // Redirect to login page after 5 seconds
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');

      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Email verification failed. The link may have expired.');
      } else {
        setMessage('Network error. Please check your connection and try again.');
      }
    }
  };

  // Handle resend verification email
  const handleResendVerification = async () => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsResending(true);

    try {
      const response = await axios.post(`${URL}/auth/resend-verification`, {
        email
      });

      if (response.data && response.data.success) {
        setResendSuccess(true);
        setMessage('Verification email has been resent. Please check your inbox.');
      }
    } catch (error) {
      console.error('Resend verification error:', error);

      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Failed to resend verification email. Please try again.');
      } else {
        setMessage('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} className="h-12 object-contain" alt="GameDey Logo" />
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Email Verification
        </h2>

        {/* Status Messages */}
        <div className="mt-4">
          {status === 'verifying' && (
            <div className="flex flex-col items-center justify-center py-8">
              <RiLoader4Line className="animate-spin h-12 w-12 text-[#7042D2] mb-4" />
              <p className="text-gray-600 text-lg">Verifying your email...</p>
              <p className="text-gray-500 text-sm mt-2">This will only take a moment</p>
            </div>
          )}

          {status === 'success' && (
            <div className="rounded-lg bg-green-50 p-6 text-center border-2 border-green-200">
              <div className="flex justify-center mb-3">
                <RiCheckboxCircleFill className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {userName ? `Welcome, ${userName}!` : 'Verification Successful!'}
              </h3>
              <p className="text-sm text-green-700 mb-4">{message}</p>

              {userType && (
                <div className="mb-4 px-4 py-3 bg-white rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700">
                    Your <span className="font-semibold text-[#7042D2] capitalize">{userType}</span> account has been activated.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    You can now login with your credentials to access your dashboard.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                <RiLoader4Line className="animate-spin h-4 w-4" />
                <p className="text-sm font-medium">Redirecting you to login page...</p>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-2 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a2eb8] font-medium transition-colors"
              >
                Go to Login Now
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-lg bg-red-50 p-6 text-center border-2 border-red-200">
              <div className="flex justify-center mb-3">
                <RiErrorWarningFill className="h-16 w-16 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">Verification Failed</h3>
              <p className="text-sm text-red-700 mb-6">{message}</p>

              {/* Resend verification section */}
              {!resendSuccess && (
                <div className="mt-6 border-t border-red-200 pt-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    <RiMailLine className="text-[#7042D2]" />
                    Resend Verification Email
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your email address to receive a new verification link:
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2] focus:border-transparent"
                      placeholder="your-email@example.com"
                    />
                    <button
                      onClick={handleResendVerification}
                      disabled={isResending}
                      className="w-full px-4 py-3 bg-[#7042D2] text-white rounded-lg hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-colors"
                    >
                      {isResending ? (
                        <>
                          <RiLoader4Line className="animate-spin h-5 w-5" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <RiRefreshLine className="h-5 w-5" />
                          <span>Resend Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Resend success message */}
              {resendSuccess && (
                <div className="mt-6 rounded-lg bg-green-50 p-4 border border-green-200">
                  <div className="flex items-center justify-center gap-2">
                    <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                    <p className="text-sm font-medium text-green-800">
                      Verification email has been resent. Please check your inbox.
                    </p>
                  </div>
                </div>
              )}

              {/* Link to login page */}
              <div className="mt-6">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] transition-colors"
                >
                  Return to Login
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help text */}
        {status !== 'success' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{' '}
              <a href="/support" className="font-medium text-[#7042D2] hover:text-[#5a2eb8]">
                Contact Support
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
