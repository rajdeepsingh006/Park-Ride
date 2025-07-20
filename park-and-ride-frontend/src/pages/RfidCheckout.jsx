import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RfidCheckout = () => {
  const [rfid, setRfid] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/devices/rfid/checkout', { rfid });
      navigate('/verified/rfid'); // ✅ Redirect on success
    } catch (err) {
      console.error(err);
      setError('❌ Verification failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>📡 RFID Checkout Simulator</h2>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Enter RFID Tag"
        value={rfid}
        onChange={(e) => setRfid(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleSubmit}>
        Simulate RFID Checkout
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default RfidCheckout;
