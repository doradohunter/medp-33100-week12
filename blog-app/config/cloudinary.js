const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

async function connectToCloudinary() {
    // Configuration
    cloudinary.config({
        cloud_name: 'dkg091hsa',
        api_key: '723216436359913',
        api_secret: 'C_6wXGJESs0esGts7tPenheNKk0' // Click 'View API Keys' above to copy your API secret
    });

    return cloudinary;
}

// Custom Cloudinary upload middleware
const uploadToCloudinary = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
        const stream = Readable.from(req.file.buffer);
        const uploadStream = req.app.locals.cloudinary.uploader.upload_stream(
            {},
            (error, result) => {
                if (error) {
                    return next(error);
                }
                req.file.cloudinaryUrl = result.secure_url; // Save Cloudinary URL to the request object
                next();
            }
        );
        stream.pipe(uploadStream);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    connectToCloudinary,
    uploadToCloudinary
};
