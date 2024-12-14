const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/communityDashboardController');
// const authMiddleware = require('../routes/auth/authMiddleware');

// Protect route with authentication middleware
const { authenticateToken } = require('../routes/auth/authMiddleware');

router.get('/', authenticateToken, dashboardController.getDashboardData);

module.exports = router;