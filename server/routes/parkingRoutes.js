const express = require('express');
const {
  getParkings,
  createParking,
  updateParking,
  deleteParking
} = require('../controllers/parkingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getParkings)
  .post(protect, createParking);

router.route('/:id')
  .put(protect, updateParking)
  .delete(protect, deleteParking);

module.exports = router;