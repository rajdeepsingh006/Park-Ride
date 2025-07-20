import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaTaxi, FaUser, FaQrcode } from 'react-icons/fa'; // ✅ Add QR icon
import { useAuth } from '../context/AuthContext';
import Scanner from '../pages/Scanner';

const AppNavbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaCar className="me-2" />
          Park & Ride
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/parking">
              <FaCar className="me-1" />
              Parking
            </Nav.Link>
            <Nav.Link as={Link} to="/rides">
              <FaTaxi className="me-1" />
              Rides
            </Nav.Link>

            
              <Nav.Link as={Link} to="/scanner">
                <FaQrcode className="me-1" />
                Scanner
              </Nav.Link>
            
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FaUser className="me-1" />
                  Profile
                </Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
              
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
