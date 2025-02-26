const User = require('../models/User');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

    const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate('cart.productId');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('cart.productId');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    const updatedUser = await User.findById(userId).populate('cart.productId');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };