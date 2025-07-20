const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  station: {
    type: String,
    required: [true, 'Please add a station name']
  },
  spotNumber: {
    type: String,
    required: [true, 'Please add a spot number']
  },
  startTime: {
    type: Date,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: Date,
    required: [true, 'Please add an end time']
  },
  status: {
    type: String,
    enum: ['reserved', 'checked-in', 'completed', 'cancelled'],
    default: 'reserved'
  },
  qrCode: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Parking', ParkingSchema);