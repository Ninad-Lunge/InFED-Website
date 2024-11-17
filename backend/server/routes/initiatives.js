const express = require('express');
const router = express.Router();
const Initiative = require('../models/Initiatives');

// Route to add a new initiative
router.post('/add-initiative', async (req, res) => {
    try {
        const { title, image, description } = req.body;

        // Create a new initiative instance
        const newInitiative = new Initiative({
            title,
            image,
            description
        });

        // Save initiative to the database
        await newInitiative.save();
        res.status(201).json({ message: 'Initiative added successfully' });
    } catch (error) {
        console.error('Error adding initiative:', error);
        res.status(500).json({ error: 'Failed to add initiative' });
    }
});

// Route to get all initiatives
router.get('/get-initiatives', async (req, res) => {
    try {
        const initiatives = await Initiative.find({});
        res.json(initiatives);
    } catch (error) {
        console.error('Error fetching initiatives:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Route to get a single initiative by ID
router.get('/get-initiative/:id', async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id);
        if (!initiative) {
            return res.status(404).json({ error: 'Initiative not found' });
        }
        res.status(200).json(initiative);
    } catch (error) {
        console.error('Error fetching initiative:', error);
        res.status(500).json({ error: 'Failed to fetch initiative' });
    }
});

// Route to update an initiative by ID
router.put('/update-initiative/:id', async (req, res) => {
    try {
        const updatedInitiative = await Initiative.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedInitiative) {
            return res.status(404).json({ error: 'Initiative not found' });
        }
        res.status(200).json({ 
            message: 'Initiative updated successfully', 
            updatedInitiative 
        });
    } catch (error) {
        console.error('Error updating initiative:', error);
        res.status(500).json({ error: 'Failed to update initiative' });
    }
});

// Route to delete an initiative by ID
router.delete('/delete-initiative/:id', async (req, res) => {
    try {
        const deletedInitiative = await Initiative.findByIdAndDelete(req.params.id);
        if (!deletedInitiative) {
            return res.status(404).json({ error: 'Initiative not found' });
        }
        res.status(200).json({ message: 'Initiative deleted successfully' });
    } catch (error) {
        console.error('Error deleting initiative:', error);
        res.status(500).json({ error: 'Failed to delete initiative' });
    }
});

module.exports = router;