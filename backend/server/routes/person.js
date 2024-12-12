const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const upload = require('../middleware/upload'); // Assume you have a multer upload middleware

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
    const { 
      name, 
      designation, 
      heading, 
      email, 
      linkedin, 
      twitter 
    } = req.body;

    const maxIndexPerson = await Person.findOne({}).sort('-index');
    const newIndex = maxIndexPerson ? maxIndexPerson.index + 1 : 0;

    const newPerson = new Person({
      name,
      designation,
      heading,
      socialLinks: {
        email,
        linkedin,
        twitter
      },
      image: req.file ? req.file.path : null,
      index: newIndex
    });

    await newPerson.save();
    res.status(201).json({ person: newPerson });
  } catch (error) {
    res.status(400).json({ message: 'Error adding person', error });
  }
});

// Update person (including index for reordering)
router.put('/update-person/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      designation, 
      heading, 
      email, 
      linkedin, 
      twitter,
      index
    } = req.body;

    const updateData = {
      name,
      designation,
      heading,
      socialLinks: {
        email,
        linkedin,
        twitter
      }
    };

    // Update image if a new file is uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Update index if provided
    if (index !== undefined) {
      updateData.index = index;
    }

    const updatedPerson = await Person.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    res.json({ person: updatedPerson });
  } catch (error) {
    res.status(400).json({ message: 'Error updating person', error });
  }
});

// Reorder persons (bulk update of indices)
router.post('/reorder-persons', async (req, res) => {
  try {
    const { persons } = req.body;

    if (!Array.isArray(persons)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Validate that indices are unique and sequential
    const indices = persons.map(p => p.index);
    const uniqueIndices = new Set(indices);
    if (uniqueIndices.size !== persons.length) {
      return res.status(400).json({ message: 'Indices must be unique' });
    }

    const bulkOps = persons.map(person => ({
      updateOne: {
        filter: { _id: person._id },
        update: { index: person.index }
      }
    }));

    await Person.bulkWrite(bulkOps);

    res.json({ message: 'Persons reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reordering persons', error });
  }
});


// Delete a person
router.delete('/delete-person/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting person', error });
  }
});

module.exports = router;