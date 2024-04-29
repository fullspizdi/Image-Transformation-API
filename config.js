// config.js
// Configuration settings for the Image Transformation API

const dotenv = require('dotenv');
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY,
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    imageStoragePath: process.env.IMAGE_STORAGE_PATH || 'uploads/'
};

module.exports = config;
