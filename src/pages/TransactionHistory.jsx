//pages/TransactionHistory.jsx - Improved and fully integrated
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  Download,
  Calendar,
  Search,
  RefreshCw
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [walletData, setWalletData] = useState({
    walletBalance: 0,
    transactions: [],
    pagination: null
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    page: 1,
    limit: 10
  });

  // Fetch wallet data
  const fetchWalletData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setRefreshing(true);
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view transaction history');
        return;
      }

      const params = {
        page: filters.page,
        limit: filters.limit
      };

      if (filters.status !== 'all') {
        params.status = filters.status;
      }

      const response = await axios.get(`${URL}/users/wallet`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params
      });
      
      if (response.data.success) {
        setWalletData(response.data.data);
        setError('');
      }
    } catch (err) {
      console.error('Error fetching wallet data:', err);
      setError('Failed to fetch transaction history');
    } finally {
      if (showLoading) setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchWalletData();
  }, [filters]);

  // Refresh data
  const handleRefresh = () => {
    fetchWalletData(false);
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  // Get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: '✓'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: '⏳'
        };
      case 'failed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: '✗'
        };
      case 'cancelled':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: '⊘'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: '?'
        };
    }
  };

  // Format amount with color
  const formatAmountWithColor = (amount, type) => {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(Math.abs(amount));
    
    const color = type === 'credit' ? 'text-green-600' : 'text-red-600';
    const sign = type === 'credit' ? '+' : '-';
    
    return {
      amount: `${sign}${formattedAmount}`,
      color
    };
  };

  // Get transaction icon
  const getTransactionIcon = (type) => {
    return type === 'credit' ? (
      <ArrowDownLeft className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-red-600" />
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-6 py-6 max-w-6xl mx-auto'>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-[#7042D2] to-[#946BEF] rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full transform -translate-x-8 translate-y-8"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium opacity-90">Wallet Balance</h2>
              <p className="text-3xl font-bold">
                {new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN'
                }).format(walletData.walletBalance || 0)}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <span>Available for bookings</span>
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-1 hover:opacity-75 transition-opacity"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
            {walletData.pagination?.total || 0} transactions
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>

          {/* Items per page */}
          <select
            value={filters.limit}
            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {walletData.transactions && walletData.transactions.length > 0 ? (
          <div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {walletData.transactions.map((transaction) => {
                    const statusStyle = getStatusStyle(transaction.status);
                    const amountStyle = formatAmountWithColor(transaction.amount, transaction.type);
                    
                    return (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(transaction.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            <p className="truncate">{transaction.description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 font-mono">
                            {transaction.reference}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(transaction.type)}
                            <span className={`text-sm font-medium ${
                              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            <span className="mr-1">{statusStyle.icon}</span>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className={`text-sm font-semibold ${amountStyle.color}`}>
                            {amountStyle.amount}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {walletData.transactions.map((transaction) => {
                const statusStyle = getStatusStyle(transaction.status);
                const amountStyle = formatAmountWithColor(transaction.amount, transaction.type);
                
                return (
                  <div key={transaction.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span className={`text-sm font-medium ${amountStyle.color}`}>
                          {amountStyle.amount}
                        </span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.icon} {transaction.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-900 mb-1">
                      {transaction.description}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{formatDate(transaction.createdAt)}</span>
                      <span className="font-mono">{transaction.reference}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {walletData.pagination && walletData.pagination.pages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {((walletData.pagination.page - 1) * walletData.pagination.limit) + 1} to{' '}
                  {Math.min(walletData.pagination.page * walletData.pagination.limit, walletData.pagination.total)} of{' '}
                  {walletData.pagination.total} transactions
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(walletData.pagination.page - 1)}
                    disabled={walletData.pagination.page <= 1}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>
                  
                  <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded">
                    {walletData.pagination.page}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(walletData.pagination.page + 1)}
                    disabled={walletData.pagination.page >= walletData.pagination.pages}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-500 mb-6">
              Your transaction history will appear here once you start making bookings and payments.
            </p>
            <button
              onClick={() => window.location.href = '/explore'}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Make Your First Booking
            </button>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      {walletData.transactions && walletData.transactions.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center">
              <ArrowDownLeft className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Total Credits</p>
                <p className="text-lg font-semibold text-green-900">
                  ₦{walletData.transactions
                    .filter(t => t.type === 'credit' && t.status === 'completed')
                    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <ArrowUpRight className="w-8 h-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-red-600">Total Debits</p>
                <p className="text-lg font-semibold text-red-900">
                  ₦{walletData.transactions
                    .filter(t => t.type === 'debit' && t.status === 'completed')
                    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">This Month</p>
                <p className="text-lg font-semibold text-blue-900">
                  {walletData.transactions
                    .filter(t => {
                      const transactionDate = new Date(t.createdAt);
                      const now = new Date();
                      return transactionDate.getMonth() === now.getMonth() && 
                             transactionDate.getFullYear() === now.getFullYear();
                    }).length} transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;