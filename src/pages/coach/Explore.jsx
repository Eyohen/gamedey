// src/pages/Explore.jsx
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  Copy,
  RefreshCw,
  Calendar,
  ChevronDown,
  ExternalLink,
  X
  
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import stadium1 from '../../assets/stadium1.png'
import stadium2 from '../../assets/stadium2.png'
import stadium3 from '../../assets/stadium3.png'
import topcoaches from '../../assets/topcoaches.png'

const Explore = () => {
  // const { user } = useAuth();



  return (
    <>
      <div className='px-6'>
        <div className='flex justify-between py-3'>
          <p className='font-medium'>Top Facilities</p>
          <p className='text-[#946BEF] font-medium'>View All</p>
        </div>
        <div className='flex gap-x-6 max-w-[1100px]'>

          <div className='grid grid-cols-4 gap-x-4 gap-y-4'>

          <div className='border border-black rounded-xl '>
            <img src={stadium1} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>

          <div className='border border-black rounded-xl '>
            <img src={stadium2} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>



          <div className='border border-black rounded-xl '>
            <img src={stadium3} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>


          <div className='border border-black rounded-xl '>
            <img src={stadium3} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>

             <div className='border border-black rounded-xl '>
            <img src={stadium3} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>


          <div className='border border-black rounded-xl '>
            <img src={stadium3} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>


</div>

        </div>

        {/* top coaches */}
           <div className='flex justify-between py-3 mt-16'>
          <p className='font-medium'>Top Coaches</p>
          <p className='text-[#946BEF] font-medium'>View All</p>
        </div>
        <div className='flex gap-x-6 max-w-[1100px]'>

          <div className='grid grid-cols-4 gap-x-4 gap-y-4'>

          <div className='border border-black rounded-xl '>
            <img src={topcoaches} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>

          <div className='border border-black rounded-xl '>
            <img src={topcoaches} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>



          <div className='border border-black rounded-xl '>
            <img src={topcoaches} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>


          <div className='border border-black rounded-xl '>
            <img src={topcoaches} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>

             <div className='border border-black rounded-xl '>
            <img src={topcoaches} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>


          <div className='border border-black rounded-xl '>
            <img src={topcoaches} className='w-auto' />
            {/* text part */}
            <div className='px-2 py-4'>
              <p className='font-semibold py-2'>Don Man Stadium</p>
              <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
              <p className='py-2 flex justify-between'>
                <p>Mon-Tue</p>
                <p>8am-6pm</p>
              </p>
              <p>Lekki Phase1</p>
            </div>
          </div>


</div>

        </div>


      </div>
    </>
  );
};

export default Explore;