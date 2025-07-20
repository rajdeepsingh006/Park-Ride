const Parking = require('../models/Parking');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const generateQR = require('../utils/generateQR');

// @desc    Get all parking reservations for user
// @route   GET /api/parking
// @access  Private
exports.getParkings = asyncHandler(async (req, res, next) => {
  const parkings = await Parking.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: parkings.length,
    data: parkings
  });
});

// @desc    Create parking reservation
// @route   POST /api/parking
// @access  Private
exports.createParking = asyncHandler(async (req, res, next) => {
  const { station, spotNumber, startTime, endTime, price } = req.body;

  // Generate QR code data
  const qrData = JSON.stringify({
    userId: req.user.id,
    station,
    spotNumber,
    startTime,
    endTime
  });

  const qrCode = await generateQR(qrData);

  const parking = await Parking.create({
    user: req.user.id,
    station,
    spotNumber,
    startTime,
    endTime,
    price,
    qrCode
  });

  res.status(201).json({
    success: true,
    data: parking
  });
});

// @desc    Update parking reservation
// @route   PUT /api/parking/:id
// @access  Private
exports.updateParking = asyncHandler(async (req, res, next) => {
  let parking = await Parking.findById(req.params.id);

  if (!parking) {
    return next(
      new ErrorResponse(`Parking not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is parking owner
  if (parking.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this parking`,
        401
      )
    );
  }

  parking = await Parking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: parking
  });
});

// @desc    Delete parking reservation
// @route   DELETE /api/parking/:id
// @access  Private
exports.deleteParking = asyncHandler(async (req, res, next) => {
  const parking = await Parking.findById(req.params.id);

  if (!parking) {
    return next(
      new ErrorResponse(`Parking not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is parking owner
  if (parking.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this parking`,
        401
      )
    );
  }

  await parking.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});