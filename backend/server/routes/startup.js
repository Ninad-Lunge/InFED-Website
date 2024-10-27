const express = require('express');
const router = express.Router();
const StartUp = require('../models/Startup');

router.post('/add-startup', async (req, res) => {
    const { name, image, description, websiteLink, targetAudience, goals, achievements, schemes } = req.body;

    try{
        const newStartUp = new StartUp({
            name,
            image,
            description,
            websiteLink,
            targetAudience,
            goals,
            achievements,
            schemes
        });

        await newStartUp.save();
        res.status(201).json({ message: 'Startup added successfully', startup: newStartUp });
    } catch (error) {
        res.status(500).json({ message: 'Error adding startup', error });
    }
});

router.get('/get-startups', async (req, res) => {
    try {
        const startups = await StartUp.find({});
        res.json(startups);
    } catch (err) {
        console.error('Error fetching startups:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.get('/get-startups/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const startup = await StartUp.findById(id);
        if (!startup) {
            return res.status(404).json({ error: "Startup not found" });
        }
        res.json(startup);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put('/update-startup/:id', async (req, res) =>{
    const { id } = req.params;
    const updateData = req.body;

    try{
        const updatedStartup = await StartUp.findByIdAndUpdate(id, updateData, { new: true });

        if(!updateData) {
            return res.status(404).json({ message: 'Startup not found.'});
        }

        res.json({ message: 'Startup updated successfully', startup: updatedStartup });
    } catch (error) {
        res.status(500).json({ message: 'Error updating startup', error });
    }
});

router.delete('/delete-startup/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const deletedStartup = await StartUp.findByIdAndDelete(id);

        if(!deletedStartup) {
            return res.status(404).json({ message: 'Startup not found' });
        }

        res.json({ message: 'Startup deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting startup', error });
    }
});

module.exports = router;