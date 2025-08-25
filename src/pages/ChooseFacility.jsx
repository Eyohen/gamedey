// // pages/ChooseFacility.jsx 
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Calendar, X, Clock, MapPin, Star, Users } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { bookingService } from '../services/bookingService';

// const ChooseFacility = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { facilityId } = useParams();
  
//   const [facility, setFacility] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//   const [selectedPeriod, setSelectedPeriod] = useState('Morning');
//   const [endTime, setEndTime] = useState('');
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [error, setError] = useState('');

//   const periods = ['Morning', 'Afternoon', 'Evening'];

//   const timeSlots = {
//     Morning: ['8:00 am', '9:00 am', '10:00 am', '11:00 am'],
//     Afternoon: ['12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'],
//     Evening: ['5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm']
//   };

//   // Get next 7 days for quick selection
//   const getNextSevenDays = () => {
//     const days = [];
//     for (let i = 0; i < 7; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() + i);
//       days.push({
//         date: date,
//         day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//         dayNumber: date.getDate(),
//         isToday: i === 0
//       });
//     }
//     return days;
//   };

//   const nextSevenDays = getNextSevenDays();

//   // Fetch facility details
//   useEffect(() => {
//     const fetchFacility = async () => {
//       try {
//         const response = await axios.get(`${URL}/facilities/${facilityId}`);
//         if (response.data.success) {
//           setFacility(response.data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching facility:', err);
//         setError('Failed to load facility details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (facilityId) {
//       fetchFacility();
//     }
//   }, [facilityId]);

//   // Fetch available time slots when date changes
//   useEffect(() => {
//     if (selectedDate && facilityId) {
//       fetchAvailableSlots(selectedDate);
//     }
//   }, [selectedDate, facilityId]);

//   // Fetch available time slots
//   const fetchAvailableSlots = async (date) => {
//     try {
//       const formattedDate = date.toISOString().split('T')[0];
//       const response = await axios.get(`${URL}/bookings/availability/slots`, {
//         params: {
//           facilityId: facilityId,
//           date: formattedDate
//         }
//       });
      
//       if (response.data.success) {
//         setAvailableSlots(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching available slots:', err);
//       // Don't show error for this, just continue with default slots
//     }
//   };

//   // Convert time string to Date object
//   const convertTimeToDate = (timeString, date) => {
//     const [time, period] = timeString.split(' ');
//     const [hours, minutes] = time.split(':');
//     let hour = parseInt(hours);
    
//     if (period === 'pm' && hour !== 12) {
//       hour += 12;
//     } else if (period === 'am' && hour === 12) {
//       hour = 0;
//     }
    
//     const newDate = new Date(date);
//     newDate.setHours(hour, parseInt(minutes || 0), 0, 0);
//     return newDate;
//   };

//   // Check if time slot is available
//   const isTimeSlotAvailable = (timeSlot) => {
//     // For now, randomly disable some slots for demo
//     const unavailableSlots = ['9:00 am', '2:00 pm', '7:00 pm'];
//     return !unavailableSlots.includes(timeSlot);
//   };

//   // Handle booking creation
//   const handleBooking = async () => {
//     if (!user) {
//       setError('Please login to make a booking');
//       navigate('/login');
//       return;
//     }

//     if (!selectedTimeSlot || !endTime) {
//       setError('Please select start and end times');
//       return;
//     }

//     setBookingLoading(true);
//     setError('');

//     try {
//       const startTime = convertTimeToDate(selectedTimeSlot, selectedDate);
//       const endTimeObj = convertTimeToDate(endTime, selectedDate);

//       const bookingData = {
//         facilityId: facilityId,
//         bookingType: 'facility',
//         startTime: startTime.toISOString(),
//         endTime: endTimeObj.toISOString(),
//         participantsCount: 1,
//         notes: `Booking for ${facility?.name}`
//       };

//       // Validate booking data
//       const validationErrors = bookingService.validateBookingData(bookingData);
//       if (validationErrors.length > 0) {
//         setError(validationErrors.join(', '));
//         return;
//       }

//       const response = await bookingService.createBooking(bookingData);
      
//       if (response.success) {
//         const booking = response.data;
//         navigate(`/payment/${booking.id}`);
//       }
//     } catch (err) {
//       console.error('Error creating booking:', err);
//       setError(err.message || 'Failed to create booking');
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   // Calculate total price
//   const calculateTotalPrice = () => {
//     if (!facility || !selectedTimeSlot || !endTime) return 0;
    
