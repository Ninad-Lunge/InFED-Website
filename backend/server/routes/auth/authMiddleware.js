const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin');

// Token authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Extract token (assuming "Bearer TOKEN" format)
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin and attach to request
    const admin = await Admin.findById(decoded.userId).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Authentication error', error: error.message });
  }
};

// Middleware to check if user is a super admin
const checkSuperAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== 'super-admin') {
    return res.status(403).json({ message: 'Access denied. Super admin privileges required.' });
  }
  next();
};

// Middleware to check if user is an admin (either admin or super-admin)
const checkAdmin = (req, res, next) => {
  if (!req.admin || (req.admin.role !== 'admin' && req.admin.role !== 'super-admin')) {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  checkSuperAdmin,
  checkAdmin
};