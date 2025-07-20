import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaTaxi, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import moment from 'moment';

const RideCard = ({ ride }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'requested':
        return <Badge bg="info">Requested</Badge>;
      case 'assigned':
        return <Badge bg="primary">Assigned</Badge>;
      case 'in-progress':
        return <Badge bg="warning">In Progress</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const getRideIcon = (type) => {
    switch (type) {
      case 'cab':
        return <FaTaxi />;
      case 'shuttle':
        return <FaUsers />;
      case 'e-rickshaw':
        return <FaTaxi />;
      default:
        return <FaTaxi />;
    }
  };

  return (
    <Card className="h-100 card-hover">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div>
            {getRideIcon(ride.rideType)} {ride.rideType.toUpperCase()}
          </div>
          {getStatusBadge(ride.status)}
        </Card.Title>
        <Card.Text>
          <div className="mb-2">
            <FaMapMarkerAlt className="me-2" />
            <strong>From:</strong> {ride.pickupLocation}
          </div>
          <div className="mb-2">
            <FaMapMarkerAlt className="me-2" />
            <strong>To:</strong> {ride.destination}
          </div>
          {ride.scheduledTime && (
            <div className="mb-2">
              <FaClock className="me-2" />
              <strong>Scheduled:</strong> {moment(ride.scheduledTime).format('LLL')}
            </div>
          )}
          <div>
            <FaMoneyBillWave className="me-2" />
            <strong>Price:</strong> ${ride.price.toFixed(2)}
            {ride.isShared && (
              <span className="ms-2">
                <FaUsers className="me-1" />
                Shared
              </span>
            )}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RideCard;