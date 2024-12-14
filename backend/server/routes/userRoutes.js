const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get all users - Protected route
router.get('/', auth, getAllUsers);

// Get user by ID - Protected route
router.get('/:id', auth, getUserById);

// Update user - Protected route
router.put('/:id', auth, updateUser);

// Delete user - Protected route
router.delete('/:id', auth, deleteUser);

module.exports = router;