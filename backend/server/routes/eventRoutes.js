const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/add-event', async (req, res) => {
    try {
        const {name, image, shortDesc, date, venue, description, mode} = req.body;

        // Create a new event instance
        const newEvent = new Event({
            name, 
            image, 
            shortDesc, 
            date, 
            venue, 
            description, 
            mode
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
router.get('/get-events', async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        console.error('Error fetching Events:', error);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// Route to get a single event by ID
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

// Route to update an event by ID
router.put('/update-event/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Route to delete an event by ID
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
