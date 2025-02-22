const mongoose = require('mongoose');
const axios = require('axios');
const connectDB = require('./config/db');
const Product = require('./models/Product');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const seedProducts = async () => {
  try {
    // Fetch dummy products from DummyJSON
    const response = await axios.get('https://dummyjson.com/products?limit=50');
    const products = response.data.products;

    // Map DummyJSON fields to our Product schema
    const productDocs = products.map((product) => ({
      name: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.thumbnail,
      rating: product.rating,
    }));

    // Clear existing products and insert new ones
    await Product.deleteMany({});
    await Product.insertMany(productDocs);

    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();