import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../../url';

const Sessions = () => {
  const [activeButton, setActiveButton] = useState('players'); // 'transaction history' or 'payout history' or 'non pitch'

  const bookings = [
    {
      id: 'BK001',
      user: 'John Smith',
      location: 'Ikeja, Lagos',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-08',
      payment: 'N50000.00',
      status: 'Booked'
    },
    {
      id: 'BK002',
      user: 'Sarah Johnson',
      location: 'Ikeja, Lagos',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-08',
      payment: 'N35000.00',
      status: 'Booked'
    },
    {
      id: 'BK003',
      user: 'Mike Wilson',
      location: 'Victoria Island, Lagos',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-09',
      payment: 'N25000.00',
      status: 'Booked'
    },
    {
      id: 'BK004',
      user: 'Emily Davis',
      location: 'Lekki, Lagos',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-09',
      payment: 'N80000.00',
      status: 'Booked'
    },
    {
      id: 'BK005',
      user: 'David Brown',
      location: 'Alausa, Lagos',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-10',
      payment: 'N20000.00',
      status: 'Booked'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Booked':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'Deactivated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className='px-6 py-6'>


      <div className='bg-gray-100 w-[260px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'players'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('today')}
          >
            Bookings
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'facility-owner'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('facility-owner')}
          >
            Events
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'coaches'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('coaches')}
          >
            AMA's
          </button>


        </div>

        {/* Optional: Show which is selected */}
        {/* <div className="mt-4 text-sm text-gray-600">
        Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
      </div> */}

      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Name
              </th>
            
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Location
              </th>
             
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Allocation Time and Date
              </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Amount
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                Action
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {booking.user}
                </td>
              
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.location}
                </td>
         
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.date}
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.payment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF]">
                  Reschedule
                </td>

                {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
                      onClick={() => alert(`Viewing details for booking ${booking.id}`)}
                    >
                      View Details
                    </button>
                  </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Sessions