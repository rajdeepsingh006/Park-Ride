import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Park & Ride</h5>
            <p>Seamless parking and last-mile connectivity solution for urban mobility.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/parking" className="text-white">Parking</a></li>
              <li><a href="/rides" className="text-white">Rides</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <address>
              <strong>Park & Ride Inc.</strong><br />
              123 Mobility Street<br />
              Smart City, SC 12345<br />
              <abbr title="Phone">P:</abbr> (123) 456-7890
            </address>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            &copy; {new Date().getFullYear()} Park & Ride. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;