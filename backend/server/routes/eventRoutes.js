const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/add-event', async (req, res) => {
    try {
        const { eventName, eventImage, eventShortDesc, eventDate, eventVenue, description } = req.body;

        // Create a new event instance
        const newEvent = new Event({
            eventName,
            eventImage,
            eventShortDesc,
            eventDate,
            eventVenue,
            description
        });

        // Save event to the database
        await newEvent.save();
        res.status(201).json({ message: 'Event added successfully' });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Failed to add event' });
    }
});

// Route to get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

module.exports = router;
