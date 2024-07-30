//models/User.js

const pool = require('../utils/db'); // Adjust the path as necessary


const User = {
  tableName: 'pos."Users"',

  async getAll() {
    try {
      const client = await pool.connect();
      const query = `
        SELECT user_id, firstname, lastname, username, email, password, role, address, phone 
        FROM ${this.tableName}
      `;
      const result = await client.query(query);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Error fetching users');
    }
  },
  

  //  async getAll() {
  //   try {
  //     const client = await pool.connect();
  //     const result = await client.query(`SELECT * FROM ${this.tableName}`);
  //     client.release();
  //     return result.rows;
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //     throw new Error('Error fetching users');
  //   }
  // },
  
  async getByUsername(username) {
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${this.tableName} WHERE username = $1`, [username]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw new Error('Error fetching user by username');
    }
  },
    
    async getAllUsernames() {
      try {
        const client = await pool.connect();
        const result = await client.query(`SELECT username FROM ${this.tableName}`);
        client.release();
        return result.rows.map(row => row.username); // Extract usernames from the result
      } catch (error) {
        console.error('Error fetching usernames:', error);
        throw new Error('Error fetching usernames');
      }
    },
  


  async getById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${this.tableName} WHERE user_id = $1`, [id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Error fetching user by ID');
    }
  },
  
  
  async create(userData) {
    const { user_id, username, firstname, lastname, email, password, role, address, phone } = userData;
  
    try {
      const client = await pool.connect();
      const result = await client.query(
        `INSERT INTO ${this.tableName} (user_id, username, firstname, lastname, email, password, role, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [user_id, username, firstname, lastname, email, password, role, address, phone]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new Error('Error creating user: ' + error.message);
    }
  }
  
};

module.exports = User;
