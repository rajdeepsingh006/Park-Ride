import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LprCheckin = () => {
  const [plate, setPlate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/devices/lpr/checkin', { plate });
      navigate('/verified/lpr'); // ✅ Redirect on success
    } catch (err) {
      console.error(err);
      setError('❌ Verification failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>🚘 LPR Check-In Simulator</h2>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Enter License Plate"
        value={plate}
        onChange={(e) => setPlate(e.target.value.toUpperCase())}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Simulate LPR Check-In
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default LprCheckin;
