import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCar, FaTaxi, FaMapMarkerAlt, FaClock, FaQrcode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <FaCar size={30} />,
      title: 'Smart Parking',
      description: 'Book your parking spot in advance near metro stations and avoid last-minute hassles.'
    },
    {
      icon: <FaTaxi size={30} />,
      title: 'Last-Mile Connectivity',
      description: 'Seamlessly connect to cabs, shuttles, or e-rickshaws from metro stations.'
    },
    {
      icon: <FaMapMarkerAlt size={30} />,
      title: 'Real-Time Tracking',
      description: 'Dynamic slot allocation and real-time availability updates for parking spaces.'
    },
    {
      icon: <FaClock size={30} />,
      title: 'Time-Saving',
      description: 'Reduce waiting time with automated check-in/check-out using QR codes.'
    },
    {
      icon: <FaQrcode size={30} />,
      title: 'Contactless Entry',
      description: 'QR code based entry and exit for a safe and convenient experience.'
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4 fw-bold">🚇 Welcome to Park & Ride</h1>
          <p className="lead">Your smart solution for metro station parking and seamless commuting</p>
          {!currentUser && (
            <Button
              variant="primary"
              size="lg"
              className="mt-3 px-4"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4 fw-semibold">How It Works</h2>
          <div className="d-flex justify-content-center">
            <ol className="list-group list-group-numbered w-75 shadow-sm">
              <li className="list-group-item">Create an account and log in</li>
              <li className="list-group-item">Search and book your parking spot</li>
              <li className="list-group-item">Get your QR code for contactless entry</li>
              <li className="list-group-item">Book your last-mile ride when you arrive</li>
              <li className="list-group-item">Enjoy a seamless commute experience</li>
            </ol>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4 fw-semibold">Key Features</h2>
          <Row className="justify-content-center">
            {features.length > 0 ? (
              features.map((feature, index) => (
                <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                  <Card className="h-100 text-center p-3 shadow-sm border-0">
                    <Card.Body>
                      <div className="text-primary mb-3">{feature.icon}</div>
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No features available at this time.</p>
            )}
          </Row>
        </Col>
      </Row>

      {currentUser && (
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="mb-3">Ready to book?</h2>
            <Button
              variant="success"
              size="lg"
              className="me-3 px-4"
              onClick={() => navigate('/parking')}
            >
              Book Parking
            </Button>
            <Button
              variant="info"
              size="lg"
              className="px-4"
              onClick={() => navigate('/rides')}
            >
              Book Ride
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;