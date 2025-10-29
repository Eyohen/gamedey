// context/ChatContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { BASE_URL } from '../url';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const authContext = useAuth();
  const { user, token } = authContext || {};
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [unreadCounts, setUnreadCounts] = useState({});

  // Initialize Socket.IO connection
  useEffect(() => {
    if (user && token) {
      // Create socket connection - remove /api from BASE_URL for Socket.IO
      const socketUrl = BASE_URL.replace(/\/api$/, '');
      console.log('🔌 Connecting to Socket.IO:', socketUrl);

      const newSocket = io(socketUrl, {
        auth: { token },
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      // Connection events
      newSocket.on('connect', () => {
        console.log('✅ Connected to chat server');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Disconnected from chat server');
        setIsConnected(false);
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      // Chat events
      newSocket.on('conversation-joined', (data) => {
        console.log('Joined conversation:', data.conversationId);
      });

      newSocket.on('new-message', (data) => {
        console.log('New message received:', data);
        if (data.conversationId === activeConversation) {
          setMessages(prev => [...prev, data.message]);
        } else {
          // Increment unread count for this conversation
          setUnreadCounts(prev => ({
            ...prev,
            [data.conversationId]: (prev[data.conversationId] || 0) + 1
          }));
        }
      });

      newSocket.on('user-typing', (data) => {
        if (data.conversationId === activeConversation) {
          setTypingUsers(prev => {
            const newSet = new Set(prev);
            if (data.isTyping) {
              newSet.add(data.userId);
            } else {
              newSet.delete(data.userId);
            }
            return newSet;
          });

          // Auto-clear typing indicator after 3 seconds
          if (data.isTyping) {
            setTimeout(() => {
              setTypingUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(data.userId);
                return newSet;
              });
            }, 3000);
          }
        }
      });

      newSocket.on('user-joined', (data) => {
        console.log('User joined:', data.userId);
      });

      newSocket.on('user-left', (data) => {
        console.log('User left:', data.userId);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.close();
      };
    }
  }, [user, token]);

  // Join a conversation
  const joinConversation = useCallback((conversationId) => {
    if (socket && isConnected) {
      // Leave previous conversation if exists
      if (activeConversation && activeConversation !== conversationId) {
        socket.emit('leave-conversation', { conversationId: activeConversation });
      }

      // Join new conversation
      socket.emit('join-conversation', { conversationId });
      setActiveConversation(conversationId);

      // Reset unread count for this conversation
      setUnreadCounts(prev => ({
        ...prev,
        [conversationId]: 0
      }));
    }
  }, [socket, isConnected, activeConversation]);

  // Leave a conversation
  const leaveConversation = useCallback((conversationId) => {
    if (socket && isConnected) {
      socket.emit('leave-conversation', { conversationId });
      if (activeConversation === conversationId) {
        setActiveConversation(null);
        setMessages([]);
        setTypingUsers(new Set());
      }
    }
  }, [socket, isConnected, activeConversation]);

  // Send typing indicator
  const sendTypingIndicator = useCallback((conversationId, isTyping) => {
    if (socket && isConnected) {
      socket.emit('typing', { conversationId, isTyping });
    }
  }, [socket, isConnected]);

  // Broadcast message sent (called after API call)
  const broadcastMessage = useCallback((conversationId, message) => {
    if (socket && isConnected) {
      socket.emit('message-sent', { conversationId, message });
    }
  }, [socket, isConnected]);

  // Mark message as read
  const markAsRead = useCallback((conversationId, messageId) => {
    if (socket && isConnected) {
      socket.emit('mark-read', { conversationId, messageId });
    }
  }, [socket, isConnected]);

  const value = {
    socket,
    isConnected,
    activeConversation,
    messages,
    setMessages,
    typingUsers,
    unreadCounts,
    joinConversation,
    leaveConversation,
    sendTypingIndicator,
    broadcastMessage,
    markAsRead
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook to use chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
