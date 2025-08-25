// import React from 'react';
// import { ShoppingBag, Search, Menu, Star, ArrowRight, Users, Award, Truck } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import hero from '../assets/hero.svg'
// import stadium1 from '../assets/stadium1.png'
// import stadium2 from '../assets/stadium2.png'
// import stadium3 from '../assets/stadium3.png'
// import makesiteasier from '../assets/makesiteasier.png'
// import signascoach from '../assets/signascoach.png'
// import signasfacility from '../assets/signasfacility.png'
// import Footer from '../components/Footer';

// export default function HomePage() {
 
//   return (
//     <div className="min-h-screen">

//       <section className="py-2">
//         <Navbar />
//         <div className="relative flex justify-center">
//           <img src={hero} alt="Hero image" className="max-w-full h-auto pt-[300px] md:py-0" />
//           <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pb-[100px] md:mb-[500px]">
//             <p className='font-bold text-3xl mb-2 drop-shadow-lg'>Find Instant Access to Top Sports</p>
//             <p className='mb-2 font-bold text-3xl drop-shadow-lg'>Facilities & Coaches <span className='text-[#946BEF]'>Near You!</span></p>
//             <p className='drop-shadow-lg pb-6'>Discover venues within a 3km radius, reserve slots in seconds, and train with certified coaches—all in one.</p>

//             <div className='flex flex-col md:flex-row gap-y-3 md:gap-x-3 border border-black rounded-xl px-2 py-2'>
//               <input className='border border-gray-400 rounded-lg px-2 py-2 w-[150px]' placeholder='Location'></input>
//               <input className='border border-gray-400 rounded-lg px-2 py-2 w-[150px]' placeholder='Sport Type'></input>
//               <input className='border border-gray-400 rounded-lg px-2 py-2 w-[150px]' placeholder='Availability'></input>
//               <button className='bg-[#946BEF] rounded-lg text-white px-6 border border-black'>Search</button>
//             </div>
//           </div>
//         </div>
//       </section>



//       {/* Top Searched Sport Section */}
//       <section className="pb-8 md:py-12 px-4 md:px-24 items-center justify-center flex">
//         <div>
//           <p className='font-semibold text-3xl py-4'>Top Searched Sport Facilities in Lekki</p>
//           <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 gap-x-6'>

//             <div className='border border-black rounded-xl w-[250px]'>
//               <img src={stadium1} className='w-auto' />
//               {/* text part */}
//               <div className='px-2 py-4'>
//                 <p className='font-semibold py-2'>Don Man Stadium</p>
//                 <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
//                 <p className='py-2 flex justify-between'>
//                   <p>Mon-Tue</p>
//                   <p>8am-6pm</p>
//                   <p>Lekki Phase1</p>
//                 </p>

//               </div>
//             </div>

//             <div className='border border-black rounded-xl w-[250px]'>
//               <img src={stadium2} className='w-auto' />
//               {/* text part */}
//               <div className='px-2 py-4'>
//                 <p className='font-semibold py-2'>Nick Pitch</p>
//                 <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
//                 <p className='py-2 flex justify-between'>
//                   <p>Mon-Tue</p>
//                   <p>8am-6pm</p>
//                   <p>Lekki Phase1</p>
//                 </p>

//               </div>
//             </div>



//             <div className='border border-black rounded-xl w-[250px]'>
//               <img src={stadium3} className='w-auto' />
//               {/* text part */}
//               <div className='px-2 py-4'>
//                 <p className='font-semibold py-2'>Anderson Stadium</p>
//                 <p className='max-w-[250px] text-gray-500 text-sm'>A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.</p>
//                 <p className='py-2 flex justify-between'>
//                   <p>Mon-Tue</p>
//                   <p>8am-6pm</p>
//                   <p>Lekki Phase1</p>
//                 </p>

//               </div>
//             </div>




//           </div>


//         </div>
//       </section>

//       {/* Gamedey Makes it Easier for You */}
//       <section className="container mx-auto ">
//         <img src={makesiteasier} className='w-auto' />
//       </section>



//       {/* Earn from Gamedey */}
//       <section className="py-12 bg-gray-50">
//         <p className='font-semibold text-2xl text-center'>Earn From Gamedey</p>
//         <p className='text-center text-sm pb-6'>Earn from gamedey by posting your sport facility or become a sport coach</p>
//         <div className='flex flex-col md:flex-row gap-y-2 md:gap-4 justify-center items-center'>
//           <img src={signascoach} className='h-96' />
//           <img src={signasfacility} className='h-96' />
//         </div>

//       </section>

//       {/* FAQ Section */}
//       <section className="bg-gray-50 py-6">
//         <p className='font-semibold text-center text-2xl'>Frequently Asked Questions</p>
//         <p className='text-center pb-6'>Get answers to your questions</p>

// <div className='flex justify-center items-center'>
//         <button className='border-2 border-black border-r-[7px] border-b-[4px] rounded-2xl p-3 bg-[#F3F1E0]'>
//           <div className='flex justify-center gap-x-6'>
//             <div className='space-y-3 text-left'>
//               <p className='font-semibold'>FAQs.</p>
//               <div className='px-2 py-2 text-sm bg-[#946BEF] text-white border border-black border-r-[4px] border-b-[2px] rounded-lg'>How do i search for facilities/coaches on Gamedey</div>
//               <div className='p-2 rounded-lg border bg-[#FFF6E7]'>Is my payment secure?</div>
//                   <div className='p-2 rounded-lg border bg-[#FFF6E7]'>Can i cancel or reschedule a booking?</div>
//                       <div className='p-2 rounded-lg border bg-[#FFF6E7]'>How do i leave a review?</div>
//             </div>

