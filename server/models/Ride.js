const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  parking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Parking'
  },
  rideType: {
    type: String,
    enum: ['cab', 'shuttle', 'e-rickshaw'],
    required: [true, 'Please add a ride type']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Please add a pickup location']
  },
  destination: {
    type: String,
    required: [true, 'Please add a destination']
  },
  scheduledTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['requested', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  isShared: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', RideSchema);