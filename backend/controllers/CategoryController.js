// controllers/categoryController.js


const express = require('express');
const authenticateToken = require('../middleware/auth');
const Category = require('../models/Category');

const router = express.Router();

// Get all categories
router.get('/', authenticateToken, async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const categories = await Category.getAll();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get category by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new category
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a category
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.params.id, req.body);
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a category
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedCategory = await Category.delete(req.params.id);
    if (deletedCategory) {
      res.json(deletedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
