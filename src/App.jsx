// App.jsx - Unified Multi-Role Application
import { Routes, Route, Navigate } from 'react-router-dom';
import 'coinley-checkout/dist/style.css';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PlayerDashboardLayout from './components/dashboard/PlayerDashboardLayout';
import CoachDashboardLayout from './components/dashboard/CoachDashboardLayout';
import FacilityDashboardLayout from './components/dashboard/FacilityDashboardLayout';

// Shared Pages (Auth & Public)
import HomePage from './pages/shared/HomePage';
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';
import ForgotPassword from './pages/shared/ForgotPassword';
import ResetPassword from './pages/shared/ResetPassword';
import VerifyEmail from './pages/shared/VerifyEmail';
import NotFoundPage from './pages/shared/NotFoundPage';
import TermsAndConditions from './pages/shared/TermsAndConditions';
import Messages from './pages/shared/Messages';

// Player Pages
import PlayerExplore from './pages/player/Explore';
import PlayerBookings from './pages/player/Bookings';
import PlayerTeams from './pages/player/Teams';
import PlayerCommunity from './pages/player/Community';
import PlayerTransactionHistory from './pages/player/TransactionHistory';
import PlayerReviews from './pages/player/Reviews';
import PlayerProfile from './pages/player/Profile';
import CreateTeam from './pages/player/CreateTeam';
import ChooseFacility from './pages/player/ChooseFacility';
import CreateCommunity from './pages/player/CreateCommunity';
import CommunityPost from './pages/player/CommunityPost';
import CreateEvent from './pages/player/CreateEvent';
import ChooseCoach from './pages/player/ChooseCoach';
import PaymentPage from './pages/player/PaymentPage';
import BookingDetails from './pages/player/BookingDetails';
import BookingSuccess from './pages/player/BookingSuccess';
import AllFacilities from './pages/player/AllFacilities';
import AllCoaches from './pages/player/AllCoaches';
import WriteReview from './pages/player/WriteReview';
import SportDetail from './pages/player/SportDetail';
import FacilitySessionOptions from './pages/player/FacilitySessionOptions';
import HomeSessionOptions from './pages/player/HomeSessionOptions';
import PackageList from './pages/player/PackageList';
import BookSession from './pages/player/BookSession';
import HomeSession from './pages/player/HomeSession';
import BookPackage from './pages/player/BookPackage';

// Coach Pages
import CoachDashboard from './pages/coach/Dashboard';
import CoachBookings from './pages/coach/Bookings';
import CoachSessions from './pages/coach/Sessions';
import CoachProfile from './pages/coach/Profile';
import CoachTransactionHistory from './pages/coach/TransactionHistory';
import CoachReviews from './pages/coach/Reviews';
import CoachGetPaid from './pages/coach/GetPaid';
import CoachEvents from './pages/coach/Events';
import CoachTeams from './pages/coach/Teams';
import CoachViewBooking from './pages/coach/ViewBooking';
import CoachCommunity from './pages/coach/Community';
import CoachDisputeResolution from './pages/coach/DisputeResolution';
import CoachFinOverview from './pages/coach/FinOverview';

// Facility Pages
import FacilityDashboard from './pages/facility/Dashboard';
import FacilityBookings from './pages/facility/Bookings';
import FacilityProfile from './pages/facility/Profile';
import FacilityManagement from './pages/facility/Facility';
import FacilityViewBooking from './pages/facility/ViewBooking';
import FacilityFinancialOverview from './pages/facility/FinancialOverview';
import FacilityCommunity from './pages/facility/Community';
import FacilityCreateFacility from './pages/facility/CreateFacility';
import FacilityOrderSuccess from './pages/facility/OrderSuccessPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* ==================== PLAYER ROUTES ==================== */}
          <Route path="/explore" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PlayerExplore />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/sport/:sportId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <SportDetail />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/sport/:sportId/facility-session" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <FacilitySessionOptions />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/sport/:sportId/home-session" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <HomeSessionOptions />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/sport/:sportId/facility-packages" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PackageList />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/sport/:sportId/home-packages" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PackageList />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/book-session/:sportId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <BookSession />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/home-session/:sportId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <HomeSession />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/book-package/:packageId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <BookPackage />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/choose-facility/:facilityId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <ChooseFacility />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/choose-coach/:coachId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <ChooseCoach />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facilities" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <AllFacilities />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coaches" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <AllCoaches />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/bookings" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PlayerBookings />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/booking-details/:bookingId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <BookingDetails />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/review/:bookingId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <WriteReview />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/booking-success/:bookingId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <BookingSuccess />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/payment/:bookingId" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PaymentPage />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/teams" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PlayerTeams />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/create-team" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <CreateTeam />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/community" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PlayerCommunity />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/create-community" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <CreateCommunity />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/community-post" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <CommunityPost />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/create-event" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <CreateEvent />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/transaction-history" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PlayerTransactionHistory />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/reviews" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PlayerReviews />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <PlayerProfile />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/messages" element={
            <ProtectedRoute allowedRoles={['player']}>
              <PlayerDashboardLayout>
                <Messages />
              </PlayerDashboardLayout>
            </ProtectedRoute>
          } />

          {/* ==================== COACH ROUTES ==================== */}
          <Route path="/coach/dashboard" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachDashboard />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/bookings" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachBookings />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/sessions" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachSessions />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/booking/:bookingId" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachViewBooking />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/profile" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachProfile />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/messages" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <Messages />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/transaction-history" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachTransactionHistory />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/financial-overview" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachFinOverview />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/reviews" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachReviews />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/get-paid" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachGetPaid />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/events" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachEvents />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/teams" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachTeams />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/community" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachCommunity />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach/disputes" element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachDashboardLayout>
                <CoachDisputeResolution />
              </CoachDashboardLayout>
            </ProtectedRoute>
          } />

          {/* ==================== FACILITY ROUTES ==================== */}
          <Route path="/facility/dashboard" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityDashboard />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/bookings" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityBookings />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/booking/:bookingId" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityViewBooking />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/manage" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityManagement />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/create" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityCreateFacility />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/profile" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityProfile />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/financial-overview" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityFinancialOverview />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/community" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityCommunity />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facility/order-success" element={
            <ProtectedRoute allowedRoles={['facility']}>
              <FacilityDashboardLayout>
                <FacilityOrderSuccess />
              </FacilityDashboardLayout>
            </ProtectedRoute>
          } />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
