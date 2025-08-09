// src/services/bookingService.js - Centralized booking API calls
import axios from 'axios';
import { URL } from '../url';

class BookingService {
  constructor() {
    this.baseURL = URL;
  }

  // Get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Create booking
  async createBooking(bookingData) {
    try {
      const response = await axios.post(`${this.baseURL}/bookings`, bookingData, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw this.handleError(error);
    }
  }

  // Get booking by ID
  async getBooking(bookingId) {
    try {
      const response = await axios.get(`${this.baseURL}/bookings/${bookingId}`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw this.handleError(error);
    }
  }

  // Get user bookings
  async getUserBookings(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/users/bookings`, {
        headers: this.getAuthHeaders(),
        params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw this.handleError(error);
    }
  }

  // Update booking status
  async updateBookingStatus(bookingId, status, reason = null) {
    try {
      const response = await axios.patch(`${this.baseURL}/bookings/${bookingId}/status`, {
        status,
        cancellationReason: reason
      }, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw this.handleError(error);
    }
  }

  // Cancel booking
  async cancelBooking(bookingId, reason) {
    try {
      const response = await axios.patch(`${this.baseURL}/bookings/${bookingId}/cancel`, {
        reason
      }, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw this.handleError(error);
    }
  }

  // Get available time slots
  async getAvailableSlots(params) {
    try {
      const response = await axios.get(`${this.baseURL}/bookings/availability/slots`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw this.handleError(error);
    }
  }

  // Validate booking data
  validateBookingData(data) {
    const errors = [];

    if (!data.bookingType || !['facility', 'coach', 'both'].includes(data.bookingType)) {
      errors.push('Invalid booking type');
    }

    if (data.bookingType === 'facility' && !data.facilityId) {
      errors.push('Facility ID is required');
    }

    if (data.bookingType === 'coach' && !data.coachId) {
      errors.push('Coach ID is required');
    }

    if (!data.startTime || !data.endTime) {
      errors.push('Start time and end time are required');
    }

    if (new Date(data.startTime) >= new Date(data.endTime)) {
      errors.push('End time must be after start time');
    }

    if (new Date(data.startTime) <= new Date()) {
      errors.push('Booking time must be in the future');
    }

    return errors;
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // Network error
      return new Error('Network error. Please check your connection.');
    } else {
      // Other error
      return new Error('An unexpected error occurred');
    }
  }

  // Calculate booking duration
  calculateDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }

  // Calculate total price
  calculateTotalPrice(hourlyRate, startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = (end - start) / (1000 * 60 * 60);
    return durationHours * parseFloat(hourlyRate);
  }

  // Format booking for display
  formatBooking(booking) {
    return {
      ...booking,
      formattedStartTime: new Date(booking.startTime).toLocaleString(),
      formattedEndTime: new Date(booking.endTime).toLocaleString(),
      duration: this.calculateDuration(booking.startTime, booking.endTime),
      formattedAmount: new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      }).format(booking.totalAmount)
    };
  }
}

// Export singleton instance
export const bookingService = new BookingService();
export default bookingService;