const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

class ImageService {
    constructor() {
        this.outputFolder = path.join(__dirname, 'public', 'images');
        this.ensureOutputFolderExists();
    }

    ensureOutputFolderExists() {
        if (!fs.existsSync(this.outputFolder)) {
            fs.mkdirSync(this.outputFolder, { recursive: true });
        }
    }

    async transformImage({ imagePath, transformations }) {
        try {
            let image = sharp(imagePath);

            if (transformations.resize) {
                const { width, height } = transformations.resize;
                image = image.resize(width, height);
            }

            if (transformations.grayscale) {
                image = image.grayscale();
            }

            if (transformations.flip) {
                image = image.flip();
            }

            if (transformations.flop) {
                image = image.flop();
            }

            if (transformations.rotate) {
                image = image.rotate(transformations.rotate);
            }

            const outputFileName = `transformed-${Date.now()}.jpg`;
            const outputPath = path.join(this.outputFolder, outputFileName);

            await image.toFile(outputPath);

            return {
                success: true,
                message: 'Image transformed successfully.',
                url: `/images/${outputFileName}`
            };
        } catch (error) {
            console.error('Error transforming image:', error);
            return {
                success: false,
                message: 'Failed to transform image.',
                error: error.message
            };
        }
    }
}

module.exports = ImageService;
