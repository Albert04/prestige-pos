const express = require('express');
const Order = require('../models/Order'); // Assuming models are in a separate folder

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).send('Invalid order ID');
  }

  try {
    const order = await Order.getById(id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).send('Error fetching order');
  }
});

// Create a new order
router.post('/', async (req, res) => {
  // Assuming your order model requires specific data (e.g., customer_id, table_number, order_items)
  const { customer_id, table_number, order_items } = req.body;

  if (!customer_id || !table_number || !order_items) {
    return res.status(400).send('All required fields are missing');
  }

  try {
    const newOrder = await Order.create({ customer_id, table_number, order_items });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
});

// Update an order by ID (implement logic based on your needs)
router.put('/:id', async (req, res) => {
  // ... Implement update order logic
  res.status(500).send('Order update not implemented yet');
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).send('Invalid order ID');
  }

  try {
    const deletedOrder = await Order.delete(id);
    if (!deletedOrder) {
      return res.status(404).send('Order not found');
    }
    res.json(deletedOrder);
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).send('Error deleting order');
  }
});

module.exports = router;
