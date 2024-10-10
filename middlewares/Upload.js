// middlewares/upload.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require("dotenv").config()
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,        // Replace with your Cloudinary API key
    api_secret: process.env.CLOUDINARY_SECRET_KEY   // Replace with your Cloudinary API secret
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Specify the folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Specify allowed file formats
    },
});

// Initialize multer
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
