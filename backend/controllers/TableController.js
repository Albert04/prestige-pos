// controllers/TableController.js

const express = require('express');
const Table = require('../models/Table');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/active', authenticateToken, async (req, res) => {
    try {
        const tables = await Table.getActiveTables();
        res.json(tables);
    } catch (error) {
        console.error('Error fetching active tables:', error);
        res.status(500).send('Error fetching active tables');
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { tableNumber, tableName, orderType } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated user

    try {
        const newTable = await Table.createTable(tableNumber, tableName, orderType, userId);
        res.status(201).json(newTable);
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(500).send('Error creating table');
    }
});

module.exports = router;



