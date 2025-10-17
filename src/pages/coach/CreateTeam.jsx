import React, {useState} from 'react'
import {
  TrendingUp,
  Star,
  Trash,
  UserRoundPen,
  CirclePlus,
  CircleChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url';
import profilepic from "../../assets/profilepic.jpg"

const CreateTeam = () => {
    const navigate = useNavigate()

  return (
    <div className='px-6'>
               <div onClick={()=>navigate(-1)} className='flex gap-x-2 font-semibold text-xl'><CircleChevronLeft size={28} /> Team</div>
   
        <div className='bg-gray-300 p-4 rounded-full flex justify-center items-center w-[70px] h-[70px] mt-4'><UserRoundPen /></div>
  

      <div className='border-b pt-9'></div>

      <div className='flex gap-32 py-9'>


        <div>
          <p className='font-semibold text-lg'>Name of Your Team</p>
          <p className='font-normal'>Choose your preferred name of your team</p>
        </div>

        <div>
          <div>
            <p className='py-1 font-medium'>Team Name</p>
            <input placeholder='Enter your Team Name' className='px-2 rounded-xl py-2 border border-gray-500 w-[320px]' />
          </div>
        
        </div>



      </div>


      <div className='border-b '></div>


      <div className='flex gap-32 py-9'>
        <div>
          <p className='font-semibold text-lg'>Type of Sport</p>
          <p className='font-normal'>Select by clicking your sport for your team</p>
        </div>

        <div>
          <div className='flex gap-x-4 font-medium'>
        <p>Football</p>
        <p>Long Tennis</p>
        <p>Volleyball</p>
          </div>

        </div>

      </div>


  <div className='border-b '></div>


<div className='flex gap-24 py-9'>
        <div>
          <p className='font-semibold text-lg'>Team Members</p>
          <p className='font-normal'>Add team members to your specified sport.</p>
        </div>

        <div>
          <div className='flex  items-center gap-x-2'>
            <p className='py-1'><CirclePlus /></p>
          <p>Team Member</p>
          </div>
         
        </div>


</div>

<div className='flex gap-x-6'>
  <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
    <button className='bg-[#946BEF] text-white px-12 py-2 rounded-lg'>Save</button>

</div>

    </div>
  )
}

export default CreateTeam