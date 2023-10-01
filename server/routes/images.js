// server/routes/images.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { image } = req.files;

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(image.tempFilePath, (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Image upload failed' });
      }

      const imageUrl = result.secure_url;

      // You can save the image URL in your database or associate it with a user

      res.json({ imageUrl });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
