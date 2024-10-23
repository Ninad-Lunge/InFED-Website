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

module.exports = router;