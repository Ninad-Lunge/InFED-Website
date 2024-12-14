const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Event = require('../models/Event');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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
            { folder: 'events' }, // Organize uploads in a specific folder
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
    });
};

// Add a new event with multiple image uploads
router.post('/add-event', upload.array('images', 5), async (req, res) => {
    const { name, shortDesc, startDate, endDate, startTime, endTime, venue, description, mode, registrationLink } = req.body;

    if (!['Online', 'Offline'].includes(mode)) {
        return res.status(400).json({ message: 'Invalid mode. Allowed values are Online or Offline.' });
    }

    try {
        const uploadedImages = [];

        // Upload images if files exist
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const cloudinaryResponse = await uploadToCloudinary(file);
                uploadedImages.push(cloudinaryResponse.secure_url);
            }
        }

        // Create a new event
        const newEvent = new Event({
            name,
            images: uploadedImages,
            shortDesc,
            startDate,
            endDate,
            startTime,
            endTime,
            venue,
            description,
            mode,
            registrationLink,
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Error adding event', error: error.message });
    }
});

// Get all events
router.get('/get-events', async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Get a single event by ID
router.get('/get-event/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// Update an event by ID
router.put('/update-event/:id', upload.array('images', 5), async (req, res) => {
    const { name, shortDesc, startDate, endDate, startTime, endTime, venue, description, mode, registrationLink } = req.body;

    if (!['Online', 'Offline'].includes(mode)) {
        return res.status(400).json({ message: 'Invalid mode. Allowed values are Online or Offline.' });
    }

    try {
        const uploadedImages = [];

        // Upload new images if files exist
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const cloudinaryResponse = await uploadToCloudinary(file);
                uploadedImages.push(cloudinaryResponse.secure_url);
            }
        }

        // Find and update the event
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                name,
                images: uploadedImages.length > 0 ? uploadedImages : undefined, // Only update images if there are new ones
                shortDesc,
                startDate,
                endDate,
                startTime,
                endTime,
                venue,
                description,
                mode,
                registrationLink
            },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
});

// Delete an event by ID
router.delete('/delete-event/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;