// pages/BookSession.jsx - Combined Facility + Coach Booking
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X, MapPin, Star, Users, Award } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import toast, { Toaster } from 'react-hot-toast';

const BookSession = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { sportId } = useParams();

  const [sport, setSport] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Morning');
  const [endTime, setEndTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Select Facility, 2: Select Coach, 3: Select Date/Time

  const periods = ['Morning', 'Afternoon', 'Evening'];

  const timeSlots = {
    Morning: ['8:00 am', '9:00 am', '10:00 am', '11:00 am'],
    Afternoon: ['12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'],
    Evening: ['5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm']
  };

  // Fetch sport, facilities, and coaches
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch sport details
        const sportRes = await axios.get(`${URL}/sports/${sportId}`);
        if (sportRes.data.success) {
          setSport(sportRes.data.data);
        }

        // Fetch facilities and coaches for this sport
        const providersRes = await axios.get(`${URL}/sports/${sportId}/providers`);
        if (providersRes.data.success) {
          setFacilities(providersRes.data.data.facilities || []);
          setCoaches(providersRes.data.data.coaches || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load booking data');
        toast.error('Failed to load booking data');
      } finally {
        setLoading(false);
      }
    };

    if (sportId) {
      fetchData();
    }
  }, [sportId]);

  // Fetch unavailable dates when facility and coach are selected
  useEffect(() => {
    if (selectedFacility && selectedCoach) {
      fetchUnavailableDates();
    }
  }, [selectedFacility, selectedCoach]);

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate && selectedFacility && selectedCoach) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, selectedFacility, selectedCoach]);

  // Fetch unavailable dates
  const fetchUnavailableDates = async () => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);

      // Get unavailable dates for both facility and coach
      const facilityRes = await axios.get(`${URL}/bookings/availability/calendar`, {
        params: {
          facilityId: selectedFacility.id,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });

      const coachRes = await axios.get(`${URL}/bookings/availability/calendar`, {
        params: {
          coachId: selectedCoach.id,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });

      // Merge unavailable dates from both facility and coach
      const facilityDates = facilityRes.data.data?.unavailableDates || [];
      const coachDates = coachRes.data.data?.unavailableDates || [];
      const mergedDates = [...new Set([...facilityDates, ...coachDates])];

      setUnavailableDates(mergedDates);
    } catch (err) {
      console.error('Error fetching unavailable dates:', err);
    }
  };

  // Fetch available slots - must check both facility and coach
  const fetchAvailableSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];

      // Get unavailable slots for both facility and coach
      const facilityRes = await axios.get(`${URL}/bookings/availability/date`, {
        params: {
          facilityId: selectedFacility.id,
          date: formattedDate
        }
      });

      const coachRes = await axios.get(`${URL}/bookings/availability/date`, {
        params: {
          coachId: selectedCoach.id,
          date: formattedDate
        }
      });

      // Merge unavailable slots from both
      const facilitySlots = facilityRes.data.data?.unavailableSlots || [];
      const coachSlots = coachRes.data.data?.unavailableSlots || [];
      const mergedSlots = [...facilitySlots, ...coachSlots];

      setAvailableSlots(mergedSlots);
    } catch (err) {
      console.error('Error fetching available slots:', err);
    }
  };

  // Get next 7 days
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const isUnavailable = unavailableDates.includes(dateString);

      days.push({
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday: i === 0,
        isPast: isPastDate(date),
        isUnavailable
      });
    }
    return days;
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isDateUnavailable = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return unavailableDates.includes(dateString);
  };

  const nextSevenDays = getNextSevenDays();

  // Convert time string to Date object
  const convertTimeToDate = (timeString, date) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);

    if (period === 'pm' && hour !== 12) {
      hour += 12;
    } else if (period === 'am' && hour === 12) {
      hour = 0;
    }

    const newDate = new Date(date);
    newDate.setHours(hour, parseInt(minutes || 0), 0, 0);
    return newDate;
  };

  // Check if time slot is available for BOTH facility and coach
  const isTimeSlotAvailable = (timeSlot) => {
    const timeSlotDate = convertTimeToDate(timeSlot, selectedDate);

    return !availableSlots.some(slot => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);
      return timeSlotDate >= slotStart && timeSlotDate < slotEnd;
    });
  };

  // Handle facility selection
  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
    setStep(2);
    toast.success(`${facility.name} selected!`);
  };

  // Handle coach selection
  const handleCoachSelect = (coach) => {
    setSelectedCoach(coach);
    setStep(3);
    toast.success(`${coach.User?.firstName} ${coach.User?.lastName} selected!`);
  };

  // Handle date selection
  const handleDateSelection = (day) => {
    if (day.isPast) {
      toast.error("Cannot select past dates");
      return;
    }

    if (day.isUnavailable) {
      toast.error("This date is fully booked for either facility or coach");
      return;
    }

    setSelectedDate(day.date);
    toast.success("Date selected successfully!");
  };

  // Handle time slot selection
  const handleTimeSlotSelection = (time) => {
    const isAvailable = isTimeSlotAvailable(time);

    if (!isAvailable) {
      toast.error("This time slot is not available for both facility and coach");
      return;
    }

    setSelectedTimeSlot(time);
    toast.success(`Time slot ${time} selected!`);
  };

  // Calculate total price (facility + coach)
  const calculateTotalPrice = () => {
    if (!selectedFacility || !selectedCoach || !selectedTimeSlot || !endTime) return 0;

    const startTime = convertTimeToDate(selectedTimeSlot, selectedDate);
    const endTimeObj = convertTimeToDate(endTime, selectedDate);

    const durationHours = (endTimeObj - startTime) / (1000 * 60 * 60);
    const facilityPrice = durationHours * parseFloat(selectedFacility.pricePerHour || 0);
    const coachPrice = durationHours * parseFloat(selectedCoach.hourlyRate || 0);

    return facilityPrice + coachPrice;
  };

  // Handle booking creation
  const handleBooking = async () => {
    if (!user) {
      setError('Please login to make a booking');
      toast.error('Please login to make a booking');
      navigate('/login');
      return;
    }

    if (!selectedFacility || !selectedCoach) {
      setError('Please select both facility and coach');
      toast.error('Please select both facility and coach');
      return;
    }

    if (!selectedTimeSlot || !endTime) {
      setError('Please select start and end times');
      toast.error('Please select start and end times');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const startTime = convertTimeToDate(selectedTimeSlot, selectedDate);
      const endTimeObj = convertTimeToDate(endTime, selectedDate);

      const bookingData = {
        facilityId: selectedFacility.id,
        coachId: selectedCoach.id,
        sportId: sportId,
        bookingType: 'both',
        startTime: startTime.toISOString(),
        endTime: endTimeObj.toISOString(),
        participantsCount: 1,
        notes: `Session at ${selectedFacility.name} with coach ${selectedCoach.User?.firstName} ${selectedCoach.User?.lastName}`
      };

      // Validate booking data
      const validationErrors = bookingService.validateBookingData(bookingData);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        toast.error(validationErrors.join(', '));
        return;
      }

      const response = await bookingService.createBooking(bookingData);

      if (response.success) {
        const booking = response.data;
        toast.success('Booking created successfully!');
        navigate(`/payment/${booking.id}`);
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      const errorMessage = err.message || 'Failed to create booking';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  // Calendar helper functions
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 0);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isPast: isPastDate(date),
        isUnavailable: isDateUnavailable(date)
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      days.push({
        day,
        date,
        isCurrentMonth: true,
        isPast: isPastDate(date),
        isUnavailable: isDateUnavailable(date)
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isPast: isPastDate(date),
        isUnavailable: isDateUnavailable(date)
      });
    }

    return days;
  };

  const selectCalendarDate = (dayObj) => {
    if (!dayObj.isCurrentMonth) return;
    if (dayObj.isPast) {
      toast.error("Cannot select past dates");
      return;
    }
    if (dayObj.isUnavailable) {
      toast.error("This date is fully booked");
      return;
    }

    setSelectedDate(dayObj.date);
    setShowCalendar(false);
    toast.success("Date selected successfully!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  const totalPrice = calculateTotalPrice();

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen p-4">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="mb-6">
        <button onClick={() => navigate(`/sport/${sportId}`)} className="flex items-center text-gray-600 mb-4">
          <ChevronLeft size={20} className="mr-1" />
          Back to {sport?.name}
        </button>
        <h1 className="text-3xl font-bold mb-2">Book Your Session</h1>
        <p className="text-gray-600">Select facility, coach, and schedule your session</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>1</div>
            <span className="ml-2 font-medium">Facility</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>2</div>
            <span className="ml-2 font-medium">Coach</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>3</div>
            <span className="ml-2 font-medium">Date & Time</span>
          </div>
        </div>
      </div>

      {/* Step 1: Select Facility */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Facility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                onClick={() => handleFacilitySelect(facility)}
                className="border rounded-lg p-4 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                  {facility.images && facility.images[0] ? (
                    <img src={facility.images[0]} alt={facility.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl">🏟️</div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{facility.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>{facility.address?.split(',')[0] || 'Lagos'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{facility.averageRating || '4.5'}</span>
                  </div>
                  <span className="font-semibold text-purple-600">₦{parseFloat(facility.pricePerHour || 0).toLocaleString()}/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Coach */}
      {step === 2 && (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Select a Coach</h2>
              <button onClick={() => setStep(1)} className="text-purple-600 text-sm">Change Facility</button>
            </div>
            {selectedFacility && (
              <div className="mt-2 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Selected Facility:</p>
                <p className="font-semibold">{selectedFacility.name}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                onClick={() => handleCoachSelect(coach)}
                className="border rounded-lg p-4 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-3">
                    {coach.profileImage || coach.User?.profileImage ? (
                      <img src={coach.profileImage || coach.User?.profileImage} alt="Coach" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-2xl">👤</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{coach.User?.firstName} {coach.User?.lastName}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award size={14} className="mr-1" />
                      <span>{coach.experience || 5} years exp</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{coach.bio || 'Professional coach'}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{coach.averageRating || '4.8'}</span>
                  </div>
                  <span className="font-semibold text-purple-600">₦{parseFloat(coach.hourlyRate || 0).toLocaleString()}/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Select Date and Time */}
      {step === 3 && (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Select Date & Time</h2>
              <button onClick={() => setStep(2)} className="text-purple-600 text-sm">Change Coach</button>
            </div>

            {/* Selected Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Facility</p>
                <p className="font-semibold">{selectedFacility?.name}</p>
                <p className="text-sm text-purple-600">₦{parseFloat(selectedFacility?.pricePerHour || 0).toLocaleString()}/hr</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Coach</p>
                <p className="font-semibold">{selectedCoach?.User?.firstName} {selectedCoach?.User?.lastName}</p>
                <p className="text-sm text-purple-600">₦{parseFloat(selectedCoach?.hourlyRate || 0).toLocaleString()}/hr</p>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Date</h3>
              <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
                {nextSevenDays.map((day, index) => {
                  const isDisabled = day.isPast || day.isUnavailable;
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelection(day)}
                      disabled={isDisabled}
                      className={`flex-shrink-0 px-4 py-3 rounded-lg text-center min-w-[70px] ${
                        selectedDate.toDateString() === day.date.toDateString()
                          ? 'bg-purple-500 text-white'
                          : isDisabled
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-xs">{day.day}</div>
                      <div className="text-lg font-bold">{day.dayNumber}</div>
                      {day.isToday && <div className="text-xs">Today</div>}
                      {day.isUnavailable && <div className="text-xs">Full</div>}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowCalendar(true)}
                className="flex items-center text-purple-500 text-sm font-medium"
              >
                <Calendar size={16} className="mr-1" />
                Select different date
              </button>
            </div>

            {/* Time Period Selection */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="font-medium mb-3">Start Time</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {timeSlots[selectedPeriod].map((time, index) => {
                  const isAvailable = isTimeSlotAvailable(time);
                  return (
                    <button
                      key={index}
                      onClick={() => handleTimeSlotSelection(time)}
                      disabled={!isAvailable}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedTimeSlot === time
                          ? 'bg-purple-500 text-white'
                          : isAvailable
                          ? 'bg-white border border-gray-300 text-gray-700 hover:border-purple-300'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {time}
                      {!isAvailable && <span className="block text-xs">Unavailable</span>}
                    </button>
                  );
                })}
              </div>

              {/* End Time */}
              {selectedTimeSlot && (
                <div>
                  <h3 className="font-medium mb-3">End Time</h3>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select end time</option>
                    {timeSlots[selectedPeriod]
                      .filter(time => convertTimeToDate(time, selectedDate) > convertTimeToDate(selectedTimeSlot, selectedDate))
                      .map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    {selectedPeriod !== 'Evening' && (
                      <>
                        {selectedPeriod === 'Morning' &&
                          timeSlots.Afternoon.slice(0, 2).map((time, index) => (
                            <option key={`afternoon-${index}`} value={time}>{time}</option>
                          ))
                        }
                        {selectedPeriod === 'Afternoon' &&
                          timeSlots.Evening.slice(0, 2).map((time, index) => (
                            <option key={`evening-${index}`} value={time}>{time}</option>
                          ))
                        }
                      </>
                    )}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          {selectedTimeSlot && endTime && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-purple-900 mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Facility:</span>
                  <span className="font-medium">{selectedFacility.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coach:</span>
                  <span className="font-medium">{selectedCoach.User?.firstName} {selectedCoach.User?.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{selectedDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTimeSlot} - {endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{((convertTimeToDate(endTime, selectedDate) - convertTimeToDate(selectedTimeSlot, selectedDate)) / (1000 * 60 * 60)).toFixed(1)}h</span>
                </div>
                <div className="border-t border-purple-300 pt-2 mt-2">
                  <div className="flex justify-between text-base">
                    <span>Facility Cost:</span>
                    <span>₦{(((convertTimeToDate(endTime, selectedDate) - convertTimeToDate(selectedTimeSlot, selectedDate)) / (1000 * 60 * 60)) * parseFloat(selectedFacility.pricePerHour || 0)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Coach Cost:</span>
                    <span>₦{(((convertTimeToDate(endTime, selectedDate) - convertTimeToDate(selectedTimeSlot, selectedDate)) / (1000 * 60 * 60)) * parseFloat(selectedCoach.hourlyRate || 0)).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-purple-300 pt-2 mt-2">
                  <span>Total:</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Action Button */}
      {step === 3 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={handleBooking}
              disabled={bookingLoading || !selectedTimeSlot || !endTime}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                bookingLoading || !selectedTimeSlot || !endTime
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {bookingLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Booking...</span>
                </div>
              ) : selectedTimeSlot && endTime ? (
                `Book for ₦${totalPrice.toLocaleString()}`
              ) : (
                'Select Time to Continue'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setShowCalendar(false)} className="absolute top-4 right-4 p-2">
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date</h2>
              <p className="text-gray-600">Choose your preferred date</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h3>
              </div>

              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm text-gray-500 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-8">
              {generateCalendarDays().map((dayObj, index) => {
                const isSelected = selectedDate.toDateString() === dayObj.date.toDateString();
                const isDisabled = !dayObj.isCurrentMonth || dayObj.isPast || dayObj.isUnavailable;

                return (
                  <button
                    key={index}
                    onClick={() => selectCalendarDate(dayObj)}
                    disabled={isDisabled}
                    className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
                      !dayObj.isCurrentMonth
                        ? 'text-gray-300'
                        : isDisabled
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        : isSelected
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {dayObj.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSession;
