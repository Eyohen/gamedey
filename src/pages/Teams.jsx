// //pages/Teams.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Ellipsis,
//   TrendingUp,
//   CirclePlus,
//   Circle,
//   Users,
//   Trophy,
//   Calendar,
//   MapPin,
//   Edit,
//   Trash2,
//   Plus,
//   Search,
//   Filter
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// const Teams = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [activeButton, setActiveButton] = useState('football');
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [showTeamDetails, setShowTeamDetails] = useState(false);

//   const sports = [
//     { id: 'football', name: 'Football', icon: '⚽' },
//     { id: 'basketball', name: 'Basketball', icon: '🏀' },
//     { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
//     { id: 'baseball', name: 'Baseball', icon: '⚾' },
//     { id: 'tennis', name: 'Tennis', icon: '🎾' }
//   ];

//   // Fetch user's teams
//   const fetchTeams = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view teams');
//         return;
//       }

//       // Since there's no specific teams endpoint in your backend,
//       // we'll simulate with user data and create a teams structure
//       // In a real app, you'd have a teams endpoint
//       const response = await axios.get(`${URL}/users/profile`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         // Simulate teams data - in a real app this would come from a teams endpoint
//         const mockTeams = [
//           {
//             id: 1,
//             name: 'Football March Team',
//             sport: 'football',
//             members: [
//               { id: 1, name: 'Andrew Park', role: 'Captain' },
//               { id: 2, name: 'David Jack', role: 'Player' },
//               { id: 3, name: 'Ben Dan', role: 'Player' },
//               { id: 4, name: 'Mike Johnson', role: 'Player' }
//             ],
//             coach: 'Jack Anderson',
//             venue: 'Lekki Lagos',
//             formation: '4-4-2',
//             created: new Date().toISOString(),
//             wins: 5,
//             losses: 2,
//             draws: 1
//           },
//           {
//             id: 2,
//             name: 'Basketball Warriors',
//             sport: 'basketball',
//             members: [
//               { id: 1, name: 'John Smith', role: 'Captain' },
//               { id: 2, name: 'Mike Brown', role: 'Player' },
//               { id: 3, name: 'Alex Johnson', role: 'Player' },
//               { id: 4, name: 'Chris Davis', role: 'Player' },
//               { id: 5, name: 'Ryan Wilson', role: 'Player' }
//             ],
//             coach: 'Coach Mike',
//             venue: 'Lagos Sports Center',
//             formation: '2-3 Zone',
//             created: new Date().toISOString(),
//             wins: 8,
//             losses: 1,
//             draws: 0
//           }
//         ];
        
//         setTeams(mockTeams);
//       }
//     } catch (err) {
//       console.error('Error fetching teams:', err);
//       setError(err.response?.data?.message || 'Failed to fetch teams');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter teams by sport and search term
//   const filteredTeams = teams.filter(team => {
//     const matchesSport = team.sport === activeButton;
//     const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          team.coach.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSport && matchesSearch;
//   });

//   // Delete team
//   const deleteTeam = async (teamId) => {
//     if (!window.confirm('Are you sure you want to delete this team?')) return;

//     try {
//       // In a real app, you'd make an API call to delete the team
//       // const response = await axios.delete(`${URL}/teams/${teamId}`, {
//       //   headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
//       // });

//       // For now, just remove from local state
//       setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
//     } catch (err) {
//       console.error('Error deleting team:', err);
//       setError('Failed to delete team');
//     }
//   };

//   // View team details
//   const viewTeamDetails = (team) => {
//     setSelectedTeam(team);
//     setShowTeamDetails(true);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   // Team card component
//   const TeamCard = ({ team }) => (
//     <div className='border-2 border-black rounded-2xl py-4 px-4 bg-[#F3F1E0] hover:shadow-lg transition-shadow'>
//       <div className='flex justify-between items-start mb-3'>
//         <div className='flex-1'>
//           <h3 className='text-lg font-semibold text-gray-900 mb-2'>{team.name}</h3>
          
