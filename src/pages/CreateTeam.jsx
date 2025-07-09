// import React, {useState} from 'react'
// import {
//   TrendingUp,
//   Star,
//   Trash,
//   UserRoundPen,
//   CirclePlus,
//   CircleChevronLeft
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';
// import profilepic from "../assets/profilepic.jpg"

// const CreateTeam = () => {
//     const navigate = useNavigate()

//   return (
//     <div className='px-6'>
//                <div onClick={()=>navigate(-1)} className='flex gap-x-2 font-semibold text-xl'><CircleChevronLeft size={28} /> Team</div>
   
//         <div className='bg-gray-300 p-4 rounded-full flex justify-center items-center w-[70px] h-[70px] mt-4'><UserRoundPen /></div>
  

//       <div className='border-b pt-9'></div>

//       <div className='flex gap-32 py-9'>


//         <div>
//           <p className='font-semibold text-lg'>Name of Your Team</p>
//           <p className='font-normal'>Choose your preferred name of your team</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1 font-medium'>Team Name</p>
//             <input placeholder='Enter your Team Name' className='px-2 rounded-xl py-2 border border-gray-500 w-[320px]' />
//           </div>
        
//         </div>



//       </div>


//       <div className='border-b '></div>


//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Type of Sport</p>
//           <p className='font-normal'>Select by clicking your sport for your team</p>
//         </div>

//         <div>
//           <div className='flex gap-x-4 font-medium'>
//         <p>Football</p>
//         <p>Long Tennis</p>
//         <p>Volleyball</p>
//           </div>

//         </div>

//       </div>


//   <div className='border-b '></div>


// <div className='flex gap-24 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Team Members</p>
//           <p className='font-normal'>Add team members to your specified sport.</p>
//         </div>

//         <div>
//           <div className='flex  items-center gap-x-2'>
//             <p className='py-1'><CirclePlus /></p>
//           <p>Team Member</p>
//           </div>
         
//         </div>


// </div>

// <div className='flex gap-x-6'>
//   <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
//     <button className='bg-[#946BEF] text-white px-12 py-2 rounded-lg'>Save</button>

// </div>

//     </div>
//   )
// }

// export default CreateTeam














