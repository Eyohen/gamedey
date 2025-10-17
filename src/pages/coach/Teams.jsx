//pages/Teams.jsx
import React, { useState } from 'react'
import {
  Ellipsis,
  TrendingUp,
  CirclePlus,
  Circle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url';

const Teams = () => {
      const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState('football');
  return (
    <div className='p-6'>

<div className='flex justify-between items-center'>
      <div className='bg-gray-100 w-[385px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'football'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('football')}
          >
            Football
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'basketball'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('basketball')}
          >
            Basketball
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'volleyball'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('volleyball')}
          >
            Volleyball
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'baseball'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('baseball')}
          >
            Baseball
          </button>


        </div>

        {/* Optional: Show which is selected */}
        {/* <div className="mt-4 text-sm text-gray-600">
        Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
      </div> */}

      </div>

</div>



        <div className='flex gap-x-6 pb-6'>

          <div className='grid grid-cols-3 gap-6'>

          <div className='border-2 border-black rounded-2xl py-2 px-2 bg-[#F3F1E0]'>

            <div className='flex gap-x-6 items-center'>
              <div className=''>
                <p className='text-sm font-medium'>Football March Team</p>
                <p className='font-thin text-sm flex gap-x-1 items-center pt-1'><CirclePlus size={16}/>Team Members </p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Andrew Park</p>
              </div>

              <div className=''>
                <p className=''><Ellipsis size={25} /></p>
                <p className='font-thin text-sm flex gap-x-1 items-center'><Circle size={16}/>David Jack</p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Ben Dan</p>
              </div>

            </div>
          </div>

    <div className='border-2 border-black rounded-2xl py-2 px-2 bg-[#F3F1E0]'>

            <div className='flex gap-x-6 items-center'>
              <div className=''>
                <p className='text-sm font-medium'>Football March Team</p>
                <p className='font-thin text-sm flex gap-x-1 items-center pt-1'><CirclePlus size={16}/>Team Members </p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Andrew Park</p>
              </div>

              <div className=''>
                <p className=''><Ellipsis size={25} /></p>
                <p className='font-thin text-sm flex gap-x-1 items-center'><Circle size={16}/>David Jack</p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Ben Dan</p>
              </div>

            </div>
          </div>

             <div className='border-2 border-black rounded-2xl py-2 px-2 bg-[#F3F1E0]'>

            <div className='flex gap-x-6 items-center'>
              <div className=''>
                <p className='text-sm font-medium'>Football March Team</p>
                <p className='font-thin text-sm flex gap-x-1 items-center pt-1'><CirclePlus size={16}/>Team Members </p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Andrew Park</p>
              </div>

              <div className=''>
                <p className=''><Ellipsis size={25} /></p>
                <p className='font-thin text-sm flex gap-x-1 items-center'><Circle size={16}/>David Jack</p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Ben Dan</p>
              </div>

            </div>
          </div>

             <div className='border-2 border-black rounded-2xl py-2 px-2 bg-[#F3F1E0]'>

            <div className='flex gap-x-6 items-center'>
              <div className=''>
                <p className='text-sm font-medium'>Football March Team</p>
                <p className='font-thin text-sm flex gap-x-1 items-center pt-1'><CirclePlus size={16}/>Team Members </p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Andrew Park</p>
              </div>

              <div className=''>
                <p className=''><Ellipsis size={25} /></p>
                <p className='font-thin text-sm flex gap-x-1 items-center'><Circle size={16}/>David Jack</p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Ben Dan</p>
              </div>

            </div>
          </div>

             <div className='border-2 border-black rounded-2xl py-2 px-2 bg-[#F3F1E0]'>

            <div className='flex gap-x-6 items-center'>
              <div className=''>
                <p className='text-sm font-medium'>Football March Team</p>
                <p className='font-thin text-sm flex gap-x-1 items-center pt-1'><CirclePlus size={16}/>Team Members </p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Andrew Park</p>
              </div>

              <div className=''>
                <p className=''><Ellipsis size={25} /></p>
                <p className='font-thin text-sm flex gap-x-1 items-center'><Circle size={16}/>David Jack</p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Ben Dan</p>
              </div>

            </div>
          </div>

             <div className='border-2 border-black rounded-2xl py-2 px-2 bg-[#F3F1E0]'>

            <div className='flex gap-x-6 items-center'>
              <div className=''>
                <p className='text-sm font-medium'>Football March Team</p>
                <p className='font-thin text-sm flex gap-x-1 items-center pt-1'><CirclePlus size={16}/>Team Members </p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Andrew Park</p>
              </div>

              <div className=''>
                <p className=''><Ellipsis size={25} /></p>
                <p className='font-thin text-sm flex gap-x-1 items-center'><Circle size={16}/>David Jack</p>
                  <p className='font-thin text-sm flex gap-x-1 items-center py-1'><Circle size={16}/>Ben Dan</p>
              </div>

            </div>
          </div>


</div>
      
       
        </div>


    </div>
  )
}

export default Teams