const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Exchange = require('../models/Exchange');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Submit exchange request (existing)
router.post('/request', authMiddleware, upload.single('image'), async (req, res) => {
  const { productId, description, amount, whatsapp } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const exchange = new Exchange({
      productId,
      userId: req.user.id,
      image,
      description,
      amount,
      whatsapp,
    });
    await exchange.save();
    res.status(201).json({ message: 'Exchange request submitted', exchange });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting exchange request', error });
  }
});

// Get user's exchange requests (existing)
router.get('/user/requests', authMiddleware, async (req, res) => {
  try {
    const requests = await Exchange.find({ userId: req.user.id }).populate('productId', 'name');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user exchange requests', error });
  }
});

// Get all exchange requests (admin only)
router.get('/requests', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  const { page = 1, limit = 10 } = req.query;

  try {
    const requests = await Exchange.find()
      .populate('productId', 'name')
      .populate('userId', 'name email')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    const total = await Exchange.countDocuments();
    res.json({ requests, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
});

// Update exchange request status (admin only)
router.put('/requests/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  const { status } = req.body; // 'approved' or 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be "approved" or "rejected"' });
  }

  try {
    const exchange = await Exchange.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('productId', 'name').populate('userId', 'name email');
    if (!exchange) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: `Exchange ${status}`, exchange });
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error });
  }
});

module.exports = router;