// // Updated CreateTeam.jsx 
// import React, { useState } from 'react';
// import {
//   UserRoundPen,
//   CirclePlus,
//   CircleChevronLeft
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// const CreateTeam = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     teamName: '',
//     sport: '',
//     members: []
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const sports = ['Football', 'Basketball', 'Volleyball', 'Tennis'];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSportSelect = (sport) => {
//     setFormData(prev => ({
//       ...prev,
//       sport
//     }));
//   };

//   const handleSave = async () => {
//     if (!formData.teamName) {
//       setError('Team name is required');
//       return;
//     }
//     if (!formData.sport) {
//       setError('Please select a sport');
//       return;
//     }

//     setLoading(true);
//     try {
//       // TODO: Implement team creation API call when backend supports it
//       console.log('Creating team:', formData);
//       navigate('/teams');
//     } catch (err) {
//       setError('Failed to create team');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='px-6'>
//       <div 
//         onClick={() => navigate(-1)} 
//         className='flex gap-x-2 font-semibold text-xl cursor-pointer hover:text-[#7042D2] transition-colors'
//       >
//         <CircleChevronLeft size={28} /> 
//         Team
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 my-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       <div className='bg-gray-300 p-4 rounded-full flex justify-center items-center w-[70px] h-[70px] mt-4'>
//         <UserRoundPen />
//       </div>

//       <div className='border-b pt-9'></div>

//       {/* Team Name Section */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Name of Your Team</p>
//           <p className='font-normal text-gray-600'>Choose your preferred name of your team</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1 font-medium'>Team Name</p>
//             <input 
//               name="teamName"
//               value={formData.teamName}
//               onChange={handleChange}
//               placeholder='Enter your Team Name' 
//               className='px-3 py-2 rounded-xl border border-gray-500 w-[320px] focus:outline-none focus:ring-2 focus:ring-[#7042D2] focus:border-transparent'
//             />
//           </div>
//         </div>
//       </div>

//       <div className='border-b'></div>

//       {/* Sport Selection */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Type of Sport</p>
//           <p className='font-normal text-gray-600'>Select by clicking your sport for your team</p>
//         </div>

//         <div>
//           <div className='flex gap-x-4 font-medium'>
//             {sports.map((sport) => (
//               <button
//                 key={sport}
//                 onClick={() => handleSportSelect(sport)}
//                 className={`px-4 py-2 rounded-lg border-2 transition-colors ${
//                   formData.sport === sport
//                     ? 'border-[#7042D2] bg-[#7042D2] text-white'
//                     : 'border-gray-300 text-gray-700 hover:border-[#7042D2] hover:text-[#7042D2]'
//                 }`}
//               >
//                 {sport}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className='border-b'></div>

//       {/* Team Members Section */}
//       <div className='flex gap-24 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Team Members</p>
//           <p className='font-normal text-gray-600'>Add team members to your specified sport.</p>
//         </div>

//         <div>
//           <div className='flex items-center gap-x-2 cursor-pointer hover:text-[#7042D2] transition-colors'>
//             <p className='py-1'><CirclePlus /></p>
//             <p>Add Team Member</p>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className='flex gap-x-6 pb-8'>
//         <button 
//           onClick={() => navigate(-1)}
//           className='border-2 border-gray-400 text-gray-600 px-12 py-2 rounded-lg hover:bg-gray-100 transition-colors'
//         >
//           Cancel
//         </button>
//         <button 
//           onClick={handleSave}
//           disabled={loading}
//           className={`bg-[#946BEF] text-white px-12 py-2 rounded-lg hover:bg-[#7a3bc7] transition-colors ${
//             loading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? 'Saving...' : 'Save'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateTeam;






import React, { useState } from 'react';
import {
  UserPen,
  Plus,
  ChevronLeft,
  ChevronDown,
  Search,
  User
} from 'lucide-react';

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    teamName: 'Adax Club',
    sport: 'Long Tennis',
    members: [
      { id: 1, name: 'David Jack', avatar: null },
      { id: 2, name: 'David Jack', avatar: null },
      { id: 3, name: 'David Jack', avatar: null },
      { id: 4, name: 'David Jack', avatar: null },
      { id: 5, name: 'David Jack', avatar: null },
      { id: 6, name: 'David Jack', avatar: null }
    ],
    formation: '2-2 Players',
    coach: 'Jack Anderson',
    venue: 'Lekki Lagos'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFormationDropdown, setShowFormationDropdown] = useState(false);

  const sports = [
    { 
      name: 'Football', 
      icon: '⚽',
      formations: ['4-4-2', '4-3-3', '3-5-2', '4-2-3-1', '5-3-2'],
      positions: 11
    },
    { 
      name: 'Long Tennis', 
      icon: '🎾',
      formations: ['Singles', 'Doubles'],
      positions: 2
    },
    { 
      name: 'Volley Ball', 
      icon: '🏐',
      formations: ['6-2', '5-1', '4-2', '6-0'],
      positions: 6
    }
  ];

  const getCurrentSport = () => sports.find(s => s.name === formData.sport) || sports[1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSportSelect = (sportName) => {
    const sport = sports.find(s => s.name === sportName);
    setFormData(prev => ({
      ...prev,
      sport: sportName,
      formation: sport.formations[0]
    }));
  };

  const handleFormationSelect = (formation) => {
    setFormData(prev => ({
      ...prev,
      formation
    }));
    setShowFormationDropdown(false);
  };

  const addTeamMember = () => {
    const newMember = {
      id: formData.members.length + 1,
      name: 'Team Member',
      avatar: null
    };
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
  };

  const renderSportField = () => {
    const currentSport = getCurrentSport();
    
    if (currentSport.name === 'Football') {
      return (
        <div className="w-80 h-96 bg-green-500 relative rounded-lg border-4 border-white overflow-hidden">
          {/* Football Field */}
          <div className="absolute inset-2 border-2 border-white rounded">
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
            
            {/* Goal Areas */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 border-2 border-white border-t-0"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 border-2 border-white border-b-0"></div>
            
            {/* Penalty Areas */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-16 border-2 border-white border-t-0"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-16 border-2 border-white border-b-0"></div>
            
            {/* Player Positions */}
            {formData.members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="absolute w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${25 + (index * 16)}%`,
                  top: `${30 + (index % 2) * 40}%`
                }}
              >
                <User size={16} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (currentSport.name === 'Long Tennis') {
      return (
        <div className="w-80 h-96 bg-red-600 relative rounded-lg border-4 border-white overflow-hidden">
          {/* Tennis Court */}
          <div className="absolute inset-4 border-2 border-white">
            {/* Service Lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white transform -translate-x-1/2"></div>
            <div className="absolute left-0 right-0 top-1/4 h-0.5 bg-white"></div>
            <div className="absolute left-0 right-0 bottom-1/4 h-0.5 bg-white"></div>
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white transform -translate-y-1/2"></div>
            
            {/* Service Boxes */}
            <div className="absolute top-1/4 bottom-1/2 left-0 w-1/2 border-r border-white"></div>
            <div className="absolute top-1/2 bottom-1/4 left-0 w-1/2 border-r border-white"></div>
            <div className="absolute top-1/4 bottom-1/2 right-0 w-1/2 border-l border-white"></div>
            <div className="absolute top-1/2 bottom-1/4 right-0 w-1/2 border-l border-white"></div>
            
            {/* Player Positions */}
            {formData.members.slice(0, 2).map((member, index) => (
              <div
                key={member.id}
                className="absolute w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: '50%',
                  top: index === 0 ? '25%' : '75%'
                }}
              >
                <User size={16} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (currentSport.name === 'Volley Ball') {
      return (
        <div className="w-80 h-96 bg-orange-400 relative rounded-lg border-4 border-white overflow-hidden">
          {/* Volleyball Court */}
          <div className="absolute inset-4 border-2 border-white">
            {/* Center Line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white transform -translate-y-1/2"></div>
            
            {/* Attack Lines */}
            <div className="absolute left-0 right-0 top-1/3 h-0.5 bg-white"></div>
            <div className="absolute left-0 right-0 bottom-1/3 h-0.5 bg-white"></div>
            
            {/* Net */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-white transform -translate-y-1/2 z-10"></div>
            
            {/* Player Positions */}
            {formData.members.slice(0, 6).map((member, index) => (
              <div
                key={member.id}
                className="absolute w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${20 + (index % 3) * 30}%`,
                  top: index < 3 ? '25%' : '75%'
                }}
              >
                <User size={16} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  const handleSave = async () => {
    if (!formData.teamName) {
      setError('Team name is required');
      return;
    }
    if (!formData.sport) {
      setError('Please select a sport');
      return;
    }

    setLoading(true);
    try {
      console.log('Creating team:', formData);
      // Navigate back or show success message
    } catch (err) {
      setError('Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xl font-semibold hover:text-purple-600 transition-colors">
            <ChevronLeft size={28} />
            <span className="text-gray-400">Team</span>
            <span className="text-gray-600">›</span>
            <span>Create Team</span>
          </button>
        </div>
        
        {/* <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for anything..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <span className="font-medium">Abiodun Ayobami</span>
            <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
            <ChevronDown size={20} className="text-gray-600" />
          </div>
        </div> */}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-8">
          {/* Team Icon */}
          <div className="flex flex-col items-start">
            <div className="relative">
              <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center">
                <UserPen size={32} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
          </div>

          {/* Name of Your Team */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Name of Your Team</h3>
            <p className="text-gray-600 text-sm mb-4">Choose your preferred name of your team.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
              <input
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type of Sport */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Type of Sport</h3>
            <p className="text-gray-600 text-sm mb-4">Select by clicking your sport for your team</p>
            <div className="grid grid-cols-1 gap-4">
              {sports.map((sport) => (
                <button
                  key={sport.name}
                  onClick={() => handleSportSelect(sport.name)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.sport === sport.name
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{sport.icon}</div>
                    <div className="text-left">
                      <div className="font-medium">{sport.name}</div>
                      <div className="text-xs text-gray-500">{sport.positions} players</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Team Members</h3>
            <p className="text-gray-600 text-sm mb-4">Add team members to your specified sport.</p>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {formData.members.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-1">
                    <User size={20} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">{member.name}</span>
                </div>
              ))}
            </div>
            <button
              onClick={addTeamMember}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Plus size={20} />
              <span>Team Member</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-8">
          {/* Team Positions */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Team Positions</h3>
            <p className="text-gray-600 text-sm mb-4">Click to allocate positions to your team</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Formation</label>
              <div className="relative">
                <button
                  onClick={() => setShowFormationDropdown(!showFormationDropdown)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <span>{formData.formation}</span>
                  <ChevronDown size={20} className="text-gray-600" />
                </button>
                
                {showFormationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {getCurrentSport().formations.map((formation) => (
                      <button
                        key={formation}
                        onClick={() => handleFormationSelect(formation)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {formation}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sports Field */}
            <div className="flex justify-center mb-8">
              {renderSportField()}
            </div>
          </div>

          {/* Other Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Other Informations</h3>
            <p className="text-gray-600 text-sm mb-4">Coach and Match venue</p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coach</label>
                <input
                  name="coach"
                  value={formData.coach}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Match Venue</label>
                <input
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8">
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Create Team'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;