//           {/* Team Stats */}
//           <div className='flex items-center gap-4 mb-3'>
//             <div className='flex items-center gap-1 text-sm text-gray-600'>
//               <Trophy size={14} className="text-yellow-500" />
//               <span>{team.wins}W-{team.losses}L-{team.draws}D</span>
//             </div>
//             <div className='flex items-center gap-1 text-sm text-gray-600'>
//               <Users size={14} />
//               <span>{team.members.length} Members</span>
//             </div>
//           </div>

//           {/* Coach and Venue */}
//           <div className='text-sm text-gray-600 mb-3'>
//             <p className='flex items-center gap-1 mb-1'>
//               <Circle size={12} />
//               Coach: {team.coach}
//             </p>
//             <p className='flex items-center gap-1'>
//               <MapPin size={12} />
//               {team.venue}
//             </p>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className='flex flex-col gap-2'>
//           <button 
//             onClick={() => viewTeamDetails(team)}
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <Ellipsis size={20} />
//           </button>
//           <button 
//             onClick={() => deleteTeam(team.id)}
//             className="text-gray-600 hover:text-red-600 transition-colors"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Team Members Preview */}
//       <div className='mb-3'>
//         <p className='text-sm font-medium text-gray-700 mb-2'>Members:</p>
//         <div className='space-y-1'>
//           {team.members.slice(0, 3).map((member, index) => (
//             <p key={member.id} className='text-sm text-gray-600 flex items-center gap-1'>
//               <Circle size={10} />
//               {member.name} {member.role === 'Captain' && '(C)'}
//             </p>
//           ))}
//           {team.members.length > 3 && (
//             <p className='text-sm text-gray-500'>
//               +{team.members.length - 3} more members
//             </p>
//           )}
//         </div>
//       </div>

//       {/* View Details Button */}
//       <button 
//         onClick={() => viewTeamDetails(team)}
//         className='w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium'
//       >
//         View Details
//       </button>
//     </div>
//   );

//   // Team Details Modal
//   const TeamDetailsModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">{selectedTeam?.name}</h2>
//           <button 
//             onClick={() => setShowTeamDetails(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>

//         {selectedTeam && (
//           <div className="space-y-6">
//             {/* Team Info */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
//                 <p className="text-gray-900 capitalize">{selectedTeam.sport}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Formation</label>
//                 <p className="text-gray-900">{selectedTeam.formation}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
//                 <p className="text-gray-900">{selectedTeam.coach}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
//                 <p className="text-gray-900">{selectedTeam.venue}</p>
//               </div>
//             </div>

//             {/* Team Stats */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Statistics</h3>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="bg-green-50 p-3 rounded-lg text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedTeam.wins}</p>
//                   <p className="text-sm text-gray-600">Wins</p>
//                 </div>
//                 <div className="bg-red-50 p-3 rounded-lg text-center">
//                   <p className="text-2xl font-bold text-red-600">{selectedTeam.losses}</p>
//                   <p className="text-sm text-gray-600">Losses</p>
//                 </div>
//                 <div className="bg-yellow-50 p-3 rounded-lg text-center">
//                   <p className="text-2xl font-bold text-yellow-600">{selectedTeam.draws}</p>
//                   <p className="text-sm text-gray-600">Draws</p>
//                 </div>
//               </div>
//             </div>

