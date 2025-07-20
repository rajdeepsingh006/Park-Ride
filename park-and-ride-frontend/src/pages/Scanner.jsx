import React from 'react';
import LprRfidScanner from '../pages/Booking/LprRfidScanner';

const Scanner = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🚘 Vehicle Scanner</h2>
      <LprRfidScanner />
    </div>
  );
};

export default Scanner;