//     const startTime = convertTimeToDate(selectedTimeSlot, selectedDate);
//     const endTimeObj = convertTimeToDate(endTime, selectedDate);
    
//     const durationHours = (endTimeObj - startTime) / (1000 * 60 * 60);
//     return durationHours * parseFloat(facility.pricePerHour || 0);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   if (!facility) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500">Facility not found</p>
//         <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const totalPrice = calculateTotalPrice();

//   return (
//     <div className="max-w-lg mx-auto bg-white min-h-screen relative">
//       {/* Header */}
//       <div className="absolute top-4 left-4 z-10">
//         <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-md">
//           <ChevronLeft className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>
      
//       <div className="absolute top-4 right-4 z-10">
//         <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-md">
//           <X className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>

//       {/* Hero Section */}
//       <div className="relative">
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-64 relative overflow-hidden">
//           {/* Facility image or illustration */}
//           <div className="absolute inset-0">
//             {facility.images && facility.images.length > 0 ? (
//               <img 
//                 src={facility.images[0]} 
//                 alt={facility.name}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-white text-6xl">🏟️</div>
//               </div>
//             )}
//             <div className="absolute inset-0 bg-black bg-opacity-30"></div>
//           </div>

//           {/* Facility info overlay */}
//           <div className="absolute bottom-4 left-4 right-4 text-white">
//             <h1 className="text-2xl font-bold mb-1">{facility.name}</h1>
//             <div className="flex items-center space-x-4 text-sm">
//               <div className="flex items-center">
//                 <MapPin size={14} className="mr-1" />
//                 <span>{facility.address?.split(',')[0] || 'Lagos'}</span>
//               </div>
//               <div className="flex items-center">
//                 <Star size={14} className="mr-1" fill="currentColor" />
//                 <span>{facility.averageRating || '4.5'}</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="font-semibold">₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-6 pt-6 pb-32">
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//             <span className="text-sm text-red-700">{error}</span>
//           </div>
//         )}

//         {/* Description */}
//         <div className="mb-6">
//           <p className="text-gray-600 text-sm leading-relaxed">
//             {facility.description || 'A premium sports facility with modern amenities and professional-grade equipment.'}
//           </p>
//         </div>

//         {/* Amenities */}
//         {facility.amenities && facility.amenities.length > 0 && (
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Amenities</h3>
//             <div className="flex flex-wrap gap-2">
//               {facility.amenities.slice(0, 6).map((amenity, index) => (
//                 <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//                   {amenity}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Date Selection */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h2>
          
//           {/* Quick Date Selection */}
//           <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
//             {nextSevenDays.map((day, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedDate(day.date)}
//                 className={`flex-shrink-0 px-4 py-3 rounded-lg text-center min-w-[70px] ${
//                   selectedDate.toDateString() === day.date.toDateString()
//                     ? 'bg-purple-500 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <div className="text-xs">{day.day}</div>
//                 <div className="text-lg font-bold">{day.dayNumber}</div>
//                 {day.isToday && <div className="text-xs">Today</div>}
//               </button>
//             ))}
//           </div>

//           {/* Calendar Button */}
//           <button 
//             onClick={() => setShowCalendar(true)}
//             className="flex items-center text-purple-500 text-sm font-medium mb-4"
//           >
//             <Calendar size={16} className="mr-1" />
//             Select different date
//           </button>

//           {/* Time Period Selection */}
//           <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
//             {periods.map((period) => (
//               <button
//                 key={period}
//                 onClick={() => setSelectedPeriod(period)}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                   selectedPeriod === period
//                     ? 'bg-purple-500 text-white'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 {period}
//               </button>
//             ))}
//           </div>

