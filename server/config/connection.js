// Import the Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Connect to MongoDB using the URI from environment variables or default to local MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks')
  // If the connection is successful, log a success message
  .then(() => console.log('MongoDB connected successfully'))
  // If there is an error during connection, log the error message
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the Mongoose connection to be used in other parts of the application
module.exports = mongoose.connection;
