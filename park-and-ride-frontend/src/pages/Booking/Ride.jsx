import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaTaxi, FaSearch, FaCalendarAlt, FaTimes, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';
import RideCard from '../../components/RideCard';

const Ride = () => {
  const [rides, setRides] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rideType: 'cab',
    pickupLocation: '',
    destination: '',
    scheduledTime: '',
    price: 10.00,
    isShared: false
  });

  const { rideType, pickupLocation, destination, scheduledTime, price, isShared } = formData;

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setRides([
            {
              id: '1',
              rideType: 'cab',
              pickupLocation: 'Central Metro Station',
              destination: '123 Main Street',
              scheduledTime: '2023-06-15T17:15:00',
              price: 12.50,
              isShared: false,
              status: 'requested'
            },
            {
              id: '2',
              rideType: 'shuttle',
              pickupLocation: 'Downtown Station',
              destination: '456 Business District',
              scheduledTime: '2023-06-14T18:30:00',
              price: 8.00,
              isShared: true,
              status: 'completed'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        toast.error('Failed to fetch rides');
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const newRide = {
          id: Date.now().toString(),
          ...formData,
          status: 'requested'
        };
        setRides([newRide, ...rides]);
        toast.success('Ride requested successfully');
        setShowModal(false);
        setLoading(false);
      }, 1000);
    } catch (err) {
      toast.error('Failed to request ride');
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaTaxi className="me-2" />
          My Rides
        </h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaCalendarAlt className="me-2" />
          Request Ride
        </Button>
      </div>

      {loading && rides.length === 0 ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : rides.length === 0 ? (
        <Alert variant="info">
          You don't have any ride requests yet. Book your first ride now!
        </Alert>
      ) : (
        <Row>
          {rides.map(ride => (
            <Col key={ride.id} md={6} lg={4} className="mb-4">
              <RideCard ride={ride} />
            </Col>
          ))}
        </Row>
      )}

      {/* Ride Request Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaTaxi className="me-2" />
            Request Ride
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ride Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="rideType"
                    value={rideType}
                    onChange={onChange}
                    required
                  >
                    <option value="cab">Cab</option>
                    <option value="shuttle">Shuttle</option>
                    <option value="e-rickshaw">E-Rickshaw</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter price"
                    name="price"
                    value={price}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Pickup Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pickup location"
                name="pickupLocation"
                value={pickupLocation}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                name="destination"
                value={destination}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Scheduled Time (Optional)</Form.Label>
              <Form.Control
                type="datetime-local"
                name="scheduledTime"
                value={scheduledTime}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    <FaUsers className="me-2" />
                    Shared Ride (Save money by sharing with others)
                  </>
                }
                name="isShared"
                checked={isShared}
                onChange={onCheckboxChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              <FaTimes className="me-2" />
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Requesting...</span>
                </>
              ) : (
                <>
                  <FaSearch className="me-2" />
                  Request Ride
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Ride;