// src/pages/VerificationResult.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerificationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.pathname.includes('lpr') ? 'LPR Check-In' : 'RFID Checkout';

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-3">✅ {type} Verified</h2>
      <p className="lead">Vehicle verification was successful.</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default VerificationResult;
