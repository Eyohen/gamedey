import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X, MapPin, Star, Award, Package, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import toast, { Toaster } from 'react-hot-toast';

const BookPackage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { packageId } = useParams();

  const [pkg, setPkg] = useState(null);
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
  const [step, setStep] = useState(1);

  const periods = ['Morning', 'Afternoon', 'Evening'];
  const timeSlots = {
    Morning: ['8:00 am', '9:00 am', '10:00 am', '11:00 am'],
    Afternoon: ['12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'],
    Evening: ['5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm']
  };

  // Fetch package details and providers
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch package details - try the public sport packages endpoint
        // We need to find the package from the sport's packages
        const sportId = location.state?.sportId;
        if (!sportId) {
          setError('Sport information missing');
          setLoading(false);
          return;
        }

        // Fetch sport details
        const sportRes = await axios.get(`${URL}/sports/${sportId}`);
        if (sportRes.data.success) {
          setSport(sportRes.data.data);
        }

        // Fetch packages for this sport to find our package
        const packagesRes = await axios.get(`${URL}/sports/${sportId}/packages`);
        if (packagesRes.data.success) {
          const foundPkg = packagesRes.data.data.find(p => p.id === packageId);
          if (foundPkg) {
            setPkg(foundPkg);

            // If package has a pre-assigned coach, set it
            if (foundPkg.Coach) {
              setSelectedCoach(foundPkg.Coach);
            }
            // If package has a pre-assigned facility, set it
            if (foundPkg.Facility) {
              setSelectedFacility(foundPkg.Facility);
            }

            // Determine starting step
            if (foundPkg.Facility && foundPkg.Coach) {
              setStep(3); // Skip to date/time
            } else if (foundPkg.Facility) {
              setStep(2); // Need coach
            } else {
              setStep(1); // Need facility
            }
          } else {
            setError('Package not found');
          }
        }

        // Fetch providers for selection
        const providersRes = await axios.get(`${URL}/sports/${sportId}/providers`);
        if (providersRes.data.success) {
          setFacilities(providersRes.data.data.facilities || []);
          setCoaches(providersRes.data.data.coaches || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load package details');
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      fetchData();
    }
  }, [packageId]);

  // Fetch unavailable dates when facility and coach are selected
  useEffect(() => {
    if (selectedFacility && selectedCoach) {
      fetchUnavailableDates();
    } else if (selectedCoach && !selectedFacility) {
      fetchUnavailableDatesCoachOnly();
    }
  }, [selectedFacility, selectedCoach]);

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate && (selectedFacility || selectedCoach)) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, selectedFacility, selectedCoach]);

  const fetchUnavailableDates = async () => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);

      const promises = [];
      if (selectedFacility) {
        promises.push(axios.get(`${URL}/bookings/availability/calendar`, {
          params: {
            facilityId: selectedFacility.id,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          }
        }));
      }
      if (selectedCoach) {
        promises.push(axios.get(`${URL}/bookings/availability/calendar`, {
          params: {
            coachId: selectedCoach.id,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          }
        }));
      }

      const results = await Promise.all(promises);
      const allDates = results.flatMap(r => r.data.data?.unavailableDates || []);
      setUnavailableDates([...new Set(allDates)]);
    } catch (err) {
      console.error('Error fetching unavailable dates:', err);
    }
  };

  const fetchUnavailableDatesCoachOnly = async () => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);

      const coachRes = await axios.get(`${URL}/bookings/availability/calendar`, {
        params: {
          coachId: selectedCoach.id,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });

      setUnavailableDates(coachRes.data.data?.unavailableDates || []);
    } catch (err) {
      console.error('Error fetching unavailable dates:', err);
    }
  };

  const fetchAvailableSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const promises = [];

      if (selectedFacility) {
        promises.push(axios.get(`${URL}/bookings/availability/date`, {
          params: { facilityId: selectedFacility.id, date: formattedDate }
        }));
      }
      if (selectedCoach) {
        promises.push(axios.get(`${URL}/bookings/availability/date`, {
          params: { coachId: selectedCoach.id, date: formattedDate }
        }));
      }

      const results = await Promise.all(promises);
      const allSlots = results.flatMap(r => r.data.data?.unavailableSlots || []);
      setAvailableSlots(allSlots);
    } catch (err) {
      console.error('Error fetching available slots:', err);
    }
  };

  // Time helpers
  const convertTimeToDate = (timeString, date) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    if (period === 'pm' && hour !== 12) hour += 12;
    else if (period === 'am' && hour === 12) hour = 0;
    const newDate = new Date(date);
    newDate.setHours(hour, parseInt(minutes || 0), 0, 0);
    return newDate;
  };

  const isTimeSlotAvailable = (timeSlot) => {
    const timeSlotDate = convertTimeToDate(timeSlot, selectedDate);
    return !availableSlots.some(slot => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);
      return timeSlotDate >= slotStart && timeSlotDate < slotEnd;
    });
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

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday: i === 0,
        isPast: isPastDate(date),
        isUnavailable: unavailableDates.includes(dateString)
      });
    }
    return days;
  };

  // Handlers
  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
    if (selectedCoach || pkg?.Coach) {
      setStep(3);
    } else {
      setStep(2);
    }
    toast.success(`${facility.name} selected!`);
  };

  const handleCoachSelect = (coach) => {
    setSelectedCoach(coach);
    setStep(3);
    toast.success(`${coach.User?.firstName} ${coach.User?.lastName} selected!`);
  };

  const handleDateSelection = (day) => {
    if (day.isPast) { toast.error("Cannot select past dates"); return; }
    if (day.isUnavailable) { toast.error("This date is fully booked"); return; }
    setSelectedDate(day.date);
    toast.success("Date selected!");
  };

  const handleTimeSlotSelection = (time) => {
    if (!isTimeSlotAvailable(time)) {
      toast.error("This time slot is not available");
      return;
    }
    setSelectedTimeSlot(time);
    toast.success(`Time slot ${time} selected!`);
  };

  // Handle booking creation
  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedTimeSlot || !endTime) {
      toast.error('Please select start and end times');
      return;
    }

    // Need at least a coach for the booking
    if (!selectedCoach) {
      toast.error('Please select a coach');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const startTimeDate = convertTimeToDate(selectedTimeSlot, selectedDate);
      const endTimeDate = convertTimeToDate(endTime, selectedDate);

      const bookingType = selectedFacility ? 'both' : 'coach';

      const bookingData = {
        facilityId: selectedFacility?.id || null,
        coachId: selectedCoach.id,
        sportId: pkg.sportId,
        packageId: pkg.id,
        bookingType,
        startTime: startTimeDate.toISOString(),
        endTime: endTimeDate.toISOString(),
        participantsCount: 1,
        notes: `Package: ${pkg.name} - Session 1 of ${pkg.numberOfSessions}`
      };

      const response = await bookingService.createBooking(bookingData);

      if (response.success) {
        toast.success('Booking created successfully!');
        navigate(`/payment/${response.data.id}`);
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

  // Calendar helpers
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 0);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, day);
      days.push({ day, date, isCurrentMonth: false, isPast: isPastDate(date), isUnavailable: isDateUnavailable(date) });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      days.push({ day, date, isCurrentMonth: true, isPast: isPastDate(date), isUnavailable: isDateUnavailable(date) });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, day);
      days.push({ day, date, isCurrentMonth: false, isPast: isPastDate(date), isUnavailable: isDateUnavailable(date) });
    }

    return days;
  };

  const selectCalendarDate = (dayObj) => {
    if (!dayObj.isCurrentMonth) return;
    if (dayObj.isPast) { toast.error("Cannot select past dates"); return; }
    if (dayObj.isUnavailable) { toast.error("This date is fully booked"); return; }
    setSelectedDate(dayObj.date);
    setShowCalendar(false);
    toast.success("Date selected!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{error || 'Package not found'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-purple-600 font-medium">Go Back</button>
      </div>
    );
  }

  const nextSevenDays = getNextSevenDays();

  // Determine which steps to show
  const needsFacility = !pkg.Facility;
  const needsCoach = !pkg.Coach;

  // Calculate step labels
  const getStepConfig = () => {
    const steps = [];
    if (needsFacility) steps.push({ label: 'Facility', num: steps.length + 1 });
    if (needsCoach) steps.push({ label: 'Coach', num: steps.length + 1 });
    steps.push({ label: 'Date & Time', num: steps.length + 1 });
    return steps;
  };

  const stepConfig = getStepConfig();

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen p-4">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4">
          <ChevronLeft size={20} className="mr-1" />
          Back
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Book Package</h1>
        <p className="text-gray-600">Schedule your first session for this package</p>
      </div>

      {/* Package Summary Card */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 sm:p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-purple-900">{pkg.name}</h3>
            <p className="text-sm text-purple-700 mb-2">{pkg.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-bold text-purple-600 text-lg">₦{parseFloat(pkg.totalPrice).toLocaleString()}</span>
              <span className="text-purple-700">{pkg.numberOfSessions} Sessions</span>
              <span className="text-purple-700">₦{parseFloat(pkg.pricePerSession).toLocaleString()}/session</span>
              {pkg.Sport && <span className="text-purple-700">{pkg.Sport.name}</span>}
            </div>
            {pkg.Coach && (
              <p className="text-sm text-purple-700 mt-1">
                Coach: {pkg.Coach.User?.firstName} {pkg.Coach.User?.lastName}
              </p>
            )}
            {pkg.Facility && (
              <p className="text-sm text-purple-700 mt-1">
                Facility: {pkg.Facility.name}
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {stepConfig.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="w-12 h-0.5 bg-gray-300"></div>}
              <div className={`flex items-center ${step >= s.num ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= s.num ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
                  {s.num}
                </div>
                <span className="ml-2 font-medium text-sm">{s.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step: Select Facility (only if package doesn't have one) */}
      {step === 1 && needsFacility && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Select a Facility</h2>
            {!needsCoach && (
              <button onClick={() => { setSelectedFacility(null); setStep(3); }} className="text-purple-600 text-sm">
                Skip (no facility needed)
              </button>
            )}
          </div>
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

      {/* Step: Select Coach (only if package doesn't have one) */}
      {((step === 2 && needsCoach) || (step === 1 && !needsFacility && needsCoach)) && (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold">Select a Coach</h2>
              {needsFacility && selectedFacility && (
                <button onClick={() => setStep(1)} className="text-purple-600 text-sm">Change Facility</button>
              )}
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
                      <span>{coach.experience || 0} years exp</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{coach.bio || 'Professional coach'}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{coach.averageRating || '0.0'}</span>
                  </div>
                  <span className="font-semibold text-purple-600">₦{parseFloat(coach.hourlyRate || 0).toLocaleString()}/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step: Select Date & Time */}
      {step === 3 && (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Select Date & Time</h2>
              {(needsFacility || needsCoach) && (
                <button onClick={() => setStep(needsCoach ? 2 : 1)} className="text-purple-600 text-sm">
                  Change {needsCoach ? 'Coach' : 'Facility'}
                </button>
              )}
            </div>

            {/* Selected Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {selectedFacility && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Facility</p>
                  <p className="font-semibold">{selectedFacility.name}</p>
                </div>
              )}
              {selectedCoach && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Coach</p>
                  <p className="font-semibold">{selectedCoach.User?.firstName} {selectedCoach.User?.lastName}</p>
                </div>
              )}
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
                  <span>Package:</span>
                  <span className="font-medium">{pkg.name}</span>
                </div>
                {selectedFacility && (
                  <div className="flex justify-between">
                    <span>Facility:</span>
                    <span className="font-medium">{selectedFacility.name}</span>
                  </div>
                )}
                {selectedCoach && (
                  <div className="flex justify-between">
                    <span>Coach:</span>
                    <span className="font-medium">{selectedCoach.User?.firstName} {selectedCoach.User?.lastName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{selectedDate.toLocaleDateString('en-US', {
                    weekday: 'short', month: 'short', day: 'numeric'
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTimeSlot} - {endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sessions:</span>
                  <span className="font-medium">{pkg.numberOfSessions} sessions</span>
                </div>
                {parseFloat(pkg.discount) > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount:</span>
                    <span className="font-medium">{pkg.discount}% off</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-purple-300 pt-2 mt-2">
                  <span>Package Total:</span>
                  <span>₦{parseFloat(pkg.totalPrice).toLocaleString()}</span>
                </div>
                <p className="text-xs text-purple-600 mt-1">+ 7.5% service fee applied at checkout</p>
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
                `Book Package for ₦${parseFloat(pkg.totalPrice).toLocaleString()}`
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
              <h3 className="text-lg font-semibold text-gray-900">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h3>
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
                <div key={day} className="text-center text-sm text-gray-500 font-medium py-2">{day}</div>
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
                      !dayObj.isCurrentMonth ? 'text-gray-300'
                        : isDisabled ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        : isSelected ? 'bg-purple-500 text-white'
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

export default BookPackage;
