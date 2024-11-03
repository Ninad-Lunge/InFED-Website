const express = require('express');
const router = express.Router();
const Founder = require('../models/Founder');

router.post('/add-founder', async (req, res) => {
    const { name, photo, socialLinks, testimonial, role, startup } = req.body;

    try{
        const newFounder = new Founder({
            name,
            photo,
            socialLinks,
            testimonial,
            role,
            startup
        });

        await newFounder.save();
        res.status(201).json({ message: 'Founder added successfully', founder: newFounder });
    } catch (err) {
        res.status(500).json({ message: 'Error adding founder: ', err});
    }
});

router.get('/get-founders', async (req, res) => {
    try{
        const founders = await Founder.find({});
        res.json(founders);
    } catch (err) {
        console.error('Error fetching founders: ', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// Get founders by startup name
router.get('/get-founders/:startupName', async (req, res) => {
    try {
        const founders = await Founder.find({ startup: req.params.startupName });
        res.json(founders);
    } catch (err) {
        console.error('Error fetching founders:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.get('/get-founder/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const founder = await Founder.findById(id);
        if(!founder) {
            return res.status(404).json({ error: 'Founder not found' });
        }
        res.json(founder);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update-founder/:id', async (req, res) =>{
    const { id } = req.params;
    const updateData = req.body;

    try{
        const updatedfounder = await Founder.findByIdAndUpdate(id, updateData, { new: true });

        if(!updateData) {
            return res.status(404).json({ message: 'Founder not found.'});
        }

        res.json({ message: 'Founder updated successfully', scheme: updatedfounder });
    } catch (error) {
        res.status(500).json({ message: 'Error updating founder', error });
    }
});

router.delete('/delete-founder/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const deleteFounder = await Founder.findByIdAndDelete(id);

        if(!deleteFounder) {
            return res.status(404).json({ message: 'Founder not found' });
        }

        res.json({ message: 'Founder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting founder', error });
    }
});

module.exports = router;