//             <div className='text-left space-y-3'>
//               <p className='font-semibold'>Ans.</p>
//               <div className='bg-[#F2AF1A] text-sm max-w-[330px] rounded-lg p-2'>
//                 <p className='text-sm max-w-[330px]'>Use the search bar to enter your sport, location,
//                 or coach name. Filter by distance(e.g.., within 3km), price , ratings or amenities to narrow results. Click 'Book Now' to reserve instantly. 
//                 </p>
//               </div>
//             </div>
//           </div>
//         </button>
// </div>

//       </section>

//       {/* Footer */}
//       <Footer />

//     </div>
//   );
// }










import React from 'react';
import { ShoppingBag, Search, Menu, Star, ArrowRight, Users, Award, Truck } from 'lucide-react';

import Navbar from '../components/Navbar';
// Your actual image imports
import hero from '../assets/hero.svg';
import stadium1 from '../assets/stadium1.png';
import stadium2 from '../assets/stadium2.png';
import stadium3 from '../assets/stadium3.png';
import makesiteasier from '../assets/makesiteasier.png';
import signascoach from '../assets/signascoach.png';
import signasfacility from '../assets/signasfacility.png';


const Footer = () => (
  <footer className="bg-gray-900 text-white p-8">
    <div className="text-center">
      <p>&copy; 2025 GameDey. All rights reserved.</p>
    </div>
  </footer>
);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Navbar />
        
        {/* Hero Content */}
        <div className="relative bg-gradient-to-b from-purple-50 to-white">
          {/* Background Image - Hidden on small screens, visible on larger screens */}
          <div className="hidden md:block absolute inset-0 z-0">
            <img 
              src={hero} 
              alt="Hero background" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          {/* Hero Text Content */}
          <div className="relative z-10 px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Find Instant Access to Top Sports
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Facilities & Coaches{' '}
              <span className="text-purple-600">Near You!</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Discover venues within a 3km radius, reserve slots in seconds, and train with certified coaches—all in one.
            </p>

            {/* Search Form - Mobile First Design */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-w-2xl mx-auto">
              <div className="space-y-3 md:space-y-0 md:flex md:gap-3">
                <input 
                  className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="Enter location"
                />
                <input 
                  className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="Select sport"
                />
                <input 
                  className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="When?"
                />
                <button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Searched Sport Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-6 md:mb-8">
            Top Searched Sport Facilities in Lekki
          </h2>
          
          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
              {[
                { img: stadium1, name: "Don Man Stadium" },
                { img: stadium2, name: "Nick Pitch" },
                { img: stadium3, name: "Anderson Stadium" }
              ].map((stadium, index) => (
                <div key={index} className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden">
                  <img src={stadium.img} alt={stadium.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{stadium.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
                    </p>
                    <div className="flex justify-between text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                      <span>Mon-Tue</span>
                      <span>8am-6pm</span>
                      <span>Lekki Phase1</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: stadium1, name: "Don Man Stadium" },
              { img: stadium2, name: "Nick Pitch" },
              { img: stadium3, name: "Anderson Stadium" }
            ].map((stadium, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={stadium.img} alt={stadium.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-xl mb-3">{stadium.name}</h3>
                  <p className="text-gray-600 mb-4">
                    A vibrant stadium buzzing with energy, filled to the brim with passionate fans cheering for their favorite teams.
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                    <span>Mon-Tue</span>
                    <span>8am-6pm</span>
                    <span>Lekki Phase1</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GameDey Makes it Easier Section */}
      <section className="py-8 md:py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={makesiteasier} 
            alt="GameDey makes it easier" 
            className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Earn from GameDey Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Earn From GameDey</h2>
          <p className="text-gray-600 mb-8 md:mb-12">
            Earn from GameDey by posting your sport facility or become a sport coach
          </p>
          
          {/* Mobile: Stacked, Desktop: Side by side */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
            <div className="w-full max-w-xs">
              <img 
                src={signascoach} 
                alt="Sign as coach" 
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
            <div className="w-full max-w-xs">
              <img 
                src={signasfacility} 
                alt="Sign as facility" 
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12">
            Get answers to your questions
          </p>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-yellow-50 rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-800 border-r-8 border-b-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* FAQ Questions */}
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-lg mb-4">FAQs.</h3>
                  <div className="p-3 text-sm bg-purple-600 text-white border border-black border-r-4 border-b-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                    How do I search for facilities/coaches on GameDey?
                  </div>
                  <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
                    Is my payment secure?
                  </div>
                  <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
                    Can I cancel or reschedule a booking?
                  </div>
                  <div className="p-3 text-sm rounded-lg border bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors">
                    How do I leave a review?
                  </div>
                </div>

                {/* FAQ Answer */}
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-lg mb-4">Ans.</h3>
                  <div className="bg-yellow-400 text-sm rounded-lg p-4 border border-gray-300">
                    <p>
                      Use the search bar to enter your sport, location, or coach name. 
                      Filter by distance (e.g., within 3km), price, ratings, or amenities 
                      to narrow results. Click 'Book Now' to reserve instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}