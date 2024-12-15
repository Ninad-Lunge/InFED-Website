const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
  try {
    // Assuming req.admin is set by authMiddleware
    const admin = await Admin.findById(req.admin.id);

    // Check if admin exists and has an admin or super-admin role
    if (!admin || (admin.role !== 'admin' && admin.role !== 'super-admin')) {
      return res.status(403).json({ 
        message: 'Access denied. Admin rights required.' 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ 
      message: 'Error in admin middleware', 
      error: error.message 
    });
  }
};