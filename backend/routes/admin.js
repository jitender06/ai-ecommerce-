const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Product = require('../models/Product');
const Exchange = require('../models/Exchange');
const User = require('../models/User');

// Dashboard stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const totalProducts = await Product.countDocuments();
    const exchangeRequests = await Exchange.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      totalProducts,
      exchangeRequests,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
});

// Get all users
router.get('/users', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const users = await User.find({}, 'name email role createdAt'); // Select fields to return
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Delete a user
router.delete('/users/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;