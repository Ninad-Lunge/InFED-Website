const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.isSuperAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (user.role !== 'admin' && user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};