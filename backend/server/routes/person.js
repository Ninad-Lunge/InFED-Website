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

router.put('/update-person/:id', async (req,res) => {
    const { id } = req.params;
    const updateData = req.body;

    try{
        const updatedPerson = await Person.findByIdAndUpdate(id, updateData, { new: true });

        if(!updateData) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.json({ message: 'Person updated successfully', person: updatedPerson });
    } catch (error) {
        res.status(500).json({ message: 'Error updating person', error });
    }
});

router.delete('/delete-person/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const deletedPerson = await Person.findByIdAndDelete(id);

        if(!deletedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting person', error });
    }
});

module.exports = router;