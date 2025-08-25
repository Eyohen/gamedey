// // pages/ChooseCoach.jsx
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, useParams } from 'react-router-dom';

// const ChooseCoach = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { coachId } = useParams();
  
//   const [coach, setCoach] = useState(null);
//   const [selectedDay, setSelectedDay] = useState('Tue');
//   const [selectedDate, setSelectedDate] = useState(6);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:10 am');
//   const [selectedPeriod, setSelectedPeriod] = useState('Morning');
//   const [endTime, setEndTime] = useState('');
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [calendarDate, setCalendarDate] = useState(new Date());
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [error, setError] = useState('');

//   const days = [
//     { day: 'Sun', date: 4 },
//     { day: 'Mon', date: 5 },
//     { day: 'Tue', date: 6 },
//   ];

//   const periods = ['Morning', 'Afternoon', 'Evening'];

//   const timeSlots = {
//     Morning: ['8:00 am', '8:10 am', '9:20am', '10:10 am', '10:11 am', '10:10 am', '11:10 am'],
//     Afternoon: ['12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'],
//     Evening: ['6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm']
//   };

//   // Fetch coach details
//   useEffect(() => {
//     const fetchCoach = async () => {
//       try {
//         const response = await axios.get(`${URL}/coaches/${coachId}`);
//         if (response.data.success) {
//           setCoach(response.data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching coach:', err);
//         setError('Failed to load coach details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (coachId) {
//       fetchCoach();
//     }
//   }, [coachId]);

//   // Fetch available time slots
//   const fetchAvailableSlots = async (date) => {
//     try {
//       const formattedDate = date.toISOString().split('T')[0];
//       const response = await axios.get(`${URL}/bookings/availability/slots`, {
//         params: {
//           coachId: coachId,
//           date: formattedDate
//         }
//       });
      
//       if (response.data.success) {
//         setAvailableSlots(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching available slots:', err);
//       setError('Failed to load available time slots');
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
//     newDate.setHours(hour, parseInt(minutes), 0, 0);
//     return newDate;
//   };

//   // Handle booking creation
//   const handleBooking = async () => {
//     if (!user) {
//       setError('Please login to make a booking');
//       return;
//     }

//     if (!selectedTimeSlot || !endTime) {
//       setError('Please select start and end times');
//       return;
//     }

//     setBookingLoading(true);
//     try {
//       const selectedDateObj = new Date(calendarDate);
//       selectedDateObj.setDate(selectedDate);
      
//       const startTime = convertTimeToDate(selectedTimeSlot, selectedDateObj);
//       const endTimeObj = convertTimeToDate(endTime, selectedDateObj);

//       if (endTimeObj <= startTime) {
//         setError('End time must be after start time');
//         setBookingLoading(false);
//         return;
//       }

//       const token = localStorage.getItem('access_token');
      
//       const bookingData = {
//         coachId: coachId,
//         bookingType: 'coach',
//         startTime: startTime.toISOString(),
//         endTime: endTimeObj.toISOString(),
//         participantsCount: 1,
//         notes: `Coaching session with ${coach?.User?.firstName} ${coach?.User?.lastName}`
//       };

//       const response = await axios.post(`${URL}/bookings`, bookingData, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         const booking = response.data.data;
//         // Navigate to payment page
//         navigate(`/payment/${booking.id}`);
//       }
//     } catch (err) {
//       console.error('Error creating booking:', err);
//       setError(err.response?.data?.message || 'Failed to create booking');
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   // Calculate total price
//   const calculateTotalPrice = () => {
//     if (!coach || !selectedTimeSlot || !endTime) return 0;
    
//     const selectedDateObj = new Date(calendarDate);
//     selectedDateObj.setDate(selectedDate);
    
//     const startTime = convertTimeToDate(selectedTimeSlot, selectedDateObj);
//     const endTimeObj = convertTimeToDate(endTime, selectedDateObj);
    
//     const durationHours = (endTimeObj - startTime) / (1000 * 60 * 60);
//     return durationHours * parseFloat(coach.hourlyRate || 0);
//   };

//   // Calendar helper functions
//   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'];
  
