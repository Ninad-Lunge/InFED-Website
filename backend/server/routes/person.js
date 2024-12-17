const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const Person = require('../models/Person');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'persons' }, // Optional folder
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

// Get all persons (sorted by index)
router.get('/people', async (req, res) => {
  try {
    const persons = await Person.find({}).sort('index');
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching persons', error });
  }
});

// Add a new person
router.post('/add-person', upload.single('image'), async (req, res) => {
  try {
    const { name, designation, email, linkedin, twitter, heading } = req.body;

    if (!heading) {
      return res.status(400).json({ message: 'Heading is required' });
    }

    let imageUrl = '';
    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file);
      imageUrl = cloudinaryResponse.secure_url;
    }

    // Calculate new index
    const maxIndexPerson = await Person.findOne({}).sort('-index');
    const newIndex = maxIndexPerson ? maxIndexPerson.index + 1 : 0;

    const newPerson = new Person({
      name,
      designation,
      heading,
      image: imageUrl,
      socialLinks: {
        email: email || '',
        linkedin: linkedin || '',
        twitter: twitter || '',
      },
      index: newIndex,
    });

    await newPerson.save();
    res.status(201).json({ message: 'Person added successfully', person: newPerson });
  } catch (error) {
    console.error('Error adding person:', error);
    res.status(500).json({ message: 'Error adding person', error: error.message });
  }
});

// Update person (including index and optional image upload)
router.put('/update-person/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, email, linkedin, twitter, heading, index } = req.body;

    let updateData = { name, designation, heading };

    // Update social links
    updateData.socialLinks = {
      email: email || '',
      linkedin: linkedin || '',
      twitter: twitter || '',
    };

    // Update image if a file is uploaded
    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file);
      updateData.image = cloudinaryResponse.secure_url;
    }

    // Update index if provided
    if (index !== undefined) {
      updateData.index = index;
    }

    const updatedPerson = await Person.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json({ message: 'Person updated successfully', person: updatedPerson });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ message: 'Error updating person', error: error.message });
  }
});

// Reorder persons (bulk update of indices)
router.post('/reorder-persons', async (req, res) => {
  try {
    const { persons } = req.body;

    if (!Array.isArray(persons)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const indices = persons.map((p) => p.index);
    const uniqueIndices = new Set(indices);
    if (uniqueIndices.size !== persons.length) {
      return res.status(400).json({ message: 'Indices must be unique' });
    }

    const bulkOps = persons.map((person) => ({
      updateOne: {
        filter: { _id: person._id },
        update: { index: person.index },
      },
    }));

    await Person.bulkWrite(bulkOps);
    res.json({ message: 'Persons reordered successfully' });
  } catch (error) {
    console.error('Error reordering persons:', error);
    res.status(500).json({ message: 'Error reordering persons', error: error.message });
  }
});

// Delete a person
router.delete('/delete-person/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(400).json({ message: 'Error deleting person', error: error.message });
  }
});

module.exports = router;