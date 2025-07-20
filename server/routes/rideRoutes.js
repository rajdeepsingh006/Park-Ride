const express = require('express');
const {
  getRides,
  createRide,
  updateRide,
  cancelRide
} = require('../controllers/rideController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getRides)
  .post(protect, createRide);

router.route('/:id')
  .put(protect, updateRide)
  .delete(protect, cancelRide);

module.exports = router;