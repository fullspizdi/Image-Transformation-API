// Import necessary modules
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// imageController.js

const imageController = {
    /**
     * Transform the image based on the provided query parameters.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    transformImage: async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).send({ error: 'No image file provided.' });
            }

            let image = sharp(file.path);

            // Check for resize parameters
            if (req.body.resize) {
                const { width, height } = JSON.parse(req.body.resize);
                image = image.resize(width, height);
            }

            // Check for grayscale
            if (req.body.grayscale === 'true') {
                image = image.grayscale();
            }

            // Save the transformed image
            const outputPath = path.join('uploads', `transformed-${Date.now()}-${file.originalname}`);
            await image.toFile(outputPath);

            // Send the URL of the transformed image
            res.status(200).send({ message: 'Image transformed successfully', url: outputPath });
        } catch (error) {
            res.status(500).send({ error: 'Failed to transform image', details: error.message });
        }
    },

    /**
     * Retrieve a previously transformed image.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    getImage: (req, res) => {
        const imageId = req.params.imageId;
        const imagePath = path.join('uploads', imageId);

        // Check if the file exists
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).send({ error: 'Image not found' });
        }
    }
};

module.exports = imageController;
