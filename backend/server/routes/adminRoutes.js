const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Assuming you have an Admin model
const bcrypt = require('bcryptjs');
const { authenticateToken, checkSuperAdmin } = require('../middleware/auth');

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
    const { email, password } = req.body;

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

module.exports = router;