//             {/* Team Members */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Members</h3>
//               <div className="space-y-2">
//                 {selectedTeam.members.map((member) => (
//                   <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                         {member.name.charAt(0)}
//                       </div>
//                       <span className="font-medium">{member.name}</span>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       member.role === 'Captain' 
//                         ? 'bg-yellow-100 text-yellow-800' 
//                         : 'bg-gray-100 text-gray-600'
//                     }`}>
//                       {member.role}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3 pt-4 border-t">
//               <button 
//                 onClick={() => navigate(`/edit-team/${selectedTeam.id}`)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
//               >
//                 <Edit size={16} />
//                 Edit Team
//               </button>
//               <button 
//                 onClick={() => {
//                   deleteTeam(selectedTeam.id);
//                   setShowTeamDetails(false);
//                 }}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
//               >
//                 <Trash2 size={16} />
//                 Delete Team
//               </button>
//               <button 
//                 onClick={() => setShowTeamDetails(false)}
//                 className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className='p-6'>
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {/* Header */}
//       <div className='flex justify-between items-center mb-6'>
//         {/* Sports Filter Tabs */}
//         <div className='bg-gray-100 px-2 py-2 rounded-lg'>
//           <div className='flex gap-2'>
//             {sports.map((sport) => (
//               <button
//                 key={sport.id}
//                 className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-2 ${
//                   activeButton === sport.id
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setActiveButton(sport.id)}
//               >
//                 <span>{sport.icon}</span>
//                 <span>{sport.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search and Create */}
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             <input
//               type="text"
//               placeholder="Search teams..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
//             />
//           </div>
          
//           <button 
//             onClick={() => navigate('/create-team')} 
//             className='text-[#946BEF] font-medium flex gap-x-1 items-center cursor-pointer hover:text-[#7c3aed] transition-colors border border-[#946BEF] px-4 py-2 rounded-lg hover:bg-[#946BEF] hover:text-white'
//           >
//             <CirclePlus size={16} />
//             Create New Team
//           </button>
//         </div>
//       </div>

//       {/* Teams Grid */}
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
//         {filteredTeams.length > 0 ? (
//           filteredTeams.map((team) => (
//             <TeamCard key={team.id} team={team} />
//           ))
//         ) : (
//           <div className="col-span-full text-center py-12">
//             <Users size={48} className="mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {searchTerm ? 'No teams found' : `No ${activeButton} teams yet`}
//             </h3>
//             <p className="text-gray-500 mb-4">
//               {searchTerm 
//                 ? 'Try adjusting your search terms' 
//                 : `Create your first ${activeButton} team to get started!`
//               }
//             </p>
//             {!searchTerm && (
//               <button 
//                 onClick={() => navigate('/create-team')}
//                 className="bg-[#946BEF] text-white px-6 py-2 rounded-lg hover:bg-[#7c3aed] transition-colors flex items-center gap-2 mx-auto"
//               >
//                 <Plus size={16} />
//                 Create Team
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Team Details Modal */}
//       {showTeamDetails && selectedTeam && <TeamDetailsModal />}

//       {/* Quick Stats */}
//       {filteredTeams.length > 0 && (
//         <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             {sports.find(s => s.id === activeButton)?.name} Teams Summary
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-purple-600">{filteredTeams.length}</p>
//               <p className="text-sm text-gray-600">Total Teams</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-green-600">
//                 {filteredTeams.reduce((sum, team) => sum + team.members.length, 0)}
//               </p>
//               <p className="text-sm text-gray-600">Total Members</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-blue-600">
//                 {filteredTeams.reduce((sum, team) => sum + team.wins, 0)}
//               </p>
//               <p className="text-sm text-gray-600">Total Wins</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-yellow-600">
//                 {Math.round(filteredTeams.reduce((sum, team) => sum + team.wins, 0) / 
//                   Math.max(filteredTeams.reduce((sum, team) => sum + team.wins + team.losses + team.draws, 0), 1) * 100)}%
//               </p>
//               <p className="text-sm text-gray-600">Win Rate</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Teams;









//pages/Teams.jsx
// MOBILE RESPONSIVE VERSION - Sports Teams Management Page
import React, { useState, useEffect } from 'react';
import {
  Ellipsis,
  TrendingUp,
  CirclePlus,
  Circle,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Teams = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('football');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showTeamDetails, setShowTeamDetails] = useState(false);

  const sports = [
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
    { id: 'baseball', name: 'Baseball', icon: '⚾' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' }
  ];

  // Fetch user's teams
  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view teams');
        return;
      }

      // Since there's no specific teams endpoint in your backend,
      // we'll simulate with user data and create a teams structure
      // In a real app, you'd have a teams endpoint
      const response = await axios.get(`${URL}/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        // Simulate teams data - in a real app this would come from a teams endpoint
        const mockTeams = [
          {
            id: 1,
            name: 'Football March Team',
            sport: 'football',
            members: [
              { id: 1, name: 'Andrew Park', role: 'Captain' },
              { id: 2, name: 'David Jack', role: 'Player' },
              { id: 3, name: 'Ben Dan', role: 'Player' },
              { id: 4, name: 'Mike Johnson', role: 'Player' }
            ],
            coach: 'Jack Anderson',
            venue: 'Lekki Lagos',
            formation: '4-4-2',
            created: new Date().toISOString(),
            wins: 5,
            losses: 2,
            draws: 1
          },
          {
            id: 2,
            name: 'Basketball Warriors',
            sport: 'basketball',
            members: [
              { id: 1, name: 'John Smith', role: 'Captain' },
              { id: 2, name: 'Mike Brown', role: 'Player' },
              { id: 3, name: 'Alex Johnson', role: 'Player' },
              { id: 4, name: 'Chris Davis', role: 'Player' },
              { id: 5, name: 'Ryan Wilson', role: 'Player' }
            ],
            coach: 'Coach Mike',
            venue: 'Lagos Sports Center',
            formation: '2-3 Zone',
            created: new Date().toISOString(),
            wins: 8,
            losses: 1,
            draws: 0
          }
        ];
        
        setTeams(mockTeams);
      }
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.response?.data?.message || 'Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  // Filter teams by sport and search term
  const filteredTeams = teams.filter(team => {
    const matchesSport = team.sport === activeButton;
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.coach.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesSearch;
  });

  // Delete team
  const deleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;

    try {
      // In a real app, you'd make an API call to delete the team
      // const response = await axios.delete(`${URL}/teams/${teamId}`, {
      //   headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      // });

      // For now, just remove from local state
      setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
    } catch (err) {
      console.error('Error deleting team:', err);
      setError('Failed to delete team');
    }
  };

  // View team details
  const viewTeamDetails = (team) => {
    setSelectedTeam(team);
    setShowTeamDetails(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Team card component - Mobile Responsive
  const TeamCard = ({ team }) => (
    <div className="border-2 border-black rounded-2xl py-4 px-4 bg-[#F3F1E0] hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{team.name}</h3>
          
          {/* Team Stats - Mobile Responsive */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Trophy size={14} className="text-yellow-500 flex-shrink-0" />
              <span className="whitespace-nowrap">{team.wins}W-{team.losses}L-{team.draws}D</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users size={14} className="flex-shrink-0" />
              <span className="whitespace-nowrap">{team.members.length} Members</span>
            </div>
          </div>

          {/* Coach and Venue - Mobile Responsive */}
          <div className="text-sm text-gray-600 mb-3">
            <p className="flex items-start gap-1 mb-1">
              <Circle size={12} className="mt-0.5 flex-shrink-0" />
              <span className="truncate">Coach: {team.coach}</span>
            </p>
            <p className="flex items-start gap-1">
              <MapPin size={12} className="mt-0.5 flex-shrink-0" />
              <span className="truncate">{team.venue}</span>
            </p>
          </div>
        </div>

        {/* Actions - Mobile Responsive */}
        <div className="flex flex-col gap-2 ml-2">
          <button 
            onClick={() => viewTeamDetails(team)}
            className="text-gray-600 hover:text-blue-600 transition-colors p-1"
            aria-label="View team details"
          >
            <Ellipsis size={20} />
          </button>
          <button 
            onClick={() => deleteTeam(team.id)}
            className="text-gray-600 hover:text-red-600 transition-colors p-1"
            aria-label="Delete team"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Team Members Preview */}
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Members:</p>
        <div className="space-y-1">
          {team.members.slice(0, 3).map((member, index) => (
            <p key={member.id} className="text-sm text-gray-600 flex items-start gap-1">
              <Circle size={10} className="mt-1 flex-shrink-0" />
              <span className="truncate">
                {member.name} {member.role === 'Captain' && '(C)'}
              </span>
            </p>
          ))}
          {team.members.length > 3 && (
            <p className="text-sm text-gray-500">
              +{team.members.length - 3} more members
            </p>
          )}
        </div>
      </div>

      {/* View Details Button */}
      <button 
        onClick={() => viewTeamDetails(team)}
        className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        View Details
      </button>
    </div>
  );

  // Team Details Modal - Mobile Responsive
  const TeamDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate pr-4">
            {selectedTeam?.name}
          </h2>
          <button 
            onClick={() => setShowTeamDetails(false)}
            className="text-gray-500 hover:text-gray-700 flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {selectedTeam && (
            <div className="space-y-6">
              {/* Team Info - Mobile Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                  <p className="text-gray-900 capitalize">{selectedTeam.sport}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formation</label>
                  <p className="text-gray-900">{selectedTeam.formation}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
                  <p className="text-gray-900 truncate">{selectedTeam.coach}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <p className="text-gray-900 truncate">{selectedTeam.venue}</p>
                </div>
              </div>

              {/* Team Stats - Mobile Responsive */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedTeam.wins}</p>
                    <p className="text-sm text-gray-600">Wins</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-600">{selectedTeam.losses}</p>
                    <p className="text-sm text-gray-600">Losses</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-600">{selectedTeam.draws}</p>
                    <p className="text-sm text-gray-600">Draws</p>
                  </div>
                </div>
              </div>

              {/* Team Members - Mobile Responsive */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Members</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <span className="font-medium truncate">{member.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                        member.role === 'Captain' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <button 
                  onClick={() => navigate(`/edit-team/${selectedTeam.id}`)}
                  className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit Team
                </button>
                <button 
                  onClick={() => {
                    deleteTeam(selectedTeam.id);
                    setShowTeamDetails(false);
                  }}
                  className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete Team
                </button>
                <button 
                  onClick={() => setShowTeamDetails(false)}
                  className="w-full sm:w-auto border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Header - Mobile Responsive */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Sports Filter Tabs - Mobile Responsive */}
        <div className="overflow-x-auto">
          <div className="bg-gray-100 px-2 py-2 rounded-lg min-w-fit">
            <div className="flex gap-2">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap text-sm ${
                    activeButton === sport.id
                      ? 'bg-white text-black'
                      : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveButton(sport.id)}
                >
                  <span>{sport.icon}</span>
                  <span>{sport.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Create - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
            />
          </div>
          
          <button 
            onClick={() => navigate('/create-team')} 
            className="text-[#946BEF] font-medium flex gap-x-2 items-center justify-center cursor-pointer hover:text-[#7c3aed] transition-colors border border-[#946BEF] px-4 py-2 rounded-lg hover:bg-[#946BEF] hover:text-white whitespace-nowrap"
          >
            <CirclePlus size={16} />
            Create New Team
          </button>
        </div>
      </div>

      {/* Teams Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No teams found' : `No ${activeButton} teams yet`}
            </h3>
            <p className="text-gray-500 mb-4 px-4">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : `Create your first ${activeButton} team to get started!`
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={() => navigate('/create-team')}
                className="bg-[#946BEF] text-white px-6 py-2 rounded-lg hover:bg-[#7c3aed] transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus size={16} />
                Create Team
              </button>
            )}
          </div>
        )}
      </div>

      {/* Team Details Modal */}
      {showTeamDetails && selectedTeam && <TeamDetailsModal />}

      {/* Quick Stats - Mobile Responsive */}
      {filteredTeams.length > 0 && (
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {sports.find(s => s.id === activeButton)?.name} Teams Summary
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{filteredTeams.length}</p>
              <p className="text-sm text-gray-600">Total Teams</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {filteredTeams.reduce((sum, team) => sum + team.members.length, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredTeams.reduce((sum, team) => sum + team.wins, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Wins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {Math.round(filteredTeams.reduce((sum, team) => sum + team.wins, 0) / 
                  Math.max(filteredTeams.reduce((sum, team) => sum + team.wins + team.losses + team.draws, 0), 1) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Win Rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;