//           {/* Time Slots */}
//           <div>
//             <h3 className="font-medium mb-3">Start Time</h3>
//             <div className="grid grid-cols-2 gap-2 mb-4">
//               {timeSlots[selectedPeriod].map((time, index) => {
//                 const isAvailable = isTimeSlotAvailable(time);
//                 return (
//                   <button
//                     key={index}
//                     onClick={() => isAvailable && setSelectedTimeSlot(time)}
//                     disabled={!isAvailable}
//                     className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
//                       selectedTimeSlot === time
//                         ? 'bg-purple-500 text-white'
//                         : isAvailable
//                         ? 'bg-white border border-gray-300 text-gray-700 hover:border-purple-300'
//                         : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     }`}
//                   >
//                     {time}
//                     {!isAvailable && <span className="block text-xs">Unavailable</span>}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* End Time */}
//             {selectedTimeSlot && (
//               <div>
//                 <h3 className="font-medium mb-3">End Time</h3>
//                 <select
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 >
//                   <option value="">Select end time</option>
//                   {timeSlots[selectedPeriod]
//                     .filter(time => convertTimeToDate(time, selectedDate) > convertTimeToDate(selectedTimeSlot, selectedDate))
//                     .map((time, index) => (
//                       <option key={index} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   {/* Add slots from next period if available */}
//                   {selectedPeriod !== 'Evening' && (
//                     <>
//                       {selectedPeriod === 'Morning' && 
//                         timeSlots.Afternoon.slice(0, 2).map((time, index) => (
//                           <option key={`afternoon-${index}`} value={time}>
//                             {time}
//                           </option>
//                         ))
//                       }
//                       {selectedPeriod === 'Afternoon' && 
//                         timeSlots.Evening.slice(0, 2).map((time, index) => (
//                           <option key={`evening-${index}`} value={time}>
//                             {time}
//                           </option>
//                         ))
//                       }
//                     </>
//                   )}
//                 </select>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Booking Summary */}
//         {selectedTimeSlot && endTime && (
//           <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
//             <h3 className="font-semibold text-purple-900 mb-2">Booking Summary</h3>
//             <div className="space-y-1 text-sm text-purple-800">
//               <div className="flex justify-between">
//                 <span>Date:</span>
//                 <span>{selectedDate.toLocaleDateString('en-US', { 
//                   weekday: 'short', 
//                   month: 'short', 
//                   day: 'numeric' 
//                 })}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Time:</span>
//                 <span>{selectedTimeSlot} - {endTime}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Duration:</span>
//                 <span>{((convertTimeToDate(endTime, selectedDate) - convertTimeToDate(selectedTimeSlot, selectedDate)) / (1000 * 60 * 60)).toFixed(1)}h</span>
//               </div>
//               <div className="flex justify-between font-semibold border-t border-purple-300 pt-2">
//                 <span>Total:</span>
//                 <span>₦{totalPrice.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Bottom Action Button */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
//         <div className="max-w-lg mx-auto">
//           <button 
//             onClick={handleBooking}
//             disabled={bookingLoading || !selectedTimeSlot || !endTime}
//             className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
//               bookingLoading || !selectedTimeSlot || !endTime
//                 ? 'bg-gray-400 text-white cursor-not-allowed'
//                 : 'bg-purple-500 text-white hover:bg-purple-600'
//             }`}
//           >
//             {bookingLoading ? (
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 <span>Creating Booking...</span>
//               </div>
//             ) : selectedTimeSlot && endTime ? (
//               `Book for ₦${totalPrice.toLocaleString()}`
//             ) : (
//               'Select Time to Continue'
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Calendar Modal - keeping your existing calendar modal code */}
//       {showCalendar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
//             <button 
//               onClick={() => setShowCalendar(false)}
//               className="absolute top-4 right-4 p-2"
//             >
//               <X className="w-6 h-6 text-gray-600" />
//             </button>

//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date</h2>
//               <p className="text-gray-600">Choose your preferred date</p>
//             </div>

//             {/* Simple date picker - you can enhance this */}
//             <div className="space-y-2 max-h-64 overflow-y-auto">
//               {Array.from({ length: 30 }, (_, i) => {
//                 const date = new Date();
//                 date.setDate(date.getDate() + i);
//                 return (
//                   <button
//                     key={i}
//                     onClick={() => {
//                       setSelectedDate(date);
//                       setShowCalendar(false);
//                     }}
//                     className={`w-full p-3 text-left rounded-lg transition-colors ${
//                       selectedDate.toDateString() === date.toDateString()
//                         ? 'bg-purple-500 text-white'
//                         : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     {date.toLocaleDateString('en-US', {
//                       weekday: 'long',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChooseFacility;



// pages/ChooseFacility.jsx 
// MOBILE RESPONSIVE VERSION - Choose Facility Booking Page
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X, Clock, MapPin, Star, Users } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingService } from '../services/bookingService';

