const express = require('express');
const router = express.Router();
const authController = require('./auth/authController');
const authMiddleware = require('./auth/authMiddleware');

// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Super admin-only route
router.get('/super-admin', authMiddleware.checkSuperAdmin, (req, res) => {
  res.json({ message: 'Super admin dashboard' });
});

// Admin-only route
router.get('/admin', authMiddleware.checkAdmin, (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

module.exports = router;