//   const getDaysInMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//   };

//   const generateCalendarDays = () => {
//     const daysInMonth = getDaysInMonth(calendarDate);
//     const firstDay = getFirstDayOfMonth(calendarDate);
//     const days = [];

//     // Previous month's trailing days
//     const prevMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 0);
//     for (let i = firstDay - 1; i >= 0; i--) {
//       days.push({
//         day: prevMonth.getDate() - i,
//         isCurrentMonth: false,
//         isNextMonth: false
//       });
//     }

//     // Current month days
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push({
//         day,
//         isCurrentMonth: true,
//         isNextMonth: false
//       });
//     }

//     // Next month's leading days
//     const remainingDays = 42 - days.length; // 6 rows × 7 days
//     for (let day = 1; day <= remainingDays; day++) {
//       days.push({
//         day,
//         isCurrentMonth: false,
//         isNextMonth: true
//       });
//     }

//     return days;
//   };

//   const navigateMonth = (direction) => {
//     setCalendarDate(prev => {
//       const newDate = new Date(prev);
//       newDate.setMonth(prev.getMonth() + direction);
//       return newDate;
//     });
//   };

//   const selectCalendarDate = (day) => {
//     if (day.isCurrentMonth) {
//       const newDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day.day);
//       setCalendarDate(newDate);
//       // Update the main date selection
//       const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//       setSelectedDay(dayNames[newDate.getDay()]);
//       setSelectedDate(day.day);
//       setShowCalendar(false);
      
//       // Fetch available slots for the selected date
//       fetchAvailableSlots(newDate);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   if (!coach) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500">Coach not found</p>
//         <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto bg-white min-h-screen relative">
//       {/* Header */}
//       <div className="absolute top-4 left-4 z-10">
//         <button onClick={() => navigate(-1)} className="p-2">
//           <ChevronLeft className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>
      
//       <div className="absolute top-4 right-4 z-10">
//         <button onClick={() => navigate(-1)} className="p-2">
//           <X className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>

//       {/* Hero Section */}
//       <div className="relative">
//         <div className="bg-gradient-to-r from-green-600 to-blue-800 h-64 relative overflow-hidden">
//           {/* Coach illustration */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="relative w-80 h-40">
//               {/* Coach figure */}
//               <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 rounded-t-full"></div>
              
//               {/* Coach equipment */}
//               <div className="absolute bottom-8 left-1/3 w-8 h-8 bg-orange-400 rounded-full"></div>
//               <div className="absolute bottom-8 right-1/3 w-6 h-6 bg-red-400 rounded-full"></div>
              
//               {/* Whistle */}
//               <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-silver rounded"></div>
//             </div>
//           </div>

//           {/* Clouds */}
//           <div className="absolute top-8 left-8 w-12 h-6 bg-white rounded-full opacity-80"></div>
//           <div className="absolute top-12 right-12 w-8 h-4 bg-white rounded-full opacity-60"></div>
//         </div>

//         {/* Coach images */}
//         <div className="absolute top-32 right-4 space-y-2">
//           {coach.galleryImages && coach.galleryImages.length > 0 ? (
//             coach.galleryImages.slice(0, 2).map((image, index) => (
//               <div key={index} className="w-24 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg relative overflow-hidden">
//                 <img src={image} alt={`${coach.User?.firstName} coaching`} className="w-full h-full object-cover" />
//               </div>
//             ))
//           ) : (
//             <>
//               <div className="w-24 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg relative overflow-hidden">
//                 <div className="absolute inset-2 bg-yellow-400 rounded"></div>
//               </div>
//               <div className="w-24 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg relative overflow-hidden">
//                 <div className="absolute inset-2 bg-green-400 rounded"></div>
//               </div>
//             </>
//           )}
//           <button className="w-24 h-12 bg-purple-500 text-white text-xs rounded-lg flex items-center justify-center">
//             See All
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-6 pt-6 pb-24">
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//             <span className="text-sm text-red-700">{error}</span>
//           </div>
//         )}

//         {/* Title */}
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">
//           {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Professional Coach'}
//         </h1>
//         <p className="text-gray-600 text-sm mb-6">
//           {coach.bio || 'A vibrant coach with the touch of excellence and provides the perfect guide for different sports.'}
//         </p>

//         {/* Coach Info */}
//         <div className="mb-8">
//           <p className="text-sm text-gray-600 mb-3">Coaching experience and specialties:</p>
//           <div className="flex space-x-4">
//             {coach.specialties && coach.specialties.length > 0 ? (
//               coach.specialties.slice(0, 3).map((specialty, index) => (
//                 <div key={index} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
//                   ⚽ {/* You can map specialties to specific icons */}
//                 </div>
//               ))
//             ) : (
//               ['⚽', '🏃‍♂️', '🤸‍♂️'].map((icon, index) => (
//                 <div key={index} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
//                   {icon}
//                 </div>
//               ))
//             )}
//           </div>
//           {coach.experience && (
//             <p className="text-sm text-gray-600 mt-2">{coach.experience} years of coaching experience</p>
//           )}
//         </div>

//         {/* Date and Time Selection */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Set your preferred time and date</h2>
          
//           {/* Date Selection */}
//           <div className="flex items-center justify-center mb-6">
//             <button className="p-2">
//               <ChevronLeft className="w-6 h-6 text-gray-400" />
//             </button>
//             <div className="flex space-x-2 mx-4">
//               {days.map((day) => (
//                 <button
//                   key={day.day}
//                   onClick={() => {
//                     setSelectedDay(day.day);
//                     setSelectedDate(day.date);
//                   }}
//                   className={`px-4 py-3 rounded-lg text-sm font-medium ${
//                     selectedDay === day.day
//                       ? 'bg-purple-500 text-white'
//                       : 'bg-gray-100 text-gray-600'
//                   }`}
//                 >
//                   <div>{day.day}</div>
//                   <div className="text-lg font-bold">{day.date}</div>
//                 </button>
//               ))}
//             </div>
//             <button className="p-2">
//               <ChevronRight className="w-6 h-6 text-gray-400" />
//             </button>
//           </div>

//           {/* Calendar Icon */}
//           <div className="text-center mb-6">
//             <span className="text-gray-500 text-sm">Or</span>
//             <button 
//               onClick={() => setShowCalendar(true)}
//               className="ml-2 p-2 bg-purple-100 rounded-lg"
//             >
//               <Calendar className="w-5 h-5 text-purple-500" />
//             </button>
//           </div>

//           {/* Time Period Selection */}
//           <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
//             {periods.map((period) => (
//               <button
//                 key={period}
//                 onClick={() => setSelectedPeriod(period)}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                   selectedPeriod === period
//                     ? 'bg-purple-500 text-white'
//                     : 'text-gray-600'
//                 }`}
//               >
//                 {period}
//               </button>
//             ))}
//           </div>

//           {/* Time Slots */}
//           <div className="grid grid-cols-4 gap-2 mb-6">
//             {timeSlots[selectedPeriod].map((time, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedTimeSlot(time)}
//                 className={`py-2 px-3 rounded-lg text-sm font-medium border ${
//                   selectedTimeSlot === time
//                     ? 'bg-gray-900 text-white border-gray-900'
//                     : index === 1 || index === 4 || index === 5
//                     ? 'bg-gray-100 text-gray-400 border-gray-200'
//                     : 'bg-white text-gray-700 border-gray-300'
//                 }`}
//                 disabled={index === 1 || index === 4 || index === 5}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>

//           {/* End Time */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               End Time of Session
//             </label>
//             <select
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               <option value="">Select end time</option>
//               {timeSlots[selectedPeriod].map((time, index) => (
//                 <option key={index} value={time}>
//                   {time}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Payment Button */}
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
//             {bookingLoading 
//               ? 'Creating Booking...' 
//               : `Proceed to Pay ₦${calculateTotalPrice().toLocaleString()}`
//             }
//           </button>
//         </div>
//       </div>

//       {/* Calendar Modal */}
//       {showCalendar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
//             {/* Close Button */}
//             <button 
//               onClick={() => setShowCalendar(false)}
//               className="absolute top-4 right-4 p-2"
//             >
//               <X className="w-6 h-6 text-gray-600" />
//             </button>

//             {/* Calendar Header */}
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Calendar</h2>
//               <p className="text-gray-600">Select your date</p>
//             </div>

//             {/* Month Navigation */}
//             <div className="flex items-center justify-between mb-6">
//               <button 
//                 onClick={() => navigateMonth(-1)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//               </button>
              
//               <div className="text-center">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {monthNames[calendarDate.getMonth()]}
//                 </h3>
//                 <p className="text-gray-400 text-sm">{calendarDate.getFullYear()}</p>
//               </div>
              
//               <button 
//                 onClick={() => navigateMonth(1)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Days of Week */}
//             <div className="grid grid-cols-7 gap-1 mb-4">
//               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
//                 <div key={day} className="text-center text-sm text-gray-500 font-medium py-2">
//                   {day}
//                 </div>
//               ))}
//             </div>

//             {/* Calendar Grid */}
//             <div className="grid grid-cols-7 gap-1 mb-8">
//               {generateCalendarDays().map((day, index) => (
//                 <button
//                   key={index}
//                   onClick={() => selectCalendarDate(day)}
//                   className={`
//                     h-10 w-10 rounded-lg text-sm font-medium transition-colors
//                     ${!day.isCurrentMonth 
//                       ? 'text-gray-300' 
//                       : day.day === selectedDate && calendarDate.getMonth() === new Date().getMonth()
//                       ? 'bg-purple-500 text-white'
//                       : 'text-gray-700 hover:bg-gray-100'
//                     }
//                   `}
//                   disabled={!day.isCurrentMonth}
//                 >
//                   {day.day}
//                 </button>
//               ))}
//             </div>

//             {/* Save Button */}
//             <button 
//               onClick={() => setShowCalendar(false)}
//               className="w-full bg-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-purple-600 transition-colors"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChooseCoach;





// pages/ChooseCoach.jsx
// MOBILE RESPONSIVE VERSION - Choose Coach Booking Page
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const ChooseCoach = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { coachId } = useParams();
  
  const [coach, setCoach] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Tue');
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:10 am');
  const [selectedPeriod, setSelectedPeriod] = useState('Morning');
  const [endTime, setEndTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');

  const days = [
    { day: 'Sun', date: 4 },
    { day: 'Mon', date: 5 },
    { day: 'Tue', date: 6 },
  ];

  const periods = ['Morning', 'Afternoon', 'Evening'];

  const timeSlots = {
    Morning: ['8:00 am', '8:10 am', '9:20am', '10:10 am', '10:11 am', '10:10 am', '11:10 am'],
    Afternoon: ['12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'],
    Evening: ['6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm']
  };

  // Fetch coach details
  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await axios.get(`${URL}/coaches/${coachId}`);
        if (response.data.success) {
          setCoach(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching coach:', err);
        setError('Failed to load coach details');
      } finally {
        setLoading(false);
      }
    };

    if (coachId) {
      fetchCoach();
    }
  }, [coachId]);

  // Fetch available time slots
  const fetchAvailableSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(`${URL}/bookings/availability/slots`, {
        params: {
          coachId: coachId,
          date: formattedDate
        }
      });
      
      if (response.data.success) {
        setAvailableSlots(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setError('Failed to load available time slots');
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
    newDate.setHours(hour, parseInt(minutes), 0, 0);
    return newDate;
  };

  // Handle booking creation
  const handleBooking = async () => {
    if (!user) {
      setError('Please login to make a booking');
      return;
    }

    if (!selectedTimeSlot || !endTime) {
      setError('Please select start and end times');
      return;
    }

    setBookingLoading(true);
    try {
      const selectedDateObj = new Date(calendarDate);
      selectedDateObj.setDate(selectedDate);
      
      const startTime = convertTimeToDate(selectedTimeSlot, selectedDateObj);
      const endTimeObj = convertTimeToDate(endTime, selectedDateObj);

      if (endTimeObj <= startTime) {
        setError('End time must be after start time');
        setBookingLoading(false);
        return;
      }

      const token = localStorage.getItem('access_token');
      
      const bookingData = {
        coachId: coachId,
        bookingType: 'coach',
        startTime: startTime.toISOString(),
        endTime: endTimeObj.toISOString(),
        participantsCount: 1,
        notes: `Coaching session with ${coach?.User?.firstName} ${coach?.User?.lastName}`
      };

      const response = await axios.post(`${URL}/bookings`, bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const booking = response.data.data;
        // Navigate to payment page
        navigate(`/payment/${booking.id}`);
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.response?.data?.message || 'Failed to create booking');
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
    if (!coach || !selectedTimeSlot || !endTime) return 0;
    
    const selectedDateObj = new Date(calendarDate);
    selectedDateObj.setDate(selectedDate);
    
    const startTime = convertTimeToDate(selectedTimeSlot, selectedDateObj);
    const endTimeObj = convertTimeToDate(endTime, selectedDateObj);
    
    const durationHours = (endTimeObj - startTime) / (1000 * 60 * 60);
    return durationHours * parseFloat(coach.hourlyRate || 0);
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
    const daysInMonth = getDaysInMonth(calendarDate);
    const firstDay = getFirstDayOfMonth(calendarDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 0);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isNextMonth: false
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isNextMonth: false
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const selectCalendarDate = (day) => {
    if (day.isCurrentMonth) {
      const newDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day.day);
      setCalendarDate(newDate);
      // Update the main date selection
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      setSelectedDay(dayNames[newDate.getDay()]);
      setSelectedDate(day.day);
      setShowCalendar(false);
      
      // Fetch available slots for the selected date
      fetchAvailableSlots(newDate);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Coach not found</p>
        <button onClick={handleBackToExplore} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
          Go Back to Explore
        </button>
      </div>
    );
  }

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
              {coach?.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Coach'}
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
        <div className="bg-gradient-to-r from-green-600 to-blue-800 h-56 sm:h-64 relative overflow-hidden">
          {/* Coach illustration - Mobile Responsive */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 sm:w-80 h-32 sm:h-40">
              {/* Coach figure - Scaled for mobile */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-28 sm:h-32 bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 rounded-t-full"></div>
              
              {/* Coach equipment - Scaled for mobile */}
              <div className="absolute bottom-6 sm:bottom-8 left-1/3 w-6 sm:w-8 h-6 sm:h-8 bg-orange-400 rounded-full"></div>
              <div className="absolute bottom-6 sm:bottom-8 right-1/3 w-5 sm:w-6 h-5 sm:h-6 bg-red-400 rounded-full"></div>
              
              {/* Whistle - Scaled for mobile */}
              <div className="absolute bottom-14 sm:bottom-16 left-1/2 transform -translate-x-1/2 w-2 h-3 sm:h-4 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Clouds - Mobile Responsive */}
          <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-10 sm:w-12 h-5 sm:h-6 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-8 sm:top-12 right-8 sm:right-12 w-6 sm:w-8 h-3 sm:h-4 bg-white rounded-full opacity-60"></div>

          {/* Coach images - Mobile Responsive */}
          <div className="absolute top-24 sm:top-32 right-2 sm:right-4 space-y-2">
            {coach.galleryImages && coach.galleryImages.length > 0 ? (
              coach.galleryImages.slice(0, 2).map((image, index) => (
                <div key={index} className="w-20 sm:w-24 h-12 sm:h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg relative overflow-hidden">
                  <img src={image} alt={`${coach.User?.firstName} coaching`} className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <>
                <div className="w-20 sm:w-24 h-12 sm:h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-2 bg-yellow-400 rounded"></div>
                </div>
                <div className="w-20 sm:w-24 h-12 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-2 bg-green-400 rounded"></div>
                </div>
              </>
            )}
            <button className="w-20 sm:w-24 h-10 sm:h-12 bg-purple-500 text-white text-xs rounded-lg flex items-center justify-center">
              See All
            </button>
          </div>
        </div>
      </div>

      {/* Content - Mobile Responsive */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-24">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Title - Mobile Responsive */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {coach.User ? `${coach.User.firstName} ${coach.User.lastName}` : 'Professional Coach'}
        </h1>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {coach.bio || 'A vibrant coach with the touch of excellence and provides the perfect guide for different sports.'}
        </p>

        {/* Coach Info - Mobile Responsive */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-3">Coaching experience and specialties:</p>
          <div className="flex space-x-3 sm:space-x-4 mb-4">
            {coach.specialties && coach.specialties.length > 0 ? (
              coach.specialties.slice(0, 3).map((specialty, index) => (
                <div key={index} className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg sm:text-xl">
                  ⚽ {/* You can map specialties to specific icons */}
                </div>
              ))
            ) : (
              ['⚽', '🏃‍♂️', '🤸‍♂️'].map((icon, index) => (
                <div key={index} className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg sm:text-xl">
                  {icon}
                </div>
              ))
            )}
          </div>
          {coach.experience && (
            <p className="text-sm text-gray-600 mt-2">{coach.experience} years of coaching experience</p>
          )}
        </div>

        {/* Date and Time Selection - Mobile Responsive */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Set your preferred time and date</h2>
          
          {/* Date Selection - Mobile Responsive */}
          <div className="flex items-center justify-center mb-6">
            <button className="p-1 sm:p-2">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </button>
            <div className="flex space-x-2 mx-4">
              {days.map((day) => (
                <button
                  key={day.day}
                  onClick={() => {
                    setSelectedDay(day.day);
                    setSelectedDate(day.date);
                  }}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm font-medium ${
                    selectedDay === day.day
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <div>{day.day}</div>
                  <div className="text-base sm:text-lg font-bold">{day.date}</div>
                </button>
              ))}
            </div>
            <button className="p-1 sm:p-2">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </button>
          </div>

          {/* Calendar Icon - Mobile Responsive */}
          <div className="text-center mb-6">
            <span className="text-gray-500 text-sm">Or</span>
            <button 
              onClick={() => setShowCalendar(true)}
              className="ml-2 p-2 bg-purple-100 rounded-lg"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            </button>
          </div>

          {/* Time Period Selection - Mobile Responsive */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Time Slots - Mobile Responsive Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
            {timeSlots[selectedPeriod].map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTimeSlot(time)}
                className={`py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium border ${
                  selectedTimeSlot === time
                    ? 'bg-gray-900 text-white border-gray-900'
                    : index === 1 || index === 4 || index === 5
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                }`}
                disabled={index === 1 || index === 4 || index === 5}
              >
                {time}
              </button>
            ))}
          </div>

          {/* End Time - Mobile Responsive */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time of Session
            </label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Select end time</option>
              {timeSlots[selectedPeriod].map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Payment Button - Mobile Responsive */}
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
            ) : (
              `Proceed to Pay ₦${calculateTotalPrice().toLocaleString()}`
            )}
          </button>
        </div>
      </div>

      {/* Calendar Modal - Mobile Responsive */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setShowCalendar(false)}
              className="absolute top-4 right-4 p-2"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Calendar Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Calendar</h2>
              <p className="text-gray-600 text-sm sm:text-base">Select your date</p>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {monthNames[calendarDate.getMonth()]}
                </h3>
                <p className="text-gray-400 text-sm">{calendarDate.getFullYear()}</p>
              </div>
              
              <button 
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center text-xs sm:text-sm text-gray-500 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid - Mobile Responsive */}
            <div className="grid grid-cols-7 gap-1 mb-6 sm:mb-8">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  onClick={() => selectCalendarDate(day)}
                  className={`
                    h-8 w-8 sm:h-10 sm:w-10 rounded-lg text-xs sm:text-sm font-medium transition-colors
                    ${!day.isCurrentMonth 
                      ? 'text-gray-300' 
                      : day.day === selectedDate && calendarDate.getMonth() === new Date().getMonth()
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  disabled={!day.isCurrentMonth}
                >
                  {day.day}
                </button>
              ))}
            </div>

            {/* Save Button */}
            <button 
              onClick={() => setShowCalendar(false)}
              className="w-full bg-purple-500 text-white py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-lg hover:bg-purple-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseCoach;