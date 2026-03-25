import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getConversations } from '../../services/chatService';
import ChatBox from '../../components/ChatBox';
import { ChatProvider } from '../../context/ChatContext';

const MessagesInner = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getConversations({ status: 'active', limit: 50 });
      setConversations(response.data || []);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const getConversationName = (conv) => {
    if (conv.coach?.User) {
      return `Coach ${conv.coach.User.firstName} ${conv.coach.User.lastName}`;
    }
    if (conv.coach?.firstName) {
      return `Coach ${conv.coach.firstName} ${conv.coach.lastName}`;
    }
    if (conv.facility?.name) {
      return conv.facility.name;
    }
    if (conv.user) {
      return `${conv.user.firstName} ${conv.user.lastName}`;
    }
    return 'Chat';
  };

  const getConversationAvatar = (conv) => {
    if (conv.coach?.User?.profileImage) return conv.coach.User.profileImage;
    if (conv.coach?.profileImage) return conv.coach.profileImage;
    if (conv.facility?.images?.[0]) return conv.facility.images[0];
    if (conv.user?.profileImage) return conv.user.profileImage;
    return null;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Messages</h1>
        <p className="text-sm text-gray-500">Chat with your coaches and players</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {conversations.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg font-medium">No conversations yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Conversations are created automatically when a booking is confirmed
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black border-r-[6px] border-b-[4px] overflow-hidden">
          {conversations.map((conv) => {
            const name = getConversationName(conv);
            const avatar = getConversationAvatar(conv);
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {/* Avatar */}
                {avatar ? (
                  <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#946BEF] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {getInitials(name)}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{name}</h3>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-sm text-gray-500 truncate">
                      {conv.lastMessagePreview || 'No messages yet — say hello!'}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="bg-[#946BEF] text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 flex-shrink-0 ml-2">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  {/* Booking type badge */}
                  <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    conv.conversationType === 'user_coach' ? 'bg-purple-50 text-purple-600' :
                    conv.conversationType === 'user_facility' ? 'bg-blue-50 text-blue-600' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {conv.conversationType === 'user_coach' ? 'Coach' :
                     conv.conversationType === 'user_facility' ? 'Facility' : 'Chat'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chat Modal */}
      {selectedConversation && (
        <ChatBox
          conversation={selectedConversation}
          onClose={() => {
            setSelectedConversation(null);
            fetchConversations(); // Refresh to update unread counts
          }}
        />
      )}
    </div>
  );
};

const Messages = () => (
  <ChatProvider>
    <MessagesInner />
  </ChatProvider>
);

export default Messages;
