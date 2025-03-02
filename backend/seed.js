const mongoose = require('mongoose');
const axios = require('axios');
const connectDB = require('./config/db');
const Product = require('./models/Product');
require('dotenv').config();

connectDB();

const seedProducts = async () => {
  try {
    // Fetch all products from DummyJSON (increase limit to max or fetch all)
    const response = await axios.get('https://dummyjson.com/products?limit=0');
    const allProducts = response.data.products;

    // Desired categories (fashion, electronics, etc., excluding groceries)
    const desiredCategories = [
      "smartphones",
      "laptops",
      "fragrances",
      "skincare",
      "groceries",
      "home-decoration",
      "furniture",
      "tops",
      "womens-dresses",
      "womens-shoes",
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
      "sunglasses",
      "automotive",
      "motorcycle",
      "lighting"
    ];
    

    // Filter products
    const filteredProducts = allProducts.filter((product) =>
      desiredCategories.includes(product.category)
    );

    // Map to our schema
    const productDocs = filteredProducts.map((product) => ({
      name: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.thumbnail,
      rating: product.rating,
    }));

    // Clear existing products and insert filtered ones
    await Product.deleteMany({});
    await Product.insertMany(productDocs);

    console.log(`Seeded ${productDocs.length} fashion-focused products successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();