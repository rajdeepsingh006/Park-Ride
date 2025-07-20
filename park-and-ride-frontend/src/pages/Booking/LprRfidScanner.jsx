import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LprRfidScanner() {
  const [plate, setPlate] = useState('');
  const [rfid, setRfid] = useState('');
  const navigate = useNavigate();

  const handleLPRCheckin = () => {
    // Directly navigate to verification result without API call
    navigate('/verified/lpr');
  };

  const handleRFIDCheckout = () => {
    // Directly navigate to verification result without API call
    navigate('/verified/rfid');
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">🚘 LPR / RFID Simulator</h4>

      <div className="mb-3">
        <label className="form-label">License Plate</label>
        <input
          type="text"
          className="form-control"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder="e.g. KA01AB1234"
        />
        <button className="btn btn-primary mt-2" onClick={handleLPRCheckin}>
          Simulate LPR Check-In
        </button>
      </div>

      <hr />

      <div className="mb-3">
        <label className="form-label">RFID Tag ID</label>
        <input
          type="text"
          className="form-control"
          value={rfid}
          onChange={(e) => setRfid(e.target.value)}
          placeholder="e.g. 9A4B7C29"
        />
        <button className="btn btn-success mt-2" onClick={handleRFIDCheckout}>
          Simulate RFID Checkout
        </button>
      </div>
    </div>
  );
}

export default LprRfidScanner;
