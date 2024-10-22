const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.get('/people', async (req, res) => {
    try {
        const people = await Person.find({});
        res.json(people); // This will return an empty array if no documents are found
    } catch (err) {
        console.error('Error fetching people:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

module.exports = router;