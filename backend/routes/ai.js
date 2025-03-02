const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Product = require('../models/Product');

router.post('/recommendations', authMiddleware, async (req, res) => {
  const { style, occasion } = req.body;

  try {
    // Build query based on style and occasion
    const query = {};
    if (style) {
      query.category = { $regex: style, $options: 'i' }; // Match style in category or name
    }
    if (occasion) {
      query.name = { $regex: occasion.split('-')[0], $options: 'i' }; // Match occasion in name
    }

    // Fetch up to 5 products
    const products = await Product.find(query)
      .limit(5)
      .sort({ rating: -1 }); // Sort by rating for "best" recommendations

    // If fewer than 5, fill with top-rated products
    if (products.length < 5) {
      const additionalProducts = await Product.find({})
        .limit(5 - products.length)
        .sort({ rating: -1 });
      products.push(...additionalProducts);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error: error.message });
  }
});

module.exports = router;