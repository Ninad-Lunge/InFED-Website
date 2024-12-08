const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Person = require('../models/Person');

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'persons' }, // Optional: organize uploads in a folder
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // Convert buffer to stream
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

// POST route to add a person with image upload
router.post('/add-person', upload.single('image'), async (req, res) => {
    const { name, designation, email, linkedin, twitter, heading } = req.body;

    if (!heading) {
        return res.status(400).json({ message: 'Heading is required' });
    }

    try {
        let imageUrl = '';
        
        // Upload image if file exists
        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file);
            imageUrl = cloudinaryResponse.secure_url;
        }

        // Prepare social links object
        const socialLinks = {
            email: email || '',
            linkedin: linkedin || '',
            twitter: twitter || ''
        };

        const newPerson = new Person({
            name,
            image: imageUrl,
            designation,
            socialLinks,
            heading
        });

        await newPerson.save();
        res.status(201).json({ message: 'Person added successfully', person: newPerson });
    } catch (error) {
        console.error('Error adding person:', error);
        res.status(500).json({ message: 'Error adding person', error: error.message });
    }
});

// PUT route to update a person with optional image upload
router.put('/update-person/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, designation, email, linkedin, twitter, heading } = req.body;

    try {
        let updateData = { name, designation, heading };

        // Prepare social links object
        const socialLinks = {
            email: email || '',
            linkedin: linkedin || '',
            twitter: twitter || ''
        };
        
        updateData.socialLinks = socialLinks;

        // Upload new image if file exists
        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file);
            updateData.image = cloudinaryResponse.secure_url;
        }

        const updatedPerson = await Person.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true }
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.json({ message: 'Person updated successfully', person: updatedPerson });
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ message: 'Error updating person', error: error.message });
    }
});

module.exports = router;