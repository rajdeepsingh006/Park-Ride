const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorHandler = require('./middleware/error');
const colors = require('colors');
import lprRoutes from './routes/lprRoutes.js';

// Import route files
const authRoutes = require('./routes/authRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const rideRoutes = require('./routes/rideRoutes');

const app = express();

// 1. Security and parsing middleware first (correct order)
app.use(helmet()); // Security headers
app.use('/api/devices', lprRoutes);
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
})); // CORS with credentials
app.use(express.json()); // Body parser
app.use(cookieParser()); // Cookie parser

// 2. Dev logging (after basic middleware but before routes)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3. API Routes (after all middleware)
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/rides', rideRoutes);

// 4. Static files and React routing (production only)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React app
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // Development root route
  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to Park & Ride API',
      environment: process.env.NODE_ENV,
      endpoints: {
        auth: '/api/auth',
        parking: '/api/parking',
        rides: '/api/rides'
      },
      status: 'API endpoints are active'
    });
  });
}

// 5. Error handler (MUST be last middleware)
app.use(errorHandler);

module.exports = app;