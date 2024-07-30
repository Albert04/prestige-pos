const express = require('express');
const Customer = require('../models/Customer'); // Assuming models are in a separate folder

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Error fetching customers');
  }
});

// Get a customer by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).send('Invalid customer ID');
  }

  try {
    const customer = await Customer.getById(id);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).send('Error fetching customer');
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  // Assuming your customer model requires specific data (e.g., name, email, phone)
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).send('All required fields are missing');
  }

  try {
    const newCustomer = await Customer.create({ name, email, phone });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).send('Error creating customer');
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).send('Invalid customer ID');
  }

  try {
    const deletedCustomer = await Customer.delete(id);
    if (!deletedCustomer) {
      return res.status(404).send('Customer not found');
    }
    res.json(deletedCustomer);
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).send('Error deleting customer');
  }
});

module.exports = router;
