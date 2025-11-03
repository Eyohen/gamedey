// App.jsx - Unified Multi-Role Application
import { Routes, Route, Navigate } from 'react-router-dom';
import 'coinley-checkout/dist/style.css';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import UserDashboardLayout from './components/dashboard/UserDashboardLayout';
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

// User Pages
import UserExplore from './pages/user/Explore';
import UserBookings from './pages/user/Bookings';
import UserTeams from './pages/user/Teams';
import UserCommunity from './pages/user/Community';
import UserTransactionHistory from './pages/user/TransactionHistory';
import UserReviews from './pages/user/Reviews';
import UserProfile from './pages/user/Profile';
import CreateTeam from './pages/user/CreateTeam';
import ChooseFacility from './pages/user/ChooseFacility';
import CreateCommunity from './pages/user/CreateCommunity';
import CommunityPost from './pages/user/CommunityPost';
import CreateEvent from './pages/user/CreateEvent';
import ChooseCoach from './pages/user/ChooseCoach';
import PaymentPage from './pages/user/PaymentPage';
import BookingDetails from './pages/user/BookingDetails';
import BookingSuccess from './pages/user/BookingSuccess';
import AllFacilities from './pages/user/AllFacilities';
import AllCoaches from './pages/user/AllCoaches';
import WriteReview from './pages/user/WriteReview';
import SportDetail from './pages/user/SportDetail';
import BookSession from './pages/user/BookSession';

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

          {/* ==================== USER ROUTES ==================== */}
          <Route path="/explore" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <UserExplore />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/sport/:sportId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <SportDetail />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/book-session/:sportId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <BookSession />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/choose-facility/:facilityId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <ChooseFacility />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/choose-coach/:coachId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <ChooseCoach />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/facilities" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <AllFacilities />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/coaches" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <AllCoaches />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/bookings" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <UserBookings />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/booking-details/:bookingId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <BookingDetails />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/review/:bookingId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <WriteReview />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/booking-success/:bookingId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <BookingSuccess />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/payment/:bookingId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <PaymentPage />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/teams" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <UserTeams />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/create-team" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <CreateTeam />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/community" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <UserCommunity />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/create-community" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <CreateCommunity />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/community-post" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <CommunityPost />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/create-event" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <CreateEvent />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/transaction-history" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <UserTransactionHistory />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/reviews" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <UserReviews />
              </UserDashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboardLayout>
                <UserProfile />
              </UserDashboardLayout>
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
