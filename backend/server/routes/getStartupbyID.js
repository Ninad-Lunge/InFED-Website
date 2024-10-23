const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');

router.get('/get-startups/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const startup = await Startup.findById(id);
        if (!startup) {
            return res.status(404).json({ error: "Startup not found" });
        }
        res.json(startup);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;