import React, {useState} from 'react'

const TransactionHistory = () => {

    const bookings = [
    {
      id: 'BK001',
      user: 'John Smith',
      reference:'29894784323242',
      description:'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-08',
      payment: 'N50000.00',
      status: 'Confirmed'
    },
    {
      id: 'BK002',
      user: 'Sarah Johnson',
        reference:'29894784323242',
      description:'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-08',
      payment: 'N35000.00',
      status: 'Pending'
    },
    {
      id: 'BK003',
      user: 'Mike Wilson',
   
     reference:'29894784323242',
      description:'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-09',
      payment: 'N25000.00',
      status: 'Confirmed'
    },
    {
      id: 'BK004',
      user: 'Emily Davis',
   reference:'29894784323242',
      description:'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-09',
      payment: 'N80000.00',
      status: 'Cancelled'
    },
    {
      id: 'BK005',
      user: 'David Brown',
 
   reference:'29894784323242',
      description:'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-10',
      payment: 'N20000.00',
      status: 'Confirmed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className='px-6 py-6'>
      
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
               Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Payment Method
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Status
                </th>
  
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                     {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.payment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
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

export default TransactionHistory