// import React, {useState} from 'react'

// const TransactionHistory = () => {

//     const bookings = [
//     {
//       id: 'BK001',
//       user: 'John Smith',
//       reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-08',
//       payment: 'N50000.00',
//       status: 'Confirmed'
//     },
//     {
//       id: 'BK002',
//       user: 'Sarah Johnson',
//         reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-08',
//       payment: 'N35000.00',
//       status: 'Pending'
//     },
//     {
//       id: 'BK003',
//       user: 'Mike Wilson',
   
//      reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-09',
//       payment: 'N25000.00',
//       status: 'Confirmed'
//     },
//     {
//       id: 'BK004',
//       user: 'Emily Davis',
//    reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-09',
//       payment: 'N80000.00',
//       status: 'Cancelled'
//     },
//     {
//       id: 'BK005',
//       user: 'David Brown',
 
//    reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-10',
//       payment: 'N20000.00',
//       status: 'Confirmed'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Confirmed':
//         return 'bg-green-100 text-green-800';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
//   return (
//     <div className='px-6 py-6'>
      
//         <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Reference
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Payment Method
//                 </th>

//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Status
//                 </th>
  
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {bookings.map((booking) => (
//                 <tr key={booking.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                      {new Date(booking.date).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.payment}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.reference}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.description}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.paymentMethod}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                   {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
//                       onClick={() => alert(`Viewing details for booking ${booking.id}`)}
//                     >
//                       View Details
//                     </button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//     </div>
//   )
// }

// export default TransactionHistory







// Updated TransactionHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [walletData, setWalletData] = useState({
    walletBalance: 0,
    transactions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch wallet data
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Please login to view transaction history');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${URL}/users/wallet`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setWalletData(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching wallet data:', err);
        setError('Failed to fetch transaction history');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
    
    return type === 'credit' ? `+${formattedAmount}` : `-${formattedAmount}`;
  };

  const getAmountColor = (type) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-6 py-6'>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-[#7042D2] to-[#946BEF] rounded-xl p-6 mb-6 text-white">
        <h2 className="text-lg font-medium mb-2">Wallet Balance</h2>
        <p className="text-3xl font-bold">
          {new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
          }).format(walletData.walletBalance)}
        </p>
        <p className="text-sm opacity-80 mt-2">Available for bookings and payments</p>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {walletData.transactions && walletData.transactions.length > 0 ? (
              walletData.transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getAmountColor(transaction.type)}`}>
                    {formatAmount(transaction.amount, transaction.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {transaction.reference}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs">
                      <p className="truncate">{transaction.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                    <p className="text-gray-500">Your transaction history will appear here once you start making bookings.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
