// pages/Profile.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import profilepic from "../../assets/profilepic.jpg";
import {
  Save,
  Edit,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Award,
  AlertCircle,
  Check,
  RefreshCw,
  Camera,
  Upload,
  Image as ImageIcon,
  Trash2,
  Loader
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  // File upload ref
  const profileImageRef = useRef(null);

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    experience: '',
    hourlyRate: '',
    specialties: [],
    certifications: [],
    location: {
      city: '',
      state: '',
      country: ''
    }
  });

  // Profile image state
  const [profileImage, setProfileImage] = useState(null);

  // Sports and gallery images state
  const [availableSports, setAvailableSports] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Availability state
  const [availability, setAvailability] = useState({
    Monday: { enabled: false, startTime: '09:00', endTime: '17:00' },
    Tuesday: { enabled: false, startTime: '09:00', endTime: '17:00' },
    Wednesday: { enabled: false, startTime: '09:00', endTime: '17:00' },
    Thursday: { enabled: false, startTime: '09:00', endTime: '17:00' },
    Friday: { enabled: false, startTime: '09:00', endTime: '17:00' },
    Saturday: { enabled: false, startTime: '09:00', endTime: '17:00' },
    Sunday: { enabled: false, startTime: '09:00', endTime: '17:00' }
  });

  // Upload image to Cloudinary
  // const uploadToCloudinary = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', 'coach_profile_images'); // Create this preset in Cloudinary

  //   const response = await axios.post(
  //     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //     formData
  //   );

  //   return response.data.secure_url;
  // };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Use default preset

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  };


  // Handle profile image upload
  const handleProfileImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      setError('');

      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('image', file);

      // Upload using our backend API
      const uploadResponse = await axios.post(`${URL}/upload/image`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResponse.data.success) {
        const imageUrl = uploadResponse.data.data.url;

        // Update coach profile
        const response = await axios.post(`${URL}/coaches/profile/profile-image`, {
          imageUrl
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) {
          setProfileImage(imageUrl);
          setSuccessMessage('Profile photo updated successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      }
    } catch (err) {
      console.error('Error uploading profile image:', err);
      setError('Failed to upload profile photo');
    } finally {
      setUploadingImage(false);
    }
  };

  // Fetch available sports
  const fetchSports = async () => {
    try {
      const response = await axios.get(`${URL}/sports`);
      if (response.data.success) {
        setAvailableSports(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching sports:', err);
    }
  };

  // Update coach sports
  const updateCoachSports = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.put(
        `${URL}/coaches/profile/sports`,
        { sportIds: selectedSports },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccessMessage('Sports updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchProfile(); // Refresh profile data
      }
    } catch (err) {
      console.error('Error updating sports:', err);
      setError(err.response?.data?.message || 'Failed to update sports');
    }
  };

  // Handle gallery images upload
  const handleGalleryUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();

      // Upload multiple images
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });

      // First upload to cloudinary
      const uploadResponse = await axios.post(`${URL}/upload/images`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResponse.data.success) {
        const imageUrls = uploadResponse.data.data.urls;

        // Then save to coach profile
        const saveResponse = await axios.post(
          `${URL}/coaches/profile/gallery-images`,
          { images: imageUrls },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (saveResponse.data.success) {
          setGalleryImages(saveResponse.data.data.galleryImages);
          setSuccessMessage('Gallery images uploaded successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      }
    } catch (err) {
      console.error('Error uploading gallery images:', err);
      setError(err.response?.data?.message || 'Failed to upload gallery images');
    } finally {
      setUploadingGallery(false);
    }
  };

  // Delete gallery image
  const deleteGalleryImage = async (imageUrl) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(
        `${URL}/coaches/profile/gallery-images`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          data: { imageUrl }
        }
      );

      if (response.data.success) {
        setGalleryImages(response.data.data.galleryImages);
        setSuccessMessage('Gallery image deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting gallery image:', err);
      setError(err.response?.data?.message || 'Failed to delete gallery image');
    }
  };

  // Handle sport selection
  const handleSportToggle = (sportId) => {
    setSelectedSports(prev => {
      if (prev.includes(sportId)) {
        return prev.filter(id => id !== sportId);
      } else {
        return [...prev, sportId];
      }
    });
  };

  // Fetch coach profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view profile');
        return;
      }

      const response = await axios.get(`${URL}/coaches/profile/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        const coachData = response.data.data;
        setProfile(coachData);

        // Update form data
        setFormData({
          firstName: coachData.User?.firstName || '',
          lastName: coachData.User?.lastName || '',
          email: coachData.User?.email || '',
          phone: coachData.User?.phone || '',
          bio: coachData.bio || '',
          experience: coachData.experience || '',
          hourlyRate: coachData.hourlyRate || '',
          specialties: coachData.specialties || [],
          certifications: coachData.certifications || [],
          location: coachData.location || { city: '', state: '', country: '' }
        });

        // Update profile image
        setProfileImage(coachData.profileImage || coachData.User?.profileImage);

        // Update availability if exists
        if (coachData.availability) {
          setAvailability(coachData.availability);
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccessMessage('');

      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to update profile');
        return;
      }

      // Update coach profile
      const coachUpdateData = {
        bio: formData.bio,
        experience: parseInt(formData.experience) || 0,
        hourlyRate: parseFloat(formData.hourlyRate) || 0,
        specialties: formData.specialties,
        certifications: formData.certifications,
        location: formData.location,
        availability: availability
      };

      const response = await axios.put(`${URL}/coaches/profile/me`, coachUpdateData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        // Also update sports
        await updateCoachSports();

        setSuccessMessage('Profile updated successfully!');
        setEditMode(false);

        // Update user context if user data changed
        if (formData.firstName !== user?.firstName || formData.lastName !== user?.lastName) {
          updateUser({
            firstName: formData.firstName,
            lastName: formData.lastName
          });
        }

        // Refresh profile data
        await fetchProfile();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle location changes
  const handleLocationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  // Handle specialties changes
  const handleSpecialtiesChange = (value) => {
    const specialties = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({
      ...prev,
      specialties
    }));
  };

  // Handle certifications changes
  const handleCertificationsChange = (value) => {
    const certifications = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({
      ...prev,
      certifications
    }));
  };

  // Toggle availability for a day
  const toggleDay = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  // Update time for a day
  const updateTime = (day, timeType, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value
      }
    }));
  };

  // Generate time options
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, '0');
      times.push(`${hourStr}:00`);
      times.push(`${hourStr}:30`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    fetchProfile();
    fetchSports();
  }, []);

  // Update selected sports and gallery images when profile loads
  useEffect(() => {
    if (profile?.Coach) {
      setSelectedSports(profile.Coach.Sports?.map(s => s.id) || []);
      setGalleryImages(profile.Coach.galleryImages || []);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-6 py-6'>
      {/* Header with Profile Photo */}
      <div className='flex justify-between items-start mb-6'>
        <div className='flex gap-3 items-start'>
          {/* Profile Photo with Upload */}
          <div className="relative group">
            <img
              src={profileImage || profilepic}
              alt="Profile"
              className='rounded-full w-24 h-24 object-cover border-4 border-gray-200'
            />

            {/* Photo Upload Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => profileImageRef.current?.click()}>
              <Camera className="text-white" size={24} />
            </div>

            {/* Upload Indicator */}
            {uploadingImage && (
              <div className="absolute inset-0 bg-black bg-opacity-75 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={profileImageRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleProfileImageUpload(e.target.files[0])}
              className="hidden"
            />
          </div>

          <div>
            <p className='font-semibold text-xl'>{formData.firstName} {formData.lastName}</p>
            <p className='text-gray-600'>Professional Coach</p>
            <p className='text-sm text-gray-500 mt-1'>Click your photo to upload headshot</p>
            {profile && (
              <div className='flex items-center gap-4 mt-2'>
                <div className='flex items-center gap-1'>
                  <Award size={16} className='text-yellow-500' />
                  <span className='text-sm'>{profile.averageRating || 0}/5 Rating</span>
                </div>
                <div className='flex items-center gap-1'>
                  <User size={16} className='text-blue-500' />
                  <span className='text-sm'>{profile.totalReviews || 0} Reviews</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => fetchProfile()}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-sm text-green-700">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div className='border-b pb-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='font-semibold text-lg'>Basic Information</h3>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className='flex items-center gap-2 px-3 py-1 text-[#946BEF] hover:bg-purple-50 rounded-md transition-colors'
            >
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <User size={16} className='inline mr-1' />
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <User size={16} className='inline mr-1' />
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <Mail size={16} className='inline mr-1' />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              disabled={true}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <Phone size={16} className='inline mr-1' />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className='border-b pb-6 mb-6'>
        <h3 className='font-semibold text-lg mb-4'>Professional Information</h3>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!editMode}
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
              placeholder="Tell clients about your coaching experience and philosophy..."
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                <Clock size={16} className='inline mr-1' />
                Experience (Years)
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                disabled={!editMode}
                min="0"
                max="50"
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Hourly Rate (₦)
              </label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                disabled={!editMode}
                min="0"
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Specialties</label>
            <input
              type="text"
              value={formData.specialties.join(', ')}
              onChange={(e) => handleSpecialtiesChange(e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
              placeholder="e.g., Football, Basketball, Fitness Training (comma separated)"
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Certifications</label>
            <input
              type="text"
              value={formData.certifications.join(', ')}
              onChange={(e) => handleCertificationsChange(e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
              placeholder="e.g., UEFA License, NASM CPT (comma separated)"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className='border-b pb-6 mb-6'>
        <h3 className='font-semibold text-lg mb-4'>
          <MapPin size={20} className='inline mr-2' />
          Location
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
            <input
              type="text"
              value={formData.location.city}
              onChange={(e) => handleLocationChange('city', e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
            <input
              type="text"
              value={formData.location.state}
              onChange={(e) => handleLocationChange('state', e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Country</label>
            <input
              type="text"
              value={formData.location.country}
              onChange={(e) => handleLocationChange('country', e.target.value)}
              disabled={!editMode}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50'
            />
          </div>
        </div>
      </div>

      {/* Availability Settings */}
      <div className='pb-6 mb-6'>
        <h3 className='font-semibold text-lg mb-4 flex items-center gap-2'>
          <Clock size={20} />
          Availability Settings
        </h3>
        <p className='text-gray-600 text-sm mb-4'>
          Set your weekly availability to help clients book sessions at convenient times.
        </p>

        <div className="space-y-4">
          {Object.entries(availability).map(([day, settings]) => (
            <div key={day} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              {/* Day Header with Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900 w-24">{day}</span>

                  {/* Enhanced Toggle Switch */}
                  <button
                    onClick={() => editMode && toggleDay(day)}
                    disabled={!editMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${settings.enabled ? 'bg-[#946BEF]' : 'bg-gray-300'
                      } ${!editMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${settings.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>

                  <span className={`text-sm ${settings.enabled ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                    {settings.enabled ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>

              {/* Time Selection */}
              {settings.enabled && (
                <div className="ml-8 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-600">From:</label>
                    <select
                      value={settings.startTime}
                      onChange={(e) => editMode && updateTime(day, 'startTime', e.target.value)}
                      disabled={!editMode}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 text-sm"
                    >
                      {timeOptions.map(time => (
                        <option key={time} value={time}>
                          {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-600">To:</label>
                    <select
                      value={settings.endTime}
                      onChange={(e) => editMode && updateTime(day, 'endTime', e.target.value)}
                      disabled={!editMode}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 text-sm"
                    >
                      {timeOptions.map(time => (
                        <option key={time} value={time}>
                          {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Duration Display */}
                  <div className="text-sm text-gray-500">
                    ({(() => {
                      const start = new Date(`2000-01-01T${settings.startTime}`);
                      const end = new Date(`2000-01-01T${settings.endTime}`);
                      const diff = (end - start) / (1000 * 60 * 60);
                      return `${diff}h`;
                    })()})
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sports Offered */}
      <div className='bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6 mb-6'>
        <h3 className='font-semibold text-lg mb-4'>Sports I Coach</h3>

        {editMode ? (
          <div className='space-y-3'>
            <p className='text-sm text-gray-600 mb-3'>Select all sports you coach:</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
              {availableSports.map(sport => (
                <label
                  key={sport.id}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedSports.includes(sport.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type='checkbox'
                    checked={selectedSports.includes(sport.id)}
                    onChange={() => handleSportToggle(sport.id)}
                    className='mr-2'
                  />
                  <span className='text-xl mr-2'>{sport.icon}</span>
                  <span className='text-sm font-medium'>{sport.name}</span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {profile?.Coach?.Sports && profile.Coach.Sports.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {profile.Coach.Sports.map(sport => (
                  <span
                    key={sport.id}
                    className='inline-flex items-center px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium'
                  >
                    <span className='text-xl mr-2'>{sport.icon}</span>
                    {sport.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 text-sm'>No sports selected yet</p>
            )}
          </div>
        )}
      </div>

      {/* Gallery Images */}
      <div className='bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6 mb-6'>
        <h3 className='font-semibold text-lg mb-4'>Gallery Photos</h3>

        <div className='space-y-4'>
          {/* Upload Button */}
          <div>
            <label className='flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors'>
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={handleGalleryUpload}
                className='hidden'
                disabled={uploadingGallery}
              />
              {uploadingGallery ? (
                <div className='flex items-center text-purple-600'>
                  <Loader size={20} className='mr-2 animate-spin' />
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className='flex items-center text-gray-600'>
                  <Upload size={20} className='mr-2' />
                  <span>Upload Gallery Photos (Multiple)</span>
                </div>
              )}
            </label>
            <p className='text-xs text-gray-500 mt-1'>Upload multiple images (max 5MB each)</p>
          </div>

          {/* Image Gallery */}
          {galleryImages.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {galleryImages.map((imageUrl, index) => (
                <div key={index} className='relative group'>
                  <img
                    src={imageUrl}
                    alt={`Gallery ${index + 1}`}
                    className='w-full h-32 object-cover rounded-lg'
                  />
                  <button
                    onClick={() => deleteGalleryImage(imageUrl)}
                    className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8 border-2 border-dashed border-gray-200 rounded-lg'>
              <ImageIcon size={48} className='mx-auto text-gray-300 mb-2' />
              <p className='text-gray-500 text-sm'>No gallery images yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {editMode && (
        <div className='flex gap-x-4'>
          <button
            onClick={() => setEditMode(false)}
            className='border-2 border-[#946BEF] text-[#946BEF] px-8 py-2 rounded-lg hover:bg-purple-50 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={updateProfile}
            disabled={saving}
            className='bg-[#946BEF] text-white px-8 py-2 rounded-lg hover:bg-[#7a3bc4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;