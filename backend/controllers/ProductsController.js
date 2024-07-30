
//ProductsController.js

const express = require('express');
const Joi = require('joi');
const authenticateToken = require('../middleware/auth');
const Product =require('../models/Products');


const router = express.Router();

// Get all products
router.get('/products', authenticateToken, async (req, res) => {
  try {
    const products = await Product.getAll();
    console.log(products); 
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

// Get a product by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).send('Invalid product ID');
  }

  try {
    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).send('Error fetching product');
  }
});

// Create a new product
router.post('/create', authenticateToken, async (req, res) => {
  const schema = Joi.object({
    product_id: Joi.string().min(1).required(),
    product_name: Joi.string().min(1).required(),
    description: Joi.string().allow(null ,""),
    unit: Joi.string().allow(null ,""),
    price: Joi.string().allow(null ,""),
    special_price: Joi.string().allow(null ,""),
    category: Joi.string().min(1).required(),
    printer: Joi.string().min(1).required(),
    special_price: Joi.string().allow(null ,""),
   
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { product_id, product_name, description, unit, price, special_price, category_id, printer  } = req.body;

  try {
    const newProduct = await Product.create({ product_id, product_name, description, unit, price, special_price, category_id, printer });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Error creating product');
  }
});

// Update a product by ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { product_id, product_name, description, unit, price, special_price, category_id, printer } = req.body;

  if (isNaN(id)) {
    return res.status(400).send('Invalid product ID');
  }

  if (!product_id || !product_name || !description || !unit || !price  || !special_price || !category_id || !printer  ) {
    return res.status(400).send('All fields are required');
  }

  try {
    const updatedProduct = await Product.update(id, { product_id, product_name, description, unit, price , special_price, category_id, printer, special_price});
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Error updating product');
  }
});

// Delete a product by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).send('Invalid product ID');
  }

  try {
    const deletedProduct = await Product.delete(id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');
  }
});

module.exports = router;
