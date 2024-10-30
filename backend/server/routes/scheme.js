const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

router.post('/add-scheme', async (req, res) => {
    console.log('Request Body:', req.body);
    const { name, image, desc, link, eligibilityCriteria, schemeBenefits} = req.body;

    try{
        const newScheme = new Scheme({
            name,
            image,
            desc,
            link,
            eligibilityCriteria,
            schemeBenefits
        });

        await newScheme.save();
        res.status(201).json({ message: 'Scheme added successfully.', scheme: newScheme});
    } catch (error) {
        res.status(500).json({ message: 'Error adding scheme: ' , error});
    }
});

router.get('/get-schemes', async (req, res) => {
    try {
        const schemes = await Scheme.find({});
        res.json(schemes);
    } catch (err) {
        console.error('Error fetching schemes:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.get('/get-scheme/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const scheme = await Scheme.findById(id);
        if (!scheme) {
            return res.status(404).json({ error: "Scheme not found" });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put('/update-scheme/:id', async (req, res) =>{
    const { id } = req.params;
    const updateData = req.body;

    try{
        const updatedscheme = await Scheme.findByIdAndUpdate(id, updateData, { new: true });

        if(!updateData) {
            return res.status(404).json({ message: 'Scheme not found.'});
        }

        res.json({ message: 'Scheme updated successfully', scheme: updatedscheme });
    } catch (error) {
        res.status(500).json({ message: 'Error updating scheme', error });
    }
});

router.delete('/delete-scheme/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const deletedscheme = await Scheme.findByIdAndDelete(id);

        if(!deletedscheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }

        res.json({ message: 'Scheme deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting scheme', error });
    }
});

module.exports = router;