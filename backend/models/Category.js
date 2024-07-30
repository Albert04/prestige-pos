// models/Category.js
const pool = require('../utils/db');

const Category = {
  tableName: 'pos."Categories"',

  async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${this.tableName}`);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Error fetching categories');
    }
  },

  async getById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${this.tableName} WHERE category_id = $1`, [id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw new Error('Error fetching category by ID');
    }
  },

  async create(category) {
    const { category_name, parent_category_id, color } = category;
    try {
      const client = await pool.connect();
      const result = await client.query(
        `INSERT INTO ${this.tableName} (category_name, parent_category_id, color) VALUES ($1, $2, $3) RETURNING *`,
        [category_name, parent_category_id, color]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error('Error creating category');
    }
  },

  async update(id, category) {
    const { category_name, parent_category_id, color } = category;
    try {
      const client = await pool.connect();
      const result = await client.query(
        `UPDATE ${this.tableName} SET category_name = $1, parent_category_id = $2, color = $3 WHERE category_id = $4 RETURNING *`,
        [category_name, parent_category_id, color, id]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Error updating category:', error);
      throw new Error('Error updating category');
    }
  },

  async delete(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(`DELETE FROM ${this.tableName} WHERE category_id = $1 RETURNING *`, [id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error('Error deleting category');
    }
  },
};

module.exports = Category;
