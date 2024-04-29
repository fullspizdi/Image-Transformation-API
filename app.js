// Import necessary modules
const express = require('express');
const routes = require('./routes');

// Initialize Express app
const app = express();

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', routes);

module.exports = app;
