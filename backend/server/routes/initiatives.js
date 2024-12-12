const express = require('express');
const mongoose = require('mongoose');
const Initiatives = require('../models/Initiatives');
const router = express.Router();

// Multer for file upload
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/initiatives/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Unique filename
  }
});

const upload = multer({ storage: storage });

// Create an initiative with image upload
router.post('/add-initiative', upload.array('images', 5), async (req, res) => {
  try {
    // Process uploaded files
    const imageUrls = req.files ? req.files.map(file => `/uploads/initiatives/${file.filename}`) : [];

    // Create initiative object
    const newInitiative = new Initiatives({
      title: req.body.title,
      description: req.body.description,
      about: req.body.about,
      objectives: req.body.objectives ? JSON.parse(req.body.objectives) : [],
      locations: req.body.locations ? JSON.parse(req.body.locations) : [],
      images: imageUrls
    });

    await newInitiative.save();
    res.status(201).json(newInitiative);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an initiative with image upload
router.put('/update-initiative/:id', upload.array('images', 5), async (req, res) => {
  try {
    // Existing initiative
    const existingInitiative = await Initiatives.findById(req.params.id);
    if (!existingInitiative) return res.status(404).json({ error: 'Initiative not found' });

    // Process uploaded files
    const imageUrls = req.files ? req.files.map(file => `/uploads/initiatives/${file.filename}`) : [];

    // Merge existing images with new images if any
    const updatedImages = [
      ...(existingInitiative.images || []),
      ...imageUrls
    ];

    // Update initiative
    const updatedInitiative = await Initiatives.findByIdAndUpdate(
      req.params.id, 
      {
        title: req.body.title || existingInitiative.title,
        description: req.body.description || existingInitiative.description,
        about: req.body.about || existingInitiative.about,
        objectives: req.body.objectives ? JSON.parse(req.body.objectives) : existingInitiative.objectives,
        locations: req.body.locations ? JSON.parse(req.body.locations) : existingInitiative.locations,
        images: updatedImages
      }, 
      { new: true }
    );

    res.status(200).json(updatedInitiative);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Other routes remain the same as in your previous implementation

module.exports = router;