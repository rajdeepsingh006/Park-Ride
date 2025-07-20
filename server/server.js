const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/config');

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();

const PORT = config.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`.yellow.bold);
  console.log(`API Endpoints:`.cyan);
  console.log(`- Auth: http://localhost:${PORT}/api/auth`.white);
  console.log(`- Parking: http://localhost:${PORT}/api/parking`.white);
  console.log(`- Rides: http://localhost:${PORT}/api/rides`.white);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});