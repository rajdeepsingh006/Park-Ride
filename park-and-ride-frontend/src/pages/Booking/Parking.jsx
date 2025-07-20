import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaParking, FaSearch, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ParkingCard from '../../components/ParkingCard';

const Parking = () => {
  const [parkings, setParkings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    station: '',
    spotNumber: '',
    startTime: '',
    endTime: '',
    price: 5.00
  });

  const { station, spotNumber, startTime, endTime, price } = formData;

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const fetchParkings = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setParkings([
            {
              id: '1',
              station: 'Central Metro Station',
              spotNumber: 'A12',
              startTime: '2023-06-15T09:00:00',
              endTime: '2023-06-15T17:00:00',
              price: 8.50,
              status: 'reserved',
              qrCode: 'parking-1-qr-code'
            },
            {
              id: '2',
              station: 'Downtown Station',
              spotNumber: 'B05',
              startTime: '2023-06-14T10:00:00',
              endTime: '2023-06-14T18:00:00',
              price: 10.00,
              status: 'completed',
              qrCode: 'parking-2-qr-code'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        toast.error('Failed to fetch parking reservations');
        setLoading(false);
      }
    };

    fetchParkings();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const onSubmit = async e => {
  e.preventDefault();
  setLoading(true);
  
  try {
    // Ensure price is converted to number
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      throw new Error('Invalid price value');
    }

    // Simulate API call with properly formatted data
    setTimeout(() => {
      const newParking = {
        id: Date.now().toString(),
        station,
        spotNumber,
        startTime,
        endTime,
        price: numericPrice, // Store as number
        status: 'reserved',
        qrCode: `parking-${Date.now()}-qr-code`
      };
      setParkings([newParking, ...parkings]);
      toast.success('Parking reservation created');
      setShowModal(false);
      setLoading(false);
    }, 1000);
  } catch (err) {
    toast.error('Please enter a valid price');
    setLoading(false);
  }
};

  const handleCancel = async (id) => {
    try {
      // Simulate API call
      setTimeout(() => {
        setParkings(parkings.map(p => 
          p.id === id ? { ...p, status: 'cancelled' } : p
        ));
        toast.success('Parking reservation cancelled');
      }, 500);
    } catch (err) {
      toast.error('Failed to cancel parking reservation');
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaParking className="me-2" />
          My Parking Reservations
        </h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaCalendarAlt className="me-2" />
          Book Parking
        </Button>
      </div>

      {loading && parkings.length === 0 ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : parkings.length === 0 ? (
        <Alert variant="info">
          You don't have any parking reservations yet. Book your first parking spot now!
        </Alert>
      ) : (
        <Row>
          {parkings.map(parking => (
            <Col key={parking.id} md={6} lg={4} className="mb-4">
              <ParkingCard parking={parking} onCancel={handleCancel} />
            </Col>
          ))}
        </Row>
      )}

      {/* Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaParking className="me-2" />
            Book Parking Spot
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Station</Form.Label>
                  <Form.Control
                    as="select"
                    name="station"
                    value={station}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select station</option>
                    <option value="Central Metro Station">Central Metro Station</option>
                    <option value="Downtown Station">Downtown Station</option>
                    <option value="North Station">North Station</option>
                    <option value="South Station">South Station</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Spot Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter spot number"
                    name="spotNumber"
                    value={spotNumber}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="startTime"
                    value={startTime}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="endTime"
                    value={endTime}
                    onChange={onChange}
                    min={startTime}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
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
                  <span className="ms-2">Booking...</span>
                </>
              ) : (
                <>
                  <FaSearch className="me-2" />
                  Book Now
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Parking;