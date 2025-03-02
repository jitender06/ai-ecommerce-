const express = require("express");
const router = express.Router();
const {
  getProducts,
  getCategories,
  getProductById,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/auth");
const multer = require('multer');
const path = require('path');
const Product = require("../models/Product");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

// Admin-only routes for product management
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });

  const { name, description, price, category, stock } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !price || !category || !stock) {
    return res.status(400).json({ message: 'Name, price, category, and stock are required' });
  }

  try {
    const product = new Product({ name, description, price, image, category, stock });
    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });

  const { name, description, price, category, stock } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  if (!name || !price || !category || !stock) {
    return res.status(400).json({ message: 'Name, price, category, and stock are required' });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category, stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;
