// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Scanner from './pages/Scanner';             // your existing Scanner page
import LprCheckin from './pages/LprCheckin';
import RfidCheckout from './pages/RfidCheckout';
import VerificationResult from './pages/VerificationResult';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Parking from './pages/Booking/Parking';
import Ride from './pages/Booking/Ride';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import LprRfidScanner from './pages/Booking/LprRfidScanner'; // Import your scanner component

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <div className="container py-4">
          <ErrorBoundary>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Your existing pages */}
              <Route path="/lpr-checkin" element={<LprCheckin />} />
              <Route path="/rfid-checkout" element={<RfidCheckout />} />

              {/* Scanner page where you simulate LPR/RFID */}
              <Route path="/scanner" element={<LprRfidScanner />} />

              {/* Verification result routes */}
              <Route path="/verified/lpr" element={<VerificationResult />} />
              <Route path="/verified/rfid" element={<VerificationResult />} />

              {/* Protected routes */}
              <Route path="/parking" element={<Parking />} />
              <Route path="/rides" element={<Ride />} />

              <Route
                path="/profile"
                element={
                  // <PrivateRoute>
                    <Profile />
                  // </PrivateRoute>
                }
              />

              {/* 404 - Not Found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
