import React,{useState} from 'react'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import {
    MessageSquareMore,Ellipsis
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';



const Events = () => {
     const [activeButton, setActiveButton] = useState('events'); // 'events' or 'AMA's'


  return (
    <div className='px-6 py-6'>

<button className='bg-[#946BEF] text-white px-9 py-2 border border-black rounded-lg flex ml-auto'>Create Event</button>

      <div className='flex mt-12'>
        <div className='grid grid-cols-3 gap-4'>

            <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-orange-500 rounded-t-md'>
                 <MessageSquareMore size={50} color='#C2410c' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                     <div className='flex gap-x-4 justify-between'>
                                       <p className='font-semibold text-md'>Booking Details</p>
                                       <Ellipsis size={20}/>
                                       </div>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>


          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-green-400 rounded-t-md'>
                 <MessageSquareMore size={50} className='text-green-700'/>
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                     <div className='flex gap-x-4 justify-between'>
                    <p className='font-semibold text-md'>Booking Details</p>
                    <Ellipsis size={20}/>
                    </div>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>


          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-red-300 rounded-t-md'>
                 <MessageSquareMore size={50} className='text-red-600' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                     <div className='flex gap-x-4 justify-between'>
                    <p className='font-semibold text-md'>Booking Details</p>
                    <Ellipsis size={20}/>
                    </div>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>


          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-blue-300 rounded-t-md'>
                 <MessageSquareMore size={50} className='text-blue-600' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                     <div className='flex gap-x-4 justify-between'>
                    <p className='font-semibold text-md'>Booking Details</p>
                    <Ellipsis size={20}/>
                    </div>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>



          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-orange-500 rounded-t-md'>
                 <MessageSquareMore size={50} color='#C2410c' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                     <div className='flex gap-x-4 justify-between'>
                    <p className='font-semibold text-md'>Booking Details</p>
                    <Ellipsis size={20}/>
                    </div>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>



        </div>
      </div>
      


    </div>
  )
}

export default Events