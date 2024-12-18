const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Initiative = require('../models/Initiatives');

// Multer configuration for file upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Add new initiative
router.post('/add-initiative', upload.array('images', 3), async (req, res) => {
  try {
    // Parse JSON string inputs
    const locations = JSON.parse(req.body.locations || '[]');
    const objectives = JSON.parse(req.body.objectives || '[]');
    const impact = JSON.parse(req.body.impact || '{}');

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Convert buffer to base64
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        
        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: 'initiatives'
        });
        
        imageUrls.push(uploadResponse.secure_url);
      }
    }

    // Create new initiative
    const newInitiative = new Initiative({
      title: req.body.title,
      // description: req.body.description,
      about: req.body.about || '',
      locations: locations,
      objectives: objectives,
      impact: {
        startups: impact.startups || '',
        success_rate: impact.success_rate || '',
        jobs: impact.jobs || '',
        funding: impact.funding || ''
      },
      images: imageUrls
    });

    // Save initiative to database
    const savedInitiative = await newInitiative.save();

    // Respond with saved initiative
    res.status(201).json(savedInitiative);
  } catch (error) {
    console.error('Error adding initiative:', error);
    res.status(500).json({ 
      error: 'Failed to add initiative', 
      details: error.message 
    });
  }
});

// Get all initiatives
router.get('/get-initiatives', async (req, res) => {
  try {
    const initiatives = await Initiative.find().sort({ createdAt: -1 });
    res.json(initiatives);
  } catch (error) {
    console.error('Error fetching initiatives:', error);
    res.status(500).json({ 
      error: 'Failed to fetch initiatives', 
      details: error.message 
    });
  }
});

// Update an existing initiative
router.put('/update-initiatives/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Parse JSON string inputs
    const locations = JSON.parse(req.body.locations || '[]');
    const objectives = JSON.parse(req.body.objectives || '[]');
    const impact = JSON.parse(req.body.impact || '{}');

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: 'initiatives'
        });
        
        imageUrls.push(uploadResponse.secure_url);
      }
    }

    // Find existing initiative
    const existingInitiative = await Initiative.findById(id);
    if (!existingInitiative) {
      return res.status(404).json({ error: 'Initiative not found' });
    }

    // Update initiative
    existingInitiative.title = req.body.title;
    // existingInitiative.description = req.body.description;
    existingInitiative.about = req.body.about || '';
    existingInitiative.locations = locations;
    existingInitiative.objectives = objectives;
    existingInitiative.impact = {
      startups: impact.startups || '',
      success_rate: impact.success_rate || '',
      jobs: impact.jobs || '',
      funding: impact.funding || ''
    };
    
    // Merge existing and new images
    existingInitiative.images = [
      ...(existingInitiative.images || []),
      ...imageUrls
    ];

    // Save updated initiative
    const updatedInitiative = await existingInitiative.save();

    res.json(updatedInitiative);
  } catch (error) {
    console.error('Error updating initiative:', error);
    res.status(500).json({ 
      error: 'Failed to update initiative', 
      details: error.message 
    });
  }
});

// Delete an initiative
router.delete('/delete-initiatives/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the initiative
    const deletedInitiative = await Initiative.findByIdAndDelete(id);
    
    if (!deletedInitiative) {
      return res.status(404).json({ error: 'Initiative not found' });
    }

    res.json({ message: 'Initiative deleted successfully' });
  } catch (error) {
    console.error('Error deleting initiative:', error);
    res.status(500).json({ 
      error: 'Failed to delete initiative', 
      details: error.message 
    });
  }
});

module.exports = router;