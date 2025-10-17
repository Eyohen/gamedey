//pages/GetPaid.jsx - Enhanced with Bank Account Management
import React, { useState, useEffect } from 'react';
import { FiEdit2 } from "react-icons/fi";
import {
    MessageSquareMore, 
    Ellipsis,
    Plus,
    X,
    Save,
    Trash2,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';

// Nigerian banks list
const NIGERIAN_BANKS = [
    { code: '044', name: 'Access Bank' },
    { code: '063', name: 'Access Bank (Diamond)' },
    { code: '050', name: 'Ecobank Nigeria' },
    { code: '070', name: 'Fidelity Bank' },
    { code: '011', name: 'First Bank of Nigeria' },
    { code: '214', name: 'First City Monument Bank' },
    { code: '058', name: 'Guaranty Trust Bank' },
    { code: '030', name: 'Heritage Bank' },
    { code: '301', name: 'Jaiz Bank' },
    { code: '082', name: 'Keystone Bank' },
    { code: '014', name: 'MainStreet Bank' },
    { code: '076', name: 'Polaris Bank' },
    { code: '101', name: 'Providus Bank' },
    { code: '221', name: 'Stanbic IBTC Bank' },
    { code: '068', name: 'Standard Chartered Bank' },
    { code: '232', name: 'Sterling Bank' },
    { code: '100', name: 'Suntrust Bank' },
    { code: '032', name: 'Union Bank of Nigeria' },
    { code: '033', name: 'United Bank For Africa' },
    { code: '215', name: 'Unity Bank' },
    { code: '035', name: 'Wema Bank' },
    { code: '057', name: 'Zenith Bank' }
];

// Add Account Modal Component
const AddAccountModal = ({ isOpen, onClose, onSave, loading }) => {
    const [formData, setFormData] = useState({
        bankCode: '',
        accountNumber: '',
        accountName: '',
        isPreferred: false
    });
    const [errors, setErrors] = useState({});
    const [verifying, setVerifying] = useState(false);
    const [accountVerified, setAccountVerified] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

  
const verifyAccount = async () => {
  if (!formData.bankCode || !formData.accountNumber || formData.accountNumber.length < 10) {
    setErrors({ accountNumber: 'Please enter a valid 10-digit account number and select a bank' });
    return;
  }

  setVerifying(true);
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(`${URL}/coach-banking/verify-account`, {
      bankCode: formData.bankCode,
      accountNumber: formData.accountNumber
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) {
      setFormData(prev => ({ ...prev, accountName: response.data.data.accountName }));
      setAccountVerified(true);
    }
  } catch (err) {
    setErrors({ accountNumber: 'Failed to verify account. Please check details.' });
  } finally {
    setVerifying(false);
  }
};

    const handleSave = () => {
        const newErrors = {};
        
        if (!formData.bankCode) newErrors.bankCode = 'Please select a bank';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
        if (formData.accountNumber && formData.accountNumber.length !== 10) {
            newErrors.accountNumber = 'Account number must be 10 digits';
        }
        if (!formData.accountName) newErrors.accountName = 'Please verify account first';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave(formData);
        setFormData({
            bankCode: '',
            accountNumber: '',
            accountName: '',
            isPreferred: false
        });
        setAccountVerified(false);
    };

    const handleClose = () => {
        setFormData({
            bankCode: '',
            accountNumber: '',
            accountName: '',
            isPreferred: false
        });
        setErrors({});
        setAccountVerified(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Add Bank Account</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Bank Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                        <select
                            value={formData.bankCode}
                            onChange={(e) => handleInputChange('bankCode', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#946BEF] ${
                                errors.bankCode ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Choose your bank</option>
                            {NIGERIAN_BANKS.map(bank => (
                                <option key={bank.code} value={bank.code}>{bank.name}</option>
                            ))}
                        </select>
                        {errors.bankCode && <p className="text-red-500 text-xs mt-1">{errors.bankCode}</p>}
                    </div>

                    {/* Account Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                maxLength="10"
                                value={formData.accountNumber}
                                onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
                                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#946BEF] ${
                                    errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0123456789"
                            />
                            <button
                                onClick={verifyAccount}
                                disabled={verifying || !formData.bankCode || formData.accountNumber.length !== 10}
                                className="px-4 py-2 bg-[#946BEF] text-white rounded-lg hover:bg-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {verifying ? 'Verifying...' : 'Verify'}
                            </button>
                        </div>
                        {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                    </div>

                    {/* Account Name (Auto-filled after verification) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                        <input
                            type="text"
                            value={formData.accountName}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                            placeholder="Account name will appear after verification"
                        />
                        {accountVerified && (
                            <div className="flex items-center text-green-600 text-sm mt-1">
                                <CheckCircle size={16} className="mr-1" />
                                Account verified successfully
                            </div>
                        )}
                    </div>

                    {/* Preferred Account Toggle */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Set as Preferred Account</p>
                            <p className="text-sm text-gray-500">Use this account for automatic withdrawals</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPreferred}
                                onChange={(e) => handleInputChange('isPreferred', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#946BEF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#946BEF]"></div>
                        </label>
                    </div>
                </div>

                <div className="flex gap-3 p-6 border-t">
                    <button
                        onClick={handleSave}
                        disabled={loading || !accountVerified}
                        className="flex-1 bg-[#946BEF] text-white py-2 rounded-lg hover:bg-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={16} className="mr-2" />
                                Save Account
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleClose}
                        className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const GetPaid = () => {
    const { user } = useAuth();
    const [bankAccounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [balance, setBalance] = useState(0);
    const [earnings, setEarnings] = useState({
        pending: 0,
        available: 0,
        total: 0
    });

    // Fetch coach bank accounts
    const fetchBankAccounts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            
            const response = await axios.get(`${URL}/coach-banking/bank-accounts`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setBankAccounts(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching bank accounts:', err);
            setError('Failed to load bank accounts');
        } finally {
            setLoading(false);
        }
    };

    // Fetch earnings data
    const fetchEarnings = async () => {
        try {
            const token = localStorage.getItem('access_token');
            
            const response = await axios.get(`${URL}/coach-banking/earnings`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                const { pending, available, total } = response.data.data;
                setEarnings({ pending, available, total });
                setBalance(available);
            }
        } catch (err) {
            console.error('Error fetching earnings:', err);
        }
    };

    // Add new bank account
    const addBankAccount = async (accountData) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            
            const response = await axios.post(`${URL}/coach-banking/bank-accounts`, accountData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setBankAccounts(prev => [...prev, response.data.data]);
                setShowAddModal(false);
                setSuccess('Bank account added successfully!');
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            console.error('Error adding bank account:', err);
            setError(err.response?.data?.message || 'Failed to add bank account');
        } finally {
            setLoading(false);
        }
    };

    // Delete bank account
    const deleteBankAccount = async (accountId) => {
        if (!window.confirm('Are you sure you want to delete this bank account?')) return;

        try {
            const token = localStorage.getItem('access_token');
            
            const response = await axios.delete(`${URL}/coach-banking/bank-accounts/${accountId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setBankAccounts(prev => prev.filter(account => account.id !== accountId));
                setSuccess('Bank account deleted successfully!');
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            console.error('Error deleting bank account:', err);
            setError('Failed to delete bank account');
        }
    };

    // Set preferred account
    const setPreferredAccount = async (accountId) => {
        try {
            const token = localStorage.getItem('access_token');
            
            const response = await axios.patch(`${URL}/coach-banking/bank-accounts/${accountId}/preferred`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setBankAccounts(prev => prev.map(account => ({
                    ...account,
                    isPreferred: account.id === accountId
                })));
                setSuccess('Preferred account updated!');
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            console.error('Error setting preferred account:', err);
            setError('Failed to update preferred account');
        }
    };

    // Request immediate payout
    const requestPayout = async () => {
        if (balance <= 0) {
            setError('No available balance to withdraw');
            return;
        }

        const preferredAccount = bankAccounts.find(account => account.isPreferred);
        if (!preferredAccount) {
            setError('Please set a preferred account first');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            
            const response = await axios.post(`${URL}/coach-banking/request-payout`, {
                amount: balance
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setSuccess('Payout request submitted! You will receive payment within 24 hours.');
                setTimeout(() => setSuccess(''), 5000);
                fetchEarnings(); // Refresh balance
            }
        } catch (err) {
            console.error('Error requesting payout:', err);
            setError(err.response?.data?.message || 'Failed to request payout');
        }
    };

    // Get bank name from code
    const getBankName = (bankCode) => {
        const bank = NIGERIAN_BANKS.find(b => b.code === bankCode);
        return bank ? bank.name : 'Unknown Bank';
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(amount);
    };

    useEffect(() => {
        fetchBankAccounts();
        fetchEarnings();
    }, []);

    return (
        <div className='p-4 sm:p-6 max-w-none lg:max-w-[1000px] mx-auto'>
            {/* Success/Error Messages */}
            {success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                    <span className="text-sm text-green-700">{success}</span>
                </div>
            )}
            
            {/* {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <span className="text-sm text-red-700">{error}</span>
                    <button 
                        onClick={() => setError('')}
                        className="ml-2 text-red-500 hover:text-red-700"
                    >
                        ×
                    </button>
                </div>
            )} */}

            {/* Main Balance and Schedule Cards */}
            <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 lg:justify-between'>
                {/* Available Balance Card */}
                <div className='border border-black px-4 py-3 sm:py-4 rounded-lg border-r-[4px] sm:border-r-[6px] border-b-[2px] sm:border-b-[4px] flex-1'>
                    <div className='flex flex-col sm:flex-row sm:gap-x-8 lg:gap-x-32 sm:items-center space-y-3 sm:space-y-0'>
                        <div className="flex-1">
                            <p className="text-sm sm:text-base text-gray-600">Available Balance</p>
                            <p className='font-semibold text-xl sm:text-2xl text-gray-900'>
                                {formatCurrency(balance)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Pending: {formatCurrency(earnings.pending)}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={requestPayout}
                                disabled={balance <= 0 || bankAccounts.length === 0}
                                className='border border-[#946BEF] text-[#946BEF] text-xs sm:text-sm px-3 py-1 sm:py-2 rounded-md hover:bg-[#946BEF] hover:text-white transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {balance <= 0 ? 'No Balance' : 'Get Paid Now'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Withdrawal Schedule Card */}
                <div className='border border-black px-4 py-3 sm:py-4 rounded-lg border-r-[4px] sm:border-r-[6px] border-b-[2px] sm:border-b-[4px] flex-1'>
                    <div className='flex flex-col sm:flex-row sm:gap-x-8 lg:gap-x-32 sm:items-center space-y-3 sm:space-y-0'>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base text-gray-600">Automatic Payouts</p>
                            <p className='font-semibold text-base sm:text-xl lg:text-2xl text-gray-900 break-words'>
                                Daily at 6:00 PM
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Next payout: Today at 6:00 PM
                            </p>
                        </div>
                        <div className="flex-shrink-0 self-start sm:self-center">
                            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                                <FiEdit2 color='#946BEF' size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdrawal Accounts Header */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 space-y-2 sm:space-y-0'>
                <p className="text-base sm:text-lg font-medium text-gray-900">Withdrawal Accounts</p>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className='text-[#946BEF] text-sm sm:text-base font-medium hover:underline self-start sm:self-auto flex items-center'
                >
                    <Plus size={16} className="mr-1" />
                    Add Account
                </button>
            </div>

            {/* Loading State */}
            {loading && bankAccounts.length === 0 && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#946BEF]"></div>
                </div>
            )}

            {/* Bank Account Cards */}
            {bankAccounts.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-3'>
                    {bankAccounts.map((account) => (
                        <div key={account.id} className='border border-black rounded-xl bg-[#F3F1E0] p-3 sm:p-4'>
                            <div className='flex justify-between items-center pb-2 mb-2'>
                                <p className="text-sm sm:text-base font-medium text-gray-700">Bank Details</p>
                                <div className="flex items-center space-x-2">
                                    {account.isPreferred && (
                                        <div className="flex items-center text-green-600 text-xs">
                                            <CheckCircle size={14} className="mr-1" />
                                            Primary
                                        </div>
                                    )}
                                    <div className="relative group">
                                        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                                            <Ellipsis size={18} className="text-gray-600" />
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                            {!account.isPreferred && (
                                                <button
                                                    onClick={() => setPreferredAccount(account.id)}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b"
                                                >
                                                    Set as Primary
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteBankAccount(account.id)}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                            >
                                                <Trash2 size={14} className="mr-2" />
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex flex-col sm:flex-row sm:items-center gap-2 pb-2 mb-2'>
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded flex-shrink-0 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            {getBankName(account.bankCode).charAt(0)}
                                        </span>
                                    </div>
                                    <p className='font-semibold text-sm sm:text-lg lg:text-xl text-gray-900 truncate'>
                                        {getBankName(account.bankCode)}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-sm sm:text-base text-gray-900 font-mono">
                                    {account.accountNumber}
                                </p>
                                <p className="text-sm sm:text-base text-gray-700">
                                    {account.accountName}
                                </p>
                                {account.isVerified && (
                                    <div className="flex items-center text-green-600 text-xs">
                                        <CheckCircle size={14} className="mr-1" />
                                        Verified Account
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : !loading && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg mt-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Bank Accounts Added</h3>
                    <p className="text-gray-500 mb-4">Add a bank account to receive your coaching payments</p>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="bg-[#946BEF] text-white px-6 py-2 rounded-lg hover:bg-[#7c3aed] transition-colors"
                    >
                        Add Your First Account
                    </button>
                </div>
            )}

            {/* Add Account Modal */}
            <AddAccountModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addBankAccount}
                loading={loading}
            />
        </div>
    );
};

export default GetPaid;