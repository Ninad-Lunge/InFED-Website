const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const StartUp = require('../models/Startup');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB file size limit
    },
});

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'startups' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
  
      // Convert buffer to stream
      const stream = require('stream');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      bufferStream.pipe(uploadStream);
    });
};


router.post('/add-startup', upload.single('image'), async (req, res) => {
    const { name, description, websiteLink, targetAudience, goals, achievements, schemes, founders } = req.body;

    try{
        let imageUrl = '';

        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file);
            imageUrl = cloudinaryResponse.secure_url;
        }

        const newStartUp = new StartUp({
            name,
            image: imageUrl,
            description,
            websiteLink,
            targetAudience,
            goals,
            achievements,
            schemes,
            founders
        });

        await newStartUp.save();
        res.status(201).json({ message: 'Startup added successfully', startup: newStartUp });
    } catch (error) {
        res.status(500).json({ message: 'Error adding startup', error });
    }
});

router.get('/get-startups', async (req, res) => {
    try {
        const startups = await StartUp.find({});
        res.json(startups);
    } catch (err) {
        console.error('Error fetching startups:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.get('/get-startups-names', async (req, res) => {
    try {
        const startups = await StartUp.find({}, 'name'); // Fetch only the name field
        res.json(startups);
    } catch (err) {
        console.error('Error fetching startups:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.get('/get-startups/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const startup = await StartUp.findById(id);
        if (!startup) {
            return res.status(404).json({ error: "Startup not found" });
        }
        res.json(startup);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put('/update-startup/:id', upload.single('image'), async (req, res) =>{
    const { id } = req.params;
    const updateData = req.body;

    try{
        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file);
            updateData.image = cloudinaryResponse.secure_url;
        } 
        const updatedStartup = await StartUp.findByIdAndUpdate(id, updateData, { new: true });

        if(!updateData) {
            return res.status(404).json({ message: 'Startup not found.'});
        }

        res.json({ message: 'Startup updated successfully', startup: updatedStartup });
    } catch (error) {
        res.status(500).json({ message: 'Error updating startup', error });
    }
});

router.delete('/delete-startup/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const deletedStartup = await StartUp.findByIdAndDelete(id);

        if(!deletedStartup) {
            return res.status(404).json({ message: 'Startup not found' });
        }

        res.json({ message: 'Startup deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting startup', error });
    }
});

module.exports = router;