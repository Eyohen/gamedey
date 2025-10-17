import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { RiLockLine, RiEyeLine, RiEyeOffLine, RiCheckLine } from 'react-icons/ri';
import axios from 'axios';
import { URL } from '../../url';
import logo from '../../assets/logo.png';
import authpic from '../../assets/authpic.png';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${URL}/auth/reset-password`, {
        token,
        newPassword: formData.newPassword
      }, {
        timeout: 50000,
      });

      console.log('Reset password response:', response.data);

      if (response.status === 200) {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      if (err.response?.status === 400) {
        setError('Invalid or expired reset token. Please request a new password reset link.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to reset password. Please try again.');
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Your password has been reset successfully. You can now login with your new password.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Redirecting to login page...
                  </p>

                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center w-full px-4 py-2 border-2 border-black rounded-lg text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5c35b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] transition-colors"
                  >
                    Go to Login
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
              Reset Your Password
            </h2>
            <p className="text-center text-sm text-gray-600 mb-8">
              Enter your new password below
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
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || !token}
                    className="w-full flex justify-center py-2.5 px-4 border-2 border-black rounded-lg shadow-sm text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5c35b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-[#7042D2] hover:text-[#5c35b3]"
                  >
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

export default ResetPassword;
