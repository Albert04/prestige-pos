// models/Table.js

const pool = require('../utils/db'); // Adjust the path as necessary

const Table = {
    tableName: 'pos."Orders"',

    async getActiveTables() {
        try {
            const client = await pool.connect();
            const query = `SELECT * FROM ${this.tableName} WHERE order_type IS NOT NULL`;
            const result = await client.query(query);
            client.release();
            return result.rows;
        } catch (error) {
            console.error('Error fetching active tables:', error);
            throw new Error('Error fetching active tables');
        }
    },

    async createTable(tableNumber, tableName, orderType, userId) {
        try {
            const client = await pool.connect();
            const query = `
                INSERT INTO ${this.tableName} (table_number, table_name, order_type, created_by)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const values = [tableNumber, tableName, orderType, userId];
            const result = await client.query(query, values);
            client.release();
            return result.rows[0];
        } catch (error) {
            console.error('Error creating table:', error);
            throw new Error('Error creating table');
        }
    }
};

module.exports = Table;
