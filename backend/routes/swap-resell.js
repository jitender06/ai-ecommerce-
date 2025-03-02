const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// List Swap Item (placeholder)
router.post('/list', authMiddleware, (req, res) => {
  const { name, image } = req.files; // Assuming multer for file upload
  // TODO: Save to database (e.g., MongoDB)
  res.json({ _id: 'mock-id', name, image: 'mock-image-url' }); // Mock response
});

// Fetch Swap Items (placeholder)
router.get('/items', (req, res) => {
  // TODO: Fetch from database
  res.json([]); // Mock empty array for now
});

module.exports = router;