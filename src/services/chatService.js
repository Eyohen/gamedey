// services/chatService.js
import axios from 'axios';
import { BASE_URL } from '../url';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to all requests
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Get all conversations for the authenticated user
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by status (active|archived|closed)
 * @param {number} params.page - Page number
 * @param {number} params.limit - Results per page
 */
export const getConversations = async (params = {}) => {
  try {
    const response = await apiClient.get('/chat/conversations', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get a specific conversation with messages
 * @param {string} conversationId - Conversation ID
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of messages to return
 * @param {string} params.before - Load messages before this timestamp
 */
export const getConversation = async (conversationId, params = {}) => {
  try {
    const response = await apiClient.get(`/chat/conversations/${conversationId}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error.response?.data || error;
  }
};

/**
 * Send a message to a conversation
 * @param {string} conversationId - Conversation ID
 * @param {Object} messageData - Message data
 * @param {string} messageData.content - Message content
 * @param {string} messageData.messageType - Message type (text|image|file)
 */
export const sendMessage = async (conversationId, messageData) => {
  try {
    const response = await apiClient.post(
      `/chat/conversations/${conversationId}/messages`,
      messageData
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get conversation for a specific booking
 * @param {string} bookingId - Booking ID
 * @param {string} chatWith - Chat type: 'coach' or 'facility'
 */
export const getConversationByBookingId = async (bookingId, chatWith = null) => {
  try {
    const params = {};
    if (chatWith) {
      params.chatWith = chatWith;
    }
    const response = await apiClient.get(`/chat/bookings/${bookingId}/conversation`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation by booking:', error);
    throw error.response?.data || error;
  }
};

/**
 * Mark a conversation as read
 * @param {string} conversationId - Conversation ID
 */
export const markConversationAsRead = async (conversationId) => {
  try {
    const response = await apiClient.patch(`/chat/conversations/${conversationId}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    throw error.response?.data || error;
  }
};

export default {
  getConversations,
  getConversation,
  sendMessage,
  getConversationByBookingId,
  markConversationAsRead
};
