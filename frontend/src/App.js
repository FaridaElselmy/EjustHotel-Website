import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import MyAppBar from "./components/AppBar";
import BookNow from './BookNow';
import RoomType from "./roomType";
import BrandingSignInPage from "./components/signin";
import FacilitiesPage from "./FacilitiesPage";
import ContactUsPage from "./ContactUsPage"
import BookNowDouble from "./BookNowDouble ";
import Bookservices from "./Bookservices"
import ConfirmationPage from './confirmation';
import Profile from "./profilePage";
import RegistrationPage from "./components/register";
import Bookings from "./Bookings";
import Footer from "./components/footer"
import PasswordResetRequest from "./passwordResetRequest";
import PasswordReset from "./passwordResetPage";
import AdminProfile from "./adminProfile";

function App() {
  
  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh", // Full viewport height
          backgroundImage: "url('./background2.jpg')", // Path to your image in the public folder
          backgroundSize: "cover", // Ensures the image covers the whole area
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repeating
        }}
      >
        {/* AppBar */}
        <MyAppBar />

        {/* Routes setup */}
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)', // Leaves space for AppBar
              }}
            >
              {/* Link wrapped around Button to navigate to /book-now */}
              <BrandingSignInPage />
            </Box>
          } />

          {/* SignIn Page Route */}
          <Route path="/room-Type" element={<RoomType />} />
          {/* Book Now Route */}
          <Route path="/Book-Now" element={<BookNow />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/signinPage" element={<BrandingSignInPage />} />

          <Route path="/facilities" element={< FacilitiesPage />} />
          <Route path="/about-us" element={< ContactUsPage />} />
          <Route path="/book-now-double" element={< BookNowDouble />} />
          <Route path="/Bookservices" element={< Bookservices />} />
          <Route path="/profile" element={< Profile />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} /> 
          <Route path="/Bookings" element={< Bookings />} />
          <Route path="/reset-password-request" component={PasswordResetRequest} />
          <Route path="/reset-password/:token" component={PasswordReset} />
          ContactUsPage

        </Routes>
        < Footer />
      </Box>
    </Router>
  );
}

export default App;
