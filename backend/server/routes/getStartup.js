const express = require('express');
const router = express.Router();
const Startups = require('../models/Startup');

router.get('/get-startups', async (req, res) => {
    try {
        const startups = await Startups.find({});
        res.json(startups);
    } catch (err) {
        console.error('Error fetching startups:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

module.exports = router;