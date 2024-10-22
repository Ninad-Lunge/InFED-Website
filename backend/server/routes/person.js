const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// POST route to add a person
router.post('/add-person', async (req, res) => {
    const { name, image, designation, socialLinks, heading } = req.body;

    if (!heading) {
        return res.status(400).json({ message: 'Heading is required' });
    }

    try {
        const newPerson = new Person({
            name,
            image,
            designation,
            socialLinks,
            heading
        });

        await newPerson.save();
        res.status(201).json({ message: 'Person added successfully', person: newPerson });
    } catch (error) {
        res.status(500).json({ message: 'Error adding person', error });
    }
});

module.exports = router;