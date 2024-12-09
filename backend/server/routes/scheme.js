const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Scheme = require('../models/Scheme');

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
        { folder: 'schemes' },
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

router.post('/add-scheme', upload.single('image'), async (req, res) => {
    console.log('Request Body:', req.body);
    const { name, desc, link, eligibilityCriteria, schemeBenefits} = req.body;

    try{
        let imageUrl = '';

        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file);
            imageUrl = cloudinaryResponse.secure_url;
        }

        const newScheme = new Scheme({
            name,
            image: imageUrl,
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

router.put('/update-scheme/:id', upload.single('image'), async (req, res) =>{
    const { id } = req.params;
    const updateData = req.body;

    try{
        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file);
            updateData.image = cloudinaryResponse.secure_url;
        }
        
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