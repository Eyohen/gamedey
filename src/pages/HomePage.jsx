import React from 'react';
import { ShoppingBag, Search, Menu, Star, ArrowRight, Users, Award, Truck } from 'lucide-react';
import Navbar from '../components/Navbar';
import hero from '../assets/hero.svg'
import stadium1 from '../assets/stadium1.png'
import stadium2 from '../assets/stadium2.png'
import stadium3 from '../assets/stadium3.png'
import makesiteasier from '../assets/makesiteasier.png'
import signascoach from '../assets/signascoach.png'
import signasfacility from '../assets/signasfacility.png'
import Footer from '../components/Footer';

export default function HomePage() {
 
  return (
    <div className="min-h-screen">

      <section className="py-2">
        <Navbar />
        <div className="relative flex justify-center">
          <img src={hero} alt="Hero image" className="max-w-full h-auto pt-[300px] md:py-0" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pb-[100px] md:mb-[500px]">
            <p className='font-bold text-3xl mb-2 drop-shadow-lg'>Find Instant Access to Top Sports</p>
            <p className='mb-2 font-bold text-3xl drop-shadow-lg'>Facilities & Coaches <span className='text-[#946BEF]'>Near You!</span></p>
            <p className='drop-shadow-lg pb-6'>Discover venues within a 3km radius, reserve slots in seconds, and train with certified coaches—all in one.</p>

            <div className='flex flex-col md:flex-row gap-y-3 md:gap-x-3 border border-black rounded-xl px-2 py-2'>
              <input className='border border-gray-400 rounded-lg px-2 py-2 w-[150px]' placeholder='Location'></input>
              <input className='border border-gray-400 rounded-lg px-2 py-2 w-[150px]' placeholder='Sport Type'></input>
              <input className='border border-gray-400 rounded-lg px-2 py-2 w-[150px]' placeholder='Availability'></input>
              <button className='bg-[#946BEF] rounded-lg text-white px-6 border border-black'>Search</button>
            </div>
          </div>
        </div>
      </section>



      {/* Top Searched Sport Section */}
      <section className="pb-8 md:py-12 px-4 md:px-24">
        <div>
          <p className='font-semibold text-3xl py-4'>Top Searched Sport Facilities in Lekki</p>
          <div className='flex gap-x-6'>

            <div className='border border-black rounded-xl '>
              <img src={stadium1} className='w-auto' />
              {/* text part */}
              <div className='px-2 py-4'>
                <p className='font-semibold py-2'>Don Man Stadium</p>
                <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
                <p className='py-2 flex justify-between'>
                  <p>Mon-Tue</p>
                  <p>8am-6pm</p>
                  <p>Lekki Phase1</p>
                </p>

              </div>
            </div>

            <div className='border border-black rounded-xl '>
              <img src={stadium2} className='w-auto' />
              {/* text part */}
              <div className='px-2 py-4'>
                <p className='font-semibold py-2'>Nick Pitch</p>
                <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
                <p className='py-2 flex justify-between'>
                  <p>Mon-Tue</p>
                  <p>8am-6pm</p>
                  <p>Lekki Phase1</p>
                </p>

              </div>
            </div>



            <div className='border border-black rounded-xl '>
              <img src={stadium3} className='w-auto' />
              {/* text part */}
              <div className='px-2 py-4'>
                <p className='font-semibold py-2'>Anderson Stadium</p>
                <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
                <p className='py-2 flex justify-between'>
                  <p>Mon-Tue</p>
                  <p>8am-6pm</p>
                  <p>Lekki Phase1</p>
                </p>

              </div>
            </div>




          </div>


        </div>
      </section>

      {/* Gamedey Makes it Easier for You */}
      <section className="container mx-auto ">
        <img src={makesiteasier} className='w-auto' />
      </section>



      {/* Earn from Gamedey */}
      <section className="py-12 bg-gray-50">
        <p className='font-semibold text-2xl text-center'>Earn From Gamedey</p>
        <p className='text-center text-sm pb-6'>Earn from gamedey by posting your sport facility or become a sport coach</p>
        <div className='flex flex-col md:flex-row gap-y-2 md:gap-4 justify-center items-center'>
          <img src={signascoach} className='h-96' />
          <img src={signasfacility} className='h-96' />
        </div>

      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-6">
        <p className='font-semibold text-center text-2xl'>Frequently Asked Questions</p>
        <p className='text-center pb-6'>Get answers to your questions</p>

<div className='flex justify-center items-center'>
        <button className='border-2 border-black border-r-[7px] border-b-[4px] rounded-2xl p-3 bg-[#F3F1E0]'>
          <div className='flex justify-center gap-x-6'>
            <div className='space-y-3 text-left'>
              <p className='font-semibold'>FAQs.</p>
              <div className='px-2 py-2 text-sm bg-[#946BEF] text-white border border-black border-r-[4px] border-b-[2px] rounded-lg'>How do i search for facilities/coaches on Gamedey</div>
              <div className='p-2 rounded-lg border bg-[#FFF6E7]'>Is my payment secure?</div>
                  <div className='p-2 rounded-lg border bg-[#FFF6E7]'>Can i cancel or reschedule a booking?</div>
                      <div className='p-2 rounded-lg border bg-[#FFF6E7]'>How do i leave a review?</div>
            </div>

            <div className='text-left space-y-3'>
              <p className='font-semibold'>Ans.</p>
              <div className='bg-[#F2AF1A] text-sm max-w-[330px] rounded-lg p-2'>
                <p className='text-sm max-w-[330px]'>Use the search bar to enter your sport, location,
                or coach name. Filter by distance(e.g.., within 3km), price , ratings or amenities to narrow results. Click 'Book Now' to reserve instantly. 
                </p>
              </div>
            </div>
          </div>
        </button>
</div>

      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}