import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';
import { FaParking, FaCalendarAlt, FaTimes, FaMoneyBillWave } from 'react-icons/fa';
import moment from 'moment';

const ParkingCard = ({ parking, onCancel }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'reserved': return <Badge bg="primary">Reserved</Badge>;
      case 'checked-in': return <Badge bg="success">Checked In</Badge>;
      case 'completed': return <Badge bg="secondary">Completed</Badge>;
      case 'cancelled': return <Badge bg="danger">Cancelled</Badge>;
      default: return <Badge bg="warning">Unknown</Badge>;
    }
  };

  // Safely format the price
  const formatPrice = (price) => {
    // Convert to number if it's a string
    const numericPrice = typeof price === 'string' ? parseFloat(price) : Number(price);
    
    // Check if the conversion was successful
    if (isNaN(numericPrice)) {
      return '$0.00'; // Default value if price is invalid
    }
    
    // Format to 2 decimal places
    return `$${numericPrice.toFixed(2)}`;
  };

  return (
    <Card className="h-100 card-hover">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div>
            <FaParking className="me-2" />
            {parking.station} - Spot {parking.spotNumber}
          </div>
          {getStatusBadge(parking.status)}
        </Card.Title>
        <Card.Text>
          <div className="mb-2">
            <FaCalendarAlt className="me-2" />
            <strong>Time:</strong> {moment(parking.startTime).format('LLL')} to {moment(parking.endTime).format('LLL')}
          </div>
          <div>
            <FaMoneyBillWave className="me-2" />
            <strong>Price:</strong> {formatPrice(parking.price)}
          </div>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {parking.qrCode && (
              <div className="border p-2 bg-white">
                <QRCodeSVG value={parking.qrCode} size={80} />
              </div>
            )}
          </div>
          {parking.status === 'reserved' && (
            <Button variant="outline-danger" size="sm" onClick={() => onCancel(parking.id)}>
              <FaTimes className="me-1" />
              Cancel
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ParkingCard;