// src/pages/AllFacilities.jsx - User Frontend
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Users,
  ChevronDown,
  SlidersHorizontal,
  X,
  Heart,
  Share2,
  Wifi,
  Car,
  Coffee
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import stadium1 from '../../assets/stadium1.png';
import stadium2 from '../../assets/stadium2.png';
import stadium3 from '../../assets/stadium3.png';

const AllFacilities = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const [filters, setFilters] = useState({
    sport: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    amenities: [],
    priceRange: 'all'
  });

  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'price_low', 'price_high', 'newest'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  // Sample sports and locations for filters
  const sports = [
    'Football', 'Basketball', 'Tennis', 'Volleyball', 'Swimming',
    'Badminton', 'Soccer', 'Cricket', 'Baseball', 'Hockey'
  ];

  const locations = [
    'Lagos Island', 'Victoria Island', 'Lekki', 'Ikeja', 'Surulere',
    'Yaba', 'Gbagada', 'Ajah', 'Ikoyi', 'Maryland'
  ];

  const amenitiesList = [
    'Parking', 'WiFi', 'Restrooms', 'Changing Rooms', 'Air Conditioning',
    'Equipment Rental', 'Food & Drinks', 'Security', 'First Aid'
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₦3,000', value: '0-3000' },
    { label: '₦3,000 - ₦6,000', value: '3000-6000' },
    { label: '₦6,000 - ₦10,000', value: '6000-10000' },
    { label: 'Above ₦10,000', value: '10000+' }
  ];

  // Fetch facilities
  const fetchFacilities = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      // Add search
      if (searchTerm) params.search = searchTerm;
      
      // Add filters
      if (filters.sport) params.sport = filters.sport;
      if (filters.location) params.location = filters.location;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.amenities.length > 0) params.amenities = filters.amenities.join(',');

      // Handle price range filter
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-');
        params.minPrice = min;
        if (max !== '+') params.maxPrice = max;
      }

      const response = await axios.get(`${URL}/facilities`, { params });
      
      if (response.data.success) {
        let facilitiesData = response.data.data;
        
        // Apply sorting
        facilitiesData = sortFacilities(facilitiesData);
        
        setFacilities(facilitiesData);
        setPagination(response.data.pagination || pagination);
      }
    } catch (err) {
      console.error('Error fetching facilities:', err);
      setError(err.response?.data?.message || 'Failed to fetch facilities');
    } finally {
      setLoading(false);
    }
  };

  // Sort facilities
  const sortFacilities = (facilitiesData) => {
    const sorted = [...facilitiesData];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      case 'price_low':
        return sorted.sort((a, b) => (a.pricePerHour || 0) - (b.pricePerHour || 0));
      case 'price_high':
        return sorted.sort((a, b) => (b.pricePerHour || 0) - (a.pricePerHour || 0));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sorted;
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle amenity toggle
  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      sport: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      amenities: [],
      priceRange: 'all'
    });
    setSearchTerm('');
    setSortBy('rating');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle facility booking
  const handleFacilityBooking = (facilityId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/choose-facility/${facilityId}`);
  };

  // Toggle favorite
  const toggleFavorite = (facilityId) => {
    setFavorites(prev =>
      prev.includes(facilityId)
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    );
  };

  // Format operating hours
  const formatOperatingHours = (operatingHours) => {
    if (!operatingHours || typeof operatingHours !== 'object') {
      return 'Mon-Sun: 6am-10pm';
    }
    
    const today = new Date().getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayHours = operatingHours[days[today]];
    
    if (todayHours && !todayHours.closed) {
      return `Today: ${todayHours.open}-${todayHours.close}`;
    }
    
    return 'Mon-Sun: 6am-10pm';
  };

  // Get facility image
  const getFacilityImage = (facility, index) => {
    if (facility.images && facility.images.length > 0) {
      return facility.images[0];
    }
    return [stadium1, stadium2, stadium3][index % 3];
  };

  // Load data when filters change
  useEffect(() => {
    fetchFacilities();
  }, [pagination.page, filters, sortBy]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pagination.page === 1) {
        fetchFacilities();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Render facility card
  const renderFacilityCard = (facility, index) => (
    <div 
      key={facility.id} 
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getFacilityImage(facility, index)}
          alt={facility.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(facility.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              favorites.includes(facility.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart size={16} fill={favorites.includes(facility.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Rating Badge */}
        {facility.averageRating && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
            <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{facility.averageRating}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4" onClick={() => handleFacilityBooking(facility.id)}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 truncate pr-2">
            {facility.name}
          </h3>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-[#7042D2]">
              ₦{parseFloat(facility.pricePerHour || 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">per hour</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {facility.description || 'Professional sports facility with modern amenities and equipment.'}
        </p>

        {/* Facility Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-2 text-gray-400" />
            <span className="truncate">{facility.address || 'Lagos, Nigeria'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-2 text-gray-400" />
            <span>{formatOperatingHours(facility.operatingHours)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users size={14} className="mr-2 text-gray-400" />
            <span>Capacity: {facility.capacity || 50} people</span>
          </div>
        </div>

        {/* Amenities */}
        {facility.amenities && facility.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {facility.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                {amenity === 'Parking' && <Car size={10} className="mr-1" />}
                {amenity === 'WiFi' && <Wifi size={10} className="mr-1" />}
                {amenity === 'Food & Drinks' && <Coffee size={10} className="mr-1" />}
                {amenity}
              </span>
            ))}
            {facility.amenities.length > 3 && (
              <span className="text-xs text-gray-500">+{facility.amenities.length - 3} more</span>
            )}
          </div>
        )}

        {/* Book Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFacilityBooking(facility.id);
          }}
          className="w-full bg-[#7042D2] text-white py-2 px-4 rounded-lg hover:bg-[#5a2eb8] transition-colors font-medium"
        >
          Book Facility
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Facilities</h1>
            <p className="text-gray-600 mt-1">
              Discover and book the perfect sports facility for your needs
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-[#7042D2] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-[#7042D2] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search facilities by name, sport, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2] focus:border-transparent"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2] bg-white"
              >
                <option value="rating">Highest Rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
              >
                <SlidersHorizontal size={16} />
                Filters
                {(Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) || searchTerm) && (
                  <span className="bg-[#7042D2] text-white text-xs rounded-full w-2 h-2"></span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Sport Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
                  <select
                    value={filters.sport}
                    onChange={(e) => handleFilterChange('sport', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  >
                    <option value="">All Sports</option>
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  >
                    <option value="">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        filters.amenities.includes(amenity)
                          ? 'bg-[#7042D2] text-white border-[#7042D2]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#7042D2]'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X size={16} />
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            {loading ? (
              'Loading facilities...'
            ) : (
              `${pagination.total || facilities.length} facilities found`
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Facilities Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
          </div>
        ) : facilities.length > 0 ? (
          <div className={`grid gap-6 mb-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {facilities.map((facility, index) => renderFacilityCard(facility, index))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
              className="text-[#7042D2] hover:text-[#5a2eb8] font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            
            {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
              const pageNumber = pagination.page - 2 + index;
              if (pageNumber < 1 || pageNumber > pagination.pages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPagination(prev => ({ ...prev, page: pageNumber }))}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    pageNumber === pagination.page
                      ? 'bg-[#7042D2] text-white border-[#7042D2]'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.min(pagination.pages, prev.page + 1) }))}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFacilities;