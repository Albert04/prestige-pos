const Customer = {
    tableName: 'pos."Customers"',
  
    async getAll() {
      try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${this.tableName}`);
        client.release();
        return result.rows;
      } catch (error) {
        console.error('Error fetching customers:', error);
        throw new Error('Error fetching customers');
      }
    },
  
    async getById(id) {
      try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${this.tableName} WHERE customer_id = $1`, [id]);
        client.release();
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching customer by ID:', error);
        throw new Error('Error fetching customer by ID');
      }
    },
  
    async create(customer) {
      try {
        await this.validateCustomer(customer); // Assuming validation logic (see below)
        const client = await pool.connect();
        const result = await client.query(
          `INSERT INTO ${this.tableName} (customer_name, email, phone_number) VALUES ($1, $2, $3) RETURNING *`,
          [customer.customer_name, customer.email, customer.phone_number]
        );
        client.release();
        return result.rows[0];
      } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
      }
    },

    async getOrderProducts(orderId) {
        try {
          const client = await pool.connect();
          const result = await client.query(
            `SELECT op.*, p.product_name, p.price FROM pos."Order_Products" op
             INNER JOIN pos."Products" p ON op.product_id = p.product_id
             WHERE op.order_id = $1`,
            [orderId]
          );
          client.release();
          return result.rows;
        } catch (error) {
          console.error('Error fetching order products:', error);
          throw new Error('Error fetching order products');
        }
      },
      
    
    // ... other methods like update and delete (if needed)
  
    // (Optional) Validation logic for customer data
    async validateCustomer(customer) {
      // Implement validation rules using Joi or a similar library
    }
  };
  
  module.exports = Customer;
  