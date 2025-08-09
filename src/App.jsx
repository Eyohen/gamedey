// App.js for the users
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';

import 'coinley-checkout/dist/style.css'


import DashboardLayout from './components/dashboard/DashboardLayout';
import Explore from './pages/Explore';
import Bookings from './pages/Bookings';
import Teams from './pages/Teams';
import Community from './pages/Community';
import TransactionHistory from './pages/TransactionHistory';
import Reviews from './pages/Reviews';

import Profile from './pages/Profile';
import CreateTeam from './pages/CreateTeam';
import ChooseFacility from './pages/ChooseFacility';
import CreateCommunity from './pages/CreateCommunity';
import CommunityPost from './pages/CommunityPost';
import CreateEvent from './pages/CreateEvent';
import ChooseCoach from './pages/ChooseCoach';
import PaymentPage from './pages/PaymentPage';
import BookingDetails from './pages/BookingDetails';
import BookingSuccess from './pages/BookingSuccess';
import AllFacilities from './pages/AllFacilities';
import AllCoaches from './pages/AllCoaches';


function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />



          {/* 
            Protected routes with dashboard layout  */}

          <Route path="/explore" element={
            <DashboardLayout>
              <Explore />
            </DashboardLayout>
          } />

          <Route path="/choose-facility/:facilityId" element={
            <DashboardLayout>
              <ChooseFacility />
            </DashboardLayout>
          } />

          <Route path="/choose-coach/:coachId" element={
            <DashboardLayout>
              <ChooseCoach />
            </DashboardLayout>
          } />

          <Route path="/facilities" element={
            <DashboardLayout>
              <AllFacilities />
            </DashboardLayout>
          } />

          <Route path="/coaches" element={
            <DashboardLayout>
              <AllCoaches />
            </DashboardLayout>
          } />


          <Route path="/bookings" element={
            <DashboardLayout>
              <Bookings />
            </DashboardLayout>
          } />

          <Route path="/booking-details/:bookingId" element={
            <DashboardLayout>
              <BookingDetails />
            </DashboardLayout>
          } />


          <Route path="/booking-success/:bookingId" element={
            <DashboardLayout>
              <BookingSuccess />
            </DashboardLayout>
          } />

          <Route path="/payment/:bookingId" element={
            <DashboardLayout>
              <PaymentPage />
            </DashboardLayout>
          } />

          <Route path="/teams" element={
            <DashboardLayout>
              <Teams />
            </DashboardLayout>
          } />

          <Route path="/create-team" element={
            <DashboardLayout>
              <CreateTeam />
            </DashboardLayout>
          } />

          <Route path="/community" element={
            <DashboardLayout>
              <Community />
            </DashboardLayout>
          } />

          <Route path="/create-community" element={
            <DashboardLayout>
              <CreateCommunity />
            </DashboardLayout>
          } />

          <Route path="/community-post" element={
            <DashboardLayout>
              <CommunityPost />
            </DashboardLayout>
          } />

          <Route path="/create-event" element={
            <DashboardLayout>
              <CreateEvent />
            </DashboardLayout>
          } />

          <Route path="/transaction-history" element={
            <DashboardLayout>
              <TransactionHistory />
            </DashboardLayout>
          } />

          <Route path="/reviews" element={
            <DashboardLayout>
              <Reviews />
            </DashboardLayout>
          } />

          <Route path="/profile" element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          } />

        </Routes>
      </main>

    </div>

  );
}

export default App;

