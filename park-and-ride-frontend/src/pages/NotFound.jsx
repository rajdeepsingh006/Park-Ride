import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;