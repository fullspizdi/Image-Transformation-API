// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const routes = require('./routes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Set up file storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', routes);

// Get port from environment and store in Express.
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

