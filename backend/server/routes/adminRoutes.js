const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); 
const Marquee = require('../models/Marquee');
const bcrypt = require('bcryptjs');
const { authenticateToken, checkSuperAdmin } = require('../routes/auth/authMiddleware');

// Marquee
// 1. Get all marquee entries
router.get('/marquee', async (req, res) => {
  try {
      const marquees = await Marquee.find();
      res.status(200).json(marquees);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch marquee entries' });
  }
});

// 2. Get a single marquee entry by ID
router.get('/marquee/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const marquee = await Marquee.findById(id);
      if (!marquee) {
          return res.status(404).json({ error: 'Marquee entry not found' });
      }
      res.status(200).json(marquee);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch marquee entry' });
  }
});

// 3. Create a new marquee entry
router.post('/marquee', async (req, res) => {
  try {
      const { text, link } = req.body;
      if (!text || !link) {
          return res.status(400).json({ error: 'Text and link are required' });
      }
      const newMarquee = new Marquee({ text, link });
      await newMarquee.save();
      res.status(201).json(newMarquee);
  } catch (error) {
      res.status(500).json({ error: 'Failed to create marquee entry' });
  }
});

// 4. Update a marquee entry by ID
router.put('/marquee/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { text, link } = req.body;
      if (!text || !link) {
          return res.status(400).json({ error: 'Text and link are required' });
      }
      const updatedMarquee = await Marquee.findByIdAndUpdate(
          id,
          { text, link },
          { new: true, runValidators: true }
      );
      if (!updatedMarquee) {
          return res.status(404).json({ error: 'Marquee entry not found' });
      }
      res.status(200).json(updatedMarquee);
  } catch (error) {
      res.status(500).json({ error: 'Failed to update marquee entry' });
  }
});

// 5. Delete a marquee entry by ID
router.delete('/marquee/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedMarquee = await Marquee.findByIdAndDelete(id);
      if (!deletedMarquee) {
          return res.status(404).json({ error: 'Marquee entry not found' });
      }
      res.status(200).json({ message: 'Marquee entry deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete marquee entry' });
  }
});

// Get list of admins (only accessible by super admin)
router.get('/list', authenticateToken, checkSuperAdmin, async (req, res) => {
  try {
    // Fetch all admins, excluding sensitive information like passwords
    const admins = await Admin.find({}, { password: 0 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
});

// Create a new admin (only accessible by super admin)
router.post('/create', authenticateToken, checkSuperAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin with this email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: 'admin' // Default role, can be modified as needed
    });

    await newAdmin.save();

    res.status(201).json({ 
      message: 'Admin created successfully', 
      admin: { 
        _id: newAdmin._id, 
        email: newAdmin.email 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
});

// Remove an admin (only accessible by super admin)
router.delete('/:adminId', authenticateToken, checkSuperAdmin, async (req, res) => {
  try {
    const { adminId } = req.params;

    // Prevent removing the last super admin
    const superAdminCount = await Admin.countDocuments({ role: 'super-admin' });
    const adminToRemove = await Admin.findById(adminId);

    if (adminToRemove.role === 'super-admin' && superAdminCount <= 1) {
      return res.status(400).json({ message: 'Cannot remove the last super admin' });
    }

    // Remove the admin
    await Admin.findByIdAndDelete(adminId);

    res.json({ message: 'Admin removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing admin', error: error.message });
  }
});

// For Community

// const express = require('express');
// const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware.js');

// Event Routes
router.get('/events', 
  authenticateToken, 
  adminMiddleware, 
  adminController.getAllEvents
);
router.post('/events', 
  authenticateToken, 
  adminMiddleware, 
  adminController.createEvent
);
router.put('/events/:id', 
  authenticateToken, 
  adminMiddleware, 
  adminController.updateEvent
);
router.delete('/events/:id', 
  authenticateToken, 
  adminMiddleware, 
  adminController.deleteEvent
);

// Opportunity Routes
router.get('/opportunities', adminController.getAllOpportunities);

router.post('/opportunities', 
  authenticateToken, 
  adminMiddleware, 
  adminController.createOpportunity
);
router.put('/opportunities/:id', 
  authenticateToken, 
  adminMiddleware, 
  adminController.updateOpportunity
);
router.delete('/opportunities/:id', 
  authenticateToken, 
  adminMiddleware, 
  adminController.deleteOpportunity
);

// User Routes
router.get('/users', 
  authenticateToken, 
  adminMiddleware,
  adminController.getAllUsers
);

router.get('/users', 
  authenticateToken, 
  adminMiddleware,
  adminController.deleteUser
);

module.exports = router;