//models/Products.js

const pool = require('../utils/db');


const Product = {
  tableName: 'pos."Products"',
  
  async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${this.tableName}`);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error fetching products:', error); 
      throw new Error('Error fetching products');
    }
  },

  async getById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${this.tableName} WHERE product_id = $1`, [id]);
      client.release();
      return result.rows[0]; 
    } catch (error) {
      console.error('Error fetching product by ID:', error); 
      throw new Error('Error fetching product by ID');
    }
  },

  async create(product) {
    const { product_id, product_name, description, unit, price , special_price, category_id, printer } = product;
    let client;
    try {
      client = await pool.connect();
      const result = await client.query(
        `INSERT INTO ${this.tableName} (product_id, product_name, description, unit, price , special_price, category_id, printer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [product_id, product_name, description, unit, price , special_price, category_id, printer]
      );
      return result.rows[0]; 
    } catch (error) {
      console.error('Error creating product:', error.message, error.stack); // Log detailed error message and stack trace
      throw new Error('Error creating product');
    } finally {
      if (client) client.release(); 
    }
  },

  async update(id, product) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `UPDATE ${this.tableName} SET product_id = $1, product_name = $2, description = $3, unit = $4, price = $5,  special_price = $6, category_id = $7, printer = $8, WHERE product_id = $9 RETURNING *`,
        [product.product_id, product.product_name, product.description, product.unit, product.price, product.special_price, product.category_id, product.printer,  id]
      );
      client.release();
      return result.rows[0]; 
    } catch (error) {
      console.error('Error updating product:', error); 
      throw new Error('Error updating product');
    }
  },

  async delete(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(`DELETE FROM ${this.tableName} WHERE product_id = $1 RETURNING *`, [id]);
      client.release();
      return result.rows[0]; 
    } catch (error) {
      console.error('Error deleting product:', error); 
      throw new Error('Error deleting product');
    }
  },
};

module.exports = Product;
