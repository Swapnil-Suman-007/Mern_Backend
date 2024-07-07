
const dbURI = 'mongodb://localhost:27017/Bablu_Mama_Project';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies


// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for the Category model
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

// Define a schema for the Product model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }
});

// Create the Category and Product models
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// Endpoint to get categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get products by category
app.get('/api/products/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
