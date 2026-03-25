import React, { useState } from 'react';
import {
  ChevronLeft,
  Upload
} from 'lucide-react';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    date: '',
    venue: '',
    location: 'virtual',
    ticketFee: 'free',
    inviteGuests: '',
    coverImage: null,
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
  };

  const handleTicketFeeChange = (ticketFee) => {
    setFormData(prev => ({
      ...prev,
      ticketFee
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          coverImage: file
        }));
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          coverImage: file
        }));
      }
    }
  };

  const handlePreview = () => {
    if (!formData.eventName.trim()) {
      setError('Event name is required');
      return;
    }
    if (!formData.time.trim()) {
      setError('Event time is required');
      return;
    }
    if (!formData.date.trim()) {
      setError('Event date is required');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Event data:', formData);
      setLoading(false);
      // Handle preview or navigation
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <button className="flex items-center gap-2 text-xl font-semibold hover:text-purple-600 transition-colors mb-4">
          <ChevronLeft size={28} />
          <span className="text-gray-600">Community</span>
        </button>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Events</h1>
          <p className="text-gray-600">Complete the form below to create your event.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Main Form */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Row 1: Event Name and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of Event
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Enter name of event"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time of Event
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Enter the time of event"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Row 2: Date and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Enter your event date (DD/MM/YYYY)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleLocationChange('virtual')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.location === 'virtual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Virtual
              </button>
              <button
                onClick={() => handleLocationChange('physical')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.location === 'physical'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Physical
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Venue and Ticket Fee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter your event venue"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Fee
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleTicketFeeChange('free')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.ticketFee === 'free'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => handleTicketFeeChange('paid')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.ticketFee === 'paid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Paid
              </button>
            </div>
          </div>
        </div>

        {/* Invite Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Invite Guests
          </label>
          <input
            type="text"
            name="inviteGuests"
            value={formData.inviteGuests}
            onChange={handleChange}
            placeholder="Enter guests name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Event Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Cover Image
          </label>
          <div
            className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
              dragActive 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {formData.coverImage ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Upload className="text-green-600" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">{formData.coverImage.name}</p>
                <p className="text-xs text-gray-500">Image uploaded successfully</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Image</h3>
                <p className="text-sm text-gray-500 mb-1">Upload your document (picture 10MB)</p>
                <p className="text-sm text-gray-500 mb-4">Supports: JPG, PNG, MOV</p>
                <p className="text-xs text-gray-400 mb-4">Maximum of 1 file</p>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="cover-image-input"
                />
                <label
                  htmlFor="cover-image-input"
                  className="inline-block px-6 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg font-medium hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  Choose File
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Event Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your event description"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Preview Button */}
        <div className="pt-6">
          <button
            onClick={handlePreview}
            disabled={loading}
            className={`w-full py-4 bg-gray-400 text-white rounded-lg font-medium transition-colors ${
              loading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-500'
            }`}
          >
            {loading ? 'Creating Preview...' : 'Preview'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;