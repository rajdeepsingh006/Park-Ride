const Ride = require('../models/Ride');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all rides for user
// @route   GET /api/rides
// @access  Private
exports.getRides = asyncHandler(async (req, res, next) => {
  const rides = await Ride.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: rides.length,
    data: rides
  });
});

// @desc    Create new ride
// @route   POST /api/rides
// @access  Private
exports.createRide = asyncHandler(async (req, res, next) => {
  const { rideType, pickupLocation, destination, scheduledTime, price, isShared, parking } = req.body;

  const ride = await Ride.create({
    user: req.user.id,
    rideType,
    pickupLocation,
    destination,
    scheduledTime,
    price,
    isShared,
    parking
  });

  res.status(201).json({
    success: true,
    data: ride
  });
});

// @desc    Update ride status
// @route   PUT /api/rides/:id
// @access  Private
exports.updateRide = asyncHandler(async (req, res, next) => {
  let ride = await Ride.findById(req.params.id);

  if (!ride) {
    return next(
      new ErrorResponse(`Ride not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is ride owner
  if (ride.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this ride`,
        401
      )
    );
  }

  ride = await Ride.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: ride
  });
});

// @desc    Cancel ride
// @route   DELETE /api/rides/:id
// @access  Private
exports.cancelRide = asyncHandler(async (req, res, next) => {
  const ride = await Ride.findById(req.params.id);

  if (!ride) {
    return next(
      new ErrorResponse(`Ride not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is ride owner
  if (ride.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to cancel this ride`,
        401
      )
    );
  }

  await ride.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});