const ChooseFacility = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { facilityId } = useParams();
  
  const [facility, setFacility] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Morning');
  const [endTime, setEndTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');

  const periods = ['Morning', 'Afternoon', 'Evening'];

  const timeSlots = {
    Morning: ['8:00 am', '9:00 am', '10:00 am', '11:00 am'],
    Afternoon: ['12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'],
    Evening: ['5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm']
  };

  // Get next 7 days for quick selection
  const getNextSevenDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday: i === 0
      });
    }
    return days;
  };

  const nextSevenDays = getNextSevenDays();

  // Fetch facility details
  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(`${URL}/facilities/${facilityId}`);
        if (response.data.success) {
          setFacility(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching facility:', err);
        setError('Failed to load facility details');
      } finally {
        setLoading(false);
      }
    };

    if (facilityId) {
      fetchFacility();
    }
  }, [facilityId]);

  // Fetch available time slots when date changes
  useEffect(() => {
    if (selectedDate && facilityId) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, facilityId]);

  // Fetch available time slots
  const fetchAvailableSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(`${URL}/bookings/availability/slots`, {
        params: {
          facilityId: facilityId,
          date: formattedDate
        }
      });
      
      if (response.data.success) {
        setAvailableSlots(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching available slots:', err);
      // Don't show error for this, just continue with default slots
    }
  };

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

  // Check if time slot is available
  const isTimeSlotAvailable = (timeSlot) => {
    // For demo, randomly disable some slots
    const unavailableSlots = ['9:00 am', '2:00 pm', '7:00 pm'];
    return !unavailableSlots.includes(timeSlot);
  };

  // Handle booking creation
  const handleBooking = async () => {
    if (!user) {
      setError('Please login to make a booking');
      navigate('/login');
      return;
    }

    if (!selectedTimeSlot || !endTime) {
      setError('Please select start and end times');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const startTime = convertTimeToDate(selectedTimeSlot, selectedDate);
      const endTimeObj = convertTimeToDate(endTime, selectedDate);

      const bookingData = {
        facilityId: facilityId,
        bookingType: 'facility',
        startTime: startTime.toISOString(),
        endTime: endTimeObj.toISOString(),
        participantsCount: 1,
        notes: `Booking for ${facility?.name}`
      };

      // Validate booking data
      const validationErrors = bookingService.validateBookingData(bookingData);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        return;
      }

      const response = await bookingService.createBooking(bookingData);
      
      if (response.success) {
        const booking = response.data;
        navigate(`/payment/${booking.id}`);
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  // Handle back navigation - ENHANCED to go to explore
  const handleBackToExplore = () => {
    navigate('/explore');
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!facility || !selectedTimeSlot || !endTime) return 0;
    
    const startTime = convertTimeToDate(selectedTimeSlot, selectedDate);
    const endTimeObj = convertTimeToDate(endTime, selectedDate);
    
    const durationHours = (endTimeObj - startTime) / (1000 * 60 * 60);
    return durationHours * parseFloat(facility.pricePerHour || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Facility not found</p>
        <button onClick={handleBackToExplore} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
          Go Back to Explore
        </button>
      </div>
    );
  }

  const totalPrice = calculateTotalPrice();

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen relative">
      {/* Enhanced Header with Back Navigation */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-10">
        <div className="flex items-center justify-between">
          {/* Back to Explore Button */}
          <button 
            onClick={handleBackToExplore} 
            className="flex items-center space-x-2 p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <span className="hidden sm:inline-block text-sm font-medium text-gray-600">
              Back to Explore
            </span>
          </button>

          {/* Mobile Title */}
          <div className="flex-1 mx-4 text-center sm:hidden">
            <h1 className="text-sm font-semibold text-white bg-black bg-opacity-40 px-3 py-1 rounded-full backdrop-blur-sm truncate">
              {facility.name}
            </h1>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleBackToExplore} 
            className="p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Hero Section - Mobile Responsive */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-56 sm:h-64 relative overflow-hidden">
          {/* Facility image */}
          <div className="absolute inset-0">
            {facility.images && facility.images.length > 0 ? (
              <img 
                src={facility.images[0]} 
                alt={facility.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-white text-4xl sm:text-6xl">🏟️</div>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>

          {/* Facility info overlay - Mobile Responsive */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{facility.name}</h1>
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm flex-wrap gap-y-1">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1 sm:w-4 sm:h-4" />
                <span className="truncate max-w-[100px] sm:max-w-none">
                  {facility.address?.split(',')[0] || 'Lagos'}
                </span>
              </div>
              <div className="flex items-center">
                <Star size={12} className="mr-1 sm:w-4 sm:h-4" fill="currentColor" />
                <span>{facility.averageRating || '4.5'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">₦{parseFloat(facility.pricePerHour || 5000).toLocaleString()}/hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Mobile Responsive */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-24 sm:pb-32">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            {facility.description || 'A premium sports facility with modern amenities and professional-grade equipment.'}
          </p>
        </div>

        {/* Amenities - Mobile Responsive */}
        {facility.amenities && facility.amenities.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {facility.amenities.slice(0, 6).map((amenity, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Date Selection - Mobile Responsive */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h2>
          
          {/* Quick Date Selection - Mobile Scrollable */}
          <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
            {nextSevenDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-center min-w-[60px] sm:min-w-[70px] ${
                  selectedDate.toDateString() === day.date.toDateString()
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-xs">{day.day}</div>
                <div className="text-base sm:text-lg font-bold">{day.dayNumber}</div>
                {day.isToday && <div className="text-xs">Today</div>}
              </button>
            ))}
          </div>

          {/* Calendar Button */}
          <button 
            onClick={() => setShowCalendar(true)}
            className="flex items-center text-purple-500 text-sm font-medium mb-4"
          >
            <Calendar size={14} className="mr-1 sm:w-4 sm:h-4" />
            Select different date
          </button>

          {/* Time Period Selection - Mobile Responsive */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Time Slots - Mobile Responsive Grid */}
          <div>
            <h3 className="font-medium mb-3 text-sm sm:text-base">Start Time</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {timeSlots[selectedPeriod].map((time, index) => {
                const isAvailable = isTimeSlotAvailable(time);
                return (
                  <button
                    key={index}
                    onClick={() => isAvailable && setSelectedTimeSlot(time)}
                    disabled={!isAvailable}
                    className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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

            {/* End Time - Mobile Responsive */}
            {selectedTimeSlot && (
              <div>
                <h3 className="font-medium mb-3 text-sm sm:text-base">End Time</h3>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Select end time</option>
                  {timeSlots[selectedPeriod]
                    .filter(time => convertTimeToDate(time, selectedDate) > convertTimeToDate(selectedTimeSlot, selectedDate))
                    .map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  {/* Add slots from next period if available */}
                  {selectedPeriod !== 'Evening' && (
                    <>
                      {selectedPeriod === 'Morning' && 
                        timeSlots.Afternoon.slice(0, 2).map((time, index) => (
                          <option key={`afternoon-${index}`} value={time}>
                            {time}
                          </option>
                        ))
                      }
                      {selectedPeriod === 'Afternoon' && 
                        timeSlots.Evening.slice(0, 2).map((time, index) => (
                          <option key={`evening-${index}`} value={time}>
                            {time}
                          </option>
                        ))
                      }
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Booking Summary - Mobile Responsive */}
        {selectedTimeSlot && endTime && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">Booking Summary</h3>
            <div className="space-y-1 text-sm text-purple-800">
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{selectedTimeSlot} - {endTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{((convertTimeToDate(endTime, selectedDate) - convertTimeToDate(selectedTimeSlot, selectedDate)) / (1000 * 60 * 60)).toFixed(1)}h</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-purple-300 pt-2">
                <span>Total:</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Button - Mobile Responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={handleBooking}
            disabled={bookingLoading || !selectedTimeSlot || !endTime}
            className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-colors ${
              bookingLoading || !selectedTimeSlot || !endTime
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {bookingLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
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

      {/* Calendar Modal - Mobile Responsive */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowCalendar(false)}
              className="absolute top-4 right-4 p-2"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Select Date</h2>
              <p className="text-gray-600 text-sm sm:text-base">Choose your preferred date</p>
            </div>

            {/* Simple date picker - Mobile Scrollable */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Array.from({ length: 30 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDate(date);
                      setShowCalendar(false);
                    }}
                    className={`w-full p-3 text-left rounded-lg transition-colors text-sm sm:text-base ${
                      selectedDate.toDateString() === date.toDateString()
                        ? 'bg-purple-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
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

export default ChooseFacility;