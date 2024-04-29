// Import necessary modules
const express = require('express');
const router = express.Router();
const imageController = require('./imageController');

// Route to handle image transformation
router.post('/transform', imageController.transformImage);

// Route to retrieve a previously transformed image
router.get('/images/:imageId', imageController.getImage);

module.exports = router;
